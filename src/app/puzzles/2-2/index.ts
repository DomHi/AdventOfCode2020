import { PuzzleRunner } from "../../common";
import { InputReader } from "../../reader/InputReader";
import { filter, map, reduce } from 'rxjs/operators'

class PolicyAndPassword {

    constructor(
        public first: number,
        public second: number,
        public char: string,
        public passwd: string)
    {}
}

class App implements PuzzleRunner {

    public run(input: string): void {

        let regex: RegExp = /^(\d+)-(\d+) (\w): (\w+)$/

        let reader: InputReader = new InputReader()

        reader.readLines(input)
            .pipe(
                map(line => regex.exec(line)),
                map(match => new PolicyAndPassword(
                    Number.parseInt(match[1]),
                    Number.parseInt(match[2]),
                    match[3],
                    match[4]
                )),
                filter(PaP => this.test(PaP)),
                reduce((acc) => acc + 1, 0)
            )
            .subscribe(
                result => console.log('Result: ' + result)
            )
    }

    private test(input: PolicyAndPassword): boolean {

        let first: boolean = input.passwd.charAt(input.first - 1) === input.char
        let second: boolean = input.passwd.charAt(input.second - 1) === input.char

        return first ? !second : second
    }
}

export default new App()
