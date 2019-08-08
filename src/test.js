const num1 = [[1]];
const num2 = [2, [3]];

const numbers = num1.concat(num2);

console.log(numbers);
// results in [[1], 2, [3]]

// modify the first element of num1
num1[0].push(4);

console.log(numbers);
// results in [[1, 4], 2, [3]]
console.log(num1) 
const index=4
    const indexes=[[0,0],[0,1],[0,2],[1,0], [1,1],[1,2],[2,0],[2,1],[2,2]]
    if (index<9){
      console.log(indexes[index])
      return indexes[index]
    }
 