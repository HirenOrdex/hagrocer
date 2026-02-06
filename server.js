import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import path from "path";
import { marked } from "marked";
import hljs from "highlight.js";
import QRCode from "qrcode";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/assets", express.static(path.join(process.cwd(), "assets")));

let isConnected = false;

// schema
const deviceSchema = new mongoose.Schema({
  urlPath: String,
  shopName: String,
  deviceId: String,
  SHELLY_URL: String,
  SHELLY_PASSWORD: String,
  SHELLY_EMAIL: String,
}, { timestamps: true });

const Device = mongoose.model("SwitchDevice", deviceSchema);

// helper: seed backup if empty
async function seedAllFromBackup() {
  const backupDir = path.join(process.cwd(), "backup");

  if (!fs.existsSync(backupDir)) {
    console.log("ℹ️ No backup folder found, skipping seeding");
    return;
  }

  const files = fs.readdirSync(backupDir).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const collectionName = path.basename(file, ".json");
    const collection = mongoose.connection.collection(collectionName);

    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`⭐️ ${collectionName} already has data, skipping`);
      continue;
    }

    const filePath = path.join(backupDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      console.log(`⚠️ Invalid JSON in ${file}`);
      continue;
    }

    if (!Array.isArray(data) || data.length === 0) {
      console.log(`⚠️ ${file} is empty, skipping`);
      continue;
    }

    // remove _id if present
    data = data.map(({ _id, ...rest }) => rest);

    await collection.insertMany(data);
    console.log(`✅ Seeded ${data.length} docs into ${collectionName}`);
  }
}

// connect endpoint
app.post("/connect", async (req, res) => {
  const { mongoUrl, dbName } = req.body;

  try {
    if (!isConnected) {
      // split base + query
      const [base, query] = mongoUrl.split("?");

      // ensure no trailing slash
      const cleanBase = base.endsWith("/")
        ? base.slice(0, -1)
        : base;

      // rebuild correctly
      const fullUrl = query
        ? `${cleanBase}/${dbName}?${query}`
        : `${cleanBase}/${dbName}`;

      console.log("🔗 Connecting to:", fullUrl.replace(/:.+@/, ":***@"));

      await mongoose.connect(fullUrl);
      isConnected = true;

      await seedAllFromBackup();
    }

    res.json({ success: true, dbName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// CRUD
app.post("/devices", async (req, res) => {
  const device = await Device.create(req.body);
  res.json(device);
});

app.get("/devices", async (req, res) => {
  const devices = await Device.find();
  res.json(devices);
});

app.put("/devices/:id", async (req, res) => {
  const updated = await Device.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// QR Code generation endpoint
app.get("/qr/:urlPath", async (req, res) => {
  try {
    const { urlPath } = req.params;
    const baseUrl = req.query.baseUrl || `${req.protocol}://${req.get('host')}`;
    const downloadUrl = `${baseUrl}/download/${urlPath}`;

    // Generate QR code as PNG buffer
    const qrBuffer = await QRCode.toBuffer(downloadUrl, {
      errorCorrectionLevel: 'H',
      type: 'png',
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(qrBuffer);
  } catch (error) {
    console.error('QR Code generation error:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Serve admin panel (index.html)
app.get("/", (req, res) => {
  const indexPath = path.join(process.cwd(), "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("<h1>index.html not found</h1>");
  }
});

// Serve download page with dynamic data
app.get("/download/:urlPath", async (req, res) => {
  try {
    const { urlPath } = req.params;
    
    // Find device by urlPath
    const device = await Device.findOne({ urlPath });
    
    if (!device) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Not Found</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 50px;
              background: linear-gradient(135deg, #7ba72a 0%, #c4e538 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .error-box {
              background: white;
              padding: 50px;
              border-radius: 20px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
          </style>
        </head>
        <body>
          <div class="error-box">
            <h1>404 - Device Not Found</h1>
            <p>The device with URL path "${urlPath}" does not exist.</p>
          </div>
        </body>
        </html>
      `);
    }

    // Read the download.html template
    const templatePath = path.join(process.cwd(), "download.html");
    let html = fs.readFileSync(templatePath, "utf-8");

    // Get current URL for QR code generation
    const currentUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    // Replace placeholders with actual data
    html = html.replace(/מיקום: <strong>תל אביב<\/strong>/g, 
                       `מיקום: <strong>${device.shopName}</strong>`);
    
    // Inject the current URL into the JavaScript
    html = html.replace('const pageUrl = window.location.href;', 
                       `const pageUrl = "${currentUrl}";`);

    res.send(html);
  } catch (error) {
    console.error('Download page error:', error);
    res.status(500).send("<h1>Server Error</h1>");
  }
});

// Documentation routes
const DOCS_DIR = path.join(process.cwd(), "docs");

function renderPage(title, content) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>

  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Highlight.js -->
  <link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"/>

  <style>
    /* Extra spacing for readability */
    .prose p {
      margin-bottom: 1.25rem;
    }

    .prose li {
      margin-bottom: 0.75rem;
    }

    .prose h2 {
      margin-top: 2.5rem;
      margin-bottom: 1rem;
    }

    .prose h3 {
      margin-top: 2rem;
      margin-bottom: 0.75rem;
    }

    .prose img {
      margin: 1.5rem auto;
      border-radius: 0.75rem;
    }

    .prose pre {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
  </style>
</head>

<body class="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">

  <div class="max-w-4xl mx-auto px-4 py-10">
    <div class="bg-white rounded-2xl shadow-xl p-6 md:p-10 prose prose-slate max-w-none">

      <div class="flex justify-between mb-8">
        <a href="/" class="text-green-600 font-semibold">← Home</a>
        <a href="/doc" class="text-green-600 font-semibold">← Docs</a>
      </div>

      ${content}

    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script>hljs.highlightAll();</script>

</body>
</html>
`;
}


app.get("/doc", (req, res) => {
  if (!fs.existsSync(DOCS_DIR)) {
    return res.send(renderPage(
      "Documentation",
      `<h2>No documentation found</h2>`
    ));
  }

  const files = fs.readdirSync(DOCS_DIR)
    .filter(f => f.endsWith(".md"));

  const links = files.map(f => {
    const name = path.basename(f, ".md");
    const title = name
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

    return `
      <li class="mb-3">
        <a
          href="/doc/${name}"
          class="text-green-600 hover:text-indigo-600 font-semibold"
        >
          ${title}
        </a>
      </li>
    `;
  }).join("");

  res.send(renderPage(
    "Documentation",
    `
    <h1>📘 Documentation</h1>
    <p class="text-gray-600">
      Select a document below to view the full guide.
    </p>

    <ul class="mt-6 list-disc pl-6">
      ${links}
    </ul>
    `
  ));
});
function fixImagePaths(md) {
  return md.replace(
    /<img\s+[^>]*src=["']([^"']+)["']/g,
    (match, src) => {
      if (src.startsWith("http") || src.startsWith("/")) return match;
      return match.replace(src, `/assets/${src.split("/").pop()}`);
    }
  );
}

marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }
});

app.get("/doc/:name", (req, res) => {
  const fileName = req.params.name + ".md";
  const filePath = path.join(DOCS_DIR, fileName);

  if (!fs.existsSync(filePath)) {
    return res.send(renderPage(
      "Not Found",
      `<h2>Document not found</h2>`
    ));
  }

  const raw = fs.readFileSync(filePath, "utf-8");
const fixed = fixImagePaths(raw);
const html = marked(fixed);


  res.send(renderPage(req.params.name, html));
});

app.listen(4000, () => {
  console.log("🚀 Server running on http://localhost:4000");
  console.log("📊 Admin Panel: http://localhost:4000");
  console.log("📘 Documentation: http://localhost:4000/doc");
  console.log("📱 Download Pages: http://localhost:4000/download/{urlPath}");
});