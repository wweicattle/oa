const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://oa.wuwei.kooboo.site'
      }
    }
  },
  css: {
    sourceMap: true
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
    config.plugin("html").tap(options => {
      options[0].title = "OA";
      return options;
    });
  }
}