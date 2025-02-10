"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Weapon } from "@/lib/weapons/Weapon";

const WeaponStats = ({ weapon }: { weapon: Weapon }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{weapon.name}</CardTitle>
        <CardDescription>{weapon.damageDice.count}d{weapon.damageDice.sides}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {weapon.effects.map(effect => (
            <div key={effect.name}>
              <div>{effect.name}</div>
              <div>{effect.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { WeaponStats };