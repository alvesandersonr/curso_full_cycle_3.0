const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const mysqlConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

app.get('/',  (req, res) => {

    let name = getRandomName(['Anderson', 'Regina', 'Maria Fernanda'])

    execQuery( `INSERT INTO people(name) values('` + name + `')`, res)

    execQuery('SELECT name FROM people', res)
})

app.listen(port, () => console.log('Rodando na porta ' + port))

function getRandomName(arr) {

    const randomIndex = Math.floor(Math.random() * arr.length);

    return arr[randomIndex];
}

function execQuery(sql, res) {
    const connection = mysql.createConnection(mysqlConfig)

    connection.query(sql, (error, rows, fields) => {
        if (error) {
            res.json(error)
        }        

        let message = '<h1>Full Cycle Rocks!</h1>'
        message += '<h3>Lista de nomes</h3>'
        message += '<ul>';

        if (rows && rows.length > 0) {
            rows.forEach((people) => message += '<li>' + people.name + '</li>');
            
            message += '</ul>';

            res.send(message)
        }

        connection.end()      
    })
}