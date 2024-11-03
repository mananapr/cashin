/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mtyeuky9v178gqz")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("rtwwpgsp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lekq8jpf",
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
  const collection = dao.findCollectionByNameOrId("mtyeuky9v178gqz")

  collection.listRule = null
  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("lekq8jpf")

  return dao.saveCollection(collection)
})
