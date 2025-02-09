import { Character } from "./Character";

export class StatusEffect {
  name: string;
  duration: number;
  applyEffect: (target: Character) => void;
  removeEffect: (target: Character) => void;

  constructor(name: string, duration: number, apply: (target: Character) => void, remove: (target: Character) => void) {
    this.name = name;
    this.duration = duration;
    this.applyEffect = apply;
    this.removeEffect = remove;
  }

  apply(target: Character) {
    this.applyEffect(target);
    target.addEffect(this);
  }

  remove(target: Character) {
    this.removeEffect(target);
    target.removeEffect(this);
  }
}

export function createEffects() {
  return {
    Stun: new StatusEffect("Stun", 2, 
      (t: Character) => { t.isStunned = true }, 
      (t: Character) => { t.isStunned = false }
    ),
    AttackBuff: new StatusEffect("Battle Instinct", 2, 
      (t: Character) => { t.attackBonus += 2 }, 
      (t: Character) => { t.attackBonus -= 2 }
    ),
    DefenseBuff: new StatusEffect("Defensive Instinct", 2, 
      (t: Character) => { t.armorClass += 2 }, 
      (t: Character) => { t.armorClass -= 2 }
    ),
    InsightBuff: new StatusEffect("Precise Insight", 3, 
      (t: Character) => { t.attackBonus += 1 }, 
      (t: Character) => { t.attackBonus -= 1 }
    ),
  };
}

let effectsInstance: ReturnType<typeof createEffects> | null = null;
export function getEffects() {
  if (!effectsInstance) {
    effectsInstance = createEffects();
  }
  return effectsInstance;
}
