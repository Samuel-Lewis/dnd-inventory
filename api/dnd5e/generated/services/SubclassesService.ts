/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from "../models/APIReferenceList";
import type { Subclass } from "../models/Subclass";
import type { SubclassLevel } from "../models/SubclassLevel";
import type { SubclassLevelResource } from "../models/SubclassLevelResource";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class SubclassesService {
  /**
   * Get a subclass by index.
   * Subclasses reflect the different paths a class may take as levels are gained.
   * @returns Subclass OK
   * @throws ApiError
   */
  public static getApiSubclasses({
    index,
  }: {
    /**
     * The `index` of the subclass to get.
     *
     */
    index:
      | "berserker"
      | "champion"
      | "devotion"
      | "draconic"
      | "evocation"
      | "fiend"
      | "hunter"
      | "land"
      | "life"
      | "lore"
      | "open-hand"
      | "thief";
  }): CancelablePromise<Subclass> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/subclasses/{index}",
      path: {
        index: index,
      },
    });
  }

  /**
   * Get features available for a subclass.
   * @returns APIReferenceList List of features for the subclass.
   * @throws ApiError
   */
  public static getApiSubclassesFeatures({
    index,
  }: {
    /**
     * The `index` of the subclass to get.
     *
     */
    index:
      | "berserker"
      | "champion"
      | "devotion"
      | "draconic"
      | "evocation"
      | "fiend"
      | "hunter"
      | "land"
      | "life"
      | "lore"
      | "open-hand"
      | "thief";
  }): CancelablePromise<APIReferenceList> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/subclasses/{index}/features",
      path: {
        index: index,
      },
    });
  }

  /**
   * Get all level resources for a subclass.
   * @returns SubclassLevelResource List of level resource for the subclass.
   * @throws ApiError
   */
  public static getApiSubclassesLevels({
    index,
  }: {
    /**
     * The `index` of the subclass to get.
     *
     */
    index:
      | "berserker"
      | "champion"
      | "devotion"
      | "draconic"
      | "evocation"
      | "fiend"
      | "hunter"
      | "land"
      | "life"
      | "lore"
      | "open-hand"
      | "thief";
  }): CancelablePromise<Array<SubclassLevelResource>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/subclasses/{index}/levels",
      path: {
        index: index,
      },
    });
  }

  /**
   * Get level resources for a subclass and level.
   * @returns SubclassLevel Level resource for the subclass and level.
   * @throws ApiError
   */
  public static getApiSubclassesLevels1({
    index,
    subclassLevel,
  }: {
    /**
     * The `index` of the subclass to get.
     *
     */
    index:
      | "berserker"
      | "champion"
      | "devotion"
      | "draconic"
      | "evocation"
      | "fiend"
      | "hunter"
      | "land"
      | "life"
      | "lore"
      | "open-hand"
      | "thief";
    subclassLevel: number;
  }): CancelablePromise<SubclassLevel> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/subclasses/{index}/levels/{subclass_level}",
      path: {
        index: index,
        subclass_level: subclassLevel,
      },
    });
  }

  /**
   * Get features of the requested spell level available to the class.
   * @returns APIReferenceList List of features for the subclass and level.
   * @throws ApiError
   */
  public static getApiSubclassesLevelsFeatures({
    index,
    subclassLevel,
  }: {
    /**
     * The `index` of the subclass to get.
     *
     */
    index:
      | "berserker"
      | "champion"
      | "devotion"
      | "draconic"
      | "evocation"
      | "fiend"
      | "hunter"
      | "land"
      | "life"
      | "lore"
      | "open-hand"
      | "thief";
    subclassLevel: number;
  }): CancelablePromise<APIReferenceList> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/subclasses/{index}/levels/{subclass_level}/features",
      path: {
        index: index,
        subclass_level: subclassLevel,
      },
    });
  }
}
