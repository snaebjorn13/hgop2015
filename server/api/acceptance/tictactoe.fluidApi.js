const should        = require('should');
const request       = require('supertest');
const async         = require('async');
const acceptanceUrl = process.env.ACCEPTANCE_URL;

var idCounter = 3214;

const firstLetterLowercase = (str) => {
	return str.charAt(0).toLowerCase() + str.slice(1);
};

const createCommand = (cmd) => {
	const command = {
		id:        idCounter.toString(),
		comm:      cmd.comm,
		userName:  cmd.userName,
		gameId:    cmd.gameId,
		timeStamp: new Date().toJSON().slice(0, 19)
	};

	if (cmd.comm === 'MakeMove') {
		// properties specific to MakeMove commands
		command.x    = cmd.x;
		command.y    = cmd.y;
		command.side = cmd.side;
	}

	idCounter++;
	return command;
};

const assertExpectations = (resBody, expectations) => {
	const lastEvent = resBody[resBody.length - 1];
	const exp       = expectations[0];

	for (var key in exp) {
		if (exp.hasOwnProperty(key)) {
			should(lastEvent[key]).eql(exp[key]);
		}
	}
};

const user = (_userName) => {
	const commands = [];

	const userApi = {
		createsGame: (_gameId) => {
			commands.push({
				gameId:   _gameId,
				comm:     'CreateGame',
				userName: _userName
			});
			return userApi;
		},
		joinsGame: (_gameId) => {
			commands.push({
				gameId:   _gameId,
				comm:     'JoinGame',
				userName: _userName
			});
			return userApi;
		},
		makesMove: (x, y) => {
			commands.push({
				comm:     'MakeMove',
				userName: _userName,
				x:        x,
				y:        y
			});
			return userApi;
		},
		inGame: (_gameId) => {
			commands[commands.length - 1].gameId = _gameId;
			return userApi;
		},
		asSide: (side) => {
			commands[commands.length - 1].side = side;
			return userApi;
		},
		allCommands: () => {
			return commands;
		}
	};

	return userApi;
};


// fluid API
const given = (commands) => {
	const expectations = [];

	const givenApi = {
		expect: (eventName) => {
			expectations.push({
				event: eventName
			});
			return givenApi;
		},
		and: (_commands) => {
			commands = commands.concat(_commands);
			return givenApi;
		},
		withGameId: (gameId) => {
			expectations[expectations.length - 1].gameId = gameId;
			return givenApi;
		},
		byUser: (userName) => {
			expectations[expectations.length - 1].userName = userName;
			return givenApi;
		},
		isOk: (done) => {
			var commandString = '';
			// used to assert the value of otherUserName when a game is joined
			const gameCreator = commands[0].userName;

			async.eachSeries(commands, (_cmd, cb) => {
				commandString += _cmd.comm + ', ';
				var url = '/api/' + firstLetterLowercase(_cmd.comm);
				const cmd = createCommand(_cmd);
				request(acceptanceUrl).post(url)
					.type('json')
					.send(cmd)
					.expect(200)
					.expect('Content-Type', /json/)
					.end((err, res) => {
						if (err) return done(err);
						res.body.should.be.instanceof(Array);
						cb();
					});
			}, () => {
				console.log('finished!');
				const gameId = commands[0].gameId;

				// assert the outcome
				request(acceptanceUrl).get('/api/gameHistory/' + gameId)
					.expect(200)
					.expect('Content-Type', /json/)
					.end((err, res) => {
						if (err) return done(err);
						assertExpectations(res.body, expectations);
						done();
					});
			});
		}
	};

	return givenApi;
};

module.exports = {
	user:  user,
	given: given
};
