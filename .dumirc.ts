import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    logo: '/logo.png',
    name: '天书奇谈',
    prefersColor: { default: 'light', switch: false },
    footer: '内容非原创，网站由清仙烹（无情的毒，我喜欢跳，我喜欢Rap，-2，等人）制作，主要是无情的毒做的'
  },
  favicons: ['/logo.png']
});