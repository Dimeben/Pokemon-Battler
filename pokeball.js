class Pokeball {
  constructor() {
    this.storage = {};
    this.isFull = false;
  }
  throw(targetPokemon) {
    if (!targetPokemon) {
      if (this.isFull) {
        console.log(`GO ${this.storage.name.toUpperCase()}!!`);
        return this.storage;
      } else {
        console.log("Oops! This pokeball is empty!");
      }
    } else {
      if (!this.isFull) {
        this.storage = targetPokemon;
        this.isFull = true;
        console.log(`You caught ${targetPokemon.name}!!!`);
      } else {
        console.log("This pokeball is already full :(");
      }
    }
  }
  isEmpty() {
    return !this.isFull;
  }
  contains() {
    if (this.isFull) {
      return this.storage.name;
    } else {
      return "empty ...";
    }
  }
}

module.exports = { Pokeball };
