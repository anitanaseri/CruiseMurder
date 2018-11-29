---------------------- SCENES TABLES -----------------
drop table scenes;

select * from Scenes;

create table Scenes(
	sceneId int identity(1,1),
	textContent varchar(2500)
	primary key (sceneId)
);

create procedure addScene
(
	@content varchar(2500)
)
as insert into Scenes values (@content);

--addScene 'You woke up on the floor of your room';
--addScene 'The police arrested you game over!';
--addScene 'Find Eleanor things';

create procedure getScene
(
	@id int
)
as select textContent from Scenes where sceneId = @id;

--getScene 3;

create procedure updateScene
(
	@id int,
	@textContent varchar(2500)
)as update Scenes set textContent = @textContent where sceneId = @id
go
-- updateScene @textContent = 'Find Eleanor things, cigarette butts, your ring, room keycard', @id = 2

-------------------- CHOICES --------------------

select * from Choices;

create table Choices(
	choiceId int identity(1,1),
	precedent int foreign key references Scenes(sceneId),
	consequent int foreign key references Scenes(sceneId),
	optionText varchar(1000),
	primary key (choiceId)
)

create procedure addChoice
(
	@pre int,
	@cons int,
	@content varchar(2500)
)
as insert into Choices (precedent, consequent, optionText) values (@pre, @cons, @content);
--addChoice 1, 2, 'Look around Dom room';
--go
--addChoice 1, 3, 'Report the murder';
--go

create procedure getChoiceFromScene
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
--updateChoice @textContent = 'Look around the room', @pre = 1, @cons = 2;

