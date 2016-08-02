var choiceArr = ["Rock", "Paper", "Scissors"];

function start() {
		var userChoice;
		var complete = false;
		do {
			//var choice = prompt("Choose (R)ock, (P)aper or (S)cissors [e(X)it].").toUpperCase();
			// Use DOM to get Input Value
			var choice = document.getElementById("choice").value.toUpperCase();
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

function domPrompt(msg) {
		// create a div statement
		// set content of div element to msg
		var div = document.createElement("div");
		div.innerHTML = "<p>" + msg + "</p>";
		document.body.appendChild(div);	
}

function domAlert(msg) {
		var div = document.createElement("div");
		div.innerHTML = "<p>" + msg + "</p>";
		div.className = "alert_class";
		document.body.appendChild(div);	
}

function updateResults(resultsStr) {
	var elem = document.getElementById("results");
	elem.innerHTML = "<p>" + resultsStr + "</p>";
}
