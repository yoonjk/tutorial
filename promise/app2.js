Promise
  .resolve()
  .then(()=>console.log('test1'), console.log('test2'))
  .then(() => Promise.reject('error1'))
  .catch(console.log)
  .then(() => console.log('continue1'))
  
Promise
  .resolve()
  .then(() => Promise.reject('error2'))
  .then(() => console.log('continue2'), console.log)
  .then(() => console.log('continue3'))