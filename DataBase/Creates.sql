create database Youni;
use Youni;

#creates table user
create table user(
	id integer primary key auto_increment,
    name varchar(50),
    email varchar(100) unique
);

#creates table question
create table question(
	id integer primary key auto_increment,
    content varchar(250) not null,
    document blob,
    votes int DEFAULT 0,
    anonymous bool
);

#creates table answer
create table answer(
	id integer primary key auto_increment,
    content varchar(250) not null,
    document blob,
    votes int DEFAULT 0
);

#creates relationship between user and question
create table user_question(
	id integer primary key auto_increment,
	user_id integer,
    question_id integer
);

ALTER TABLE user_question ADD CONSTRAINT fk_question_id1 FOREIGN KEY(question_id) REFERENCES question(id);
ALTER TABLE user_question ADD CONSTRAINT fk_user_id1 FOREIGN KEY(user_id) REFERENCES user(id);

#creates relationship between user and answer
create table user_answer(
	id integer primary key auto_increment,
	user_id integer,
    answer_id integer
);

ALTER TABLE user_answer ADD CONSTRAINT fk_answer_id1 FOREIGN KEY(answer_id) REFERENCES answer(id);
ALTER TABLE user_answer ADD CONSTRAINT fk_user_id2 FOREIGN KEY(user_id) REFERENCES user(id);

#creates relationship between question and answer
create table question_answer(
	id integer primary key auto_increment,
	question_id integer,
    answer_id integer
);

ALTER TABLE question_answer ADD CONSTRAINT fk_answer_id2 FOREIGN KEY(answer_id) REFERENCES answer(id);
ALTER TABLE question_answer ADD CONSTRAINT fk_question_id2 FOREIGN KEY(question_id) REFERENCES question(id);

