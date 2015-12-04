const ticTacToeCommandHandler = require('./ticTacToeCommandHandler');

describe('when make move', () => {
	var given, when, then;

	beforeEach(() => {
		given = [{
			id:        '4321',
			event:     'GameCreated',
			userName:  'jobbi',
			gameId:    '33',
			timeStamp: '2015.11.29T19:49:22'
		}, {
			id:            '4322',
			event:         'GameJoined',
			userName:      'jobbi',
			otherUserName: '',
			gameId:        '33',
			timeStamp:     '2015.11.29T19:49:22'
		}];
	});

	describe ('on fresh game', () => {
		it ('should join game', () => {
			when = {
				id:        '1212',
				comm:      'MakeMove',
				userName:  'jobbi',
				x:         0,
				y:         1,
				side:      'X',
				timeStamp: '2015.11.29T19:50:00'
			};
			then = [{
				id:        '1212',
				event:     'MoveMade',
				userName:  'jobbi',
				gameId:    '33',
				x:         0,
				y:         1,
				side:      'X',
				timeStamp: '2015.11.29T19:50:00'
			}];

			const actualEvents = ticTacToeCommandHandler(given)
									.executeCommand(when);

			JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
		});
	});
});
