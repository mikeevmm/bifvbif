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

$(document).ready(function () {
    let left = new Champion("Paulo", "Phat Boy", "Gordo");
    let right = new Champion("Xôr", "Keymaster", "Sapage");

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
});