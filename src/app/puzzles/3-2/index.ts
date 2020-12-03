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

    public resetPosition(): Board {
        this.pos = {x: 0, y: 0}
        return this
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
                board => this.checkSlopes(board)
            )
    }

    private checkSlopes(board: Board): void {

        let acc: number =
            this.walkBoard(board.resetPosition(), {x: 1, y: 1}) *
            this.walkBoard(board.resetPosition(), {x: 3, y: 1}) *
            this.walkBoard(board.resetPosition(), {x: 5, y: 1}) *
            this.walkBoard(board.resetPosition(), {x: 7, y: 1}) *
            this.walkBoard(board.resetPosition(), {x: 1, y: 2})

        console.log('Result: ' + acc)
    }

    private walkBoard(board: Board, move: Move): number {
        let acc: number = 0

        let char: string
        while(char = board.move(move)) {
            if (char === '#') {
                acc++
            }
        }

        return acc
    }
}

export default new App()
