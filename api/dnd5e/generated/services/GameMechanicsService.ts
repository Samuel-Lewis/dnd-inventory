/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Condition } from "../models/Condition";
import type { DamageType } from "../models/DamageType";
import type { MagicSchool } from "../models/MagicSchool";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class GameMechanicsService {
  /**
   * Get a condition by index.
   * # Condition
   *
   * A condition alters a creature’s capabilities in a variety of ways and can
   * arise as a result of a spell, a class feature, a monster’s attack, or other
   * effect. Most conditions, such as blinded, are impairments, but a few, such
   * as invisible, can be advantageous.
   *
   * @returns Condition OK
   * @throws ApiError
   */
  public static getApiConditions({
    index,
  }: {
    /**
     * The `index` of the condition to get.
     *
     */
    index:
      | "blinded"
      | "charmed"
      | "deafened"
      | "exhaustion"
      | "frightened"
      | "grappled"
      | "incapacitated"
      | "invisible"
      | "paralyzed"
      | "petrified"
      | "poisoned"
      | "prone"
      | "restrained"
      | "stunned"
      | "unconscious";
  }): CancelablePromise<Condition> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/conditions/{index}",
      path: {
        index: index,
      },
    });
  }

  /**
   * Get a damage type by index.
   * # Damage type
   *
   * Different attacks, damaging spells, and other harmful effects deal different
   * types of damage. Damage types have no rules of their own, but other rules,
   * such as damage resistance, rely on the types.
   *
   * @returns DamageType OK
   * @throws ApiError
   */
  public static getApiDamageTypes({
    index,
  }: {
    /**
     * The `index` of the damage type to get.
     *
     */
    index:
      | "acid"
      | "bludgeoning"
      | "cold"
      | "fire"
      | "force"
      | "lightning"
      | "necrotic"
      | "piercing"
      | "poison"
      | "psychic"
      | "radiant"
      | "slashing"
      | "thunder";
  }): CancelablePromise<DamageType> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/damage-types/{index}",
      path: {
        index: index,
      },
    });
  }

  /**
   * Get a magic school by index.
   * # Magic School
   *
   * Academies of magic group spells into eight categories called schools of
   * magic. Scholars, particularly wizards, apply these categories to all spells,
   * believing that all magic functions in essentially the same way, whether it
   * derives from rigorous study or is bestowed by a deity.
   *
   * @returns MagicSchool OK
   * @throws ApiError
   */
  public static getApiMagicSchools({
    index,
  }: {
    /**
     * The `index` of the magic school to get.
     *
     */
    index:
      | "abjuration"
      | "conjuration"
      | "divination"
      | "enchantment"
      | "evocation"
      | "illusion"
      | "necromancy"
      | "transmutation";
  }): CancelablePromise<MagicSchool> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/magic-schools/{index}",
      path: {
        index: index,
      },
    });
  }
}
