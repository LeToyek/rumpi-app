const makeTest = (param) =>{
  setTimeout(() => {
    console.log(param)
    return param
  }, 1500);
}
let a = null;
const fillA = () =>{
  setTimeout(() => {
    a = 1
    console.log(a)
  }, 1000);
}

const run = async () =>{
  const b = await makeTest("yee")
  await console.log(b)
  await makeTest("matamu")
  await makeTest("goblok")
  await fillA()
  a && console.log("shitt")
  if (a > -3) {
    await console.log("suck")  
  }
  console.log("first")
}
run()