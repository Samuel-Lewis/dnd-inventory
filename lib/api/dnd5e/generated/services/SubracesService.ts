/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from "../models/APIReferenceList";
import type { Subrace } from "../models/Subrace";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class SubracesService {
  /**
   * Get a subrace by index.
   * Subraces reflect the different varieties of a certain parent race.
   * @returns Subrace OK
   * @throws ApiError
   */
  public static getApiSubraces({
    index,
  }: {
    /**
     * The `index` of the subrace to get.
     *
     */
    index: "high-elf" | "hill-dwarf" | "lightfoot-halfling" | "rock-gnome";
  }): CancelablePromise<Subrace> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/subraces/{index}",
      path: {
        index: index,
      },
    });
  }

  /**
   * Get proficiences available for a subrace.
   * @returns APIReferenceList List of proficiences for the subrace.
   * @throws ApiError
   */
  public static getApiSubracesProficiencies({
    index,
  }: {
    /**
     * The `index` of the subrace to get.
     *
     */
    index: "high-elf" | "hill-dwarf" | "lightfoot-halfling" | "rock-gnome";
  }): CancelablePromise<APIReferenceList> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/subraces/{index}/proficiencies",
      path: {
        index: index,
      },
    });
  }

  /**
   * Get traits available for a subrace.
   * @returns APIReferenceList List of traits for the subrace.
   * @throws ApiError
   */
  public static getApiSubracesTraits({
    index,
  }: {
    /**
     * The `index` of the subrace to get.
     *
     */
    index: "high-elf" | "hill-dwarf" | "lightfoot-halfling" | "rock-gnome";
  }): CancelablePromise<APIReferenceList> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/subraces/{index}/traits",
      path: {
        index: index,
      },
    });
  }
}
