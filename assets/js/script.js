import { participants } from './participants.js';

function fillCard(element) {
    return `
    <div class="card ausent">
        <div class="portrait">
            <img class="photo" src="${element.img}" alt="Avatar" onerror="this.src='./assets/img/img_avatar.png';">
        </div>
        <div class="card--body">
            <h2>${element.rank + ' ' + element.name}</h2>
            <h3>${element.fullName}</h3>
            <data value="${element.optionValue}" hidden>${element.course + ' ' + element.option}</data>
        </div>
    </div>`
}

function renderCards(list) {
    const content = list.map(element => fillCard(element)).join('');
    $('.container').html(content);
    $('.card').on('click', handleClickCard);
}

function handleClickCard() {
    $(this).toggleClass('ausent');
}

function filterList() {
    const option = $('#filter option:selected').val();
    $('.card').show();
    if(option == '0') return 
    $('.card').filter(function()    {
        return $(this).find('data').val() != option;
    }).hide();
}

function resetList() {
    $('.card').addClass('ausent');
}

function exportList() {
    let csv = 'data:text/csv;charset=utf-8,' + 'Faltas\n'; 
    const missing = $('.card').filter('.ausent');
    
    missing.each(function() {
        let [top, middle, bottom] = ['', '', ''];
        if ($(this).find('data').val() == 1) {
            top += $(this).find('data').text() + ',';
            top += $(this).find('h3').text() + '\n';
        } else if ($(this).find('data').val() == 2) {
            middle += $(this).find('data').text() + ',';
            middle += $(this).find('h3').text() + '\n';
        } else {
            bottom += $(this).find('data').text() + ',';
            bottom += $(this).find('h3').text() + '\n';
        }
        csv += top + middle + bottom;
    });
    console.log(csv);

    let encodedUri = encodeURI(csv);
    window.open(encodedUri);
}

$(document).ready(() => {
    renderCards(participants);
    $('#search').on('click', filterList);
    $('#export').on('click', exportList);
    $('#reset').on('click', resetList);
});