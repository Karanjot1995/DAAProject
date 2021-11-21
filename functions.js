let output = document.getElementById('output')
let sortMethod = document.getElementById('sortMethod')
let eTime = document.getElementById('eTime')
let randomNums = document.getElementById('randomNums')
let sortedOutput = document.getElementById('sortedOutput')
let randomArray = []
let startRange  = document.getElementById('startRange')
let endRange = document.getElementById('endRange')
// let custInput = document.getElementById('sortInput')
let compareSpan =  document.getElementsByClassName('compare');
let graph = document.getElementById('graph')
let barGraph = document.getElementById('bar-graph')


function common(range){
    sortedOutput.style.display = 'none'
    document.getElementById('random-numbers').style.display = 'block';
    randomNums.innerHTML = `<h3>Your input (${range}): </h3><p>${randomArray}</p>`
    document.getElementById('sorting-btns').style.display = 'block'
    sortMethod.innerHTML = ''
    output.innerHTML = ''
    eTime.innerHTML = ''
    for(let i=0;i<compareSpan.length;i++){
        compareSpan[i].innerHTML = ''
    }
    graph.style.display = 'none'
}


function generateRandom(){
    // custInput.value = ''
    startRange.value = '';
    endRange.value = '';
    randomArray = new Array(10000)
    for(let i=0;i<randomArray.length;i++){
        randomArray[i] = Math.floor(Math.random()*10000)
    }
    common('random 10000');
}


function setInput(){
    startRange.value = '';
    endRange.value = '';
    let elem = custInput.value
    let arr = elem.split(',')
    randomArray = []
    randomArray = arr.map(i=>Number(i))
    common('custom Input');
}


function setRange(){
    let start = Number(startRange.value)
    let end = Number(endRange.value)
    let range = end - start + 1
    let arr = new Set()
    while (arr.size < range) {
        arr.add(~~(Math.random() * range)+start)
    }
    randomArray = [...arr];

    common(`range ${start} to ${end}`);
}


function sort(method){
    let startTime, endTime, sorted;
    let newArr = randomArray.slice(0)
    sortedOutput.style.display = 'block'
    arr = randomArray;

    startTime = performance.now()
    if(method == 'Bubble Sort'){
        sorted = bubbleSort(arr);
    } else if(method == 'Selection Sort'){
        sorted = selectionSort(arr);
    } else if(method == 'Insertion Sort'){
        sorted = insertionSort(arr);
    } else if(method == 'Merge Sort'){
        sorted = mergeSort(arr);
    } else if(method == 'Quick Sort'){
        sorted = quickSort(arr);
    } else if(method == 'Heap Sort'){
        sorted = heapSort(arr)
    }else if (method == 'Median Quick Sort'){
        sorted = MedianQuickSort(arr);
    }else if(method == 'Radix Sort'){
        sorted = radixSort(arr)
    }
    endTime = performance.now()

    let executionTime = `${((endTime-startTime))/1000}s`
    randomArray = newArr;

    sortMethod.innerHTML = method
    output.innerHTML = sorted
    eTime.innerHTML = executionTime

}



function compareAll(){
    let methods = {
        'Bubble Sort': bubbleSort,
        'Selection Sort': selectionSort,
        'Insertion Sort': insertionSort,
        'Merge Sort': mergeSort,
        'Quick Sort': quickSort,
        'Heap Sort': heapSort,
        'Radix Sort': MedianQuickSort,
        'Median Quick Sort': MedianQuickSort
    }

    let startTime, endTime;
    var times = []
    graph.style.display = 'block'
    // barGraph.style.display = 'table';
    barGraph.innerHTML = ''

    for(let i=0;i<Object.values(methods).length;i++){
        let newArr = randomArray.slice(0)
        let arr = randomArray;
        startTime = performance.now()
        Object.values(methods)[i](arr)
        endTime = performance.now()
        times.push(Number(((endTime-startTime)/1000).toFixed(7)))
        randomArray = newArr;
        compareSpan[i].innerHTML = ((endTime-startTime)/1000).toFixed(7)+'s'

        let height = times[i]*100

        if(randomArray.length <=5000){
            height = times[i]*1500
        }else if( randomArray.length>30000){
            height = times[i]*20
        }

        let li = document.createElement("LI");
        li.innerHTML = `<span class="bar-title" style="height:${height}%" title="${Object.keys(methods)[i]}"></span>`
        barGraph.append(li)
    }
}
