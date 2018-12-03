use SQL_Workshop_2018;
go
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
	textContent varchar(2500),
	textImage varchar(2500),
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
	@content varchar(2500),
	@image varchar(2500) = 'none'
)
as insert into Scenes (textContent, textImage) values (@content, @image);
go


create procedure getScene
(
	@id int
)
as select textContent, textImage from Scenes where sceneId = @id;
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
as select consequent, optionText from Choices where precedent = @id;
go

--getChoiceFromScene 1

create procedure updateChoice
(
	@pre int,
	@cons int,
	@textContent varchar(2500)
)as update Choices set optionText = @textContent where precedent = @pre and consequent = @cons;
go

addScene 'You just woke up on the floor of your room. You feel sick and hungover. You probably shouldn''t have drank so much at this age... It''s so hard to even keep your eyes open, but you have a feeling that something is wrong. Don''t bother trying to remember what happened last night -- you won''t remember anything anyway after having that many glasses of wine. You were hanging out with Dom, things were heating up and then...';
go
addScene 'You stumble into Dom''s unlocked room. Lying naked on the floor is his dead body, with a gold letter opener in his neck, and congealed blood in a puddle around him. The sick feeling in your stomach becomes ten times worse and your hands shake.';
go
addScene 'In investigating the murder, the evidence is found to point towards you! After a tumultuous few weeks, you find yourself on trial for murder! GAME OVER'
go
addScene 'In a daze, you stagger around the room trying to piece together the situation. Everything is a blur, but a distinctive cigar stub and a pair of glittery earrings (not yours) manage to catch your attention. Someone has been here... but who? You notice and pick up a key card with ''E'' written on it in pencil. '
go
addScene 'You''re back in the hallway and your head has cleared marginally. A gorgeous woman, seductive and somehow different to ordinary people, walks out of her room wearing a flowing blue sundress. Don''t worry, you''re prettier than her. She heads out to the deck, leaving behind a strangely familiar scent of perfume.'
go
addScene 'You see the gorgeous woman from the hallway leaning over the railing, smoking the same kind of cigar that you found in Dom''s room, looking as though something is eating her from inside. Are you that brazen that you''d mention the murder?'
go
addScene 'Her gaze pierces you, and she appears to be about to say something, before storming out of the room. You continue your investigation but before long, the ship''s security guards are escorting you to a locked room and after a short, unfair interview with police, you''re on trial for murder. GAME OVER'
go
addScene 'Heading back into the ballroom, one of the wait staff calls out to you.  
''Bet you had a good night, hey love?'' they jeer, with a funny look on their face.  
What happened? He glances over to the polaroids on the wall.  
Three of the pictures catch your eye -- one of you and Dom, one of Dom and the woman on the deck, and one of the three of you, with the woman looking murderously angry. A neatly written caption reads ''Look at Eleanor''s face!'' with an arrow pointing at the woman. 
You look at the key card in your pocket. If it''s not yours, and it''s not Dom''s, it must be hers.'
go
addScene 'You stand outside the slightly ajar door, your heart beating. You can see a shadowy figure inside, sitting on the bed. Perhaps her husband?!'
go
addScene 'You walk inside and a whiskery man turns around. You recognise him from one of the polaroids. 
''Who are you?!'' he exclaims. Before you can say a word, he calls the ship''s reception. 
''Hello? Yes, this woman has BARGED into my room and I''d like her dealt with.'' 
You begin to rush to interrupt him, but a passing security guard notices the struggle and restrains you. Before you know it, you''re on trial for murder. 
GAME OVER'
go
addScene 'Hurry up! You don''t have much time: you need to prove that cold-hearted witch killed Dom. He was so much kinder than her, and she couldn''t bear to see him talking to any other woman. Oh poor Dominic! You need to hurry up and get that man out of the room.'
go
addScene 'The receptionist told you that Eleanor''s husband is on his way. You don''t have much time.'
go
addScene 'You have a couple of minutes til Eleanor''s husband comes back. There should be something here that proves that arrogant witch has done it. There are pillows and blanket on the couch and one side of the bed is untouched. Evidently things aren''t great between them.
You don''t have much time to waste.'
go
addScene 'You find her phone sitting on her bedside table. The idiot forgot to take her phone with her. Not wise when you''ve just committed a murder. 
You need to look through the phone.'
go
addScene 'Damn it! The phone is locked. She doesn''t seem like the sort to put a complex password on her phone, however.'
go
addScene 'Her passport is sitting in the drawer. Surely she wouldn''t have her own birthday as the password...'
go
addScene 'It worked! 
You hurriedly scroll through her photos looking for anything incriminating'
go
addScene 'WHAT? This isn''t possible!'
go
addScene 'You find a series of drinks receipts all the way up to 4am last night. That can''t be right. When did she kill Dom? You need to find out the truth.'
go
addScene 'While you''re looking underneath the bed, Eleanor''s husband comes back to the room. You recognise him from one of the polaroids. ''Who are you?!'' he exclaims. Before you can say a word, he calls the ship''s reception. ''Hello? Yes, this woman has BARGED into my room and I''d like her dealt with.'' You begin to rush to interrupt him, but a passing security guard notices the struggle and restrains you. Before you know it, you''re on trial for murder.
 
GAME OVER'
go
addScene 'You sidle up to the reception window. A stack of paper lies on the desk with what looks like records of all the customers from last night. If only you had 20/20 vision! You''re tempted to grab it, but the receptionist is standing dangerously close.'
go
addScene 'You reach out and try to snatch the paper, but the reception turns around quick as a flash and snatches it right back. ''ExCUSE me? What do you think you''re doing, buddy?'' 
You begin to stammer out an excuse but before you can, he''s calling the security over. Before you know it, you''ve been locked up and put on trial for murder.  
GAME OVER'
go
addScene 'The receptionist frowns. ''I don''t know where you come from, buddy, but here things are more exxy. Four times as exxy'''
go
addScene '''Look buddy, that''s not going to work. Security! I need a hand!'' 
The security come over and after a quick discussion with the receptionist, you''ve been locked up in a secure room. Within hours the police have arrived and all the evidence is pointing to you. 
GAME OVER'
go
addScene 'He reluctantly gives in. ''Be quick.'''
go
addScene 'You take a quick peek and see clear as day that Eleanor and her husband were in the ballroom buying drinks until very late last night. 
If she didn''t do it then who killed Dom? 
. 
. 
''Buddy, you dropped your phone last night when you were running in the hallway. You looked like you were flipping out, dude.'' 

You dropped your phone? You thought you went back to your room early. 

You open your phone and you see a stack of messages from your friend Lucie. 

''hey dude what''s going on???'' 
''dude are u ok?? talk to me!!!!!'' 
''ur scaring me!!!! hello ?????'''
go
addScene '''Omg i didn''t wanna do it'' 
''Lucie i think i did something very bad text me back'' 
''What should i do now'' 
''They''re gonna find me helpppp'' 

Your head starts spinning again. You find yourself stumbling into Dom''s room in a daze as your memories gradually come back. The champagne, Dom, going back to his room, and he was so insistent. You resist but he becomes aggressive and then... the letter opener! It was self defense! You didn''t mean it!  
You collapse onto his bed filled with guilt. 
. 
. 
But it was self defense.  
. 
. 
He brought it upon himself. 
. 
. 
You''re not a bad person. 
. 
. 
After all, he deserved it.'
go
addScene '''What do you want?''  
She sounds pissed at you.  
''You enjoying the cruise?'' you enthusiastically enquire. 
''I was enjoying it more before you showed up'' 
What did you do?'
go
addScene '''What do you want?'' 
She sounds pissed at you. 
''You enjoying the cruise?'' you enthusiastically enquire. 
''I was enjoying it more before you showed up'' 
What did you do?'
go
addScene 'You slowly start to recollect that you and Dom were chatting for hours in the ballroom. 
''Slow down, we were just having fun!'' 
''That''s how it starts! I was going to leave my damn husband for him!'' 
The silence could be cut with a knife.'
go
addScene 'You decide it''s time to accuse her of Dom''s murder. 
''Look bitch, I know you did it.'' 
''...did what?'' 
''Murdered Dom! You couldn''t handle that he liked me better! And you were dumb enough to leave evidence all over his room!'' 
''I-I didn''t! Why would I do that?! We have to go to the police.'' 
''I don''t think we should'', you reply. You have a bad feeling that you''re going to look like a suspect. 
''Of course we should. I''m going to call them right right now.'''
go
addScene 'You follow her to the reception and stand while she makes the phone call. The police come and the investigation goes on, before suddenly you are arrested as the prime suspect. 
GAME OVER'
go 
addScene '''You DEFINITELY shouldn''t call them. Your earrings and cigars were all over the room!'' 
''I didn''t kill him! I can prove it. I was in the ballroom all night with my husband.'' 
Eleanor reaches for her bag and shows you the receipts of the drinks she bought late last night with her husband. 
''I just don''t get it. Why, why. Why would anyone kill Dom?'''
go
addScene 'You leave her on the verge of tears in the ballroom while you walk back to Dom''s room. A smell of death and depravity greets you at the door. Dom is still where you left him, but the blood is almost completely dry now.'
go
addScene 'While searching you notice a GoPro on Dom''s table, pointed at the bed. Curious.'
go 
addScene 'The video begins with Dom walking back to you, sitting on the bed. The two of you begin making out. You had no idea he was recording. What a creep! Things start to heat up when he becomes too aggressive. You try to push him away but he doesn''t stop. 
Reaching out for anything, your hand closes around the gold letter opener and brings it up to his head. Blood spurts out of his neck across the room.'
go
addScene 'You head back out to the reception, heart pounding, and ask to use the phone to call the police. While they show up and investigate, you sneakily drop the GoPro over the railing. 
. 
. 
. 
It''s going to be you and Dom''s little secret. 
THE END'
go
addScene 'Very moral of you. You head back out to the reception, heart pounding, and ask to use the phone to call the police. They show up to investigate, and arrest you as a suspect. You came here to have fun, and now you live behind bars. 
GAME OVER'
go
addScene 'The two of you walk back to Dom''s room. A smell of death and depravity greets you at the door. Dom is still where you left him, but the blood is almost completely dry now.'
go
addScene 'While searching you notice a GoPro on Dom''s table, pointed at the bed. Curious.'
go
addScene 'The video begins with Dom walking back to you, sitting on the bed. The two of you begin making out. You had no idea he was recording. What a creep! Things start to heat up when he becomes too aggressive. You try to push him away but he doesn''t stop. Reaching out for anything, your hand closes around the gold letter opener and blood spurts out of his neck across the room. 
There is a pause, before Eleanor looks at you in fear and starts to back out of the room.'
go
addScene 'While she struggles with the door, you tug the letter opener out of Dom''s neck, accompanied by a dribble of thickened blood. As she panics and tears at the door handle, you run up behind her and plunge the letter opener into her neck. 
You wash your hands thoroughly and head back out to the reception, finally feeling steady, and ask to use the phone to call the police. While they show up and investigate, you sneakily drop the GoPro over the railing. 

It needed to be done. 
THE END'
go
addScene 'Very moral of you. You head back out to the reception, heart pounding. Eleanor asks to use the phone to call the police. They show up to investigate, and arrest you as a suspect. You came here to have fun, and now you live behind bars. 
GAME OVER'
go

--Start adding choices--

addChoice 1, 2, 'Go check on Dom';
go
addChoice 2, 3, 'Report the murder';
go
addChoice 2, 4, 'Look around Dom''s room';
go
addChoice 4, 5, 'Leave Dom''s room';
go
addChoice 5, 8, 'Go the ballroom';
go
addChoice 5, 6, 'Follow her out to the desk';
go
addChoice 6, 7, 'Tell Eleanor about Dom''s murder';
go
addChoice 6, 8, 'Go the the Ballroom';
go

addChoice 8, 9, 'Go to Eleanor''s room';
go
addChoice 9, 10, 'Go inside right away';
go
addChoice 9, 11, 'Go back out to reception';
go
addChoice 11, 12, 'Ask receptionist to page Eleanor''s husband';
go
addChoice 12, 13, 'Go back to Eleanor''s room';
go
addChoice 13, 14, 'Search Eleanor''s room';
go
addChoice 14, 15, 'Look through the phone';
go
addChoice 15, 16, 'Search Eleanor''s room for clues to open her phone';
go
addChoice 16, 17, 'Try Eleanor''s birthday';
go
addChoice 17, 18, 'Check Eleanor''s email';
go
addChoice 18, 19, 'Huh???';
go
addChoice 19, 20, 'Keep searching';
go
addChoice 19, 21, 'Head to reception';
go
addChoice 21, 23, 'Bribe $50';
go
addChoice 21, 25, 'Bribe $200';
go
addChoice 21, 22, 'Try to take the paper';
go
addChoice 23, 24, 'Bribe $50 (again)';
go
addChoice 23, 25, 'Bribe $200';
go
addChoice 25, 26, 'Read the receipts list quickly';
go
addChoice 26, 27, 'Check the messages you sent last night';
go

--updateChoice @textContent = 'Look around the room', @pre = 1, @cons = 2;


--Eleanor's branch starts here--

addChoice 6, 28, 'Talk to the woman';
go
addChoice 28, 29, 'Talk to the woman again';
go
addChoice 28, 8, 'Go to the Ballroom';
go
addChoice 29, 30, 'Keep talking to Eleanor';
go
addChoice 29, 8, 'Go to the Ballroom';
go
addChoice 30, 31, 'Accuse her of Dom''s murder';
go
addChoice 30, 8, 'Go to the Ballroom';
go
addChoice 31, 32, 'Concede and go with her to call the police';
go
addChoice 31, 33, 'Threaten her with the evidence against her';
go
addChoice 33, 34, 'Suggest to go and check Dom''s room while Eleanor is in shock';
go
addChoice 33, 39, 'Go with Eleanor to check Dom''s room';
go
addChoice 34, 35, 'Search thoroughly';
go
addChoice 35, 36, 'Play the most recent video on the GoPro';
go
addChoice 36, 37, 'Get rid of the GoPro';
go
addChoice 36, 38, 'Confess';
go
addChoice 39, 40, 'Search thoroughly with Eleanor';
go
addChoice 40, 41, 'Play the most recent video on the GoPro with Eleanor';
go
addChoice 41, 42, 'Grab the letter opener and stab Eleanor';
go
addChoice 41, 43, 'Confess';
go

select * from Choices
go
select * from Scenes
go

update Scenes set textImage = '
    _____
    \/\  |  .
   ()))))))/
  ((/ \)))))
  ((),>((((
   )\__ ))
  ( __\((__
   /  )\/\,\         
  /.|/ _)_) \
 ( \ \  o| \|_\
  \|  )_o| (__\
 _/| /.__|  _/ \__
_(_//  /|\\ \ ||\.\
   /   \|/ \ \_____\
   ''-..___.''
     \  |/
      \ |
     .'')|
    ( / |
    /.\ |
  (_ \ )|
   ) -/ )
 mrf-''_/|' where sceneId = 1;

 select * from Scenes where sceneId = 1;
 getScene 1;