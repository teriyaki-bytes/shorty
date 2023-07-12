function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export interface ShortcodeStore {
  url?: string
  shortCode?: string
}

export function generateShortcode(size: number): string {
    const numbers: number[] = [];
    for (let i = 0; i < size; i++) {
        const heads = (Math.floor(Math.random() * 2) == 0);
        const caps = randomIntFromInterval(65, 90);
        const lcase = randomIntFromInterval(97, 122)
        if (heads) {
            numbers.push(caps)
        } else {
            numbers.push(lcase)
        }
    }

    return String.fromCharCode(...numbers)

}
