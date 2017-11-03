var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

connection.connect(function(error) {
    if(error) throw error;
    manager();
});

function manager() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    multiSearch();
                    break;

                case "Add to Inventory":
                    rangeSearch();
                    break;

                case "Add New Product":
                    songSearch();
                    break;
            }
        });
}

function viewProducts() {
    var query = "SELECT item_id, product_name, price, stock_quantity FROM bamazonDB WHERE item_id BETWEEN 1 and 100";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(query);
        }
    })
};