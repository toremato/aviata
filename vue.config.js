module.exports = {
  devServer: {
    host: "0.0.0.0",
    hot: true,
    disableHostCheck: true,
  },
  publicPath: process.env.NODE_ENV === "production" ? "/aviata/" : "/",
};
