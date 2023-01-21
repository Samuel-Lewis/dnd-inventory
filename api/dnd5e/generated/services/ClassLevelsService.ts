/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from '../models/APIReferenceList';
import type { ClassLevel } from '../models/ClassLevel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClassLevelsService {

    /**
     * Get all level resources for a class.
     * @returns ClassLevel OK
     * @throws ApiError
     */
    public static getApiClassesLevels({
        index,
        subclass,
    }: {
        /**
         * The `index` of the class to get.
         *
         */
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
        /**
         * Adds subclasses for class to the response
         */
        subclass?: string,
    }): CancelablePromise<Array<ClassLevel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/classes/{index}/levels',
            path: {
                'index': index,
            },
            query: {
                'subclass': subclass,
            },
        });
    }

    /**
     * Get level resource for a class and level.
     * @returns ClassLevel OK
     * @throws ApiError
     */
    public static getApiClassesLevels1({
        index,
        classLevel,
    }: {
        /**
         * The `index` of the class to get.
         *
         */
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
        classLevel: number,
    }): CancelablePromise<ClassLevel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/classes/{index}/levels/{class_level}',
            path: {
                'index': index,
                'class_level': classLevel,
            },
        });
    }

    /**
     * Get features available to a class at the requested level.
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public static getApiClassesLevelsFeatures({
        index,
        classLevel,
    }: {
        /**
         * The `index` of the class to get.
         *
         */
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
        classLevel: number,
    }): CancelablePromise<APIReferenceList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/classes/{index}/levels/{class_level}/features',
            path: {
                'index': index,
                'class_level': classLevel,
            },
        });
    }

    /**
     * Get spells of the requested level available to the class.
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public static getApiClassesLevelsSpells({
        index,
        spellLevel,
    }: {
        /**
         * The `index` of the class to get.
         *
         */
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
        spellLevel: number,
    }): CancelablePromise<APIReferenceList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/classes/{index}/levels/{spell_level}/spells',
            path: {
                'index': index,
                'spell_level': spellLevel,
            },
        });
    }

}
