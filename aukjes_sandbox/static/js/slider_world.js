let a = document.querySelector('input'),                                                                    //assign the input from slider to variable a
    b = document.querySelector('output');                                                                   //assign the output under the slider to variable b
    var day_one;                                                                                            //declare our day_one variable which will represent the day one of outbreak
    day_one = moment("22/01/2020", "DD/MM/YYYY");                                                           //assigning our day one value 27 Jan 2020 to day_one using moment lib
    var slider_day = moment(day_one,"DD/MM/YYYY").add((a.value-1),'day');                                   //manipulating the slider input with day_one value using moment lib, to get date for slider input
    b.innerHTML = moment(slider_day,"DD/MM/YYYY").format("dddd, MMMM Do YYYY");     //displaying the slider date in pre determined format using moment lib



a.addEventListener('input', function () {                                                                   //using event listener with input gives instant response; use 'change' instead to see the difference in response
    var day_one;                                                                                            //declare our day_one variable which will represent the day one of outbreak
    day_one = moment("22/01/2020", "DD/MM/YYYY");                                                           //assigning our day one value 27 Jan 2020 to day_one using moment lib
    var slider_day = moment(day_one,"DD/MM/YYYY").add((a.value-1),'day');                                   //manipulating the slider input with day_one value using moment, to get date for slider input
    b.innerHTML = moment(slider_day,"DD/MM/YYYY").format("dddd, MMMM Do YYYY");     //displaying the slider date in pre determined format using moment lib
}, false);