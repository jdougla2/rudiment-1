const express = require('express');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');

const app = express();
var config = {
	host: 'localhost',
	user: 'workshopdude',
	password: 'ru]:6jyt/?}MP5~Y',
	database: 'workshop',
};

var pool = new Pool(config);

app.set('port', (8080));

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

//app.listen(8080);

app.get('/api', async (req, res) => {
	console.log(req.body);
	var workshop = req.query.workshop;
	if(workshop) {
		try{
			console.log("Test");
			var isAWorkshop = await pool.query('select * from workshops where wsname = $1', [workshop]);
			console.log(isAWorkshop.rows.length);
			if(isAWorkshop.rows.length === 0){
				console.log("Not a valid workshop");
				res.json({error: 'Not a valid workshop'});
			} else {
				var response = await pool.query('select * from attendees where workshop = $1', [workshop]);
				//res.json (response.rows);
				var ary = [];
				for(var i=0; i < response.rows.length; i++){
					var obj = response.rows[i];
					ary[i]= obj.attendee;
					console.log(obj.attendee);
				}
				res.json({attendees: ary});	
			}	
		} catch(e) {
			console.error('Error running query' + e);
		}
	} else {
		try{
			var response = await pool.query('select wsname from workshops');
			var ary = [];
			for(var i=0; i < response.rows.length; i++){
				var obj = response.rows[i];
				ary[i]= obj.wsname;
				console.log(obj.wsname);
			}
			res.json({workshops: ary});
			//res.json (response.rows);
		} catch(e) {
			console.error('Error running query ' + e);
		}
	}
});
//let userlist = response.rows.map(function(row) {
// return row.attendees;
// }
// 	)
app.post('/api', async (req, res) => {
	console.log(req.body);
	var attendee = req.body.attendee;
	var workshop = req.body.workshop;
	if (!attendee || !workshop){
		res.json({error: 'parameter not given'});
	} else {
		var newWorkshop = await pool.query('select * from workshops where wsname = $1', [workshop]);
		if(newWorkshop.rows.length === 0){
			newWorkshop = await pool.query('insert into workshops values ($1)', [workshop]);
		}	
		var contains = await pool.query('select * from attendees where attendee = $1 and workshop = $2', [attendee, workshop])
		console.log(contains.rows.length);
		if(contains.rows.length === 0){
			try{ 
				var response = await pool.query('insert into attendees values ($1, $2)', [attendee, workshop]);
				console.log(response.rows);
				contains = await pool.query('select * from attendees where attendee = $1 and workshop = $2', [attendee, workshop])
				res.json(contains.rows);
			} catch(e) {
				console.log('Error running insert', e);
				res.json({error: 'something has gone wrong'});
			}
		} else {
			//console.log("Its the second boy");
			res.json({error: 'attendee already enrolled'});
		}
	}
});

app.listen(app.get('port'), () => {
	console.log('Running');
})
