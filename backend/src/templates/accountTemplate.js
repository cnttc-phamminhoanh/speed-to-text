const getActivationEmailTemplate = (data) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Activation | ${data.APP_NAME}</title>
    <style>
      /* Reset CSS */
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
      }
      
      /* Main Wrapper */
      .email-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100%;
        padding: 20px;
        background-color: #f9fafb;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      }
      
      /* Email Container */
      .email-container {
        width: 100%;
        max-width: 500px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        border: 1px solid #e5e7eb;
        overflow: hidden;
        margin: 0 auto; /* Thêm dòng này để đảm bảo căn giữa */
      }
      
      /* Header */
      .email-header {
        padding: 25px;
        text-align: center;
        border-bottom: 1px solid #f3f4f6;
        background-color: #f8fafc;
      }
      
      .email-title {
        font-size: 22px;
        font-weight: 600;
        color: #111827;
        margin: 0 0 5px 0;
      }
      
      .email-subtitle {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
      }
      
      /* Body */
      .email-body {
        padding: 25px;
      }
      
      .email-content {
        margin-bottom: 25px;
        color: #4b5563;
        line-height: 1.6;
      }
      
      /* Button Container */
      .button-container {
        padding: 0 15px;
        margin: 25px 0;
      }
      
      .activation-button {
        display: block;
        width: 100%;
        max-width: 300px;
        padding: 12px;
        background-color: #2563eb;
        color: white !important;
        text-align: center;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 500;
        margin: 0 auto;
        transition: background-color 0.2s;
      }
      
      .activation-button:hover {
        background-color: #1d4ed8;
      }
      
      /* Important Note */
      .important-note {
        background-color: #fef2f2;
        border-left: 4px solid #dc2626;
        padding: 12px 15px;
        margin: 25px 0;
        font-size: 14px;
        color: #6b7280;
      }
      
      /* Footer */
      .email-footer {
        padding: 20px 25px;
        text-align: center;
        font-size: 12px;
        color: #9ca3af;
        border-top: 1px solid #f3f4f6;
        background-color: #f8fafc;
      }
      
      .footer-link {
        color: #2563eb;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-container">
        <div class="email-header">
          <h1 class="email-title">Activate Your Account</h1>
          <p class="email-subtitle">${data.APP_NAME}: ${data.USER_EMAIL}</p>
        </div>
        
        <div class="email-body">
          <div class="email-content">
            <h2 style="font-size: 18px; margin-bottom: 15px;">${data.APP_NAME} Account Activation</h2>
            <p>Thank you for registering! Please click the button below to activate your account:</p>
          </div>
          
          <div class="button-container">
            <a href="${data.ACTIVATION_LINK}" class="activation-button">
              Activate Account
            </a>
          </div>
          
          <div class="important-note">
            <strong>Important:</strong> This link will expire in ${data.EXPIRATION_TIME}.<br>
            If you didn't request this, please ignore this email.
          </div>
        </div>
        
        <div class="email-footer">
          <p>© ${new Date().getFullYear()} ${data.APP_NAME}. All rights reserved.</p>
          <p>Need help? Contact <a href="mailto:${data.SUPPORT_EMAIL}" class="footer-link">${data.SUPPORT_EMAIL}</a></p>
        </div>
      </div>
    </div>
  </body>
  </html>
`
module.exports = {
  getActivationEmailTemplate
}
