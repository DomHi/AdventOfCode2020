import Mocha from 'mocha'
import glob from 'glob'

function runTests() {

    let puzzle: string = process.argv[2]

    let mocha = new Mocha()

    let globPattern = __dirname + '/app/puzzles/'
        + (puzzle ? puzzle + '/' : '')
        + '**/*.spec.js'

    glob(globPattern, (err, files) => {
        files.forEach(
            f => mocha.addFile(f)
        )
        mocha.run()
    })
}

runTests()
