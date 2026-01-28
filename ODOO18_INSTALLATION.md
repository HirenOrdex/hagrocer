# התקנה מהירה ל-Odoo 18 / Quick Odoo 18 Installation Guide

## 🚀 התקנה מהירה (5 דקות)

### שלב 1: הכנת הקבצים

1. צור תיקיית מודול חדשה:
```bash
cd /path/to/odoo/addons
mkdir grocery_web_pages
cd grocery_web_pages
```

2. צור את המבנה הבסיסי:
```bash
mkdir -p controllers
mkdir -p views
mkdir -p static/description
touch __init__.py
touch __manifest__.py
touch controllers/__init__.py
touch controllers/main.py
```

### שלב 2: הקבצים הנדרשים

#### 📄 __init__.py (בתיקייה הראשית)
```python
from . import controllers
```

#### 📄 controllers/__init__.py
```python
from . import main
```

#### 📄 controllers/main.py
```python
# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request

class GroceryWebPages(http.Controller):
    
    @http.route('/', type='http', auth='public', website=True)
    def index(self, **kw):
        """Main download page with QR code"""
        return request.render('grocery_web_pages.index_template', {
            'page_url': request.httprequest.url,
        })
    
    @http.route('/contactus', type='http', auth='public', website=True)
    def contactus(self, **kw):
        """Contact us page"""
        return request.render('grocery_web_pages.contactus_template')
    
    @http.route('/privacy-policy', type='http', auth='public', website=True)
    def privacy_policy(self, **kw):
        """Privacy policy page"""
        return request.render('grocery_web_pages.privacy_template')
    
    @http.route('/old-home', type='http', auth='public', website=True)
    def old_home(self, **kw):
        """Alternative home page"""
        return request.render('grocery_web_pages.old_home_template')
    
    @http.route('/contactus/submit', type='http', auth='public', methods=['POST'], csrf=False)
    def contact_submit(self, **post):
        """Handle contact form submission"""
        # כאן תוכל לשמור את הנתונים ב-Odoo
        name = post.get('name')
        email = post.get('email')
        phone = post.get('phone')
        message = post.get('message')
        
        # TODO: שמור ב-database או שלח אימייל
        
        return request.redirect('/contactus?success=1')
```

#### 📄 __manifest__.py
```python
# -*- coding: utf-8 -*-
{
    'name': 'Grocery Web Pages',
    'version': '18.0.1.0.0',
    'category': 'Website',
    'summary': 'Hebrew web pages for Automatic Grocery app',
    'description': """
        Complete web pages in Hebrew for Automatic Grocery:
        - Main download page with working QR code
        - Contact us page
        - Privacy policy
        - Alternative home page
        
        Features:
        - Full RTL support
        - Responsive design
        - Working buttons and forms
        - QR code generation
    """,
    'author': 'Automatic Grocery Ltd.',
    'website': 'https://www.hagrocery.co.il',
    'depends': ['website', 'web'],
    'data': [
        'views/templates.xml',
    ],
    'assets': {},
    'installable': True,
    'application': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
```

#### 📄 views/templates.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <!-- Index/Download Page -->
    <template id="index_template" name="Download Page">
        <t t-call="web.layout">
            <t t-set="head_website" t-value="True"/>
            <!-- כאן מוכנס התוכן של index.html -->
            <!-- העתק את כל התוכן מתוך <body> של index.html -->
        </t>
    </template>

    <!-- Contact Us Page -->
    <template id="contactus_template" name="Contact Us">
        <t t-call="web.layout">
            <t t-set="head_website" t-value="True"/>
            <!-- כאן מוכנס התוכן של contactus.html -->
        </t>
    </template>

    <!-- Privacy Policy Page -->
    <template id="privacy_template" name="Privacy Policy">
        <t t-call="web.layout">
            <t t-set="head_website" t-value="True"/>
            <!-- כאן מוכנס התוכן של privacy-policy.html -->
        </t>
    </template>

    <!-- Old Home Page -->
    <template id="old_home_template" name="Old Home">
        <t t-call="web.layout">
            <t t-set="head_website" t-value="True"/>
            <!-- כאן מוכנס התוכן של old-home.html -->
        </t>
    </template>
</odoo>
```

### שלב 3: המרת HTML לתבניות Odoo

עבור כל קובץ HTML, צריך להעתיק את התוכן פנימה ל-template:

**דוגמה עבור index.html:**
```xml
<template id="index_template" name="Download Page">
    <t t-call="web.layout">
        <t t-set="head_website" t-value="True"/>
        <t t-set="head">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"/>
            <style>
                /* הכנס כאן את כל ה-CSS מהקובץ המקורי */
            </style>
        </t>
        
        <!-- הכנס כאן את כל תוכן ה-HTML מהקובץ המקורי -->
        <!-- שים לב להחליף את page URL ב-: -->
        <input type="text" id="pageUrl" t-att-value="page_url" readonly="readonly"/>
        
        <!-- סקריפטים -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"/>
        <script>
            /* הכנס כאן את כל קוד ה-JavaScript */
        </script>
    </t>
</template>
```

### שלב 4: התקנה ב-Odoo

1. **הפעל מחדש את שרת Odoo:**
```bash
sudo systemctl restart odoo
# או
sudo service odoo restart
# או אם אתה מריץ ידנית:
./odoo-bin -c /path/to/odoo.conf
```

2. **התקן את המודול:**
   - היכנס ל-Odoo
   - לך ל: Apps → Update Apps List
   - חפש: "Grocery Web Pages"
   - לחץ על Install

3. **בדוק שהדפים עובדים:**
   - http://your-domain.com/
   - http://your-domain.com/contactus
   - http://your-domain.com/privacy-policy
   - http://your-domain.com/old-home

### שלב 5: התאמות אישיות (אופציונלי)

#### להוסיף לוגו של החברה:
```xml
<img src="/web/binary/company_logo" alt="Logo"/>
```

#### להוסיף תפריט ניווט:
```xml
<template id="header_template" inherit_id="website.layout" name="Custom Header">
    <xpath expr="//header" position="replace">
        <header class="custom-header">
            <!-- תוכן הכותרת שלך -->
        </header>
    </xpath>
</template>
```

#### לשמור טופס יצירת קשר ב-database:
```python
@http.route('/contactus/submit', type='http', auth='public', methods=['POST'], csrf=False)
def contact_submit(self, **post):
    # צור רשומה חדשה
    request.env['crm.lead'].sudo().create({
        'name': f"Contact Form: {post.get('name')}",
        'contact_name': post.get('name'),
        'email_from': post.get('email'),
        'phone': post.get('phone'),
        'description': post.get('message'),
        'type': 'lead',
    })
    return request.redirect('/contactus?success=1')
```

## 🎯 טיפים חשובים

### 1. Cache
אם לא רואה שינויים, נקה cache:
```bash
# נקה assets
rm -rf ~/.local/share/Odoo/filestore/*/
# או דרך Odoo:
Settings → Technical → Database Structure → Clear Assets Cache
```

### 2. Debug Mode
להפעיל debug mode:
- הוסף `?debug=1` לכתובת ה-URL
- או: Settings → Activate the developer mode

### 3. Logs
לבדוק שגיאות:
```bash
tail -f /var/log/odoo/odoo-server.log
```

### 4. Permissions
וודא הרשאות נכונות:
```bash
sudo chown -R odoo:odoo /path/to/odoo/addons/grocery_web_pages
sudo chmod -R 755 /path/to/odoo/addons/grocery_web_pages
```

## 🔒 אבטחה

### הגנת CSRF
הוסף `csrf=True` ל-routes הדורשים הגנה:
```python
@http.route('/contactus/submit', type='http', auth='public', 
            methods=['POST'], csrf=True, website=True)
```

### Rate Limiting
הגבל מספר בקשות לטופס:
```python
from werkzeug.exceptions import TooManyRequests
import time

# הוסף זמן המתנה בין שליחות
```

## 🧪 בדיקות

### בדוק שהכל עובד:
```python
# Test route access
curl http://localhost:8069/
curl http://localhost:8069/contactus
curl http://localhost:8069/privacy-policy

# Test QR code generation (open in browser)
# Test contact form submission
# Test mobile responsiveness
```

## 📱 תמיכה במובייל

הדפים מותאמים אוטומטית למובייל, אבל בדוק:
- QR code נראה טוב
- כפתורים גדולים מספיק
- טקסט קריא
- ניווט קל

## 🎨 עיצוב מותאם אישית

לשנות צבעים, ערוך את ה-CSS בתוך ה-template:
```css
/* שנה את צבעי הגרדיאנט */
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

## 📞 תמיכה

בעיות? צור קשר:
- WhatsApp: https://wa.me/message/J5IJ37I2VZ4LE1
- Email: support@hagrocery.co.il

---

**הערה חשובה:** קבצי ה-HTML המצורפים הם standalone ועובדים גם מחוץ ל-Odoo!

**בהצלחה עם ההתקנה! 🚀**
