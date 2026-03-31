import { io } from "socket.io-client";

let socket: any;

export const connectSocket = (user: { id: string; role: string }) => {
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    auth: {
      userId: user.id,
      role: user.role,
    },
    withCredentials: true,
  });

  return socket;
};

export const getSocket = () => socket;
