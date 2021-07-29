import Image from "next/image"
import {useEffect, useRef} from "react";

function MessagesLoaded({messages}) {
    const bottomOfMessagesView = useRef(null)
    useEffect(() => {
        bottomOfMessagesView.current.scrollIntoView({behavior: 'smooth'})
    }, [messages])
    
    return (
        <>
            {messages && messages.map((message) => {
                return (
                    <div key={message.id} className={"mb-6 w-full flex"}>
                        <div className={"h-11 mr-4"}>
                            <Image
                                src={message.senderImageURL}
                                width={44}
                                height={44}
                                className={"bg-gray-600 rounded-full"}
                            />
                        </div>
                        <div className={"flex-1"}>
                            <div className={"flex"}>
                                <p className={"mr-2 text-sm font-medium"}>{message.senderName}</p>
                                <p className={"text-gray-400 text-xs"}>{message.sentAt.toDate().toISOString().split('T')[0]}</p>
                            </div>
                            <div className={"text-gray-200"}>{message.body}</div>
                        </div>
                    </div>
                )
            })}
            <div ref={bottomOfMessagesView}/>
        </>
    )
}

function MessagesLoading({dummyCount = 10}) {
    return (
        <>
            {
                [...Array(dummyCount)].map((dummy, index) => {
                    return (
                        <div key={index} className={"flex mb-6 animate-pulse"}>
                            <div
                                className={"bg-gray-600 w-11 h-11 rounded-full mr-4"}
                            />
                            <div className={"flex-1"}>
                                <div className={`h-4 bg-gray-600 w-1/4 rounded-full mb-2`}/>
                                <div className={`h-4 bg-gray-600 w-3/4 rounded-full mb-2`}/>
                                <div className={`h-4 bg-gray-600 w-2/4 rounded-full mb-2`}/>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export {MessagesLoaded, MessagesLoading}
