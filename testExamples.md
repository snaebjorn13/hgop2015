# Events
## Game Management
* GameCreated
	- Done by user
* GameJoined
	- When a user has created a game, another user can join that game, given that noone else has joined that game.

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