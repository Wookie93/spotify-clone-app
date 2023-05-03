/**
 * @type {import('vite').UserConfig}
 */
export default {
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/global-styles/styles/mixins.scss";`,
      },
    },
  },
};
