export type CoinValue = {
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

export const sumValue = (v: CoinValue): number =>
  copper(v.copper) +
  silver(v.silver) +
  gold(v.gold) +
  platinum(v.platinum) +
  electrum(v.electrum);

export const getValue = (n: number): CoinValue => {
  // (ignore electrum)
  const copper = n % 10;
  const silver = Math.floor((n % 100) / 10);
  const gold = Math.floor((n % 1000) / 100);
  const platinum = Math.floor(n / 1000);

  return {
    copper,
    silver,
    gold,
    platinum,
    electrum: 0,
  };
};
