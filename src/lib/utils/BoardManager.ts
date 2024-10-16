import { boardWidth } from "../../store";
import { Cell } from "../models";

interface BoardmanagerConstructor {
    board: Cell[];
    torusEnabled: boolean;
    boardWidth: number;
    boardHeight: number
}

type Coordinates = { x: number, y: number };

export default class BoardManager {
    board: Cell[];
    torusEnabled: boolean;
    boardWidth: number;
    boardHeight: number;

    constructor({ board, torusEnabled, boardWidth, boardHeight }: BoardmanagerConstructor) {
        this.board = board;
        this.torusEnabled = torusEnabled;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
    }
    public async nextBoard(): Promise<Cell[]> {
        let newBoard = [];
        for (let i = 0; i < this.board.length; i++) {
            let newCell = new Cell();
            newCell.alive = this.checkNeighbours(i);
            newBoard.push(newCell);
        }
        return newBoard;
    }

    // Checks surrounding cells and return true if the cell should be alive
    // in the next state or not.
    private checkNeighbours(pos: number): boolean {
        const allNeighbours = this.getAllNeighbours(pos);
        const aliveNumber = allNeighbours.reduce((count, element) => count + (element.alive ? 1 : 0), 0);
        const cellAlive = this.board[pos].alive

        // Loneliness (An alive cell with less than two alive neighbours dies)
        if (cellAlive && aliveNumber < 2) {
            return false;
        }

        // All gucci (An alive cell with exactly 2 or 3 neighbours does not die) 
        if (cellAlive && (aliveNumber === 2 || aliveNumber === 3)) {
            return true;
        }

        // Bye (An alive cell with more than 3 neighbours dies from gentrification)
        if (cellAlive && aliveNumber > 3) {
            return false;
        }

        // Gentrification (A dead cell with 3 alive neighbours becomes a live cell)
        if (!cellAlive && aliveNumber === 3) {
            return true;
        }

        return cellAlive;
    }

    private getAllNeighbours(pos: number): Cell[] {
        let neighbours = [];
        let validNeighbourIndexes = [];
        let coords = this.getCellXY(pos);
        let neighbourCoords = [
            { x: coords.x - 1, y: coords.y - 1 },
            { x: coords.x, y: coords.y - 1 },
            { x: coords.x + 1, y: coords.y - 1 },
            { x: coords.x - 1, y: coords.y },
            { x: coords.x + 1, y: coords.y },
            { x: coords.x - 1, y: coords.y + 1 },
            { x: coords.x, y: coords.y + 1 },
            { x: coords.x + 1, y: coords.y + 1 },
        ];

        for (const neighbour of neighbourCoords) {
            if (
                this.torusEnabled ||
                neighbour.x >= 0 &&
                neighbour.y < this.boardHeight - 1 &&
                neighbour.y >= 0 &&
                neighbour.x < this.boardWidth - 1
            ) {
                if (this.torusEnabled) {
                    let coords = this.calculateTorus(neighbour);
                    validNeighbourIndexes.push(this.getCellIndex(coords.x, coords.y))
                } else {
                    validNeighbourIndexes.push(this.getCellIndex(neighbour.x, neighbour.y));
                }
            }
        }

        // Top right corner clockwise to bottom left corner
        for (const neighbour of validNeighbourIndexes) {
            neighbours.push(this.board[neighbour])
        }

        return neighbours;
    }

    private getCellXY(pos: number): Coordinates {
        const x = pos % this.boardWidth;
        const y = Math.floor(pos / this.boardWidth);
        return { x, y };
    }

    private getCellIndex(x: number, y: number): number {
        return y * (this.boardWidth) + x;
    }

    private calculateTorus({ x, y }: Coordinates): Coordinates {
        let coords = { x, y };

        if (x < 0) {
            coords.x = this.boardWidth - 1;
        }

        if (x >= this.boardWidth) {
            coords.x = 0;
        }

        if (y < 0) {
            coords.y = this.boardHeight - 1;
        }

        if (y >= this.boardHeight) {
            coords.y = 0;
        }
        return coords;
    }
}
