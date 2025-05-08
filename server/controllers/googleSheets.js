const e = require("express")
const { google } = require("googleapis")

const authFromBase64 = () => {
  const creds = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64,'base64').toString('utf-8')
  )

  return new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}
const dayHeaders = ["", "", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

const createWeeklySheet = async (employeeNames) => {
  const auth = authFromBase64()
  const sheets = google.sheets({ version: 'v4', auth})

  const spreadsheetId = process.env.SHEET_ID

  const values = [dayHeaders]
  employeeNames.forEach(name => {
    values.push([name, "Entrada", "", "", "", "", ""])
    values.push(["","Salida","","","","",""])
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `PRUEBAS APP!A1:G${values.length}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values
    }
  })
}
const appendToSheets = async (log) => {
  const auth = authFromBase64()
  const sheets = google.sheets({ version: 'v4', auth})

  const spreadsheetId = process.env.SHEET_ID
  const range = 'PRUEBAS APP!A:G'

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

module.exports = { appendToSheets, createWeeklySheet }