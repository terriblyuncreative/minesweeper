var boardSize;
var totalCells;
var boardContents;
var numberBombs;
var bombLocations = [];
var suspectLocations = [];
var numberUncovered;

function newGame(boardSize) {
	totalCells = 0;
	boardContents = "";
	bombLocations = [];
	numberBombs = 0;
	suspectLocations = [];
	numberUncovered = 0;
	if(boardSize < 6) {
		boardSize = 6;
	}
	if(boardSize > 12) {
		boardSize = 12;
	}
	totalCells = boardSize * boardSize;
	bombLocations = getBombLocations(totalCells);
	for(var i = 0; i < totalCells; i++) {
		if((i / boardSize) % 1 === 0) {
			boardContents += "<br>";
		}
		boardContents += "<div class=\"square covered\" oncontextmenu=\"markSuspect(" + i + "); return false\" onclick=\"uncoverSquare(" + i + ", " + boardSize + ", " + totalCells + ")\" id=\"" + i + "\">" + i + "</div>";
	}
	var instructions = "<p>You have to find " + bombLocations.length + " bombs!</p><p>Left-click to uncover a square, right-click to mark/unmark suspected squares.</p>";
	document.getElementById('instructions2').innerHTML = instructions;
	document.getElementById('board').innerHTML = boardContents;
	document.getElementById('victory').innerHTML = "";	
}

function getBombLocations(totalCells) {
	numberBombs = Math.round(totalCells * .16);
	while(bombLocations.length <= numberBombs) {
		var randomNumber = Math.ceil(Math.random() * (totalCells - 1));
		var found = false;
		for(var j = 0; j < bombLocations.length; j++) {
			if(bombLocations[j] == randomNumber) {
				found = true;
				break;
			}
		}
		if(!found) {
			bombLocations[bombLocations.length] = randomNumber;
		}
	}
	return bombLocations;
}

function markSuspect(p) {
	if(suspectLocations.indexOf(p) >= 0) {
		document.getElementById(p).classList.remove('suspected');
		suspectLocations.splice(suspectLocations.indexOf(p), 1);
	} else {
		document.getElementById(p).classList.add('suspected');
		suspectLocations.push(p);
	}
}

function uncoverSquare(i, boardSize, totalCells) {
	var warning = 0;
	var topleft = i - boardSize - 1;
	var topcenter = i - boardSize;
	var topright = i - boardSize + 1;
	var left = i - 1;
	var right = i + 1;
	var bottomleft = i + boardSize - 1;
	var bottomcenter = i + boardSize;
	var bottomright = i + boardSize + 1;
	
	numberUncovered++;
	
	if((i / boardSize) % 1 === 0) {
		topleft = -1;
		left = -1;
		bottomleft = -1;
	}
	if(((i + 1) / boardSize) % 1 === 0) {
		topright = -1;
		right = -1;
		bottomright = -1;
	}
	
	for(var m = 0; m < bombLocations.length; m++) {
		if(topleft == bombLocations[m]) {
			warning++;
		}
		if(topcenter == bombLocations[m]) {
			warning++;
		}
		if(topright == bombLocations[m]) {
			warning++;
		}
		if(left == bombLocations[m]) {
			warning++;
		}
		if(right == bombLocations[m]) {
			warning++;
		}
		if(bottomleft == bombLocations[m]) {
			warning++;
		}
		if(bottomcenter == bombLocations[m]) {
			warning++;
		}
		if(bottomright == bombLocations[m]) {
			warning++;
		}
	}
	
	for(var k = 0; k < bombLocations.length; k++) {
		if(i == bombLocations[k]) {
			for(var n = 0; n < totalCells; n++) {
				document.getElementById(n).classList.remove('covered');
				document.getElementById(n).classList.add('uncovered');
			}
			for(var o = 0; o < bombLocations.length; o++) {
				console.log("o = " + bombLocations[o]);
				document.getElementById(bombLocations[o]).classList.add('detonated');
			}
			document.getElementById('victory').innerHTML = "<h2>FAILURE</h2><p class=\"blink\">You suck!</p>";
		} else {
			document.getElementById(i).classList.remove('covered');
			document.getElementById(i).classList.add('uncovered');
			document.getElementById(i).innerHTML = warning;
			if(warning > 0) {
				document.getElementById(i).classList.add('warning');
			}
			if(numberUncovered == (totalCells - bombLocations.length)) {
				document.getElementById('victory').innerHTML = "<h2>VICTORY!!!</h2>";
			}
		}
	}
}







