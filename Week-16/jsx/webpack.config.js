module.exports = {
  entry: "./main.js",
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]]
        }
      }
    }]
  },
  mode: "development"
  //  开发者模式下编译后的代码不会被压缩，更易于调试
}