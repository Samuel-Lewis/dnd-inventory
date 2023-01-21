/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Equipment } from '../models/Equipment';
import type { EquipmentCategory } from '../models/EquipmentCategory';
import type { MagicItem } from '../models/MagicItem';
import type { WeaponProperty } from '../models/WeaponProperty';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EquipmentService {

    /**
     * Get an equipment item by index.
     * # Equipment
     *
     * Opportunities abound to find treasure, equipment, weapons, armor, and more
     * in the dungeons you explore. Normally, you can sell your treasures and
     * trinkets when you return to a town or other settlement, provided that you
     * can find buyers and merchants interested in your loot.
     *
     * @returns Equipment OK
     * @throws ApiError
     */
    public static getApiEquipment({
        index,
    }: {
        /**
         * The `index` of the equipment to get.
         *
         * Available values can be found in the [`ResourceList`](#get-/api/-endpoint-) for `equipment`.
         *
         */
        index: string,
    }): CancelablePromise<Equipment> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/equipment/{index}',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get an equipment category by index.
     * These are the categories that various equipment fall under.
     * @returns EquipmentCategory OK
     * @throws ApiError
     */
    public static getApiEquipmentCategories({
        index,
    }: {
        /**
         * The `index` of the equipment category score to get.
         *
         * Available values can be found in the resource list for this endpoint.
         *
         */
        index: string,
    }): CancelablePromise<EquipmentCategory> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/equipment-categories/{index}',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get a magic item by index.
     * These are the various magic items you can find in the game.
     * @returns MagicItem OK
     * @throws ApiError
     */
    public static getApiMagicItems({
        index,
    }: {
        /**
         * The `index` of the magic item to get.
         *
         * Available values can be found in the resource list for this endpoint.
         *
         */
        index: string,
    }): CancelablePromise<MagicItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/magic-items/{index}',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get a weapon property by index.
     * @returns WeaponProperty OK
     * @throws ApiError
     */
    public static getApiWeaponProperties({
        index,
    }: {
        /**
         * The `index` of the weapon property to get.
         *
         */
        index: 'ammunition' | 'finesse' | 'heavy' | 'light' | 'loading' | 'monk' | 'reach' | 'special' | 'thrown' | 'two-handed' | 'versatile',
    }): CancelablePromise<WeaponProperty> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/weapon-properties/{index}',
            path: {
                'index': index,
            },
        });
    }

}
