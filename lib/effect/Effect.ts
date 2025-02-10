import { Character } from "@/lib/Character";

export abstract class Effect {
  name: string;
  priority: number;
  description: string;

  constructor(name: string, priority: number, description: string) {
    this.name = name;
    this.priority = priority;
    this.description = description;
  }

  applyToSelf?(context: { character: Character; logs: string[] }): void;
  applyToDefender?(context: { defender: Character; logs: string[] }): void;
  applyToBoth?(context: { character: Character; defender: Character; logs: string[] }): void;

  apply(context: { character: Character; defender: Character; logs: string[] }) {
    if (this.applyToSelf) this.applyToSelf(context);
    if (this.applyToDefender) this.applyToDefender(context);
    if (this.applyToBoth) this.applyToBoth(context);
  }
}
