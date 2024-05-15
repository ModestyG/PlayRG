clueContainer = document.getElementById("clue-container-div");

gameManager.clues.forEach((clue) => {
  if (!gameManager.openedClues.includes(clue)) {
    clueContainer.appendChild(clue.element);
    plusButton = document.createElement("button");
    plusButton.classList.add("clue-button");
    plusButton.classList.add("add-clue-button");
    plusButton.style.top = `${clue.height - 32}px`;
    plusButton.innerHTML = "<i class='fa-solid fa-plus'></i>";
    plusButton.onclick = () => {
      gameManager.addOpenClue(clue);
    };
    clue.element.appendChild(plusButton);
  }
});
