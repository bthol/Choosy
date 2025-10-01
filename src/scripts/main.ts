let optionsIndex: number = 0;
let options: string[] = [];
let optionsRand: string[] | void = [];
function optionsRandomizeOrder() {
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
function selectOption() {
    const selectedDisplay: HTMLElement | null = document.querySelector('#selected-option-display');
    const selectionMethod: HTMLSelectElement  | null = document.querySelector('#selection-method');
    if (selectionMethod && selectedDisplay) {
        const methodStr: string = selectionMethod.value;
        if (methodStr === 'random-order') {
            if (optionsRand) {
                if (optionsIndex === 0) {
                    optionsRandomizeOrder();
                }
                selectedDisplay.innerHTML = `${optionsRand[optionsIndex]}`;
                optionsIndex += 1;
                if (optionsIndex === optionsRand.length) {
                    optionsIndex = 0;
                }
            }
        } else if (methodStr === 'random-option') {
            selectedDisplay.innerHTML = `${options[Math.floor(Math.random() * options.length)]}`;
        }
    }
};
function clearOptions() {
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
function removeOption(event: Event) {
    if (options && event.currentTarget && event.currentTarget && event.target) {
        const node: Node = event.target as Node;
        const parent: HTMLElement | null = node.parentElement;
        if (parent) {
            const listItem: HTMLElement | null = parent.querySelector('li');
            if (listItem) {
                const content: string = listItem.textContent;
                for (let i = 0; i < options.length; i++) {
                    if (options[i] === content) {
                        options.splice(i, 1);
                        break;
                    }
                }
                parent.remove();
            }
        }
    }
};
function addOption() {
    const optionField: HTMLInputElement | null = document.querySelector('#option-field');
    const optionsContainer: HTMLElement | null = document.querySelector('.options-container');
    const selectionMethod: HTMLSelectElement  | null = document.querySelector('#selection-method');
    if (optionField) {
        const option: string = optionField.value;
        if (option && optionsContainer && selectionMethod) {
            options.push(option);
            let optionsHTML = '<ul>';
            for (let i = 0; i < options.length; i++) {
                optionsHTML += `<div class="list-option-style"><li>${options[i]}</li><button class="remove-option-btn">remove</button></div>`;
            }
            optionsHTML += '</ul>';
            optionsContainer.innerHTML = `${optionsHTML}`;
            document.querySelectorAll('.remove-option-btn').forEach((btn) => {
                btn.addEventListener('click', removeOption, {once: true});
            });
        }
    }
};
function goPage(pageNumber: Number) {
    if (pageNumber === 0) { // choose page
        // clear page
        const main: HTMLElement | null = document.querySelector('main');
        if (main) {
            main.innerHTML = '';
            // build page
            const section1: HTMLElement = document.createElement('section');
            section1.setAttribute('id', 'user-data');
            section1.setAttribute('class', 'section-separate-style');
            const pageTitle: HTMLElement = document.createElement('h2');
            pageTitle.innerText = 'Choose';
            const div1: HTMLElement = document.createElement('div');
            div1.innerHTML = `<div class="selected-option-display-container"><div>Choice:</div><div id="selected-option-display"></div></div>`;
            const div2: HTMLElement = document.createElement('div');
            div2.innerHTML = `<label for="selection-method">Selection Method: </label><select name="selection-method" id="selection-method"><option value="random-order" selected>random order of options</option><option value="random-option">get a random option</option></select>`;
            const div3: HTMLElement = document.createElement('div');
            div3.innerHTML = `<input id="option-field" type="text" placeholder="add option" autocomplete="false" spellcheck="true" autofocus> <button id="add-option-btn">add</button> <button id="clear-options-btn">clear</button> <button id="select-option-btn">select</button>`;
            const div4: HTMLElement = document.createElement('div');
            div4.setAttribute('class', 'options-container');
            section1.appendChild(pageTitle);
            section1.appendChild(div1);
            section1.appendChild(div2);
            section1.appendChild(div3);
            section1.appendChild(div4);
            main.appendChild(section1);
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
        // clear page
        const main: HTMLElement | null = document.querySelector('main');
        if (main) {
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
        // clear page
        const main: HTMLElement | null = document.querySelector('main');
        if (main) {
            main.innerHTML = '';
            // build page
            const section1: HTMLElement = document.createElement('section');
            section1.setAttribute('class', 'section-separate-style');
            const pageTitle: HTMLElement = document.createElement('h2');
            pageTitle.innerText = 'About';
            const p1: HTMLElement = document.createElement('p');
            p1.innerText = 'Choosy is a simple website for random option selection. Need help choosing? Choose Choosy!';
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