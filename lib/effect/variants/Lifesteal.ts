import { Effect } from "@/lib/effect/Effect";
import { DamageDice } from "@/types/story";
import { Dice } from "@/utils/dice";

export class Lifesteal extends Effect {
  damageDice: DamageDice;
  descriptions: string[];

  constructor(damageDice: DamageDice) {
    super("Lifesteal", 95, `After attack, there is a chance to absorb enemy's life. ${damageDice.count}D${damageDice.sides} damage will be absorbed.`);
    this.damageDice = damageDice;
    this.descriptions = [
      `[${this.name}] You feel the enemy's life flowing into your body!`,
      `[${this.name}] Your weapon absorbs the enemy's blood!`,
      `[${this.name}] You absorb part of the enemy's life force!`
    ];
  }

  applyToSelf(context: { character: any; logs: string[] }) {
    const value = Dice.roll(this.damageDice.sides, this.damageDice.count);
    context.character.hp += value;
    const log = this.descriptions[Math.floor(Math.random() * this.descriptions.length)];
    context.logs.push(`${log} (recover ${value} hp)`);
  }
}
