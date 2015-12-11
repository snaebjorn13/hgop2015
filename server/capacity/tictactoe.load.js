var user  = require('../acceptance/tictactoe.fluidApi').user;
var given = require('../acceptance/tictactoe.fluidApi').given;

it('Should play 600 games in 9.5 seconds.', function (done) {
	// Got stable results for 600 games in 8 seconds, longest execution was 7.89
	// seonds. Changed timeout to 9.5 seconds which is roughly 20% higher.
	// Jenkins runs slower, so number of games was decreased to 500.
	var doneCount = 0;
	var gamesToPlay = 600;
	var x = 9.5;

	this.timeout(x * 1000);

	var QED = function () {
		if (gamesToPlay === ++doneCount) {
			done();
		}
	};

	for (var gameId = 0; gameId < gamesToPlay; gameId++) {
		/*
		play this game
		X places 0,0
		O places 1,0
		X places 1,1
		O places 0,1
		X places 2,2
		X wins
		*/
		var strGameId = '' + gameId;
		given(user('TestUserOne').createsGame(strGameId).allCommands())
			.and(user('TestUserTwo').joinsGame(strGameId).allCommands())
			.and(user('TestUserOne').makesMove(0, 0).inGame(strGameId).asSide('X').allCommands())
			.and(user('TestUserTwo').makesMove(1, 0).inGame(strGameId).asSide('O').allCommands())
			.and(user('TestUserOne').makesMove(1, 1).inGame(strGameId).asSide('X').allCommands())
			.and(user('TestUserTwo').makesMove(0, 1).inGame(strGameId).asSide('O').allCommands())
			.and(user('TestUserOne').makesMove(2, 2).inGame(strGameId).asSide('X').allCommands())
			.expect('GameWon').isOk(QED);
	}
});
