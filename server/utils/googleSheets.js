const { google } = require("googleapis")

const authFromBase64 = () => {
  const creds = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8')
  )

  return new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })
}

const appendToSheets = async (log) => {
  const auth = authFromBase64()
  const sheets = google.sheets({ version: 'v4', auth})

  const spreadsheetId = process.env.SHEET_ID
  const range = 'PRUEBAS APP!A:D'

  const values = [[log.name, log.action, log.timestamp, log.date]]

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values
    }
  })
}

module.exports = { appendToSheets }