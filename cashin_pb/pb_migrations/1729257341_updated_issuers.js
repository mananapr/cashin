/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wfcfu17k6cfjhrc")

  collection.name = "card_issuers"
  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, sub.issuer AS issuer\nFROM (SELECT DISTINCT products.issuer AS issuer FROM products WHERE product_type=\"card\") AS sub"
  }

  // remove
  collection.schema.removeField("6auvrayn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iqpwrgyw",
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

  collection.name = "issuers"
  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, sub.issuer AS issuer\nFROM (SELECT DISTINCT products.issuer AS issuer FROM products) AS sub"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6auvrayn",
    "name": "issuer",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("iqpwrgyw")

  return dao.saveCollection(collection)
})
