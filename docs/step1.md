
# 🧩 How to Install Node.js & Run the App (Beginner Guide)

Just follow the steps in order 

---

## ✅ What You Need Before Starting

- A computer (Windows or Mac)
- Internet connection
- Google Chrome browser (recommended)

---

## 🟢 Step 1: Download Node.js

1. Open this website in your browser:
   👉 https://nodejs.org/

2. You will see two buttons:
   - **LTS** (Recommended)
   - Current

   ✅ **Click the LTS button**

3. The download will start automatically.

---

## 🟢 Step 2: Install Node.js

### On Windows
1. Open the downloaded file (`.msi`)
2. Click **Next**
3. Accept the agreement
4. Keep clicking **Next**
5. Click **Install**
6. Click **Finish**

### On Mac
1. Open the downloaded `.pkg` file
2. Click **Continue**
3. Follow the on-screen steps
4. Click **Install**

✅ Node.js is now installed.

---

## 🟢 Step 3: Verify Node.js Installation

1. Open **Command Prompt** (Windows)  
   or **Terminal** (Mac)

2. Type this and press **Enter**:

```bash
   node -v
```
3. You should see a version number (example: `v18.19.0`)

✅ This means Node.js is installed correctly.

---

## 🟢 Step 4: Open the Project Folder

1. Download the project ZIP file provided by the support team
2. Right-click the ZIP file → **Extract**
3. Open the extracted folder

---

## 🟢 Step 5: Open Terminal / Command Prompt in Project Folder

### On Windows

* Hold **Shift**
* Right-click inside the folder
* Click **Open Command Window here**
  or **Open in Terminal**

### On Mac

* Right-click the folder
* Click **New Terminal at Folder**

---

## 🟢 Step 6: Install Project Dependencies

In the terminal window, type:

```bash
npm install
```

⏳ This may take 1–2 minutes.
You will see many lines of text — **this is normal**.

✅ When finished, the cursor will return to a new line.

---

## 🟢 Step 7: Start the Application

In the same terminal, type:

```bash
npm run start
```

You should see something like:

```
Server running on http://localhost:4000
```

✅ The app is now running.

---

## 🟢 Step 8: Open the App in Browser

1. Open Google Chrome
2. Go to:

   ```
   http://localhost:4000/
   ```

To open documentation:

```
http://localhost:4000/doc
```

---

## ❗ Important Notes

* ❌ Do NOT close the terminal while the app is running
* 🔁 If you restart your
