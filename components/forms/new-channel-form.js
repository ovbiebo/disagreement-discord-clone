import {createChannel} from "../../data-sources/fetchers/channels";
import {useState} from "react";
import TextField from "../common/inputs/text-field";
import {RadioGroup} from "@headlessui/react"
import {CheckCircleIcon, VolumeUpIcon} from "@heroicons/react/solid";
import {HashtagIcon} from "@heroicons/react/outline";

export function NewChannelForm({newChannel, onChannelAdded}) {
    const [addingChannel, setAddingChannel] = useState(false)
    const [error, setError] = useState(null)
    let [isVoiceChannel, setIsVoiceChannel] = useState(false)

    async function addChannel({name, category, serverId}) {
        try {
            await createChannel(name, category, isVoiceChannel, serverId)
            onChannelAdded();
        } catch (e) {

        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            setAddingChannel(true)
            await addChannel({
                serverId: newChannel.serverId,
                category: newChannel.category,
                name: e.target.name.value,
                isVoiceChannel
            })
            onChannelAdded()
        } catch (error) {
            setAddingChannel(false)
            setError(error)
        }
    }

    return (
        <form action="#" method="POST" onSubmit={submitForm}>
            <p className={"text-gray-300 text-sm text-center mt-1 mb-4"}>{`in ${newChannel.category}`}</p>
            <div className={"text-gray-300 mb-5"}>
                <label htmlFor="channel-type"
                       className={`text-xs font-bold ${!error ? "text-gray-200" : "text-red-500"} flex mb-2`}>
                    <p className={"font-medium uppercase mr-2"}>Channel Type</p>
                    {error && <p className={"font-light"}>{"- Login or password is invalid"}</p>}
                </label>
                <RadioGroup value={isVoiceChannel} onChange={setIsVoiceChannel}>
                    <RadioGroup.Option value={false}>
                        {({checked}) => (
                            <div
                                className={`${checked ? 'bg-gray-900' : 'bg-gray-800'} cursor-pointer flex items-center px-3 rounded-md h-14 mb-2 text-lg`}>
                                <div className="flex-shrink-0 text-indigo-500 mr-2">
                                    {
                                        checked
                                            ? <CheckCircleIcon className={`w-7 h-7`}/>
                                            : <div className={"rounded-full bg-gray-700 h-7 w-7"}/>
                                    }
                                </div>
                                <HashtagIcon className={"w-5 h-5 mr-1"}/>
                                Text Channel
                            </div>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value={true}>
                        {({checked}) => (
                            <div
                                className={`${checked ? 'bg-gray-900' : 'bg-gray-800'} cursor-pointer flex items-center px-3 rounded-md h-14 text-lg`}>
                                <div className="flex-shrink-0 text-indigo-500 mr-2">
                                    {
                                        checked
                                            ? <CheckCircleIcon className={`w-7 h-7`}/>
                                            : <div className={"rounded-full bg-gray-700 h-7 w-7"}/>
                                    }
                                </div>
                                <VolumeUpIcon className={"h-5 w-5 mr-2"}/>
                                Voice Channel
                            </div>
                        )}
                    </RadioGroup.Option>
                </RadioGroup>
            </div>

            <div>
                <label htmlFor="name"
                       className={`text-xs font-bold ${!error ? "text-gray-200" : "text-red-500"} flex mb-2`}>
                    <p className={"font-medium uppercase mr-2"}>Channel Name</p>
                    {error && <p className={"font-light"}>{"- Login or password is invalid"}</p>}
                </label>
                <TextField type={"name"} placeholder={"# New Channel"} required disabled={addingChannel}/>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    className="inline-flex mr-2 justify-center px-4 py-2 text-sm font-medium hover:underline border border-transparent focus:outline-none"
                    onClick={onChannelAdded}
                    disabled={addingChannel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 border border-transparent rounded-md focus:outline-none"
                    disabled={addingChannel}
                >
                    Create Channel
                </button>
            </div>
        </form>
    )
}
