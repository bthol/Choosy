const optionsContainer = document.querySelector('.options-container');
let options = [];
let optionsIndex = 0;
function selectOption() {
    const method = document.querySelector('#selection-method').value;
    if (method === 'random-order') {
        if (optionsIndex === 0) {
            let copy = options;
            options = [];
            while (copy.length > 0) {
                const index = Math.floor(Math.random() * copy.length); 
                options.push(copy[index]);
                copy.splice(index, 1);
            }
        }
        document.querySelector('#selected-option-display').innerHTML = options[optionsIndex];
        optionsIndex += 1;
        if (optionsIndex === options.length) {
            optionsIndex = 0;
        }
        
    } else if (method === 'random-option') {
        document.querySelector('#selected-option-display').innerHTML = options[Math.floor(Math.random() * options.length)];
    }
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
document.querySelector('#selection-method').addEventListener('change', () => {
    let copy = options;
    options = [];
    while (copy.length > 0) {
        const index = Math.floor(Math.random() * copy.length); 
        options.push(copy[index]);
        copy.splice(index, 1);
    }
});