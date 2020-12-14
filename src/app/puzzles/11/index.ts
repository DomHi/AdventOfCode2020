import { PuzzleRunner } from "../../common";
import { InputReader } from "../../reader/InputReader";
import { SeatLayout } from "./common";

class App implements PuzzleRunner {

    run(input: string): void {

        let reader = new InputReader()

        reader.readLinesAsArray(input)
            .subscribe(
                lines => {
                    let seats: string[][] = []
                    lines.forEach(
                        l => seats.push(l.split(''))
                    )
                    this.findResult(new SeatLayout(seats))
                    this.findResult2(new SeatLayout(seats))
                }
            )
    }

    private findResult(initial: SeatLayout) {

        let currentLayout: SeatLayout = initial
        let nextLayout: SeatLayout = initial.applyRules()

        while (!currentLayout.equals(nextLayout)) {
            currentLayout = nextLayout
            nextLayout = nextLayout.applyRules()
        }

        console.log('Result1: ' + currentLayout.getOccupied())
    }

    private findResult2(initial: SeatLayout) {

        let currentLayout: SeatLayout = initial
        let nextLayout: SeatLayout = initial.applyRules(true)

        while (!currentLayout.equals(nextLayout)) {
            currentLayout = nextLayout
            nextLayout = nextLayout.applyRules(true)
        }

        console.log('Result2: ' + currentLayout.getOccupied())
    }
}

export default new App()
