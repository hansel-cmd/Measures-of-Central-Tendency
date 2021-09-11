const text_area = document.querySelector('#text-area');
const mean_text = document.querySelector('#mean');
const median_text = document.querySelector('#median');
const modes_text = document.querySelector('#mode'); 
const midrange_text = document.querySelector('#midrange');

let data; // array of numbers
let mean; // the mean of the data array
let median; // the middle element of the data array (sorted)
let modes = []; // assumed to be many modes : data with highest frequency
let midrange; // the rough estimate of the middle


function reset() {
    data = [];
    mean = 0;
    median = 0;
    modes = [];
    midrange = 0;
}


function calculate() {

    // reset
    reset();

    getMean();

    getMedian();

    getMode();

    getMidRange();
}

function getMean() {
    
    let value = text_area.value.replaceAll(/\s/g, ' ').split(' ');
    
    data = value.reduce((retval, cur_data) => {
        
        if (retval === undefined)
            retval = []

        if (!isNaN(parseInt(cur_data)))
            retval.push(parseInt(cur_data));

        return retval;
    }, []);

    data.sort((a, b) => a - b);

    let sum = data.reduce((retval, cur_data) => {
        return retval + cur_data
    }, 0);

    mean = sum / data.length;
    mean_text.innerHTML = mean;

}

function getMedian() {

    let median_position = Math.ceil((data.length + 1) / 2);
    
    // we have to deduct 1 because we start from index 0
    median_position--;
    
    // even length, get the average of the two data in the middle
    if (data.length % 2 == 0) {
    
        let lower_boundary = median_position - 1;
        let higher_boundary = median_position;

        median = (data[lower_boundary] + data[higher_boundary]) / 2;

    } else {
        median = data[median_position];
    }

    median_text.innerHTML = median;
}

function getMode() {

    let freq_object = data.reduce((retval, cur_data) => {

        if (retval[cur_data] === undefined)
            retval[cur_data] = []
        
        retval[cur_data].push(cur_data);
        
        return retval;
    }, {});


    let highest_frequency = 0;
    // counts the frequency of each data
    // gets the highest frequency number
    for (element in freq_object) {
        freq_object[element] = freq_object[element].length;
        if (highest_frequency < freq_object[element])
            highest_frequency = freq_object[element]
    }

    if (highest_frequency <= 1) {
        modes_text.innerHTML = "No mode";
        return;
    }

    // add to modes the data with highest frequency
    for (element in freq_object) {
        if (freq_object[element] == highest_frequency)
            modes.push(element);
    }

    modes_text.innerHTML = modes;
}

function getMidRange() {
    
    midrange = (data[0] + data[data.length - 1]) / 2;
    midrange_text.innerHTML = midrange;
}