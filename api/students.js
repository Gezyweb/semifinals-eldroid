const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const router = express.Router()

const db = mysql.createPool({
	host:process.env.DB_HOST,
	user:process.env.DB_USER,
	password:process.env.DB_PASSWORD,
	database:process.env.DB_NAME,
});


//create a route to retrieve data from database
router.get("/",(req,res)=>{
	let sql = "SELECT * FROM `students`"
	db.query(sql,(err,results,fields)=>{
		if(err){
			console.log({error:err});
			res.status(500).json(err);
		}
		res.status(200).json(results);
	});
});

module.exports = router
