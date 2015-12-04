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
			userName:      'danni',
			otherUserName: 'jobbi',
			gameId:        '33',
			timeStamp:     '2015.11.29T19:49:22'
		}];
	});

	describe ('on fresh game', () => {
		it ('should make move', () => {
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

			JSON.stringify(actualEvents).should.be
				.exactly(JSON.stringify(then));
		});
	});

	describe('one previous move', () => {
		it ('should reject moves in occupied tile', () => {
			given.push({
				id:        '1213',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         0,
				y:         1,
				side:      'X',
				timeStamp: '2015.11.29T19:50:10'
			});

			when = {
				id:        '1214',
				comm:      'MakeMove',
				userName:  'jobbi',
				x:         0,
				y:         1,
				side:      'X',
				timeStamp: '2015.11.29T19:50:18'
			};

			then = [{
				id:        '1214',
				event:     'TileOccupied',
				userName:  'jobbi',
				gameId:    '33',
				x:         0,
				y:         1,
				side:      'X',
				timeStamp: '2015.11.29T19:50:18'
			}];

			const actualEvents = ticTacToeCommandHandler(given)
									.executeCommand(when);

			JSON.stringify(actualEvents).should.be
				.exactly(JSON.stringify(then));
		});
	});

});
