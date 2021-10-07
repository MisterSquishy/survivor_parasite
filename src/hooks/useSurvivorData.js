import { useCallback, useEffect, useState } from 'react'

const useSurvivorData = () => {
  const [survivorScores, setSurvivorScores] = useState({})

  const fetchSurvivorData = useCallback(async () => {
    const survivorHtmlJson = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.fantasysurvivorgame.com/survivors/')}`).then(resp => resp.json())
    var el = document.createElement('html')
    el.innerHTML = survivorHtmlJson.contents

    const survivorScores = {}
    const names = Array.from(el.querySelectorAll('td:nth-child(1)')).map(name => name.innerText.trim())
    const alives = Array.from(el.querySelectorAll('td:nth-child(1)')).map(name => name.querySelector("img.torch").alt.includes("lighted"))
    const scores = Array.from(el.querySelectorAll('td:nth-child(3)')).map(score => score.innerText.trim())
    scores.forEach((score, i) => {
      survivorScores[names[i]] = { score, alive: alives[i]}
    })

    setSurvivorScores(survivorScores)
  }, [setSurvivorScores])

  useEffect(() => fetchSurvivorData(), [fetchSurvivorData])

  return survivorScores
}

export default useSurvivorData