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

let constanca = new Champion("Constança", "SNO±", "Providência");
let filomena = new Champion("Filo", "Avaliação", "mena");
let fran_gil = new Champion("Francisco", "Xico", "Gil");
let canelas = new Champion("Alberto", "Primo", "Canelas");
let fraga = new Champion("Fracisco", "AMPOP", "Fraga");
let sapage = new Champion("Xôr", "Keymaster", "Sapage");
let fnog = new Champion("Fernando", "ô ô", "Nogueira");
let brigitte = new Champion("Brigitte", "T", "Hiller");
let carlos = new Champion("Carlos", "Wikipédia", "Fiolhais");
let valente = new Champion("Artur", "A Fúria", "Valente");
let sampaio = new Champion("Sampaio", "Laço Mortífero", "dos Aidos");
let isabel = new Champion("Isabel", "Catedra", "Lopes");
let filipa = new Champion("Filipa", "Piada Sexista", "Soares");
let decio = new Champion("Décio", "Fúria Ruiva", "Martins");
let dona_adelia = new Champion("Dona", "Telefone", "Adélia");
let helmut = new Champion("Helmut", "Pitão", "Wolters");
let landeck = new Champion("Cardoso", "Nirvana", "Landeck");
let felipe = new Champion("Felipe", "Pokémon", "Veloso");
let travasso = new Champion("Rui", "Fofo", "Travasso");
let manuel_fiolhais = new Champion("Manuel", "O Outro", "Fiolhais");
let pva = new Champion("Pedro", "Sandes", "Alberto");
let rui_vilao = new Champion("Rui", "Villain", "Vilão");
let paixao = new Champion("António", "Paixão", "Paixão");
let benilde = new Champion("Maria", "Ninja", "Benilde");
let vitor_hugo = new Champion("Vítor", "Huge", "Hugo");
let orlando = new Champion("Orlando", "Frito", "Oliveira");
let paulo_gordo = new Champion("Paulo", "Phat Boi", "Gordo");
let liliana = new Champion("Liliana", "TLF", "Ferreira");
let pdc = new Champion("Pinto", "Perguntas", "da Cunha");
let alex_blin = new Champion("Alex", "Blin(g)", "Blin");
let vitaly = new Champion("Vitaly", "Vodka", "Tchepal");
let helena = new Champion("Helena", "V", "Alberto");


function getSvg(svgName, then) {
    let xhr = new XMLHttpRequest;
    xhr.open('get', svgName, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        let svg = xhr.responseXML.documentElement;
        svg = document.importNode(svg, true);
        then(svg);
    };
    xhr.send();
}

function makeChampions(left, right) {
    [[".left", left], [".right", right]].forEach(x => {
        let [css, object] = x;
        $(".champion.name" + css).each((_, element) => {
            getSvg('assets/champion.svg', (node) => {
                let svg = $(node);
                svg.find('.champfirstname').each((_, element) => {
                    element.innerHTML = object.first;
                });
                svg.find('.champnick').each((_, element) => {
                    element.innerHTML = '"' + object.nick + '"';
                })
                svg.find('.champlastname').each((_, element) => {
                    element.innerHTML = object.last;
                });

                element.appendChild(node);
            });
        });
    });
}

function makeBrackets() {
    // Original pairings
    let tournament = [
        [constanca, helena],
        [landeck, helmut],
        [carlos, benilde],
        [vitor_hugo, brigitte],
        [fraga, liliana],
        [pva, isabel],
        [filipa, manuel_fiolhais],
        [pdc, canelas],
        [fran_gil, alex_blin],
        [travasso, decio],
        [sampaio, rui_vilao],
        [paulo_gordo, sapage],
        [fnog, orlando],
        [paixao, valente],
        [dona_adelia, felipe],
        [vitaly, filomena]
    ];

    // Results of the elimination rounds, in order of depth, in the order above
    const Winner = Object.freeze({ 'first': 0, 'second': 1, 'none': 2 });
    let results = [
        [ // First round of eliminations
            Winner.first,  // constanca, helena
            Winner.none,   // landeck, helmut
            Winner.none,   // carlos, benilde
            Winner.none,   // vitor_hugo, brigitte
            Winner.none,   // fraga, liliana
            Winner.none,   // pva, isabel
            Winner.none,   // filipa, manuel_fiolhais
            Winner.none,   // pdc, canelas
            Winner.none,   // fran_gil, alex_blin
            Winner.none,   // travasso, decio
            Winner.second, // sampaio, rui_vilao
            Winner.first,  // paulo_gordo, sapage
            Winner.none,   // fnog, orlando
            Winner.none,   // paixao, valente
            Winner.none,   // dona_adelia, felipe
            Winner.second  // vitaly, filomena
        ],
        [ // Second round of eliminations
            Winner.none,
            Winner.none,
            Winner.none,
            Winner.none,
            Winner.none,
            Winner.none,
            Winner.none,
            Winner.none
        ],
        [ // Quarter-finals
            Winner.none,
            Winner.none,
            Winner.none,
            Winner.none
        ],
        [ // Semi-Finals
            Winner.none,
            Winner.none,
        ],
        [ // Finals
            Winner.none
        ]
    ];

    getSvg('assets/bracket.svg', (node) => {
        let svg = $(node);

        // Assigned tournament names
        let names = tournament.flat(1);
        for (let index = 0; index < names.length; ++index)
        {
            let name = names[index];

            console.log(svg.find('#name' + index));
        }

        let brackets_container = $('#brackets')[0];
        brackets_container.appendChild(node);
    });
}

$(document).ready(function () {
    makeChampions(alex_blin, fran_gil);
    makeBrackets();
});
