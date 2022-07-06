import {Obj_class} from "./Obj_class.js";
import {Face_class} from "./Face_class.js";

export function start() {
    user = sessionStorage.getItem("user");
    cod = sessionStorage.getItem("cod");
    document.getElementById("name1").innerHTML = user;
    if (cod === "") {
        document.getElementById("title_cod").innerHTML = "Partita Publica ";
        conPublic();
    } else {
        document.getElementById("title_cod").innerHTML = "Codice: " + cod;
        conPrivate();
    }
}

let user;
let cod;
let sock = io();
let turno = 0;
let old_canavas;
let turno_label = document.getElementById("turno");
const src = [["f1.jpeg", "face"], ["f2.jpg", "face"], ["f3.jpg", "Chair"], ["f4.jpg", "face"], ["f5.jpeg", "face"], ["f6.jpg", "face"], ["f7.jpg", "face"], ["f8.jpg", "face"]];

const writeEvent = (text) => {
    const parent = document.querySelector('#events');
    const el = document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
};

const addWinListeners = () => {
    sock.on('win', (message) => {
        alert(message);
        window.location.href = '../index.html'
    });
}

const addStartListeners = () => {
    sock.on('start', () => {
        if (turno < src.length) {
            if (src[turno][1] === "face") {
                let face_class = new Face_class(sock);
                if (document.getElementsByClassName("can-img")[0] === undefined) {
                    old_canavas = null;
                    console.log("old canvas undefined", old_canavas)
                } else {
                    old_canavas = document.getElementsByClassName("can-img")[0]
                    console.log("old canvas not undefined", old_canavas)
                }
                face_class.onFrame("./image/opere/" + src[turno][0], old_canavas);
                turno = turno + 1;
                writeTurn();
            } else {
                let obj_class = new Obj_class(3, "Chair", sock);
                if (document.getElementsByClassName("can-img")[0] === undefined) {
                    old_canavas = null;
                } else {
                    old_canavas = document.getElementsByClassName("can-img")[0]
                }
                obj_class.onFrame("./image/opere/" + src[turno][0], old_canavas);
                turno = turno + 1;
                writeTurn();
            }
        }
    });
}

const addUserListeners = () => {
    sock.on('user', (name) => {
        document.getElementById("name2").innerHTML = name;
    });
}

const addPuntListeners = () => {
    sock.on('punt', (p1, p2) => {
        document.getElementById("punt1").innerHTML = p1;
        document.getElementById("punt2").innerHTML = p2;
        addPuntListeners();
    });
}

function writeTurn() {
    turno_label.innerHTML = "Turno: " + turno;
}

function conPublic() {
    sock.emit('public', user, src.length);
    sock.on('message', writeEvent);
    addUserListeners();
    addStartListeners();
    addPuntListeners();
    addWinListeners();
}

function conPrivate() {
    sock.emit('private', cod, user, src.length);
    sock.on('message', writeEvent);
    addUserListeners();
    addStartListeners();
    addPuntListeners();
    addWinListeners();
}
