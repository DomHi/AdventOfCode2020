import * as assert from "assert";
import { turnWaypoint } from "./common";

describe('Puzzle 12', () => {

    describe('turn waypoint', () => {

        it ('turn by 0 degrees should not have any effect', () => {
            let waypoint = turnWaypoint(0, {x: 5, y: 7})
            assert.strictEqual(waypoint.x, 5)
            assert.strictEqual(waypoint.y, 7)
        })

        it ('turn by 90 degrees', () => {
            let waypoint = turnWaypoint(90, {x: 5, y: 7})
            assert.strictEqual(waypoint.x, -7)
            assert.strictEqual(waypoint.y, 5)
        })

        it ('turn by 180 degrees', () => {
            let waypoint = turnWaypoint(180, {x: 5, y: 7})
            assert.strictEqual(waypoint.x, -5)
            assert.strictEqual(waypoint.y, -7)
        })

        it ('turn by -90 degrees', () => {
            let waypoint = turnWaypoint(-90, {x: 5, y: 7})
            assert.strictEqual(waypoint.x, 7)
            assert.strictEqual(waypoint.y, -5)
        })
    });
});
