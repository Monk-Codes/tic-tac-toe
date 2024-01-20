import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
 const [pname, setPName] = useState(initialName);
 const [isEditing, setIsEditing] = useState(false);

 function handleEditClick() {
  setIsEditing((edit) => !edit);
  if (isEditing) {
   onChangeName(symbol, pname);
  }
 }
 function handleChange(e) {
  setPName(e.target.value);
 }

 let playerName = <span className="player-name">{pname}</span>;
 if (isEditing) {
  playerName = <input type="text" required value={pname} onChange={handleChange} />;
 }

 return (
  <li className={isActive ? "active" : undefined}>
   <span className="player">
    {playerName}
    <span className="player-symbol">{symbol}</span>
   </span>
   <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
  </li>
 );
}
