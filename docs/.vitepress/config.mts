import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "document",
  description: "document description",
  base: '/dib-standard/dist/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Standard', link: '/git-standard' }
    ],

    sidebar: [
      {
        text: 'Standard',
        items: [
          { text: 'git-standard', link: '/git-standard' },
          { text: 'web-standard', link: '/web-standard' },
          { text: 'javascript-standard', link: '/javascript' },
          { text: 'css-standard', link: '/css' },
          { text: 'html-standard', link: '/html' },
          { text: 'typescriptstandard', link: '/typescript' },
        ]
      }
    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
