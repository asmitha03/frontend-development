let number = 65465;
let str = number.toString();
let rev = str.split('').reverse().join('');
if (str === rev)
{
    console.log("Its an plaindrome")
}
else{
    console.log("Its not an palindrome")
}