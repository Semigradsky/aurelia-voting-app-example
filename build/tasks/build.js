import gulp from 'gulp';
import runSequence from 'run-sequence';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import to5 from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import paths from '../paths';
import compilerOptions from '../babel-options';
import assign from 'object.assign';

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', () => {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions)))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', () => {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', (callback) => {
  return runSequence(
    'clean',
    ['build-system', 'build-html'],
    callback
  );
});
