/////////////////     BUBBLE SORT     //////////////////

function bubbleSort(arr){
    for(let i=arr.length-1;i>=0;i++){
        let noSwap = true
        for(let j=0 ;j<i;j++){
            if(arr[j+1]<arr[j]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
                noSwap = false
            }
        }
        if(noSwap) break;
    }
    return arr
}


/////////////////     SELECTION SORT     //////////////////

function selectionSort(arr) {
    const swap = (arr, idx1, idx2) =>
        ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);

    for (let i = 0; i < arr.length; i++) {
        let lowest = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[lowest] > arr[j]) {
                lowest = j;
            }
        }
        if (i !== lowest) swap(arr, i, lowest);
    }

    return arr;
}


/////////////////     INSERTION SORT     //////////////////

function insertionSort(arr){
    for(let i=0;i<arr.length;i++){
        for(let j=i+1;j>=1;j--){
            if(arr[j]<arr[j-1]){
            let temp = arr[j]
            arr[j]= arr[j-1]
            arr[j-1]=temp
            }else{
                break
            }
        }
    }
    return arr
}



/////////////////     MERGE SORT     //////////////////

function merge(arr1, arr2) {
    let newArr = []
    let j = 0;
    let i = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            newArr.push(arr1[i])
            i++
        } else {
            newArr.push(arr2[j])
            j++
        }
    }
    while (i < arr1.length) {
        newArr.push(arr1[i])
        i++
    }
    while (j < arr2.length) {
        newArr.push(arr2[j])
        j++
    }
    return newArr
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr

    let mid = Math.floor((arr.length) / 2)
    let left = mergeSort(arr.slice(0, mid))
    let right = mergeSort(arr.slice(mid))
    return merge(left, right)

}



/////////////////      QUICK SORT     //////////////////

function pivot(arr, start = 0, end = arr.length - 1) {

    function swap(array, i, j) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp
    }

    let pivot = arr[start]
    let swapidx = start;

    for (let i = start + 1; i < arr.length; i++) {
        if (pivot > arr[i]) {
            swapidx++
            swap(arr, swapidx, i)
        }
    }
    swap(arr, start, swapidx)

    return swapidx
}

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let pivotIndex = pivot(arr, left, right)//index of 4 ie 3
        //left
        quickSort(arr, left, pivotIndex - 1)
        //right
        quickSort(arr, pivotIndex + 1, right)
    }
    return arr
}


/////////////////     HEAP SORT     //////////////////

function heapSort(arr) {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--){
        heapify(arr, arr.length, i);
    }

    for (let i = arr.length - 1; i > 0; i--) {
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
    return arr
}

function heapify(arr, n, i){
    let left = 2 * i + 1; 
    let right = 2 * i + 2; 
    let largest = i; 

    if (arr[left] > arr[largest] && left < n) largest = left;

    if (arr[right] > arr[largest] && right < n) largest = right;

    if (largest != i) {
        var swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        heapify(arr, n, largest);
    }
}



/////////////////     3 MEDIAN QUICK SORT     //////////////////

function ThreeMedianQuickSort(arr, left = 0, right = arr.length-1){
    let swaps = 0;
    let comparisons = 0;

    var len = arr.length - 1;
    
    mQuickSort(arr, 0, len);


    function medianPivot(arr,lowest,highest) {
        let mid = (highest) / 2;
        let pointersArr = [arr[lowest], arr[mid], arr[highest]];
    
        pointersArr.sort();
    
        let midVal = pointersArr[1];
    
        let temp = arr[highest];
        arr[highest] = midVal;
        if (midVal == arr[lowest]) {
            arr[lowest] = temp;
        } else if (midVal == arr[mid]) {
            arr[mid] = temp;
        }
        return partition(arr, lowest, highest);
    
    }
    
    function mQuickSort( arr, lowest, highest) {
        if (lowest >= highest)
            return;
    
        if (lowest < highest) {
            var piv = medianPivot(arr, lowest, highest);
            QuickSort(arr, lowest, highest);
        }
    }
    
    function QuickSort(arr, lowest, highest) {
    
        if (lowest < highest) {
            var piv = partition(arr, lowest, highest);
            QuickSort(arr, lowest, piv - 1);
            QuickSort(arr, piv + 1, highest);
        }
    }
    
    function partition(arr, lowest, highest) {
        let pivot = arr[highest];
        let i = (lowest - 1);
    
        for (let j = lowest; j < highest; j++) {
            if (arr[j] <= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]]
                swaps++;
            }
            comparisons++;
        }
        [arr[i+1], arr[highest]] = [arr[highest], arr[i+1]]

        swaps++;
        return i + 1;
    }
    console.log(comparisons, swaps)
    return arr
}





/////////////////     RADIX SORT     //////////////////

 function getDigit(num, i) {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
 }

 function digCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
 }
 
 function mostDigits(nums) {
    let maxDigs = 0;
    for (let i = 0; i < nums.length; i++) {
       maxDigs = Math.max(maxDigs, digCount(nums[i]));
    }
    return maxDigs;
 }
 
 function radixSort(nums) {
    let maxDigitCount = mostDigits(nums);
    for (let k = 0; k < maxDigitCount; k++) {
       let digitBuckets = Array.from({ length: 10 }, () => []);
       for (let i = 0; i < nums.length; i++) {
          let digit = getDigit(nums[i], k);
          digitBuckets[digit].push(nums[i]);
       }
       nums = [].concat(...digitBuckets);
    }
    return nums;
 }