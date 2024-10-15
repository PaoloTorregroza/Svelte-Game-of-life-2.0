import { writable } from 'svelte/store';

// Config stores
// TODO: Convert to single config object
export const boardWidth = writable(38);
export const boardHeight = writable(14);
export const aliveColor = writable("#CC3300");
export const deadColor = writable("#15172B");
export const torusEnabled = writable(false);

// Board state stores
export const running = writable(false);

