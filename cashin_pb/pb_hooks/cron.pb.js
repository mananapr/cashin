// <reference path='../pb_data/types.d.ts' />

cronAdd('checkExpiredApplications', '0 0 * * *', () => {
	const records = arrayOf(new DynamicModel({
		"id": "",
		"user_id": "",
		"product_id": "",
		"status": "",
		"app_age": 0,
	}))

	$app.dao().db()
		.newQuery("SELECT id, user_id, product_id, status, app_age FROM applications_with_products WHERE app_age>45 AND status='Initiated'")
		.all(records)

	if (records.length == 0) {
		console.log("No expired applications found")
	} else {
		for (var i = 0; i < records.length; i++) {
			const application = $app.dao().findRecordById("applications", records[i]["id"])
			application.set("status", "Expired")
			application.set("sub_status", "No response received from Issuer within 45 days")
			$app.dao().saveRecord(application)

			const user = $app.dao().findRecordById("users", records[i]["user_id"])
			const product = $app.dao().findRecordById("products", records[i]["product_id"])
			const message = new MailerMessage({
				from: {
					address: $app.settings().meta.senderAddress,
					name: $app.settings().meta.senderName,
				},
				to: [{ address: user.get("email") }],
				subject: "Your Application got Expired",
				html: `
Hi ${user.get('name')},
<br><br>
We regret to inform you that your application for <strong>${product.get('name')}</strong> with application ID <strong>${application.get('app_id')}</strong> has expired.
<br>
<strong>Reason:</strong> We did not receive a response from the issuer within the last 45 days.
<br><br>
If your application has since been approved, please reply to this email.
<br><br>
Thank you,
<br>
Team Cashin
`,
			})
			$app.newMailClient().send(message)
		}
	}
})
