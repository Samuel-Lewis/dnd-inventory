/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from '../models/APIReferenceList';
import type { Spell } from '../models/Spell';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SpellsService {

    /**
     * Get list of spells with optional filtering.
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public static getApiSpells({
        level,
        school,
    }: {
        /**
         * The level or levels to filter on.
         */
        level?: Array<number>,
        /**
         * The magic school or schools to filter on.
         */
        school?: Array<string>,
    }): CancelablePromise<APIReferenceList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/spells',
            query: {
                'level': level,
                'school': school,
            },
        });
    }

    /**
     * Get a spell by index.
     * @returns Spell OK
     * @throws ApiError
     */
    public static getApiSpells1({
        index,
    }: {
        /**
         * The `index` of the `Spell` to get.
         *
         * Available values can be found in the [`ResourceList`](#get-/api/-endpoint-) for `spells`.
         *
         */
        index: string,
    }): CancelablePromise<Spell> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/spells/{index}',
            path: {
                'index': index,
            },
        });
    }

}
