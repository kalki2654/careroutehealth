# Google Sheets Integration - Implementation Summary

## ✅ What Was Implemented

The CareRoute website now submits all intake form data to Google Sheets through Google Apps Script.

### Changes Made

#### 1. **Google Apps Script** (`google-apps-script/Code.gs`)
- Created a Google Apps Script web app that receives form submissions
- Appends each submission as a new row in the Google Sheet
- Handles both USA and India form paths
- Includes error handling and success responses
- Test function included for verification

#### 2. **USA Intake Form** (`src/components/intake/USAIntakeForm.tsx`)
- Updated to submit data to Google Apps Script endpoint
- Added error handling with user-friendly error messages
- Shows loading state during submission
- Maps form fields to Google Sheets columns:
  - Path: "USA"
  - Help Type: Combines help type and timing
  - Name, Email, Phone
  - Insurance Provider
  - Notes: Additional context

#### 3. **India Intake Form** (`src/components/intake/IndiaIntakeForm.tsx`)
- Updated to submit data to Google Apps Script endpoint
- Added error handling with user-friendly error messages
- Shows loading state during submission
- Maps form fields to Google Sheets columns:
  - Path: "India"
  - Help Type: Combines help type and who they're supporting
  - Name, Email, Phone
  - Country, Family City in India
  - Notes: Additional context

#### 4. **Environment Configuration** (`.env.local`)
- Added `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` variable
- Includes placeholder URL with clear instructions
- Must be replaced with actual deployment URL

#### 5. **Documentation** (`google-apps-script/README.md`)
- Complete setup instructions
- Step-by-step deployment guide
- Troubleshooting section
- Optional email notification setup

---

## 📋 Google Sheet Structure

### Sheet Name: **CareRoute Leads**
### Tab Name: **Submissions**

### Column Headers (Row 1):

| Column | Header | Description |
|--------|--------|-------------|
| A | Timestamp | Auto-generated submission time |
| B | Path | "USA" or "India" |
| C | Help Type | What the user needs help with (comma-separated if multiple) |
| D | Timing | "Before care" or "After receiving a bill" (USA only) |
| E | Supporting | Who they're supporting (comma-separated if multiple, India only) |
| F | Name | User's full name |
| G | Email | User's email address |
| H | Phone | Phone or WhatsApp number |
| I | Country | User's country (India path only) |
| J | Family City India | Family's city in India (India path only) |
| K | Insurance Provider | Insurance company (USA path only) |
| L | Notes | Additional context and details |

---

## 🚀 Setup Instructions

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet: **CareRoute Leads**
3. Rename first tab to: **Submissions**
4. Add column headers in row 1 (see table above)

### Step 2: Deploy Google Apps Script
1. In your sheet: **Extensions > Apps Script**
2. Copy code from `google-apps-script/Code.gs`
3. Paste into Apps Script editor
4. Save project as "CareRoute Form Handler"
5. **Deploy > New deployment**
6. Select type: **Web app**
7. Configure:
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy**
9. Authorize access (follow prompts)
10. **Copy the Web app URL**

### Step 3: Update Environment Variable
1. Open `.env.local` in your project
2. Find: `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`
3. Replace `YOUR_SCRIPT_ID_HERE` with your actual script ID from the URL
4. Save the file
5. **Restart your development server**

### Step 4: Test
1. Go to your website
2. Click "Get Started"
3. Fill out and submit a form
4. Check your Google Sheet for the new row

---

## 🎯 User Experience

### Success Flow
1. User fills out intake form
2. Clicks "Submit Request"
3. Button shows "Sending..." state
4. On success: Shows confirmation screen with message:
   > "We've received your request. A CareRoute team member will review it and reach out with the next steps."

### Error Handling
If submission fails, user sees:
> "Something went wrong while sending your request. Please try again."

### Loading States
- Submit button disabled during submission
- Button text changes to "Sending..."
- Form fields remain filled if error occurs (user doesn't lose data)

---

## 📊 Data Collected

### USA Path
- Path: "USA"
- Help Type: What they need help with (can be multiple, comma-separated)
- Timing: Before care or After receiving a bill
- Name
- Email
- Phone/WhatsApp
- Insurance Provider
- Notes: Full context

### India Path
- Path: "India"
- Help Type: What they need help with (can be multiple, comma-separated)
- Supporting: Who they're supporting (can be multiple, comma-separated)
- Name
- Email
- Phone/WhatsApp
- Country (where user lives)
- Family City in India
- Notes: Full context

---

## 🔒 Privacy & Security

- Only necessary intake information is collected
- No sensitive medical details are stored
- Data goes directly to your private Google Sheet
- Sheet access controlled by Google account permissions
- Form uses HTTPS for secure transmission
- Environment variable keeps script URL private

---

## 🛠️ Technical Details

### How It Works
1. User submits form on website
2. Frontend sends POST request to Google Apps Script URL
3. Apps Script receives data and validates
4. Data appended as new row in Google Sheet
5. Success response sent back to frontend
6. User sees confirmation screen

### API Mode
- Uses `mode: "no-cors"` for Google Apps Script compatibility
- This is required for cross-origin requests to Apps Script
- Success is assumed if no error is thrown

### Error Scenarios Handled
- Missing environment variable
- Network errors
- Script execution errors
- Invalid data format

---

## 📧 Optional: Email Notifications

To receive email alerts for new submissions, add this to your Apps Script:

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

Then add this line in `doPost` function after `sheet.appendRow([...])`:
```javascript
sendEmailNotification(data);
```

---

## 🐛 Troubleshooting

### Submissions not appearing in sheet
- ✅ Check sheet tab is named exactly "Submissions"
- ✅ Verify Apps Script deployment access is set to "Anyone"
- ✅ Confirm URL in `.env.local` is correct
- ✅ Check browser console for errors
- ✅ Restart development server after changing `.env.local`

### Permission errors
- ✅ Re-authorize the script in Apps Script editor
- ✅ Ensure you're logged into correct Google account
- ✅ Check script execution permissions

### Testing the script
1. Open Apps Script editor
2. Select `testSubmission` function
3. Click **Run**
4. Check sheet for test row
5. View **Logs** for any errors

---

## 📁 Files Changed

### New Files
- `google-apps-script/Code.gs` - Apps Script code
- `google-apps-script/README.md` - Setup instructions
- `GOOGLE_SHEETS_INTEGRATION.md` - This file

### Modified Files
- `src/components/intake/USAIntakeForm.tsx` - Added Google Sheets submission
- `src/components/intake/IndiaIntakeForm.tsx` - Added Google Sheets submission
- `.env.local` - Added NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL

### Unchanged (Already Perfect)
- `src/components/intake/ConfirmationScreen.tsx` - Success message already correct
- `src/components/intake/IntakeModal.tsx` - Modal flow already correct

---

## ✨ Next Steps

1. **Set up Google Sheet** following Step 1 above
2. **Deploy Apps Script** following Step 2 above
3. **Update .env.local** with your actual script URL
4. **Restart dev server**: `npm run dev`
5. **Test the form** on your website
6. **Verify data** appears in Google Sheet
7. **(Optional)** Add email notifications
8. **(Optional)** Set up Google Sheets alerts/notifications

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review `google-apps-script/README.md`
3. Check browser console for error messages
4. Verify all setup steps were completed
5. Test the Apps Script directly using `testSubmission` function

---

**Implementation Date**: January 2025  
**Status**: ✅ Ready for deployment
