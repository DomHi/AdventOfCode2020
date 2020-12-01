
import fs from 'fs'

export class InputReader {

    public read(file: string): number[] {

        return fs.readFileSync(file, 'utf-8')
            .split('\n')
            .map(l => Number.parseInt(l))
    }
}
