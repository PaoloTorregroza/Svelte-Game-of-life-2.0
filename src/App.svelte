<script lang="ts">
    import SettingsBar from "./lib/SettingsBar.svelte";
    import Board from "./lib/Board.svelte";
    import { Cell } from "./lib/models";
    import { board_height, board_width } from "./store";

    // Board state, reinitiated after changing board size.
    $: board = Array.from(
        { length: $board_width * $board_height },
        () => new Cell(),
    );

    // Generates a new array and updates the board state variable
    function randomBoard() {
        board = Array.from({ length: $board_height * $board_width }, () => {
            let cell = new Cell();
            cell.alive = Math.random() >= 0.75;
            return cell;
        });
    }

    function clearBoard() {
        board = Array.from(
            { length: $board_width * $board_height },
            () => new Cell(),
        );
    }
</script>

<main>
    <SettingsBar on:clearBoard={clearBoard} on:randomBoard={randomBoard} />
    <hr style="width: 100%;" />
    <Board {board} />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }
</style>
