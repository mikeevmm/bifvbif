"use strict";

class Champion {
    constructor(first, nick, last) {
        this.first = first;
        this.last = last;
        this.nick = nick;
    }

    get fullName() {
        return this.first + ' "' + this.nick + '" ' + this.last;
    }
}

let alex_blin = new Champion("Alex", "Blin(g)", "Blin");
let fran_gil = new Champion("Francisco", "Xico", "Gil");
let helena = new Champion("Helena", "V", "Alberto");
let constanca = new Champion("Constança", "SNO±", "Providência");
let sampaio = new Champion("Sampaio", "Laço Mortífero", "dos Aidos");
let rui_vilao = new Champion("Rui", "Villain", "Vilão");
let paulo_gordo = new Champion("Paulo", "Phat Boi", "Gordo");
let xor_sapage = new Champion("Xôr", "Keymaster", "Sapage");
let vitaly = new Champion("Vitaly", "Vodka", "Tchepal");
let filomena = new Champion("Filomena", "???", "");


function makeChampions(left, right) {
    [[".left", left], [".right", right]].forEach(x => {
        let [css, object] = x;
        $(".champion.name" + css).each((_, element) => {
            let xhr = new XMLHttpRequest;
            xhr.open('get', 'assets/champion.svg', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                let svg = xhr.responseXML.documentElement;
                svg = document.importNode(svg, true);

                let svgnode = $(svg);
                svgnode.find('.champfirstname').each((_, element) => {
                    element.innerHTML = object.first;
                });
                svgnode.find('.champnick').each((_, element) => {
                    element.innerHTML = '"' + object.nick + '"';
                })
                svgnode.find('.champlastname').each((_, element) => {
                    element.innerHTML = object.last;
                });


                element.appendChild(svg);
            };
            xhr.send();
        });
    });
}

function makeBrackets() {
    var tournament = {
        "teams": [
          [alex_blin.fullName, fran_gil.fullName]
        ],
        "results": [ 
            [null, null]
        ]
    };

    //TODO
}

$(document).ready(function () {
    makeChampions(alex_blin, fran_gil);
    makeBrackets();
});
