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
}

function browseMenu() {
    document.getElementById("Home").style.display = 'none';
    document.getElementById("Browse").style.display = 'block';
    showQuestion();
}

/* Question */

Information.prototype.showQuestion = function () {
    var div = document.getElementById("QuestionBlocks");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    for (var i = 0; i < info.questions.length; i++) {
        div.appendChild(this.questions[i]);
    }
};

/* FUNÇOES AUXILIARES */

/**
 * Função que recebe um qualquer objeto e retorna dinamicamente uma linha de tabela HTML com informação relativa ao estado das suas propriedades
 * @param {Object} object - objecto do qual vamos transformar o conteudo dos seus atributos em TD
 */

function tableLine(object) {
    var tr = document.createElement("tr");
    tr.appendChild(createCellCheckbox());
    for (var property in object) {
        if ((object[property] instanceof Function) === false) {
            var td = document.createElement("td");
            td.textContent = object[property];
            tr.appendChild(td);
        }
    }
    return tr;
};


var inTableQuestion = function (question) {
    var topElement = document.createElement("tr");
    var answerCount = 0;
    for (var i = 0; i < info.answers.length; i++) {
        if (info.answers[i].question.id === question.id) {
            answerCount++;
        }
    }
    var fields = [question.id, question.content, question.document, question.votes, question.anounymous, question.user, answerCount];
    fields.forEach(function (current) {
        var fieldElement = document.createElement("td");
        fieldElement.textContent = current;
        topElement.appendChild(fieldElement);
    })
    return topElement;
};
