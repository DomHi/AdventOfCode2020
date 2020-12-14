
const empty: string = 'L'
const occupied: string = '#'
const floor: string = '.'

export class SeatLayout {

    constructor(
        public seats: string[][]
    ) {}

    public equals(other: SeatLayout): boolean {
        if (this.seats.length !== other.seats.length) {
            return false
        }

        for (let i = 0; i < this.seats.length; i++) {
            let mySeats = this.seats[i]
            let otherSeats = other.seats[i]

            if (mySeats.length !== otherSeats.length) {
                return false
            }

            for (let j = 0; j < mySeats.length; j++) {
                if (mySeats[j] !== otherSeats[j]) {
                    return false
                }
            }
        }

        return true
    }

    public getOccupied(): number {
        let acc = 0
        for (let i = 0; i < this.seats.length; i++) {
            for (let j = 0; j < this.seats[i].length; j++) {
                if (this.seats[i][j] === occupied) {
                    acc += 1
                }
            }
        }
        return acc
    }

    public applyRules(puzzle2: boolean = false): SeatLayout {

        let newSeats: string[][] = []

        for (let i = 0; i < this.seats.length; i++) {
            newSeats[i] = []
            for (let j = 0; j < this.seats[i].length; j++) {
                let seat = this.seats[i][j]
                if (seat === floor) {
                    newSeats[i][j] = floor
                    continue
                }
                let adj = puzzle2 ? this.countAdjacent2(i,j) : this.countAdjacent1(i,j)
                if (seat === empty && adj === 0) {
                    newSeats[i][j] = occupied
                } else if (seat === occupied && adj > (puzzle2 ? 4 : 3)) {
                    newSeats[i][j] = empty
                } else {
                    newSeats[i][j] = seat
                }
            }
        }

        return new SeatLayout(newSeats)
    }

    private countAdjacent1(x: number, y: number): number {
        let acc = this.getAcc(x - 1, y - 1)
        acc += this.getAcc(x - 1, y)
        acc += this.getAcc(x - 1, y + 1)
        acc += this.getAcc(x, y - 1)
        acc += this.getAcc(x, y + 1)
        acc += this.getAcc(x + 1, y - 1)
        acc += this.getAcc(x + 1, y)
        acc += this.getAcc(x + 1, y + 1)
        return acc
    }

    private countAdjacent2(x: number, y: number): number {
        let acc = this.getAcc2(x, y, -1, -1)
        acc += this.getAcc2(x , y, -1, 0)
        acc += this.getAcc2(x , y, -1, 1)
        acc += this.getAcc2(x, y, 0, -1)
        acc += this.getAcc2(x, y, 0, 1)
        acc += this.getAcc2(x , y, 1, -1)
        acc += this.getAcc2(x, y, 1, 0)
        acc += this.getAcc2(x , y, 1, 1)
        return acc
    }

    private getAcc(x: number, y: number): number {
        if (x < 0 || x >= this.seats.length || y < 0 || y >= this.seats[x].length) {
            return 0
        }
        return this.seats[x][y] === occupied ? 1 : 0
    }

    private getAcc2(x: number, y: number, offsetX: number, offsetY: number): number {
        let i = x + offsetX
        let j = y + offsetY

        while (i >= 0 && i < this.seats.length && j >= 0 && j < this.seats[x].length) {
            if (this.seats[i][j] !== floor) {
                break
            }
            i += offsetX
            j += offsetY
        }

        if (i < 0 || i >= this.seats.length || j < 0 || j >= this.seats[x].length) {
            return 0
        }
        return this.seats[i][j] === occupied ? 1 : 0
    }

    public print(): void {
        for (let i = 0; i < this.seats.length; i++) {
            console.log('' + this.seats[i].join(''))
        }
    }
}
