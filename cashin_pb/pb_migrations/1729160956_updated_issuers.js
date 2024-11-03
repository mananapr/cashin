/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wfcfu17k6cfjhrc")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("u42mgnw5")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wfcfu17k6cfjhrc")

  collection.listRule = null
  collection.viewRule = null

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

  // remove
  collection.schema.removeField("6auvrayn")

  return dao.saveCollection(collection)
})
