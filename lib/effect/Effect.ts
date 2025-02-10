export abstract class Effect {
  name: string;
  priority: number;
  description: string;

  constructor(name: string, priority: number, description: string) {
    this.name = name;
    this.priority = priority;
    this.description = description;
  }

  applyToSelf?(context: { character: any; logs: string[] }): void;
  applyToDefender?(context: { defender: any; logs: string[] }): void;
  applyToBoth?(context: { character: any; defender: any; logs: string[] }): void;

  apply(context: { character: any; defender: any; logs: string[] }) {
    if (this.applyToSelf) this.applyToSelf(context);
    if (this.applyToDefender) this.applyToDefender(context);
    if (this.applyToBoth) this.applyToBoth(context);
  }
}
