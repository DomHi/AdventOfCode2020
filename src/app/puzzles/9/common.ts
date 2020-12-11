
export class Xmas {

    private sequence: number[] = []

    constructor(
        public preambleSize: number
    ) {}

    /**
     * @returns true if result was found
     */
    public next(value: number): boolean {
        if (this.sequence.length < this.preambleSize) {
            this.sequence.push(value)
            return false
        }

        if (this.isValid(value)) {
            this.sequence.shift()
            this.sequence.push(value)
            return false
        }

        return true
    }

    private isValid(value: number): boolean {
        for (let i = 0; i < this.sequence.length - 1; i++) {
            for (let j = i; j < this.sequence.length; j++) {
                if ((this.sequence[i] + this.sequence[j]) === value) {
                    return true
                }
            }
        }
        return false
    }
}
