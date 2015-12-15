'use strict';

angular.module('tictactoeApp')
  .factory('gameState', function () {
	var createUserObj = function (event) {
		return {
			userName: event.userName,
			side:     event.side
		};
	};

    return function () {

      var gameState = {
        created: false,
        board: [['', '', ''], ['', '', ''], ['', '', '']],
        nextTurn: 'X',
        gameDraw: false,
        winner: undefined,
        mutate: function (events) {
          var handlers = {
            'GameCreated': function (event, gameState) {
              gameState.created = true;
              gameState.name = event.name;
              gameState.gameId = event.gameId;
              gameState.creatingUser = createUserObj(event);
            },
            'GameJoined': function (event, gameState) {
              gameState.joiningUser = createUserObj(event);
            },
            'MovePlaced': function (event, gameState) {
              var x = event.x, y = event.y;
              gameState.board[x][y] = event.side;
              gameState.nextTurn = event.side === 'X' ? 'O' : 'X';
            },
            'GameWon': function (event, gameState) {
              gameState.nextTurn = 'GameOver';
              gameState.winner = createUserObj(event);
            },
            'GameDraw': function (event, gameState) {
              gameState.nextTurn = 'GameOver';
              gameState.gameDraw = true;
            }
          };
          _.each(events, function (ev) {
            if(!ev) {
              return;
            }
            if(handlers[ev.event]){
              handlers[ev.event](ev, gameState);
            }
          });
        }
      };
      return gameState;
    };
  });
