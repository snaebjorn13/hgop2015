'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

const fluidApi = require('./tictactoe.fluidApi.js');
const user  = fluidApi.user;
const given = fluidApi.given;

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

		given(user('snaebjorn').createsGame('932').allCommands())
			.expect('GameCreated').withGameId('932').isOk(done);
	 });

});
