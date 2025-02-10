import { Lifesteal } from "@/lib/effect/variants/Lifesteal";
import { LightningStrike } from "@/lib/effect/variants/LightningStrike";
import { DamageDice } from "@/types/story";

export const EffectManager = {
  lifesteal: (value: DamageDice) => new Lifesteal(value),
  lightningStrike: (value: DamageDice) => new LightningStrike(value),
};
