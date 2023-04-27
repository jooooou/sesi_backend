// Criação de um esquema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UsuarioEsquema = new Schema({
 nome: String,
 login: String,
 senha: String
});
// Exportar Esquema de usuário
module.exports = mongoose.model("Usuario", UsuarioEsquema);