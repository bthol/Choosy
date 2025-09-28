"use strict";
var optionsContainer = document.querySelector('.options-container');
var selectedDisplay = document.querySelector('#selected-option-display');
var selectionMethod = document.querySelector('#selection-method');
var optionField = document.querySelector('#option-field');
var selectionOptionBtn = document.querySelector('#select-option-btn');
var addOptionBtn = document.querySelector('#add-option-btn');
var clearOPtionsBtn = document.querySelector('#clear-options-btn');
var optionsIndex = 0;
var options = [];
var optionsRand = [];
function strArrRandomOrder(ordered) {
    var max = 1000;
    if (ordered.length < max) {
        var unordered = [];
        var indexes = [];
        var indexCount = 0;
        for (var i in ordered) {
            indexes.push(indexCount);
            indexCount += 1;
        }
        var limiter = 0;
        while (limiter < max && indexes.length > 0) {
            limiter += 1;
            var random = Math.floor(Math.random() * indexes.length);
            var index = indexes[random];
            if (index !== undefined && ordered[index]) {
                unordered.push(ordered[index]);
                indexes.splice(random, 1);
            }
            else {
                console.error('ERROR: no data at index: ' + "".concat(index));
            }
        }
        return unordered;
    }
    else {
        console.error('ERROR: exceeded maximum array length');
    }
}
;
function optionsRandomizeOrder() {
    optionsRand = strArrRandomOrder(options);
}
;
function selectOption() {
    if (selectionMethod && selectedDisplay) {
        var methodStr = selectionMethod.value;
        if (methodStr === 'random-order') {
            if (optionsRand) {
                if (optionsIndex === 0) {
                    optionsRandomizeOrder();
                }
                selectedDisplay.innerHTML = "".concat(optionsRand[optionsIndex]);
                optionsIndex += 1;
                if (optionsIndex === optionsRand.length) {
                    optionsIndex = 0;
                }
            }
        }
        else if (methodStr === 'random-option') {
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
    console.error('ERROR: Button(s) not found');
}
if (selectionMethod) {
    selectionMethod.addEventListener('change', function () {
        if (selectionMethod.value === 'random-order') {
            optionsRandomizeOrder();
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
    console.error('ERROR: keyboard compatability degraded');
}
// // remove duplicates
// let duplicates: number[] = [1, 1, 2, 7, 4, 9, 3, 8, 8, 2, 4];
// function removeDuplicates(arr: number[]): number[] {
//     let duplicates: boolean = true;
//     let found: boolean = false;
//     while (duplicates) {
//         found = false;
//         for (let i = 0; i < arr.length; i++) {
//             for (let j = i; j < arr.length; j++) {
//                 if (i !== j && arr[i] === arr[j]) {
//                     arr.splice(i, 1);
//                     found = true;
//                     break;
//                 }
//             }
//             if (i + 1 === arr.length && !found) {
//                 duplicates = false;
//             } else if (found) {
//                 break;
//             }
//         }
//     }
//     return arr;
// };
// console.log('now you see duplicates: ' + duplicates.join(', '));
// removeDuplicates(duplicates);
// console.log("now you don't: " + duplicates.join(', '));
//# sourceMappingURL=main.js.map