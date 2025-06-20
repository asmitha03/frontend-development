function anagram(txt1,txt2)
{
    txt1 = txt1.replace(/\s/g, '').toLowerCase();
    txt2 = txt2.replace(/\s/g, '').toLowerCase();
    if (txt1.length !== txt2.length)
    {
        return false;
    }
    let sorted1 = txt1.split('').sort().join('');
    let sorted2 = txt2.split('').sort().join('');
    if (sorted1 === sorted2)
    {
        return "Its an anagram";
    }
    else
    {
        return "Its not an anagram";
    }
    }
console.log(anagram("listen","silent"));

