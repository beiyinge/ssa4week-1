var choiceArr = ["Rock", "Paper", "Scissors"];

function start() {
		var userChoice;
		var complete = false;
		do {
			var choice = prompt("Choose (R)ock, (P)aper or (S)cissors [e(X)it].").toUpperCase();
			console.log("choice=" + choice);
			switch(choice) {
				case "R":
						userChoice = 0;
						break;
				case "P":
						userChoice = 1;
						break;
				case "S":
						userChoice = 2;
						break;
				case "X":
						return;
				default:
					alert("Invalid choice.  Please choose R, P or S.");
					continue;
			}
			var computerChoice = Math.floor(Math.random()*3);
			console.log("computerChoice=" + computerChoice);
			// Special case for scissors lose against rock
			if(userChoice === 2 && computerChoice === 0) {
				updateResults("Computer chose " + getDisplay(computerChoice) +
						" and you chose " + getDisplay(userChoice) +
						". Sorry you lost!");
				complete = true;
			}
			else if(userChoice === 0 && computerChoice === 2) {
					updateResults("Computer chose " + getDisplay(computerChoice) +
							" and you chose " + getDisplay(userChoice) +
							". Congratulations you won!");
					complete = true;
			}
			else {
				if(userChoice > computerChoice) {
					updateResults("Computer chose " + getDisplay(computerChoice) +
							" and you chose " + getDisplay(userChoice) +
							". Congratulations you won!");
					complete = true;
				}
				else if(userChoice === computerChoice) {
					updateResults("Computer chose " + getDisplay(computerChoice) +
							" and you chose " + getDisplay(userChoice) +
							". You are tied, try again!");	
					alert("You tied, try again!");
					complete = false;
				}
				else {
					updateResults("Computer chose " + getDisplay(computerChoice) +
							" and you chose " + getDisplay(userChoice) +
							". Sorry you lost!");			
					complete = true;
				}
			}
		} while(! complete);
}

function getDisplay(value) {
	var n = parseInt(value);
	if(n >= choiceArr.length) {
		return("ERROR");
	}
	else {
		return(choiceArr[n]);
	}
}

function updateResults(resultsStr) {
	var elem = document.getElementById("results");
	elem.innerHTML = "<p>" + resultsStr + "</p>";
	elem.sizeToContent = true;
}
