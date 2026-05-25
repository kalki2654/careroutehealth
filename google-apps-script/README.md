# Google Sheets Integration Setup

This guide explains how to set up Google Sheets to receive form submissions from the CareRoute website.

## Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **CareRoute Leads**
4. Rename the first tab to: **Submissions**

## Step 2: Add Column Headers

In the first row of the "Submissions" tab, add these headers:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Path | Help Type | Name | Email | Phone | Country | Family City India | Insurance Provider | Notes |

## Step 3: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code in the editor
3. Copy the entire contents of `Code.gs` from this folder
4. Paste it into the Apps Script editor
5. Click the **Save** icon (💾) and name your project "CareRoute Form Handler"

## Step 4: Deploy as Web App

1. In the Apps Script editor, click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: CareRoute Form Submission Handler
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Review permissions:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** if you see a warning
   - Click **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. **Copy the Web app URL** - you'll need this in the next step

## Step 5: Add the URL to Your Website

1. Open your `.env.local` file in the website project
2. Add this line (replace with your actual URL):

```
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Save the file
4. Restart your development server

## Step 6: Test the Integration

1. Go to your website
2. Click "Get Started" or any CTA button
3. Fill out the intake form
4. Submit the form
5. Check your Google Sheet - you should see a new row with the submission data

## Troubleshooting

### Form submissions not appearing in the sheet

- Make sure the sheet tab is named exactly "Submissions" (case-sensitive)
- Check that the Apps Script deployment is set to "Anyone" for access
- Verify the URL in `.env.local` is correct
- Check the browser console for any error messages

### Permission errors

- Re-authorize the script by going to Deploy > Manage deployments > Edit > Deploy
- Make sure you're logged into the same Google account that owns the sheet

### Testing the script directly

1. In the Apps Script editor, select the `testSubmission` function from the dropdown
2. Click the **Run** button
3. Check your sheet for a test row
4. Check **View > Logs** for any error messages

## Data Privacy Notes

- Only collect necessary information for intake
- The Google Sheet should only be accessible to authorized team members
- Consider setting up email notifications for new submissions
- Regularly review and clean up old data according to your privacy policy

## Optional: Email Notifications

To receive email notifications when a form is submitted, add this function to your Apps Script:

```javascript
function sendEmailNotification(data) {
  const recipient = "careroutehealth@zohomail.in";
  const subject = `New ${data.path} Lead - ${data.name}`;
  const body = `
New form submission received:

Path: ${data.path}
Help Type: ${data.helpType}
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
${data.country ? `Country: ${data.country}` : ''}
${data.familyCityIndia ? `Family City in India: ${data.familyCityIndia}` : ''}
${data.insuranceProvider ? `Insurance Provider: ${data.insuranceProvider}` : ''}
${data.notes ? `Notes: ${data.notes}` : ''}

View all submissions: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}
```

Then add this line in the `doPost` function after `sheet.appendRow([...])`:

```javascript
sendEmailNotification(data);
```
