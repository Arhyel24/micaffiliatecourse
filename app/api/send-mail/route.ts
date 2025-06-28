import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON request body
    const { email } = await req.json();

    // Create a transporter using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465, // Use 587 for TLS (if 465 doesn't work)
      secure: true, // True for port 465, false for 587 (STARTTLS)
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASSWORD,
      },
    });


    const message = {
      from: `"MIC Affiliate Course" <${process.env.ZOHO_USER}>`,
      to: email,
      subject: "Your Login Details - Affiliate Marketing Program",
      text: `Thanks for registering! Here are your temporary login details:\nEmail: ${email}\nPassword: 12345678\n\nLog in here: ${process.env.NEXTAUTH_URL}login\n\nPlease update your password after logging in.\n\nBest,\nCoach Adams`,
      html: `
    <html>
  <body style="font-family: Arial, sans-serif; background-color: #f7fafc; padding: 5px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-top: 5px solid #8B0000;">
      <div style="background-color: #8B0000; color: white; text-align: center; padding: 2rem; border-radius: 8px 8px 0 0;">
        <h1 style="font-size: 1.75rem; font-weight: bold; margin: 0;">Welcome to Massive Income Affiliate Marketing Course!</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; color: #333;">Hi ${email},</p>
        <p style="font-size: 16px; color: #555;">
          Congratulations on joining the <strong>MIC Affiliate Marketing Program</strong>! You’re about to embark on an exciting journey towards financial freedom through affiliate marketing.
        </p>
        <p style="font-size: 16px; color: #555;">Success in affiliate marketing is about consistency, learning, and taking action. Every great marketer started from the beginning, just like you. Stay committed, apply what you learn, and watch your efforts turn into results. This is your opportunity to build something truly rewarding.</p>
        <p style="font-size: 16px; color: #555;">Remember, every small step forward is progress. Stay focused, and don’t hesitate to seek support when needed. The more effort you put in, the greater your success will be!</p>
        <p style="font-size: 16px; color: #555;">Here are your temporary login details:</p>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 5px; font-size: 16px;">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> 12345678</p>
        </div>
        <p style="font-size: 16px; color: #555;">Click below to log in and start your journey:</p>
        <p style="text-align: center;">
          <a href="${process.env.NEXTAUTH_URL}login" style="background: #8B0000; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">Log in to Your Account</a>
        </p>
        <p style="font-size: 16px; color: #555;"><strong>Important:</strong> For security reasons, please change your password after logging in.</p>
        <p style="font-size: 16px; color: #555;">Looking forward to seeing your success!</p>
        <p style="font-size: 16px; color: #333;"><strong>Best regards,</strong><br>Coach Adams<br>MIC Affiliate Marketing</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 14px; color: #777; text-align: center;">
          If you no longer wish to receive emails, you can <a href="${process.env.NEXTAUTH_URL}/unsubscribe" style="color: #8B0000; text-decoration: none;">unsubscribe here</a>.
        </p>
      </div>
    </div>
  </body>
</html>
  `,
    };

    // Send the email
    await transporter.sendMail(message);

    return NextResponse.json(
      { message: "email sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error:" + (error as Error).message },
      { status: 500 }
    );
  }
}
