const path = require('path')

const config = () => {
  return {
    entry: './src/index.js',
    output: {
      // __dirname は node が定義するのグローバル変数。現在のディレクトリへのパス。
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
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
        }
      ]
    }
  }
}

module.exports = config
