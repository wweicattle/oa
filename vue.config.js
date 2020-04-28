module.exports={
    devServer: {
        proxy: {
          '/api': {
            target: 'http://oa.wuwei.kooboo.site'
          }
        }
      },
    configureWebpack:{
        resolve:{
            alias:{
                "assets":"@/assets",
                "common":"@/common",
                "network":"@/network",
                "components":"@/components",
                "views":"@/views",
            }
        }
    }
}