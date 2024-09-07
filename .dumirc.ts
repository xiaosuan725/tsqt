import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    logo: '/logo.png',
    name: '天书奇谈',
    prefersColor: { default: 'light', switch: false }
  },
  favicons: ['/logo.png']
});