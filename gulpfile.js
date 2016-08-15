'use strict'
let gulp = require('gulp'),
    rename = require("gulp-rename"),
    getPixels = require("get-pixels"),
    RenameConfig = {
        dirName: 'input',
        extension: 'mp3'
    },
    lvlConfig = {
        path: 'test.png',
        name: 'lvl1',
        fileExt: 'txt'
    }
gulp.task('rename', function() {
    let name;
    return gulp.src(`./${RenameConfig.dirName}/**/*.${  RenameConfig.extension}`)
        .pipe(rename(function(path) {
            if (path.basename.match(/\d/)) {
                path.basename = path.basename.split(/\s|-|\./)
                path.basename.splice(0,1)
                path.basename = path.basename.join(' ')
            }else{
              console.log('nope',  path.basename );
            }
        }))

    .pipe(gulp.dest(`./dist/${RenameConfig.dirName}/`));
});
gulp.task('lvl', function() {
    let res = []
    let writer = `export let mapModel = [
    `
    return getPixels(`${lvlConfig.path}`, function(err, pixels) {
        if (err) {
            console.log("Bad image path")
            return
        }
        for (let i = 0; i < pixels.shape[1]; i++) {
            res.push([])
            for (let j = 0; j < pixels.shape[0]; j++) {
                let pusher = pixels.get(j, i, 0) === 255 ? 101 : 201
                res[i].push([pusher])
            }
        }
        for (let it of res) {
            writer += `[`
            for (let i of it) {

                writer += `[${i}]`
                if (it.indexOf(i) < (it.length - 1)) {
                    writer += `,`
                }
            }
            writer += `]`
            if (res.indexOf(it) < (res.length - 1)) {
                writer += `,
            `
            }
        }
        writer += `
      ]`
        require('fs').writeFileSync(`dist/${lvlConfig.name}.${lvlConfig.fileExt}`, `${writer}`);
    })
});
