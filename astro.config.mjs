// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://developer.evva.link',
	integrations: [
		starlight({
			title: 'Developer',
			customCss: [
				'@fontsource/open-sans/400.css',
				'@fontsource/open-sans/600.css',
				'@fontsource/open-sans/700.css',
				'./src/styles/custom.css'
			],
			logo: {
				light: './src/assets/EVVA-Logo-light.svg',
				dark:  './src/assets/EVVA-Logo-dark.svg'
			},
			social: {
				github: 'https://github.com/evva-sfw/evva-sfw.github.io',
			},
			sidebar: [
				{
					label: 'Mobile',
					// Autogenerate a group of links for the 'mobile' directory.
					autogenerate: { directory: 'Mobile' },
				},
				{
					label: 'Domain',
					// Autogenerate a group of links for the 'mobile' directory.
					autogenerate: { directory: 'Domain' },
				},
				{
					label: 'Specifications',
					// Autogenerate a group of links for the 'specifications' directory.
					autogenerate: { directory: 'Specifications' },
				},
				{
					label: 'Xesar Software',
					// Autogenerate a group of links for the 'specifications' directory.
					autogenerate: { directory: 'XesarSoftware' },
				}
			],
		}),
	],
});
