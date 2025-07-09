function addToDisplay(value)
{
   document.getElementById("display").value += value;
}
function calculate()
{
    let input = document.getElementById("display").value;
    let result = eval(input);
    document.getElementById("display").value = result;
}
function clearDisplay()
{
    document.getElementById("display").value = "";
}

