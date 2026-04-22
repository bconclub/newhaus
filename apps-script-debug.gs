// DEBUG VERSION — paste this into your Apps Script and redeploy
const SHEET_ID = '1vQ5lYKt04UkvyHCR-zvxRfFo-sC_enMvMvcvG4w4F34';
const SHEET_NAME = 'Website';
const LOG_SHEET_NAME = 'DebugLogs'; // Create this tab to see raw requests

function doPost(e) {
  try {
    // Log raw request for debugging
    logToSheet('POST received', JSON.stringify(e), e.postData ? e.postData.contents : 'NO POSTDATA');

    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet tab not found: ' + SHEET_NAME);
    }

    const row = [
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.budget_range || '',
      data.property_type || '',
      data.property_interest || data.page_name || '',
      'New',
      '',
      data.enquiry_type || data.form_type || '',
      data.form_source || data.utm_source || '',
      data.utm_medium || data.landing_page || '',
      data.referrer_domain || data.referrer || '',
      data.source_page || ''
    ];

    sheet.appendRow(row);
    logToSheet('SUCCESS', 'Row appended', JSON.stringify(row));

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    logToSheet('ERROR', error.toString(), e.postData ? e.postData.contents : 'NO POSTDATA');
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Debug endpoint active'
  })).setMimeType(ContentService.MimeType.JSON);
}

function logToSheet(status, message, rawData) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let logSheet = ss.getSheetByName(LOG_SHEET_NAME);
    if (!logSheet) {
      logSheet = ss.insertSheet(LOG_SHEET_NAME);
      logSheet.appendRow(['Timestamp', 'Status', 'Message', 'RawData']);
    }
    logSheet.appendRow([new Date(), status, message, rawData.substring(0, 50000)]);
  } catch (e) {
    // Silently fail logging
  }
}
