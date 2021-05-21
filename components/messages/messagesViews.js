function MessagesLoaded({messages}) {
    return (
        <>
            {messages && messages.map((message) => {
                return (
                    <div key={message.id} className={"mb-4 w-full"}>
                        <div>{message.body}</div>
                    </div>
                )
            })}
        </>
    )
}

function MessagesLoading({dummyCount = 10}) {
    return (
        <>
            {
                [...Array(dummyCount)].map((dummy, index) => {
                    return (
                        <div key={index} className={"flex mb-4 animate-pulse"}>
                            <div
                                className={"bg-gray-600 w-13 h-13 rounded-full mr-2"}
                            />
                            <div className={"flex-1"}>
                                <div className={`h-4 bg-gray-600 w-1/4 rounded-full mb-4`}/>
                                <div className={`h-4 bg-gray-600 w-3/4 rounded-full mb-4`}/>
                                <div className={`h-4 bg-gray-600 w-2/4 rounded-full mb-4`}/>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export {MessagesLoaded, MessagesLoading}
