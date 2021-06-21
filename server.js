const express = require("express");
const app = express();
// express middleware to parse req.body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

// get request to display index page
app.get("/", (req, res) => {
  res.send("index.html");
});


// A method to return a JSON object with the key “return_string” and a string containing every third letter from the original string
// (e.g.) If you POST {"string_to_cut": "iamyourlyftdriver"}, it will return: {"return_string": "muydv"}.
// assumption: 
//  1) input type is string (since it's being entered from html input form)
//  2) original string is longer than 3 letters (conditional added for post req later)

function cut_string(str) {
  let return_string = "";
  for (let i = 2; i < str.length; i += 3) {
    return_string += str[i];
  }
  return return_string;
}

// Accept a POST request to the route “/test”, which accepts one argument “string_to_cut”
app.post("/test", (req, res) => {
  const { string_to_cut } = req.body;

  if (string_to_cut.length >= 3) {
    res.send(`
    <html>
      <head><link rel="stylesheet" href="style.css"></head>
      <body class="result">
          <h2>Result: </h2>
          <h2>{"return_string": ${JSON.stringify(cut_string(string_to_cut))} }</h2>
      </body>
    </html>
    `
    );
  } else if (!string_to_cut) {
    res.status(400).send({ error: "The key 'string_to_cut' doesn't exist in your argument" })
  }
  else {
    res.status(400).send({ error: "Please enter more than 3 characters!" })
  }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
