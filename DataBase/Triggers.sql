use Youni;

DELIMITER $$
#insert triggers
create trigger after_question_insert
	after insert on question
    for each row
begin
	declare id_user int;
    select user_id from user into id_user;
	insert into user_question values (null, id_user, new.id);
end; $$

create trigger after_answer_insert
	after insert on answer
    for each row
begin
	declare id_user int;
    declare id_question int;
    
    select user_id from user into id_user;
    select question_id from question into id_question;

	insert into user_answer values (null, id_user, new.id);
    insert into question_answer values (null, id_question, new.id);
end; $$

#delete triggers
create trigger before_question_delete
	before delete on question
    for each row
begin
	delete from user_question where old.id = question_id;
end; $$

create trigger before_answer_delete
	before delete on answer
    for each row
begin
	delete from user_answer where old.id = answer_id;
	delete from question_answer where old.id = answer_id;
end; $$


DELIMITER ;