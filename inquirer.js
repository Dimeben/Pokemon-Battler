const { Trainer } = require("../Pokemon-Battler/trainer.js");
const { Pokeball } = require("../Pokemon-Battler/pokeball.js");
const { Battle } = require("../Pokemon-Battler/battle");
const {
  Pokemon,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
} = require("../Pokemon-Battler/pokemon.js");

const inquirer = require("inquirer");

let trainerA, trainerB;
let trainerAPokeballs, trainerBPokeballs;

function getTrainerNames() {
  return inquirer
    .prompt([
      {
        name: "trainerAName",
        message: "Welcome to Pokemon Battler! What is Trainer 1's name?",
        type: "input",
      },
      {
        name: "trainerBName",
        message: "What is Trainer 2's name?",
        type: "input",
      },
    ])
    .then((answers) => {
      trainerA = new Trainer(answers.trainerAName);
      trainerB = new Trainer(answers.trainerBName);
      console.log(`Welcome ${trainerA.name} & ${trainerB.name}!`);
    });
}

function getPokeballCount() {
  return inquirer
    .prompt([
      {
        name: "trainerAPokeballs",
        message: `How many pokeballs would you like, ${trainerA.name}?`,
        type: "list",
        choices: [1, 2, 3, 4, 5, 6],
      },
      {
        name: "trainerBPokeballs",
        message: `How many pokeballs would you like, ${trainerB.name}?`,
        type: "list",
        choices: [1, 2, 3, 4, 5, 6],
      },
    ])
    .then((answers) => {
      trainerAPokeballs = parseInt(answers.trainerAPokeballs);
      trainerBPokeballs = parseInt(answers.trainerBPokeballs);

      for (let i = 0; i < trainerAPokeballs; i++) {
        trainerA.buyPokeball();
      }

      for (let i = 0; i < trainerBPokeballs; i++) {
        trainerB.buyPokeball();
      }
    });
}

function choosePokemon() {
  const pokemonChoices = ["Charmander", "Squirtle", "Bulbasaur", "Rattata"];

  const trainerAPokemonPrompts = [];
  for (let i = 0; i < trainerAPokeballs; i++) {
    trainerAPokemonPrompts.push({
      name: `trainerAPokemonChoice${i}`,
      message: `Choose your pokemon #${i + 1}, ${trainerA.name}!`,
      type: "list",
      choices: pokemonChoices,
    });
  }

  const trainerBPokemonPrompts = [];
  for (let i = 0; i < trainerBPokeballs; i++) {
    trainerBPokemonPrompts.push({
      name: `trainerBPokemonChoice${i}`,
      message: `Choose your pokemon #${i + 1}, ${trainerB.name}!`,
      type: "list",
      choices: pokemonChoices,
    });
  }

  return inquirer
    .prompt([...trainerAPokemonPrompts, ...trainerBPokemonPrompts])
    .then((answers) => {
      for (let i = 0; i < trainerAPokeballs; i++) {
        const choice = answers[`trainerAPokemonChoice${i}`];
        if (choice === "Charmander") {
          trainerA.catch(new Charmander("Charmander"));
        } else if (choice === "Squirtle") {
          trainerA.catch(new Squirtle("Squirtle"));
        } else if (choice === "Bulbasaur") {
          trainerA.catch(new Bulbasaur("Bulbasaur"));
        } else if (choice === "Rattata") {
          trainerA.catch(new Rattata("Rattata"));
        }
      }

      for (let i = 0; i < trainerBPokeballs; i++) {
        const choice = answers[`trainerBPokemonChoice${i}`];
        if (choice === "Charmander") {
          trainerB.catch(new Charmander("Charmander"));
        } else if (choice === "Squirtle") {
          trainerB.catch(new Squirtle("Squirtle"));
        } else if (choice === "Bulbasaur") {
          trainerB.catch(new Bulbasaur("Bulbasaur"));
        } else if (choice === "Rattata") {
          trainerB.catch(new Rattata("Rattata"));
        }
      }
    });
}

function startingPokemon() {
  const trainerAStartingPokemon = trainerA.belt.map(
    (pokeball) => pokeball.storage.name
  );
  const trainerBStartingPokemon = trainerB.belt.map(
    (pokeball) => pokeball.storage.name
  );

  return inquirer
    .prompt([
      {
        name: "readyToBattle",
        message: `${trainerA.name}... ${trainerB.name}... Are you ready to battle?`,
        type: "list",
        choices: ["Yes!"],
      },
      {
        name: "trainerAPokemonChoice",
        message: `Choose your first pokemon, ${trainerA.name}.`,
        type: "list",
        choices: [...trainerAStartingPokemon],
      },
      {
        name: "trainerBPokemonChoice",
        message: `Choose your first pokemon, ${trainerB.name}.`,
        type: "list",
        choices: [...trainerBStartingPokemon],
      },
    ])
    .then((answers) => {
      const battle = new Battle(
        trainerA,
        trainerB,
        answers.trainerAPokemonChoice,
        answers.trainerBPokemonChoice
      );
      return battle;
    });
}

function fight(battle) {
  return inquirer
    .prompt({
      name: "battle",
      message: `LET'S BATTLE!`,
      type: "list",
      choices: ["LET'S GO!"],
    })
    .then(() => {
      battle.fight();
    });
}

function playGame() {
  getTrainerNames()
    .then(getPokeballCount)
    .then(choosePokemon)
    .then(startingPokemon)
    .then(fight);
}

playGame();

module.exports = { inquirer };
