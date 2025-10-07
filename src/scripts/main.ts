interface optionInterface {
    option: string,
    cost?: number,
    benefit?: number
};
// ['#DB0F0F', '#DB780F', '#DBC70F', '#5adb0fff'];
const optionColors: string[] = ['hsla(0, 98%, 72%, 1.00)', 'hsla(100, 98%, 42%, 1.00)', 'hsla(240, 98%, 77%, 1.00)'];
const methods: string[] = [
    'cost-benefit',
    'random-order',
    'random-option'
];
let optionColorsIndex: number = 0;
let optionsIndex: number = 0;
let options: optionInterface[] = [];
let optionsRand: number[] = [];
function validCostBenefitInput(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target) {
        const input: string = target.value;
        const regex = /.*\D.*/;
        if (regex.test(input) === true) {
            target.value = input.split('').slice(0, target.value.length - 1).join('');
        }
    }
};
function clearOptions(): void {
    const optionsContainer: HTMLElement | null = document.querySelector('.options-container');
    const selectedDisplay: HTMLElement | null = document.querySelector('#selected-option-display');
    const optionField: HTMLInputElement  | null = document.querySelector('#option-field');
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
};
function updateOptions(): void {
    const optionsContainer: HTMLElement | null = document.querySelector('.options-container');
    if (optionsContainer) {
        // clean up listeners
        document.querySelectorAll('.remove-option-btn').forEach((btn) => {
            btn.removeEventListener('click', removeOption);
        });
        document.querySelectorAll('.option-backward-btn').forEach((btn) => {
            btn.removeEventListener('click', optionBackward);
        });
        document.querySelectorAll('.option-forward-btn').forEach((btn) => {
            btn.removeEventListener('click', optionForward);
        });
        document.querySelectorAll('.cost-input').forEach((input) => {
            input.removeEventListener('input', validCostBenefitInput);
        });
        document.querySelectorAll('.benefit-input').forEach((input) => {
            input.removeEventListener('input', validCostBenefitInput);
        });
        // get user data for conditional option formatting
        const selectionMethod: HTMLSelectElement | null = document.querySelector('#selection-method');
        // init color index + clear old option elements
        optionColorsIndex = 0;
        optionsContainer.innerHTML = '';
        // add new option elements
        for (let i = 0; i < options.length; i++) {
            // build option
            const optionElement = document.createElement('div');
            optionElement.setAttribute('class', 'list-option-style');
            optionElement.setAttribute('style', `background-color:${optionColors[optionColorsIndex]}`);
            optionColorsIndex += 1;
            if (optionColorsIndex === optionColors.length) {
                optionColorsIndex = 0;
            }
            // add remove button
            const removeBTN = document.createElement('button');
            removeBTN.setAttribute('type', 'button');
            removeBTN.setAttribute('class', 'remove-option-btn remove-option-btn-style');
            const removeIcon = document.createElement('i');
            removeIcon.setAttribute('class', 'fa-solid fa-x fa-sm remove-option-btn');
            removeBTN.appendChild(removeIcon);
            optionElement.appendChild(removeBTN);
            // add text content
            const textDiv = document.createElement('div');
            textDiv.setAttribute('class', 'option-text-element');
            textDiv.innerText = `${options[i]?.option}`;
            optionElement.appendChild(textDiv);
            // add backward button
            const backBTN = document.createElement('button');
            backBTN.setAttribute('type', 'button');
            backBTN.setAttribute('class', 'option-backward-btn option-backward-btn-style');
            const backIcon = document.createElement('i');
            backIcon.setAttribute('class', 'fa fa-arrow-left option-backward-btn');
            backBTN.appendChild(backIcon);
            optionElement.appendChild(backBTN);
            // add forward button
            const forwardBTN = document.createElement('button');
            forwardBTN.setAttribute('type', 'button');
            forwardBTN.setAttribute('class', 'option-forward-btn option-forward-btn-style');
            const forwardIcon = document.createElement('i');
            forwardIcon.setAttribute('class', 'fa fa-arrow-right option-forward-btn');
            forwardBTN.appendChild(forwardIcon);
            optionElement.appendChild(forwardBTN);
            // add conditional formatting
            if (selectionMethod !== null) {
                if (selectionMethod.value === 'cost-benefit') {
                    // add cost input
                    const costInput = document.createElement('input');
                    costInput.setAttribute('type', 'text');
                    costInput.setAttribute('placeholder', 'cost');
                    costInput.setAttribute('class', 'cost-input cost-input-style generic-input-style');
                    optionElement.appendChild(costInput);
                    // add benefit input
                    const benefitInput = document.createElement('input');
                    benefitInput.setAttribute('type', 'text');
                    benefitInput.setAttribute('placeholder', 'benefit');
                    benefitInput.setAttribute('class', 'benefit-input benefit-input-style generic-input-style');
                    optionElement.appendChild(benefitInput);
                }
            } else {
                console.error('ERROR: conditional feature of option could not render');
            }
            // append option to options container
            optionsContainer.appendChild(optionElement);
        }
        // add new listeners
        document.querySelectorAll('.remove-option-btn').forEach((btn) => {
            btn.addEventListener('click', removeOption, {once: true});
        });
        document.querySelectorAll('.option-backward-btn').forEach((btn) => {
            btn.addEventListener('click', optionBackward);
        });
        document.querySelectorAll('.option-forward-btn').forEach((btn) => {
            btn.addEventListener('click', optionForward);
        });
        document.querySelectorAll('.cost-input').forEach((input) => {
            input.addEventListener('input', validCostBenefitInput);
        });
        document.querySelectorAll('.benefit-input').forEach((input) => {
            input.addEventListener('input', validCostBenefitInput);
        });
    } else {
        console.error('ERROR: options not updated');
    }
};
function optionsRandomizeOrder(): void {
    const max: number = 1000;
    if (options.length > 0 && options.length < max) {
        const unordered: number[] = [];
        let indexes: number[] = [];
        let indexCount: number = 0;
        for (const i in options) {
            indexes.push(indexCount);
            indexCount += 1;
        }
        let limiter: number = 0;
        while (limiter < max && indexes.length > 0) {
            limiter += 1;
            const random = Math.floor(Math.random() * indexes.length);
            const index: number | undefined = indexes[random];
            if (index !== undefined && options[index]) {
                unordered.push(index);
                indexes.splice(random, 1);
            } else {
                console.error('ERROR: no data at index: ' + `${index}`);
            }
        }
        optionsRand = unordered;
    } else {
        console.error('ERROR: exceeded maximum array length');
    }
};
function selectOption(): void {
    if (options.length > 0) {
        const selectedDisplay: HTMLElement | null = document.querySelector('#selected-option-display');
        const selectionMethod: HTMLSelectElement | null = document.querySelector('#selection-method');
        if (selectionMethod && selectedDisplay) {
            const methodStr: string = selectionMethod.value;
            if (methodStr === methods[0]) { // 'cost-benefit'
                let error: boolean = false;
                document.querySelectorAll('.cost-input').forEach((input, index) => {
                    if (input && options[index]) {
                        const inputElement: HTMLInputElement = input as HTMLInputElement;
                        console.log(inputElement.value);
                        if (inputElement.value !== '') {
                            options[index].cost = Number(inputElement.value);
                        } else {
                            error = true;
                        }
                    }
                });
                if (!error) {
                    document.querySelectorAll('.benefit-input').forEach((input, index) => {
                        if (input && options[index]) {
                            const inputElement: HTMLInputElement = input as HTMLInputElement;
                            if (inputElement.value !== '') {
                                options[index].benefit = Number(inputElement.value);
                            } else {
                                error = true;
                            }
                        }
                    });
                    if (!error) {
                        let maximum: number = 0;
                        let maxIndex: number = 0;
                        for (const i in options) {
                            if (options[i] && options[i]?.benefit && options[i]?.cost) {
                                const costBenefitRatio: number = options[i].benefit / options[i].cost;
                                if (costBenefitRatio > maximum) {
                                    maximum = costBenefitRatio;
                                    maxIndex = Number(i);
                                }
                            }
                        }
                        selectedDisplay.innerHTML = `<div class="option-text-element">${options[maxIndex]?.option}</div>`;
                        selectedDisplay.setAttribute('style', `background-color: ${optionColors[maxIndex % optionColors.length]}`);
                        selectedDisplay.classList.add('list-option-style');
                    }
                }
            } else if (methodStr === methods[methods.length - 2]) { // 'random-order'
                if (optionsRand) {
                    if (optionsIndex === 0) {
                        optionsRandomizeOrder();
                    }
                    const index: number | undefined = optionsRand[optionsIndex];
                    if (index !== undefined) {
                        const choice: string | undefined = options[index]?.option;
                        selectedDisplay.innerHTML = `<div class="option-text-element">${choice}</div>`;
                        selectedDisplay.classList.add('list-option-style');
                        options.forEach((option, index) => {
                            if (option.option === choice) {
                                selectedDisplay.setAttribute('style', `background-color: ${optionColors[index % optionColors.length]}`);
                            }
                        });
                        optionsIndex += 1;
                        if (optionsIndex === optionsRand.length) {
                            optionsIndex = 0;
                        }
                    } else {
                        console.error('ERROR: data not found at index during selection');
                    }
                }
            } else if (methodStr === methods[methods.length - 1]) { // 'random-option'
                const i: number = Math.floor(Math.random() * options.length);
                selectedDisplay.innerHTML = `<div class="option-text-element">${options[i]?.option}</div>`;
                selectedDisplay.setAttribute('style', `background-color: ${optionColors[i % optionColors.length]}`);
                selectedDisplay.classList.add('list-option-style');
            }
        }
    }
};
function removeOption(event: Event): void {
    if (options && event.currentTarget && event.currentTarget && event.target) {
        const node: Node = event.target as Node;
        let root: HTMLElement | null = node.parentElement;
        if (node.parentElement && node.parentElement.nodeName === 'BUTTON') {
            root = node.parentElement?.parentElement;
        }
        if (root) {
            const div: HTMLElement | null = root.querySelector('.option-text-element');
            if (div) {
                const content: string = div.textContent;
                for (let i = 0; i < options.length; i++) {
                    if (options[i]?.option === content) {
                        options.splice(i, 1);
                        break;
                    }
                }
                for (let i = 0; i < optionsRand.length; i++) {
                    const index: number | undefined = optionsRand[i];
                    if (index && options[index]?.option === content) {
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
};
function reorderOptions(i1: number, i2: number, len: number): optionInterface[] {
    let arr: number[] = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    if (i1 !== i2 && i1 < len && i2 < len) {
        if (i1 < i2) {
            arr.splice(i2 + 1, 0, i1);
            arr.splice(i1, 1);
        } else {
            arr.splice(i2 , 0, i1);
            arr.splice(i1 + 1, 1);
        }
    }
    let optionsReorder: optionInterface[] = [];
    for (const i of arr) {
        if (options[i]) {
            optionsReorder.push(options[i]);
        }
    }
    return optionsReorder;
};
function optionBackward(event: Event): void {
    if (event.target) {
        const node: Node = event.target as Node;
        let root: HTMLElement | null = node.parentElement;
        if (node.parentElement && node.parentElement.nodeName === 'BUTTON') {
            root = node.parentElement?.parentElement;
        }
        if (root) {
            const text: HTMLElement | null = root.querySelector('.option-text-element');
            if (text) {
                const content: string = text.textContent;
                for (let i = 0; i < options.length; i++) {
                    if (options[i]?.option === content && i - 1 > -1) {
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
};
function optionForward(event: Event): void {
    if (event.target) {
        const node: Node = event.target as Node;
        let root: HTMLElement | null = node.parentElement;
        if (node.parentElement && node.parentElement.nodeName === 'BUTTON') {
            root = node.parentElement?.parentElement;
        }
        if (root) {
            const text: HTMLElement | null = root.querySelector('.option-text-element');
            if (text) {
                const content: string = text.textContent;
                for (let i = 0; i < options.length; i++) {
                    if (options[i]?.option === content && i + 1 < options.length) {
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
};
function addOption(): void {
    const optionField: HTMLInputElement | null = document.querySelector('#option-field');
    const optionsContainer: HTMLElement | null = document.querySelector('.options-container');
    const selectionMethod: HTMLSelectElement | null = document.querySelector('#selection-method');
    if (optionField) {
        const optionStr: string = optionField.value;
        optionField.value = '';
        if (optionStr && optionsContainer && selectionMethod) {
            const option: {option: string} = {option: optionStr};
            options.push(option);
            updateOptions();
        }
    }
};
function goPage(pageNumber: Number) {
    if (pageNumber === 0) { // choose page
        const main: HTMLElement | null = document.querySelector('main');
        if (main) {
            // clear data
            options = [];
            optionsRand = [];
            // clear page
            main.innerHTML = '';
            // build page
            const section1: HTMLElement = document.createElement('section');
            section1.setAttribute('id', 'user-data');
            section1.setAttribute('class', 'section-separate-style section-margins');
            const pageTitle: HTMLElement = document.createElement('h2');
            pageTitle.innerText = 'Choose';
            const div1: HTMLElement = document.createElement('div');
            div1.innerHTML = `<label for="selection-method">Selection Method: </label><select name="selection-method" id="selection-method" class="choose-control-btn-style"><option value="random-order" selected>random order of options</option><option value="random-option">get a random option</option></select>`;
            const div2: HTMLElement = document.createElement('div');
            div2.innerHTML = `<input id="option-field" type="text" placeholder="add option" autocomplete="false" spellcheck="true" autofocus> <button id="add-option-btn" class="choose-control-btn-style" type="button">add</button> <button id="clear-options-btn" class="choose-control-btn-style" type="button">clear</button> <button id="select-option-btn" class="choose-control-btn-style" type="button">select</button>`;
            const section2: HTMLElement = document.createElement('section');
            section2.setAttribute('id', 'user-data');
            section2.setAttribute('class', 'section-separate-style section-margins');
            const div3: HTMLElement = document.createElement('div');
            div3.innerHTML = `<div class="selected-option-display-container"><div id="selected-option-display"></div></div>`;
            const div4: HTMLElement = document.createElement('div');
            div4.setAttribute('class', 'options-container');
            section1.appendChild(pageTitle);
            section1.appendChild(div1);
            section1.appendChild(div2);
            section2.appendChild(div3);
            section2.appendChild(div4);
            main.appendChild(section1);
            main.appendChild(section2);
            // scan page
            const selectionOptionBtn: Element | null = document.querySelector('#select-option-btn');
            const addOptionBtn: Element | null = document.querySelector('#add-option-btn');
            const clearOPtionsBtn: Element | null = document.querySelector('#clear-options-btn');
            const selectionMethod: HTMLSelectElement  | null = document.querySelector('#selection-method');
            const optionField: HTMLInputElement | null = document.querySelector('#option-field');
            // add listeners
            if (selectionOptionBtn && addOptionBtn && clearOPtionsBtn) {
                selectionOptionBtn.addEventListener('click', selectOption);
                addOptionBtn.addEventListener('click', addOption);
                clearOPtionsBtn.addEventListener('click', clearOptions);
            } else {
                console.error('ERROR: Button(s) not found');
            }
            if (selectionMethod) {
                selectionMethod.addEventListener('change', () => {
                    if (selectionMethod.value === 'random-order') {
                        optionsRandomizeOrder();
                    }
                });
            }
            if (optionField) {
                optionField.focus();
                optionField.addEventListener('keydown', (event: KeyboardEvent) => {
                    if (event.key === 'Enter') {
                        addOption();
                    }
                });
            } else {
                console.error('ERROR: keyboard compatability degraded');
            }
        } else {
            console.error('ERROR: main node not found');
        }

    } else if (pageNumber === 1) { // manual page
        // clean up listners
        const selectionOptionBtn: Element | null = document.querySelector('#select-option-btn');
        if (selectionOptionBtn) {
            selectionOptionBtn.removeEventListener('click', selectOption);
        }
        const addOptionBtn: Element | null = document.querySelector('#add-option-btn');
        if (addOptionBtn) {
            addOptionBtn.removeEventListener('click', addOption);
        }
        const clearOPtionsBtn: Element | null = document.querySelector('#clear-options-btn');
        if (clearOPtionsBtn) {
            clearOPtionsBtn.removeEventListener('click', clearOptions);
        }
        const main: HTMLElement | null = document.querySelector('main');
        if (main) {
            // clear data
            options = [];
            optionsRand = [];
            // clear page
            main.innerHTML = '';
            // build page
            const section1: HTMLElement = document.createElement('section');
            section1.setAttribute('class', 'section-separate-style');
            const pageTitle: HTMLElement = document.createElement('h2');
            pageTitle.innerText = 'Manual';
            const p1: HTMLElement = document.createElement('p');
            p1.innerText = '1.) Enter each option into the options field and click the add button.';
            const p2: HTMLElement = document.createElement('p');
            p2.innerText = '2.) Choose the selection method you want using the drop down menu.';
            const p3: HTMLElement = document.createElement('p');
            p3.innerText = '3.) Click the select button to randomly select one of the options.';
            section1.appendChild(pageTitle);
            section1.appendChild(p1);
            section1.appendChild(p2);
            section1.appendChild(p3);
            main.appendChild(section1);
        } else {
            console.error('ERROR: main node not found');
        }
    } else if (pageNumber === 2) { // about page
        // clean up listners
        const selectionOptionBtn: Element | null = document.querySelector('#select-option-btn');
        if (selectionOptionBtn) {
            selectionOptionBtn.removeEventListener('click', selectOption);
        }
        const addOptionBtn: Element | null = document.querySelector('#add-option-btn');
        if (addOptionBtn) {
            addOptionBtn.removeEventListener('click', addOption);
        }
        const clearOPtionsBtn: Element | null = document.querySelector('#clear-options-btn');
        if (clearOPtionsBtn) {
            clearOPtionsBtn.removeEventListener('click', clearOptions);
        }
        const main: HTMLElement | null = document.querySelector('main');
        if (main) {
            // clear data
            options = [];
            optionsRand = [];
            // clear page
            main.innerHTML = '';
            // build page
            const section1: HTMLElement = document.createElement('section');
            section1.setAttribute('class', 'section-separate-style');
            const pageTitle: HTMLElement = document.createElement('h2');
            pageTitle.innerText = 'About';
            const p1: HTMLElement = document.createElement('p');
            p1.innerText = 'Choosy is a simple website for random option selection. Need to choose? Choose Choosy!';
            section1.appendChild(pageTitle);
            section1.appendChild(p1);
            main.appendChild(section1);
        } else {
            console.error('ERROR: main node not found');
        }
    }
};
const navBTNS: NodeList | null = document.querySelectorAll('.page-nav');
if (navBTNS) {
    navBTNS.forEach((btn, index) => {
        btn.addEventListener('click', () => {goPage(index)});
    });
} else {
    console.error('ERROR: nav buttons not found');
}
// scan page
const selectionOptionBtn: Element | null = document.querySelector('#select-option-btn');
const addOptionBtn: Element | null = document.querySelector('#add-option-btn');
const clearOPtionsBtn: Element | null = document.querySelector('#clear-options-btn');
const selectionMethod: HTMLSelectElement  | null = document.querySelector('#selection-method');
const optionField: HTMLInputElement | null = document.querySelector('#option-field');
// add listeners
if (selectionOptionBtn && addOptionBtn && clearOPtionsBtn) {
    selectionOptionBtn.addEventListener('click', selectOption);
    addOptionBtn.addEventListener('click', () => {
        if (optionField) {
            optionField.focus();
        }
        addOption();
    });
    clearOPtionsBtn.addEventListener('click', clearOptions);
} else {
    console.error('ERROR: Button(s) not found');
}
if (selectionMethod) {
    selectionMethod.addEventListener('change', () => {
        if (selectionMethod.value === 'cost-benefit') {
            updateOptions();
        } else if (selectionMethod.value === 'random-order') {
            optionsRandomizeOrder();
            updateOptions();
        } else if (selectionMethod.value === 'random-option') {
            updateOptions();
        }
    });
}
if (optionField) {
    optionField.focus();
    optionField.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            addOption();
        }
    });
} else {
    console.error('ERROR: keyboard compatability degraded');
}