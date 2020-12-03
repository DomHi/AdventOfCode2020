import { homedir } from "os";
import { reduce } from "rxjs/operators";
import { PuzzleRunner } from "../../common";
import { InputReader } from "../../reader/InputReader";

class Position {

    constructor(
        public x: number,
        public y: number
    ) {}

    public toString(): string {
        return '{x:' + this.x + ',y:' + this.y + '}'
    }
}

interface Move {
    x: number
    y: number
}

class Board {

    private pos: Position = {x: 0, y: 0}
    public board: string[][] = []

    public addToBoard(line: string) {
        this.board.push(line.split(''))
    }

    public move(m: Move): string {
        this.pos = new Position(
            this.pos.x + m.x,
            this.pos.y + m.y
        )

        if (this.pos.y >= this.board.length) {
            return null
        }

        let my_x: number = this.pos.x % this.board[0].length

        return this.board[this.pos.y][my_x]
    }
}

class App implements PuzzleRunner {

    run(input: string): void {

        let reader: InputReader = new InputReader()

        reader.readLines(input)
            .pipe(
                reduce((acc, value, index) => {
                    acc.addToBoard(value)
                    return acc
                },
                    new Board()
                )
            ).subscribe(
                board => this.walkBoard(board)
            )
    }

    private walkBoard(board: Board): void {

        let acc: number = 0

        let char: string
        while(char = board.move({x: 3, y: 1})) {
            if (char === '#') {
                acc++
            }
        }

        console.log('Result: ' + acc)
    }
}

export default new App()
