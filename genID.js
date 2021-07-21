function genID() {
  return `${Date.now()}-${Math.random()}`;
}

module.exports = genID;
