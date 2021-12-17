module.exports = function override(config, env) {
    config.module.rules.push({
        test: /\.(png|jpg|gif)$/i,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 8192,
                    mimetype: "image/png",
                    encoding: true,
                },
            },
        ],
    });
    return config;
}