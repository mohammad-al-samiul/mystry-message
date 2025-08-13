import EmailTemplate from "@/components/email/verificationEmail";
import { resend } from "@/lib/resend";
import { IApiResponse } from "@/types/apiResponse.interface";

interface ISendVerificationEmailProps {
  username: string;
  email: string;
  verifyCode: string;
}

export async function sendVerificationEmail({
  username,
  email,
  verifyCode,
}: ISendVerificationEmailProps): Promise<IApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry Message || Verification Email",
      react: EmailTemplate({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "Email Sent Successfully",
    };
  } catch (error) {
    console.error("Failed Sending Email", error);
    return {
      success: false,
      message: "Failed to send email",
    };
  }
}
