var tictactoeCommandHandler =
function tictactoeCommandHandler (events) {

	return {
		executeCommand: function (cmd) {
			if (cmd.comm === 'CreateGame') {
				return {
					id:        '1234',
					event:     'GameCreated',
					userName:  'snaebjorn',
					timeStamp: '2015.12.02T17:01:00'
				};
			}
		}
	};
}
