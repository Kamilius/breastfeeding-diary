var gulp = require('gulp')
var babel = require('gulp-babel')

var paths = {
  src: './src/**/*',
  app: './app'
}

gulp.task('babel', function () {
  return gulp.src(paths.src)
    .pipe(babel())
    .on('error', function(err) {
      console.log('Babel thrown an error>>>', err)

      this.emit('end')
    })
    .pipe(gulp.dest(paths.app))
})

gulp.task('watch', function() {
  gulp.watch(paths.src, ['babel'])
})

gulp.task('default', ['babel', 'watch'])
