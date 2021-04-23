// given an array of four players, return a round robin where each player plays with one another

function roundRobin(players) {
  let bracket = [];
  if (players.length % 2 === 0) {
    for (let i = 1; i < players.length; i++) {
      let pool = players.slice();
      let team1 = pool[0] + ', ' + pool[i];
      pool = pool.slice(1, i).concat(pool.slice(i+1));
      bracket.push([team1, pool.join(', ')]);
    }
  }
  return bracket;
}

function calculateHandicaps(scoresObject) {
  /*
    Sample input data:
    scoresObject: {
      game1: {
        teams: [AB, CD],
        score: [21, 18]
      },
      game2: {
        teams: [AC. BD],
        score: [21, 12]
      },
      game3: {
        teams: [AD, BC],
        score: [21, 16]
      },
    }

    { game1: teamA: [A, B]
             teamB: [C, D]
             score: [21, 18]}
  */

    // create a playerStats object
    let playerStats = {};
    // iterate through each game in the scoresObject (for - in loop)
    for (var game in scoresObject) {
      var thisGame = scoresObject[game];
      var teamAplayers = scoresObject[game].teams[0].split(', ');
      var teamBplayers = scoresObject[game].teams[1].split(', ');
      scoresObject[game].teamA = teamAplayers;
      scoresObject[game].teamB = teamBplayers;

      const teamA = scoresObject[game].teamA;
      const teamB = scoresObject[game].teamB;

      // team A players
      for (let a = 0; a < teamA.length; a++) {
        let player = teamA[a];
        if (!playerStats[player]) {
          playerStats[player] = {
            gamesPlayed: 0,
            totalPointsFor: 0,
            totalPointsAgainst: 0,
            wins: 0,
            losses: 0,
            handicap: null
          };
        }

        playerStats[player].gamesPlayed++;
        playerStats[player].totalPointsFor += thisGame.score[0];
        playerStats[player].totalPointsAgainst += thisGame.score[1];
        if (thisGame.score[0] > thisGame.score[1]) {
          playerStats[player].wins++;
        } else {
          playerStats[player].losses++;
        }
      }

      // team B players
      for (let b = 0; b < teamB.length; b++) {
        let player = teamB[b];
        if (!playerStats[player]) {
          playerStats[player] = {
            gamesPlayed: 0,
            totalPointsFor: 0,
            totalPointsAgainst: 0,
            wins: 0,
            losses: 0,
            handicap: null
          };
        }

        playerStats[player].gamesPlayed++;
        playerStats[player].totalPointsFor += thisGame.score[1];
        playerStats[player].totalPointsAgainst += thisGame.score[0];
        if (thisGame.score[1] > thisGame.score[0]) {
          playerStats[player].wins++;
        } else {
          playerStats[player].losses++;
        }
      }
    }

    for (let player in playerStats) {
      let { totalPointsFor, totalPointsAgainst, gamesPlayed } = playerStats[player];
      playerStats[player].handicap = Math.round((totalPointsAgainst - totalPointsFor) / gamesPlayed);
      if (playerStats[player].handicap >= 0) {
        playerStats[player].handicap = `+${playerStats[player].handicap}`;
      } else {
        playerStats[player].handicap = `${playerStats[player].handicap}`;
      }
    }

    return playerStats;

      // iterate through teamA array
        // if there is already a key for that player, increment games played
        // if there is NOT already a key, create one and set games played to 1, total points for to 0, total points against to 0,handicap to null, wins to 0, losses to 0,

        // add score[0] to total points for
        // add score[0] to total points against

        // if score[0] > score[1], increment wins
           // else increment losses

      // iterate through teamB array doing the same but switched for score[0] and score[1]


    // iterate through playersStats array, calculating handicap (TPF - TPA / GP)
}

console.log('2v2RoundRobin: ', roundRobin(["Scott", "Hobie", "Taylor", "Graham"]));

console.log('calculateHandicaps: ', calculateHandicaps({
  game1: {
    teams: ["Scott, Hobie", "Taylor, Graham"],
    score: [21, 18]
  },
  game2: {
    teams: ["Scott, Taylor", "Hobie, Graham"],
    score: [21, 12]
  },
  game3: {
    teams: ["Scott, Graham", "Taylor, Hobie"],
    score: [21, 16]
  },
}));