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
			var events = [{
				id:        cmd.id,
				event:     'MoveMade',
				userName:  cmd.userName,
				gameId:    gameState.gameCreatedEvent.gameId,
				x:         cmd.x,
				y:         cmd.y,
				side:      cmd.side,
				timeStamp: cmd.timeStamp
			}];

			if (gameState.board[cmd.x][cmd.y] !== '') {
				events[0].event = 'TileOccupied';
				return events;
			}

			gameState.board[cmd.x][cmd.y] = cmd.side;

			if (gameState.board[cmd.x][0] === cmd.side &&
			gameState.board[cmd.x][1] === cmd.side &&
			gameState.board[cmd.x][2] === cmd.side) {
				events.push({
					id:        cmd.id,
					event:     'GameWon',
					userName:  cmd.userName,
					gameId:    cmd.gameId,
					side:      cmd.side,
					timeStamp: cmd.timeStamp
				});
			} else if (gameState.board[0][cmd.y] === cmd.side &&
			gameState.board[1][cmd.y] === cmd.side &&
			gameState.board[2][cmd.y] === cmd.side) {
				events.push({
					id:        cmd.id,
					event:     'GameWon',
					userName:  cmd.userName,
					gameId:    cmd.gameId,
					side:      cmd.side,
					timeStamp: cmd.timeStamp
				});
			}

			return events;
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
