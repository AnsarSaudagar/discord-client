export interface DirectMessages {
  message_id: number;
  message_text: string;
  senderId: number;
  receiverId: number;
  sender_name: string;
  sent_at: Date | string;
}
