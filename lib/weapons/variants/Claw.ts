import { Weapon } from "@/lib/weapons/Weapon";
import { DamageDice } from "@/types/story";
import { Dice } from "@/utils/dice";

export class Claw extends Weapon {
  constructor(damageDice: DamageDice) {
    super("Claw", damageDice, []);
  }

  rollDamage(): number {
    return Dice.roll(this.damageDice.sides, this.damageDice.count);
  }
}
