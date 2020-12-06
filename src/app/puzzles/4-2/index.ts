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
        return this.checkByr() &&
            this.checkIyr() &&
            this.checkEyr() &&
            this.checkHgt() &&
            this.checkHcl() &&
            this.checkEcl() &&
            this.checkPid()
    }

    private checkByr(): boolean {
        try {
            let num = Number.parseInt(this.byr)
            return num >= 1920 && num <= 2002
        } catch(err) {
            return false
        }
    }

    private checkIyr(): boolean {
        try {
            let num = Number.parseInt(this.iyr)
            return num >= 2010 && num <= 2020
        } catch(err) {
            return false
        }
    }

    private checkEyr(): boolean {
        try {
            let num = Number.parseInt(this.eyr)
            return num >= 2020 && num <= 2030
        } catch(err) {
            return false
        }
    }

    private checkHgt(): boolean {
        if(!this.hgt) {
            return false
        }
        let groups = this.hgt.match(/^(\d{2,3})(cm|in)$/)
        if(!groups) {
            return false
        }
        let num = Number.parseInt(groups[1])
        if(groups[2] === 'cm') {
            return num >= 150 && num <= 193
        } else if(groups[2] === 'in') {
            return num >= 59 && num <= 76
        }
        return false
    }

    private checkHcl(): boolean {
        return this.hcl !== null
            && this.hcl.match(/^#[a-f0-9]{6}$/) !== null
    }

    private checkEcl(): boolean {
        return this.ecl !== null &&
        [
            'amb',
            'blu',
            'brn',
            'gry',
            'grn',
            'hzl',
            'oth'
        ].find(val => val === this.ecl) !== undefined
    }

    private checkPid(): boolean {
        return this.pid !== null
            && this.pid.match(/^\d{9}$/) !== null
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

        if(currentPassport !== null) {
            passports.push(currentPassport)
        }

        return passports
    }
}

export default new App()
