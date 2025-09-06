const optionsContainer: HTMLElement | null = document.querySelector('.options-container');
const selectedDisplay: HTMLElement | null = document.querySelector('#selected-option-display');
const selectionMethod: HTMLSelectElement  | null = document.querySelector('#selection-method');
const optionField: HTMLInputElement  | null = document.querySelector('#option-field');
const selectionOptionBtn: Element | null = document.querySelector('#select-option-btn');
const addOptionBtn: Element | null = document.querySelector('#add-option-btn');
const clearOPtionsBtn: Element | null = document.querySelector('#clear-options-btn');
let options: string[] = [];
let optionsIndex = 0;
function selectOption() {
    if (selectionMethod) {
        const methodStr: string = selectionMethod.value;
        if (methodStr === 'random-order') {
            if (optionsIndex === 0) {
                let copy: string[] | undefined = options;
                options = [];
                while (copy.length > 0) {
                    const index: number = Math.floor(Math.random() * copy.length);
                    if (copy[index]) {
                        options.push(copy[index]);
                        copy.splice(index, 1);
                    }
                }
            }
            if (selectedDisplay) {
                selectedDisplay.innerHTML = `${options[optionsIndex]}`;
            }
            optionsIndex += 1;
            if (optionsIndex === options.length) {
                optionsIndex = 0;
            }
        } else if (methodStr === 'random-option' && selectedDisplay) {
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
            if (selectionMethod.value === 'random-order') {
                let copy: string[] = options;
                options = [];
                while (copy.length > 0) {
                    const index: number = Math.floor(Math.random() * copy.length);
                    if (copy[index]) {
                        options.push(copy[index]);
                        copy.splice(index, 1);
                    }
                }
            }
        }
    }
};
if (selectionOptionBtn && addOptionBtn && clearOPtionsBtn) {
    selectionOptionBtn.addEventListener('click', selectOption);
    addOptionBtn.addEventListener('click', addOption);
    clearOPtionsBtn.addEventListener('click', clearOptions);
} else {
    console.error('Button(s) not found');
}
if (selectionMethod) {
    selectionMethod.addEventListener('change', () => {
        if (options) {
            if (selectionMethod.value === 'random-order') {
                let copy = options;
                options = [];
                while (copy.length > 0) {
                    const index = Math.floor(Math.random() * copy.length);
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
    optionField.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            addOption();
        }
    });
} else {
    console.error('Keyboard compatability degraded');
}