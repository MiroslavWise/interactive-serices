import { defineConfig } from "cypress"
import path from "path"

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
      webpackConfig: {
        resolve: {
          alias: {
            "@components": path.resolve(__dirname, "./src/components"),
            "@config": path.resolve(__dirname, "./src/config"),
            "@context": path.resolve(__dirname, "./src/context"),
            "@helpers": path.resolve(__dirname, "./src/helpers"),
            "@mocks": path.resolve(__dirname, "./src/mocks"),
            "@scss": path.resolve(__dirname, "./src/scss"),
          },
        },
      }
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
    },
  },
})
