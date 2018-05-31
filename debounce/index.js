
function debounce2(callback, feedTime) {
  let callsCount = 0;
  let lastArgs;

  const delayedCaller = () => {
    callsCount = 0;
    callback(...lastArgs);
  };

  const debounced = (...args) => {
    lastArgs = args;
    if (callsCount == 0) setTimeout(delayedCaller, feedTime);
    callsCount++;
  }

  return debounced
}

const dconsole = debounce2(console.log, 200);

for (let j=0; j<1000 ; j++){
  setTimeout(() => { dconsole(j, j+1) }, 50*j) ;
}

