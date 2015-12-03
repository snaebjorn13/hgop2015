var tictactoeCommandHandler =
function tictactoeCommandHandler (events) {
	return {
		executeCommand: function (cmd) {
			if (cmd.comm === 'CreateGame') {
				return [{
					id:        cmd.id,
					event:     'GameCreated',
					userName:  cmd.userName,
					gameId:    cmd.gameId,
					timeStamp: cmd.timeStamp
				}];
			}
			if (cmd.comm === 'JoinGame') {
				return [{
					id:            cmd.id,
					event:         'GameJoined',
					userName:      cmd.userName,
					otherUserName: cmd.otherUserName,
					gameId:        cmd.gameId,
					timeStamp:     cmd.timeStamp
				}];
			}
		}
	};
}

module.exports = tictactoeCommandHandler;
