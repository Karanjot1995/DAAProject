/////////////////     BUBBLE SORT     //////////////////

function bubbleSort(arr){
    for(let i=arr.length-1;i>=0;i++){
        let noSwaps = true
        for(let j=0 ;j<i;j++){
            if(arr[j+1]<arr[j]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
                noSwaps = false
            }
        }
        if(noSwaps) break;
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

function MedianQuickSort(arr, left = 0, right = arr.length-1){


    // var n = 16;// Controls size of array
    var numSwaps = 0;
    var numComps = 0;

    var n = arr.length - 1;
    console.log('unsorted array: ',arr);
    
    medianQuickSort(arr, 0, n);
    console.log('sorted array: ',arr);

    console.log("\n\tSwaps: " + numSwaps);
    console.log("\tComparisons: " + numComps);
    return arr

    function medianPivot(arr,low,high) {
        /*
        * create subarray with low, high, and middle elements in the array sort the
        * subarray and use index 1 as the median of 3
        */

        var first = arr[low];
        var last = arr[arr.length - 1];
        var mid = (high) / 2;

        console.log("\tMiddle of Arr at Index= " + mid + " : " + arr[mid]);
        var sortingArr = [arr[low], arr[mid], arr[high]];

        sortingArr.sort();

        var middleValue = sortingArr[1];
        console.log("\t"+sortingArr.toString());
        //printArray(sortingArr);

        // swap with the last to serve as pivot
        var temp = arr[high];
        arr[high] = middleValue;
        if (middleValue == arr[low]) {
            arr[low] = temp;
        } else if (middleValue == arr[mid]) {
            arr[mid] = temp;
        }

        // System.out.println("median: ");
        console.log(arr);
        return partition(arr, low, high);

    }

    // ----------------------------------------------------------------------
    /*  method for medianQuicksort */
    function medianQuickSort( arr, low, high) {
        if (low >= high)
            return;

        if (low < high) {

            var pi = medianPivot(arr, low, high);

            QuickSort(arr, low, high);

        }
    }

    // -----------------------------------------------------------------------
    function QuickSort(arr, low, high) {

        if (low < high) {
            var pi = partition(arr, low, high);

            // Recursively sort elements before
            // partition and after partition
            QuickSort(arr, low, pi - 1);
            QuickSort(arr, pi + 1, high);
        }
    }

    // -----------------------------------------------------------------------
    function partition(arr, low, high) {
        var pivot = arr[high];
        var i = (low - 1); // index of smaller element

        for (var j = low; j < high; j++) {
            // If current element is smaller than or
            // equal to pivot
            if (arr[j] <= pivot) {
                i++;

                // swap arr[i] and arr[j]
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                numSwaps++;
            }
            numComps++;
        }

        // swap arr[i+1] and arr[high] (or pivot)
        var temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        numSwaps++;
        return i + 1;

    }
}



/////////////////     RADIX SORT     //////////////////

function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
 }
 
 function mostDigits(nums) {
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
       maxDigits = Math.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
 }
 
 function getDigit(num, i) {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
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