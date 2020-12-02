import { PuzzleRunner } from "../../common";
import { InputReader } from "../../reader/InputReader";

class App implements PuzzleRunner {

    public run(input: string): void {

        let numbers: number[] = new InputReader().read(input)

        for(let i: number = 0; i < numbers.length; i++) {

            for(let j: number = i + 1; j < numbers.length; j++) {

                if(numbers[i] + numbers[j] === 2020) {
                    console.log('result: ' + (numbers[i] * numbers[j]))
                    return
                }
            }
        }
    }
}

export default new App()
