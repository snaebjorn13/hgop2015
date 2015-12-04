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

	describe('vertical winning scenarios', () => {
		it ('X should win when placed in 0,0 - 0,1 - 0,2', () => {
			given = given.concat([{
				id:        '1250',
				event:     'MoveMade',
				userName:  'jobbi',
				gameId:    '33',
				x:         0,
				y:         0,
				side:      'X',
				timeStamp: '2015.11.29T19:50:55'
			}, {
				id:        '1251',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         1,
				y:         0,
				side:      'O',
				timeStamp: '2015.11.29T19:51:02'
			}, {
				id:        '1252',
				event:     'MoveMade',
				userName:  'jobbi',
				gameId:    '33',
				x:         0,
				y:         1,
				side:      'X',
				timeStamp: '2015.11.29T19:51:10'
			}, {
				id:        '1253',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         1,
				y:         1,
				side:      'O',
				timeStamp: '2015.11.29T19:51:15'
			}]);

			when = {
				id:        '1254',
				comm:      'MakeMove',
				userName:  'jobbi',
				gameId:    '33',
				x:         0,
				y:         2,
				side:      'X',
				timeStamp: '2015.11.29T19:51:25'
			};

			then = [{
				id:        '1254',
				event:     'MoveMade',
				userName:  'jobbi',
				gameId:    '33',
				x:         0,
				y:         2,
				side:      'X',
				timeStamp: '2015.11.29T19:51:25'
			}, {
				id:        '1254',
				event:     'GameWon',
				userName:  'jobbi',
				gameId:    '33',
				side:      'X',
				timeStamp: '2015.11.29T19:51:25'
			}];

			const actualEvents = ticTacToeCommandHandler(given)
									.executeCommand(when);

			JSON.stringify(actualEvents).should.be
				.exactly(JSON.stringify(then));
		});
	});

});
