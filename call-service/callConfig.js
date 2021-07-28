import {io} from "socket.io-client";

export const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 6,
};
export const socket = io(process.env.NEXT_PUBLIC_RTC_SERVICE_URL)
