import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import DotenvWebpackPlugin from "dotenv-webpack";
import webpack from "webpack";
import { dirname } from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === "production";
  const mode = isProduction ? "production" : "development";

  return {
    mode,
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].[contenthash].js",
      chunkFilename: "js/[name].[contenthash].chunk.js",
      publicPath: "/",
      clean: true, // Clean the output directory before emit
    },
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map", // Lepsze mapowanie w trybie dev
    module: {
      rules: [
        // TypeScript files
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        // JavaScript files
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        // CSS files
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        // SCSS files
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        // Images
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        // Fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    plugins: [
      // Clean dist folder
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: true,
        cleanOnceBeforeBuildPatterns: ["**/*"],
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        inject: true, // Automatically inject all JS and CSS files
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : false,
      }),
      // Extract CSS in production
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: "css/[name].[contenthash].css",
              chunkFilename: "css/[name].[contenthash].chunk.css",
            }),
          ]
        : []),
      // Enable source maps in development
      ...(isProduction
        ? []
        : [
            new webpack.EvalSourceMapDevToolPlugin({
              exclude: /node_modules/,
              module: true,
              columns: true,
            }),
          ]),
      // Use a single DefinePlugin instance
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      // Use DotenvWebpackPlugin for other environment variables
      new DotenvWebpackPlugin({
        systemvars: true, // Load all system variables
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      port: 8000,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      // Only enable in production
      minimize: isProduction,
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Get the name of the npm package
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              // Return a nice bundle name
              return `npm.${packageName.replace("@", "")}`;
            },
            priority: 10,
          },
          mui: {
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            name: "vendor-mui",
            priority: 20,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
            name: "vendor-react",
            priority: 20,
          },
          commons: {
            name: "commons",
            minChunks: 2,
            priority: -10,
          },
          muiCore: {
            test: /[\\/]node_modules[\\/]@mui[\\/]material[\\/]/,
            name: "vendor-mui-core",
            priority: 25,
          },
          muiIcons: {
            test: /[\\/]node_modules[\\/]@mui[\\/]icons-material[\\/]/,
            name: "vendor-mui-icons",
            priority: 24,
          },
          muiSystem: {
            test: /[\\/]node_modules[\\/]@mui[\\/]system[\\/]/,
            name: "vendor-mui-system",
            priority: 23,
          },
          muiStyles: {
            test: /[\\/]node_modules[\\/]@mui[\\/]styles[\\/]/,
            name: "vendor-mui-styles",
            priority: 22,
          },
          muiOther: {
            test: /[\\/]node_modules[\\/]@mui[\\/](?!material|icons-material|system|styles)[\\/]/,
            name: "vendor-mui-other",
            priority: 21,
          },
        },
      },
      runtimeChunk: "single",
    },
  };
};
