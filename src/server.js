const express = require("express")
const server = express()

//pegar banco de dados
const db = require("./database/db")

//configurar caminhos da minha aplicação
server.use(express.static("public"))

// habilitar uso do req.body
server.use(express.urlencoded({extended:true}))


//template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurando caminhos da aplicação
// req = requisição (pedido) --> res = resposta(retorno)
server.get("/", function(req,res){
    return res.render("index.html")
})

server.get("/create-point", function(req,res){
    //req.query = Query Strings da nossa url



    return res.render("create-point.html")
})

server.post("/savepoint", function(req,res){
    //req.body: O corpo do formulário

    //inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items        
    ]

    function afterInsertData(err) {
        // callback chamar a função novamente após lançar os valores, logo o sistema nao fica parado esperando valores, as operações continuam mas aguardando tb a resposta
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)


        return res.render("create-point.html", {saved: true })
    }
    db.run(query, values, afterInsertData)
})

server.get("/search-results", function(req,res){
    //pagina de pesquisa 

    const search = req.query.search
    
    if(search ==""){
        //pesquisa vazia
        return res.render("search-results.html", {total:0})
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        //constar numero de ID (dentro do array)
        const total = rows.length

        return res.render("search-results.html", {places: rows, total})
    })
})


//ligar o servidor
server.listen(3000)