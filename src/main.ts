
function usage(): void {
    console.log('Usage: npm run start <puzzleID>')
}

function main(): void {

    let puzzle: string = process.argv[2]

    if (!puzzle) {
        console.log('Not enough arguments.')
        usage()
        return
    }

    let input: string = __dirname + '/app/puzzles/inputs/' + puzzle.split('-')[0] + '/puzzleInput'

    import('./app/puzzles/' + puzzle).then( puzzle => {
        puzzle.default.run(input)
    })
}

main()
