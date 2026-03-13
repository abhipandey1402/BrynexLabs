export const contactEmailTemplate = ({
  name,
  email,
  phone,
  date,
  time,
  details,
  timezone,
}: {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  details: string;
  timezone: string;
}): string => `
<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
  <head>
    <meta charset="UTF-8" />
    <title>New Consultation Request</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
    </style>
  </head>
  <body style="background-color: white; margin:0; padding:40px 20px; font-family: 'Inter', Arial, sans-serif; color:#F5F5F5; -webkit-font-smoothing: antialiased;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background:#0A0A0A; border: 1px solid rgba(255, 255, 255, 0.08); border-radius:16px; overflow:hidden; box-shadow:0 8px 32px rgba(0, 0, 0, 0.6);">
      
      <!-- Top Accent Line -->
      <tr>
        <td style="height: 2px; background: linear-gradient(90deg, #C2410C 0%, #EA580C 50%, #F59E0B 100%);"></td>
      </tr>

      <tr>
        <td style="padding:40px 40px 30px;">
          <!-- Logo -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
            <tr>
              <td>
                <div style="line-height: 1;">
                  <span style="display: block; font-size: 24px; font-weight: 800; letter-spacing: -0.04em; color: #F5F5F5;">BRYNEX</span>
                  <span style="display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.35em; color: #737373; text-transform: uppercase; margin-top: 2px; margin-left: 2px;">LABS</span>
                </div>
              </td>
            </tr>
          </table>

          <!-- Header -->
          <h2 style="color: #F5F5F5; margin:0 0 12px; font-size: 22px; font-weight: 700; letter-spacing: -0.01em;">
            New Consultation Request <span style="font-size: 20px;">🚀</span>
          </h2>
          <p style="font-size:15px; line-height:1.6; margin:0 0 32px; color:#A3A3A3;">
            You have received a new consultation request from the website.
          </p>

          <!-- Details Table -->
          <table cellpadding="0" cellspacing="0" style="width:100%; font-size:14px; line-height:1.6; border-collapse: separate; border-spacing: 0;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); width: 100px; color: #737373; font-weight: 500;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #F5F5F5; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #737373; font-weight: 500;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #F5F5F5; font-weight: 500;">
                <a href="mailto:${email}" style="color: #F5F5F5; text-decoration: none; border-bottom: 1px dotted #737373;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #737373; font-weight: 500;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #F5F5F5; font-weight: 500;">
                <a href="tel:${phone}" style="color: #F5F5F5; text-decoration: none; border-bottom: 1px dotted #737373;">${phone || 'N/A'}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #737373; font-weight: 500;">Date</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #F5F5F5; font-weight: 500;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #737373; font-weight: 500;">Time</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #F5F5F5; font-weight: 500;">
                ${time} <span style="color: #525252; font-size: 12px; margin-left: 4px;">(${timezone})</span>
              </td>
            </tr>
          </table>

          <!-- Project Details -->
          <div style="margin-top: 32px;">
            <h3 style="color:#F5F5F5; font-size: 14px; margin:0 0 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Project Details</h3>
            <div style="background: #111111; padding: 20px; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; color:#D4D4D4; font-size:15px; line-height:1.7;">
              ${details ? details.replace(/\n/g, '<br>') : '<span style="color: #525252;">No details provided.</span>'}
            </div>
          </div>

          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
            <p style="font-size:12px; line-height:1.5; margin:0; color:#525252;">
              © ${new Date().getFullYear()} Brynex Labs. All rights reserved.<br>
              This is an automated notification.
            </p>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
