module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375,  //视窗宽度，对应设计稿宽度
            viewportHeight: 667, //视窗高度
            unitPrecision: 5,    //px转vw单位时精确到小数点后第几位
            viewportUnit: 'vw',  //视窗单位，建议vw
            selectorBlackList: ['ignore','tab-bar','tab-bar-item'],   //要忽略的，即不需要转换的类
            minPixelValue: 1,    //小于或等于1px的不转换
            mediaQuery: false,   //是否允许媒体查询
            exclude: [/TabBar/]  //忽略，不转换的文件，用js里的正则
        }
    }
}