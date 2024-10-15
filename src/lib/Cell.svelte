<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { alive_color, dead_color } from "../store";
    import { Cell } from "./models";

    export let cell: Cell;
    export let cell_index: number;

    const dispatch = createEventDispatcher();

    function switchState() {
        dispatch("switchState", { index: cell_index });
    }
</script>

<button
    on:click={switchState}
    class="cell"
    style={cell.alive
        ? "background-color: " + $alive_color
        : "background-color: " + $dead_color}
>
</button>

<style>
    .cell {
        border-radius: 0px;
        border: 1px dotted gray;
        width: 40px;
        height: 40px;
        min-width: 0;
        min-height: 0;
        padding: 0;
        margin: 0;
        background: none;
        display: inline-block;
        box-sizing: border-box;
    }
</style>
