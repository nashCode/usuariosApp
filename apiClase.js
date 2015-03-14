var express   = require('express'),
    Bourne    = require('bourne'),
    bodyParser = require('body-parser'),
    db         = new Bourne('data.json'),
    router     = express.Router();


router
.use(function(req, res, next){
	if(!req.user){ 
		req.user = { id:1 };
		next();
	}	
})
.use(bodyParser.json())
.route('/usuario')
	.get(function(req, res){
		db.find( { userId: parseInt(req.user.id, 10)}, function (err, data){
			res.json(data);
		});		
	})
	.post(function(req, res){
		var usuario = req.body;
		usuario.userId = req.user.id;

		db.insert(usuario, function(err, data){
			res.json(data);
		});
	});

router.
	param('id', function(req,res,next){
		req.dbQuery = { id: parseInt(req.user.id, 10)}
	})
	.route('/usuario/:id')
		.get(function(req, res){
			db.findOne(req.dbQuery, function(err, data){
				res.json(data);
			});
		})
		.put(function(req, res){
			var usuario = req.body;
			delete usuario.$promise;
			delete usuario.$resolved;
			db.update(req.dbQuery, function(err, data){
				res.json(data[0]);
			});
		})
		.delete(function(req, res){
			db.delete(req.dbQuery,function(err, data){
				res.json(null);
			});
		});
module.exports = router;