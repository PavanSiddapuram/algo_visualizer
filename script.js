const arrayContainer = document.getElementById('array-container');
const generateArrayButton = document.getElementById('generate-array');
const algorithmSelect = document.getElementById('algorithm-select');
const visualizeButton = document.getElementById('visualize');
const arraySizeInput = document.getElementById('array-size');
const speedInput = document.getElementById('speed');

let array = [];

function generateArray() {
    array = [];
    arrayContainer.innerHTML = '';
    const size = arraySizeInput.value;
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 300) + 1);
    }
    renderArray();
}

function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        arrayContainer.appendChild(bar);
    });
}

generateArrayButton.addEventListener('click', generateArray);
visualizeButton.addEventListener('click', () => {
    const selectedAlgorithm = algorithmSelect.value;
    switch (selectedAlgorithm) {
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'insertionSort':
            insertionSort();
            break;
        case 'selectionSort':
            selectionSort();
            break;
        case 'linearSearch':
            linearSearch();
            break;
        case 'binarySearch':
            binarySearch();
            break;
        default:
            break;
    }
});

generateArray(); // Generate initial array

async function bubbleSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'yellow';
            bars[j + 1].style.backgroundColor = 'yellow';
            await new Promise(resolve => setTimeout(resolve, 100 - speedInput.value)); // Delay for visualization

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            bars[j].style.backgroundColor = 'steelblue';
            bars[j + 1].style.backgroundColor = 'steelblue';
        }
    }
    for(let k = 0; k < bars.length; k++){
        bars[k].style.backgroundColor = 'green';
    }
}



async function insertionSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = 'yellow';

        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'yellow';

            await new Promise(resolve => setTimeout(resolve, 100 - speedInput.value));

            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1]}px`;

            j--;
        }

        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;

        for (let k = 0; k <= i; k++) {
            bars[k].style.backgroundColor = 'steelblue';
        }
    }
    for(let k = 0; k < bars.length; k++){
        bars[k].style.backgroundColor = 'green';
    }
}

async function selectionSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = 'red';

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'yellow';
            await new Promise(resolve => setTimeout(resolve, 100 - speedInput.value));

            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = 'steelblue';
                }
                minIndex = j;
                bars[minIndex].style.backgroundColor = 'red';
            } else {
                bars[j].style.backgroundColor = 'steelblue';
            }
        }

        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            bars[i].style.height = `${array[i]}px`;
            bars[minIndex].style.height = `${array[minIndex]}px`;
        }

        bars[i].style.backgroundColor = 'green';
        if(minIndex !== i){
            bars[minIndex].style.backgroundColor = 'steelblue';
        }
    }
    bars[array.length-1].style.backgroundColor = 'green';
}


const complexity = {
    bubbleSort: {
        time: "O(n^2)",
        space: "O(1)"
    },
    insertionSort: {
        time: "O(n^2)",
        space: "O(1)"
    },
    selectionSort: {
        time: "O(n^2)",
        space: "O(1)"
    },
    linearSearch: {
        time: "O(n)",
        space: "O(1)"
    },
    binarySearch: {
        time: "O(log n)",
        space: "O(1)"
    }
};

const infoPanel = document.getElementById('info-panel');

visualizeButton.addEventListener('click', () => {
    const selectedAlgorithm = algorithmSelect.value;
    const algorithmInfo = complexity[selectedAlgorithm];

    infoPanel.innerHTML = `
        <h2>${selectedAlgorithm}</h2>
        <p>Time Complexity: ${algorithmInfo.time}</p>
        <p>Space Complexity: ${algorithmInfo.space}</p>
    `;

    // ... your existing visualization code ...
});

// Merge Sort
async function mergeSort() {
    const bars = document.querySelectorAll('.bar');
    await mergeSortHelper(array, 0, array.length - 1, bars);
    for(let k = 0; k < bars.length; k++){
        bars[k].style.backgroundColor = 'green';
    }
}

async function mergeSortHelper(arr, start, end, bars) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSortHelper(arr, start, mid, bars);
        await mergeSortHelper(arr, mid + 1, end, bars);
        await merge(arr, start, mid, end, bars);
    }
}

async function merge(arr, start, mid, end, bars) {
    const n1 = mid - start + 1;
    const n2 = end - mid;
    const left = new Array(n1);
    const right = new Array(n2);

    for (let i = 0; i < n1; i++) {
        left[i] = arr[start + i];
    }
    for (let j = 0; j < n2; j++) {
        right[j] = arr[mid + 1 + j];
    }

    let i = 0, j = 0, k = start;
    while (i < n1 && j < n2) {
        bars[k].style.backgroundColor = 'yellow';
        await new Promise(resolve => setTimeout(resolve, 100 - speedInput.value));
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            bars[k].style.height = `${arr[k]}px`;
            i++;
        } else {
            arr[k] = right[j];
            bars[k].style.height = `${arr[k]}px`;
            j++;
        }
        bars[k].style.backgroundColor = 'steelblue';
        k++;
    }

    while (i < n1) {
        arr[k] = left[i];
        bars[k].style.height = `${arr[k]}px`;
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = right[j];
        bars[k].style.height = `${arr[k]}px`;
        j++;
        k++;
    }
}

// Quick Sort

async function quickSort() {
    const bars = document.querySelectorAll('.bar');
    await quickSortHelper(array, 0, array.length - 1, bars);
    for(let k = 0; k < bars.length; k++){
        bars[k].style.backgroundColor = 'green';
    }
}

async function quickSortHelper(arr, low, high, bars) {
    if (low < high) {
        const pivotIndex = await partition(arr, low, high, bars);
        await quickSortHelper(arr, low, pivotIndex - 1, bars);
        await quickSortHelper(arr, pivotIndex + 1, high, bars);
    }
}

async function partition(arr, low, high, bars) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = 'yellow';
        bars[high].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, 100 - speedInput.value));
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            bars[i].style.height = `${arr[i]}px`;
            bars[j].style.height = `${arr[j]}px`;
            if(i !== j){
                bars[i].style.backgroundColor = 'steelblue';
            }
        }
        bars[j].style.backgroundColor = 'steelblue';
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    bars[i+1].style.height = `${arr[i + 1]}px`;
    bars[high].style.height = `${arr[high]}px`;
    bars[high].style.backgroundColor = 'steelblue';
    return i + 1;
}

