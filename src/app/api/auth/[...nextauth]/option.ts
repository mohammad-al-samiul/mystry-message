/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
        },
        password: {
          type: "password",
          label: "Password",
        },
      },
      authorize: async (credentials: any): Promise<any> => {
        try {
          await dbConnect();
          const user = await UserModel.findOne({
            email: credentials.email,
          });
          if (!user) {
            throw new Error("User not found!");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your account");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password!");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
};
