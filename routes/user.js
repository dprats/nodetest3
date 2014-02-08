
/*
 * GET users listing.
 */

exports.userlist = function(db) {
  return function(req, res) {
    db.collection('userlist').find().toArray(function (err, items) {
      res.json(items);
    })
  }
};

/*
 * POST users listing.
 */

exports.adduser = function(db){
	return function(req,res){
		db.collection('userlist').insert(req.body, function(err,result){
			res.send(
				(err === null) ? {msg: ''} : {msg: err}
				);
		});

	}

};