import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const createSocket = (
  userId: string,
  role: string,
  clientType: "APP" | "WEB",
) => {
  if (socket?.connected) return socket;

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    withCredentials: true,
    transports: ["websocket"],
    auth: {
      userId,
      role,
      clientType,
    },
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
