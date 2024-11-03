// <reference path='../pb_data/types.d.ts' />

cronAdd('checkExpiredApplications', '0 0 * * *', () => {
	const records = arrayOf(new DynamicModel({
		"id": "",
		"status": "",
		"app_age": 0,
	}))

	$app.dao().db()
		.newQuery("SELECT id, status, app_age FROM applications_with_products WHERE app_age>45 AND status='Initiated'")
		.all(records)

	if (records.length == 0) {
		console.log("No expired applications found")
	} else {
		for (var i = 0; i < records.length; i++) {
			const application = $app.dao().findRecordById("applications", records[i]["id"])
			application.set("status", "Expired")
			application.set("sub_status", "No response received from Issuer within 45 days")
			$app.dao().saveRecord(application)
		}
	}
})
