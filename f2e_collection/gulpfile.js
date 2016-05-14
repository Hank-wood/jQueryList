var gulp=require('gulp'),
	jade=require('gulp-jade')
	browserSync = require('browser-sync'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	gulpIf = require('gulp-if'),
	minifyCSS = require('gulp-minify-css'),
	prettify = require('gulp-prettify'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	runSequence = require('run-sequence'),
	del = require('del'),
  sass=require('gulp-sass')
	autoPrefixer = require('gulp-autoprefixer');
// Development Tasks
gulp.task('help', function() {
  console.log('----------------------------------------');
  console.log('gulp                 开发模式');
  console.log('gulp build           部署模式');
  console.log('----------------------------------------');
})
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})
// jade
gulp.task('jade', function() {
	return gulp.src('app/jade/*.jade')
	.pipe(jade())
	.pipe(prettify({ indent_size: 2, unformatted: ['pre', 'code']}))
	.pipe(gulp.dest('app'))
	.pipe(browserSync.reload({
      stream: true
    }));
})
//sass
gulp.task('sass',function(){
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoPrefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream:true
    }))
})
// Watchers
gulp.task('watch', function() {
  gulp.watch('app/jade/**/*.jade', ['jade']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/sass/**/*.scss',['sass'])
})

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', minifyCSS()))
    // Uglifies only if it's a Javascript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest(''))
});
// Optimizing Images
gulp.task('images', function() {
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true,
    })))
  .pipe(gulp.dest('img'))
});
// Cleaning
gulp.task('clean', function(callback) {
  del('css');
  del('img');
  del('js');
  return cache.clearAll(callback);
})
gulp.task('clean:dist', function(callback) {
  del('css');
  del('js');
  del('fonts');
  return cache.clearAll(callback);
})
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('./fonts/'))
})
gulp.task('default', function(callback) {
  runSequence(['jade','sass','browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['sass', 'jade', 'images', 'fonts' ],
    'useref',
    // 'deploy',
    callback
  )
})