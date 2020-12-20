import Mocha from 'mocha'
import glob from 'glob'

function usage(): void {
    console.log('Usage: npm run test <puzzleID>')
}

function runTests() {

    let puzzle: string = process.argv[2]

    if (!puzzle) {
        console.log('Not enough arguments.')
        usage()
        return
    }

    let mocha = new Mocha()

    glob(__dirname + '/app/puzzles/' + puzzle + '/**/*.spec.js', (err, files) => {
        files.forEach(
            f => mocha.addFile(f)
        )
        mocha.run()
    })
}

runTests()
