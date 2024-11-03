/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "wfcfu17k6cfjhrc",
    "created": "2024-10-17 10:19:30.536Z",
    "updated": "2024-10-17 10:19:30.536Z",
    "name": "issuers",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "b3ex06l8",
        "name": "issuer",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT DISTINCT (ROW_NUMBER() OVER()) as id, products.issuer AS issuer\nFROM products"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("wfcfu17k6cfjhrc");

  return dao.deleteCollection(collection);
})
