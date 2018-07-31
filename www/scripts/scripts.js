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

function Question(id, content, document, anounymous, user) {
    this.id = id;
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
        this.questions.push(new Question(i, "bapada boopy" + i + 1 + "?", null, 0, false, this.users[i]));
    }
}

Information.prototype.createTestAnswers = function () {
    var userCounter = 10;
    for (var i = 0; i < 5; i++) {
        this.answers.push(new Answer(i, "boopidy bappy"+i+1, null,0, this.questions[i], this.users[userCounter--]));
    }
}

/* User*/

/**
Information.prototype.showUser = function () {
    var table = document.getElementById("tableUser");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    for (var i = 0; i < info.users.length; i++) {
        table.appendChild(inTableUser(this.users[i]));
    }
};
 */
/**
Information.prototype.getUsers = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8081/user", true);
    xhr.onreadystatechange = function () {
        if ((this.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            info.users = [];
            response.user.forEach(function (current) {
                info.users.push(new User(current.id, current.name, current.email));
            });
            info.showUser();
        }
    };
    xhr.send();
};
 */

/* Question */

Information.prototype.showQuestion = function () {
    var div = document.getElementById("Questions");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    for (var i = 0; i < info.questions.length; i++) {
        div.appendChild(this.questions[i]);
    }
};

function deleteQuestionEventHandler() {
    var div = document.getElementById("Questions");
    for (var i = 0, row; row = div.rows[i]; i++) {
        var checkBox = row.cells[0].firstChild;
        var idGameSession = row.cells[1].firstChild.nodeValue;
        if (checkBox.checked) {
            info.removeGameSession(idGameSession);
        }
    }
};

function createGameSessionEventHandler() {
    document.getElementById("addgamesession").style.display = "block";
    document.getElementById("formGameSession").action = "javascript: info.processingGameSession('create');";
    document.getElementById("gameSessionId").value = "";
    document.getElementById("gameSessionDate").value = "";
    document.getElementById("gameSessionDescription").value = "";
    document.getElementById("gameSessionPlayerName").value = "";
};

function cancelGameSessionEventHandler() {
    document.getElementById("addgamesession").style.display = "none";
    document.getElementById("gameSessionId").value = "";
    document.getElementById("gameSessionDate").value = "";
    document.getElementById("gameSessionDescription").value = "";
    document.getElementById("gameSessionPlayerName").value = "";
};

function updateGameSessionEventHandler() {
    var table = document.getElementById("tableGS");
    var idGameSession = 0;
    for (var i = 0; i < table.rows.length; i++) {
        var checkBox = table.rows[i].cells[0].firstChild;
        if (checkBox.checked)
            idGameSession = parseInt(table.rows[i].cells[1].firstChild.nodeValue);
    }
    document.getElementById("addgamesession").style.display = "block";
    document.getElementById("formGameSession").action = "javascript: info.processingGameSession('update');";
    document.getElementById("gameSessionId").value = idGameSession;
    document.getElementById("gameSessionDate").value = info.gameSessions[info.gameSessions.findIndex(p => p.id === idGameSession)].session_date.toString().split('T')[0];
    document.getElementById("gameSessionDescription").value = info.gameSessions[info.gameSessions.findIndex(p => p.id === idGameSession)].description;
    document.getElementById("gameSessionPlayerName").value = info.gameSessions[info.gameSessions.findIndex(p => p.id === idGameSession)].player_id;
};

Information.prototype.getGameSession = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8081/gamesession/", true);
    xhr.onreadystatechange = function () {
        if ((this.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            info.gameSessions = [];
            response.gamesession.forEach(function (current) {
                info.gameSessions.push(new GameSession(current.id, (current.session_date) ? current.session_date.toString().split('T')[0] : "-",
                    current.description, current.player_id));
            });
            info.showGameSession();
        }
    };
    xhr.send();

};

/**
 * Função que apaga o recurso player com ym pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
Information.prototype.removeGameSession = function (id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8081/gamesession/" + id, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
            info.gameSessions.splice(info.gameSessions.findIndex(p => p.id === id), 1);
            info.getGameSession();
            info.showGameSession();
        }
    };
    xhr.send();
};

/**
 * Função que insere ou atualiza o recurso player com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
 *  * @param {String} acao - controla qual a operação do CRUD queremos fazer
  */
Information.prototype.processingGameSession = function (acao) {
    var id = document.getElementById("gameSessionId").value;
    var session_date = document.getElementById("gameSessionDate").value;
    var description = document.getElementById("gameSessionDescription").value;
    var player_id = document.getElementById("gameSessionPlayerName").value;
    var gamesession = { id: id, session_date: session_date, description: description, player_id: player_id };
    var xhr = new XMLHttpRequest();
    xhr.responseType = "application/json";
    if (acao === "create") {
        xhr.onreadystatechange = function () {
            if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                var newGameSession = new GameSession(xhr.response.insertId, session_date, description, player_id);
                info.gameSessions.push(newGameSession);
                document.getElementById("addgamesession").style.display = 'none';
                info.getGameSession();
                info.showGameSession();
            }
        };
        xhr.open("POST", "http://localhost:8081/gamesession/", true);
    } else if (acao === "update") {
        xhr.onreadystatechange = function () {
            if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                info.gameSessions.splice(info.gameSessions.findIndex(i => i.id === id), 1);
                info.gameSessions.push(gamesession);
                document.getElementById("addgamesession").style.display = 'none';
                info.getGameSession();
                info.showGameSession();
            }
        };
        xhr.open("PUT", "http://localhost:8081/gamesession/" + id, true);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(gamesession));
};

/* STATISTIC */

Information.prototype.showStatistic = function () {
    var tabletime = document.getElementById("statstime");
    var tablecoin = document.getElementById("statscoin");
    var tablelevel = document.getElementById("statslevel");
    var tablemouse = document.getElementById("statsmouse");
    while (tabletime.firstChild) {
        tabletime.removeChild(tabletime.firstChild);
    }
    while (tablecoin.firstChild) {
        tablecoin.removeChild(tablecoin.firstChild);
    }
    while (tablelevel.firstChild) {
        tablelevel.removeChild(tablelevel.firstChild);
    }
    while (tablemouse.firstChild) {
        tablemouse.removeChild(tablemouse.firstChild);
    }
    var positiontime = 1;
    var positioncoin = 1;
    var positionlevel = 1;
    var positionmouse = 1;

    let stattime = [];
    let statcoin = [];
    let statlevel = [];
    let statmouse = [];
    for (var i = 0; i < info.statistics.length; i++) {
        if (this.statistics[i].statistic_type_id == '1') {
            stattime.push(this.statistics[i]);
        }
        if (this.statistics[i].statistic_type_id == '2') {
            statcoin.push(this.statistics[i]);
        }
        if (this.statistics[i].statistic_type_id == '3') {
            statlevel.push(this.statistics[i]);
        }
        if (this.statistics[i].statistic_type_id == '4') {
            statmouse.push(this.statistics[i]);
        }
    }
    stattime.sort(function (a, b) {
        return Date.parse('01 Jan 1970 ' + a.value + ':00 GMT') - Date.parse('01 Jan 1970 ' + b.value + ':00 GMT');
    }).reverse();
    stattime.uniqueName();
    for (let i = 0; i < stattime.length; i++) {
        tabletime.appendChild(emTabelaStats(stattime[i], positiontime));
        positiontime++;
    }
    statcoin.sort(function (a, b) {
        return a.value - b.value;
    }).reverse();
    statcoin.uniqueName();
    for (let i = 0; i < statcoin.length; i++) {
        tablecoin.appendChild(emTabelaStats(statcoin[i], positioncoin));
        positioncoin++;
    }
    statlevel.sort(function (a, b) {
        return a.value - b.value;
    }).reverse();
    statlevel.uniqueName();
    for (let i = 0; i < statlevel.length; i++) {
        tablelevel.appendChild(emTabelaStats(statlevel[i], positionlevel));
        positionlevel++;
    }
    statmouse.sort(function (a, b) {
        return a.value - b.value;
    }).reverse();
    statmouse.uniqueName();
    for (let i = 0; i < statmouse.length; i++) {
        tablemouse.appendChild(emTabelaStats(statmouse[i], positionmouse));
        positionmouse++;
    }

};

Array.prototype.uniqueName = function () {
    var a = [], // uniques get placed into here
        b = 0; // counter to test if value is already in array 'a'

    for (let i = 0; i < this.length; i++) {
        var current = this[i]; // get a value from the original array

        for (let j = 0; j < a.length; j++) { // loop and check if value is in new array 
            if (getPlayerNameByGameSession(current.gamesession_id) != getPlayerNameByGameSession(a[j].gamesession_id)) {
                b++; // if its not in the new array increase counter
            }
        }

        if (b == a.length) { // if the counter increased on all values 
            // then its not in the new array yet
            a.push(current); // put it in
        }

        b = 0; // reset counter
    }

    this.length = 0; // after new array is finished creating delete the original array
    for (let i = 0; i < a.length; i++) {
        this.push(a[i]); // push all the new values into the original
    }

    return this; // return this to allow method chaining
}

Information.prototype.showStatisticGameSession = function () {
    let stattime = [];
    let statcoin = [];
    let statlevel = [];
    let statmouse = [];
    for (var i = 0; i < info.statistics.length; i++) {
        if (this.statistics[i].statistic_type_id == '1') {
            stattime.push(this.statistics[i]);
        }
        if (this.statistics[i].statistic_type_id == '2') {
            statcoin.push(this.statistics[i]);
        }
        if (this.statistics[i].statistic_type_id == '3') {
            statlevel.push(this.statistics[i]);
        }
        if (this.statistics[i].statistic_type_id == '4') {
            statmouse.push(this.statistics[i]);
        }
    }
    stattime.sort(function (a, b) {
        return Date.parse('01 Jan 1970 ' + a.value + ':00 GMT') - Date.parse('01 Jan 1970 ' + b.value + ':00 GMT');
    }).reverse();
    stattime.uniqueName();
    for (let i = 0; i < stattime.length; i++) {
        if (stattime[i].gamesession_id == document.getElementById("idSession").value) {
            document.getElementById("toptimes").textContent = "Top tempo de Jogo: " + stattime[i].value;
        }
    }
    statcoin.sort(function (a, b) {
        return a.value - b.value;
    }).reverse();
    statcoin.uniqueName();
    for (let i = 0; i < statcoin.length; i++) {
        if (statcoin[i].gamesession_id == document.getElementById("idSession").value) {
            document.getElementById("topcoins").textContent = "Top de moedas apanhadas: " + statcoin[i].value;
        }
    }
    statlevel.sort(function (a, b) {
        return a.value - b.value;
    }).reverse();
    statlevel.uniqueName();
    for (let i = 0; i < statlevel.length; i++) {
        if (statlevel[i].gamesession_id == document.getElementById("idSession").value) {
            document.getElementById("toplevels").textContent = "Top de Níveis completados: " + statlevel[i].value;
        }
    }
    statmouse.sort(function (a, b) {
        return a.value - b.value;
    }).reverse();
    statmouse.uniqueName();
    for (let i = 0; i < statmouse.length; i++) {
        if (statmouse[i].gamesession_id == document.getElementById("idSession").value) {
            document.getElementById("topmouses").textContent = "Top de Ratos Abatidos: " + statmouse[i].value;
        }
    }
};

Information.prototype.showStatisticPlayer = function () {
    let stattime = [];
    let statcoin = [];
    let statlevel = [];
    let statmouse = [];
    for (var i = 0; i < info.statistics.length; i++) {
        if (this.statistics[i].statistic_type_id == '1') {
            stattime.push(this.statistics[i]);
        }
        if (this.statistics[i].statistic_type_id == '2') {
            statcoin.push(this.statistics[i]);
        }
        if (this.statistics[i].statistic_type_id == '3') {
            statlevel.push(this.statistics[i]);
        }
        if (this.statistics[i].statistic_type_id == '4') {
            statmouse.push(this.statistics[i]);
        }
    }
    stattime.sort(function (a, b) {
        return Date.parse('01 Jan 1970 ' + a.value + ':00 GMT') - Date.parse('01 Jan 1970 ' + b.value + ':00 GMT');
    }).reverse();
    stattime.uniqueName();
    for (let i = 0; i < stattime.length; i++) {
        if (getPlayerNameByGameSession(stattime[i].gamesession_id) == document.getElementById("idPlayer").value) {
            document.getElementById("toptimep").textContent = "Top tempo de Jogo: " + stattime[i].value;
        }
    }
    statcoin.sort(function (a, b) {
        return a.value - b.value;
    }).reverse();
    statcoin.uniqueName();
    for (let i = 0; i < statcoin.length; i++) {
        if (getPlayerNameByGameSession(statcoin[i].gamesession_id) == document.getElementById("idPlayer").value) {
            document.getElementById("topcoinp").textContent = "Top de moedas apanhadas: " + statcoin[i].value;
        }
    }
    statlevel.sort(function (a, b) {
        return a.value - b.value;
    }).reverse();
    statlevel.uniqueName();
    for (let i = 0; i < statlevel.length; i++) {
        if (getPlayerNameByGameSession(statlevel[i].gamesession_id) == document.getElementById("idPlayer").value) {
            document.getElementById("toplevelp").textContent = "Top de Níveis completados: " + statlevel[i].value;
        }
    }
    statmouse.sort(function (a, b) {
        return a.value - b.value;
    }).reverse();
    statmouse.uniqueName();
    for (let i = 0; i < statmouse.length; i++) {
        if (getPlayerNameByGameSession(statmouse[i].gamesession_id) == document.getElementById("idPlayer").value) {
            document.getElementById("topmousep").textContent = "Top de Ratos Abatidos: " + statmouse[i].value;
        }
    }

};

Information.prototype.getStatistic = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8081/statistic/", true);
    xhr.onreadystatechange = function () {
        if ((this.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            info.statistics = [];
            response.statistic.forEach(function (current) {
                info.statistics.push(new Statistic(current.id, current.value,
                    current.statistic_type_id, current.game_session_id));
            });
            info.showStatistic();
        }
    };
    xhr.send();
};


/**
 * Função que insere ou atualiza o recurso player com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
 *  * @param {String} acao - controla qual a operação do CRUD queremos fazer
  */
Information.prototype.processingStatistic = function () {
    var id = document.getElementById("statisticId").value;
    var gamesession_id = document.getElementById("statisticGameSession").value;
    var timeplayed = document.getElementById("statisticTimePlayed").value;
    var coins = document.getElementById("statisticCoins").value;
    var level = document.getElementById("statisticLevel").value;
    var mouse = document.getElementById("statisticMouse").value;
    var statistic = { id: id, gamesession_id: gamesession_id, timeplayed: timeplayed, coins: coins, level: level, mouse: mouse };
    var xhr = new XMLHttpRequest();
    xhr.responseType = "application/json";
    xhr.open("POST", "http://localhost:8081/statistic/", false);
    xhr.onreadystatechange = function () {
        if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
            console.log('Done: add stats');
            document.getElementById("statisticId").value = "";
            document.getElementById("statisticGameSession").value = "";
            document.getElementById("statisticTimePlayed").value = "";
            document.getElementById("statisticCoins").value = "";
            document.getElementById("statisticLevel").value = "";
            document.getElementById("statisticMouse").value = "";
            info.getStatistic();
            info.showStatistic();
            console.log('Done: add stats');
        }
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(statistic));
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

/**
 * Função genérica que tem como objetivo a criação de uma coluna com checkbox
 */
function createCellCheckbox() {
    var td = document.createElement("td");
    var check = document.createElement("input");
    check.type = "checkbox";
    td.appendChild(check);
    return td;
};

var emTabelaPlayer = function (player) {
    var topoElement = document.createElement("tr");
    var inputElement = document.createElement("input");
    inputElement.type = 'checkbox';
    var check = topoElement.appendChild(document.createElement("td"));
    check.appendChild(inputElement);
    var campos = [player.id, player.name, calculate_age(player.birthDate), player.country];
    campos.forEach(function (current) {
        var campoElement = document.createElement("td");
        campoElement.textContent = current;
        topoElement.appendChild(campoElement);
    })
    return topoElement;
};

var emTabelaGameSession = function (gameSession) {
    var topoElement = document.createElement("tr");
    var inputElement = document.createElement("input");
    inputElement.type = 'checkbox';
    var check = topoElement.appendChild(document.createElement("td"));
    check.appendChild(inputElement);
    var campos = [gameSession.id, gameSession.session_date, gameSession.description, getPlayerName(gameSession.player_id)];
    campos.forEach(function (current) {
        var campoElement = document.createElement("td");
        campoElement.textContent = current;
        topoElement.appendChild(campoElement);
    })
    return topoElement;
};

var emTabelaStats = function (stat, position) {
    var topoElement = document.createElement("tr");
    var campos = [position, getPlayerNameByGameSession(stat.gamesession_id), stat.value];
    campos.forEach(function (current) {
        var campoElement = document.createElement("td");
        campoElement.textContent = current;
        topoElement.appendChild(campoElement);
    })
    return topoElement;
}

function calculate_age(data) {
    var Bday = +new Date(data);
    var age = ~~((Date.now() - Bday) / (31557600000));
    return age;
};

function getPlayerName(id) {
    var idP = parseInt(id);
    var player = info.players[info.players.findIndex(p => p.id === idP)];
    return player.name;
};

function getPlayerIdByName(name) {
    var player = info.players[info.players.findIndex(p => p.name === name)];
    return player.id;
};

function getPlayerNameByGameSession(id) {
    var idg = parseInt(id);
    var gs = info.gameSessions[info.gameSessions.findIndex(p => p.id === idg)];
    var name = getPlayerName(gs.player_id);
    return name;
};






function verificarForm(nome, data, pais) {
    if (nome == "" || nome == null) {
        var msgErro = "Tem de preencher o nome!";
        document.getElementById("mensagemErro").textContent = msgErro;
        return false;
    }
    if (data == "" || data == null || calculate_age(data) < 16) {
        var msgErro = "Erro na idade!";
        document.getElementById("mensagemErro").textContent = msgErro;
        return false;
    }
    if (pais == "") {
        var msgErro = "Erro no pais!";
        document.getElementById("mensagemErro").textContent = msgErro;
        return false;
    }
    document.getElementById("mensagemErro").textContent = "";
    return true;
}
