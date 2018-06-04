
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


function debounce(callback, timeOut, inmediate = false) {
  let timerId = null;
  return function() {
    let context = this, args = arguments; 
    let callCallback = function () {
      timerId = null;
      if (!inmediate) callback.apply(context, args);
    };
    clearTimeout(timerId);
    let shouldCall = inmediate && !timerId;
    timerId = setTimeout(callCallback, timeOut);
    if (shouldCall) callback.apply(context, args);
  };
}

const dconsole = debounce(console.log, 50);

for (let j=0; j<100 ; j++){
 // setTimeout(() => { dconsole(j, j+1) }, 50*j) ;
  setTimeout(() => { dconsole(j, j+1) }, 50*j) ;
}

