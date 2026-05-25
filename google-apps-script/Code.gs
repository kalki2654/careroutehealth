/**
 * CareRoute Health - Google Sheets Form Submission Handler
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet named "CareRoute Leads"
 * 2. Create a tab named "Submissions" with these column headers in row 1:
 *    Timestamp | Path | Help Type | Timing | Supporting | Name | Email | Phone | Country | Family City India | Insurance Provider | Notes
 * 3. Open Google Apps Script (Extensions > Apps Script)
 * 4. Paste this code
 * 5. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the deployment URL and paste it in your .env.local file as:
 *    NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=your_deployment_url_here
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Open the Google Sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Submissions");
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: "Sheet 'Submissions' not found"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Prepare the row data
    const timestamp = new Date();
    const path = data.path || "";
    const helpType = data.helpType || "";
    const timing = data.timing || "";
    const supporting = data.supporting || "";
    const name = data.name || "";
    const email = data.email || "";
    const phone = data.phone || "";
    const country = data.country || "";
    const familyCityIndia = data.familyCityIndia || "";
    const insuranceProvider = data.insuranceProvider || "";
    const notes = data.notes || "";
    
    // Append the row to the sheet
    sheet.appendRow([
      timestamp,
      path,
      helpType,
      timing,
      supporting,
      name,
      email,
      phone,
      country,
      familyCityIndia,
      insuranceProvider,
      notes
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: "Submission received successfully"
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testSubmission() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        path: "USA",
        helpType: "Understanding my insurance coverage, Cost estimate",
        timing: "Before care",
        supporting: "",
        name: "Test User",
        email: "test@example.com",
        phone: "+1 555-0000",
        country: "",
        familyCityIndia: "",
        insuranceProvider: "Blue Cross",
        notes: "Help with: Understanding my insurance coverage, Cost estimate, Timing: Before care"
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
