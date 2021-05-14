import React, {Fragment, useState} from 'react'
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, SelectorIcon} from "@heroicons/react/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Dropdown = ({title, items}) => {
    const [selected, setSelected] = useState(items[0])

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({open}) => (
                <div className="relative">
                    <Listbox.Button
                        className="relative w-full bg-gray-800 border border-gray-900 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                            <span className="flex items-center">
                                <span className="block truncate capitalize text-gray-300">{selected}</span>
                            </span>
                        <span
                            className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                        >
                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            </span>
                    </Listbox.Button>

                    <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            static
                            className="absolute bottom-full border border-gray-900 capitalize z-10 mb-1 w-full bg-gray-800 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                        >
                            {items.map((item, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({active}) =>
                                        classNames(
                                            active ? 'text-white bg-indigo-600' : 'text-gray-300',
                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                        )
                                    }
                                    value={item}
                                >
                                    {({selected, active}) => (
                                        <>
                                            <div className="flex items-center">

                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
                                                    >
                            {item}
                          </span>
                                            </div>

                                            {selected ? (
                                                <span
                                                    className={classNames(
                                                        active ? 'text-white' : 'text-indigo-600',
                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                    )}
                                                >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            )}
        </Listbox>
    )
}
