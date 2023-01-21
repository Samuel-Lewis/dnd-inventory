export type Value = {
  copper: number;
  silver: number;
  gold: number;
  platinum: number;
  electrum: number;
};

export const copper = (v: number) => v;
export const silver = (v: number) => copper(v * 10);
export const gold = (v: number) => silver(v * 10);
export const platinum = (v: number) => gold(v * 10);
export const electrum = (v: number) => silver(v * 5);

export const getValue = (v: Value): number =>
  copper(v.copper) +
  silver(v.silver) +
  gold(v.gold) +
  platinum(v.platinum) +
  electrum(v.electrum);
