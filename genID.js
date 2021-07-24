function genID() {
  return `${Date.now()}${Math.floor(Math.random() * 1000000) + 1}`;
}

module.exports = genID;
