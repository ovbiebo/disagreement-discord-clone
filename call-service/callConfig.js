import {io} from "socket.io-client";

export const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 6,
};

// Global State
export const peerConnection = (typeof window === 'undefined') ? null : new RTCPeerConnection(servers);

export const socket = io(process.env.RTC_SERVICE_URL)
