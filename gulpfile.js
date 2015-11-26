var gulp = require("gulp")
var jade = require("gulp-jade")
var stylus = require("gulp-stylus")
var plumber = require("gulp-plumber")
var inlineCss = require("gulp-inline-css")
var nib = require("nib")

gulp.task("build:jade", function(){
    gulp.src("./src/mensaje.jade")
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest("./src/"))
})

gulp.task("build:stylus", function(){
    gulp.src("./src/main.styl")
        .pipe(plumber())
        .pipe(stylus({
            use: nib(),
            "include css": true
        }))
        .pipe(gulp.dest("./src/"))
})

gulp.task("inlineCss", function(){
    return gulp.src("./src/mensaje.html")
        .pipe(plumber())
        .pipe(inlineCss())
        .pipe(gulp.dest("./dist/"))
})

gulp.task("watch", function(){
    gulp.watch("./src/mensaje.jade", ["build:jade"])
    gulp.watch("./src/main.styl", ["build:stylus"])
    gulp.watch(["./src/mensaje.html", "./src/main.styl"], ["inlineCss","build:jade"])
})

gulp.task("default", ["watch", "inlineCss", "build:jade", "build:stylus"])
