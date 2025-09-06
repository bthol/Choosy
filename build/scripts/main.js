"use strict";
var optionsContainer = document.querySelector('.options-container');
var selectedDisplay = document.querySelector('#selected-option-display');
var selectionMethod = document.querySelector('#selection-method');
var optionField = document.querySelector('#option-field');
var selectionOptionBtn = document.querySelector('#select-option-btn');
var addOptionBtn = document.querySelector('#add-option-btn');
var clearOPtionsBtn = document.querySelector('#clear-options-btn');
var options = [];
var optionsIndex = 0;
function selectOption() {
    if (selectionMethod) {
        var methodStr = selectionMethod.value;
        if (methodStr === 'random-order') {
            if (optionsIndex === 0) {
                var copy = options;
                options = [];
                while (copy.length > 0) {
                    var index = Math.floor(Math.random() * copy.length);
                    if (copy[index]) {
                        options.push(copy[index]);
                        copy.splice(index, 1);
                    }
                }
            }
            if (selectedDisplay) {
                selectedDisplay.innerHTML = "".concat(options[optionsIndex]);
            }
            optionsIndex += 1;
            if (optionsIndex === options.length) {
                optionsIndex = 0;
            }
        }
        else if (methodStr === 'random-option' && selectedDisplay) {
            selectedDisplay.innerHTML = "".concat(options[Math.floor(Math.random() * options.length)]);
        }
    }
}
;
function clearOptions() {
    options = [];
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
    }
    if (selectedDisplay) {
        selectedDisplay.innerHTML = '';
    }
    if (optionField) {
        optionField.value = '';
    }
}
;
function removeOption(event) {
    if (options && event.currentTarget && event.currentTarget && event.target) {
        var node = event.target;
        var parent_1 = node.parentElement;
        if (parent_1) {
            var listItem = parent_1.querySelector('li');
            if (listItem) {
                var content = listItem.textContent;
                event.currentTarget.removeEventListener('click', removeOption);
                for (var i = 0; i < options.length; i++) {
                    if (options[i] === content) {
                        options.splice(i, 1);
                        break;
                    }
                }
                parent_1.remove();
            }
        }
    }
}
;
function addOption() {
    if (optionField) {
        var option = optionField.value;
        if (option && optionsContainer && selectionMethod) {
            options.push(option);
            var optionsHTML = '<ul>';
            for (var i = 0; i < options.length; i++) {
                optionsHTML += "<div class=\"list-option-style\"><li>".concat(options[i], "</li><button class=\"remove-option-btn\">remove</button></div>");
            }
            optionsHTML += '</ul>';
            optionsContainer.innerHTML = "".concat(optionsHTML);
            document.querySelectorAll('.remove-option-btn').forEach(function (btn) {
                btn.addEventListener('click', removeOption);
            });
            if (selectionMethod.value === 'random-order') {
                var copy = options;
                options = [];
                while (copy.length > 0) {
                    var index = Math.floor(Math.random() * copy.length);
                    if (copy[index]) {
                        options.push(copy[index]);
                        copy.splice(index, 1);
                    }
                }
            }
        }
    }
}
;
if (selectionOptionBtn && addOptionBtn && clearOPtionsBtn) {
    selectionOptionBtn.addEventListener('click', selectOption);
    addOptionBtn.addEventListener('click', addOption);
    clearOPtionsBtn.addEventListener('click', clearOptions);
}
else {
    console.error('Button(s) not found');
}
if (selectionMethod) {
    selectionMethod.addEventListener('change', function () {
        if (options) {
            if (selectionMethod.value === 'random-order') {
                var copy = options;
                options = [];
                while (copy.length > 0) {
                    var index = Math.floor(Math.random() * copy.length);
                    if (copy[index]) {
                        options.push(copy[index]);
                        copy.splice(index, 1);
                    }
                }
            }
        }
    });
}
if (optionField) {
    optionField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addOption();
        }
    });
}
else {
    console.error('Keyboard compatability degraded');
}
//# sourceMappingURL=main.js.map