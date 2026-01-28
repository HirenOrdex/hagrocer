# אוטומטיק גרוסרי - Odoo 18 Custom Addon
## Automatic Grocery Download Pages

### 📋 תיאור כללי / Overview
אוסף של 3 דפי אינטרנט בעברית עבור מערכת הורדת האפליקציה של אוטומטיק גרוסרי, מותאמים לשילוב ב-Odoo 18.

This package contains 3 Hebrew pages for the Automatic Grocery app download system, ready to integrate with Odoo 18.

### 📦 הקבצים הכלולים / Included Files

1. **index.html** - דף הורדת האפליקציה הראשי עם QR קוד / Main app download page with QR code
2. **contactus.html** - דף יצירת קשר / Contact us page
3. **privacy-policy.html** - מדיניות פרטיות / Privacy policy page
4. **old-home.html** - דף בית אלטרנטיבי / Alternative home page

### ✨ תכונות עיקריות / Key Features

#### 🔸 דף הורדה ראשי (index.html)
- ✅ QR Code שעובד - משתמש ב-QRCode.js CDN
- ✅ כפתור הורדת QR מתפקד
- ✅ כפתור שיתוף קישור עובד
- ✅ כפתור העתקת URL פעיל
- ✅ לינקים ישירים ל-Google Play ו-App Store
- ✅ עיצוב רספונסיבי מלא
- ✅ RTL (Right to Left) support
- ✅ אנימציות חלקות

#### 🔸 דף יצירת קשר (contactus.html)
- ✅ טופס יצירת קשר מלא
- ✅ פרטי יצירת קשר (WhatsApp, אימייל, טלפון)
- ✅ עיצוב מודרני וידידותי
- ✅ אימות טופס

#### 🔸 מדיניות פרטיות (privacy-policy.html)
- ✅ מסמך מקיף של מדיניות פרטיות
- ✅ 12 סעיפים מפורטים
- ✅ עיצוב קריא ומסודר
- ✅ תיבות הדגשה למידע חשוב

#### 🔸 דף בית אלטרנטיבי (old-home.html)
- ✅ דף נחיתה עם תכונות המוצר
- ✅ כרטיסי תכונות אינטראקטיביים
- ✅ קריאה לפעולה (CTA)
- ✅ עיצוב משיכה

### 🚀 התקנה והטמעה ב-Odoo 18 / Installation for Odoo 18

#### שיטה 1: שילוב עם המודול הקיים

1. **העתקת קבצים למודול:**
```bash
cd /path/to/your/odoo/addons/grocery_download
cp index.html static/src/templates/
cp contactus.html static/src/templates/
cp privacy-policy.html static/src/templates/
cp old-home.html static/src/templates/
```

2. **יצירת Routes חדשים ב-controllers/main.py:**
```python
from odoo import http
from odoo.http import request

class GroceryDownloadController(http.Controller):
    
    # דף הורדה ראשי
    @http.route('/download', type='http', auth='public', website=True)
    def download_page(self, **kwargs):
        return request.render('grocery_download.index_page')
    
    # דף יצירת קשר
    @http.route('/contactus', type='http', auth='public', website=True)
    def contact_page(self, **kwargs):
        return request.render('grocery_download.contact_page')
    
    # מדיניות פרטיות
    @http.route('/privacy-policy', type='http', auth='public', website=True)
    def privacy_page(self, **kwargs):
        return request.render('grocery_download.privacy_page')
    
    # דף בית אלטרנטיבי
    @http.route('/old-home', type='http', auth='public', website=True)
    def old_home_page(self, **kwargs):
        return request.render('grocery_download.old_home_page')
```

3. **יצירת Templates ב-views/pages_templates.xml:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <!-- Index Page Template -->
    <template id="index_page" name="Download Page">
        <t t-call="web.layout">
            <t t-set="head">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"/>
            </t>
            <t t-raw="0" t-call-assets="grocery_download.index_html"/>
        </t>
    </template>

    <!-- Contact Page Template -->
    <template id="contact_page" name="Contact Page">
        <t t-call="web.layout">
            <t t-raw="0" t-call-assets="grocery_download.contactus_html"/>
        </t>
    </template>

    <!-- Privacy Page Template -->
    <template id="privacy_page" name="Privacy Policy Page">
        <t t-call="web.layout">
            <t t-raw="0" t-call-assets="grocery_download.privacy_html"/>
        </t>
    </template>

    <!-- Old Home Page Template -->
    <template id="old_home_page" name="Old Home Page">
        <t t-call="web.layout">
            <t t-raw="0" t-call-assets="grocery_download.old_home_html"/>
        </t>
    </template>
</odoo>
```

4. **עדכון __manifest__.py:**
```python
{
    'name': 'Grocery Download Pages',
    'version': '18.0.1.0.0',
    'category': 'Website',
    'summary': 'App Download Pages with QR Code',
    'description': """
        Hebrew pages for grocery app download with:
        - Working QR Code generation
        - Contact form
        - Privacy policy
        - Alternative home page
    """,
    'author': 'Your Company',
    'website': 'https://www.hagrocery.co.il',
    'depends': ['website', 'web'],
    'data': [
        'views/pages_templates.xml',
        'views/backend_menu.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'grocery_download/static/src/css/*.css',
            'grocery_download/static/src/js/*.js',
        ],
    },
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}
```

#### שיטה 2: שימוש כדפי HTML סטטיים

אם אתה רוצה להשתמש בדפים מחוץ ל-Odoo:

1. העלה את הקבצים לשרת אינטרנט
2. וודא שהקבצים נגישים דרך URL
3. הקבצים עצמאיים לחלוטין ולא דורשים תלויות נוספות

### 🔧 תיקונים שבוצעו / Issues Fixed

#### ✅ בעיית QR Code
**בעיה:** QR Code לא הוצג (הראה "טוען קוד QR...")
**פתרון:** 
- הוספת CDN של QRCode.js: `https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js`
- קוד JavaScript מלא לייצור QR
- טיפול בשגיאות

#### ✅ בעיית כפתורים
**בעיה:** כפתורים לא עבדו
**פתרון:**
- הוספת Event Listeners לכל הכפתורים
- פונקציות JavaScript מלאות
- Fallback למכשירים ללא Web Share API
- התראות למשתמש (Notifications)

#### ✅ בעיות עיצוב
**פתרון:**
- RTL מלא לכל הדפים
- עיצוב רספונסיבי למובייל וטאבלט
- אנימציות חלקות
- צבעים והדרגות עקביות

### 📱 תמיכה בדפדפנים / Browser Support
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS/Android)

### 🎨 עיצוב וצבעים / Design & Colors
- **צבע ראשי:** Gradient #667eea → #764ba2
- **פונט:** Segoe UI, Tahoma, Geneva, Verdana
- **כיווניות:** RTL (Right to Left)
- **מרווחים:** Bootstrap 5.1.3

### 📚 ספריות חיצוניות / External Libraries
- Bootstrap 5.1.3
- Font Awesome 6.0.0
- QRCode.js 1.0.0

### 🔗 קישורים חשובים / Important Links
- Google Play: `https://play.google.com/store/apps/details?id=com.automaticgrocery`
- App Store: `https://apps.apple.com/app/%D7%94%D7%92%D7%A8%D7%95%D7%A1%D7%A8%D7%99/id6501989391`
- WhatsApp: `https://wa.me/message/J5IJ37I2VZ4LE1`
- Email: `support@hagrocery.co.il`

### 🧪 בדיקות / Testing

#### בדיקת QR Code:
1. פתח את index.html בדפדפן
2. בדוק שהקוד מוצג
3. סרוק עם מכשיר נייד
4. לחץ על "הורד QR" - הקובץ צריך להישמר
5. לחץ על "שתף קישור" - חלון שיתוף צריך להיפתח

#### בדיקת טופס יצירת קשר:
1. פתח את contactus.html
2. מלא את השדות
3. שלח - צריכה להופיע הודעת הצלחה
4. הטופס צריך להתרוקן

#### בדיקה במובייל:
1. פתח בטלפון נייד
2. בדוק רספונסיביות
3. בדוק שכל הכפתורים עובדים
4. בדוק גלילה חלקה

### 🐛 פתרון בעיות / Troubleshooting

#### QR Code לא מופיע:
1. בדוק שיש חיבור לאינטרנט (צריך QRCode.js מ-CDN)
2. פתח Console (F12) ובדוק אם יש שגיאות
3. וודא שה-URL נטען נכון

#### כפתורים לא עובדים:
1. וודא שהדף נטען לחלוטין
2. בדוק Console לשגיאות JavaScript
3. נסה Refresh לדף

#### עיצוב שבור:
1. וודא שיש חיבור לאינטרנט (Bootstrap + Font Awesome)
2. בדוק שאין חסימה של CDN
3. נסה לנקות Cache

### 📞 תמיכה / Support
לשאלות או בעיות, צרו קשר:
- Email: support@hagrocery.co.il
- WhatsApp: https://wa.me/message/J5IJ37I2VZ4LE1

### 📄 רישיון / License
All rights reserved © Automatic Grocery Ltd.

---

**גרסה / Version:** 1.0.0  
**תאריך עדכון / Last Updated:** January 2026  
**תאימות / Compatible with:** Odoo 18.0+

### 🎯 הוראות שימוש מהירות / Quick Start

1. פתח את `index.html` בדפדפן
2. סרוק את ה-QR Code במכשיר נייד
3. הורד את האפליקציה
4. התחל לקנות!

**בהצלחה! / Good Luck! 🚀**
