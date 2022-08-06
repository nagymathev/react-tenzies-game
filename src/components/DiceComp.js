import '../styles/style.css'

export default function DiceComp({isSelected, number, handleDiceClick, id }) {
    return(
        <div className={`dice ${isSelected ? "isSelected" : ""}`} onClick={() => handleDiceClick(id)}>
            <h3>{number}</h3>
        </div>
    )
}