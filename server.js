const express = require("express");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const app = express();

app.use(express.static(__dirname));

// ⚠️ TROCA AQUI PELA SUA PORTA (ex: COM4)
const port = new SerialPort({ path: "COM4", baudRate: 9600 });

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

let valor = 0;
let status = "Carregando...";

parser.on("data", (data) => {
  valor = parseInt(data);

  console.log("Valor:", valor);

  if (valor > 800) {
    status = "Seco";
  } else {
    status = "Úmido";
  }
});

// rota para o site
app.get("/status", (req, res) => {
  res.json({ status, valor });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});