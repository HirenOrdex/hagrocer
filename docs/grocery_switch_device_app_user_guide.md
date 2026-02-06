

# 🛒 Grocery Switch Device App – User Guide



## 📌 What is this app?

This application allows you to:

- Connect to your MongoDB database (for example: **Grocery**)
- Automatically restore initial data from backup (if the database is empty)
- View, add, and edit Shelly switch devices

### Requirements
- Internet connection
- A modern browser (Chrome recommended)
- MongoDB Atlas account (Free tier is sufficient)


## 🚀 Step 1: Download & Run the App

1. Download the project ZIP file provided by the support team  
2. Extract the ZIP file (Right-click → Extract)
3. Open the extracted folder  

![Open Folder](/assets/cmd.png)

4. Open **Terminal / Command Prompt** inside the folder  
5. Install dependencies:
```bash
   npm install
```

![npm install](/assets/npmi.png)

6. Start the app:

```bash
   npm run start
   ```

7. Open the documentation:

   ```
   http://localhost:4000/doc
   ```

✅ The app is now running.

---

## 🌐 Step 2: Create a MongoDB Account

1. Go to:
   [https://www.mongodb.com/](https://www.mongodb.com/)

   ![MongoDB Website](/assets/image5.png)

2. Click **Sign Up**
   ![Sign Up](/assets/image2.png)

3. Register using Email / Google / GitHub

4. Verify your email address

---

## 🗄️ Step 3: Create a Free Database (Atlas)

1. Log in to **MongoDB Atlas**
2. Click **Build a Database**
3. Select **M0 – Free Tier**
4. Choose any Cloud Provider & Region
5. Click **Create**

⏳ Wait 1–3 minutes for the cluster to be ready.

---

## 🔐 Step 4: Security Setup (IMPORTANT)

### 4.1 Create a Database User

1. Go to **Database Access**
   ![Database Access](/assets/image6.png)

2. Click **Add New Database User**

3. Username (example): `grocery_admin`

4. Password: **Save this securely**

5. Role: **Read and write to any database**

6. Click **Save**

---

### 4.2 Allow Network Access

1. Go to **Network Access**
   ![Network Access](/assets/image8.png)

2. Click **Add IP Address**

3. Select **Allow Access From Anywhere**

This adds:

```
0.0.0.0/0
```

4. Click **Save**

---

## 🔗 Step 5: Get MongoDB Connection URL

1. Go to **Database → Connect**
   ![Connect DB](/assets/image9.png)

2. Select **Connect your application**
   ![Connect App](/assets/image10.png)

3. Copy the connection string:

   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net
   ```

4. Replace:

   * `<username>` → Database username
   * `<password>` → Database password

---

## 🖥️ Step 6: Connect in the App

Open:

```
http://localhost:4000/
```

1. Paste the MongoDB URL (**without database name**)
2. Enter database name:

   ```
   Grocery
   ```
3. Click **Connect**

✅ You should see:

```
Connected Database: Grocery
```

---

## ♻️ Step 7: Automatic Backup Restore

* If the database is empty, the app will automatically restore data from the **backup** folder
* Runs only once
* No duplicates

✅ No action required from the user.

---
Step 8 (a): Base URL for Download Page

Enter only the domain in the field (example: https://yourdomain.com).

The system automatically uses /download.html.

If your download page is not download.html, please contact the support team. They will update the backend so the QR code works correctly.

- Example:

- ✅ https://yourdomain.com/download.html → Just enter 
- https://yourdomain.com

- ❌ https://yourdomain.com/app-download → Contact support
## 🔌 Step 8(b): Add a Switch Device

For Shelly device setup, read:
👉 [Shelly Device Setup Guide](/doc/shelly_device_setup_guide)

Fill in:

* Shop Name
* Device ID
* Shelly Email
* Shelly Password
* Shelly URL

Click **Add**.

---

## ✏️ Step 9: View & Edit Devices

* All devices appear in the table
* also QR code of that store will available for downlaod s
* Click inside any field to edit
* Changes are saved automatically

✅ No save button required.

---

## ❗ Common Problems

### Connection Failed

* Check MongoDB username & password
* Ensure Network Access includes `0.0.0.0/0`

### No Data Appearing

* Database already contained data
* Backup restores only when database is empty

---

## 🆘 Support

If you face any issues:

* Take a screenshot
* Contact the support team
