const nodemailer = require('nodemailer');

const sendOrderConfirmationEmail = async (order, userEmail) => {
  if (!userEmail || userEmail === 'default_user') {
    console.log('No valid email provided for order confirmation.');
    return;
  }

  // Check if SMTP is configured
  // If NOT configured, default to Mock/Logger mode to prevent crashes
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log('----------------------------------------------------');
    console.log(' [MOCK EMAIL SERVICE] SMTP not configured.');
    console.log(` To: ${userEmail}`);
    console.log(` Subject: Order Confirmation - ${order.orderId}`);
    console.log(` Total: ${order.totalAmount}`);
    console.log(' (Configure SMTP_HOST/SMTP_USER in .env to send real emails)');
    console.log('----------------------------------------------------');
    return;
  }

  // If configured, attempt real sending
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: '"Amazon Clone" <no-reply@amazon-clone.com>',
      to: userEmail,
      subject: `Order Confirmation - ${order.orderId}`,
      html: `
        <h1>Order Confirmed!</h1>
        <p>Thank you for your order.</p>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
        <hr/>
        <h3>Items:</h3>
        <ul>
          ${order.items.map(item => `
            <li>
              ${item.productName} - Qty: ${item.quantity} - ₹${item.price}
            </li>
          `).join('')}
        </ul>
        <hr/>
        <p>Shipping to:</p>
        <p>${order.shippingName}</p>
        <p>${order.shippingAddress}, ${order.shippingCity}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendOrderConfirmationEmail };
