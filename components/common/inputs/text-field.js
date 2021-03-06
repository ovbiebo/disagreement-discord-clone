const TextField = ({ type , placeholder, required, ...props}) => {
    return (
        <input
            id={type}
            name={type}
            type={type}
            autoComplete={type}
            required = {required}
            className="appearance-none mt-1 bg-gray-800 block w-full px-3 py-2 border border-gray-900 placeholder-gray-500 text-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder={placeholder}
            {...props}
        />
    )
}

export default TextField
