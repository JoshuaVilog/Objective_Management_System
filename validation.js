

function inputNumeric(input){

    input.on('input', function(e) {
        var inputValue = $(this).val();
    
        // Use a regular expression to match only numbers
        var numericValue = inputValue.replace(/[^0-9]/g, '');
    
        // Update the input field value with the numeric characters only
        $(this).val(numericValue);
    });
}

function limitInputDate(input, numOfYear){

    var currentYear = new Date().getFullYear();
    // Calculate the year 2010
    var year = currentYear - numOfYear;
    var maxDate = year + '-12-31';
    
    // Set the "max" and "min" attributes for the date input
    input.attr('max', maxDate);

    input.on("change", function () {
        var enteredDate = $(this).val();
    
        if (new Date(enteredDate) > new Date(maxDate)) {
            // Clear the input if the entered date is beyond the max date
            $(this).val("");
        }
    });
}
function displayCurrentDate(input){

    var currentDate = new Date();
    var formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');

    input.val(formattedDate);
    input.attr('max', formattedDate);
}

function disabledNextDate(input){

    var currentDate = new Date();
    var formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');

    //input.val(formattedDate);
    input.attr('max', formattedDate);
}

function disablePreviousDate(input){

    var currentDate = new Date();
    var formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');

    input.val(formattedDate);
    input.attr('min', formattedDate);
}

function textInputOnly(input){
    input.on('input', function() {
        var inputValue = $(this).val();
        // Use a regular expression to match only letters (A-Z, a-z) and spaces
        var textOnlyValue = inputValue.replace(/[^A-Za-z\s]/g, '');
        $(this).val(textOnlyValue);
    });
}
function mobileNumber(input){
    input.on('input', function() {
        // Get the input value
        let inputValue = input.val();

        // Use a regular expression to match only numbers
        let numericValue = inputValue.replace(/[^0-9]/g, '');

        // Limit the length to 11 characters
        if(inputValue.length > 11 ){
            numericValue = numericValue.substring(0, 11);
        }
        
        // Update the input field value with the numeric characters only
        input.val(numericValue);
    });
}

function calculateYear(dateString) {
    const currentDate = new Date();
    const inputDate = new Date(dateString);

    // Calculate the difference in milliseconds
    const timeDiff = currentDate - inputDate;

    // Calculate the difference in years
    const yearsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));

    if (yearsDiff < 1) {
        return '< 1 YEAR';
    } else {
        return `${yearsDiff} ${yearsDiff === 1 ? 'YEAR' : 'YEARS'}`;
    }
}

//RETURNS ONLY IF TRUE OR FALSE
function isThreeMonthsAgoOrMore(targetDate) {
    // Convert the target date to a JavaScript Date object
    const target = new Date(targetDate);

    // Get the current date
    const current = new Date();

    // Calculate the difference in months
    const monthsDifference = (current.getFullYear() - target.getFullYear()) * 12 +
        (current.getMonth() - target.getMonth());

    // Check if the difference is 3 or more months
    return monthsDifference >= 6;
}