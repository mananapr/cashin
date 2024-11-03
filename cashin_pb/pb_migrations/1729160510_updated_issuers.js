/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wfcfu17k6cfjhrc")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, sub.issuer AS issuer\nFROM (SELECT DISTINCT products.issuer AS issuer FROM products) AS sub"
  }

  // remove
  collection.schema.removeField("b3ex06l8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u42mgnw5",
    "name": "issuer",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wfcfu17k6cfjhrc")

  collection.options = {
    "query": "SELECT DISTINCT (ROW_NUMBER() OVER()) as id, products.issuer AS issuer\nFROM products"
  }

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("u42mgnw5")

  return dao.saveCollection(collection)
})
