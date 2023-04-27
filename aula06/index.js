const express = require("express")
const joi = require("joi") // Usado para validação de campos
const app = express()
app.use(express.json())

const livros = [
    {titulo: "livro A", id: 1},
    {titulo: "livro B", id: 2},
    {titulo: "livro C", id: 3},
    {titulo: "livro D", id: 4}
]

// Manipulador de solicitações para retornar mensagem de saudação
app.get("/",(req,res)=>{
    res.send("Seja bem vindo-vindo a API REST em Node.js!")
})

// Manipulador de solicitações para retornar todos os livros
app.get("/api/livros",(req,res) =>{
    res.send(livros)
})

// Manipulador de solicitações para pesquisar um livro pelo ID
app.get("/api/livros/:id",(req,res)=>{
    const livro = livros.find(
        (livro) => livro.id === parseInt(req.params.id,10)
    )

    if(!livro)
        res.status(404).send("Não foi possível encontrar o livro solicitado!")
    res.send(livro)
})

// Manipulador de solicitações para criar um livro
app.post("/api/livros",(req,res) => {
    const{error} = validarLivro(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const livro = {
        id: livros.length + 1,
        titulo: req.body.titulo
    }
    livros.push(livro)
    res.send(livro)
})

// Manipulador de solicitações para atualizar um livro
app.put("/api/livros/:id",(req,res) => {
    const livro = livros.find(
        (livro) => livro.id === parseInt(req.params.id,10)
    )
    if(!livro)
    res.status(404).send("Não foi possível encontrar o livro solicitado!")

    const{error} = validarLivro(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }

    livro.titulo = req.body.titulo;
    res.send(livro)
})

// Manipulador de solicitações para deletar um livro
app.delete("/api/livros/:id",(req,res) => {
    const livro = livros.find(
        (livro) => livro.id === parseInt(req.params.id, 10)
    )
    if(!livro)
        res.status(404).send("Não foi possível encontrar o livro solicitado!")

    const index = livros.indexOf(livro)
    livros.splice(index, 1)
    res.send(livro)
})

// Função para validar o campo título do livro
function validarLivro(livro){
    const schema = joi.object({
        titulo: joi.string().min(3).empty().required().messages({
            "string.min": "O campo título deve ter, no mínimo, {#limit} caracteres.",
            "string.empty": "O campo título não pode estar vazio.",
            "any.required": "O campo título é obrigatório."
        })
    })

    const resultado = schema.validate(livro);
    return resultado;
}

// A porta é uma variável de ambiente
const porta = process.env.PORT || 8080;
app.listen(porta,()=>
console.log("Servidor inicializado na porta: " + porta )
);