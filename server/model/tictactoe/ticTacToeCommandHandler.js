var _ = require('lodash');

const tictactoeCommandHandler = (events) => {
	const gameState = {
		gameCreatedEvent: events[0],
		board:            [['','',''],['','',''],['','','']]
	};

	const eventHandlers = {
		'MoveMade': (event) => {
			gameState.board[event.x][event.y] = event.side;
		}
	};

	_.each(events, (event) => {
		const eventHandler = eventHandlers[event.event];
		eventHandler && eventHandler(event);
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
		},
		'MakeMove': (cmd) => {
			if (gameState.board[cmd.x][cmd.y] !== '') {
				return [{
					id:        cmd.id,
					event:     'TileOccupied',
					userName:  cmd.userName,
					gameId:    cmd.gameId,
					x:         cmd.x,
					y:         cmd.y,
					side:      cmd.side,
					timeStamp: cmd.timeStamp
				}];
			}
			return [{
				id:        cmd.id,
				event:     'MoveMade',
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
