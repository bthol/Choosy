// ['#DB0F0F', '#DB780F', '#DBC70F', '#5adb0fff'];
const optionColors: string[] = ['hsla(0, 98%, 72%, 1.00)', 'hsla(100, 98%, 42%, 1.00)', 'hsla(240, 98%, 77%, 1.00)'];
let optionColorsIndex: number = 0;
let optionsIndex: number = 0;
let options: string[] = [];
let optionsRand: string[] = [];
function optionsRandomizeOrder(): void {
    const max: number = 1000;
    if (options.length < max) {
        const unordered: string[] = [];
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
                unordered.push(options[index]);
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
    const selectedDisplay: HTMLElement | null = document.querySelector('#selected-option-display');
    const selectionMethod: HTMLSelectElement  | null = document.querySelector('#selection-method');
    if (selectionMethod && selectedDisplay) {
        const methodStr: string = selectionMethod.value;
        if (methodStr === 'random-order') {
            if (optionsRand) {
                if (optionsIndex === 0) {
                    optionsRandomizeOrder();
                }
                const choice: string | undefined = optionsRand[optionsIndex];
                selectedDisplay.innerHTML = `${choice}`;
                options.forEach((option, index) => {
                    if (option === choice) {
                        selectedDisplay.setAttribute('style', `background-color: ${optionColors[index % optionColors.length]}`);
                    }
                });
                
                optionsIndex += 1;
                if (optionsIndex === optionsRand.length) {
                    optionsIndex = 0;
                }
            }
        } else if (methodStr === 'random-option') {
            const i: number = Math.floor(Math.random() * options.length);
            selectedDisplay.innerHTML = `${options[i]}`;
            selectedDisplay.setAttribute('style', `background-color: ${optionColors[i % optionColors.length]}`);
        }
    }
};
function clearOptions(): void {
    const optionsContainer: HTMLElement | null = document.querySelector('.options-container');
    const selectedDisplay: HTMLElement | null = document.querySelector('#selected-option-display');
    const optionField: HTMLInputElement  | null = document.querySelector('#option-field');
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
};
function removeOption(event: Event): void {
    if (options && event.currentTarget && event.currentTarget && event.target) {
        const node: Node = event.target as Node;
        const parent: HTMLElement | null = node.parentElement;
        if (parent) {
            const div: HTMLElement | null = parent.querySelector('div');
            if (div) {
                const content: string = div.textContent;
                for (let i = 0; i < options.length; i++) {
                    if (options[i] === content) {
                        options.splice(i, 1);
                        break;
                    }
                }
                for (let i = 0; i < optionsRand.length; i++) {
                    if (optionsRand[i] === content) {
                        optionsRand.splice(i, 1);
                        break;
                    }
                }
                if (optionsIndex > optionsRand.length - 1) {
                    optionsIndex = 0;
                }
                parent.remove();
                updateOptions();
            }
        }
    }
};
function updateOptions(): void {
    const optionsContainer: HTMLElement | null = document.querySelector('.options-container');
    if (optionsContainer) {
        optionColorsIndex = 0;
        let optionsHTML = '';
        for (let i = 0; i < options.length; i++) {
            optionsHTML += `<div class="list-option-style" style="background-color:${optionColors[optionColorsIndex]}"><div>${options[i]}</div><button class="remove-option-btn">x</button></div>`;
            optionColorsIndex += 1;
            if (optionColorsIndex === optionColors.length) {
                optionColorsIndex = 0;
            }
        }
        document.querySelectorAll('.remove-option-btn').forEach((btn) => {
            btn.removeEventListener('click', removeOption);
        });
        optionsContainer.innerHTML = `${optionsHTML}`;
        document.querySelectorAll('.remove-option-btn').forEach((btn) => {
            btn.addEventListener('click', removeOption, {once: true});
        });
    } else {
        console.error('ERROR: options not updated');
    }
};
function addOption(): void {
    const optionField: HTMLInputElement | null = document.querySelector('#option-field');
    const optionsContainer: HTMLElement | null = document.querySelector('.options-container');
    const selectionMethod: HTMLSelectElement | null = document.querySelector('#selection-method');
    if (optionField) {
        const option: string = optionField.value;
        optionField.value = '';
        if (option && optionsContainer && selectionMethod) {
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
            div1.innerHTML = `<label for="selection-method">Selection Method: </label><select name="selection-method" id="selection-method"><option value="random-order" selected>random order of options</option><option value="random-option">get a random option</option></select>`;
            const div2: HTMLElement = document.createElement('div');
            div2.innerHTML = `<input id="option-field" type="text" placeholder="add option" autocomplete="false" spellcheck="true" autofocus> <button id="add-option-btn">add</button> <button id="clear-options-btn">clear</button> <button id="select-option-btn">select</button>`;
            const section2: HTMLElement = document.createElement('section');
            section2.setAttribute('id', 'user-data');
            section2.setAttribute('class', 'section-separate-style section-margins');
            const div3: HTMLElement = document.createElement('div');
            div3.innerHTML = `<div class="selected-option-display-container"><div id="selected-option-display" class="list-option-style"></div></div>`;
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