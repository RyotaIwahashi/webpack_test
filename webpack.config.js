const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
  console.log('argv.mode:', argv.mode) // --mode で定義されたモードを取得する

  // 本番モードではflyにデプロイしてあるバックエンドを見るように、
  // 開発モードではlocalhostのjson-serverを見るようにする。(要 npm run server)
  // npx static-server でバンドルされているアプリケーションの製品バージョンをローカルで検査できる。
  const backend_url = argv.mode === 'production'
    ? 'https://late-rain-8593.fly.dev/api/notes'
    : 'http://localhost:3001/notes'

  return {
    entry: './src/index.js',
    output: {
      // __dirname は node が定義するのグローバル変数。現在のディレクトリへのパス。
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    // npm start コマンドで port3000 で開発サーバーを起動できるように。
    // dev-server を使用する場合、コードは毎回 build/ にバンドル(ビルド)されるわけではなく、バンドルの結果はメモリ内にのみ存在する。
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
    },
    // バンドルの実行中に発生したエラーを元のソース コードの対応する部分にマッピングできるようにする。
    // ブラウザの開発者ツールでバンドルされたコードではなく元のコードにエラー箇所を表示させられる。
    devtool: 'source-map',
    module: {
      rules: [
        // test プロパティは、ローダーが.jsで終わる名前を持つファイル用であることを指定
        // loader プロパティは、バンドルする前にこれらのファイルの処理をbabel-loaderで実施することを指定
        // options プロパティは、ローダーの機能を構成するパラメータを指定
        // これらはパッケージとしてインストールしておく必要がある。
        // npm install @babel/core babel-loader @babel/preset-react --save-dev
        {
          test: /\.js$/,
          // babel はトランスパイラ。JSXで書いたプログラムを、Reactを使うJSに変換する。
          // ES6やES7で導入された最新の機能はほとんどのブラウザーでサポートされていないため、
          // ES5標準を実装するJSのバージョンに変換される。
          loader: 'babel-loader',
          options: {
            // preset-envは、ES5標準と互換性のあるコードにトランスパイルするために必要なもの
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        },
        // css を使用する場合は以下が必要
        // ビルド時にcssをロードするcss-loaderと、スタイル要素を生成してアプリケーションに挿入するstyle-loader
        // この構成の場合、main.js にcss定義が実装されるため、index.htmlでcssを個別にインポートする必要はない。
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    // Webpack の DefinePlugin を使用して、バンドルされたコードで使用できるグローバルなデフォルト定数を定義することもできる。
    // コードがバンドルされている環境に応じて異なる値を取得する新しいグローバル定数BACKEND_URLを定義。
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
}

module.exports = config
