import { Axe } from "@/lib/weapons/variants/Axe";
import { Claw } from "@/lib/weapons/variants/Claw";

export const WeaponManager = {
  axe: new Axe({ count: 1, sides: 6 }),
  claw: new Claw({ count: 1, sides: 3 }),
};
