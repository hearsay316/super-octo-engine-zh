// 基于node的 node不支持import语法
// 默认环境变量 NODE_ENV production development
let path = require('path');
module.exports = {
    // baseURL
    publicPath:process.env.NODE_ENV === 'production'? 'http://www.zhufeng.cn':'/',
    assetsDir:'asserts',
    outputDir:'./dist',
    // 使用模版方式 一般不使用
    runtimeCompiler:false,
    // 打包 不再使用sourcemap
    productionSourceMap:false,
    chainWebpack:config=>{
        // 可以获取到webpack的配置 在增加一些自己的逻辑
        // 配置目录别名 别名叫+
        config.resolve.alias.set('_c',path.resolve(__dirname,'src/components'));
        config.resolve.alias.set('_v',path.resolve(__dirname,'src/views'));
    },
    configureWebpack:{ // webpack-merge
        plugins:[],
        module:{}
    },
    devServer:{ // 开发 服务时使用
        proxy:{
            '/api/getUser':{
                target:'http://localhost:3000',
                pathRewrite:{
                    '/api':''
                }
            }
        }
    },
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
            path.resolve(__dirname,'src/assets/common.less')
        ]
      }
    }
}


