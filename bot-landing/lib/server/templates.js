const isDev = process.env.NODE_ENV !== "production";
const domain = isDev ? "http://localhost:3000" : "https://ecodrix.com";

export const useTemplates = {
  newsletter: {
    update_newsletter: {
      subject: "🚀 ECODrIx Monthly Update: New Features & Improvements",
      html: ({ id }) => `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
        <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto;">
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px;">
            <h1 style="color: #2f80ed; text-align: center;">ECODrIx Monthly Update</h1>

            <h2 style="color: #2f80ed;">What's New</h2>

            <div style="border-left: 4px solid #2f80ed; background: #fff; padding: 12px 15px; border-radius: 5px; margin-bottom: 12px;">
              <strong>Enhanced Analytics Dashboard</strong>
              <p>Track chatbot performance with new metrics and visualizations.</p>
            </div>

            <div style="border-left: 4px solid #2f80ed; background: #fff; padding: 12px 15px; border-radius: 5px; margin-bottom: 12px;">
              <strong>Multi-language Support</strong>
              <p>Respond in 5+ new languages with ease.</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://app.ecodrix.com/dashboard" target="_blank" style="background: #2f80ed; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Explore Now</a>
            </div>

            <footer style="border-top: 1px solid #ddd; margin-top: 20px; font-size: 12px; text-align: center; color: #888;">
              <p>You’re receiving this because you subscribed to ECODrIx updates.</p>
              <p>
                <a href="${domain}/api/action?iv=${id}&status=inactive" target="_blank" style="color: #2f80ed;">Unsubscribe</a> | 
                <a href="${domain}/preferences" target="_blank" style="color: #2f80ed;">Preferences</a>
              </p>
              <p>© ${new Date().getFullYear()} ECODrIx. All rights reserved.</p>
            </footer>
          </div>
        </body>
        </html>
      `,
    },

    early_access: {
      subject: "✨ Welcome to ECODrIx Early Access!",
      html: ({ id }) => `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
        <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto;">
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px;">
            <h1 style="color: #2f80ed; text-align: center;">Welcome to ECODrIx Early Access!</h1>
            <p style="text-align: center;">You're among the first to experience our next-gen chatbot platform.</p>

            <h2 style="color: #2f80ed;">Getting Started</h2>
            <ol>
              <li>Complete your profile</li>
              <li>Connect your first channel</li>
              <li>Build your conversation flow</li>
            </ol>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://app.ecodrix.com/onboarding" target="_blank" style="background: #2f80ed; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">Start Building</a>
            </div>

            <footer style="border-top: 1px solid #ddd; margin-top: 30px; font-size: 12px; text-align: center; color: #888;">
              <p>Need help? <a href="https://ecodrix.com/slack" style="color: #2f80ed;" target="_blank">Join our Slack</a></p>
              <p><a href="${domain}/api/action?iv=${id}&status=inactive" style="color: #2f80ed;">Unsubscribe</a></p>
              <p>© ${new Date().getFullYear()} ECODrIx. All rights reserved.</p>
            </footer>
          </div>
        </body>
        </html>
      `,
    },

    feature_launch: {
      subject: "📱 WhatsApp Integration Now Available!",
      html: ({ id }) => `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
        <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto;">
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px;">
            <h1 style="color: #2f80ed; text-align: center;">WhatsApp Integration is Live!</h1>
            <p style="text-align: center;">Connect your chatbot to WhatsApp Business API in minutes.</p>

            <img src="https://ecodrix.com/images/whatsapp-integration.png" alt="WhatsApp Integration" style="width: 100%; border-radius: 5px; margin: 20px 0;">

            <ul>
              <li>📎 Media (images, docs, videos)</li>
              <li>💬 Message templates</li>
              <li>📜 Conversation history</li>
            </ul>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://app.ecodrix.com/whatsapp" target="_blank" style="background: #2f80ed; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">Connect WhatsApp</a>
            </div>

            <footer style="border-top: 1px solid #ddd; margin-top: 20px; font-size: 12px; text-align: center; color: #888;">
              <p>You're receiving this email because you're an ECODrIx user.</p>
              <p>
                <a href="${domain}/api/action?iv=${id}&status=inactive" target="_blank" style="color: #2f80ed;">Unsubscribe</a> | 
                <a href="${domain}/preferences" target="_blank" style="color: #2f80ed;">Preferences</a>
              </p>
              <p>© ${new Date().getFullYear()} ECODrIx. All rights reserved.</p>
            </footer>
          </div>
        </body>
        </html>
      `,
    },

    subscribe_confirmation: {
      subject: "✅ You’re Subscribed to ECODrIx Early Access Updates!",
      html: ({ userName = "there", id }) => `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
        <body style="font-family: Arial; background: #f8f9fc; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 40px auto; background: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #2f80ed; text-align: center;">You’re officially on the list! 🎉</h2>
            <p>Hello <strong>${userName}</strong>, thanks for subscribing to ECODrIx!</p>
            <p>We’ll keep you updated on:</p>
            <ul><li>🚀 Product launches</li><li>📢 Insider announcements</li><li>🎁 Early offers</li></ul>

            <footer style="border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #888; text-align: center;">
              <p><a href="${domain}/api/action?iv=${id}&status=inactive" style="color: #2f80ed;" target="_blank">Unsubscribe</a></p>
              <p>© ${new Date().getFullYear()} ECODrIx. All rights reserved.</p>
            </footer>
          </div>
        </body>
        </html>
      `,
    }, // Subscribe mail template
    unsubscribe_confirmation: {
      subject: "🔕 You’ve Unsubscribed from ECODrIx Updates",
      html: ({ userName = "there", id }) => `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
        <body style="font-family: Arial; background: #f8f9fc; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 40px auto; background: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #e63946; text-align: center;">You’ve been unsubscribed 😞</h2>
            <p>Hello <strong>${userName}</strong>, you’ve successfully unsubscribed from ECODrIx updates.</p>
            <p>If this was a mistake, you can re-subscribe:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${domain}/api/action?iv=${id}&status=active" style="background: #2f80ed; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">Re-subscribe</a>
            </div>
            <footer style="border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #888; text-align: center;">
              <p>© ${new Date().getFullYear()} ECODrIx. All rights reserved.</p>
            </footer>
          </div>
        </body>
        </html>
      `,
    }, // UnSubscribe mail template
    pre_launch_signup: {
      subject: "🌟 Exciting News: ECODrIx is Coming Soon!",
      html: ({ userName = "there", id }) => `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
    <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto;">
      <div style="background: #f9f9f9; padding: 30px; border-radius: 10px;">
        <h1 style="color: #2f80ed; text-align: center;">Thank You for Your Interest!</h1>
        
        <p>Hello <strong>${userName}</strong>,</p>
        
        <p>We're thrilled you've joined the ECODrIx waiting list. Our team is working hard to build something truly special for you.</p>
        
        <div style="background: #fff; border-left: 4px solid #2f80ed; padding: 15px; margin: 20px 0; border-radius: 0 5px 5px 0;">
          <h3 style="margin-top: 0; color: #2f80ed;">What to Expect:</h3>
          <ul style="padding-left: 20px;">
            <li>Revolutionary chatbot platform with AI capabilities</li>
            <li>Seamless multi-channel integration</li>
            <li>Enterprise-grade security and reliability</li>
          </ul>
        </div>
        
        <p>We'll notify you as soon as we're ready to launch. In the meantime, follow us on social media for sneak peeks and updates.</p>
        
        <div style="text-align: center; margin: 25px 0; color: #666; font-size: 14px;">
          <p>Your spot in line is reserved.</p>
        </div>
        
        <footer style="border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; font-size: 12px; text-align: center; color: #888;">
          <p>You're receiving this because you signed up for ECODrIx updates.</p>
          <p>
            <a href="${domain}/api/action?iv=${id}&status=inactive" target="_blank" style="color: #2f80ed;">Unsubscribe</a> | 
            <a href="${domain}/preferences" target="_blank" style="color: #2f80ed;">Preferences</a>
          </p>
          <p>© ${new Date().getFullYear()} ECODrIx. All rights reserved.</p>
        </footer>
      </div>
    </body>
    </html>
  `,
    },
  },
  support: {
    welcome_user: {
      subject: "👋 Welcome to ECODrIx! Let's Get Started",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2f80ed;">Welcome to ECODrIx, {{userName}}!</h1>
        <p>We're excited to help you build amazing chatbot experiences.</p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="color: #2f80ed; margin-top: 0;">Your Next Steps</h2>
        <div style="display: flex; margin-bottom: 15px;">
          <div style="background-color: #2f80ed; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; margin-right: 10px; flex-shrink: 0;">1</div>
          <div>Verify your email address to secure your account</div>
        </div>
        <div style="display: flex; margin-bottom: 15px;">
          <div style="background-color: #2f80ed; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; margin-right: 10px; flex-shrink: 0;">2</div>
          <div>Complete the quick setup wizard</div>
        </div>
        <div style="display: flex;">
          <div style="background-color: #2f80ed; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; margin-right: 10px; flex-shrink: 0;">3</div>
          <div>Build your first chatbot in minutes</div>
        </div>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://app.ecodrix.com/onboarding" style="background-color: #2f80ed; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Begin Onboarding</a>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #777;">
        <p>Need help? <a href="mailto:support@ecodrix.com" style="color: #2f80ed;">Contact our support team</a> anytime.</p>
        <p><a href="https://ecodrix.com/unsubscribe" style="color: #2f80ed;">Unsubscribe</a></p>
        <p>© 2023 ECODrIx. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    },
    ticket_reply: {
      subject: "Re: Your support ticket #{{ticketId}}",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="margin-bottom: 20px;">
        <h1 style="color: #2f80ed; margin-bottom: 5px;">Ticket #{{ticketId}} Update</h1>
        <p style="color: #777; font-size: 14px;">Regarding: {{ticketSubject}}</p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <p>Hi {{userName}},</p>
        <p>{{supportAgent}} from ECODrIx Support has responded to your ticket:</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid #2f80ed; margin: 15px 0;">
          {{responseMessage}}
        </div>
        
        <p>If you need any further assistance, please reply directly to this email.</p>
      </div>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://app.ecodrix.com/support/ticket/{{ticketId}}" style="background-color: #2f80ed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">View Full Ticket</a>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #777;">
        <p>This is an automated notification regarding your support ticket.</p>
        <p><a href="https://ecodrix.com/unsubscribe" style="color: #2f80ed;">Unsubscribe</a> from support notifications</p>
        <p>© 2023 ECODrIx. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    },
    feedback_request: {
      subject: "How did we do? Rate your support experience",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2f80ed;">How Was Your Support Experience?</h1>
        <p>We'd love your feedback on ticket #{{ticketId}}</p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; text-align: center;">
        <p style="margin-top: 0;">How would you rate your support experience?</p>
        
        <div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0;">
          <a href="https://app.ecodrix.com/feedback/{{ticketId}}?rating=1" style="background-color: #ff6b6b; color: white; width: 40px; height: 40px; border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; display: inline-block;">1</a>
          <a href="https://app.ecodrix.com/feedback/{{ticketId}}?rating=2" style="background-color: #ff9e4f; color: white; width: 40px; height: 40px; border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; display: inline-block;">2</a>
          <a href="https://app.ecodrix.com/feedback/{{ticketId}}?rating=3" style="background-color: #ffd166; color: white; width: 40px; height: 40px; border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; display: inline-block;">3</a>
          <a href="https://app.ecodrix.com/feedback/{{ticketId}}?rating=4" style="background-color: #8ac926; color: white; width: 40px; height: 40px; border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; display: inline-block;">4</a>
          <a href="https://app.ecodrix.com/feedback/{{ticketId}}?rating=5" style="background-color: #2f80ed; color: white; width: 40px; height: 40px; border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; display: inline-block;">5</a>
        </div>
        
        <p>Optional comments about your experience:</p>
        <a href="https://app.ecodrix.com/feedback/{{ticketId}}" style="color: #2f80ed; text-decoration: none; font-weight: bold;">Add Detailed Feedback →</a>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #777;">
        <p>This feedback helps us improve our service.</p>
        <p><a href="https://ecodrix.com/unsubscribe" style="color: #2f80ed;">Unsubscribe</a> from feedback requests</p>
        <p>© 2023 ECODrIx. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    },
  },
  billing: {
    invoice_receipt: {
      subject: "Your ECODrIx Invoice #{{invoiceNumber}}",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="margin-bottom: 20px;">
        <h1 style="color: #2f80ed; margin-bottom: 5px;">Invoice #{{invoiceNumber}}</h1>
        <p style="color: #777; font-size: 14px;">Issued on {{invoiceDate}}</p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;">
          <div style="font-weight: bold;">Description</div>
          <div style="font-weight: bold;">Amount</div>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <div>{{planName}} Subscription</div>
          <div>{{amount}}</div>
        </div>
        
        {{#if discount}}
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; color: #8ac926;">
          <div>Discount ({{discountName}})</div>
          <div>-{{discount}}</div>
        </div>
        {{/if}}
        
        <div style="display: flex; justify-content: space-between; border-top: 1px solid #eee; margin-top: 15px; padding-top: 15px; font-weight: bold;">
          <div>Total</div>
          <div>{{totalAmount}}</div>
        </div>
        
        <div style="margin-top: 20px;">
          <p>Payment Method: {{paymentMethod}}</p>
          <p>Payment Status: <span style="color: #8ac926;">{{paymentStatus}}</span></p>
        </div>
      </div>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://app.ecodrix.com/invoices/{{invoiceNumber}}" style="background-color: #2f80ed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin-right: 10px;">View Invoice</a>
        <a href="https://app.ecodrix.com/invoices/{{invoiceNumber}}/download" style="background-color: white; color: #2f80ed; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; border: 1px solid #2f80ed;">Download PDF</a>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #777;">
        <p>Questions about this invoice? <a href="mailto:billing@ecodrix.com" style="color: #2f80ed;">Contact our billing team</a>.</p>
        <p><a href="https://ecodrix.com/unsubscribe" style="color: #2f80ed;">Unsubscribe</a> from billing notifications</p>
        <p>© 2023 ECODrIx. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    },
    subscription_confirmed: {
      subject: "Your ECODrIx {{planName}} Subscription is Confirmed",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2f80ed;">Subscription Confirmed!</h1>
        <p>Thank you for upgrading to {{planName}}</p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="color: #2f80ed; margin-top: 0;">Subscription Details</h2>
        <p><strong>Plan:</strong> {{planName}}</p>
        <p><strong>Billing Cycle:</strong> {{billingCycle}}</p>
        <p><strong>Next Payment:</strong> {{nextBillingDate}}</p>
        <p><strong>Amount:</strong> {{amount}}</p>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #f0f7ff; border-radius: 5px;">
          <p style="margin: 0;">You now have access to all {{planName}} features. Start building!</p>
        </div>
      </div>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://app.ecodrix.com/dashboard" style="background-color: #2f80ed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Go to Dashboard</a>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #777;">
        <p>Need to make changes? <a href="https://app.ecodrix.com/billing" style="color: #2f80ed;">Manage your subscription</a> anytime.</p>
        <p><a href="https://ecodrix.com/unsubscribe" style="color: #2f80ed;">Unsubscribe</a> from billing notifications</p>
        <p>© 2023 ECODrIx. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    },
    payment_failed: {
      subject: "⚠️ Payment Failed for Your ECODrIx Subscription",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="margin-bottom: 20px;">
        <h1 style="color: #ff6b6b; margin-bottom: 5px;">Payment Failed</h1>
        <p style="color: #777; font-size: 14px;">We couldn't process your payment for {{planName}}</p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <p>Hi {{userName}},</p>
        
        <p>We attempted to charge your {{paymentMethod}} ending in {{last4}} for {{amount}}, but the payment failed.</p>
        
        <div style="background-color: #fff8f8; padding: 15px; border-left: 3px solid #ff6b6b; margin: 15px 0;">
          <p style="margin: 0;"><strong>Reason:</strong> {{failureReason}}</p>
        </div>
        
        <p>Your access will continue until {{cutoffDate}}. Please update your payment method to avoid service interruption.</p>
      </div>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://app.ecodrix.com/billing/payment" style="background-color: #2f80ed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Update Payment Method</a>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #777;">
        <p>If you believe this is an error, please <a href="mailto:billing@ecodrix.com" style="color: #2f80ed;">contact our billing team</a>.</p>
        <p><a href="https://ecodrix.com/unsubscribe" style="color: #2f80ed;">Unsubscribe</a> from billing notifications</p>
        <p>© 2023 ECODrIx. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    },
    trial_expiry: {
      subject: "🔔 Your ECODrIx Trial Ends in {{daysLeft}} Days",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2f80ed;">Trial Ending Soon</h1>
        <p>Your ECODrIx trial expires in {{daysLeft}} days</p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <p>Hi {{userName}},</p>
        
        <p>Your free trial of ECODrIx will end on <strong>{{expiryDate}}</strong>. After this date, your account will be downgraded to the Free plan unless you choose a subscription.</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f0f7ff; border-radius: 5px;">
          <p style="margin: 0;"><strong>Tip:</strong> Upgrade now to lock in our current pricing and avoid interruption to your chatbots.</p>
        </div>
        
        <p>Here's what you'll lose access to:</p>
        <ul style="padding-left: 20px;">
          <li>Advanced conversation flows</li>
          <li>Multi-channel deployment</li>
          <li>Analytics and reporting</li>
          <li>Priority support</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://app.ecodrix.com/billing/plans" style="background-color: #2f80ed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Choose a Plan</a>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #777;">
        <p>Questions about our plans? <a href="mailto:sales@ecodrix.com" style="color: #2f80ed;">Contact our sales team</a>.</p>
        <p><a href="https://ecodrix.com/unsubscribe" style="color: #2f80ed;">Unsubscribe</a> from trial reminders</p>
        <p>© 2023 ECODrIx. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    },
    refund_issued: {
      subject: "Your ECODrIx Refund of {{amount}} Has Been Processed",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2f80ed;">Refund Processed</h1>
        <p>We've issued your refund of {{amount}}</p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <p>Hi {{userName}},</p>
        
        <p>We've processed your refund as requested. Here are the details:</p>
        
        <div style="margin: 15px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
          <p style="margin: 0 0 8px 0;"><strong>Refund Amount:</strong> {{amount}}</p>
          <p style="margin: 0 0 8px 0;"><strong>Payment Method:</strong> {{paymentMethod}} ending in {{last4}}</p>
          <p style="margin: 0;"><strong>Refund Date:</strong> {{refundDate}}</p>
        </div>
        
        <p>Please allow 5-10 business days for the refund to appear in your account, depending on your financial institution.</p>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #777;">
        <p>If you didn't request this refund or have any questions, please <a href="mailto:billing@ecodrix.com" style="color: #2f80ed;">contact our billing team</a> immediately.</p>
        <p><a href="https://ecodrix.com/unsubscribe" style="color: #2f80ed;">Unsubscribe</a> from billing notifications</p>
        <p>© 2023 ECODrIx. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    },
  },
  system: {
    email_verification: {
      subject: "Verify Your ECODrIx Email Address",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2f80ed;">Verify Your Email</h1>
        <p>Please confirm this email address for your ECODrIx account</p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; text-align: center;">
        <p>Hi {{userName}},</p>
        
        <p>To complete your account setup, please verify your email address by clicking the button below:</p>
        
        <div style="margin: 30px 0;">
          <a href="{{verificationLink}}" style="background-color: #2f80ed; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email Address</a>
        </div>
        
        <p style="font-size: 14px; color: #777;">This link will expire in 24 hours. If you didn't request this, please ignore this email.</p>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #777; text-align: center;">
        <p>Can't click the button? Copy and paste this link into your browser:</p>
        <p style="word-break: break-all; font-size: 12px;">{{verificationLink}}</p>
        <p>© 2023 ECODrIx. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    },
    password_reset: {
      subject: "Reset Your ECODrIx Password",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2f80ed;">Password Reset</h1>
        <p>We received a request to reset your password</p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; text-align: center;">
        <p>Hi {{userName}},</p>
        
        <p>Click the button below to reset your ECODrIx account password:</p>
        
        <div style="margin: 30px 0;">
          <a href="{{resetLink}}" style="background-color: #2f80ed; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        
        <p style="font-size: 14px; color: #777;">This link will expire in 1 hour. If you didn't request a password reset, please ignore this email or <a href="mailto:support@ecodrix.com" style="color: #2f80ed;">contact support</a> if you have concerns.</p>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #777; text-align: center;">
        <p>Can't click the button? Copy and paste this link into your browser:</p>
        <p style="word-break: break-all; font-size: 12px;">{{resetLink}}</p>
        <p>© 2023 ECODrIx. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    },
    login_alert: {
      subject: "⚠️ New Login to Your ECODrIx Account",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="margin-bottom: 20px;">
        <h1 style="color: #ff6b6b; margin-bottom: 5px;">New Login Detected</h1>
        <p style="color: #777; font-size: 14px;">We noticed a login from a new device</p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <p>Hi {{userName}},</p>
        
        <p>A login to your ECODrIx account was detected from:</p>
        
        <div style="background-color: #fff8f8; padding: 15px; border-left: 3px solid #ff6b6b; margin: 15px 0;">
          <p style="margin: 0 0 8px 0;"><strong>Location:</strong> {{location}}</p>
          <p style="margin: 0 0 8px 0;"><strong>Device:</strong> {{device}}</p>
          <p style="margin: 0;"><strong>Time:</strong> {{time}}</p>
        </div>
        
        <p>If this was you, you can ignore this alert. If you don't recognize this activity, please secure your account immediately.</p>
      </div>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://app.ecodrix.com/security" style="background-color: #2f80ed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Review Account Security</a>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #777;">
        <p>For your security, this notification was sent to all email addresses associated with your account.</p>
        <p><a href="https://ecodrix.com/unsubscribe" style="color: #2f80ed;">Unsubscribe</a> from security alerts</p>
        <p>© 2023 ECODrIx. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    },
    account_deletion: {
      subject: "Your ECODrIx Account Will Be Deleted Soon",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2f80ed;">Account Deletion Scheduled</h1>
        <p>Your ECODrIx account will be deleted on {{deletionDate}}</p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <p>Hi {{userName}},</p>
        
        <p>We've received a request to delete your ECODrIx account. This is a confirmation that your account and all associated data will be permanently deleted on <strong>{{deletionDate}}</strong>.</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f0f7ff; border-radius: 5px;">
          <p style="margin: 0;"><strong>Important:</strong> This action cannot be undone. All your chatbots, data, and configurations will be permanently removed.</p>
        </div>
        
        <p>If you didn't request this or changed your mind, you can cancel the deletion before the scheduled date:</p>
      </div>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="https://app.ecodrix.com/account/cancel-deletion" style="background-color: #2f80ed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Cancel Account Deletion</a>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 14px; color: #777;">
        <p>This is an automated notification regarding your account deletion request.</p>
        <p>© 2023 ECODrIx. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    },
  },
};
