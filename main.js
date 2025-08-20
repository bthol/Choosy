const optionsContainer = document.querySelector('.options-container');
let options = [];
function selectOption() {
    document.querySelector('#selected-option-display').innerHTML = options[Math.floor(Math.random() * options.length)];
};
function addOption() {
    options.push(document.querySelector('#option-field').value);
    let optionsHTML = '<ul>';
    for (let i = 0; i < options.length; i++) {
        // optionsHTML += `<li>${options[i]}<button class="remove-option-btn">remove</button></li>`;
        optionsHTML += `<li>${options[i]}</li>`;
    }
    optionsHTML += '</ul>';
    optionsContainer.innerHTML = optionsHTML;
};
document.querySelector('#select-option-btn').addEventListener('click', selectOption);
document.querySelector('#add-option-btn').addEventListener('click', addOption);