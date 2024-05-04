import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

import User from "@/db/models/user-model";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) => {
  try {
    // Hash the user ID for a verification token
    const hashedToken = await bcryptjs.hash(userId.toString(), 12);

    // Update the user's verification token
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verificationToken: hashedToken,
          verificationTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    // Create a transporter instance
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.TEST_USER,
        pass: process.env.TEST_PASS,
      },
    });

    // Configure mail options
    const mailOptions = {
      from: "sharmavarun.1912@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verification" : "reset"
      }?verificationToken=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or paste the link below in your browser</p><br><p>${
        process.env.DOMAIN
      }/${
        emailType === "VERIFY" ? "verification" : "reset"
      }?verificationToken=${hashedToken}</p>`,
    };

    // Send the email
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error("Error sending email:---", error.message);
  }
};
