async function test(){
    const result1 = await foo(1, 2000)
    const result2 = await foo(2, 500).then( () => {
      return foo(3, 1000)
    })

    console.log('result:', result1);
    console.log('result2:', result2);
  }
   
  function foo(num, sec){
    return new Promise(function(resolve, reject){
      setTimeout( function(){
        console.log(num);
        resolve("async는 Promise방식을 사용합니다.");
      }, sec);
    });
  }
  test();
  
const doubleAfter2Seconds = x => {
    return new Promise(resolve=> {
        setTimeout(()=> {
            resolve(x * 5)
        }, 2000)
    })
}

const addAsync = async(x) => {
    const a = await doubleAfter2Seconds(10);
    const b = await doubleAfter2Seconds(20);
    const c = await doubleAfter2Seconds(30);

    return x + a + b + c;
}

addAsync(100)
  .then(sum=> {
      console.log(sum);
  })