require("dotenv").config()
const p = require("phin")

module.exports = (req, res) => {
  const request = JSON.stringify({
    submittedAt: new Date().getTime(),
    fields: [
      {
        name: "email",
        value: req.body.email,
      },
      {
        name: "firstname",
        value: req.body.firstname,
      },
      {
        name: "lastname",
        value: req.body.lastname,
      },
    ],
    context: {
      pageUri: "www.qimoda.com",
      pageName: "Qimoda Homepage",
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "I agree to allow Qimoda to store and process my personal data.",
        communications: [
          {
            value: true,
            subscriptionTypeId: 999,
            text: "I agree to receive marketing communications from Qimoda.",
          },
        ],
      },
    },
  })

  p({
    method: "post",
    url: new URL(
      "https://api.hsforms.com/submissions/v3/integration/submit/7109872/571c7494-d031-4245-8f0f-869b68111a72"
    ),
    headers: {
      "Content-Type": "application/json",
    },
    data: request,
  })
    .catch(err => {
      console.log(err.data)
    })
    .then(() => {
      res.status(200).send(`Success`)
    })
}
