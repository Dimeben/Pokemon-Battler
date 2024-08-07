const {
  Pokemon,
  FireType,
  WaterType,
  GrassType,
  NormalType,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
} = require("pokemon.js");
const Pokeball = require("pokeball.js");
const Trainer = require("trainer.js");

class Battle {
  constructor(trainerA, trainerB, pokemonA, pokemonB) {
    this.trainerA = trainerA;
    this.trainerB = trainerB;
    this.trainerACurrentPokemon = trainerA.getPokemon(pokemonA.name);
    this.trainerBCurrentPokemon = trainerB.getPokemon(pokemonB.name);
    this.currentTurn = trainerA;
    this.result = {};
  }
  fight() {
    const attackingPokemon =
      this.trainerA === this.currentTurn
        ? this.trainerACurrentPokemon
        : this.trainerBCurrentPokemon;
    const defendingPokemon =
      this.trainerA === this.currentTurn
        ? this.trainerBCurrentPokemon
        : this.trainerACurrentPokemon;
    let damage = attackingPokemon.useMove();

    if (
      defendingPokemon.strongAgainst === attackingPokemon.type &&
      defendingPokemon.hasOwnProperty("strongAgainst") &&
      attackingPokemon.hasOwnProperty("type")
    ) {
      damage = Math.floor((damage *= 0.75));
      console.log("It's not very effective...");
    }
    if (
      defendingPokemon.weakAgainst === attackingPokemon.type &&
      defendingPokemon.hasOwnProperty("weakAgainst") &&
      attackingPokemon.hasOwnProperty("type")
    ) {
      damage = Math.floor((damage *= 1.25));
      console.log("It's super effective!");
    }
    defendingPokemon.takeDamage(damage);
    this.currentTurn =
      this.trainerA === this.currentTurn ? this.trainerB : this.trainerA;
    if (defendingPokemon.hasFainted()) {
      console.log(`${defendingPokemon.name} has fainted!`);
      if (
        this.trainerA === this.currentTurn &&
        this.trainerACurrentPokemon.hasFainted()
      ) {
        this.trainerACurrentPokemon = this.trainerA.getPokemon();
        if (this.trainerA.isDefeated) {
          return console.log(
            `${this.trainerA.name} is out of pokemon! ${this.trainerB.name} wins!!!`
          );
        }
      } else if (
        this.trainerB === this.currentTurn &&
        this.trainerBCurrentPokemon.hasFainted()
      ) {
        this.trainerBCurrentPokemon = this.trainerB.getPokemon();
        if (this.trainerB.isDefeated) {
          return console.log(
            `${this.trainerB.name} is out of pokemon! ${this.trainerA.name} wins!!!`
          );
        }
      }
    }
    if (!this.trainerA.allFainted() || !this.trainerB.allFainted()) {
      this.fight();
    }
  }
}

module.exports = { Battle };
