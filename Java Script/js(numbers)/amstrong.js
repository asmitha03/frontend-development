let num = 373
let a = num.toString();
let sum = 0;
for (let i = 0; i < a.length; i++)
{
    let digit = Number(a[i]);
    sum += digit ** a.length;
}        
if (sum === num)
{
    console.log("it ia an amstrong number");
}
else {
    console.log("its not an amstrong number");
}