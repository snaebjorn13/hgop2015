const should = require('should');
const request = require('supertest');
const acceptanceUrl = process.env.ACCEPTANCE_URL;

const user = (_userName) => {
	const commands = [];

	const userApi = {
		createsGame: (_gameId) => {
			commands.push({
				gameId:    _gameId,
				comm:      'CreateGame',
				userName:  _userName
			});
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
		and: this.expect,
		withGameId: (gameId) => {
			expectations[expectations.length - 1].gameId = gameId;
			return givenApi;
		},
		isOk: (done) => {
			const cmd = commands[0];
			const command = {
				id:        '1111',
				gameId:    cmd.gameId,
				comm:      cmd.comm,
				userName:  cmd.userName,
				timeStamp: new Date().toJSON().slice(0, 19)
			};

			const req = request(acceptanceUrl);
			req.post('/api/createGame')
				.type('json')
				.send(command)
				.end((err, res) => {
					if (err) return done(err);
					request(acceptanceUrl)
						.get('/api/gameHistory/' + cmd.gameId)
						.expect(200)
						.expect('Content-Type', /json/)
						.end((err, res) => {
							if (err) return done(err);
							res.body.should.be.instanceof(Array);
							should(res.body).eql(
								[{
									id:        command.id,
									gameId:    command.gameId,
									event:     'GameCreated',
									userName:  command.userName,
									timeStamp: command.timeStamp
								}]);

							done();
						});
				});

			// done();
		}
	};

	return givenApi;
};

module.exports = {
	user:  user,
	given: given
};