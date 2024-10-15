import { writable } from 'svelte/store';

// Config stores
// TODO: Convert to single config object
export const board_width = writable(38);
export const board_height = writable(14);
export const alive_color = writable("#CC3300");
export const dead_color = writable("#15172B");
export const torus_enabled = writable(false);

// Board state stores
export const running = writable(false);

