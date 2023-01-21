/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Feature } from '../models/Feature';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FeaturesService {

    /**
     * Get a feature by index.
     * # Feature
     *
     * When you gain a new level in a class, you get its features for that level.
     * You don’t, however, receive the class’s starting Equipment, and a few
     * features have additional rules when you’re multiclassing: Channel Divinity,
     * Extra Attack, Unarmored Defense, and Spellcasting.
     *
     * @returns Feature OK
     * @throws ApiError
     */
    public static getApiFeatures({
        index,
    }: {
        /**
         * The `index` of the feature to get.
         *
         * Available values can be found in the [`ResourceList`](#get-/api/-endpoint-) for `features`.
         *
         */
        index: string,
    }): CancelablePromise<Feature> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/features/{index}',
            path: {
                'index': index,
            },
        });
    }

}
