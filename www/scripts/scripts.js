"use strict";

var info = new Information("Youni");
window.onload = function (event) {
    info.getUsers();
    info.getQuestions();
    info.getAnswers();
    window.info = info;
};

function Information(id) {
    this.id = id;
    this.users = createTestUsers();
    this.questions = createTestQuestions();
    this.answers = createTestAnswers();
};

function User(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
};

function Question(id, title, content, document, anounymous, user) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.document = document;
    this.votes = 0;
    this.anounymous = anounymous;
    this.user = user;
};

function Answer(id, content, document, question, user) {
    this.id = id;
    this.content = content;
    this.document = document;
    this.votes = 0;
    this.question = question;
    this.user = user;
};

Information.prototype.createTestUsers = function () {
    for (var i = 0; i < 10; i++) {
        this.users.push(new User(i, "User" + i + 1, "User" + i + 1 + "@gmail.com"));
    }
}

Information.prototype.createTestQuestions = function () {
    for (var i = 0; i < 5; i++) {
        this.questions.push(new Question(i, "bapada boopy" + i + 1 + "?", "bapada boopy boopy" + i + 1 + "?", null, 0, false, this.users[i]));
    }
}

Information.prototype.createTestAnswers = function () {
    var userCounter = 10;
    for (var i = 0; i < 5; i++) {
        this.answers.push(new Answer(i, "boopidy bappy" + i + 1, null, 0, this.questions[i], this.users[userCounter--]));
    }
}

function homeMenu() {
    document.getElementById("Home").style.display = 'block';
    document.getElementById("Browse").style.display = 'none';
    document.getElementById("UploadContent").style.display = 'none';
    document.getElementById("showContent").style.display = 'none';
    document.getElementById("QA").style.display = 'none';
    document.getElementById("showQ").style.display = 'none';
    document.getElementById("UploadQuestion").style.display = 'none';
    document.getElementById("UploadAnswer").style.display = 'none';
}

function browseMenu() {
    document.getElementById("Home").style.display = 'none';
    document.getElementById("Browse").style.display = 'block';
    document.getElementById("UploadContent").style.display = 'none';
    document.getElementById("showContent").style.display = 'none';
    document.getElementById("QA").style.display = 'none';
    document.getElementById("showQ").style.display = 'none';
    document.getElementById("UploadQuestion").style.display = 'none';
    document.getElementById("UploadAnswer").style.display = 'none';
}

function uploadContentPage() {
    document.getElementById("Home").style.display = 'none';
    document.getElementById("Browse").style.display = 'none';
    document.getElementById("UploadContent").style.display = 'block';
    document.getElementById("showContent").style.display = 'none';
    document.getElementById("QA").style.display = 'none';
    document.getElementById("showQ").style.display = 'none';
    document.getElementById("UploadQuestion").style.display = 'none';
    document.getElementById("UploadAnswer").style.display = 'none';
}

function showContent() {
    document.getElementById("Home").style.display = 'none';
    document.getElementById("Browse").style.display = 'none';
    document.getElementById("UploadContent").style.display = 'none';
    document.getElementById("showContent").style.display = 'block';
    document.getElementById("QA").style.display = 'none';
    document.getElementById("showQ").style.display = 'none';
    document.getElementById("UploadQuestion").style.display = 'none';
    document.getElementById("UploadAnswer").style.display = 'none';
}

function QAMenu(){
    document.getElementById("Home").style.display = 'none';
    document.getElementById("Browse").style.display = 'none';
    document.getElementById("UploadContent").style.display = 'none';
    document.getElementById("showContent").style.display = 'none';
    document.getElementById("QA").style.display = 'block';
    document.getElementById("showQ").style.display = 'none';
    document.getElementById("UploadQuestion").style.display = 'none';
    document.getElementById("UploadAnswer").style.display = 'none';
}

function showQ(){
    document.getElementById("Home").style.display = 'none';
    document.getElementById("Browse").style.display = 'none';
    document.getElementById("UploadContent").style.display = 'none';
    document.getElementById("showContent").style.display = 'none';
    document.getElementById("QA").style.display = 'none';
    document.getElementById("showQ").style.display = 'block';
    document.getElementById("UploadQuestion").style.display = 'none';
    document.getElementById("UploadAnswer").style.display = 'none';
}

function uploadQuestion(){
    document.getElementById("Home").style.display = 'none';
    document.getElementById("Browse").style.display = 'none';
    document.getElementById("UploadContent").style.display = 'none';
    document.getElementById("showContent").style.display = 'none';
    document.getElementById("QA").style.display = 'none';
    document.getElementById("showQ").style.display = 'none';
    document.getElementById("UploadQuestion").style.display = 'block';
    document.getElementById("UploadAnswer").style.display = 'none';
}

function uploadAnswer(){
    document.getElementById("Home").style.display = 'none';
    document.getElementById("Browse").style.display = 'none';
    document.getElementById("UploadContent").style.display = 'none';
    document.getElementById("showContent").style.display = 'none';
    document.getElementById("QA").style.display = 'none';
    document.getElementById("showQ").style.display = 'none';
    document.getElementById("UploadQuestion").style.display = 'none';
    document.getElementById("UploadAnswer").style.display = 'block';
}