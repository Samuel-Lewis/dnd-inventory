# Party Packrat

Preview build is available at: party-packrat.vercel.app. This is not ready for full production use at this time, as there is some expected schema changes to the database.

**Party Packrat** is a pretty simple web app used to track inventories for your tabletop RPG games. A simplified way to create homebrew items and tracks party (or individual) inventories for all your campaigns.

This is predominately designed for Dungeons and Dragons 5th Edition, and has some pre-populated items from the System Reference Document.

## Technology

Party Packrat is built with Typescript and React, using the NextJS framework and Vercel for site hosting. The authentication and database is with Google's Firebase.

## TODO

- Before release

  - [x] Future proof item.visibility
  - [x] Future proof item.series
  - [x] Add /item/create screen
  - [x] Detail /item/[id] screen
  - [ ] Clean up /user
  - [x] Clean up home screen
  - [x] Add bundling for SRD items
    - Partially done. Bundling is implemented, but not sure if everything uses the cache correctly
    - Need a query for the non cached items?
  - [x] Fix scrolls
  - [x] Remove DocMeta attached to Docs
  - [x] Fix inventory items being dependent on item ref
  - [ ] Add overrides for Inventory Items

- Stretch
  - [x] Rarity border frames
  - [x] Virtualise `<ItemIndex>` list
  - [ ] Filters and sort for `<ItemIndex>`
  - [ ] Refine light mode colour scheme
  - [ ] Add dnd equip loader as build scripts
  - [x] Fix increment counter not respecting explicit value
  - [ ] Add createdAt / updatedAt fields to all docs
  - [ ] Add invite table?
  - [ ] Make inventory items sub collections?
