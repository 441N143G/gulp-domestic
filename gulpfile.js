'use strict'
let gulp = require('gulp');
let rename = require("gulp-rename");

let config = {
    dirName: 'Машина_Времени',
    extension: 'mp3'
}
gulp.task('rename', function() {
    return gulp.src(`./${config.dirName}/**/*.${config.extension}`)
        .pipe(rename(function(path) {
            let name = path.basename;
            path.basename  = (name.split(/-|\./)[1] || path.basename).trim()
        }))
        .pipe(gulp.dest(`./dist/${config.dirName}/`));
});
