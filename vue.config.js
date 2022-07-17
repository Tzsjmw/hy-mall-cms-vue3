const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
    publicPath: '/',
    transpileDependencies: true,
    // 1.配置方式一：CLI提供的属性
    //  修改打包的路径
    outputDir: './bulid',
    devServer: {
        hot: true,
        proxy: {
            '^/api': {
                target: 'http://152.136.185.210:5000',
                changeOrigin: true,
                // 注意路径重写并不会在真实请求内体现出来
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    // 2.配置方式二：和webpack属性完全一致，最后会进行合并
    // configureWebpack: {
    //   resolve: {
    //     alias: {
    //       views: '@/views'
    //     }
    //   }
    // }
    // configureWebpack: (config) => {
    //   config.resolve.alias = {
    //     '@': path.resolve(__dirname, 'src'),
    //     views: '@/views'
    //   }
    // },
    // 3.配置方式三：
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', path.resolve(__dirname, 'src'))
            .set('components', '@/components')
    },
    // element-plus在vue3.0中按需自动导入
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    }
})