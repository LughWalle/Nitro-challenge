const gulp = require("gulp");
const gulpUtil = require('gulp-util');
const watch = require('gulp-watch');
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("sass"));
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const miniHtml = require('gulp-minify-html');
const rename = require('gulp-rename');

gulp.task("buildJs", function () {
  return gulp
    .src(["src/**/*.js"])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest("build"));
});

gulp.task("buildStyles", function () {
  return gulp
    .src("src/**/*.scss")
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(csso())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest("build/css"));
});

gulp.task("buildHtml", function () {
  return gulp
    .src(["src/**/*.html"])
    .pipe(miniHtml())
    .pipe(rename({ extname: '.min.html' }))
    .pipe(gulp.dest('build'));
})

gulp.task("scss2css", function () {
  return gulp
    .src(["src/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"));
})

gulp.task("watch", function () {
  gulp.watch(["src/**/*.js"], ["build"]).on("change", function (e) {
    console.log("Javascrip file " + e.path + " has been changed. Compiling.");
  });
});
