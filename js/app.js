import { createMatrix } from "./matrix.js";
import { revealNextCells, revealBombs } from "./revealCells.js";
import { renderGame } from "./render.js";
import { ableToggleTheme, formatTime } from "./utils.js";

function handleClick(event, matrix, row, col, bombQuantity) {
    let cell = event
        ? event.target
        : document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

    if (!cell.classList.contains("cover") || cell.innerHTML === "🚩" || endGame)
        return;

    if (placeFlags) {
        placeFlag(event);
        return;
    }

    cell.classList.remove("cover");

    const rowIndex = parseInt(cell.dataset.row);
    const colIndex = parseInt(cell.dataset.col);
    const cellValue = matrix[rowIndex][colIndex];

    revealedCells++;
    // if (revealedCells === matrix.length * matrix[0].length - bombQuantity) {
    //     endGame = true;
    //     console.log("Win");
    //     revealBombs(true);
    //     setTime(false);
    //     return;
    // }

    // if (cellValue === "x") {
    //     cell.innerHTML = "💣";
    //     endGame = true;
    //     setTimeout(() => {
    //         revealBombs(false);
    //     }, 800);
    //     setTime(false);
    //     return;
    // }

    checkEndGame(revealedCells, matrix, bombQuantity);

    cell.innerHTML = cellValue || "";

    if (cellValue === 0) {
        revealNextCells(matrix, rowIndex, colIndex, handleClick, bombQuantity);
    }
}

function checkEndGame(revealedCells, matrix, bombQuantity) {
    if (revealedCells === matrix.length * matrix[0].length - bombQuantity) {
        endGame = true;
        console.log("Win");
        revealBombs(true);
        setTime(false);
        return;
    }

    if (cellValue === "x") {
        cell.innerHTML = "💣";
        endGame = true;
        setTimeout(() => {
            revealBombs(false);
        }, 800);
        setTime(false);
        return;
    }
}

function placeFlag(event) {
    event.preventDefault();
    const cell = event.target;

    if (!cell.classList.contains("cover") || endGame) return;

    if (cell.classList.contains("flag")) {
        cell.classList.remove("flag");
        cell.innerHTML = "";
        return;
    }

    cell.classList.add("flag");
    cell.innerHTML = "🚩";
}

const flagToggleButton = document.getElementById("flag-toggle");
flagToggleButton.addEventListener("click", () => {
    placeFlags = !placeFlags;

    flagToggleButton.style.backgroundColor = placeFlags
        ? "var(--border-color)"
        : "transparent";
});

function setTime(start) {
    const timeContainer = document.getElementById("time");

    if (start) {
        clearInterval(timer);
        timer = setInterval(() => {
            time++;
            timeContainer.textContent = "Tempo de jogo: " + formatTime(time);
        }, 1000);
        return;
    }

    clearInterval(timer);
}

let endGame = false;
let placeFlags = false;
let time = 0;
let timer;
let revealedCells = 0;

function main() {
    const toggleButton = document.getElementById("theme-toggle");
    ableToggleTheme(toggleButton);

    const bombQuantity = 10;
    const matrix = createMatrix(16, 16, bombQuantity);

    const renderSpace = document.getElementById("render-space");
    renderGame(matrix, renderSpace, handleClick, placeFlag, bombQuantity);

    renderSpace.addEventListener("click", (event) => {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        handleClick(event, matrix, row, col, bombQuantity);
    });

    renderSpace.addEventListener("contextmenu", (event) => {
        placeFlag(event);
    });
}

main();
