/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from '../models/APIReferenceList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClassResourceListsService {

    /**
     * Get subclasses available for a class.
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public static getApiClassesSubclasses({
        index,
    }: {
        /**
         * The `index` of the class to get.
         *
         */
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
    }): CancelablePromise<APIReferenceList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/classes/{index}/subclasses',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get spells available for a class.
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public static getApiClassesSpells({
        index,
    }: {
        /**
         * The `index` of the class to get.
         *
         */
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
    }): CancelablePromise<APIReferenceList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/classes/{index}/spells',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get features available for a class.
     * @returns APIReferenceList List of features for the class.
     * @throws ApiError
     */
    public static getApiClassesFeatures({
        index,
    }: {
        /**
         * The `index` of the class to get.
         *
         */
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
    }): CancelablePromise<APIReferenceList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/classes/{index}/features',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get proficiencies available for a class.
     * @returns APIReferenceList List of proficiencies for the class.
     * @throws ApiError
     */
    public static getApiClassesProficiencies({
        index,
    }: {
        /**
         * The `index` of the class to get.
         *
         */
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
    }): CancelablePromise<APIReferenceList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/classes/{index}/proficiencies',
            path: {
                'index': index,
            },
        });
    }

}
