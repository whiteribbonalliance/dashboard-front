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
            'gray': '#DDDEDE',
            'default-colors': {
                primary: '#202A44',
                secondary: '#E22040',
                tertiary: '#7FC5A0',
                quaternary: '#FBD872',
                quinary: '#DDDEDE',
                font: '#202A44',
            },
            'pmnch-colors': {
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
        fontFamily: {
            'open-sans': ['Open Sans', 'var(--font-helvetica)', 'Arial', 'sans-serif'],
            'noto-sans-regular': ['var(--font-noto-sans-regular)', 'var(--font-helvetica)', 'Arial', 'sans-serif'],
            '1point8': ['var(--font-1-point-8)', 'sans-serif'],
            'proxima-nova': ['var(--font-proxima-nova)', 'var(--font-helvetica)', 'sans-serif'],
            'helvetica': ['var(--font-helvetica)', 'sans-serif'],
        },
    },
    plugins: [],
}
