module.exports = {
    css: {
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                lessOptions: {
                    modifyVars: {
                        'nav-bar-text-color': '#323233',
                        'nav-bar-icon-color': '#323233',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
};