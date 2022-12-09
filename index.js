const express = require("express");
const app = express();
const fs = require("fs");
const port = 5000;
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/scores", (req, res) => {
  let return_arrays = {};
  let scores = fs.readFileSync("./players.json");
  let scores_parsed = JSON.parse(scores);
  scores_parsed.sort((a, b) => b.score - a.score);
  var high_scores = JSON.parse(JSON.stringify(scores_parsed));
  high_scores = high_scores.slice(0, Math.min(5, high_scores.length));
  return_arrays.high_scores = high_scores;
  let online_players = scores_parsed.filter(
    (s) => Date.now() / 1000 - s.ts <= 20
  );
  return_arrays.online = online_players.slice(
    0,
    Math.min(5, online_players.length)
  );

  res.send(return_arrays);
});

app.post("/scores", (req, res) => {
  let success = 1;
  try {
    let body = req.body;
    let matrix = body.matrix;
    let name = body.name;
    let score = body.score;
    let scores = fs.readFileSync("./players.json");
    let scores_parsed = JSON.parse(scores);

    let high_score_user_index = scores_parsed.findIndex((s) => s.name == name);
    var arr;
    if (high_score_user_index != -1) {
      scores_parsed[high_score_user_index].score = Math.max(
        scores_parsed[high_score_user_index].score,
        score
      );
      scores_parsed[high_score_user_index].ts = Math.floor(Date.now() / 1000);
      scores_parsed[high_score_user_index].matrix = matrix;
      scores_parsed[high_score_user_index].latest_score = score;

      arr = [...scores_parsed];
    } else {
      arr = [
        ...scores_parsed,
        {
          name: name,
          score: score,
          ts: Math.floor(Date.now() / 1000),
          matrix: matrix,
          latest_score: score,
        },
      ];
    }
  } catch {
    success = 0;
  }

  if (success && arr.length) {
    fs.writeFileSync("./players.json", JSON.stringify(arr));
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
