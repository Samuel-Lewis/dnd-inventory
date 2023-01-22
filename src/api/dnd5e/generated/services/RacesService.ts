/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from "../models/APIReferenceList";
import type { Race } from "../models/Race";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class RacesService {
  /**
   * Get a race by index.
   * Each race grants your character ability and skill bonuses as well as racial traits.
   * @returns Race OK
   * @throws ApiError
   */
  public static getApiRaces({
    index,
  }: {
    /**
     * The `index` of the race to get.
     *
     */
    index:
      | "dragonborn"
      | "dwarf"
      | "elf"
      | "gnome"
      | "half-elf"
      | "half-orc"
      | "halfling"
      | "human"
      | "tiefling";
  }): CancelablePromise<Race> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/races/{index}",
      path: {
        index: index,
      },
    });
  }

  /**
   * Get subraces available for a race.
   * @returns APIReferenceList List of subraces for the race.
   * @throws ApiError
   */
  public static getApiRacesSubraces({
    index,
  }: {
    /**
     * The `index` of the race to get.
     *
     */
    index:
      | "dragonborn"
      | "dwarf"
      | "elf"
      | "gnome"
      | "half-elf"
      | "half-orc"
      | "halfling"
      | "human"
      | "tiefling";
  }): CancelablePromise<APIReferenceList> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/races/{index}/subraces",
      path: {
        index: index,
      },
    });
  }

  /**
   * Get proficiencies available for a race.
   * @returns APIReferenceList List of proficiencies for the race.
   * @throws ApiError
   */
  public static getApiRacesProficiencies({
    index,
  }: {
    /**
     * The `index` of the race to get.
     *
     */
    index:
      | "dragonborn"
      | "dwarf"
      | "elf"
      | "gnome"
      | "half-elf"
      | "half-orc"
      | "halfling"
      | "human"
      | "tiefling";
  }): CancelablePromise<APIReferenceList> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/races/{index}/proficiencies",
      path: {
        index: index,
      },
    });
  }

  /**
   * Get traits available for a race.
   * @returns APIReferenceList List of traits for the race.
   * @throws ApiError
   */
  public static getApiRacesTraits({
    index,
  }: {
    /**
     * The `index` of the race to get.
     *
     */
    index:
      | "dragonborn"
      | "dwarf"
      | "elf"
      | "gnome"
      | "half-elf"
      | "half-orc"
      | "halfling"
      | "human"
      | "tiefling";
  }): CancelablePromise<APIReferenceList> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/races/{index}/traits",
      path: {
        index: index,
      },
    });
  }
}
