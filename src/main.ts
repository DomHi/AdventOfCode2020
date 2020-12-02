
function usage(): void {
    console.log('Usage: npm run start <puzzleID> <inputFile>')
}

function main(): void {

    let puzzle: string = process.argv[2]
    let input: string = process.argv[3]

    if (!puzzle || !input) {
        console.log('Not enough arguments.')
        usage()
        return
    }

    import('./app/puzzles/' + puzzle).then( puzzle => {
        puzzle.default.run(input)
    })
}

main()
