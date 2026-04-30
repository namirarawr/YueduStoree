const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//koneksi database
const db = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "my-secret-pw",
 database: "yuedustore"
});

db.connect(err =>{
 if(err) throw err;
 console.log("koneksi berhasil");
});

//Get products
app.get("/products", (req, res) =>{
 db.query("SELECT * FROM products", (err,result)=>{
  if (err) return res.send(err);
  res.json(result);
 });
});

//Add products
app.post("/products",(req, res)=>{
 const {name, price, stock} = req.body;

 db.query(
  "INSERT INTO products(name, price, stock) VALUES (?,?,?)",
  [name, price, stock],
  (err) => {
   if(err) return res.send(err);
   res.send("Produk berhasil masuk");
  }
 );
});

app.listen(5000, () => console.log("Server running on port 5000"));