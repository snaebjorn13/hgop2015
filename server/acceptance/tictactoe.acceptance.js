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
		/*jshint -W030 */
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


	 it ('Should execute fluid API test', function (done) {
		 /*
		 given(user("YourUser").createsGame("TheFirstGame"))
		 .expect("GameCreated").withName("TheFirstGame").isOk(done);
			*/

		given(user('snaebjorn').createsGame('932').allCommands())
			.expect('GameCreated').withGameId('932').isOk(done);
	 });

	 it ('should play a game to a draw correctly', (done) => {
		 /* play this game:
		 	X place 1,1
			O place 2,1
			X place 2,2
			O place 0,0
			X place 1,0
			O place 1,2
			X place 0,2
			O place 2,0
			X place 0,1
		 */

		 given(user('jayjay').createsGame('775').allCommands())
			.and(user('traplord').joinsGame('775').allCommands())
			.and(user('jayjay').makesMove(1, 1).inGame('775').asSide('X').allCommands())
			.and(user('traplord').makesMove(2, 1).inGame('775').asSide('O').allCommands())
			.and(user('jayjay').makesMove(2, 2).inGame('775').asSide('X').allCommands())
			.and(user('traplord').makesMove(0, 0).inGame('775').asSide('O').allCommands())
			.and(user('jayjay').makesMove(1, 0).inGame('775').asSide('X').allCommands())
			.and(user('traplord').makesMove(1, 2).inGame('775').asSide('O').allCommands())
			.and(user('jayjay').makesMove(0, 2).inGame('775').asSide('X').allCommands())
			.and(user('traplord').makesMove(2, 0).inGame('775').asSide('O').allCommands())
			.and(user('jayjay').makesMove(0, 1).inGame('775').asSide('X').allCommands())
			.expect('GameDrawn').byUser('jayjay').isOk(done);
	 });

});
