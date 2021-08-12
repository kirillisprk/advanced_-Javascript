'use strict';
let textRow = document.querySelector('.text-row').innerText;
// g-Глобальный поиск, т. е. поиск всех соответствий;
// m-Многострочный текст;
let regExpTask1 = /'/gm;
// Сопоставляется с ', только если ' не предшествует  w -алфавитно-цифровым символом
// из базового латинского алфавита, включая символ подчёркивания.
let regExpTask2 = /(?<!\w)'|'\W/gm;

result('.btn-process-1', regExpTask1);
result('.btn-process-2', regExpTask2);

function result(id, regExp) {
    document.querySelector(id).addEventListener('click', () => {
        let resultText = textRow.replace(regExp, '"');
        document.querySelector('.text-process').innerHTML = '';
        document.querySelector('.text-process').insertAdjacentHTML('afterbegin', `${resultText}`);

    });
}
