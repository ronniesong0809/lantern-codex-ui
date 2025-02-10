import { Effect } from "@/lib/effect/Effect";
import { DamageDice } from "@/types/story";
import { Character } from "../Character";
import { Dice } from "@/utils/dice";
import { addLog } from "../logger";

export abstract class Weapon {
  name: string;
  damageDice: DamageDice;
  // description: string;
  effects: Effect[];

  constructor(name: string, damageDice: DamageDice, effects: Effect[]) {
    this.name = name;
    this.damageDice = damageDice;
    // this.description = description;
    this.effects = effects;
  }

  abstract rollDamage(): number;

  applyEffects(character: Character, defender: Character) {
    let logs: string[] = [];

    const contextSelf = { character, logs };
    const contextDefender = { defender, logs };
    const contextBoth = { character, defender, logs };

    this.effects.sort((a, b) => a.priority - b.priority).forEach((effect) => {
      if (effect.applyToSelf) effect.applyToSelf(contextSelf);
      if (effect.applyToDefender) effect.applyToDefender(contextDefender);
      if (effect.applyToBoth) effect.applyToBoth(contextBoth);
    });

    logs.forEach((log) => addLog(log));
  }
}
