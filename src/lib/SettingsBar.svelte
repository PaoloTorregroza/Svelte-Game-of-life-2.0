<!--
    I want to be able to configre the size of the board, the color of the cells,
    enable and disable torus board, start, stop, generate a random board, and 
    clear a board.
-->
<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {
        running,
        torusEnabled,
        boardWidth,
        boardHeight,
        aliveColor,
        deadColor,
    } from "../store";

    const dispatch = createEventDispatcher();

    let width = $boardWidth;
    let height = $boardHeight;

    // Width and height is limted to 101 to prevent bad performance.
    function updateWidth(event: { currentTarget: HTMLInputElement }) {
        const value = (event.currentTarget as HTMLInputElement).value;
        let event_value = parseInt(value) || 0;
        let val = event_value > 101 ? 101 : event_value;
        boardWidth.set(val);
        width = val;
    }

    function updateHeight(event: { currentTarget: HTMLInputElement }) {
        const value = (event.currentTarget as HTMLInputElement).value;
        let event_value = parseInt(value) || 0;
        let val = event_value > 101 ? 101 : event_value;
        boardHeight.set(val);
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
        <input class="settings-input" bind:value={$deadColor} type="color" />
    </div>
    <div class="settings-element">
        <p class="settings-label">Cell alive color:</p>
        <input class="settings-input" bind:value={$aliveColor} type="color" />
    </div>
    <div class="settings-element">
        <p class="settings-label">Torus enabled:</p>
        <input
            class="settings-input"
            bind:value={$torusEnabled}
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
    <button class="controll-button"
        ><a
            target="_blank"
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            >How to play</a
        ></button
    >
</div>

<style>
    .settings {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
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
