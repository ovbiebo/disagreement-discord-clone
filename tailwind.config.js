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
                '13': '3.25rem',
                '84': '21rem'
            },
            height: {
                '13': '3.25rem'
            },
            borderRadius: {
                '4xl': '2rem',
            },
            scale: {
                '-100': '-1'
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
