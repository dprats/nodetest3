/*
 * GET users listing.
 */exports.userlist=function(e){return function(t,n){e.collection("userlist").find().toArray(function(e,t){n.json(t)})}};exports.adduser=function(e){return function(t,n){e.collection("userlist").insert(t.body,function(e,t){n.send(e===null?{msg:""}:{msg:e})})}};