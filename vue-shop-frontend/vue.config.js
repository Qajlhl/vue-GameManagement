module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
      // 配置跨域
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
        '/public': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        }
      },
    },
  };