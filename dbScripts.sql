---------------------- SCENES TABLES -----------------
/*drop table choices;
drop table scenes;
drop procedure addScene;
drop procedure getScene;
drop procedure updateScene;

drop procedure getChoicesFromScene;
drop procedure updateChoice;
drop procedure addChoice;
*/

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

addScene 'You woke up on the floor of your room';
go
addScene 'The police arrested you game over!';
go
addScene 'Find Eleanor things';
go
addChoice 1, 2, 'Look around Dom room';
go
addChoice 1, 3, 'Report the murder';
go
updateScene @textContent = 'Find Eleanor things, cigarette butts, your ring, room keycard', @id = 3
go
updateChoice @textContent = 'Look around the room', @pre = 1, @cons = 2;
go

select * from Scenes

