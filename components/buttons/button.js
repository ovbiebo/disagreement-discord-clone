const Button = ({name, onClick}) => {
    return (
        <div className="mt-3 sm:mt-0 sm:ml-3">
            <button
                onClick={() => onClick()}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
            >
                {name}
            </button>
        </div>
    )
}

export default Button