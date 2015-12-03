function tictactoeCommandHandler (events) {
	return {
		executeCommand: function (cmd) {
			if (cmd.comm === 'CreateGame') {
				return [{
					id:        cmd.id,
					event:     'GameCreated',
					userName:  cmd.userName,
					gameName:  cmd.gameName,
					timeStamp: cmd.timeStamp
				}];
			}
		}
	};
}

describe('create game command', function () {
	var given, when, then;

	it ('should create game', function () {
		given = [];
		when = {
			id:        '1234',
			comm:      'CreateGame',
			userName:  'snaebjorn',
			gameName:  'TheFirstGame',
			timeStamp: '2015.12.02T17:01:00'
		};
		then = [{
			id:        '1234',
			event:     'GameCreated',
			userName:  'snaebjorn',
			gameName:  'TheFirstGame',
			timeStamp: '2015.12.02T17:01:00'
		}];

		var actualEvents = tictactoeCommandHandler(given)
							.executeCommand(when);

		JSON.stringify(actualEvents).should.be
			.exactly(JSON.stringify(then));
	});
});

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
			id:        '1111',
			comm:      'JoinGame',
			userName:  ''
		}
	});
});
