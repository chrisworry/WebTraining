
function getModule_helloworld() {
    try {
        return require('./build/Release/helloworld.node');
      } catch (err) {
        return require('./build/Debug/helloworld.node');
    }
}

const helloworld = getModule_helloworld();

console.log(helloworld.helloworld());