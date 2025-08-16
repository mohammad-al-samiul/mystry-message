import { render } from "@react-email/render";
import EmailTemplate from "@/components/email/verificationEmail";
import { resend } from "@/lib/resend";
import { IApiResponse } from "@/types/apiResponse.interface";

export async function sendVerificationEmail(
  username: string,
  email: string,
  verifyCode: string
): Promise<IApiResponse> {
  const htmlContent = await render(
    <EmailTemplate username={username} otp={verifyCode} />
  );

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry Message || Verification Email",
      html: htmlContent,
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
