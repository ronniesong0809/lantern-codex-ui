"use client";

import { Character } from "@/lib/Character";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { WeaponStats } from "./WeaponStats";

const CharacterStats = ({ character }: { character: Character }) => {
  return (
    <div className="space-y-2 text-sm">
      <div>HP: {character.health}</div>
      <div>Attack: {character.attackBonus}</div>
      <div>AC: {character.armorClass}</div>
      <div>Weapon: <HoverCard>
        <HoverCardTrigger>{character.weapon.name}</HoverCardTrigger>
        <HoverCardContent>
          <WeaponStats weapon={character.weapon} />
        </HoverCardContent>
      </HoverCard>
      </div>
      <div>Status: {character.statusEffects.map(effect => effect.name).join(", ") || ""}</div>
    </div>
  );
};

export { CharacterStats };