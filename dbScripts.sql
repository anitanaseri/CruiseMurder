use SQL_Workshop_2018
---------------------- SCENES TABLES -----------------
drop table choices;
drop table scenes;
drop procedure addScene;
drop procedure getScene;
drop procedure updateScene;

drop procedure getChoicesFromScene;
drop procedure updateChoice;
drop procedure addChoice;


--select * from Scenes;

create table Scenes(
	sceneId int identity(1,1),
	textContent varchar(2500)
	primary key (sceneId)
);
go

create table Choices(
	choiceId int identity(1,1),
	precedent int foreign key references Scenes(sceneId),
	consequent int foreign key references Scenes(sceneId),
	optionText varchar(1000),
	primary key (choiceId)
)
go

create procedure addScene
(
	@content varchar(2500)
)
as insert into Scenes values (@content);
go


create procedure getScene
(
	@id int
)
as select textContent from Scenes where sceneId = @id;
go

--getScene 3;

create procedure updateScene
(
	@id int,
	@textContent varchar(2500)
)as update Scenes set textContent = @textContent where sceneId = @id
go


-------------------- CHOICES --------------------

--select * from Choices;

create procedure addChoice
(
	@pre int,
	@cons int,
	@content varchar(2500)
)
as insert into Choices (precedent, consequent, optionText) values (@pre, @cons, @content);
go

create procedure getChoicesFromScene
(
	@id int
)
as select optionText from Choices where precedent = @id;
go

--getChoiceFromScene 1

create procedure updateChoice
(
	@pre int,
	@cons int,
	@textContent varchar(2500)
)as update Choices set optionText = @textContent where precedent = @pre and consequent = @cons;
go

addScene 'You just woke up on the floor of your room. You feel sick and hungover, probably shouldn’t have drank that much at this age….. It’s so hard to even keep your eyes open but you have a feeling that something is wrong. Don’t bother trying to remember what happened last night -- you won’t remember anything anyway after having that many glasses of wine. You were hanging out with Dom, things were heating up and then...';
go
addScene 'You stumble into Dom’s room. Lying naked on the floor is his dead body, with a gold letter opener in his neck, and congealed blood in a puddle around him. The sick feeling in your stomach becomes ten times worse and your hands shake.';
go
addScene 'In investigating the murder, the evidence is found to point towards you! After a tumultuous few weeks, you find yourself on trial for murder!';
go
addScene 'In a daze, you stagger around the room trying to piece together the situation. Everything is a blur, but a distinctive cigar stub and a pair of glittery earrings (not yours) manage to catch your attention.'
go
addScene 'You’re back in the hallway and your head has cleared a fraction. A gorgeous woman, seductive and somehow different to ordinary people walks out of her room wearing a flowing blue sundress. Don’t worry, you’re prettier than her. She heads out to the deck, leaving behind a familiar scent of perfume.'
go
addScene 'You see the gorgeous woman from the hallway leaning over the railing, smoking the same kind of cigar that you found in Dom’s room, looking as though something is eating her from inside. Are you that brazen that you’d mention the murder?'
go
addScene 'Her gaze pierces you with the force of the sun and appears to be about to say something, before she storms out of the room. You continue your investigation but before long, the ship’s security guards are escorting you to a locked room and before you know it, you’re on trial for murder.'
go
addScene 'Heading back into the ballroom, one of the wait staff calls out to you. “Bet you had a good night, hey love?” they jeer, with a funny look on their face. What happened? He glances over to the polaroids on the wall.
Three of the pictures catch your eye -- one of you and Dom, one of Dom and the woman on the deck, and one of the three of you, with the woman looking murderously angry. A neatly written caption reads “Look at Eleanor’s face!” with an arrow pointing at the woman.
You look at the key card in your pocket. If it’s not yours, and it’s not Dom’s, it must be hers.'
go
addScene 'You stand outside the slightly ajar door, your heart beating. You can see a shadowy figure inside, sitting on the bed. Perhaps her husband?!'
go
addScene 'You walk inside and a whiskery man turns around. You recognise him from one of the polaroids.
“Who are you?!” he exclaims. Before you can say a word, he calls the ship’s reception.
“Hello? Yes, this woman has BARGED into my room and I’d like her dealt with.”
You begin to rush to interrupt him, but a passing security guard notices the struggle and restrains you. Before you know it, you’re on trial for murder.
GAME OVER'
go
addScene 'Hurry up you don’t have much time, you need to prove that cold-hearted witch killed Dom. He was much better than her and she couldn’t bear to see him talking to any other woman. Oh poor Dominic! You need to hurry up and get that man out of the room.'
go
addScene 'Receptionist told you that Eleanor’s husband is coming. You don’t have much time.'
go
addScene 'You have a couple of minutes til Eleanor’s husband comes back. There should be something here that proves that arrogant witch has done it. There are pillows and blanket on the couch and one side of the bed is untouched. Evidently things aren’t great between them.
You don’t have much time to waste.'
go
addScene 'You find her phone sitting on her bedside table. The idiot forgot to take her phone with her. Not wise when you’ve just committed a murder.
You need to look through the phone.'
go
addScene 'Damn it! The phone is locked. She doesn’t seem like the sort to put a complex password on her phone.'
go
addScene 'Her passport is sitting in the drawer. Surely she wouldn’t have her own birthday as the password...'
go

addChoice 1, 2, 'Look around Dom''s room';
go
addChoice 1, 3, 'Report the murder';
go
updateScene @textContent = 'Find Eleanor''s things, cigarette butts, your ring, room keycard', @id = 3
go
updateChoice @textContent = 'Look around the room', @pre = 1, @cons = 2;
go

getScene 1;
go
select * from Choices
go

