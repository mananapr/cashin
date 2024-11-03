/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oml2fj1r765lgwf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hop5vmvg",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Initiated",
        "Declined",
        "Approved",
        "Expired"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oml2fj1r765lgwf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hop5vmvg",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Initiated",
        "Declined",
        "Approved"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
