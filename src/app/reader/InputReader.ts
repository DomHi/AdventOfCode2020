
import fs from 'fs'
import { Observable } from 'rxjs'
import readline from 'readline'

export class InputReader {

    public read(file: string): number[] {

        return fs.readFileSync(file, 'utf-8')
            .split('\n')
            .map(l => Number.parseInt(l))
    }

    public readLinesAsArray(file: string): Observable<string[]> {

        return new Observable((subscriber) => {

            let lines: string[] = []

            let rl = readline.createInterface({
                input: fs.createReadStream(file)
            })

            rl.on('line', (line) => {
                lines.push(line)
            })

            rl.on('close', () => {
                subscriber.next(lines)
                subscriber.complete()
            })
        })
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

    public readChunks(file: string, separator: RegExp): Observable<string> {

        return new Observable((subscriber) => {

            let currentChunk: string[] = []

            let rl = readline.createInterface({
                input: fs.createReadStream(file)
            })

            rl.on('line', (line) => {

                if (separator.test(line)) {
                    if (currentChunk.length === 0) {
                        subscriber.next(currentChunk.join('\n'))
                        currentChunk = []
                    }
                    return
                }

                currentChunk.push(line)
            })

            rl.on('close', () => {
                if (currentChunk.length !== 0) {
                    subscriber.next(currentChunk.join('\n'))
                }
                subscriber.complete()
            })
        })
    }
}
