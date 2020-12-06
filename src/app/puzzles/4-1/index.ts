import { reduce } from "rxjs/operators";
import { PuzzleRunner } from "../../common";
import { InputReader } from "../../reader/InputReader";

class Passport {
    byr: string | null = null
    iyr: string | null = null
    eyr: string | null = null
    hgt: string | null = null
    hcl: string | null = null
    ecl: string | null = null
    pid: string | null = null
    cid: string | null = null

    public isValid(): boolean {
        return this.byr !== null &&
            this.iyr !== null &&
            this.eyr !== null &&
            this.hgt !== null &&
            this.hcl !== null &&
            this.ecl !== null &&
            this.pid !== null
    }

    public toString(): string {
        return '{byr:' + this.byr
            + ',iyr=' + this.iyr
            + ',eyr=' + this.eyr
            + ',hgt=' + this.hgt
            + ',hcl=' + this.hcl
            + ',ecl=' + this.ecl
            + ',pid=' + this.pid
            + ',cid=' + this.cid
            + '}'
    }
}

class App implements PuzzleRunner {

    run(input: string): void {
        let reader = new InputReader()

        let stuff: string[][] = []

        reader.readLines(input)
            .pipe(
                reduce((acc, val) => {
                    acc.push(val.split(' '))
                    return acc
                }, stuff)
            ).subscribe(
                val => {
                    let result = this.transform(val)
                        .filter(p => p.isValid())
                        .length

                    console.log('Result: ' + result)
                }
            )
    }

    private transform(input: string[][]): Passport[] {

        let passports: Passport[] = []

        let currentPassport: Passport = null
        for(let i = 0; i < input.length; i++) {
            let line = input[i]
            if (line.length === 0 || (line.length === 1 && line[0] === '')) {
                if (currentPassport !== null) {
                    passports.push(currentPassport)
                    currentPassport = null
                }
                continue
            }

            if(currentPassport === null) {
                currentPassport = new Passport()
            }

            for(let i = 0; i < line.length; i++) {
                let par = line[i].split(':')
                Object.defineProperty(currentPassport, par[0], {
                    value: par[1]
                })
            }
        }

        if (currentPassport !== null) {
            passports.push(currentPassport)
        }

        return passports
    }
}

export default new App()
