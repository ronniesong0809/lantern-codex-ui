import { Weapon } from "@/lib/weapons/Weapon";
import { Dice } from "@/utils/dice";
import { DamageDice } from "@/types/story";
import { EffectManager } from "../../effect/EffectManager";

export class Axe extends Weapon {
  constructor(damageDice: DamageDice) {
    const effects = [EffectManager.lightningStrike({ count: 1, sides: 3 })];
    super(`${effects.map((e) => e.name).join(", ")} Axe`, damageDice, effects);
  }

  rollDamage(): number {
    return Dice.roll(this.damageDice.sides, this.damageDice.count);
  }
}
