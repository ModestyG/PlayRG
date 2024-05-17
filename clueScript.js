clueContainer = document.getElementById("clue-container-div");

gameManager.clues.forEach((clue) => {
  if (!gameManager.openedClues.includes(clue)) {
    clueContainer.appendChild(clue.div);
    clue.button.classList.add("add-clue-button");
    clue.button.innerHTML = "<i class='fa-solid fa-plus'></i>";
    clue.button.onclick = () => {
      gameManager.addOpenClue(clue);
    };
  }
});
