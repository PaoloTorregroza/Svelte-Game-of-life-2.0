<!--
    I want to be able to configre the size of the board, the color of the cells,
    enable and disable torus board, start, stop, generate a random board, and 
    clear a board.
-->
<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {
        running,
        torus_enabled,
        board_width,
        board_height,
        alive_color,
        dead_color,
    } from "../store";

    const dispatch = createEventDispatcher();

    let width = $board_width;
    let height = $board_height;

    // Width and height is limted to 101 to prevent bad performance.
    function updateWidth(event: { currentTarget: HTMLInputElement }) {
        const value = (event.currentTarget as HTMLInputElement).value;
        let event_value = parseInt(value) || 0;
        let val = event_value > 101 ? 101 : event_value;
        board_width.set(val);
        width = val;
    }

    function updateHeight(event: { currentTarget: HTMLInputElement }) {
        const value = (event.currentTarget as HTMLInputElement).value;
        let event_value = parseInt(value) || 0;
        let val = event_value > 101 ? 101 : event_value;
        board_height.set(val);
        height = val;
    }
</script>

<h1>Game of life</h1>
<div class="settings">
    <div class="settings-element">
        <p class="settings-label">Board size:</p>
        <input
            class="settings-input"
            placeholder="0"
            type="number"
            max="101"
            bind:value={width}
            on:input={updateWidth}
        />
        <p>X</p>
        <input
            class="settings-input"
            placeholder="0"
            type="number"
            max="101"
            bind:value={height}
            on:input={updateHeight}
        />
    </div>
    <div class="settings-element">
        <p class="settings-label">Cell dead color:</p>
        <input class="settings-input" bind:value={$dead_color} type="color" />
    </div>
    <div class="settings-element">
        <p class="settings-label">Cell alive color:</p>
        <input class="settings-input" bind:value={$alive_color} type="color" />
    </div>
    <div class="settings-element">
        <p class="settings-label">Torus enabled:</p>
        <input
            class="settings-input"
            bind:value={$torus_enabled}
            type="checkbox"
        />
    </div>
    <button on:click={() => dispatch("randomBoard")}>Random board</button>
    <button on:click={() => dispatch("clearBoard")}>Clear board</button>
    <button
        disabled={$running}
        on:click={() => running.set(true)}
        class="controll-button"
    >
        Start
    </button>
    <button
        disabled={!$running}
        on:click={() => running.set(false)}
        class="controll-button"
    >
        Pause
    </button>
</div>

<style>
    .settings {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .settings-element {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .controll-button:enabled {
        color: black;
        background-color: #72b235;
    }
</style>
