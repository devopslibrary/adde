module.exports = {
  devServer: {
    host: "0.0.0.0",
    disableHostCheck: true,
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "~@/scss/_variables.sass"`
  //     },
  //     scss: {
  //       prependData: `@import "~@/scss/_variables.scss";`
  //     }
  //   }
  // },
  transpileDependencies: ["vuetify"],
};
