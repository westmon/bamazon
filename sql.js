var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ice_creameDB'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 startApp();
 
});

function startApp(){
connection.query("SELECT * FROM products" function (error, results, fields) {
	for (var i = 0; i < results.length; i++){
		console.log(results[i].flavor + " is $" + results[i].price)
	}
});