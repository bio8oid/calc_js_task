import gulp from 'gulp';
import 'core-js';
// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import "@babel/polyfill";
import del from 'del';
import sass from 'gulp-sass';
import clean from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';

function refresh(done){
    browserSync.reload();
    done();
}

gulp.task('static', gulp.series(
    function moveHtml() {
        return gulp.src('index.html').pipe(gulp.dest('./docs'));
    },
    function moveImages() {
        return gulp.src('images/**/*.*').pipe(gulp.dest('./docs/images/'));
    },
    function moveFonts() {
        return gulp.src('fonts/**/*.*').pipe(gulp.dest('./docs/fonts/'));
    },
    refresh
));

gulp.task('remove', () => {
    return del('./docs');
});

gulp.task('sass', gulp.series(function scss() {
    return  gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(clean())
        .pipe(gulp.dest('./docs/css'))
}, refresh));



gulp.task('js', gulp.series(function js() {
    return gulp.src('js/script.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())
        .pipe(gulp.dest('./docs/js'));
}, refresh));

gulp.task('build', gulp.series(['remove', "sass", "js", "static",]));

function server() {
    browserSync.init({
        server: {
            injectChanges: true,
            baseDir: "./docs"
        },
        port: 3000
    })
}

gulp.task('default', gulp.series(['build']));

gulp.task('watch', gulp.series(['default'], function watch() {
    gulp.watch('sass/*.scss', gulp.series(['sass']));
    gulp.watch('js/*.js', gulp.series(['js']));
    gulp.watch('*.html', gulp.series(['static']));
    return server();
}));