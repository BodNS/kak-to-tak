https://habr.com/ru/articles/701724/   !!!!

предварительно на комп должен быть установлен node js
- инициализировать npm
	npm init
- установить npm (не обязательно, можно сразу устанавливать нужные пакеты)
	npm install 
- установить webpack and webpack-cli (терминал)
	npm i webpack webpack-cli

- создать файл webpack.config.js в папке проекта

- с сайта https://webpack.js.org/ скопировать первоначальные настройки в
	webpack.config.js

- настроить входящую и исходящую папки...


-указать режим сборки development oder prodaction
	mode: "development",
	по умолчанию prodaction
	можно также в package.json написать:
	"build": "webpack --mode production"
	"dev": "webpack --mode development"
	а  mode: "development" убрать

- запустить скрипт из package.json
	npm run build oder npm run dev

-webpack  сам следит за изменениями и пересобирант сборку
	webpack --watch

- восстановить node_modules из package.json
	npm i

-собирает bundl и работает в режиме сервера webpack-dev-server
	установить npm i webpack-dev-server
	в  package.json добавить "start": "webpack-dev-server",
	запустить npm run start

из коробки webpack "знает" только js and json files, для остальных типов файлов надо устанавливать loader
и прописывать их в webpack.config.js
	 rules: [
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]

плагины выполняются после сборки, например HtmlWebpackPlugin создает index.html в директории с бандлом и автоматически добавляет в него ссылку на бандл.
 - npm i html-webpack-plugin
 - в webpack.config.js добавить 
	plugins: [
		new HtmlWebpackPlugin()
	]
	и const HtmlWebpackPlugin = require('html-webpack-plugin')
