import gulp from 'gulp';
import browserSync from 'browser-sync';

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], (done) => {
  browserSync({
    open: false,
    port: 9000,
    watch: true,
    server: {
      baseDir: ['.'],
      middleware(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});
