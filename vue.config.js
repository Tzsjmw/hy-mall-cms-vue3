const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
    transpileDependencies: true,
    // 1.配置方式一：CLI提供的属性
    // outputDir: './bulid'    修改打包的路径
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
            .set('views', '@/views')
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