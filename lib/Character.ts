import { StatusEffect } from "./StatusEffect";
import { addLog } from "./logger";

export class Character {
  name: string;
  health: number;
  attackBonus: number;
  armorClass: number;
  damageDice: { sides: number; count: number };
  statusEffects: StatusEffect[] = [];
  isStunned: boolean = false;

  constructor(name: string, health: number, attackBonus: number, armorClass: number, damageDice: { sides: number; count: number }) {
    this.name = name;
    this.health = health;
    this.attackBonus = attackBonus;
    this.armorClass = armorClass;
    this.damageDice = damageDice;
  }

  isAlive() {
    return this.health > 0;
  }

  addEffect(effect: StatusEffect) {
    this.statusEffects.push(effect);
  }

  removeEffect(effect: StatusEffect) {
    this.statusEffects = this.statusEffects.filter((s) => s !== effect);
  }

  processStatusEffects() {
    const effectsToProcess = [...this.statusEffects];
    effectsToProcess.forEach((effect) => {
      effect.duration--;
      if (effect.duration <= 0) {
        this.removeEffect(effect);
        effect.remove(this);
        addLog(`${effect.name} effect on ${this.name} has worn off`);
      }
    });
  }

  clone(): Character {
    const cloned = new Character(
      this.name,
      this.health,
      this.attackBonus,
      this.armorClass,
      {...this.damageDice}
    );
    cloned.isStunned = this.isStunned;
    cloned.statusEffects = [...this.statusEffects];
    return cloned;
  }
}
