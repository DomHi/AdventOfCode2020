import { InputReader } from "./reader/InputReader";



export class App {

    public run(): void {

        let numbers: number[] = new InputReader().read(process.argv[2])

        for(let i: number = 0; i < numbers.length; i++) {

            for(let j: number = i + 1; j < numbers.length; j++) {

                for(let k: number = j + 1; k < numbers.length; k++) {
                    if(numbers[i] + numbers[j] + numbers[k] === 2020) {
                        console.log('result: ' + (numbers[i] * numbers[j] * numbers[k]))
                        return
                    }
                }
            }
        }
    }
}
