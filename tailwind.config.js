/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/page-components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            'white': '#FFFFFF',
            'black': '#000000',
            'grey': '#DDDEDE',

            'default-color': {
                primary: '#202A44',
                secondary: '#E22040',
                tertiary: '#7FC5A0',
                quaternary: '#FBD872',
                quinary: '#DDDEDE',

                font: '#202A44',
            },
            'pmnch-color': {
                primary: '#026BEF',
                secondary: '#EF6100',
                tertiary: '#06A605',
                quaternary: '#FFF200',
                quinary: '#0FC1EF',
                senary: '#EF39EE',
                septenary: '#7E01E5',

                font: '#000000',
            },
        },
        fontFamily: {},
    },
    plugins: [],
}
