export default function GameOver({ winner, onRestart }) {
 return (
  <div id="game-over">
   <h2>Game over!</h2>
   {winner && <p>{winner} Wins!</p>}
   {!winner && <p>It's a Draw!</p>}
   <button onClick={onRestart}>Rematch!</button>
  </div>
 );
}
