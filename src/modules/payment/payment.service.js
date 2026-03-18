import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// set your actuall values
export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Webhook secret for verification
export const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

// Payment configuration
export const PAYMENT_CONFIG = {
  currency: 'INR',
  payment_capture: 1, // Auto capture payments
  notes: {
    source: 'edtech_platform'
  }
};

// Validate Razorpay webhook signature
export const validateWebhookSignature = (body, signature, secret) => {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(body))
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signature)
  );
};