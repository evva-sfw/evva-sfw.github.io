// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

// https://astro.build/config
export default defineConfig({
  site: 'https://developer.evva.link',
  integrations: [
    starlight({
      title: '',
      head: [
        {
          tag: 'script',
          attrs: {
            defer: true,
            src: 'https://static.cloudflareinsights.com/beacon.min.js',
            'data-cf-beacon': '{"token": "9e2b0e811ef64fd684f7616315bd5641"}',
          }
        }
      ],
      customCss: [
        '@fontsource/open-sans/400.css',
        '@fontsource/open-sans/600.css',
        '@fontsource/open-sans/700.css',
        './src/styles/custom.css'
      ],
      logo: {
        light: './src/assets/EVVA-Logo-light.svg',
        dark: './src/assets/EVVA-Logo-dark.svg'
      },
      social: [
        {icon: 'github', label: 'GitHub', href: 'https://github.com/evva-sfw/evva-sfw.github.io'},
      ],
      sidebar: [
        {
          label: 'Domain',
          autogenerate: {directory: 'Domain'},
        },
        {
          label: 'Mobile SDK',
          autogenerate: {directory: 'MobileSDK'},
        },
        {
          label: 'Xesar Software',
          autogenerate: {directory: 'XesarSoftware'},
        },
        {
          label: 'Specifications',
          autogenerate: {directory: 'Specifications'},
        },
        {
          label: 'Guides',
          autogenerate: {directory: 'Guides'},
        },
      ],
      plugins: [starlightLinksValidator()],
    }),
  ],
});
