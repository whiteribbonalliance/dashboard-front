/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/page-components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            white: '#FFFFFF',
            black: '#000000',
            grey: '#DDDEDE',
            default: {
                'primary-color': '#202A44',
                'secondary-color': '#E22040',
                'tertiary-color': '#7FC5A0',
                'quaternary-color': '#FBD872',
                'quinary-color': '#DDDEDE',
                'font-color': '#202A44',
            },
            pmnch: {
                'primary-color': '#026BEF',
                'secondary-color': '#EF6100',
                'tertiary-color': '#06A605',
                'quaternary-color': '#FFF200',
                'quinary-color': '#0FC1EF',
                'senary-color': '#EF39EE',
                'septenary-color': '#7E01E5',
                'font-color': '#000000',
            },
        },
        fontFamily: {
            'default-family': {
                'open-sans': ['Open Sans', 'Helvetica', 'Arial', 'sans-serif'],
            },
            'pmnch-family': {
                'noto-sans-regular': ['Noto Sans Regular', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
