require("dotenv").config()

module.exports = (req, res) => {
  const Bearer = require("@bearer/node")(process.env.BEARER_API)
  const gsheet = Bearer.integration("google_sheets")
  const spreadsheetId = process.env.CONTACT_SPREADSHEET
  const data = [Object.values(req.body)]
  gsheet
    .auth(process.env.GSHEET_AUTH)
    .post(`${spreadsheetId}/values/A1:append`, {
      body: { values: data },
      query: { valueInputOption: "RAW" },
    })
    .then(() => {
      res.status(200).send(`Success`)
    })
}
