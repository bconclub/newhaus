# Form Submission Payload Documentation

This document shows all the data that is sent to the webhook when a form is submitted.

## Common Fields (All Forms)

All forms include these base fields:

### Form Metadata
- `form_type` - Type of form: `"signup"`, `"contact"`, or `"site_visit_booking"`
- `form_source` - User intent/source:
  - `"Start Exploring"` - From header button
  - `"Call Back"` - From floating button
  - `"Sign Up"` - From property unlock forms
  - `"Book Site Visit"` - From site visit booking
  - `"Contact us"` - From contact page
- `submitted_at` - ISO timestamp when form was submitted
- `source_page` - Full URL of the page where form was submitted
- `page_name` - Page identifier (e.g., "home", "contact", "property-detail")

### User Information (All Forms)
- `name` - User's full name (required)
- `email` - User's email address (required)
- `phone` - User's phone number (required)

### UTM & Tracking Parameters (All Forms)
- `utm_source` - Traffic source (e.g., "google", "facebook")
- `utm_medium` - Marketing medium (e.g., "cpc", "social")
- `utm_campaign` - Campaign name
- `utm_content` - Ad content identifier
- `utm_term` - Keyword term
- `utm_timestamp` - When UTM was first seen (ISO timestamp)

### Ad Platform Click IDs (All Forms)
- `gclid` - Google Ads Click ID
- `fbclid` - Facebook Click ID
- `msclkid` - Microsoft Advertising Click ID
- `ttclid` - TikTok Click ID
- `li_fat_id` - LinkedIn Click ID

### Referrer Information (All Forms)
- `referrer` - Full referrer URL
- `referrer_domain` - Referrer domain name
- `ref` - Custom referrer parameter
- `landing_page` - Full landing page URL
- `landing_page_path` - Landing page path

---

## 1. SignupForm Payload

**Used for:** Start Exploring, Call Back, Sign Up (property unlock)

### Additional Fields:
- `budget_range` - Selected budget range (optional):
  - `"1-2 Cr"`
  - `"2-3 Cr"`
  - `"3-5 Cr"`
  - `"5 Cr+"`
  - `"Prefer not to say"`
  - `null` if not selected
- `property_type` - Selected property type (required):
  - `"2 BHK"`
  - `"3 BHK"`
  - `"4 BHK"`
  - `"5 BHK"`
  - `"Penthouse"`
  - `"Villa"`

### Example Payload:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "budget_range": "3-5 Cr",
  "property_type": "3 BHK",
  "form_type": "signup",
  "form_source": "Start Exploring",
  "submitted_at": "2024-01-15T10:30:00.000Z",
  "source_page": "https://newhaus.in/",
  "page_name": "home",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "winter_sale",
  "utm_content": "ad_variant_1",
  "utm_term": "luxury apartments",
  "utm_timestamp": "2024-01-15T10:25:00.000Z",
  "gclid": "EAIaIQobChMI...",
  "fbclid": null,
  "msclkid": null,
  "ttclid": null,
  "li_fat_id": null,
  "referrer": "https://www.google.com/",
  "referrer_domain": "www.google.com",
  "ref": null,
  "landing_page": "https://newhaus.in/?utm_source=google&utm_medium=cpc",
  "landing_page_path": "/"
}
```

---

## 2. ContactForm Payload

**Used for:** Contact Us page

### Additional Fields:
- `enquiry_type` - Type of enquiry (required):
  - `"Job"`
  - `"Business Enquiry"`
  - `"Callback"`
  - `"Partnership"`
  - `"General Inquiry"`
  - `"Media Inquiry"`
- `notes` - User's message/notes (required)
- `property_interest` - Property name if detected from URL (optional)

### Example Payload:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+919876543211",
  "enquiry_type": "Business Enquiry",
  "notes": "I'm interested in partnership opportunities...",
  "property_interest": "Embassy Lake Terraces",
  "form_type": "contact",
  "form_source": "Contact us",
  "submitted_at": "2024-01-15T11:00:00.000Z",
  "source_page": "https://newhaus.in/contact",
  "page_name": "contact",
  "utm_source": "facebook",
  "utm_medium": "social",
  "utm_campaign": "brand_awareness",
  "utm_content": null,
  "utm_term": null,
  "utm_timestamp": "2024-01-15T10:55:00.000Z",
  "gclid": null,
  "fbclid": "IwAR123...",
  "msclkid": null,
  "ttclid": null,
  "li_fat_id": null,
  "referrer": "https://www.facebook.com/",
  "referrer_domain": "www.facebook.com",
  "ref": null,
  "landing_page": "https://newhaus.in/?fbclid=IwAR123...",
  "landing_page_path": "/"
}
```

---

## 3. BookSiteVisitForm Payload

**Used for:** Book Site Visit (property detail pages)

### Additional Fields:
- `visit_date` - Preferred visit date (required, format: YYYY-MM-DD)
- `visit_time` - Preferred visit time (required):
  - `"11 AM"` through `"6 PM"` (1-hour slots)
- `property_interest` - Property name (auto-detected from URL)

### Example Payload:
```json
{
  "name": "Mike Johnson",
  "email": "mike@example.com",
  "phone": "+919876543212",
  "visit_date": "2024-01-20",
  "visit_time": "2 PM",
  "property_interest": "Embassy Boulevard",
  "form_type": "site_visit_booking",
  "form_source": "Book Site Visit",
  "submitted_at": "2024-01-15T12:00:00.000Z",
  "source_page": "https://newhaus.in/properties/embassy-boulevard",
  "page_name": "property-detail",
  "utm_source": "linkedin",
  "utm_medium": "social",
  "utm_campaign": "property_showcase",
  "utm_content": "embassy_boulevard_ad",
  "utm_term": null,
  "utm_timestamp": "2024-01-15T11:45:00.000Z",
  "gclid": null,
  "fbclid": null,
  "msclkid": null,
  "ttclid": null,
  "li_fat_id": "123456789",
  "referrer": "https://www.linkedin.com/",
  "referrer_domain": "www.linkedin.com",
  "ref": null,
  "landing_page": "https://newhaus.in/properties/embassy-boulevard?utm_source=linkedin",
  "landing_page_path": "/properties/embassy-boulevard"
}
```

---

## Notes

1. **Empty Values**: Empty strings, null, and undefined values are automatically removed from the payload before sending (via `cleanPayload` function).

2. **Optional Fields**: Fields marked as optional may be `null` or omitted entirely if not provided.

3. **Property Interest**: Only included if a property is detected from the URL or passed as a prop.

4. **Tracking Data**: All UTM and tracking parameters are captured on first page visit and stored in localStorage/sessionStorage, then included in all subsequent form submissions.

5. **Timestamp Format**: All timestamps are in ISO 8601 format (e.g., `"2024-01-15T10:30:00.000Z"`).

---

## Data Flow to Google Sheets

When forms are submitted:
1. Data is sent to webhook: `https://build.goproxe.com/webhook/newhaus-website`
2. Webhook receives complete payload with all fields listed above
3. Webhook can then push this data to Google Sheets for analysis
4. All tracking data (UTM, ad IDs, referrer) is included for campaign analysis

