var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var pug = require('gulp-pug');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('pug', function buildHTML() {
    return gulp.src(['src/pug/**/*.pug' , 'pug/*.pug'])
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('src/dist/html'))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest("src/dist/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'pug', 'js'], function() {

    browserSync.init({
        server: {
            baseDir: './src/dist'
        }
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss', 'src/scss/mixins/*.scss'], ['sass']);
    gulp.watch(["src/pug/*.pug", "src/pug/**/*.pug"], ['pug']);
    gulp.watch("src/pug/**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);