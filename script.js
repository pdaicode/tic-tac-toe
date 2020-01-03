const Gameboard = (() => {
	let grid = document.querySelector(".grid");
	let data = [];
	let reset = () => data = [];
	let set = (position, symbol) => data[position] = symbol;
	let getSymbol = (position) => data[position];
	let display = (...positions) => {
		while (grid.firstChild) {
			grid.removeChild(grid.firstChild);
		}

		for (let i = 0; i <= 8; ++i) {
			let cell = document.createElement("div");
			cell.id = i;
			cell.textContent = !data[i] ? " " : data[i];
			cell.addEventListener("click",
				e => gameController.play(+e.target.id));
			if (positions.includes(i)) {
				cell.classList.add("highlight");
			}

			grid.appendChild(cell);
		}

	}

	let getPossiblePositions = () => {
		let result = [];
		for (let i = 0; i <= 8; ++i) {
			if (!data[i]) {
				result.push(i);
			}
		}

		return result;
	}

	return { reset, set, getSymbol, display, getPossiblePositions, };
})();

const Player = (name, symbol) => {
	let move = (position) => {
		if (position >= 0 && position <= 8 &&
			!Gameboard.getSymbol(position)) {
			Gameboard.set(position, symbol);
			return true;
		}

		return false;
	}

	let win = () => {
		if (
			Gameboard.getSymbol(0) == symbol
			&& Gameboard.getSymbol(1) == symbol
			&& Gameboard.getSymbol(2) == symbol
		)
			return [0, 1, 2];
		if (
			Gameboard.getSymbol(3) == symbol
			&& Gameboard.getSymbol(4) == symbol
			&& Gameboard.getSymbol(5) == symbol
		)
			return [3, 4, 5];
		if (
			Gameboard.getSymbol(6) == symbol
			&& Gameboard.getSymbol(7) == symbol
			&& Gameboard.getSymbol(8) == symbol
		)
			return [6, 7, 8];
		if (
			Gameboard.getSymbol(0) == symbol
			&& Gameboard.getSymbol(3) == symbol
			&& Gameboard.getSymbol(6) == symbol
		)
			return [0, 3, 6];
		if (
			Gameboard.getSymbol(1) == symbol
			&& Gameboard.getSymbol(4) == symbol
			&& Gameboard.getSymbol(7) == symbol
		)
			return [1, 4, 7];
		if (
			Gameboard.getSymbol(2) == symbol
			&& Gameboard.getSymbol(5) == symbol
			&& Gameboard.getSymbol(8) == symbol
		)
			return [2, 5, 8];
		if (
			Gameboard.getSymbol(0) == symbol
			&& Gameboard.getSymbol(4) == symbol
			&& Gameboard.getSymbol(8) == symbol
		)
			return [0, 4, 8];
		if (
			Gameboard.getSymbol(2) == symbol
			&& Gameboard.getSymbol(4) == symbol
			&& Gameboard.getSymbol(6) == symbol
		)
			return [2, 4, 6];
		return false;
	}

	return { name, symbol, move, win, };
};

const gameController = (() => {
	let msg = document.querySelector("#msg");
	let playing;
	let turn;
	let total;
	let players = [Player("Player 1", "X"), Player("Player 2", "O")];
	let setup = () => {
		total = 0;
		playing = true;
		turn = Math.floor(Math.random()*2);
		displayTurn();
		Gameboard.reset();
		Gameboard.display();
	}

	let play = (position) => {
		if (!playing) {
			setup();
			return;
		}

		if (players[turn].move(position)) {
			total++;
			let win = players[turn].win();
			if (!win) {
				Gameboard.display();
				if (total == 9) {
					playing = false;
					displayDraw();
				} else {
					turn = (turn == 0) ? 1 : 0;
					displayTurn();
				}
			} else {
				Gameboard.display(...win);
				playing = false;
				displayWinner();
			}
		}
	}

	let displayTurn = () => msg.textContent = `${players[turn].name}'s Turn`;
	let displayWinner = () => msg.textContent = `${players[turn].name} Win!`;
	let displayDraw = () => msg.textContent = "Draw";
	return { setup, play, };
})();

gameController.setup();

