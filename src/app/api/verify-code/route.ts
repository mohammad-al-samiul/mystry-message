import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/user.model";

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // Update the user's verification status
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: "Account verified successfully" },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      // Code has expired
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired. Please sign up again to get a new code.",
        },
        { status: 400 }
      );
    } else {
      // Code is incorrect
      return Response.json(
        { success: false, message: "Incorrect verification code" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return Response.json(
      { success: false, message: "Error verifying user" },
      { status: 500 }
    );
  }
}

/*
Algorithm: Verify User Account with OTP

Start

Connect to Database

Call dbConnect().

Extract Input

Get username and code from request body JSON.

Decode username using decodeURIComponent.

Find User

Query UserModel.findOne({ username: decodedUsername }).

If user not found:

Return { success: false, message: "User not found" } with status 404.

Validate Verification Code

Check if code matches user.verifyCode.

Check if user.verifyCodeExpiry is in the future.

Update Verification Status

If code is correct and not expired:

Set user.isVerified = true.

Save user to the database.

Return { success: true, message: "Account verified successfully" } with status 200.

Handle Expired Code

If code is expired:

Return { success: false, message: "Verification code has expired. Please sign up again to get a new code." } with status 400.

Handle Incorrect Code

If code is incorrect (but not expired):

Return { success: false, message: "Incorrect verification code" } with status 400.

Error Handling

Catch any unexpected errors and return { success: false, message: "Error verifying user" } with status 500.

End
*/
