export class Dice {
  static roll(sides: number, count: number = 1): number {
    return Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1)
      .reduce((a, b) => a + b, 0);
  }
}
