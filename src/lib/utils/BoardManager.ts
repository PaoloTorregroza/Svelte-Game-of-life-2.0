import type { Cell } from "../models";

export class BoardManager {
    torus: boolean;

    nextBoard(): Cell[] {
        console.log("test");
        return [];
    }

    private checkNeighbors(cell_index: number): boolean {
        return false;
    }

    constructor(torus: boolean) {
        this.torus = torus;
    }
}
