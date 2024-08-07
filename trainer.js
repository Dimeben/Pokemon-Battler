const { Pokeball } = require("pokeball.js");

class Trainer {
  constructor(name) {
    this.name = name;
    this.belt = [];
    this.pokeballQuantity = 0;
    this.pokeballMax = 6;
  }
  catch(targetPokemon) {
    if (!this.pokeballQuantity) {
      console.log("You don't have any spare pokeballs to use!");
    } else {
      const firstEmptyPokeball = this.belt.find((obj) => obj.isFull === false);
      if (firstEmptyPokeball) {
        firstEmptyPokeball.throw(targetPokemon);
      } else {
        if (!firstEmptyPokeball && this.pokeballQuantity === this.pokeballMax) {
          console.log("Your party is already full!");
        } else {
          console.log(
            "You have no pokeballs left! You need to buy more pokeballs!"
          );
        }
      }
    }
  }
  getPokemon(name) {
    const nextPokeball = this.belt.find(
      (obj) => obj.isFull === true && obj.storage.hitPoints > 0
    );
    if (!name && !nextPokeball) {
      const defeat = console.log("You're out of Pokemon! You have to flee!");
      this.isDefeated = true;
      return defeat;
    } else if (!name) {
      return nextPokeball.throw();
    }
    const selectedPokeball = this.belt.find((obj) => obj.storage.name === name);
    if (!selectedPokeball) {
      console.log("You don't have a Pokemon by this name!");
    } else {
      return selectedPokeball.throw();
    }
  }
  buyPokeball() {
    if (this.pokeballQuantity !== this.pokeballMax) {
      this.belt.push(new Pokeball());
      this.pokeballQuantity++;
    }
  }
  allFainted() {
    return this.belt.every((obj) => obj.storage.hitPoints === 0)
  }
}

module.exports = { Trainer };
