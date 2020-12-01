module.exports = {
    plugins: {
        autoprefixer: {
            browsers: ['Android >= 4.0', 'iOS >= 8']
        },
        'postcss-px2rem': {
            remUnit: 50
        }
    }
}