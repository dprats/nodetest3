/**
 * Module dependencies.
 */var express=require("express"),routes=require("./routes"),user=require("./routes/user"),http=require("http"),path=require("path"),mongo=require("mongoskin"),db=mongo.db(["localhost:27017/?auto_reconect"],{database:"nodetest3",safe:!0}),app=express();app.set("port",process.env.PORT||3e3);app.set("views",path.join(__dirname,"views"));app.set("view engine","jade");app.use(express.favicon());app.use(express.logger("dev"));app.use(express.json());app.use(express.urlencoded());app.use(express.methodOverride());app.use(app.router);app.use(express.static(path.join(__dirname,"public")));"development"==app.get("env")&&app.use(express.errorHandler());app.get("/",routes.index);app.get("/users",user.list);http.createServer(app).listen(app.get("port"),function(){console.log("Express server listening on port "+app.get("port"))});