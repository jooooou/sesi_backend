var express = require("express");
const app = express();
var requisicaoData = function (req, res, next) {
 req.requisicaoData = new Date().toISOString().slice(0, 10);
 next();
};
app.use(requisicaoData);
app.get("/", function (req, res) {
 var mensagemResposta = "Olá pessoal!";
 mensagemResposta +=
 " Esta mensagem foi gerada na data: " + req.requisicaoData;
 res.send(mensagemResposta);
});
//A porta é uma variável de ambiente
const porta = process.env.PORT || 8080;
app.listen(porta, () =>
 console.log("Servidor inicializado na porta: " + porta)
);