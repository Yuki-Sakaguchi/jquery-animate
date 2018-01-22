gulp = require 'gulp'
sass = require 'gulp-sass'
postcss = require 'gulp-postcss'
uglify = require 'gulp-uglify'
plumber = require 'gulp-plumber'
coffee = require 'gulp-coffee'
typescript = require 'gulp-typescript'
imagemin = require 'gulp-imagemin'
concat = require 'gulp-concat'
webserver = require 'gulp-webserver'
pug = require 'gulp-pug'

# root paths
path = {
    source: './source/www'
    public: './www'
}


# scss ------------------------------
gulp.task 'scss', ->
    supportBrowser = '> 0.5% in JP'
    postcssPlugins = [
            require('autoprefixer')(supportBrowser) # ベンダープレフィックスの付与
            require('postcss-sorting') # プロパティの順番をソート
        ]

    gulp.src path.source + '/scss/**/*.scss'
    .pipe plumber {
        errorHandler: (err) ->
            console.log err.messageFormatted
            this.emit 'end'
    }
    .pipe sass outputStyle : 'expanded'
    .pipe postcss postcssPlugins
    .pipe gulp.dest path.public + '/css'


# js-plugin ------------------------------
gulp.task 'js-plugin', ->
    gulp.src [
        'vendor/jquery.easing-1.3.js'
    ]
    .pipe concat 'plugins.js', {newLine: ';'}
    .pipe uglify()
    .pipe gulp.dest path.public


# coffee ------------------------------
gulp.task 'coffee', ->
    gulp.src path.source + '/coffee/**/*.coffee'
    .pipe plumber {
        errorHandler: (err) ->
            console.log err.messageFormatted
            this.emit 'end'
    }
    .pipe coffee()
    .pipe gulp.dest path.public + '/js'


# typescript ------------------------------
gulp.task 'ts', ->
    gulp.src path.source + '/ts/**/*.ts'
    .pipe plumber {
        errorHandler: (err) ->
            console.log err.messageFormatted
            this.emit 'end'
    }
    .pipe typescript({
        target: 'ES5' # コンパイル後の構文
        removeComments: true # コメント削除
        out: 'app.js'
    })
    .pipe gulp.dest path.public + '/js'


# pug ------------------------------
gulp.task 'pug', ->
    gulp.src [
        path.source + '/pug/**/*.pug'
        '!' + path.source + '/pug/**/_*.pug'
    ]
    .pipe plumber {
        errorHandler: (err) ->
            console.log err.messageFormatted
            this.emit 'end'
    }
    .pipe pug
        pretty: '    ' # コンパイル時のインデントを4スペースに変更
    .pipe gulp.dest path.public


# imagemin ------------------------------
gulp.task 'imagemin', ->
    gulp.src path.public + '/images/**/*.+(jpg|png)'
    .pipe imagemin
        optimaizationLevel: 7
    .pipe gulp.dest path.public + '/images'


# server ------------------------------
gulp.task 'webserver', ->
    gulp.src path.public
    .pipe webserver()
        # localhostの自動更新
        # livereload: true


# watch ------------------------------
gulp.task 'watch', ->
    gulp.watch path.source + '/scss/**/*.scss', ['scss']
    # gulp.watch path.source + '/coffee/**/*.coffee', ['coffee']
    # gulp.watch path.source + '/ts/**/*.ts', ['ts']
    gulp.watch path.source + '/pug/**/*.pug', ['pug']


# サーバーを立ち上げ、ファイルの修正を監視する ------------------------------
gulp.task 'default', ['webserver', 'watch']
