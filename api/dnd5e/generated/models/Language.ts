/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';

/**
 * `Language`
 *
 */
export type Language = (APIReference & {
    /**
     * Brief description of the language.
     */
    desc?: string;
    type?: 'Standard' | 'Exotic';
    /**
     * Script used for writing in the language.
     */
    script?: string;
    /**
     * List of races that tend to speak the language.
     */
    typical_speakers?: Array<string>;
});

