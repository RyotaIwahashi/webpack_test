import React from "react"
import ReactDOM from "react-dom/client"
import App from './App'
// バンドルされたアプリケーションのソース コードでasync/awaitが使用されている場合は
// install して直接 import することが必要。
// npm install core-js regenerator-runtime
// 参照: https://babeljs.io/docs/babel-polyfill/
// 参照: https://www.npmjs.com/package/core-js
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
