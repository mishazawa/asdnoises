/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-nested": require("postcss-nested"),
    tailwindcss: {},
    autoprefixer: {},
  },
};

module.exports = config;
