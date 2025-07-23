# EmailJS Setup Guide

## Step 1: Create an EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/) and sign up for an account
2. Verify your email address

## Step 2: Connect an Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service" 
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Name your service "default_service" (to match our code)

## Step 3: Create an Email Template
1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Name the template "contact_form" (to match our code)
4. Design your template with the following variables:
   - `{{from_name}}` - The name of the person who submitted the form
   - `{{reply_to}}` - The email address to reply to
   - `{{message}}` - The message content
   - `{{to_email}}` - The recipient email address (jacobjayenpillai@gmail.com)

## Sample Template HTML
```html
<!DOCTYPE html>
<html>
<head>
    <title>New Contact Form Submission</title>
</head>
<body>
    <h2>New Contact Form Message</h2>
    <p><strong>From:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{reply_to}}</p>
    <p><strong>Message:</strong></p>
    <p>{{message}}</p>
    <hr>
    <p><small>This email was sent to {{to_email}} via the CarHub website contact form.</small></p>
</body>
</html>
```

## Step 4: Test Your Setup
1. Fill out the contact form on your website
2. Check that the email arrives at jacobjayenpillai@gmail.com
3. Verify that the reply-to address is set correctly so you can respond directly

## Troubleshooting
- If emails aren't being received, check your spam folder
- Verify that your email service is connected properly in EmailJS
- Confirm that the template variables match what's being sent from the code
- Check the browser console for any JavaScript errors 