const path = require('path')
const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));


// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get("/programs", (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public/programs.html'))
})

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public/contact.html'))
})

app.get("/team", (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public/team.html'))
})

app.get("/legal-stuff", (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public/privacy.html'))
})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public/index.html'))
})

app.post("/hello", (req, res) => {
  const {
  	company,
  	fname,
  	lname,
  	email,
  	title
  } = req.body;

  console.log(`${fname} ${lname}, a ${title} at ${company} wants to talk to Savvy. Email: ${email}`)
  res.sendFile(path.join(__dirname, '.', 'public/index.html'))
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public/index.html'))
})





app.listen(PORT, () =>
	console.log(`Mixing it up on port ${PORT}`)
)
