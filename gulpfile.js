
const gulp = require("gulp");
const del = require("del");


gulp.task("fresh-project", function(cb) {
    del([
        // './module/**/*.css',
        './_test-output/*',
        './bundle/*',
        './coverage/*',
        './demo/app/*.js',
        './demo/app/*.js.map'
    ]).then(function () { cb(); });
});


gulp.task("bundle:prepare", function(cb) {

    del([
        './bundle/*'
    ]).then(function () { cb(); });
});


gulp.task('bundle:finalize', function() {

    return gulp.src([
        './module/**/vendor-js/*',
        './module/**/*.html',
        './module/**/*.css'
    ], { base: "./module" })
        .pipe(gulp.dest('./bundle'));
});


gulp.task('bump:patch', function(){

    const bump = require("gulp-bump");

    gulp.src('./package.json')
        .pipe(bump({type:'patch'}))
        .pipe(gulp.dest('./'));
});


gulp.task('dev:sass', [], function () {

    var sass = require('gulp-sass'),
        rename = require('gulp-rename'),
        autoprefixer = require('gulp-autoprefixer'),
        cssnano = require('gulp-cssnano');

    return gulp.src('./__sass/main.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 5%']
        }))
        .pipe(cssnano({
            safe: true
        }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./module/pages/css'));
});
