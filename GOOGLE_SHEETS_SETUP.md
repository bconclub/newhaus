# Google Sheets Lead Integration (Google Apps Script)

This guide sets up Google Sheets integration using a **Google Apps Script Web App**.
This is the perfect solution for static sites on Hostinger because everything runs in the browser — no backend server required.

## How It Works

1. Visitor submits a form on the website
2. The frontend sends the data directly to a Google Apps Script Web App (`mode: 'no-cors'`)
3. The Apps Script appends the lead as a new row in the **"Website"** tab
4. The form assumes success if the network request completes (opaque response)

---

## Step 1: Create the Google Sheet

1. Open this sheet:  
   `https://docs.google.com/spreadsheets/d/1vQ5lYKt04UkvyHCR-zvxRfFo-sC_enMvMvcvG4w4F34/edit`
2. Rename the target tab to **"Website"** (or create a new tab named "Website")
3. In the first row, add these column headers (exact order):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Date | Name | Email | Phone | Budget | Property Type | Location | Status | | Lead Type | Source | Origin | Referer | URl |

---

## Step 2: Create the Google Apps Script

1. In the sheet, go to **Extensions** → **Apps Script**
2. Delete the default `myFunction` code
3. Paste the entire code below into `Code.gs`
4. Save the project (click the floppy disk icon or press `Ctrl+S`)
5. Name the project `Newhaus Lead Capture`

### Apps Script Code

```javascript
const SHEET_ID = '1vQ5lYKt04UkvyHCR-zvxRfFo-sC_enMvMvcvG4w4F34';
const SHEET_NAME = 'Website';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet tab not found: ' + SHEET_NAME);
    }

    const row = [
      new Date(),                                    // A: Date
      data.name || '',                               // B: Name
      data.email || '',                              // C: Email
      data.phone || '',                              // D: Phone
      data.budget_range || '',                       // E: Budget
      data.property_type || '',                      // F: Property Type
      data.property_interest || data.page_name || '',// G: Location
      'New',                                         // H: Status
      '',                                            // I: (empty column)
      data.enquiry_type || data.form_type || '',     // J: Lead Type
      data.form_source || data.utm_source || '',     // K: Source
      data.utm_medium || data.landing_page || '',    // L: Origin
      data.referrer_domain || data.referrer || '',   // M: Referer
      data.source_page || ''                         // N: URl
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Newhaus Lead Capture endpoint is active'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

---

## Step 3: Deploy the Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon next to "Type" and select **Web app**
3. Configure:
   - **Description**: `Newhaus Lead Capture v1`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. You may need to authorize the script — click through the permissions
6. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/XXXXXXXX/exec`)

---

## Step 4: Configure the Website

1. In your project root, create a file named `.env` (same folder as `package.json`)
2. Add this line (replace with your actual Web app URL):

```bash
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

3. Rebuild the site:

```bash
npm run build
```

---

## Step 5: Deploy to Hostinger

Upload the `dist/` folder to your Hostinger `public_html` directory.  
Make sure `.htaccess` is included (it handles React Router):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Step 6: Test

1. Go to your live site and submit a test lead
2. Check the **"Website"** tab in your Google Sheet — a new row should appear within 10 seconds
3. If nothing appears, check the browser DevTools Network tab for errors

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Sheet not updating | Verify the tab is named exactly **"Website"** (case-sensitive) |
| CORS errors | With `mode: 'no-cors'`, CORS errors are suppressed. If the request still fails, verify the Web app is deployed with "Anyone" access |
| Permission errors | Re-authorize the Apps Script after code changes |
| Data in wrong columns | Ensure the 14 column headers match exactly and are in the correct order |
| No request in Network tab | Make sure `VITE_GOOGLE_SHEETS_URL` is set **before** running `npm run build` |
| "Google Sheets URL is not configured" error | The `.env` file is missing or the variable name is misspelled |

---

## Security Notes

- The Web app URL acts like an API key. Don't share it publicly.
- If the URL is compromised, redeploy the Apps Script to get a new URL.
- For extra security, you can add a simple secret token check in the Apps Script.
