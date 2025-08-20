"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifySchema } from "@/schemas/verifySchema";
import { IApiResponse } from "@/types/apiResponse.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface IProps {
  params: {
    username: string;
  };
}
const VerifyAcountPage = ({ params }: IProps) => {
  const form = useForm({
    resolver: zodResolver(verifySchema),
  });
  const router = useRouter();
  const { username } = params;

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const res = await axios.post<IApiResponse>(`/api/verify-code`, {
        username,
        code: data.code,
      });

      toast.success("Verification successful", {
        description: res.data.message,
      });
      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<IApiResponse>;
      toast.error("Account verification failed", {
        description:
          axiosError?.response?.data.message ??
          "An error occured. Please try again",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyAcountPage;
