"use strict";
;
// ['#DB0F0F', '#DB780F', '#DBC70F', '#5adb0fff'];
var optionColors = ['hsla(0, 98%, 72%, 1.00)', 'hsla(100, 98%, 42%, 1.00)', 'hsla(240, 98%, 77%, 1.00)'];
var methods = [
    'cost-benefit',
    'random-order',
    'random-option'
];
var optionColorsIndex = 0;
var optionsIndex = 0;
var options = [];
var optionsRand = [];
function validCostBenefitInput(event) {
    var target = event.target;
    if (target) {
        var input = target.value;
        var regex = /.*\D.*/;
        if (regex.test(input) === true) {
            target.value = input.split('').slice(0, target.value.length - 1).join('');
        }
    }
}
;
function clearOptions() {
    var optionsContainer = document.querySelector('.options-container');
    var selectedDisplay = document.querySelector('#selected-option-display');
    var optionField = document.querySelector('#option-field');
    options = [];
    optionsIndex = 0;
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
    }
    if (selectedDisplay) {
        selectedDisplay.classList.remove('list-option-style');
        selectedDisplay.innerHTML = '';
    }
    if (optionField) {
        optionField.value = '';
    }
}
;
function updateOptions() {
    var _a;
    var optionsContainer = document.querySelector('.options-container');
    if (optionsContainer) {
        // clean up listeners
        document.querySelectorAll('.remove-option-btn').forEach(function (btn) {
            btn.removeEventListener('click', removeOption);
        });
        document.querySelectorAll('.option-backward-btn').forEach(function (btn) {
            btn.removeEventListener('click', optionBackward);
        });
        document.querySelectorAll('.option-forward-btn').forEach(function (btn) {
            btn.removeEventListener('click', optionForward);
        });
        document.querySelectorAll('.cost-input').forEach(function (input) {
            input.removeEventListener('input', validCostBenefitInput);
        });
        document.querySelectorAll('.benefit-input').forEach(function (input) {
            input.removeEventListener('input', validCostBenefitInput);
        });
        // get user data for conditional option formatting
        var selectionMethod_1 = document.querySelector('#selection-method');
        // init color index + clear old option elements
        optionColorsIndex = 0;
        optionsContainer.innerHTML = '';
        // add new option elements
        for (var i = 0; i < options.length; i++) {
            // build option
            var optionElement = document.createElement('div');
            optionElement.setAttribute('class', 'list-option-style');
            optionElement.setAttribute('style', "background-color:".concat(optionColors[optionColorsIndex]));
            optionColorsIndex += 1;
            if (optionColorsIndex === optionColors.length) {
                optionColorsIndex = 0;
            }
            // add remove button
            var removeBTN = document.createElement('button');
            removeBTN.setAttribute('type', 'button');
            removeBTN.setAttribute('class', 'remove-option-btn remove-option-btn-style');
            var removeIcon = document.createElement('i');
            removeIcon.setAttribute('class', 'fa-solid fa-x fa-sm remove-option-btn');
            removeBTN.appendChild(removeIcon);
            optionElement.appendChild(removeBTN);
            // add text content
            var textDiv = document.createElement('div');
            textDiv.setAttribute('class', 'option-text-element');
            textDiv.innerText = "".concat((_a = options[i]) === null || _a === void 0 ? void 0 : _a.option);
            optionElement.appendChild(textDiv);
            // add backward button
            var backBTN = document.createElement('button');
            backBTN.setAttribute('type', 'button');
            backBTN.setAttribute('class', 'option-backward-btn option-backward-btn-style');
            var backIcon = document.createElement('i');
            backIcon.setAttribute('class', 'fa fa-arrow-left option-backward-btn');
            backBTN.appendChild(backIcon);
            optionElement.appendChild(backBTN);
            // add forward button
            var forwardBTN = document.createElement('button');
            forwardBTN.setAttribute('type', 'button');
            forwardBTN.setAttribute('class', 'option-forward-btn option-forward-btn-style');
            var forwardIcon = document.createElement('i');
            forwardIcon.setAttribute('class', 'fa fa-arrow-right option-forward-btn');
            forwardBTN.appendChild(forwardIcon);
            optionElement.appendChild(forwardBTN);
            // add conditional formatting
            if (selectionMethod_1 !== null) {
                if (selectionMethod_1.value === 'cost-benefit') {
                    // add cost input
                    var costInput = document.createElement('input');
                    costInput.setAttribute('type', 'text');
                    costInput.setAttribute('placeholder', 'cost');
                    costInput.setAttribute('class', 'cost-input cost-input-style generic-input-style');
                    optionElement.appendChild(costInput);
                    // add benefit input
                    var benefitInput = document.createElement('input');
                    benefitInput.setAttribute('type', 'text');
                    benefitInput.setAttribute('placeholder', 'benefit');
                    benefitInput.setAttribute('class', 'benefit-input benefit-input-style generic-input-style');
                    optionElement.appendChild(benefitInput);
                }
            }
            else {
                console.error('ERROR: conditional feature of option could not render');
            }
            // append option to options container
            optionsContainer.appendChild(optionElement);
        }
        // add new listeners
        document.querySelectorAll('.remove-option-btn').forEach(function (btn) {
            btn.addEventListener('click', removeOption, { once: true });
        });
        document.querySelectorAll('.option-backward-btn').forEach(function (btn) {
            btn.addEventListener('click', optionBackward);
        });
        document.querySelectorAll('.option-forward-btn').forEach(function (btn) {
            btn.addEventListener('click', optionForward);
        });
        document.querySelectorAll('.cost-input').forEach(function (input) {
            input.addEventListener('input', validCostBenefitInput);
        });
        document.querySelectorAll('.benefit-input').forEach(function (input) {
            input.addEventListener('input', validCostBenefitInput);
        });
    }
    else {
        console.error('ERROR: options not updated');
    }
}
;
function optionsRandomizeOrder() {
    var max = 1000;
    if (options.length > 0 && options.length < max) {
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
    var _a, _b, _c, _d, _e;
    if (options.length > 0) {
        var selectedDisplay_1 = document.querySelector('#selected-option-display');
        var selectionMethod_2 = document.querySelector('#selection-method');
        if (selectionMethod_2 && selectedDisplay_1) {
            var methodStr = selectionMethod_2.value;
            if (methodStr === methods[0]) { // 'cost-benefit'
                var error_1 = false;
                document.querySelectorAll('.cost-input').forEach(function (input, index) {
                    if (input && options[index]) {
                        var inputElement = input;
                        console.log(inputElement.value);
                        if (inputElement.value !== '') {
                            options[index].cost = Number(inputElement.value);
                        }
                        else {
                            error_1 = true;
                        }
                    }
                });
                if (!error_1) {
                    document.querySelectorAll('.benefit-input').forEach(function (input, index) {
                        if (input && options[index]) {
                            var inputElement = input;
                            if (inputElement.value !== '') {
                                options[index].benefit = Number(inputElement.value);
                            }
                            else {
                                error_1 = true;
                            }
                        }
                    });
                    if (!error_1) {
                        var maximum = 0;
                        var maxIndex = 0;
                        for (var i in options) {
                            if (options[i] && ((_a = options[i]) === null || _a === void 0 ? void 0 : _a.benefit) && ((_b = options[i]) === null || _b === void 0 ? void 0 : _b.cost)) {
                                var costBenefitRatio = options[i].benefit / options[i].cost;
                                if (costBenefitRatio > maximum) {
                                    maximum = costBenefitRatio;
                                    maxIndex = Number(i);
                                }
                            }
                        }
                        selectedDisplay_1.innerHTML = "<div class=\"option-text-element\">".concat((_c = options[maxIndex]) === null || _c === void 0 ? void 0 : _c.option, "</div>");
                        selectedDisplay_1.setAttribute('style', "background-color: ".concat(optionColors[maxIndex % optionColors.length]));
                        selectedDisplay_1.classList.add('list-option-style');
                    }
                }
            }
            else if (methodStr === methods[methods.length - 2]) { // 'random-order'
                if (optionsRand) {
                    if (optionsIndex === 0) {
                        optionsRandomizeOrder();
                    }
                    var index = optionsRand[optionsIndex];
                    if (index !== undefined) {
                        var choice_1 = (_d = options[index]) === null || _d === void 0 ? void 0 : _d.option;
                        selectedDisplay_1.innerHTML = "<div class=\"option-text-element\">".concat(choice_1, "</div>");
                        selectedDisplay_1.classList.add('list-option-style');
                        options.forEach(function (option, index) {
                            if (option.option === choice_1) {
                                selectedDisplay_1.setAttribute('style', "background-color: ".concat(optionColors[index % optionColors.length]));
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
            else if (methodStr === methods[methods.length - 1]) { // 'random-option'
                var i = Math.floor(Math.random() * options.length);
                selectedDisplay_1.innerHTML = "<div class=\"option-text-element\">".concat((_e = options[i]) === null || _e === void 0 ? void 0 : _e.option, "</div>");
                selectedDisplay_1.setAttribute('style', "background-color: ".concat(optionColors[i % optionColors.length]));
                selectedDisplay_1.classList.add('list-option-style');
            }
        }
    }
}
;
function removeOption(event) {
    var _a, _b, _c;
    if (options && event.currentTarget && event.currentTarget && event.target) {
        var node = event.target;
        var root = node.parentElement;
        if (node.parentElement && node.parentElement.nodeName === 'BUTTON') {
            root = (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        }
        if (root) {
            var div = root.querySelector('.option-text-element');
            if (div) {
                var content = div.textContent;
                for (var i = 0; i < options.length; i++) {
                    if (((_b = options[i]) === null || _b === void 0 ? void 0 : _b.option) === content) {
                        options.splice(i, 1);
                        break;
                    }
                }
                for (var i = 0; i < optionsRand.length; i++) {
                    var index = optionsRand[i];
                    if (index && ((_c = options[index]) === null || _c === void 0 ? void 0 : _c.option) === content) {
                        optionsRand.splice(i, 1);
                        break;
                    }
                }
                if (optionsIndex > optionsRand.length - 1) {
                    optionsIndex = 0;
                }
                root.remove();
                updateOptions();
            }
        }
    }
}
;
function reorderOptions(i1, i2, len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(i);
    }
    if (i1 !== i2 && i1 < len && i2 < len) {
        if (i1 < i2) {
            arr.splice(i2 + 1, 0, i1);
            arr.splice(i1, 1);
        }
        else {
            arr.splice(i2, 0, i1);
            arr.splice(i1 + 1, 1);
        }
    }
    var optionsReorder = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var i = arr_1[_i];
        if (options[i]) {
            optionsReorder.push(options[i]);
        }
    }
    return optionsReorder;
}
;
function optionBackward(event) {
    var _a, _b;
    if (event.target) {
        var node = event.target;
        var root = node.parentElement;
        if (node.parentElement && node.parentElement.nodeName === 'BUTTON') {
            root = (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        }
        if (root) {
            var text = root.querySelector('.option-text-element');
            if (text) {
                var content = text.textContent;
                for (var i = 0; i < options.length; i++) {
                    if (((_b = options[i]) === null || _b === void 0 ? void 0 : _b.option) === content && i - 1 > -1) {
                        options = reorderOptions(i, i - 1, options.length);
                        if (selectionMethod && selectionMethod.value === 'random-order') {
                            optionsRandomizeOrder();
                        }
                        updateOptions();
                        break;
                    }
                }
            }
        }
    }
}
;
function optionForward(event) {
    var _a, _b;
    if (event.target) {
        var node = event.target;
        var root = node.parentElement;
        if (node.parentElement && node.parentElement.nodeName === 'BUTTON') {
            root = (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        }
        if (root) {
            var text = root.querySelector('.option-text-element');
            if (text) {
                var content = text.textContent;
                for (var i = 0; i < options.length; i++) {
                    if (((_b = options[i]) === null || _b === void 0 ? void 0 : _b.option) === content && i + 1 < options.length) {
                        options = reorderOptions(i, i + 1, options.length);
                        if (selectionMethod && selectionMethod.value === 'random-order') {
                            optionsRandomizeOrder();
                        }
                        updateOptions();
                        break;
                    }
                }
            }
        }
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
            div1.innerHTML = "<label for=\"selection-method\">Selection Method: </label><select name=\"selection-method\" id=\"selection-method\" class=\"choose-control-btn-style\"><option value=\"random-order\" selected>random order of options</option><option value=\"random-option\">get a random option</option></select>";
            var div2 = document.createElement('div');
            div2.innerHTML = "<input id=\"option-field\" type=\"text\" placeholder=\"add option\" autocomplete=\"false\" spellcheck=\"true\" autofocus> <button id=\"add-option-btn\" class=\"choose-control-btn-style\" type=\"button\">add</button> <button id=\"clear-options-btn\" class=\"choose-control-btn-style\" type=\"button\">clear</button> <button id=\"select-option-btn\" class=\"choose-control-btn-style\" type=\"button\">select</button>";
            var section2 = document.createElement('section');
            section2.setAttribute('id', 'user-data');
            section2.setAttribute('class', 'section-separate-style section-margins');
            var div3 = document.createElement('div');
            div3.innerHTML = "<div class=\"selected-option-display-container\"><div id=\"selected-option-display\"></div></div>";
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
            var selectionMethod_3 = document.querySelector('#selection-method');
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
            if (selectionMethod_3) {
                selectionMethod_3.addEventListener('change', function () {
                    if (selectionMethod_3.value === 'random-order') {
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
    addOptionBtn.addEventListener('click', function () {
        if (optionField) {
            optionField.focus();
        }
        addOption();
    });
    clearOPtionsBtn.addEventListener('click', clearOptions);
}
else {
    console.error('ERROR: Button(s) not found');
}
if (selectionMethod) {
    selectionMethod.addEventListener('change', function () {
        if (selectionMethod.value === 'cost-benefit') {
            updateOptions();
        }
        else if (selectionMethod.value === 'random-order') {
            optionsRandomizeOrder();
            updateOptions();
        }
        else if (selectionMethod.value === 'random-option') {
            updateOptions();
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