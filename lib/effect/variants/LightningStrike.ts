import { Effect } from "@/lib/effect/Effect";
import { DamageDice } from "@/types/story";
import { Dice } from "@/utils/dice";
import { Character } from "../../Character";

export class LightningStrike extends Effect {
  damageDice: DamageDice;
  chance: number;
  descriptions: string[];

  constructor(damageDice: DamageDice) {
    const random = Math.random() * 0.4 + 0.3;
    super("Lightning Strike", 60, `After attack, there is a ${(random * 100).toFixed(2)}% chance to release lightning, causing ${damageDice.count}D${damageDice.sides} extra damage to the enemy.`);
    this.damageDice = damageDice;
    this.chance = random;
    this.descriptions = [
      `[${this.name}] Lightning strikes from the sky, hitting the enemy hard!`,
      `[${this.name}] Your weapon glows with electric light, releasing a powerful electric shock!`,
      `[${this.name}] A sudden electric shock hits the enemy, filling the air with a burning smell!`,
      `[${this.name}] The enemy is struck by lightning!`,
      `[${this.name}] Stunned by the sudden electric shock, the enemy is unable to react!`,
    ];
  }

  applyToDefender(context: { defender: Character; logs: string[] }) {
    if (Math.random() < this.chance) {
      const extraDamage = Dice.roll(this.damageDice.sides, this.damageDice.count);
      context.defender.health -= extraDamage;
      const log = this.descriptions[Math.floor(Math.random() * this.descriptions.length)];
      context.logs.push(`${log} (extra damage ${extraDamage})`);
    }
  }
}
