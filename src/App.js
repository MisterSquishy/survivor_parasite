import { useEffect, useState } from 'react'
import useSurvivorData from './hooks/useSurvivorData'
import teams from './data/teams'

const App = () => {
  const survivorScores = useSurvivorData()
  const [teamScores, setTeamScores] = useState({})

  console.log(survivorScores)

  useEffect(() => {
    const teamScores = {}
    Object.keys(teams).forEach(teamName => teamScores[teamName] = +survivorScores[teams[teamName][0]] + +survivorScores[teams[teamName][1]])
    setTeamScores(teamScores)
  }, [survivorScores])

  if (!teamScores) {
    return <div>Fuck</div>
  }

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>
              Team name
            </th>
            <th>
              Player 1 name
            </th>
            <th>
              Player 1 score
            </th>
            <th>
              Playaer 2 name
            </th>
            <th>
              Player 2 score
            </th>
            <th>
              Total score
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(teams)
            .sort((teamName1, teamName2) => teamScores[teamName1] < teamScores[teamName2] ? 1 : -1)
            .map(teamName => (
              <tr key={teamName}>
                <td>{teamName}</td>
                <td>{teams[teamName][0]}</td>
                <td>{+survivorScores[teams[teamName][0]]}</td>
                <td>{teams[teamName][1]}</td>
                <td>{+survivorScores[teams[teamName][1]]}</td>
                <td>{teamScores[teamName]}</td>
              </tr>)
            )}

        </tbody>
      </table>
    </div>
  );
}

export default App;
