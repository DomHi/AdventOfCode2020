import { withLatestFrom } from "rxjs/operators";
import { PuzzleRunner } from "../../common";
import { InputReader } from "../../reader/InputReader";
import { parseOperationString } from "./common";

class App implements PuzzleRunner {

    run(input: string): void {

        console.log('run()')

        let reader = new InputReader()

        reader.readLinesAsArray(input)
            .subscribe(
                lines => {
                    this.walkOperations1(lines)
                    this.walkOperations2(lines)
                }
            )
    }

    walkOperations1(lines: string[]): void {

        let acc = 0
        let pos = 0

        let visited: boolean[] = []

        while (true) {
            if (!visited[pos]) {
                visited[pos] = true
            } else {
                console.log('Result1: ' + acc)
                break
            }

            let result = parseOperationString(lines[pos]).apply(acc)

            acc = result.acc
            pos += result.offset
        }
    }

    walkOperations2(lines: string[]): void {

        for (let i = 0; i < lines.length; i++) {
            if (!lines[i].match(/nop|jmp/)) {
                continue
            }

            let result = this.findResultIfTerminating(lines, i)

            if (result !== -1) {
                console.log('Result2: ' + result)
            }
        }
    }

    findResultIfTerminating(lines: string[], invertIndex: number): number {

        let acc = 0
        let pos = 0

        let visited: boolean[] = []

        while (true) {
            if (pos === lines.length) {
                return acc
            } else if (pos > lines.length) {
                throw 'What was that?'
            } else if (!visited[pos]) {
                visited[pos] = true
            } else {
                return -1
            }

            let result = parseOperationString(lines[pos], pos === invertIndex).apply(acc)

            acc = result.acc
            pos += result.offset
        }
    }
}

export default new App()
