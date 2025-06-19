export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  senderId: string;
}