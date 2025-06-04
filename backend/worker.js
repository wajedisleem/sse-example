const progressEmitter = require('./progressEmitter');

async function worker() {
  const total = 100;
  for (let i = 1; i <= total; i++) {
    await new Promise((res) => setTimeout(res, 100)); // simulate work
    progressEmitter.emit('progress', {
      moved: i,
      total,
      percent: ((i / total) * 100).toFixed(2)
    });

    if (i === total) {
      progressEmitter.emit('done');
      i = 1;
    }
  }
}

module.exports = worker;
