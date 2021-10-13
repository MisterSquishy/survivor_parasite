const init = async () => {
  const survivorDataByName = await loadSurvivorData();
  const sortedTeams = Object.keys(TEAMS).sort((team1, team2) =>
    getTeamScore(team1, survivorDataByName) >
    getTeamScore(team2, survivorDataByName)
      ? -1
      : 1
  );
  sortedTeams.forEach(teamName => appendTeamRow(teamName, survivorDataByName))
  document.querySelector("#loading").hidden = true
  document.querySelector("table").hidden = false
};

const appendTeamRow = (teamName, survivorDataByName) => {
  const player1Name = TEAMS[teamName][0]
  const player2Name = TEAMS[teamName][1]
  const row = document.createElement("tr")

  const teamNameCol = document.createElement("td")
  teamNameCol.innerText = teamName
  row.appendChild(teamNameCol)

  const player1NameCol = document.createElement("td")
  player1NameCol.innerText = player1Name
  if (!survivorDataByName[player1Name].alive) {
    player1NameCol.innerText += " 😵"
  }
  row.appendChild(player1NameCol)

  const player1ScoreCol = document.createElement("td")
  player1ScoreCol.innerText = +survivorDataByName[player1Name].score
  row.appendChild(player1ScoreCol)

  const player2NameCol = document.createElement("td")
  player2NameCol.innerText = player2Name
  if (!survivorDataByName[player2Name].alive) {
    player2NameCol.innerText += " 😵"
  }
  row.appendChild(player2NameCol)

  const player2ScoreCol = document.createElement("td")
  player2ScoreCol.innerText = +survivorDataByName[player2Name].score
  row.appendChild(player2ScoreCol)

  const totalScoreCol = document.createElement("td")
  totalScoreCol.innerText = +survivorDataByName[player1Name].score + +survivorDataByName[player2Name].score
  row.appendChild(totalScoreCol)

  document.querySelector("tbody").appendChild(row)
}

const getTeamScore = (teamName, survivorDataByName) => {
  return (
    +survivorDataByName[TEAMS[teamName][0]].score +
    +survivorDataByName[TEAMS[teamName][1]].score
  );
};

const loadSurvivorData = async () => {
  const survivorHtmlJson = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      "https://www.fantasysurvivorgame.com/survivors/"
    )}`
  ).then((resp) => resp.json());
  var el = document.createElement("html");
  el.innerHTML = survivorHtmlJson.contents;

  const survivorDataByName = {};
  const names = Array.from(el.querySelectorAll("td:nth-child(1)")).map(
    (name) => name.innerText.trim()
  );
  const alives = Array.from(el.querySelectorAll("td:nth-child(1)")).map(
    (name) => name.querySelector("img.torch").alt.includes("lighted")
  );
  const scores = Array.from(el.querySelectorAll("td:nth-child(3)")).map(
    (score) => score.innerText.trim()
  );
  scores.forEach((score, i) => {
    survivorDataByName[names[i]] = { score, alive: alives[i] };
  });

  return survivorDataByName;
};