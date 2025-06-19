let num1 = [3,7,8];
let num2= [2,9,5];
let merge = num1.concat(num2);
let sort = merge.sort((a,b) => a - b);
console.log(sort);