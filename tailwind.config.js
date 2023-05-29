/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/page-components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/graph-components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            'white': '#FFFFFF',
            'black': '#000000',
            'gray-lighter': '#f9f9f9',
            'gray-light': '#DDDEDE',
            'transparent': 'transparent',
            'defaultColors': {
                'primary': '#202A44',
                'secondary': '#E22040',
                'tertiary': '#7FC5A0',
                'quaternary': '#FBD872',
                'quinary': '#DDDEDE',

                'primary-faint': '#CED6E7',
                'secondary-faint': '#FCD6DB',
                'tertiary-faint': '#E5F3EB',
                'quaternary-faint': '#FEF7E2',
                'quinary-faint': '#DDDEDE',

                'font': '#202A44',
            },
            'pmnchColors': {
                'primary': '#026BEF',
                'secondary': '#EF6100',
                'tertiary': '#06A605',
                'quaternary': '#FFF200',
                'quinary': '#0FC1EF',
                'senary': '#EF39EE',
                'septenary': '#7E01E5',

                'primary-faint': '#EAF3FF',
                'secondary-faint': '#FFDFC9',
                'tertiary-faint': '#BEFDBD',
                'quaternary-faint': '#FFFCCC',
                'quinary-faint': '#CFF3FC',

                'font': '#000000',
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
