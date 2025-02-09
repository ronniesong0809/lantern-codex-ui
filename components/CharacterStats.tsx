"use client";

import { Character } from "@/lib/Character";

const CharacterStats = ({ character }: { character: Character }) => {
  return (
    <div className="space-y-2 text-sm">
      <div>hp: {character.health}</div>
      <div>att: {character.attackBonus}</div>
      <div>def: {character.armorClass}</div>
      <div>weap: {character.damageDice.count}D{character.damageDice.sides}</div>
      <div>status: {character.statusEffects.map(effect => effect.name).join(", ") || ""}</div>
    </div>
  );
};

export {CharacterStats};