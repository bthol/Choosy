"use strict";
// ['#DB0F0F', '#DB780F', '#DBC70F', '#5adb0fff'];
var optionColors = ['hsla(0, 98%, 72%, 1.00)', 'hsla(100, 98%, 42%, 1.00)', 'hsla(240, 98%, 77%, 1.00)'];
var optionColorsIndex = 0;
var optionsIndex = 0;
var options = [];
var optionsRand = [];
function optionsRandomizeOrder() {
    var max = 1000;
    if (options.length < max) {
        var unordered = [];
        var indexes = [];
        var indexCount = 0;
        for (var i in options) {
            indexes.push(indexCount);
            indexCount += 1;
        }
        var limiter = 0;
        while (limiter < max && indexes.length > 0) {
            limiter += 1;
            var random = Math.floor(Math.random() * indexes.length);
            var index = indexes[random];
            if (index !== undefined && options[index]) {
                unordered.push(index);
                indexes.splice(random, 1);
            }
            else {
                console.error('ERROR: no data at index: ' + "".concat(index));
            }
        }
        optionsRand = unordered;
    }
    else {
        console.error('ERROR: exceeded maximum array length');
    }
}
;
function selectOption() {
    var _a, _b;
    var selectedDisplay = document.querySelector('#selected-option-display');
    var selectionMethod = document.querySelector('#selection-method');
    if (selectionMethod && selectedDisplay) {
        var methodStr = selectionMethod.value;
        if (methodStr === 'random-order') {
            if (optionsRand) {
                if (optionsIndex === 0) {
                    optionsRandomizeOrder();
                }
                var index = optionsRand[optionsIndex];
                if (index !== undefined) {
                    var choice_1 = (_a = options[index]) === null || _a === void 0 ? void 0 : _a.option;
                    selectedDisplay.innerHTML = "".concat(choice_1);
                    options.forEach(function (option, index) {
                        if (option.option === choice_1) {
                            selectedDisplay.setAttribute('style', "background-color: ".concat(optionColors[index % optionColors.length]));
                        }
                    });
                    optionsIndex += 1;
                    if (optionsIndex === optionsRand.length) {
                        optionsIndex = 0;
                    }
                }
                else {
                    console.error('ERROR: data not found at index during selection');
                }
            }
        }
        else if (methodStr === 'random-option') {
            var i = Math.floor(Math.random() * options.length);
            selectedDisplay.innerHTML = "".concat((_b = options[i]) === null || _b === void 0 ? void 0 : _b.option);
            selectedDisplay.setAttribute('style', "background-color: ".concat(optionColors[i % optionColors.length]));
        }
    }
}
;
function clearOptions() {
    var optionsContainer = document.querySelector('.options-container');
    var selectedDisplay = document.querySelector('#selected-option-display');
    var optionField = document.querySelector('#option-field');
    options = [];
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
    }
    if (selectedDisplay) {
        selectedDisplay.innerHTML = '';
        selectedDisplay.setAttribute('style', 'background: none');
    }
    if (optionField) {
        optionField.value = '';
    }
}
;
function removeOption(event) {
    var _a, _b;
    if (options && event.currentTarget && event.currentTarget && event.target) {
        var node = event.target;
        var parent_1 = node.parentElement;
        if (parent_1) {
            var div = parent_1.querySelector('div');
            if (div) {
                var content = div.textContent;
                for (var i = 0; i < options.length; i++) {
                    if (((_a = options[i]) === null || _a === void 0 ? void 0 : _a.option) === content) {
                        options.splice(i, 1);
                        break;
                    }
                }
                for (var i = 0; i < optionsRand.length; i++) {
                    var index = optionsRand[i];
                    if (index && ((_b = options[index]) === null || _b === void 0 ? void 0 : _b.option) === content) {
                        optionsRand.splice(i, 1);
                        break;
                    }
                }
                if (optionsIndex > optionsRand.length - 1) {
                    optionsIndex = 0;
                }
                parent_1.remove();
                updateOptions();
            }
        }
    }
}
;
function updateOptions() {
    var _a;
    var optionsContainer = document.querySelector('.options-container');
    if (optionsContainer) {
        optionColorsIndex = 0;
        var optionsHTML = '';
        for (var i = 0; i < options.length; i++) {
            optionsHTML += "<div class=\"list-option-style\" style=\"background-color:".concat(optionColors[optionColorsIndex], "\"><div>").concat((_a = options[i]) === null || _a === void 0 ? void 0 : _a.option, "</div><button class=\"remove-option-btn\">x</button></div>");
            optionColorsIndex += 1;
            if (optionColorsIndex === optionColors.length) {
                optionColorsIndex = 0;
            }
        }
        document.querySelectorAll('.remove-option-btn').forEach(function (btn) {
            btn.removeEventListener('click', removeOption);
        });
        optionsContainer.innerHTML = "".concat(optionsHTML);
        document.querySelectorAll('.remove-option-btn').forEach(function (btn) {
            btn.addEventListener('click', removeOption, { once: true });
        });
    }
    else {
        console.error('ERROR: options not updated');
    }
}
;
function addOption() {
    var optionField = document.querySelector('#option-field');
    var optionsContainer = document.querySelector('.options-container');
    var selectionMethod = document.querySelector('#selection-method');
    if (optionField) {
        var optionStr = optionField.value;
        optionField.value = '';
        if (optionStr && optionsContainer && selectionMethod) {
            var option = { option: optionStr };
            options.push(option);
            updateOptions();
        }
    }
}
;
function goPage(pageNumber) {
    if (pageNumber === 0) { // choose page
        var main = document.querySelector('main');
        if (main) {
            // clear data
            options = [];
            optionsRand = [];
            // clear page
            main.innerHTML = '';
            // build page
            var section1 = document.createElement('section');
            section1.setAttribute('id', 'user-data');
            section1.setAttribute('class', 'section-separate-style section-margins');
            var pageTitle = document.createElement('h2');
            pageTitle.innerText = 'Choose';
            var div1 = document.createElement('div');
            div1.innerHTML = "<label for=\"selection-method\">Selection Method: </label><select name=\"selection-method\" id=\"selection-method\"><option value=\"random-order\" selected>random order of options</option><option value=\"random-option\">get a random option</option></select>";
            var div2 = document.createElement('div');
            div2.innerHTML = "<input id=\"option-field\" type=\"text\" placeholder=\"add option\" autocomplete=\"false\" spellcheck=\"true\" autofocus> <button id=\"add-option-btn\">add</button> <button id=\"clear-options-btn\">clear</button> <button id=\"select-option-btn\">select</button>";
            var section2 = document.createElement('section');
            section2.setAttribute('id', 'user-data');
            section2.setAttribute('class', 'section-separate-style section-margins');
            var div3 = document.createElement('div');
            div3.innerHTML = "<div class=\"selected-option-display-container\"><div id=\"selected-option-display\" class=\"list-option-style\"></div></div>";
            var div4 = document.createElement('div');
            div4.setAttribute('class', 'options-container');
            section1.appendChild(pageTitle);
            section1.appendChild(div1);
            section1.appendChild(div2);
            section2.appendChild(div3);
            section2.appendChild(div4);
            main.appendChild(section1);
            main.appendChild(section2);
            // scan page
            var selectionOptionBtn_1 = document.querySelector('#select-option-btn');
            var addOptionBtn_1 = document.querySelector('#add-option-btn');
            var clearOPtionsBtn_1 = document.querySelector('#clear-options-btn');
            var selectionMethod_1 = document.querySelector('#selection-method');
            var optionField_1 = document.querySelector('#option-field');
            // add listeners
            if (selectionOptionBtn_1 && addOptionBtn_1 && clearOPtionsBtn_1) {
                selectionOptionBtn_1.addEventListener('click', selectOption);
                addOptionBtn_1.addEventListener('click', addOption);
                clearOPtionsBtn_1.addEventListener('click', clearOptions);
            }
            else {
                console.error('ERROR: Button(s) not found');
            }
            if (selectionMethod_1) {
                selectionMethod_1.addEventListener('change', function () {
                    if (selectionMethod_1.value === 'random-order') {
                        optionsRandomizeOrder();
                    }
                });
            }
            if (optionField_1) {
                optionField_1.focus();
                optionField_1.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') {
                        addOption();
                    }
                });
            }
            else {
                console.error('ERROR: keyboard compatability degraded');
            }
        }
        else {
            console.error('ERROR: main node not found');
        }
    }
    else if (pageNumber === 1) { // manual page
        // clean up listners
        var selectionOptionBtn_2 = document.querySelector('#select-option-btn');
        if (selectionOptionBtn_2) {
            selectionOptionBtn_2.removeEventListener('click', selectOption);
        }
        var addOptionBtn_2 = document.querySelector('#add-option-btn');
        if (addOptionBtn_2) {
            addOptionBtn_2.removeEventListener('click', addOption);
        }
        var clearOPtionsBtn_2 = document.querySelector('#clear-options-btn');
        if (clearOPtionsBtn_2) {
            clearOPtionsBtn_2.removeEventListener('click', clearOptions);
        }
        var main = document.querySelector('main');
        if (main) {
            // clear data
            options = [];
            optionsRand = [];
            // clear page
            main.innerHTML = '';
            // build page
            var section1 = document.createElement('section');
            section1.setAttribute('class', 'section-separate-style');
            var pageTitle = document.createElement('h2');
            pageTitle.innerText = 'Manual';
            var p1 = document.createElement('p');
            p1.innerText = '1.) Enter each option into the options field and click the add button.';
            var p2 = document.createElement('p');
            p2.innerText = '2.) Choose the selection method you want using the drop down menu.';
            var p3 = document.createElement('p');
            p3.innerText = '3.) Click the select button to randomly select one of the options.';
            section1.appendChild(pageTitle);
            section1.appendChild(p1);
            section1.appendChild(p2);
            section1.appendChild(p3);
            main.appendChild(section1);
        }
        else {
            console.error('ERROR: main node not found');
        }
    }
    else if (pageNumber === 2) { // about page
        // clean up listners
        var selectionOptionBtn_3 = document.querySelector('#select-option-btn');
        if (selectionOptionBtn_3) {
            selectionOptionBtn_3.removeEventListener('click', selectOption);
        }
        var addOptionBtn_3 = document.querySelector('#add-option-btn');
        if (addOptionBtn_3) {
            addOptionBtn_3.removeEventListener('click', addOption);
        }
        var clearOPtionsBtn_3 = document.querySelector('#clear-options-btn');
        if (clearOPtionsBtn_3) {
            clearOPtionsBtn_3.removeEventListener('click', clearOptions);
        }
        var main = document.querySelector('main');
        if (main) {
            // clear data
            options = [];
            optionsRand = [];
            // clear page
            main.innerHTML = '';
            // build page
            var section1 = document.createElement('section');
            section1.setAttribute('class', 'section-separate-style');
            var pageTitle = document.createElement('h2');
            pageTitle.innerText = 'About';
            var p1 = document.createElement('p');
            p1.innerText = 'Choosy is a simple website for random option selection. Need to choose? Choose Choosy!';
            section1.appendChild(pageTitle);
            section1.appendChild(p1);
            main.appendChild(section1);
        }
        else {
            console.error('ERROR: main node not found');
        }
    }
}
;
var navBTNS = document.querySelectorAll('.page-nav');
if (navBTNS) {
    navBTNS.forEach(function (btn, index) {
        btn.addEventListener('click', function () { goPage(index); });
    });
}
else {
    console.error('ERROR: nav buttons not found');
}
// scan page
var selectionOptionBtn = document.querySelector('#select-option-btn');
var addOptionBtn = document.querySelector('#add-option-btn');
var clearOPtionsBtn = document.querySelector('#clear-options-btn');
var selectionMethod = document.querySelector('#selection-method');
var optionField = document.querySelector('#option-field');
// add listeners
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
    optionField.focus();
    optionField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addOption();
        }
    });
}
else {
    console.error('ERROR: keyboard compatability degraded');
}
//# sourceMappingURL=main.js.map