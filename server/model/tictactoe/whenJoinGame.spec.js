const ticTacToeCommandHandler = require('./ticTacToeCommandHandler');

describe('join game command', () => {
	var given, when, then;

	it ('should join game', () => {
		given = [{
			id:        '1110',
			event:     'GameCreated',
			userName:  'gunnar',
			gameId:    '34',
			timeStamp: '2015.12.03T15:32:29'
		}];
		when = {
			id:            '1111',
			comm:          'JoinGame',
			userName:      'daniel',
			gameId:        '34',
			timeStamp:     '2015.12.03T15:34:10'
		};
		then = [{
			id:            '1111',
			event:         'GameJoined',
			userName:      'daniel',
			otherUserName: 'gunnar',
			gameId:        '34',
			timeStamp:     '2015.12.03T15:34:10'
		}];

		const actualEvents = ticTacToeCommandHandler(given)
								.executeCommand(when);

		JSON.stringify(actualEvents).should.be
			.exactly(JSON.stringify(then));
	});

	it ('should not be able to join non-existing game', () => {
		given = [];
		when = {
			id:            '1100',
			comm:          'JoinGame',
			userName:      'gudjon',
			gameId:        '97',
			timeStamp:     '2015.12.03T11:34:10'
		};
		then = [{
			id:        '1100',
			event:     'GameDoesNotExist',
			userName:  'gudjon',
			timeStamp: '2015.12.03T11:34:10'
		}];

		const actualEvents = ticTacToeCommandHandler(given)
								.executeCommand(when);

		JSON.stringify(actualEvents).should.be
			.exactly(JSON.stringify(then));
	});

	it ('should not be able to join a full game', () => {
		given = [{
			id:        '1001',
			event:     'GameCreated',
			userName:  'skeeter',
			gameId:    '87',
			timeStamp: '2015.12.04T08:40:12'
		}, {
			id:            '1002',
			event:         'GameJoined',
			userName:      'pooter',
			otherUserName: 'skeeter',
			gameId:        '87',
			timeStamp:     '2015.12.04T08:41:00'
		}];
		when = {
			id:        '1004',
			comm:      'JoinGame',
			userName:  'skadoodle',
			gameId:    '87',
			timeStamp: '2015.12.04T08:41:20'
		};
		then = [{
			id:        '1004',
			event:     'GameFull',
			userName:  'skadoodle',
			gameId:    '87',
			timeStamp: '2015.12.04T08:41:20'
		}];

		const actualEvents = ticTacToeCommandHandler(given)
								.executeCommand(when);

		JSON.stringify(actualEvents).should.be
			.exactly(JSON.stringify(then));
	});
});
