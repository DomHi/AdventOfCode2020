import { PuzzleRunner } from "../../common";
import { InputReader } from "../../reader/InputReader";
import { Journey, Journey2 } from "./common";

class App implements PuzzleRunner {

    run(input: string): void {

        let reader = new InputReader()

        let journey1 = new Journey()
        let journey2 = new Journey2()

        reader.readLines(input)
            .subscribe({
                next: (line) => {
                    journey1.move(line)
                    journey2.move(line)
                },
                error: (err) => {
                    console.log('Error during journey: ' + err)
                },
                complete: () => {
                    console.log('Result1: ' + journey1.getDistance())
                    console.log('Result2: ' + journey2.getDistance())
                }
            })
    }

}

export default new App()
