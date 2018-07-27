use Youni;

#drops triggers
drop trigger if exists answer.after_answer_insert;
drop trigger if exists answer.before_answer_delete;
drop trigger if exists question.after_question_insert;
drop trigger if exists question.before_question_delete;


#drops tables
drop table if exists question_answer;
drop table if exists user_answer;
drop table if exists user_question;
drop table if exists answer;
drop table if exists question;
drop table if exists user;

#drops database
drop database if exists Youni;