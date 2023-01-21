/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from "./APIReference";
import type { ResourceDescription } from "./ResourceDescription";

/**
 * `MagicItem`
 *
 */
export type MagicItem = APIReference &
  ResourceDescription & {
    equipment_category?: APIReference;
    rarity?: {
      /**
       * The rarity of the item.
       */
      name?:
        | "Varies"
        | "Common"
        | "Uncommon"
        | "Rare"
        | "Very Rare"
        | "Legendary"
        | "Artifact";
    };
    variants?: Array<APIReference>;
    /**
     * Whether this is a variant or not
     */
    variant?: boolean;
  };
