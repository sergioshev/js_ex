
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

function debouncePromised(callback, timeOut, inmediate = false) {
  let timerId ;
  let lastArgs;
  let deferedPromise;

  const resolveDelayedPromise = function() {
    Promise.resolve(callback.apply(this, lastArgs))
      .then(deferedPromise.res, deferedPromise.rej);
    deferedPromise = null;
    lastArgs = null;
    timerId = null;
  };

  return function() {
    let context = this, args = arguments;
    let shouldCall = !timerId && !lastArgs && inmediate;
    lastArgs = args;
    if (shouldCall) return Promise.resolve(callback.apply(this, args));

    clearTimeout(timerId);
    timerId = setTimeout(resolveDelayedPromise.bind(this), timeOut);
    
    if (!deferedPromise) {
      deferedPromise = {};
      deferedPromise.promise = new Promise((res, rej) => {
        deferedPromise.res = res;
        deferedPromise.rej = rej;
      });
    }
    return deferedPromise.promise;
  };
}


/*
const dconsole = debounce((r) => r, 50);

for (let j=0; j<100 ; j++){
 // setTimeout(() => { dconsole(j, j+1) }, 50*j) ;
  setTimeout(() => { v = dconsole(j) ; console.log(v) ; }, 50*j) ;
}
*/

const someFunction = (v) => {
  return new Promise((res, rej) => {
    const delay = Math.floor(Math.random()*19+1);
    console.log(`Doing job for ${delay} ms`);
    setTimeout(() => res([v, delay]), delay);
  });
}

const debouncedFunction = debouncePromised(someFunction, 40, true);

let array = [];
for (let j=1; j<10 ; j++) {
  array.push(j);
}

array.forEach(e => {
  return debouncedFunction(e).then(v => console.log(`Resolved with ${v}`));
});





