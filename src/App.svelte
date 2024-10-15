<script lang="ts">
    import SettingsBar from "./lib/SettingsBar.svelte";
    import Board from "./lib/Board.svelte";
    import { Cell } from "./lib/models";
    import { boardHeight, boardWidth, running, torusEnabled } from "./store";
    import BoardManager from "./lib/utils/BoardManager";

    // Board state, reinitiated after changing board size.
    $: board = Array.from(
        { length: $boardWidth * $boardHeight },
        () => new Cell(),
    );

    let interval = 0; // setInterval returns an id (number)
    //Subscribe to running
    running.subscribe((val) => {
        if (val && board != null) {
            interval = setInterval(updateBoard, 200);
        } else {
            clearInterval(interval);
        }
    });

    // Generates a new array and updates the board state variable
    function randomBoard() {
        board = Array.from({ length: $boardHeight * $boardWidth }, () => {
            let cell = new Cell();
            cell.alive = Math.random() >= 0.75;
            return cell;
        });
    }

    function clearBoard() {
        board = Array.from(
            { length: $boardWidth * $boardHeight },
            () => new Cell(),
        );
    }

    async function updateBoard() {
        const manager = new BoardManager({
            board,
            torusEnabled: $torusEnabled,
            boardWidth: $boardWidth,
            boardHeight: $boardHeight,
        });
        board = await manager.nextBoard();
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
