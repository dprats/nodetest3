/*
 * GET users listing.
 */exports.userlist=function(e){return function(t,n){e.collection("userlist").find().toArray(function(e,t){n.json(t)})}};