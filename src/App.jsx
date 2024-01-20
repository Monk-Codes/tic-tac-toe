import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WIN_COMBO } from "./WinCombo";
import { useState } from "react";
import GameOver from "./components/GameOver";
/////////////////////////////////////////
const initialGameBoard = [
 [null, null, null],
 [null, null, null],
 [null, null, null],
];
// helper function
function derivedActivePlayer(gameTurns) {
 let currentPlayer = "X";
 if (gameTurns.length > 0 && gameTurns[0].player === "X") {
  currentPlayer = "O";
 }
 return currentPlayer;
}
//------------------------//

function App() {
 const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
 const [gameTurns, setGameTurns] = useState([]);

 const activePlayer = derivedActivePlayer(gameTurns);
 //////////////gameboard///////////
 let gameBoard = [...initialGameBoard.map((array) => [...array])];
 for (const turn of gameTurns) {
  const { square, player } = turn;
  const { row, col } = square;
  gameBoard[row][col] = player;
 }
 ////////////////comboWinner//////////////
 let winner;
 for (const combo of WIN_COMBO) {
  const firstSqSymbol = gameBoard[combo[0].row][combo[0].col];
  const secondSqSymbol = gameBoard[combo[1].row][combo[1].col];
  const thirdSqSymbol = gameBoard[combo[2].row][combo[2].col];
  if (firstSqSymbol && firstSqSymbol === secondSqSymbol && firstSqSymbol === thirdSqSymbol) {
   winner = players[firstSqSymbol];
  }
 }
 const hasDraw = gameTurns.length === 9 && !winner;
 function handleSelectSq(rowIndex, colIndex) {
  setGameTurns((prevTurns) => {
   const currentPlayer = derivedActivePlayer(prevTurns);

   const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
   return updatedTurns;
  });
 }
 function handlePlayerNameChange(symbol, newName) {
  setPlayers((prevPlayers) => {
   return { ...prevPlayers, [symbol]: newName };
  });
 }

 function handleRestart() {
  setGameTurns([]);
 }
 /////////////////////////////////////
 return (
  <main>
   <div id="game-container">
    <ol id="players" className="highlight-player">
     <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
     <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
    </ol>
    {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
    <GameBoard onSelectSq={handleSelectSq} board={gameBoard} activePlayerSymbol={activePlayer} />
   </div>
   <Log turns={gameTurns} />
  </main>
 );
}

export default App;
