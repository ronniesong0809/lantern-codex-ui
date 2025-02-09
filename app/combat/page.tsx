'use client';

import { useState, useEffect } from 'react';
import { Character } from '@/lib/Character';
import { CombatSystem } from '@/lib/CombatSystem';
import { addLogListener, removeLogListener } from '@/lib/logger';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CharacterStats } from '@/components/CharacterStats';

export default function CombatPage() {
  const [player, setPlayer] = useState<Character | null>(null);
  const [enemies, setEnemies] = useState<Character[]>([]);
  const [selectedEnemy, setSelectedEnemy] = useState<number>(0);
  const [combatLog, setCombatLog] = useState<string[]>([]);

  useEffect(() => {
    setPlayer(new Character("Ronnie", 100, 5, 14, { sides: 12, count: 1 }));
    setEnemies([
      new Character("Goblin", 80, 5, 15, { sides: 8, count: 1 }),
      new Character("Skeleton", 40, 2, 8, { sides: 4, count: 1 }),
      new Character("Bat", 20, 1, 4, { sides: 3, count: 1 }),
      new Character("Bat", 20, 1, 4, { sides: 3, count: 1 }),
    ]);

    const logListener = (message: string) => {
      setCombatLog(prev => [...prev, message]);
    };
    addLogListener(logListener);

    return () => {
      removeLogListener(logListener);
    };
  }, []);

  const handleAttack = () => {
    if (!player || enemies.length === 0) return;
    player.processStatusEffects();
    enemies.forEach(enemy => enemy.processStatusEffects());

    setCombatLog(prev => [...prev, "=== Your Turn ==="]);

    const target = enemies[selectedEnemy];
    CombatSystem.attack(player, target);

    setCombatLog(prev => [...prev, "=== Enemy Turn ==="]);

    enemies.forEach((enemy) => {
      if (enemy.isAlive()) {
        CombatSystem.attack(enemy, player);
      }
    });

    setPlayer(player.clone());
    setEnemies(enemies.map(enemy => enemy.clone()));
  };

  if (!player || enemies.length === 0) {
    return <div className="p-4">Loading...</div>;
  }

  const allEnemiesDefeated = enemies.every(enemy => !enemy.isAlive());

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardContent className="p-4">
          <ScrollArea className="h-80">
            <div className="pr-4">
              {combatLog.map((log, index) => (
                <div key={index} className="text-sm py-1">{log}</div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <div className="flex justify-center">
          <HoverCard>
            <HoverCardTrigger>
              <Card className={`w-[200px] cursor-pointer ${!player.isAlive() ? 'opacity-50' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-center">{player.name}</CardTitle>
                </CardHeader>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent>
              <CharacterStats character={player} />
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {enemies.map((enemy, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger>
                <Card
                  className={`cursor-pointer ${selectedEnemy === index ? 'ring-2 ring-primary' : ''
                    } ${!enemy.isAlive() ? 'opacity-50' : ''}`}
                  onClick={() => enemy.isAlive() && setSelectedEnemy(index)}
                >
                  <CardHeader>
                    <CardTitle className="text-center">{enemy.name}</CardTitle>
                  </CardHeader>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent>
                <CharacterStats character={enemy} />
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={handleAttack}
          disabled={!player.isAlive() || allEnemiesDefeated}
          size="lg"
        >
          {player.damageDice.count}D{player.damageDice.sides}
        </Button>

        <Button
          onClick={handleAttack}
          disabled={!player.isAlive() || allEnemiesDefeated}
          variant="secondary"
          size="lg"
        >
          Skill
        </Button>
      </div>
    </div>
  );
}
