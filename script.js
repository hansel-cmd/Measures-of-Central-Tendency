const text_area = document.querySelector('#text-area');
const mean_text = document.querySelector('#mean');

let data; // array of numbers
let mean; // the mean of the data array



function calculate() {

    // reset

    getMean();

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