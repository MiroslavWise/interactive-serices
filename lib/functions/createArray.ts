export function createArray(length: number): boolean[] {
        const fill = []
        for (let i = 0; i < 5; i++) {
                if (i <= length - 1) {
                        fill.push(true);
                } else {
                        fill.push(false)
                }
        }
        return fill;
}