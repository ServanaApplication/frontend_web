import { io } from 'socket.io-client';
const socket = io(import.meta.env.VITE_BACKEND_URL); // Adjust if using proxy
export default socket;
