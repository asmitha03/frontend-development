function checkdigit(num)
{
    return /^\d+$/.test(num);
}
console.log(checkdigit("12367"));
console.log(checkdigit("3ag26"));
