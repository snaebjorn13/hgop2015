function tictactoeCommandHandler (events) {
	return {
		executeCommand: function () {
			return {
				id:        '1234',
				event:     'GameCreated',
				userName:  'snaebjorn',
				timeStamp: '2015.12.02T17:01:00'
			};
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
			name:      'TheFirstGame',
			timeStamp: '2015.12.02T17:01:00'
		};
		then = {
			id:        '1234',
			event:     'GameCreated',
			userName:  'snaebjorn',
			timeStamp: '2015.12.02T17:01:00'
		};

		var actualEvents = tictactoeCommandHandler(given)
							.executeCommand(when);

		JSON.stringify(actualEvents).should.be
			.exactly(JSON.stringify(then));
	});
});
