var gulp = require('gulp');
var spawn = require('child_process').spawn;
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var fs = require('fs');

// restore backend
gulp.task('restore backend', function () {

    return spawn('dotnet', ['restore'], { cwd: 'backend/' });
});

// restore backend
gulp.task('install dependencies frontend', function () {
    return spawn('npm', ['install'], { cwd: 'frontend/' });
});

// call of dotnet watch run
gulp.task('build backend', function () {
    function startServer(){
            console.log('Starting server at http:/localhost:5000');
    return spawn('dotnet', ['watch', 'run'],{ cwd: 'backend/' });
    }
    if (!fs.exists('/backend/wwwroot/')) {
        console.log('wwwroot non-existing and ng build is being run');
        ngBuild = spawn('ng', ['build'], { cwd: 'frontend/' });
        ngBuild.on('exit', function(){
            startServer();
        });
    } else {
        startServer();
    }
});

// build and copy frontend
gulp.task('build frontend', function () {
    gulp.watch('frontend/**/*.ts').on('change', function() {
        console.log('Changes in the Angular App detected.');
        return spawn('ng', ['build'], { cwd: 'frontend/' });
    });
});

gulp.task('build', gulp.parallel('build backend', 'build frontend'));

gulp.task('restore', gulp.parallel('restore backend', 'install dependencies frontend'));

// by default call gulp build
gulp.task('default', gulp.series('build'));