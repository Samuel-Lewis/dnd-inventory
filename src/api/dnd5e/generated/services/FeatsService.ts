/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Feat } from "../models/Feat";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class FeatsService {
  /**
   * Get a feat by index.
   * # Feat
   *
   * A feat is a boon a character can receive at level up instead of an ability score increase.
   *
   * @returns Feat OK
   * @throws ApiError
   */
  public static getApiFeats({
    index,
  }: {
    /**
     * The `index` of the feat to get.
     *
     */
    index: "grappler";
  }): CancelablePromise<Feat> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/feats/{index}",
      path: {
        index: index,
      },
    });
  }
}
