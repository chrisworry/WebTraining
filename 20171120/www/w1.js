
this.onmessage = function(ev) {
    let sum = ev.data.n1+ev.data.n2;
    this.postMessage(sum);
}