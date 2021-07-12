import React, {createContext, useEffect, useReducer} from 'react'
import callReducer from "./callReducer";
import firebase from "../../firebase/clientApp";
import {peerConnection} from "../../call-service/callConfig";

const callContext = createContext()

function CallProvider({children}) {
    const callState = {
        channelId: null,
        isConnected: false,
        isSpeakerEnabled: true,
        isMicrophoneEnabled: false,
        isVideoEnabled: false,
    }

    const [state, dispatch] = useReducer(callReducer, callState)

    useEffect(() => {
        if (state.channelId) {
            const callDoc = firebase.firestore().collection('calls').doc(state.channelId);
            const offerCandidates = callDoc.collection('offerCandidates');
            const answerCandidates = callDoc.collection('answerCandidates');


            // callInput.value = callDoc.id;

            // Get candidates for caller, save to db
            peerConnection.onicecandidate = (event) => {
                event.candidate && offerCandidates.add(event.candidate.toJSON());
            };

            let unsubscriber = null;

            // Create offer
            peerConnection.createOffer().then(async (description) => {
                    await peerConnection.setLocalDescription(description)
                    const offer = {
                        sdp: description.sdp,
                        type: description.type,
                    };

                    await callDoc.set({offer});

                    // Listen for remote answer
                    const answerUnsubscriber = callDoc.onSnapshot((snapshot) => {
                        const data = snapshot.data();
                        if (!peerConnection.currentRemoteDescription && data?.answer) {
                            const answerDescription = new RTCSessionDescription(data.answer);
                            peerConnection.setRemoteDescription(answerDescription).then();
                        }
                    });

                    // When answered, add candidate to peer connection
                    const answerICEUnsubscriber = answerCandidates.onSnapshot((snapshot) => {
                        snapshot.docChanges().forEach((change) => {
                            if (change.type === 'added') {
                                const candidate = new RTCIceCandidate(change.doc.data());
                                peerConnection.addIceCandidate(candidate).then();
                            }
                        });
                    });

                    unsubscriber = () => {
                        peerConnection.onicecandidate = null;
                        answerUnsubscriber();
                        answerICEUnsubscriber();
                    }
                }
            )

            // Unsubscribe listeners on unmount
            return () => unsubscriber && unsubscriber()
        }
    }, [state.channelId])

    return (
        <callContext.Provider value={[state, dispatch]}>
            {children}
        </callContext.Provider>
    )
}

async function useMedia() {
    let localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    let remoteStream = new MediaStream();

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    // Pull tracks from remote stream, add to video stream
    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        });
    };

    return {
        localStream,
        remoteStream
    }
}

export {CallProvider, callContext}
