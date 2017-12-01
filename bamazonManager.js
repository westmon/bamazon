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
// connection.query("SELECT * FROM products", function (error, results, fields) {
	inquirer.prompt([
		{
    	type: "list",
    	name: "options",
    	message: "Menu options, select one.",
    	choices: ["Products for sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  		}

		]).then(function(prompt) {
			
		if (prompt.options === "Products for sale"){
			function readProducts() {
  			connection.query("SELECT * FROM products", function(err, results) {
        console.log("\n");
   			for (var i = 0; i < results.length; i++){
			console.log("ID   " + results[i].id + "  Product:" + results[i].product_name + "     Category:" + results[i].department_name + "     Price:   " + results[i].price + "  Quantity in Stock: " + results[i].stock_quantity);
 		 }
     console.log("\n");
             startApp();
  		});

		}
		readProducts();
		// console.log(prompt.options[2]);
		}

			if (prompt.options === "View Low Inventory"){
				function lowStock(){
  			connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN 0 and 5", function(err, results) {
          console.log("\n");
   			for (var i = 0; i < results.length; i++){
			console.log("ID   " + results[i].id + "  Product:" + results[i].product_name + "     Category:" + results[i].department_name + "     Price:   " + results[i].price + "  Quantity in Stock: " + results[i].stock_quantity)
 		 }
       console.log("\n");
     startApp();
  		});

		}
			 	lowStock();
		}
			if(prompt.options === "Add to Inventory"){
    function addInventory(){
            inquirer.prompt([
          {
            type: "input",
            name: "lowItem",
            message: "Enter the item number to restock",
            validate: function(num) {
                      if (isNaN(num) || num < 1) {
                        return false;
                      } 

                      else {
                        return true;
                      }
                }
              },
                {   
                type: "input",
                name: "number",
                  message: "Please enter the amount you would like",
            validate: function(num) {
                      if (isNaN(num) || num < 1) {
                        return false;
                      } 

                      else {
                        return true;
                      }

                }
          }]).then(function(inv){

            connection.query("SELECT * FROM products", function(err, results) {
              var productName = results[inv.lowItem -1].product_name;
              var newStock = parseInt(inv.number) + parseInt(results[inv.lowItem -1].stock_quantity);

                connection.query("UPDATE products SET ? WHERE ?",[
      {
        stock_quantity: newStock
      },
      {
        product_name: productName
      }
    ],function(err, results) {

        console.log("\nYou now have: " + newStock + " of the product: " + productName +"\n");
         startApp();
        });
        
      });
    }); 

        };	
        addInventory();
};

        if (prompt.options === "Add New Product"){
      function addNew(){
            inquirer.prompt([
          {
            type: "input",
            name: "newItem",
            message: "Enter the name of the new item:"
                }
                ,
                {   
                type: "input",
                name: "dept",
                message: "Enter the department you would like this to be in:"
                },
                {
                  type: "input",
                  name: "stockAmount",
                  message: "Enter amount to stock:",
                  validate: function(num) {
                    if (isNaN(num) || num < 1) {
                    return false;
                      } 
                      else {
                        return true;
                      }
                }
              },
                {
                type: "input",
                name: "dollarAmt",
                message: "Enter sale price:",
                validate: function(num) {
                   if (isNaN(num) || num < 1) {
                  return false;
                      } 
                      else {
                        return true;
                      }
              }
          }]).then(function(inv){

            var query = connection.query(
            "INSERT INTO products SET ?",
           {
            product_name: inv.newItem,
            department_name: inv.dept,
            price: inv.dollarAmt,
            stock_quantity: inv.stockAmount 
            },
          function(err, res) {
          console.log("Items Added:" + inv.stockAmount + " Inventory Item: " + inv.newItem + " Individual Price: $" + inv.dollarAmt + " Department:" + inv.dept + "\n");
          startApp()

    }
  );


});

};
   addNew();
};


  

    // addNew();

});

};



