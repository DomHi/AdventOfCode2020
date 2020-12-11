import { map } from "rxjs/operators";
import { PuzzleRunner } from "../../common";
import { InputReader } from "../../reader/InputReader";
import { Xmas } from "./common";

class App implements PuzzleRunner {

    run(input: string): void {

        let reader = new InputReader()

        reader.readLinesAsArray(input)
            .subscribe(
                lines => {

                    let numbers = lines.map(l => Number.parseInt(l))

                    let invalidNumber = this.findInvalid(numbers)

                    console.log('Result1: ' + invalidNumber)

                    if (invalidNumber === -1) {
                        console.log('This should not have happened')
                        return
                    }

                    this.printSecondResult(numbers, invalidNumber)
                }
            )
    }

    private findInvalid(numbers: number[]): number {

        let xmas = new Xmas(25)

        for (let index in numbers) {
            if (xmas.next(numbers[index])) {
                return numbers[index]
            }
        }

        return -1
    }

    private printSecondResult(numbers: number[], invalidValue: number): void {

        let sum = 0
        let sequence: number[] = []

        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i]
            sequence.push(numbers[i])
            while (sum > invalidValue && sequence.length > 0) {
                sum -= sequence.shift()
            }

            if (sum === invalidValue) {
                console.log('Result2: ' + (Math.min(...sequence) + Math.max(...sequence)))
                return
            }
        }
    }
}

export default new App()
