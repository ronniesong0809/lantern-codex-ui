import { StatusEffect } from "./StatusEffect";
import { addLog } from "./logger";
import { Weapon } from "./weapons/Weapon";

export class Character {
  name: string;
  level: number;
  health: number;
  attackBonus: number;
  armorClass: number;
  weapon: Weapon;
  statusEffects: StatusEffect[] = [];
  isStunned: boolean = false;

  constructor(name: string, level: number, health: number, attackBonus: number, weapon: Weapon, armorClass: number) {
    this.name = name;
    this.level = level;
    this.health = health;
    this.attackBonus = attackBonus;
    this.weapon = weapon;
    this.armorClass = armorClass;
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
      this.level,
      this.health,
      this.attackBonus,
      this.weapon,
      this.armorClass,
    );
    cloned.isStunned = this.isStunned;
    cloned.statusEffects = [...this.statusEffects];
    return cloned;
  }
}
