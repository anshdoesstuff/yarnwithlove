# Yarn With Love — functional storefront

## Included
- Responsive storefront
- Product categories and sorting
- Product detail modal
- Cart with quantity controls
- Checkout/order form
- WhatsApp order generation
- Instagram links
- Admin product catalog at `admin.html`
- Product image upload in admin
- JSON export/import for the product catalog
- LocalStorage cart/catalog persistence

## Publishing on GitHub Pages
Upload the contents of this folder to a GitHub repository, then enable GitHub Pages from the repository's Settings → Pages. Choose the branch and folder where `index.html` is located. Keep the HTML, JavaScript, stylesheet and `images` folder together because the site uses relative paths.

## Before publishing
1. `app.js` is configured to send WhatsApp orders to **+91 99155 93966**. Update `WA_NUMBER` there if the business number changes (use country code and digits only).
2. Change `ADMIN_PASSWORD` before publishing. The current default is `admin123`.
3. Review product names, descriptions and prices in `catalog.js`.

## Important limitation
Instagram blocks reliable public retrieval of the account's CDN-hosted photos, so this package does not pretend that generated or third-party photos are the brand's actual photos. The storefront is ready for the real product photos to be uploaded through the admin page or copied into `/images`.

## Admin
Open `admin.html`.
Default password: `admin123` (change it before publishing).

## WhatsApp
Orders are sent as a pre-filled WhatsApp message. The customer still needs to press send in WhatsApp. The site does not process online payments.

## Production upgrade
For a real multi-device admin panel, inventory, customer/order database, authentication, payment gateway and automatic order status, connect the frontend to a backend/database (e.g. Supabase/Firebase + Razorpay/Stripe as appropriate).

## Bugs checked
The HTML/CSS/JavaScript files pass syntax checks. The direct-buy WhatsApp total calculation has also been corrected. The admin password is checked in the browser, so it is suitable for a demo only and should not be treated as secure production authentication.


## Product catalog

The storefront includes 20 product photos supplied for this shop. The listed prices are starting suggestions based on the visible size and detail of each piece; confirm them against your material and labour costs. Edit products through the admin page or update `catalog.js`.

## Logo
The uploaded Yarn With Love logo is included as `images/logo.png` and is used on the storefront and admin header.


## Product listing fixes
- Admin catalog now validates names/prices and refreshes after add/delete/import.
- Product images are resized/compressed on upload to reduce browser storage quota errors.
- Storefront refreshes its catalog when returning to the tab or when admin changes it in another tab.
- All placeholder image assets are included.
- Recommended: serve the extracted folder through a local web server or host it on the web, rather than opening `file://` URLs, so both pages share the same browser origin and catalog storage.
