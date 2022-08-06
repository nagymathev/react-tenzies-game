import './styles/style.css';
import DiceComp from './components/DiceComp'
import { useState, useEffect } from 'react'

function App() {

  const [won, setWon] = useState(false)
  const [dices, setDices] = useState(() => {
    let d = []
    for(let i = 0; i < 10; i++){
      d[i] = {
        number: Math.floor(Math.random() * 10),
        isSelected: false,
      }
    }
    return d
  })

  // function generateDices(){
  //   for(let i = 0; i < 10; i++){
  //     setDices(prevDices => [...prevDices, {
  //       number: Math.floor(Math.random() * 10),
  //       isSelected: false,
  //     }])
  //   }
  // }

  // useEffect(generateDices, [])
  
  function handleDiceClick(id) {
    setDices(prevDices => prevDices.map((d, index) => id === index ? { ...d, isSelected: !d.isSelected} : d))
  }

  function roll() {
    setDices(prevDices => prevDices.map(d => d.isSelected ? d : {...d, number: Math.floor(Math.random() * 10)}))
  }
  
  // console.log(dices)
  const dice_ = dices.map((d, index) => <DiceComp key={index} isSelected={d.isSelected} number={d.number} id={index} handleDiceClick={handleDiceClick} />)

  // Check if all the dices are the same at every re-render
  useEffect(() => {
    setWon(dices.every(checkDices))
  }, dices)

  function checkDices(d) {
    return dices[0].number === d.number && d.isSelected
  }

  function restart(){
    setDices(() => {
      let d = []
      for(let i = 0; i < 10; i++){
        d[i] = {
          number: Math.floor(Math.random() * 10),
          isSelected: false,
        }
      }
      return d
    })
  }

  return (
    <div className="App">
      <div className="gameCard">
        <div className="text">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className="dices">
          {dice_}
        </div>
        <button onClick={won ? restart : roll}>{won ? "You won! (Click to restart)" : "Roll"}</button>
      </div>
    </div>
  );
}

export default App;
