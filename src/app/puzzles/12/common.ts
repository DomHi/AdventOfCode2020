import { match } from "assert"


interface Position {
    x: number,
    y: number
}

interface Direction {
    apply(position: Position, offset: number): Position,
    degrees: number
}

const NORTH: Direction = {
    degrees: 0,
    apply: (pos: Position, offset: number) => {
        return {
            x: pos.x,
            y: pos.y - offset
        }
    }
}

const EAST: Direction = {
    degrees: 90,
    apply: (pos: Position, offset: number) => {
        return {
            x: pos.x + offset,
            y: pos.y
        }
    }
}

const SOUTH: Direction = {
    degrees: 180,
    apply: (pos: Position, offset: number) => {
        return {
            x: pos.x,
            y: pos.y + offset
        }
    }
}

const WEST: Direction = {
    degrees: 270,
    apply: (pos: Position, offset: number) => {
        return {
            x: pos.x - offset,
            y: pos.y
        }
    }
}

/**
 * @see https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
 */
function modulo(x: number, y: number): number {
    return ((x % y) + y) % y
}

function getDirection(char: string): Direction | null {
    switch(char) {
        case 'N': return NORTH
        case 'E': return EAST
        case 'S': return SOUTH
        case 'W': return WEST
        default: return null
    }
}

function turn(degrees: number, current: Direction) {
    let newDegrees = modulo(current.degrees + degrees, 360)
    switch(newDegrees) {
        case 0: return NORTH
        case 90: return EAST
        case 180: return SOUTH
        case 270: return WEST
        default:
            throw 'Invalid direction: ' + newDegrees
    }
}

export function turnWaypoint(degrees: number, waypoint: Position): Position {
    let angle = (modulo(degrees, 360) * Math.PI) / 180 // convert to radian

    let sin = Math.sin(angle)
    let cos = Math.cos(angle)

    return {
        x: Math.round((waypoint.x * cos) - (waypoint.y * sin)),
        y: Math.round((waypoint.x * sin) + (waypoint.y * cos))
    }
}

const movePattern = /^([NSEWLRF])(\d+)$/

export class Journey {

    private pos: Position = {x:0, y:0}

    private direction: Direction = EAST

    public getDistance(): number {
        return Math.abs(this.pos.x) + Math.abs(this.pos.y)
    }

    public move(cmd: string): void {
        let match = cmd.match(movePattern)

        if (!match) {
            throw 'Invalid command: ' + cmd
        }

        let char = match[1]
        let val = Number.parseInt(match[2])

        let dir = getDirection(char)

        if (dir) {
            this.pos = dir.apply(this.pos, val)
            return
        }

        if (char === 'L') {
            this.direction = turn(-val, this.direction)
        } else if (char === 'R') {
            this.direction = turn(val, this.direction)
        } else if (char === 'F') {
            this.pos = this.direction.apply(this.pos, val)
        }
    }
}

export class Journey2 {

    private ship: Position = {x:0, y:0}
    private waypoint: Position = {x: 10, y: -1}

    public getDistance(): number {
        return Math.abs(this.ship.x) + Math.abs(this.ship.y)
    }

    public move(cmd: string): void {
        let match = cmd.match(movePattern)

        if (!match) {
            throw 'Invalid command: ' + cmd
        }

        let char = match[1]
        let val = Number.parseInt(match[2])

        let dir = getDirection(char)

        if (dir) {
            this.waypoint = dir.apply(this.waypoint, val)
            return
        }

        if (char === 'L') {
            this.waypoint = turnWaypoint(-val, this.waypoint)
        } else if (char === 'R') {
            this.waypoint = turnWaypoint(val, this.waypoint)
        } else if (char === 'F') {
            this.ship = this.applyWaypoint(val)
        }
    }

    private applyWaypoint(multiplier: number): Position {
        let newPos = {x: this.ship.x, y: this.ship.y}

        newPos = this.getXDirection(this.waypoint.x)
            .apply(newPos, Math.abs(this.waypoint.x) * multiplier)

        newPos = this.getYDirection(this.waypoint.y)
            .apply(newPos, Math.abs(this.waypoint.y) * multiplier)

        return newPos
    }

    private getXDirection(x: number): Direction {
        if (x >= 0) {
            return EAST
        } else {
            return WEST
        }
    }

    private getYDirection(y: number): Direction {
        if (y >= 0) {
            return SOUTH
        } else {
            return NORTH
        }
    }
}
