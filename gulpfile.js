var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();

function scss() {
    return (
        gulp
        .src('./scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()).on("error", sass.logError)
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream())
    );    
}

function reload() {
    browserSync.reload();
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
    
    gulp.watch('./scss/**/*.scss', scss);
    gulp.watch("./**/*.html").on('change', reload);
    gulp.watch("./**/*.js").on('change', reload);
}

exports.default = watch;