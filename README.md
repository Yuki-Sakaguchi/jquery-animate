# 静的サイトの構築テンプレート
静的サイト構築のテンプレートです。  
gulpを使ってサイト構築を高速化します。  
このリポジトリを落としてプロジェクトに合わせてカスタマイズして使ってください。


## このテンプレートを使うための手順
npmがインストールされていることが前提です。  
npmが入っていない場合は、以下のサイトを参考にnodeとnpmをインストールしてください。

> node,npmの入れ方 -> [Node.js と npm インストールとアップデート](http://qiita.com/jaxx2104/items/2277cec77850f2d83c7a)  
> node,npmを入れるためのHoumebrewの入れ方 -> [Homebrew — macOS 用パッケージマネージャー](https://brew.sh/index_ja.html)

gitからこのテンプレートをcloneしてきたら、ターミナルを開いて以下のコマンドを入力しましょう。
~~~
cd このリポジトリを落としてきたディレクトリまでのパス(例 /Users/y.sakaguchi/work/html_template)
npm install
~~~
エラーがでなければ準備完了！


## 開発時に叩くコマンド
source配下のファイルの変更をgulpで監視します。  
開発、修正を開始する前に以下のコマンドをターミナルから叩いてから作業してください。
~~~
gulp watch
~~~
↑プロジェクト内の「/node_modules/.bin/gulp watch」を起動するコマンドです。グローバルのnode_modulesまでのパスが通っている場合は「gulp watch」でも可。


## 監視を止めるコマンド
ファイルの修正の監視を止めたい場合には、ターミナル場で以下のショートカットキーを入力すると監視が止まります。
~~~
ctrl + c
~~~


## その他便利なコマンド
~~~
gulp webserver
~~~
↑プロジェクトの「/www」をドキュメントルートとしたサーバーを立ち上げます。「https://localhost:8000」にアクセスすると「/www/index.html」にが表示され、ファイルの修正内容が自動でブラウザに反映されます。  
グローバルの「node_modules/.bin」までのパスが通っている場合には「gulp-webserver」でも可。

~~~
gulp
~~~
↑プロジェクトの「/www」をドキュメントルートとしたサーバーを立ち上げつつ、ファイルの監視をします。「https://localhost:8000」でアクセスすると「/www/index.html」が表示され、ファイルの修正内容が自動でブラウザに反映されます。  
グローバルの「node_modules/.bin」までのパスが通っている場合には「gulp」でも可。

~~~
gulp imagemin
~~~
↑プロジェクトの「/www/images」内のjpg,pngファイルを圧縮します。グローバルの「node_modules/.bin」までのパスが通っている場合には「gulp-imagemin」でも可。


## ディレクトリ構成
~~~
project                    # ドキュメントルート
 ├ source                  # 非公開ディレクトリ
 │ └ www
 │    ├ pug
 │    │ ├ common
 │    │ │ └ _layout.pug    # 共通のpugファイル
 │    │ └ index.pug        # ページのURLになるpugファイル
 │    │
 │    ├ coffee
 │    │ └ script.coffee    # CoffeeScriptファイル
 ｜    ｜
 │    ├ ts
 │    │ ├ util
 │    │ │ └ module.ts      # 共通のTypeScriptファイル
 │    │ └ main.ts          # TypeScriptファイル
 │    │
 │    └ scss
 │       └ main.scss        # scssファイル
 │
 ├ www                     # 公開ディレクトリ
 │ ├ js
 │ │ ├ app.js               # /source/www/ts内のtsファイルをコンパイルしたjsファイル
 │ │ └ main.js             # /source/www/coffee内のcoffeeファイルをコンパイルしたjsファイル
 │ │
 │ ├ css
 │ │ └ main.css            # /source/www/css内のscssファイルをコンパイルしたcssファイル
 │ │
 │ ├ images                # 画像ファイル（gulpで直接圧縮をかける）
 │ └ index.html            # /source/www/pug内のpugファイルをコンパイルしたhtmlファイル
 │
 ├ .gitattributes          # gitの属性設定
 ├ .gitignore              # gitで管理しないファイル定義
 ├ gulpfile.coffee         # gulpタスク管理（CoffeeScriptで記述）
 ├ packege.json            # プロジェクト情報ファイル
 └ README.md               # プロジェクト説明ドキュメント
 ~~~


## html
htmlはPugで書きます。  
共通するパーツは/source/www/pug/common/にアンダーバー始まりのファイル名で保存して使いまわします。


## js
jsはCoffeeScriptかTypeScriptで書きます。  
コンパイルされたjsファイルは/www/jsに保存されます。


## css
cssはsass(scss)とpostCSSで書きます。  
sassのコンパイルと同時にpostCSSのプラグインを通してベンダープレフィックスをつけるので、sassではimport, 変数, ネスト, mixinなどの機能だけ利用し、プレフィックスはつけなくて良いです。
