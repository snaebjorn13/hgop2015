var _ = require('lodash');

const tictactoeCommandHandler = (events) => {
	const gameState = {
		gameCreatedEvent: events[0],
		board:            [['','',''],['','',''],['','','']]
	};

	const handlers = {
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
			if (gameState.gameCreatedEvent === undefined) {
				return [{
					id: cmd.id,
					event: 'GameDoesNotExist',
					userName: cmd.userName,
					timeStamp: cmd.timeStamp
				}];
			}

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
		executeCommand: (cmd) => {
			const handler = handlers[cmd.comm];
			if (!handler) {
				throw new Error('No handler exists for command ' + cmd.comm);
			}
			return handler(cmd);
		}
	};
}

module.exports = tictactoeCommandHandler;
