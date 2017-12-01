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
	inquirer.prompt([
		{
    	type: "list",
    	name: "options",
    	message: "Menu options, select one.",
    	choices: ["View Product Sales by Department", "Create New Department"]
  		}

		]).then(function(prompt) {
			if (prompt.options === "View Product Sales by Department"){
				var depts = connection.query("SELECT DISTINCT department_name FROM products ORDER BY department_name;", function(err, results) {
					for (var i = 0; i < results.length; i++) {
						results[i]
					
					console.log(results[i].product_name);
				};
				});
				console.log()
				inquirer.prompt([
					{
    				type: "list",
    				name: "departments",
    				message: "Select Department",
    				choices: ["View Product Sales by Department", "Create New Department"]
  					}

		]).then(function(prompt) {

		});
			};

		});

};

