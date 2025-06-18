function evennumbers(){
    let result = [];
    for (let i = 0; i <= 10; i++){
        if  (i % 2 === 0){
            result.push(i);
        }
    }
    return result;
}
let s = evennumbers();
console.log(s);
