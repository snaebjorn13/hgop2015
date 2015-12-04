var _ = require('lodash');

const tictactoeCommandHandler = (events) => {
	const gameState = {
		gameCreatedEvent: events[0],
		board:            [['','',''],['','',''],['','','']]
	};

	const eventHandlers = {
		'MoveMade': (event) => {
			gameState.board[event.x][event.y] = event.side;
		},
		'GameJoined': (event) => {
			gameState.otherPlayer = event.userName;
		}
	};

	_.each(events, (event) => {
		const eventHandler = eventHandlers[event.event];
		if (eventHandler) {
			eventHandler(event)
		}
	});

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
					id:        cmd.id,
					event:     'GameDoesNotExist',
					userName:  cmd.userName,
					timeStamp: cmd.timeStamp
				}];
			}
			if (gameState.otherPlayer) {
				return [{
					id:        cmd.id,
					event:     'GameFull',
					userName:  cmd.userName,
					gameId:    cmd.gameId,
					timeStamp: cmd.timeStamp
				}];
			}

			return [{
				id:            cmd.id,
				event:         'GameJoined',
				userName:      cmd.userName,
				otherUserName: gameState.gameCreatedEvent.userName,
				gameId:        cmd.gameId,
				timeStamp:     cmd.timeStamp
			}];
		},
		'MakeMove': (cmd) => {
			var _event = 'MoveMade';
			if (gameState.board[cmd.x][cmd.y] !== '') {
				_event = 'TileOccupied';
			}

			return [{
				id:        cmd.id,
				event:     _event,
				userName:  cmd.userName,
				gameId:    gameState.gameCreatedEvent.gameId,
				x:         cmd.x,
				y:         cmd.y,
				side:      cmd.side,
				timeStamp: cmd.timeStamp
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
