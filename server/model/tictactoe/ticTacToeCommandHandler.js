var _ = require('lodash');

const tictactoeCommandHandler = (events) => {
	const gameState = {
		gameCreatedEvent: events[0],
		board:            [['','',''],['','',''],['','','']],
		moves:            0
	};

	const checkVertical = (cmd) => {
		return gameState.board[cmd.x][0] === cmd.side &&
			gameState.board[cmd.x][1] === cmd.side &&
			gameState.board[cmd.x][2] === cmd.side;
	};

	const checkHorizontal = (cmd) => {
		return gameState.board[0][cmd.y] === cmd.side &&
			gameState.board[1][cmd.y] === cmd.side &&
			gameState.board[2][cmd.y] === cmd.side;
	};

	const checkDiagonal = (cmd) => {
		return (gameState.board[0][0] === cmd.side &&
			gameState.board[1][1] === cmd.side &&
			gameState.board[2][2] === cmd.side) ||
			(gameState.board[0][2] === cmd.side &&
			gameState.board[1][1] === cmd.side &&
			gameState.board[2][0] === cmd.side);
	};

	const checkIfWinner = (cmd, _events) => {
		gameState.moves++;

		console.log('moves: ' + gameState.moves);

		if (checkVertical(cmd) ||
		checkHorizontal(cmd) ||
		checkDiagonal(cmd)) {
			_events.push({
				id:        cmd.id,
				event:     'GameWon',
				userName:  cmd.userName,
				gameId:    cmd.gameId,
				side:      cmd.side,
				timeStamp: cmd.timeStamp
			});
		} else if (gameState.moves === 9) {
			_events.push({
				id:        cmd.id,
				event:     'GameDrawn',
				userName:  cmd.userName,
				gameId:    cmd.gameId,
				side:      cmd.side,
				timeStamp: cmd.timeStamp
			});
		}

		return _events;
	};

	const eventHandlers = {
		'MoveMade': (event) => {
			gameState.board[event.x][event.y] = event.side;
			gameState.moves++;
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
			var _events = [{
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
				_events[0].event = 'TileOccupied';
				return _events;
			}

			gameState.board[cmd.x][cmd.y] = cmd.side;

			return checkIfWinner(cmd, _events);
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
