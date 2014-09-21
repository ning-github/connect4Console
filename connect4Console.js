////////	MAIN GAME    //////////
var playConnectFour=function(){
	////////    DRAW BOARD    /////////

	var board=[];
	var rowNum=6;	//6 rows
	var colNum=7;	//7 columns 

	var totalMovesLeft=rowNum*colNum;

	console.log("total moves LEFT: "+totalMovesLeft);

	for (var row=0;row<rowNum;row++){
		var inners=new Array(colNum);	//makes columns
		board.push(inners);
	}

	//fills board with blank underscores
	for (var row=0;row<rowNum;row++)	{
		for (var col=0;col<colNum;col++){
			board[row][col]="_";
		}
	}

	//print board row by row
	console.log("  1    2    3    4    5    6    7 ");
	for (var row=0;row<rowNum;row++){
		console.log(board[row]);
	}

	/////   PLAY FUNCTION    //////
	var play=function(color){
		console.log("moves left: " +totalMovesLeft);
		var move=prompt("what column are you dropping your " + color + " checker in?");

		//to exit game right away
		if (move=="Q"){
			alert("Play aborted!");
			totalMovesLeft=0;
			return 0;	//won't clutter stack with invalid input
		}
		//to reset game
		if (move=="R"){
			alert("Game reset!");
			playConnectFour();
			return 0;	//won't clutter stack with invalid input
		}

		//validation for if input is within columns
		if ((move<0)||(move>7)){
			alert("That's not a column! Try again!");
			play(color);
			return 0;	//won't clutter stack with invalid input
		}

		//adjustCol accounts for 0 index to allow human move reflected
		var adjustCol=move-1;

		//a little trickier to select the row in the move
		//--needs to check that there is no empty row below it
		//  before it places the checker

		var adjustRow=0;

		for (var row=0;row<rowNum;row++){
			if (board[row][adjustCol]==="_"){
				adjustRow=row; //overriding assignment as it moves down col
			}
		}

		console.log("adjustrow: " +adjustRow);

		//validation for full columns or submitting empty input
		if (board[adjustRow][adjustCol]!="_"){
			alert("Invalid! Try again!");
			play(color);
			return 0;	//won't clutter stack with invalid input
		}

		//places the dropped checker, depending on user column choice
		board[adjustRow][adjustCol]=color;

		//checking for a connect 4
		/////////////////////////	VERTICAL CHECK    ///////////////////////////////////////
		var fourCheckVert=1;

		var distFromBottom = rowNum-1-adjustRow; //ex) index 2 has 3 rows to check below
		var distFromTop=adjustRow;	//index 2  has a 2 rows to check above

		//check below vert
		for (var check=1;check<=distFromBottom;check++){
			if (distFromBottom>0){	//will only check below if not already on last row
				if (board[adjustRow+check][adjustCol]==color){
					fourCheckVert++;
					console.log("fourCheckVert: "+fourCheckVert);
				}
				else	{
					console.log("fourCheckVert: "+fourCheckVert);
					break;	//stops checking further down if row directly below doesnt match
				}
			}
		}

		//check above vert
		for (var check=1;check<=distFromTop;check++){
			if (distFromTop>0){	//will only check below if not already on first row
				if (board[adjustRow-check][adjustCol]==color){
					fourCheckVert++;
					console.log("fourCheckVert: "+fourCheckVert);
				}
				else	{
					console.log("fourCheckVert: "+fourCheckVert);
					break;	//stops checking further down if row directly below doesnt match
				}
			}
		}

		/////////////// 	HORIZONTAL CHECK    ////////////////////////////

		var fourCheckHor=1;

		var distFromRight = colNum-1-adjustCol; //ex) index 2 has 3 rows to check below
		var distFromLeft=adjustCol;	//index 2  has a 2 rows to check above

		// //check right horizontal
		for (var check=1;check<=distFromRight;check++){
			if (distFromRight>0){	//will only check below if not already on last col
				if (board[adjustRow][adjustCol+check]==color){
					fourCheckHor++;
					console.log("fourCheckHor: "+fourCheckHor);
				}
				else	{
					console.log("fourCheckHor: "+fourCheckHor);
					break;	//stops checking further right if direct neighbor doesnt match
				}
			}
		}

		//check left horizontal
		for (var check=1;check<=distFromLeft;check++){
			if (distFromLeft>0){	//will only check below if not already on last col
				if (board[adjustRow][adjustCol-check]==color){
					fourCheckHor++;
					console.log("fourCheckHor: "+fourCheckHor);
				}
				else	{
					console.log("fourCheckHor: "+fourCheckHor);
					break;	//stops checking further right if direct neighbor doesnt match
				}
			}
		}

		/////////////// 	DIAGONAL CHECK (top left to bottom right)   ////////////////////////////

		var fourCheckDiagSlopeR=1;
		

		//check the bottom-right
		for (var check=1;check<=distFromBottom;check++){
			if (distFromBottom>0){	//will only check below if not already on last col
				if (board[adjustRow+check][adjustCol+check]==color){			//NOTE the +shift for both row and col, 
					fourCheckDiagSlopeR++;										//	moves it down and right
					console.log("fourCheckDiagSlopeR: "+fourCheckDiagSlopeR);	// IMPT: the reason you don't need to do
				}																// 	a loop for the side bounds(horizontally)
				else	{														// 	is because if something can no longer move up or down
					console.log("fourCheckDiagSlopeR: "+fourCheckDiagSlopeR);	// 	then it cannot move diagonally anymore anyway, so a 
																				//	a side shift can't happen after the top/bottom limit	
					break;	//stops checking further right if direct neighbor doesnt match
				}
			}
		}

		//check the top-left
		for (var check=1;check<=distFromTop;check++){
			if (distFromTop>0){	//will only check below if not already on last col
				if (board[adjustRow-check][adjustCol-check]==color){	//NOTE the minus shift for both row and col, moves it up and left
					fourCheckDiagSlopeR++;
					console.log("fourCheckDiagSlopeR: "+fourCheckDiagSlopeR);
				}
				else	{
					console.log("fourCheckDiagSlopeR: "+fourCheckDiagSlopeR);
					break;	//stops checking further right if direct neighbor doesnt match
				}
			}
		}

	/////////////// 	DIAGONAL CHECK (   top right to bottom left  )      ////////////////////////////

		var fourCheckDiagSlopeL=1;
		
		//check the bottom-left
		for (var check=1;check<=distFromBottom;check++){
			if (distFromBottom>0){	//will only check below if not already on last col
				if (board[adjustRow+check][adjustCol-check]==color){			//NOTE the + for row (down) and - for col (left), 
					fourCheckDiagSlopeL++;										//	moves it down and right
					console.log("fourCheckDiagSlopeL: "+fourCheckDiagSlopeL);	// IMPT: the reason you don't need to do
				}																// 	a loop for the side bounds(horizontally)
				else	{														// 	is because if something can no longer move up or down
					console.log("fourCheckDiagSlopeL: "+fourCheckDiagSlopeL);	// 	then it cannot move diagonally anymore anyway, so a 
																				//	a side shift can't happen after the top/bottom limit	
					break;	//stops checking further right if direct neighbor doesnt match
				}
			}
		}

		//check the top-right
		for (var check=1;check<=distFromTop;check++){
			if (distFromTop>0){	//will only check below if not already on last col
				if (board[adjustRow-check][adjustCol+check]==color){	//NOTE the minus shift for both row and col, moves it up and left
					fourCheckDiagSlopeL++;
					console.log("fourCheckDiagSlopeL: "+fourCheckDiagSlopeL);
				}
				else	{
					console.log("fourCheckDiagSlopeL: "+fourCheckDiagSlopeL);
					break;	//stops checking further right if direct neighbor doesnt match
				}
			}
		}

	//////////////////////////////////////////////////////////////

		//display the board including the move the player just made
		console.log("  1    2    3    4    5    6    7 ");
		for (var row=0;row<rowNum;row++){
			console.log(board[row]);
		}

		//one space closer to a full board and a game over
		totalMovesLeft--;

		//check for win
		if ((fourCheckVert>=4) || (fourCheckHor>=4) || (fourCheckDiagSlopeR>=4) || (fourCheckDiagSlopeL>=4)){
			console.log(color +" Player WINS!");
			totalMovesLeft=0;
		}
		else if (totalMovesLeft==0){
			console.log("TIE GAME!!");	
		};
	}	//end PLAY FUNCTION


	///////////		LOOP THROUGH TURN GAMEPLAY	/////////////////////
	// 	- plays until someone wins or all spaces are filled
	while(totalMovesLeft>0)	{

		//player 1 move
		play("X");
			
	    //if player 1's move won it
		if (totalMovesLeft==0){
			break;
		}

		//player 2 move
		play("O");
	};

	//replay function
	var checkReplay=function(){
		if (totalMovesLeft==0){
			var playAgain=prompt("Play again? Y/N");
			if (playAgain=="Y"){
				playConnectFour();
			}
			else if (playAgain=="N")	{
				alert("Goodbye!");
			}
			else{
				alert("Entry invalid. Has to be Y or N");
				checkReplay();
			};
		};
	};

	checkReplay();
};

//commence game
playConnectFour();
