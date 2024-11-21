// <reference path='../pb_data/types.d.ts' />

// HOOKS
onModelAfterUpdate((e) => {

	// FUNCTIONS
	function getUserById(user_id) {
		const users = arrayOf(new DynamicModel({
			"id": "",
			"name": "",
			"email": "",
		}))
		$app.dao().db()
			.newQuery(`SELECT id, name, email FROM users WHERE id="${user_id}"`)
			.all(users)
		console.log(users)
		console.log(users[0])
		return users[0]
	}

	function getProductById(product_id) {
		const products = arrayOf(new DynamicModel({
			"id": "",
			"name": "",
		}))
		$app.dao().db()
			.newQuery(`SELECT id, name FROM products WHERE id="${product_id}"`)
			.all(products)
		return products[0]
	}

	const applications = arrayOf(new DynamicModel({
		"id": "",
		"status": "",
		"sub_status": "",
		"user_id": "",
		"product_id": "",
		"app_id": "",
	}))
	$app.dao().db()
		.newQuery(`SELECT id, status, sub_status, user_id, product_id, app_id FROM applications WHERE id="${e.model.id}"`)
		.all(applications)

	const application = applications[0]

	if (application.status == "Declined") {
		const user = getUserById(application.user_id)
		const product = getProductById(application.product_id)
		const message = new MailerMessage({
			from: {
				address: $app.settings().meta.senderAddress,
				name: $app.settings().meta.senderName,
			},
			to: [{ address: user.email }],
			subject: "Your Application got Declined",
			html: `
Hi ${user.name},
<br><br>
We regret to inform you that your application for <strong>${product.name}</strong> with application ID <strong>${application.app_id}</strong> has been declined.
<br>
<strong>Reason:</strong> ${application.sub_status}
<br><br>
You may reply to this email in case you have any questions or concerns.
<br><br>
Thank you,
<br>
Team Cashin
`,
		})
		$app.newMailClient().send(message)
	} else if (application.status == "Approved") {
		const user = getUserById(application.user_id)
		const product = getProductById(application.product_id)
		const message = new MailerMessage({
			from: {
				address: $app.settings().meta.senderAddress,
				name: $app.settings().meta.senderName,
			},
			to: [{ address: user.email }],
			bcc: [{ address: "manans@tutanota.com", address: "buzo.1411@gmail.com" }],
			subject: "Your Application got Approved!",
			html: `
Hi ${user.name},
<br><br>
We are delighted to inform you that your application for <strong>${product.name}</strong> with application ID <strong>${application.app_id}</strong> has been approved!
<br>
You will receive your Amazon Pay Giftcard within 24-48 hours.
<br><br>
Thank you,
<br>
Team Cashin
`,
		})
		$app.newMailClient().send(message)
		// TODO: Integrate with some API for generating gift card
	}
}, "applications")
