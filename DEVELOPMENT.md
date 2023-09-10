# Dev

## Firebase

Required environment variables

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## AWS

Required environment variables

- `NEXT_PUBLIC_AWS_REGION`
- `NEXT_PUBLIC_AWS_ACCESS_KEY`
- `NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY`

### Dynamo

#### Questions and queries for the database

- As a user, I want
  - [x] my own user profile
    - ID comes from auth provider
  - [x] all public inventories
    - (!) Requires a SCAN operation
  - [x] all my owned inventories
  - [x] all items in an inventory
  - [ ] all my "saved" inventories
  - [ ] all my recently viewed / interacted with inventories

#### Schema

Employees single table database design. Uses a compound partition key.

| partitionKey    | sortKey | usrId | invId | itmId | data kind   |
| --------------- | ------- | ----- | ----- | ----- | ----------- |
| usr#Kde         | meta    | Kde   |       |       | User Schema |
| usr#T4R         | meta    | T4R   |       |       | User Schema |
| usr#Kde         | inv#fiB | Kde   | fiB   |       | Inv Schema  |
| usr#Kde#inv#fiB | itm#oDn | Kde   | fiB   | oDn   | Item Schema |
