const text_area = document.querySelector('#text-area');
const mean_text = document.querySelector('#mean');
const median_text = document.querySelector('#median');

let data; // array of numbers
let mean; // the mean of the data array



function calculate() {

    // reset

    getMean();

    getMedian();

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

    data.sort();

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