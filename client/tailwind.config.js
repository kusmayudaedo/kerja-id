/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		fontFamily: {
			'font-family': ['ABeeZee'],
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
