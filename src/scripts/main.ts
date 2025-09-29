const optionsContainer: HTMLElement | null = document.querySelector('.options-container');
const selectedDisplay: HTMLElement | null = document.querySelector('#selected-option-display');
const selectionMethod: HTMLSelectElement  | null = document.querySelector('#selection-method');
const optionField: HTMLInputElement  | null = document.querySelector('#option-field');
const selectionOptionBtn: Element | null = document.querySelector('#select-option-btn');
const addOptionBtn: Element | null = document.querySelector('#add-option-btn');
const clearOPtionsBtn: Element | null = document.querySelector('#clear-options-btn');
let optionsIndex: number = 0;
let options: string[] = [];
let optionsRand: string[] | void = [];
function strArrRandomOrder(ordered: string[]): string[] | void {
    const max: number = 1000;
    if (ordered.length < max) {
        const unordered: string[] = [];
        let indexes: number[] = [];
        let indexCount: number = 0;
        for (const i in ordered) {
            indexes.push(indexCount);
            indexCount += 1;
        }
        let limiter: number = 0;
        while (limiter < max && indexes.length > 0) {
            limiter += 1;
            const random = Math.floor(Math.random() * indexes.length);
            const index: number | undefined = indexes[random];
            if (index !== undefined && ordered[index]) {
                unordered.push(ordered[index]);
                indexes.splice(random, 1);
            } else {
                console.error('ERROR: no data at index: ' + `${index}`);
            }
        }
        return unordered;
    } else {
        console.error('ERROR: exceeded maximum array length');
    }
};
function optionsRandomizeOrder() {
    optionsRand = strArrRandomOrder(options);
};
function selectOption() {
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
                event.currentTarget.removeEventListener('click', removeOption);
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
                btn.addEventListener('click', removeOption);
            });
        }
    }
};
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
    optionField.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            addOption();
        }
    });
} else {
    console.error('ERROR: keyboard compatability degraded');
}