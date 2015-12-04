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

	describe('horizontal winning scenarios', () => {
		it ('O should win when placed in 0,0 - 1,0 - 2,0', () => {
			given = given.concat([{
				id:        '1337',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         0,
				y:         1,
				side:      'X',
				timeStamp: '2015.11.29T19:50:02'
			}, {
				id:        '1338',
				event:     'MoveMade',
				userName:  'jobbi',
				gameId:    '33',
				x:         0,
				y:         0,
				side:      'O',
				timeStamp: '2015.11.29T19:50:08'
			}, {
				id:        '1339',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         0,
				y:         2,
				side:      'X',
				timeStamp: '2015.11.29T19:50:12'
			}, {
				id:        '1340',
				event:     'MoveMade',
				userName:  'jobbi',
				gameId:    '33',
				x:         1,
				y:         0,
				side:      'O',
				timeStamp: '2015.11.29T19:50:15'
			}, {
				id:        '1341',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         1,
				y:         1,
				side:      'X',
				timeStamp: '2015.11.29T19:50:17'
			}]);

			when = {
				id:        '1342',
				comm:      'MakeMove',
				userName:  'jobbi',
				gameId:    '33',
				x:         2,
				y:         0,
				side:      'O',
				timeStamp: '2015.11.29T19:50:21'
			};

			then = [{
				id:        '1342',
				event:     'MoveMade',
				userName:  'jobbi',
				gameId:    '33',
				x:         2,
				y:         0,
				side:      'O',
				timeStamp: '2015.11.29T19:50:21'
			}, {
				id:        '1342',
				event:     'GameWon',
				userName:  'jobbi',
				gameId:    '33',
				side:      'O',
				timeStamp: '2015.11.29T19:50:21'
			}];

			const actualEvents = ticTacToeCommandHandler(given)
									.executeCommand(when);

			JSON.stringify(actualEvents).should.be
				.exactly(JSON.stringify(then));
		});
	});

	describe ('diagonal winning scenarios', () => {
		it ('X should win when placed in 0,0 - 1,1 - 2,2', () => {
			given = given.concat([{
				id:        '1527',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         0,
				y:         0,
				side:      'X',
				timeStamp: '2015.11.29T19:55:02'
			}, {
				id:        '1528',
				event:     'MoveMade',
				userName:  'jobbi',
				gameId:    '33',
				x:         1,
				y:         0,
				side:      'O',
				timeStamp: '2015.11.29T19:55:04'
			}, {
				id:        '1529',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         1,
				y:         1,
				side:      'X',
				timeStamp: '2015.11.29T19:55:07'
			}, {
				id:        '1530',
				event:     'MoveMade',
				userName:  'jobbi',
				gameId:    '33',
				x:         0,
				y:         1,
				side:      'O',
				timeStamp: '2015.11.29T19:55:10'
			}]);

			when = {
				id:        '1531',
				comm:      'MakeMove',
				userName:  'danni',
				gameId:    '33',
				x:         2,
				y:         2,
				side:      'X',
				timeStamp: '2015.11.29T19:55:11'
			};

			then = [{
				id:        '1531',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         2,
				y:         2,
				side:      'X',
				timeStamp: '2015.11.29T19:55:11'
			}, {
				id:        '1531',
				event:     'GameWon',
				userName:  'danni',
				gameId:    '33',
				side:      'X',
				timeStamp: '2015.11.29T19:55:11'
			}];

			const actualEvents = ticTacToeCommandHandler(given)
									.executeCommand(when);

			JSON.stringify(actualEvents).should.be
				.exactly(JSON.stringify(then));
		});

		it ('O should win when placed in 2,0 - 1,1 - 0,2', () => {
			given = given.concat([{
				id:        '1617',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         0,
				y:         0,
				side:      'X',
				timeStamp: '2015.11.29T19:54:03'
			}, {
				id:        '1618',
				event:     'MoveMade',
				userName:  'jobbi',
				gameId:    '33',
				x:         2,
				y:         0,
				side:      'O',
				timeStamp: '2015.11.29T19:54:04'
			}, {
				id:        '1619',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         0,
				y:         1,
				side:      'X',
				timeStamp: '2015.11.29T19:54:06'
			}, {
				id:        '1620',
				event:     'MoveMade',
				userName:  'jobbi',
				gameId:    '33',
				x:         0,
				y:         2,
				side:      'O',
				timeStamp: '2015.11.29T19:54:09'
			}, {
				id:        '1621',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         2,
				y:         1,
				side:      'X',
				timeStamp: '2015.11.29T19:54:10'
			}]);

			when = {
				id:        '1622',
				comm:      'MakeMove',
				userName:  'danni',
				gameId:    '33',
				x:         1,
				y:         1,
				side:      'O',
				timeStamp: '2015.11.29T19:54:14'
			};

			then = [{
				id:        '1622',
				event:     'MoveMade',
				userName:  'danni',
				gameId:    '33',
				x:         1,
				y:         1,
				side:      'O',
				timeStamp: '2015.11.29T19:54:14'
			}, {
				id:        '1622',
				event:     'GameWon',
				userName:  'danni',
				gameId:    '33',
				side:      'O',
				timeStamp: '2015.11.29T19:54:14'
			}];

			const actualEvents = ticTacToeCommandHandler(given)
									.executeCommand(when);

			JSON.stringify(actualEvents).should.be
				.exactly(JSON.stringify(then));
		});
	});

	describe ('drawing scenarios', () => {
		// TODO: write tests for drawing scenarios
	});

});
