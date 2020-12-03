
import { series, parallel, src, dest } from 'gulp'
import ts from 'gulp-typescript'
import del from 'del'

let tsProject = ts.createProject('tsconfig.json')

function clean() {
    return del(['dist/**/*'])
}

function compileTs() {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(dest('dist'))
}

function copyResources() {
    return src('src/app/puzzles/inputs/**/*')
        .pipe(dest('dist/app/puzzles/inputs'))
}

exports.default = series(
    clean,
    parallel(
        compileTs,
        copyResources
    )
)
