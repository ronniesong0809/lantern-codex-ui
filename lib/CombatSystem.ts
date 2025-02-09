import { Dice } from "@/utils/dice";
import { Character } from "./Character";
import { addLog } from "./logger";

export class CombatSystem {
  static attack(attacker: Character, defender: Character) {
    if (!attacker.isAlive() || !defender.isAlive()) {
      return;
    }

    if (attacker.isStunned) {
      addLog(`⚠️ [${attacker.name}] is stunned!`);
      return;
    }

    const attackRoll = Dice.roll(20);
    let log = `[${attacker.name}] attacks [${defender.name}] with ${attacker.damageDice.count}d${attacker.damageDice.sides}`;

    if (attackRoll === 1) {
      addLog(`${log}, 1 critical failure!`);
      return;
    }

    const totalAttack = attackRoll + attacker.attackBonus;
    log = `${log}, rolls ${attackRoll}+${attacker.attackBonus}`;

    if (attackRoll === 20 || totalAttack >= defender.armorClass) {
      const damageRoll = Dice.roll(attacker.damageDice.sides, attacker.damageDice.count);
      let totalDamage = damageRoll + attacker.attackBonus;

      if (attackRoll === 20) {
        log = `${log} (${defender.name} ac:${defender.armorClass}, CRITICAL HIT), dealing double damage ${totalDamage*2}((${damageRoll}+${attacker.attackBonus})*2)`;
        totalDamage *= 2;
      } else {
        log = `${log} (${defender.name} ac:${defender.armorClass}, HIT), dealing ${totalDamage}(${damageRoll}+${attacker.attackBonus}) damage`;
      }

      defender.health = Math.max(0, defender.health - totalDamage);
      if (!defender.isAlive()) {
        log = `${log} [${defender.name}] is defeated!`;
      }
    } else {
      log = `${log} (${defender.name} ac:${defender.armorClass}, MISS)`;
    }
    addLog(log);
  }
}