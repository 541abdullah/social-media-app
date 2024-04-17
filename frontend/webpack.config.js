const port = 3000;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output:{
       path: path.resolve(__dirname,'/dist'),
       filename:'main.[fullhash].js',
       publicPath: "/",
    },
    module:{
        rules:[

            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use:[
                    {loader:"babel-loader"},
                ],
                
                
            },

            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ],
            }

        ]

    },
    plugins:[
       new HtmlWebpackPlugin({
           template:'./public/index.html',
       })
    ],
    devServer:{
        port: 3000,
        // historyApiFallback:{
        //     index: '/dist/index.html',
        // },
        historyApiFallback:true,
        open:true
    }

}