var boardSize = 0;
var totalCells = 0;
var boardContents = "";

function newGame(boardSize, totalCells, boardContents) {
	if(boardSize < 6) {
		boardSize = 6;
	}
	if(boardSize > 12) {
		boardSize = 12;
	}
	totalCells = boardSize * boardSize;
	for(var i = 0; i < totalCells; i++) {
		if((i / boardSize) % 1 === 0) {
			boardContents += "<br>";
		}
		boardContents += "<div class=\"square\" onclick=\"uncoverSquare(" + i + ")\" id=\"" + i + "\"></div>";
	}
	document.getElementById('board').innerHTML = boardContents;
}

function uncoverSquare(i) {
	alert(i);
}
