
import fs from 'fs'
import { Observable } from 'rxjs'
import readline from 'readline'

export class InputReader {

    public read(file: string): number[] {

        return fs.readFileSync(file, 'utf-8')
            .split('\n')
            .map(l => Number.parseInt(l))
    }

    public readLines(file: string): Observable<string> {

        return new Observable((subscriber) => {

            let rl = readline.createInterface({
                input: fs.createReadStream(file)
            })

            rl.on('line', (line) => {
                subscriber.next(line)
            })

            rl.on('close', () => {
                subscriber.complete()
            })
        })
    }
}
