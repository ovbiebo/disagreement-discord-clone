import {Popover, Transition} from '@headlessui/react';
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import Link from "next/link";
import {Fragment} from "react";
import LinkButton from "./buttons/link-button";

const NavBar = ({menuItems}) => {
    return (
        <nav className={"py-2"}>
            <Popover>
                {({open}) => (
                    <div className={"flex md:grid grid-cols-4 md:grid-cols-6 items-center w-full md:w-auto"}>
                        <Link href="/">
                            <a className={"flex-1"}>
                                <svg width="124" height="34" viewBox="0 0 124 34" className="logo-3LF899">
                                    <g fill="white">
                                        <path
                                            d="M18.1558 14.297C17.1868 14.297 16.4218 15.13 16.4218 16.167C16.4218 17.204 17.2038 18.037 18.1558 18.037C19.1248 18.037 19.8898 17.204 19.8898 16.167C19.8898 15.13 19.1078 14.297 18.1558 14.297ZM11.9508 14.297C10.9818 14.297 10.2168 15.13 10.2168 16.167C10.2168 17.204 10.9988 18.037 11.9508 18.037C12.9198 18.037 13.6848 17.204 13.6848 16.167C13.7018 15.13 12.9198 14.297 11.9508 14.297Z"></path>
                                        <path
                                            d="M26.4178 0.152954H3.63783C1.71683 0.152954 0.152832 1.71695 0.152832 3.63795V26.418C0.152832 28.339 1.71683 29.903 3.63783 29.903H22.9158L22.0148 26.792L24.1908 28.798L26.2478 30.685L29.9198 33.864V3.63795C29.9028 1.71695 28.3388 0.152954 26.4178 0.152954ZM19.8558 22.168C19.8558 22.168 19.2438 21.437 18.7338 20.808C20.9608 20.179 21.8108 18.802 21.8108 18.802C21.1138 19.261 20.4508 19.584 19.8558 19.805C19.0058 20.162 18.1898 20.383 17.3908 20.536C15.7588 20.842 14.2628 20.757 12.9878 20.519C12.0188 20.332 11.1858 20.077 10.4888 19.788C10.0978 19.635 9.67283 19.448 9.24783 19.21C9.19683 19.176 9.14583 19.159 9.09483 19.125C9.06083 19.108 9.04383 19.091 9.02683 19.091C8.72083 18.921 8.55083 18.802 8.55083 18.802C8.55083 18.802 9.36683 20.145 11.5258 20.791C11.0158 21.437 10.3868 22.185 10.3868 22.185C6.62983 22.066 5.20183 19.618 5.20183 19.618C5.20183 14.195 7.64983 9.79195 7.64983 9.79195C10.0978 7.97295 12.4098 8.02395 12.4098 8.02395L12.5798 8.22795C9.51983 9.09495 8.12583 10.438 8.12583 10.438C8.12583 10.438 8.49983 10.234 9.12883 9.96195C10.9478 9.16295 12.3928 8.95895 12.9878 8.89095C13.0898 8.87395 13.1748 8.85695 13.2768 8.85695C14.3138 8.72095 15.4868 8.68695 16.7108 8.82295C18.3258 9.00995 20.0598 9.48595 21.8278 10.438C21.8278 10.438 20.4848 9.16295 17.5948 8.29595L17.8328 8.02395C17.8328 8.02395 20.1618 7.97295 22.5928 9.79195C22.5928 9.79195 25.0408 14.195 25.0408 19.618C25.0408 19.601 23.6128 22.049 19.8558 22.168ZM45.5258 7.42895H39.8818V13.77L43.6388 17.153V10.999H45.6448C46.9198 10.999 47.5488 11.611 47.5488 12.597V17.306C47.5488 18.292 46.9538 18.955 45.6448 18.955H39.8648V22.542H45.5088C48.5348 22.559 51.3738 21.046 51.3738 17.578V12.512C51.3908 8.97595 48.5518 7.42895 45.5258 7.42895ZM75.1058 17.578V12.376C75.1058 10.506 78.4718 10.081 79.4918 11.951L82.6028 10.693C81.3788 8.00695 79.1518 7.22495 77.2988 7.22495C74.2728 7.22495 71.2808 8.97595 71.2808 12.376V17.578C71.2808 21.012 74.2728 22.729 77.2308 22.729C79.1348 22.729 81.4128 21.794 82.6708 19.346L79.3388 17.816C78.5228 19.907 75.1058 19.397 75.1058 17.578ZM64.8208 13.09C63.6478 12.835 62.8658 12.41 62.8148 11.679C62.8828 9.92795 65.5858 9.85995 67.1668 11.543L69.6658 9.62195C68.1018 7.71795 66.3338 7.20795 64.5148 7.20795C61.7438 7.20795 59.0578 8.77195 59.0578 11.73C59.0578 14.603 61.2678 16.15 63.6988 16.524C64.9398 16.694 66.3168 17.187 66.2828 18.037C66.1808 19.652 62.8488 19.567 61.3358 17.731L58.9218 19.992C60.3328 21.811 62.2538 22.729 64.0558 22.729C66.8268 22.729 69.9038 21.131 70.0228 18.207C70.1928 14.518 67.5068 13.583 64.8208 13.09ZM53.4308 22.525H57.2388V7.42895H53.4308V22.525ZM117.64 7.42895H111.996V13.77L115.753 17.153V10.999H117.759C119.034 10.999 119.663 11.611 119.663 12.597V17.306C119.663 18.292 119.068 18.955 117.759 18.955H111.979V22.542H117.64C120.666 22.559 123.505 21.046 123.505 17.578V12.512C123.505 8.97595 120.666 7.42895 117.64 7.42895ZM89.9468 7.22495C86.8188 7.22495 83.7078 8.92495 83.7078 12.41V17.561C83.7078 21.012 86.8358 22.746 89.9808 22.746C93.1088 22.746 96.2198 21.012 96.2198 17.561V12.41C96.2198 8.94195 93.0748 7.22495 89.9468 7.22495ZM92.3948 17.561C92.3948 18.649 91.1708 19.21 89.9638 19.21C88.7398 19.21 87.5158 18.683 87.5158 17.561V12.41C87.5158 11.305 88.7058 10.71 89.8958 10.71C91.1368 10.71 92.3948 11.237 92.3948 12.41V17.561ZM109.888 12.41C109.803 8.87395 107.389 7.44595 104.278 7.44595H98.2428V22.542H102.102V17.748H102.782L106.284 22.542H111.044L106.93 17.357C108.749 16.779 109.888 15.198 109.888 12.41ZM104.346 14.45H102.102V10.999H104.346C106.743 10.999 106.743 14.45 104.346 14.45Z"></path>
                                    </g>
                                </svg>
                            </a>
                        </Link>
                        <div className={"hidden md:block md:flex col-span-4 justify-center space-x-8"}>
                            {menuItems.map((item) => (
                                <Link href={item.href}>
                                    <a key={item.name}
                                       className="font-medium text-white">
                                        {item.name}
                                    </a>
                                </Link>
                            ))}
                        </div>
                        <LinkButton name={"Open App"} url={"/identity/sign-in"}>
                            Log in
                        </LinkButton>
                        <div className="-mr-2 flex items-center md:hidden">
                            <Popover.Button
                                className="rounded-md p-2 inline-flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-400">
                                <MenuIcon className="h-6 w-6" aria-hidden="true"/>
                            </Popover.Button>
                        </div>
                        <Transition
                            show={open}
                            as={Fragment}
                            enter="duration-150 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-100 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Popover.Panel
                                focus
                                static
                                className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                            >
                                <div
                                    className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="px-5 pt-4 flex items-center justify-between">
                                        <div>
                                            <img
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button
                                                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <XIcon className="h-6 w-6" aria-hidden="true"/>
                                            </Popover.Button>
                                        </div>
                                    </div>
                                    <div className="px-2 pt-2 pb-3 space-y-1">
                                        {menuItems.map((item) => (
                                            <Link href={item.href}>
                                                <a
                                                    key={item.name}
                                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                                >
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link href="/">
                                        <a
                                            className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                                        >
                                            Log in
                                        </a>
                                    </Link>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </div>
                )}
            </Popover>
        </nav>
    )
}

const withData = Component => {

    const navigation = [
        {name: 'Product', href: '#'},
        {name: 'Features', href: '#'},
        {name: 'Marketplace', href: '#'},
        {name: 'Company', href: '#'},
    ]

    return () => <Component menuItems={navigation}/>
}

export default withData(NavBar)