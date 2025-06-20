let number = 97;
let count = 0;
for(let i = 1; i <= number; i++)
{
    if(number % i === 0)
    {
        count++;
    }
}
if(count === 2){
    console.log("its an prime number")
}
else{
    console.log("its not an prime number")
}