/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from '../models/APIReferenceList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CommonService {

    /**
     * Get all resource URLs.
     * Making a request to the API's base URL returns an object containing available endpoints.
     * @returns string OK
     * @throws ApiError
     */
    public static getApi(): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api',
        });
    }

    /**
     * Get list of all available resources for an endpoint.
     * Currently only the [`/spells`](#get-/api/spells) and [`/monsters`](#get-/api/monsters) endpoints support filtering with query parameters. Use of these query parameters is documented under the respective [Spells](#tag--Spells) and [Monsters](#tag--Monsters) sections.
     *
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public static getApi1({
        endpoint,
    }: {
        endpoint: 'ability-scores' | 'alignments' | 'backgrounds' | 'classes' | 'conditions' | 'damage-types' | 'equipment' | 'equipment-categories' | 'feats' | 'features' | 'languages' | 'magic-items' | 'magic-schools' | 'monsters' | 'proficiencies' | 'races' | 'rule-sections' | 'rules' | 'skills' | 'spells' | 'subclasses' | 'subraces' | 'traits' | 'weapon-properties',
    }): CancelablePromise<APIReferenceList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/{endpoint}',
            path: {
                'endpoint': endpoint,
            },
        });
    }

}
