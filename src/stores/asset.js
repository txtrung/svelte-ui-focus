import { writable } from 'svelte/store';

export const asset = writable({
    color: '#565b6b',
    title: 'Press "Enter" to select an asset'
});