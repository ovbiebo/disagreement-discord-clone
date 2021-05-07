const LinkButton = ({name, url, secondary}) => {
    return (
        <div className={secondary? "mt-3 sm:mt-0 sm:ml-3": "rounded-full"}>
            <a
                href={url}
                className={
                    secondary
                        ? "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gray-700 hover:text-indigo-200 hover:shadow-lg md:py-4 md:text-lg md:px-10"
                        : "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-gray-700 bg-white hover:text-indigo-700 hover:shadow-lg md:py-4 md:text-lg md:px-10"
                }
            >
                {name}
            </a>
        </div>
    )
}

export default LinkButton