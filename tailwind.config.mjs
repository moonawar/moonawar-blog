/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['Space Grotesk', 'Roboto'],
		},
		fontSize: {
			'3xl': '2rem',
		},
		extend: {
			colors: {
				primary: '#81D8DE',
				secondary: '#060928',
				secondary_dark: "#04061B"
			}
		},
	},
	plugins: [],
}
