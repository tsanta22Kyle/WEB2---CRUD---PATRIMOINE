const e = require("express");
const cors = require("cors");
// import db from './db.js'
const db = require("./db");
const app = e();
app.use(cors());
const port = 3000;

var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.get("/", async (req, result) => {
  // res.send('HEllo WoRlD!')

  try {
    const res = await db.query("SELECT * FROM owner");
    result.json(res.rows);
  } catch (err) {
    console.log(err);
    result.status(500).send("Interval Server Error");
  }
});
app.get("/possession", async (req, result) => {
  try {
    const res = await db.query("SELECT * FROM possession ;");
    result.send(res.rows);
    // result.json(res.rows);
  } catch (err) {
    console.log(err);
    result.status(500).send("Interval server error");
  }
});

app.post("/possession", async (req, result) => {

  try {
    // console.log(req.body.email)
    db.query(
      `INSERT INTO possession VALUES(${req.body.possessionValue},'${
        req.body.owningDate
      }',null,${req.body.decreasingRate},'${req.body.email}',' ${
        req.body.possessionName
      } ','${crypto.randomUUID()}');`
    );
  } catch (error) {
    console.log(error);
  }
  // db.query( `INSERT INTO possession VALUES(${crypto.randomUUID()},'${}',2000000,'2024-08-25',null,5,1);` )
});

app.put("/possession/:id", async (req, res) => {
    try {
      const query =
        "UPDATE possession SET possessionName = $1, endDate = $2 WHERE owner_email = $3 AND possessionid = $4 RETURNING *";
      const values = [
        req.body.possessionNameNew, 
        req.body.endDate,           
        req.body.email,            
        req.body.possessionID,      
      ];
  
      const result = await db.query(query, values);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Record not found" });
      }
  
      res.json(result.rows[0]); // Return the updated record
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Database error" });
    }
  });
  app.delete("/possession/:id", async (request,response)=>{
    
    try{
        const values = [     
             request.params.id
    ]
        const query = `DELETE FROM possession WHERE  possessionid = $1 RETURNING * `
        const result = await db.query(query,values)

        // console.log("io fa mandeh")
        // console.log("io "+values[0])
        
      if (result.rowCount === 0) {
        return response.status(404).json({ error: "Record not found" });
      }
  
      res.json(result.rows[0]);

    }catch(error){
        console.error(error);
        
    }
  })

app.listen(port, () => {
  console.log(`My app listening on port ${port}`);
});
