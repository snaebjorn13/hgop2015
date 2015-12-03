const ticTacToeCommandHandler = require('./ticTacToeCommandHandler');

describe('join game command', function () {
	var given, when, then;

	it ('should join game', () => {
		given = [{
			id:        '1110',
			comm:      'GameCreated',
			userName:  'gunnar',
			name:      'AnotherGame',
			timeStamp: '2015.12.03T15:32:29'
		}];
		when = {
			id:            '1111',
			comm:          'JoinGame',
			userName:      'daniel',
			otherUserName: 'gunnar',
			timeStamp:     '2015.12.03T15:34:10'
		};
		then = [{
			id:            '1111',
			event:         'GameJoined',
			userName:      'daniel',
			otherUserName: 'gunnar',
			timeStamp:     '2015.12.03T15:34:10'
		}];

		var actualEvents = ticTacToeCommandHandler(given)
							.executeCommand(when);

		JSON.stringify(actualEvents).should.be
			.exactly(JSON.stringify(then));
	});
});
