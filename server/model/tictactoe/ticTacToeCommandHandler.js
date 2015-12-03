var _ = require('lodash');

var tictactoeCommandHandler =
function tictactoeCommandHandler (events) {
	var handlers = {
		'CreateGame': (cmd) => {
			{
				return [{
					id:        cmd.id,
					event:     'GameCreated',
					userName:  cmd.userName,
					gameId:    cmd.gameId,
					timeStamp: cmd.timeStamp
				}];
			}
		},
		'JoinGame': (cmd) => {
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

	return {
		executeCommand: function (cmd) {
			return handlers[cmd.comm](cmd);
		}
	};
}

module.exports = tictactoeCommandHandler;
