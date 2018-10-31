function test() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(13);
    }, 2000);
  })
}

test().then((num1) => {
  console.log(num1);
  return 14;
}).then(num2 => {
  console.log(num2);
})