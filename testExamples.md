# Events
## Game Management
* GameCreated(UserX)
	- UserX creates a game that is available for another user to join
* GameJoined(UserX, UserY)
	- UserY joins a game created by UserX, game can be full or non-existing.

-

Given [ GameCreated(User1) ]

When [ GameJoin(User1,User2) ]

Then [ GameJoined ]

-

Given [ GameCreated(User1) ]

When [ GameJoin(User2,User3) ]

Then [ GameDoesNotExist ]

-

Given [ GameCreated(User1), GameJoined(User1,User3) ]

When [ GameJoin(User1, User2) ]

Then [ GameFull ]

## Game Winning scenarios
Given [ Placed(0,0,X), Placed(1,0,O), Placed(0,1,X), Placed(1,1,O) ]

When [ Place(0,2,X) ]

Then [ X Won ]

-

Given [ Placed(1,0,X), Placed(0,0,O), Placed(0,2,X), Placed(1,0,O), Placed(1,1,X) ]

When [ Place(2,0,O) ]

Then [ O Won ]

-

Given [ Placed(0,0,X), Placed(1,0,O), Placed(1,1,X), Placed(0,1,O) ]

When [ Place(2,2,X) ]

Then [ X Won ]

-

Given [ Placed(0,0,X), Placed(2,0,O), Placed(0,1,X), Placed(0,2,O), Placed(2,1,X) ]

When [ Place(1,1,O) ]

Then [ O Won ]

## Game Drawing Scenarios
Given [ Placed(0,0,X), Placed(1,0,O), Placed(0,1,X), Placed(0,2,O), Placed(2,0,X), Placed(1,1,O), Placed(2,1,X), Placed(2,2,O) ]

When [ Place(1,2,X) ]

Then [ Draw ]

-

Given [ Placed(0,0,X), Placed(2,0,O), Placed(2,2,X), Placed(1,1,O), Placed(0,2,X), Placed(0,1,O), Placed(1,0,X), Placed(1,2,O) ]

When [ Place(2,1,X) ]

Then [ Draw ]

## Illegal Moves
Given [ Placed(0,0,X) ]

When [ Place(0,0,O) ]

Then [ TileOccupied ]

-

Given [ Placed(0,0,X), Placed(1,0,O) ]

When [ Place(1,0,X) ]

Then [ TileOccupied ]