function Captials(text)
{
    return text
    .split(' ')
    .map(word => 
    {
        if (word.length === 0)
            return '';
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');      
    }
console.log(Captials("i am asmitha"));


