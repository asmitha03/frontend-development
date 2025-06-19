function equalnumbers(a,b)
{
    if (a.length !== b.length)
        return false;
    for (let i=0; i < a.length; i++)
    {
        if (a[i] !== b[i]){
            return false;
        }
    }
    return true;
}
let a = [2,3,4];
let b = [2,3,4];
console.log(equalnumbers(a,b));