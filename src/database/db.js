/* // importar a dependencia do sqlite
// verbose = configura o sqlite para mandar informações para o terminal
const sqlite3 = require("sqlite3").verbose()

//criar que irá fazer operações no Banco de Dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto de banco de dados nas operações
// serialize = método para rodar sequencia de codigos
/* db.serialize(function(){
    //com comandos SQL

    // 1 - criar uma tabela 
    //AUTOINCREMENT= contador sequencial, vai sempre seguir uma ordem de acordo com a ID criada
    // place = tabela criada
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    
    `)

    // 2 - Inserir dados na tabela
    // ponto de "?" serve para trocar por valores inseridos
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
    const values = []
    function afterInsertData(err){
        // callback chamar a função novamente após lançar os valores, logo o sistema nao fica parado esperando valores, as operações continuam mas aguardando tb a resposta
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    // db.run(query, values, afterInsertData)
    // 3 - consultar dados da tabela
    //* = selecionar TUDO, caso queira buscar qualquer registro por outro, apenas troque "*" pela busca desejada
    //rows = registros da tabela
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

    // 4 - deletar um dado na tabela
    //deletar da tabela "places" onde ID igual a Ex. 1, e depois roda a função
    db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
        if(err){
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    })
}) */