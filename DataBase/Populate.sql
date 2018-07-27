use Youni;

#Populate users
INSERT INTO user VALUES (null, "Test1", "test1@gmail.com");
INSERT INTO user VALUES (null, "Test2", "test2@gmail.com");
INSERT INTO user VALUES (null, "Test3", "test3@gmail.com");
INSERT INTO user VALUES (null, "Test4", "test4@gmail.com");
INSERT INTO user VALUES (null, "Test5", "test5@gmail.com");
INSERT INTO user VALUES (null, "Test6", "test6@gmail.com");
INSERT INTO user VALUES (null, "Test7", "test7@gmail.com");
INSERT INTO user VALUES (null, "Test8", "test8@gmail.com");
INSERT INTO user VALUES (null, "Test9", "test9@gmail.com");
INSERT INTO user VALUES (null, "Test10", "test10@gmail.com");
INSERT INTO user VALUES (null, "Test11", "test11@gmail.com");

#Populate Questions
INSERT INTO question VALUES (null, "Question1", null, 0, false);
INSERT INTO question VALUES (null, "Question2", null, 3, true);
INSERT INTO question VALUES (null, "Question3", null, 5, false);
INSERT INTO question VALUES (null, "Question4", null, 2, true);
INSERT INTO question VALUES (null, "Question5", null, 0, false);
INSERT INTO question VALUES (null, "Question6", null, 1, true);
INSERT INTO question VALUES (null, "Question7", null, 0, false);
INSERT INTO question VALUES (null, "Question8", null, 2, true);
INSERT INTO question VALUES (null, "Question9", null, 9, false);
INSERT INTO question VALUES (null, "Question10", null, 0, true);

#Populate answer
INSERT INTO answer VALUES (null, "Answer1", null, 0);
INSERT INTO answer VALUES (null, "Answer2", null, 0);
INSERT INTO answer VALUES (null, "Answer3", null, 2);
INSERT INTO answer VALUES (null, "Answer4", null, 6);
INSERT INTO answer VALUES (null, "Answer5", null, 0);
INSERT INTO answer VALUES (null, "Answer6", null, 1);

#Populate user and question relationship
INSERT INTO user_question VALUES (null, 1, 1);
INSERT INTO user_question VALUES (null, 1, 2);
INSERT INTO user_question VALUES (null, 1, 3);
INSERT INTO user_question VALUES (null, 3, 4);
INSERT INTO user_question VALUES (null, 4, 5);
INSERT INTO user_question VALUES (null, 5, 6);
INSERT INTO user_question VALUES (null, 7, 7);
INSERT INTO user_question VALUES (null, 8, 8);
INSERT INTO user_question VALUES (null, 8, 9);
INSERT INTO user_question VALUES (null, 7, 10);

#Populate user and answer relationship
INSERT INTO user_answer VALUES (null, 1, 1);
INSERT INTO user_answer VALUES (null, 2, 2);
INSERT INTO user_answer VALUES (null, 4, 3);
INSERT INTO user_answer VALUES (null, 1, 4);
INSERT INTO user_answer VALUES (null, 1, 5);
INSERT INTO user_answer VALUES (null, 4, 6);

#Populate question and answer relationship
INSERT INTO question_answer VALUES (null, 1, 1);
INSERT INTO question_answer VALUES (null, 1, 2);
INSERT INTO question_answer VALUES (null, 1, 3);
INSERT INTO question_answer VALUES (null, 2, 4);
INSERT INTO question_answer VALUES (null, 3, 5);
INSERT INTO question_answer VALUES (null, 2, 6);




