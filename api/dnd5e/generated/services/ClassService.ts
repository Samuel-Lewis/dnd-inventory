/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Class } from '../models/Class';
import type { Multiclassing } from '../models/Multiclassing';
import type { Spellcasting } from '../models/Spellcasting';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClassService {

    /**
     * Get a class by index.
     * # Class
     *
     * A character class is a fundamental part of the identity and nature of
     * characters in the Dungeons & Dragons role-playing game. A character's
     * capabilities, strengths, and weaknesses are largely defined by its class.
     * A character's class affects a character's available skills and abilities. [[SRD p8-55](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=8)]
     *
     * @returns Class OK
     * @throws ApiError
     */
    public static getApiClasses({
        index,
    }: {
        /**
         * The `index` of the class to get.
         *
         */
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
    }): CancelablePromise<Class> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/classes/{index}',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get spellcasting info for a class.
     * @returns Spellcasting OK
     * @throws ApiError
     */
    public static getApiClassesSpellcasting({
        index,
    }: {
        /**
         * The `index` of the class to get.
         *
         */
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
    }): CancelablePromise<Spellcasting> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/classes/{index}/spellcasting',
            path: {
                'index': index,
            },
            errors: {
                404: `Not found.`,
            },
        });
    }

    /**
     * Get multiclassing resource for a class.
     * @returns Multiclassing OK
     * @throws ApiError
     */
    public static getApiClassesMultiClassing({
        index,
    }: {
        /**
         * The `index` of the class to get.
         *
         */
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
    }): CancelablePromise<Multiclassing> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/classes/{index}/multi-classing',
            path: {
                'index': index,
            },
        });
    }

}
