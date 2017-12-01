var mysql      = require('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bamazonDB'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 startApp();
 
});

function startApp(){
connection.query("SELECT * FROM products", function (error, results, fields) {

    console.log("\n");
  for (var i = 0; i < results.length; i++){
		console.log("ID   " + results[i].id + "  Product:" + results[i].product_name + "     Category:" + results[i].department_name + "     Price:   " + results[i].price + "  Quantity in Stock: " + results[i].stock_quantity);
  }
    console.log("\n");

  inquirer.prompt([
  {
    type: "input",
    name: "toPurchase",
    message: "Please enter the ID for the item you would like to buy",
    validate: function(num) {
                    if (isNaN(num) || num < 1) {
                        // console.log("\n");
                        console.log("\nYou must enter a number for the ID");
                        return false;    
                    } 
                    else {
                        return true;
                    }
                }
  },
  {
    type:"input",
    name: "amount",
    message: "How many would you like to purchase?",
    validate: function(num) {
                    if (isNaN(num) || num < 1) {
                         console.log("\nYou must enter a number for the amount to purchase")
                        return false;
                       
                    } 
                    else {
                        return true;
                    }
                }
  }
    ]).then(function(prompt){

      var stock = (results[prompt.toPurchase -1].stock_quantity);
      var remain = (stock - prompt.amount);

      if (stock < prompt.amount){
        console.log("The Amount Requested Exceeds What's in Stock. \nPlease try again.");
        setTimeout(function(){ startApp(); }, 3000);        
      }
      else{
         var query = connection.query(
        "UPDATE products SET ?, ? WHERE ?",
          [
            {
              stock_quantity: remain
            },
            { product_sales: parseInt(results[prompt.toPurchase -1].price * prompt.amount) + parseInt(results[prompt.toPurchase -1].stock_quantity)
            },
            { id: prompt.toPurchase
            }],
    function(err, res) {
      var cost = results[prompt.toPurchase -1].price * prompt.amount;
      console.log("Thank You. Your total comes to: $" + cost);
    }
    );

      }

    });
	});


};

