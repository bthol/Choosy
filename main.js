const optionsContainer = document.querySelector('.options-container');
let options = [];
function selectOption() {
    document.querySelector('#selected-option-display').innerHTML = options[Math.floor(Math.random() * options.length)];
};
function clearOptions() {
    optionsContainer.innerHTML = '';
    options = [];
};
function removeOption(event) {
    event.target.removeEventListener('click', removeOption);
    const content = event.target.parentNode.querySelector('li').textContent;
    for (let i = 0; i < options.length; i++) {
        if (options[i] === content) {
            options.splice(i, 1);
            break;
        }
    }
    event.target.parentNode.remove();
};
function addOption() {
    options.push(document.querySelector('#option-field').value);
    let optionsHTML = '<ul>';
    for (let i = 0; i < options.length; i++) {
        optionsHTML += `<div class="list-option-style"><li>${options[i]}</li><button class="remove-option-btn">remove</button></div>`;
    }
    optionsHTML += '</ul>';
    optionsContainer.innerHTML = optionsHTML;
    document.querySelectorAll('.remove-option-btn').forEach((btn) => {
        btn.addEventListener('click', removeOption);
    });
};
document.querySelector('#select-option-btn').addEventListener('click', selectOption);
document.querySelector('#add-option-btn').addEventListener('click', addOption);
document.querySelector('#clear-options-btn').addEventListener('click', clearOptions);