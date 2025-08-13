import { IMessage } from "./message.interface";

export interface IApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: Array<IMessage>;
}
