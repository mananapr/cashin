/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b5hs2s6rp7jy8sp")

  collection.options = {
    "query": "SELECT\n  app.id,\n  app.user_id,\n  app.product_id,\n  app.app_id,\n  app.status,\n  app.sub_status,\n  app.created,\n  app.updated,\n  app.payout_amount,\n  prod.application_link,\n  prod.cashback,\n  prod.name,\n  prod.issuer,\n  prod.product_image,\n  ROUND(julianday('now') - julianday(REPLACE(app.created, 'Z', ''))) AS app_age\nFROM applications AS app\nJOIN products AS prod\nON app.product_id = prod.id"
  }

  // remove
  collection.schema.removeField("kvbpqysp")

  // remove
  collection.schema.removeField("tk2ejwh3")

  // remove
  collection.schema.removeField("7qdftc6z")

  // remove
  collection.schema.removeField("yolsvv9h")

  // remove
  collection.schema.removeField("pg6cbmqd")

  // remove
  collection.schema.removeField("olmdvtrt")

  // remove
  collection.schema.removeField("1jwxbxyk")

  // remove
  collection.schema.removeField("wugl5w6n")

  // remove
  collection.schema.removeField("g9vzcqqq")

  // remove
  collection.schema.removeField("ujaic2jd")

  // remove
  collection.schema.removeField("wzfjowsw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mhhukh1h",
    "name": "user_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kzkrmfgt",
    "name": "product_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wjhh90f5xo55n6z",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iz3rtbeo",
    "name": "app_id",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "43tuihzh",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "folpqzef",
    "name": "sub_status",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mrqfwkze",
    "name": "payout_amount",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gxnpf2bc",
    "name": "application_link",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t4itdzkv",
    "name": "cashback",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zpveikjx",
    "name": "name",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zzkyxbdu",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zsqggd42",
    "name": "product_image",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yu15vfly",
    "name": "app_age",
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
  const collection = dao.findCollectionByNameOrId("b5hs2s6rp7jy8sp")

  collection.options = {
    "query": "SELECT\n  app.id,\n  app.user_id,\n  app.product_id,\n  app.app_id,\n  app.status,\n  app.sub_status,\n  app.created,\n  app.updated,\n  app.payout_amount,\n  prod.application_link,\n  prod.cashback,\n  prod.name,\n  prod.issuer,\n  prod.product_image\nFROM applications AS app\nJOIN products AS prod\nON app.product_id = prod.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kvbpqysp",
    "name": "user_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tk2ejwh3",
    "name": "product_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wjhh90f5xo55n6z",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7qdftc6z",
    "name": "app_id",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yolsvv9h",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pg6cbmqd",
    "name": "sub_status",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "olmdvtrt",
    "name": "payout_amount",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1jwxbxyk",
    "name": "application_link",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wugl5w6n",
    "name": "cashback",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g9vzcqqq",
    "name": "name",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ujaic2jd",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wzfjowsw",
    "name": "product_image",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("mhhukh1h")

  // remove
  collection.schema.removeField("kzkrmfgt")

  // remove
  collection.schema.removeField("iz3rtbeo")

  // remove
  collection.schema.removeField("43tuihzh")

  // remove
  collection.schema.removeField("folpqzef")

  // remove
  collection.schema.removeField("mrqfwkze")

  // remove
  collection.schema.removeField("gxnpf2bc")

  // remove
  collection.schema.removeField("t4itdzkv")

  // remove
  collection.schema.removeField("zpveikjx")

  // remove
  collection.schema.removeField("zzkyxbdu")

  // remove
  collection.schema.removeField("zsqggd42")

  // remove
  collection.schema.removeField("yu15vfly")

  return dao.saveCollection(collection)
})
