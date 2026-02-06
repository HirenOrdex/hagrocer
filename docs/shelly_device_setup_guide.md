# Shelly Device Setup Guide

This guide explains **how to find a Shelly Device ID** and **how to fill Shelly details in the Grocery Switch Device App**.

This is written for **non-technical users**. Follow the steps carefully.

---

## Step 1: Login to Shelly Cloud

1. Open this link in **Google Chrome**:
   
   https://control.shelly.cloud/

2. Login using your **Shelly Email** and **Password**

> ⚠️ Make sure you use the **same email for all stores** (recommended)

---

## Step 2: Open Developer Tools (Inspect)

1. After login, stay on the Shelly dashboard
2. Press:
   ```
   F12
   ```
   OR
   - Right click anywhere on the page
   - Click **Inspect**

3. Open the **Network** tab

---

## Step 3: Find Devices API Call

1. In the Shelly dashboard, click **All Devices**
2. In the Network tab, search for a request containing:
   ```
   v2/devices/get
   ```
3. Click on that request

---

## Step 4: Check API Response
![Connect DB](/assets/res.png)
In the **Response** section, you will see something like this:
**make sure that decive is online**
```json
[
  {
    "id": "34cdb07d0850",
    "type": "relay",
    "code": "S3SW-001X16EU",
    "gen": "G2",
    "online": 1
  }
]
```

---

## Step 5: Copy Device ID

From the response:

- Find the field:
  ```
  "id"
  ```
- Copy the value

Example:
```
34cdb07d0850
```

👉 This value is your **Device ID**

---

## Step 6: Fill Device Details in App

In the **frontend page**, fill the form as follows:

### Required Fields

```sh
Device ID:        34cdb07d0850
SHELLY_URL:       https://shelly-186-eu.shelly.cloud/v2/devices/api/set/switch
SHELLY_PASSWORD:  b950f0ba546f6e9efb5093fd88c7460ba5d2f80e
SHELLY_EMAIL:     gelmanavi@gmail.com
urlPath:          אורני
shopName:         אורני
```

> ℹ️ If multiple stores use the **same Shelly email**, reuse:
> - SHELLY_EMAIL
> - SHELLY_PASSWORD
> - SHELLY_URL

Only **Device ID**, **urlPath**, and **shopName** change per store.

---

## Step 7: Save Device

1. Click **Add**
2. Device will appear in the list
3. You can edit fields directly if needed

---

## Important Notes

- Always use **Google Chrome**
- Device ID must be copied exactly
- Do NOT share Shelly password publicly
- Backup will NOT duplicate existing devices

---

## You’re Done 🎉

Your Shelly device is now connected to the Grocery Switch Device App.
### Share your MongoDB connection string with the support team one time only.
### If you ever change the connection string, please contact the team again to update it in the app backend.
After the update, Shelly will work for all stores.
If something does not work:
- Recheck Device ID
- Ensure Shelly device is **online**
- Contact support with a screenshot
