const path = require('path')
const express = require('express');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const PORT = process.env.PORT || 8080;
const app = express();

let pw = process.env.pw 

//pw = pw || require('./secrets.js').pw


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); 

app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'daniel.sohval@gmail.com',
    pass: pw
  }
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public/programs.html'))
})

app.get("/programs", (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public/programs.html'))
})


app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public/contact.html'))
})

app.get("/sitemap", (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'sitemap.xml'))
})


// app.get("/signup", (req, res) => {
//   res.sendFile(path.join(__dirname, '.', 'public/sign-up.html'))
// })

app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'robots.txt'))
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

app.post("/hello", (req, res, next) => {
  const {
  	company,
  	fname,
  	lname,
  	email,
  	title,
    phone,
    interest
  } = req.body;


  const mail = {
    from: `daniel.sohval@gmail.com`, 
    to: 'daniel.sohval@gmail.com, kevin.a.fauzie@gmail.com',
    subject: `Savvy request from ${company}`,
    text: `${fname} ${lname}, a ${title} at ${company} is interested in Savvy. 
      Their email is ${email} and their phone is ${phone} 
      Their primary interest is ${interest}`
  };

  transporter.sendMail(mail, function(error, info){
    if (error) {
      next(error);
    } else {
      console.log('Email sent');
      res.sendFile(path.join(__dirname, '.', 'public/index.html'))
    }
  });

})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public/index.html'))
})





app.listen(PORT, () =>
	console.log(`Mixing it up on port ${PORT}`)
)
