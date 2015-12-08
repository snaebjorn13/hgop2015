'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

const user = (_userName) => {
	const userApi = {
		createsGame: (_gameId) => {
			return {
				gameId:    _gameId,
				comm:      'CreateGame',
				userName:  _userName,
			};
		}
	};

	return userApi;
};

// fluid API
const given = (cmd) => {
	var destination = undefined;

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

/*const given = (givenEvent) => {
	var destination = undefined;

	const expectations = [];

	const givenApi = {
		sendTo: (dest) => {
			destination = dest;
			return givenApi;
		},
		expect: (expectedEvent) => {
			expectations.push(expectedEvent);
			return givenApi;
		},
		and: givenApi.expect,
		when: (done) => {
			// TODO: perform test logic
			done();
		}
	};

	return givenApi;
}; */

describe('TEST ENV GET /api/gameHistory', function () {

	it('Should have ACCEPTANCE_URL environment variable exported.', function () {
		acceptanceUrl.should.be.ok;
	});

	it('should execute same test using old style', function (done) {

		var command = {
			id : "1234",
			gameId : "999",
			comm: "CreateGame",
			userName: "Gulli",
			timeStamp: "2014-12-02T11:29:29"
		};

		var req = request(acceptanceUrl);
		req
			.post('/api/createGame')
			.type('json')
			.send(command)
			.end(function (err, res) {
				if (err) return done(err);
				request(acceptanceUrl)
					.get('/api/gameHistory/999')
					.expect(200)
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) return done(err);
						res.body.should.be.instanceof(Array);
						should(res.body).eql(
							[{
								"id": "1234",
								"gameId": "999",
								"event": "GameCreated",
								"userName": "Gulli",
								"timeStamp": "2014-12-02T11:29:29"
							}]);
						done();
					});
			});
	});


	 it('Should execute fluid API test', function (done) {
		 /*
		 given(user("YourUser").createsGame("TheFirstGame"))
		 .expect("GameCreated").withName("TheFirstGame").isOk(done);
			*/

		given(user('snaebjorn').createsGame('932'))
			.expect('GameCreated').withGameId('932').isOk(done);
		// done();
	 });

});
