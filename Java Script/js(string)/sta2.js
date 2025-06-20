let a = "asmitha";
let charcount = "a";
let count = 0;
for (let i = 0; i < a.length; i++)
    {
        if (a[i] === charcount)
        {
            count++;
        }
    } 
console.log(`'${charcount}' appears ${count} times in "${a}"`);