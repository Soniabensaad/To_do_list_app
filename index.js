const express = require ('express');
const app = express();
const cors = require('cors');

const pool = require("./db");
app.use(cors());
app.use(express.json());


//Get all Fastfood
app.get("/api/v1/fastfood", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM fastfood");
        const allTodosRatingData = await pool.query(
            "select * from fastfood left join (select fastfood_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by fastfood_id) reviews on fastfood.id = reviews.fastfood_id;"
            );
        console.log("allTodos",allTodos)
        console.log("allTodosRatingData",allTodosRatingData);
        res.json(allTodosRatingData.rows)
    } catch (err) {
        console.error(err.message);
        
    }
})

// Get one fastfood
app.get("/api/v1/fastfood/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const fastfoodQuery = await pool.query(
        "SELECT * FROM fastfood WHERE id = $1",
        [id]
      );
      const reviewsQuery = await pool.query(
        "SELECT * FROM reviews WHERE fastfood_id = $1",
        [id]
      );
  
      const fastfood = fastfoodQuery.rows[0];
      const reviews = reviewsQuery.rows;
  
      const data = {
        fastfood,
        reviews,
      };
  
      res.json(data);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server Error" });
    }
  });
  

app.get("/api/v1/fastfood/:id/reviews", () => {

})

// Create a new Fastfood
app.post("/api/v1/fastfood", async(req,res) => {
    try {
        const { name, location, price_range } = req.body;
        const newTodo = await pool.query(
           "INSERT INTO fastfood (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
        [name, location, price_range]
);
    res.json(newTodo.rows[0]);

    } catch (err) {
        console.log(err.message);
    }
});

// Update one Fastfood
app.put("/api/v1/fastfood/:id" , async(req,res) => {
    try {
        const { id } = req.params;
        const { name, location, price_range } = req.body;
        const updatedTodo = await pool.query(
           "UPDATE fastfood SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
        [name, location, price_range, id]
);
    res.json("fastfood Updated");

    } catch (err) {
        console.error(err.message);
    }
})


// Delete Fastfood
app.delete("/api/v1/fastfood/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await pool.query(
            "DELETE FROM fastfood WHERE id = $1", [id]);
        res.json("fastfood Deleted");
    } catch (err) {
        console.error(err.message);
        
    }
})

// Add Review
app.post("/api/v1/fastfood/:id/addReview", async (req,res) =>{
    try {
        const newReview = await pool.query(
            "INSERT INTO reviews (fastfood_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
            [req.params.id, req.body.name, req.body.review, req.body.rating]
          );
        res.json(newReview.rows[0]);
    } catch (err) {
        
    }
})


app.listen(5000, () => {
    console.log("server running on 5000");
});
