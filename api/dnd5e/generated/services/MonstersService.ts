/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from "../models/APIReferenceList";
import type { Monster } from "../models/Monster";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class MonstersService {
  /**
   * Get list of monsters with optional filtering
   * @returns APIReferenceList OK
   * @throws ApiError
   */
  public static getApiMonsters({
    challengeRating,
  }: {
    /**
     * The challenge rating or ratings to filter on.
     */
    challengeRating?: Array<number>;
  }): CancelablePromise<APIReferenceList> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/monsters",
      query: {
        challenge_rating: challengeRating,
      },
    });
  }

  /**
   * Get monster by index.
   * @returns Monster OK
   * @throws ApiError
   */
  public static getApiMonsters1({
    index,
  }: {
    /**
     * The `index` of the `Monster` to get.
     *
     */
    index: string;
  }): CancelablePromise<Monster> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/monsters/{index}",
      path: {
        index: index,
      },
    });
  }
}
