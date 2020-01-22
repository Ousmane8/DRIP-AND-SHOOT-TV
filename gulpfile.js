const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minify = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const googleWebFonts = require('gulp-google-webfonts')
const del = require('del');

const clean = () => del(['assets'])

const paths = {
    scripts: {
        src: [
            'node_modules/jquery/dist/jquery.slim.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'src/javascripts/**/*.js'
        ],
        dest: 'assets/javascripts'
    },
    styles: {
        src: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'src/stylesheets/**/*.css'
        ],
        dest: 'assets/stylesheets'
    },
    images: {
        src: ['src/images/**/*'],
        dest: 'assets/images'
    }
};

const scripts = () =>
    gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(paths.scripts.dest))


const styles = () =>
    gulp.src(paths.styles.src)
        .pipe(minify())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(paths.styles.dest))

const images = () =>
    gulp.src(paths.images.src)
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest(paths.images.dest))

const fonts = () =>
    gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))

const build = gulp.series(clean, gulp.parallel(styles, scripts, images));


const watch = () =>
    gulp.watch(paths.scripts.src, scripts)
gulp.watch(paths.styles.src, styles)
gulp.watch(paths.images.src, images)

exports.clean = clean;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.build = build;
exports.watch = watch;

gulp.task('default', build);