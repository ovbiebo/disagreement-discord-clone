const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Jost', 'sans-serif'],
            },
            zIndex: {
                '-10': '-10',
            },
            transitionProperty: {
                'roundness': 'border-radius',
            },
            width: {
                '84': '21rem'
            }
        }
    },
    variants: {
        extend: {
            borderRadius: ['hover'],
        }
    },
    plugins: []
}
