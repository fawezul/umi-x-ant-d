//link info - https://v2.umijs.org/plugin/umi-plugin-prerender.html
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/home', component: '@/pages/home' },
  ],
  fastRefresh: {},
});
