/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Rule } from '../models/Rule';
import type { RuleSection } from '../models/RuleSection';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RulesService {

    /**
     * Get a rule section by index.
     * Rule sections represent a sub-heading and text that can be found underneath a rule heading in the SRD.
     * @returns RuleSection OK
     * @throws ApiError
     */
    public static getApiRuleSections({
        index,
    }: {
        /**
         * The `index` of the rule section to get.
         *
         */
        index: 'ability-checks' | 'ability-scores-and-modifiers' | 'actions-in-combat' | 'advantage-and-disadvantage' | 'between-adventures' | 'casting-a-spell' | 'cover' | 'damage-and-healing' | 'diseases' | 'fantasy-historical-pantheons' | 'madness' | 'making-an-attack' | 'mounted-combat' | 'movement' | 'movement-and-position' | 'objects' | 'poisons' | 'proficiency-bonus' | 'resting' | 'saving-throws' | 'sentient-magic-items' | 'standard-exchange-rates' | 'the-environment' | 'the-order-of-combat' | 'the-planes-of-existence' | 'time' | 'traps' | 'underwater-combat' | 'using-each-ability' | 'what-is-a-spell',
    }): CancelablePromise<RuleSection> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/rule-sections/{index}',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get a rule by index.
     * # Rule
     *
     * Rules are pages in the SRD that document the mechanics of Dungeons and Dragons.
     * Rules have descriptions which is the text directly underneath the rule heading
     * in the SRD. Rules also have subsections for each heading underneath the rule in the SRD.
     *
     * @returns Rule OK
     * @throws ApiError
     */
    public static getApiRules({
        index,
    }: {
        /**
         * The `index` of the rule to get.
         *
         */
        index: 'adventuring' | 'appendix' | 'combat' | 'equipment' | 'spellcasting' | 'using-ability-scores',
    }): CancelablePromise<Rule> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/rules/{index}',
            path: {
                'index': index,
            },
        });
    }

}
