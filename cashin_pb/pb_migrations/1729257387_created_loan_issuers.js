/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mtyeuky9v178gqz",
    "created": "2024-10-18 13:16:27.650Z",
    "updated": "2024-10-18 13:16:27.650Z",
    "name": "loan_issuers",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rtwwpgsp",
        "name": "issuer",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
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
      "query": "SELECT (ROW_NUMBER() OVER()) as id, sub.issuer AS issuer\nFROM (SELECT DISTINCT products.issuer AS issuer FROM products WHERE product_type=\"loan\") AS sub"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mtyeuky9v178gqz");

  return dao.deleteCollection(collection);
})
