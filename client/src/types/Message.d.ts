export interface Message {
  sender: string;
  content: string;
  timestamp?: Date;
  isDeleted?: boolean;  // Nueva propiedad para mensajes eliminados
  originalSender?: string;  // Para guardar el ID original del usuario
}