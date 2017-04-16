var gulp = require('gulp');
var spawn = require('child_process').spawn;
var watch = require('gulp-watch');
var batch = require('gulp-batch');

// restore backend
gulp.task('restore backend', function (done) {
    return spawn('dotnet', ['restore'],{ cwd: 'backend/' });
    done();
});

// restore backend
gulp.task('install dependencies frontend', function (done) {
    spawn('npm', ['install'], { cwd: 'frontend/' });
    done();
});

// call of dotnet watch run
gulp.task('build backend', function () {
    spawn('dotnet', ['watch', 'run'],{ cwd: 'backend/' });
});

// call of ng build
gulp.task('build blabla', function () {
    return watch('frontend/**/*.ts',{ ignoreInitial: false } ).pipe(spawn('ng', ['build'], { cwd: 'frontend/' }));
});

// build and copy frontend
gulp.task('build frontend', function () {
    gulp.watch('frontend/**/*.ts').on('change', function() {
        console.log('Changes in the Angular App detected.');
        spawn('ng', ['build'], { cwd: 'frontend/' });
    });
});

gulp.task('build', gulp.parallel('build backend', 'build frontend'));

gulp.task('restore', gulp.parallel('restore backend', 'install dependencies frontend'));

// by default call gulp build
gulp.task('default', gulp.series('build'));