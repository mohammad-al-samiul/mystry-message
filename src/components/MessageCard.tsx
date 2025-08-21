import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { IMessage } from "@/types/message.interface";
import axios, { AxiosError } from "axios";
import { IApiResponse } from "@/types/apiResponse.interface";
import { toast } from "sonner";

interface IMessageProps {
  message: IMessage;
  onMessageDelete: (messageId: string) => void;
}

const MessageCard = ({ message, onMessageDelete }: IMessageProps) => {
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<IApiResponse>(
        `/api/delete-message/${message._id}`
      );
      toast.success("Message Deleted Successfully", {
        description: response.data.message,
      });
      onMessageDelete(message._id!);
    } catch (error) {
      const axiosError = error as AxiosError<IApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ?? "Failed to delete message",
      });
    }
  };
  return (
    <Card className="card-bordered">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{message.content}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm">
          {/* {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")} */}
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default MessageCard;
