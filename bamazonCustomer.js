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

fs.readFile("inventory.txt", "utf8", function (error, data) {
    if (error) {
        return console.log(error);
    }
    console.log(data);
});

connection.connect(function(error) {
   if(error) throw error;
   readyToBuy();
});

function readyToBuy() {
    inquirer
        .prompt({
            name: "readyToBuy",
            type: "confirm",
            message: "Are you ready to make a purchase?",
            default: true
        })
        .then(function(answer) {
            buyProduct();
        })
}

function buyProduct() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

    inquirer
        .prompt([
            {
            name: "purchase",
            type: "rawlist",
            choices: function () {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name);
                }
                return choiceArray;
            },
            message: "Which item would you like to buy?",
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
        }
        ])
    .then(function (answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.purchase) {
                chosenItem = results[i];
            }
        }

        if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
            var newQuantity = (chosenItem.stock_quantity - parseInt(answer.quantity));
            var price = (parseInt(answer.quantity) * chosenItem.price)
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: newQuantity
                  },
                  {
                    item_id: chosenItem.item_id
                  }
                ],
                function(error) {
                    if (error) throw error;
                    console.log("You got it!");
                    console.log("Your total is: $" + price);
                    readyToBuy();
                }
            );
        }
            else {
                console.log("Sorry! Insufficient quantity.");
                readyToBuy();
            }
        });
    });
}