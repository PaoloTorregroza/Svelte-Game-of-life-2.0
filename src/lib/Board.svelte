<script lang="ts">
    import { boardWidth, boardHeight, running } from "../store";
    import Cell from "./Cell.svelte";
    import { Cell as CellModel } from "./models";

    export let board: CellModel[] = [];

    function getIndex(row: number, cell: number): number {
        return row * $boardWidth + cell;
    }

    function switchState(event: CustomEvent) {
        const index = event.detail.index;
        let new_board = board;
        new_board[index].alive = !new_board[index].alive;
        board = new_board;
    }
</script>

<div class="board-container">
    {#each { length: $boardHeight } as _, row ("row-" + row)}
        <div class="board-row">
            {#each { length: $boardWidth } as _, cell ("cell-" + cell)}
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
