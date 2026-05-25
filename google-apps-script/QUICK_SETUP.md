# Quick Setup Guide - Google Sheets Integration

## 🎯 Goal
Get form submissions flowing into your Google Sheet in 5 minutes.

---

## ✅ Checklist

### 1. Create Google Sheet (2 min)
- [ ] Go to [sheets.google.com](https://sheets.google.com)
- [ ] Create new sheet: "CareRoute Leads"
- [ ] Rename tab to: "Submissions"
- [ ] Add these headers in row 1:
  ```
  Timestamp | Path | Help Type | Timing | Supporting | Name | Email | Phone | Country | Family City India | Insurance Provider | Notes
  ```

### 2. Deploy Apps Script (2 min)
- [ ] In sheet: Extensions > Apps Script
- [ ] Copy all code from `Code.gs` file
- [ ] Paste into Apps Script editor
- [ ] Save as "CareRoute Form Handler"
- [ ] Deploy > New deployment
- [ ] Type: Web app
- [ ] Execute as: Me
- [ ] Access: Anyone
- [ ] Click Deploy
- [ ] Authorize (follow prompts)
- [ ] **Copy the deployment URL**

### 3. Update Website (1 min)
- [ ] Open `.env.local` in project
- [ ] Find `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`
- [ ] Paste your deployment URL
- [ ] Save file
- [ ] Restart dev server: `npm run dev`

### 4. Test (30 sec)
- [ ] Go to website
- [ ] Click "Get Started"
- [ ] Fill out form
- [ ] Submit
- [ ] Check Google Sheet for new row

---

## 🔗 Your Deployment URL

After deploying, your URL will look like:
```
https://script.google.com/macros/s/AKfycbz.../exec
```

Paste it here for reference:
```
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=
```

---

## 🐛 Quick Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Verify URL in `.env.local` is correct
- Restart dev server

**Data not in sheet?**
- Check tab name is exactly "Submissions"
- Verify Apps Script access is "Anyone"
- Run `testSubmission` function in Apps Script

**Permission errors?**
- Re-authorize in Apps Script
- Check you're logged into correct Google account

---

## 📧 Optional: Email Alerts

Want email notifications? Add this to your Apps Script after line 30:

```javascript
// Send email notification
MailApp.sendEmail(
  "careroutehealth@zohomail.in",
  `New ${path} Lead - ${name}`,
  `New submission from ${name} (${email})\nPath: ${path}\nHelp: ${helpType}`
);
```

---

## ✨ Done!

Your forms now save to Google Sheets automatically.

For detailed docs, see `README.md` or `GOOGLE_SHEETS_INTEGRATION.md`
