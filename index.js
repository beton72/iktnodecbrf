const soap = require("soap")
const http = require("http")

const url = "https://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL"

soap.createClient(url, (err, client) => {
  if (err) {
    console.error(err)
    return
  }

  const currentDate = "2021-09-30T10:30:00"

  client.GetCursOnDateXML({ On_date: currentDate }, (err, result) => {
    if (err) {
      console.error(err)
      return
    }

    const currencyData =
      result.GetCursOnDateXMLResult.ValuteData.ValuteCursOnDate
    console.log(currencyData)
  })
})

soap.createClient(url, (err, client) => {
  if (err) {
    console.error(err)
    return
  }

  const params = {
    FromDate: "2000-09-30T10:30:00",
    ToDate: "2022-09-30T10:30:00",
    ValutaCode: "USD",
  }

  client.GetCursDynamicXML(params, (err, result) => {
    if (err) {
      console.error(err)
      return
    }
  })
})

const service = {
  MyService: {
    MyPort: {
      GetCursOnDateXML: function (args, callback) {
        callback(null, { result: "Data for GetCursOnDateXML" })
      },
      GetCursDynamicXML: function (args, callback) {
        callback(null, { result: "Data for GetCursOnDateXML" })
      },
    },
  },
}

const xml = require("fs").readFileSync("DailyInfo.wsdl", "utf8")
const server = http.createServer((req, res) => {
  res.end("404: Not Found")
})

server.listen(8000)
soap.listen(server, "/wsdl", service, xml)
