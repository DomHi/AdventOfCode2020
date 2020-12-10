
export class OperationResult {
    constructor(
        public acc: number,
        public offset: number
    ) {}
}

interface Operation {
    apply(acc: number): OperationResult
}

class Nop implements Operation {
    apply(acc: number): OperationResult {
        return new OperationResult(acc, 1)
    }
}

class Acc implements Operation {

    constructor(
        private value: number
    ) {}

    apply(acc: number): OperationResult {
        return new OperationResult(acc + this.value, 1)
    }
}

class Jmp implements Operation {

    constructor(
        private value: number
    ) {}

    apply(acc: number): OperationResult {
        return new OperationResult(acc, this.value)
    }
}

function getOperation(name: string, value: number): Operation {
    switch(name) {
        case 'nop': return new Nop()
        case 'acc': return new Acc(value)
        case 'jmp': return new Jmp(value)
        default:
            throw 'Unknown Operation ' + name
    }
}

function getInvertedOperation(name: string, value: number): Operation {
    switch(name) {
        case 'nop': return new Jmp(value)
        case 'acc': return new Acc(value)
        case 'jmp': return new Nop()
        default:
            throw 'Unknown Operation ' + name
    }
}

const opRegEx = /^(\w+) ([+-]\d+)$/

export function parseOperationString(line: string, invert: boolean = false): Operation {

    let matcher = line.match(opRegEx)

    if (!matcher) {
        throw 'Could not read line as Operation: ' + line
    }

    let operation = matcher[1]
    let opValue = Number.parseInt(matcher[2])

    return invert ? getInvertedOperation(operation, opValue) : getOperation(operation, opValue)
}
