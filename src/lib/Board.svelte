<script lang="ts">
    import { board_width, board_height, running } from "../store";
    import Cell from "./Cell.svelte";
    import { Cell as CellModel } from "./models";
    import { BoardManager } from "./utils/BoardManager";

    export let board: CellModel[] = [];

    const boardManager = new BoardManager(false);

    // Listen to changes on running store
    running.subscribe((val) => {
        if (val) {
            boardManager.nextBoard();
        } else {
            console.log("stop");
        }
    });

    function getIndex(row: number, cell: number): number {
        return row * $board_width + cell;
    }

    function switchState(event: CustomEvent) {
        const index = event.detail.index;
        let new_board = board;
        new_board[index].alive = !new_board[index].alive;
        board = new_board;
    }
</script>

<div class="board-container">
    {#each { length: $board_height } as _, row ("row-" + row)}
        <div class="board-row">
            {#each { length: $board_width } as _, cell ("cell-" + cell)}
                <Cell
                    on:switchState={switchState}
                    cell_index={getIndex(row, cell)}
                    cell={board[getIndex(row, cell)]}
                />
            {/each}
        </div>
    {/each}
</div>

<style>
    .board-row {
        display: flex;
        gap: 10;
    }
</style>
