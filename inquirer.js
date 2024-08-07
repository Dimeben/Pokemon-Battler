const { Trainer } = require("trainer.js");
const { Pokeball } = require("pokeball.js");
const { Battle } = require("battle.js");
const {
  Pokemon,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
} = require("pokemon.js");

const inquirer = require("inquirer");

function playGame() {
  inquirer
    .prompt([
      {
        name: "trainerAGreeting",
        message: "Welcome to Pokemon Battler! What is Trainer 1's name?",
        type: "input",
      },
      {
        name: "trainerBGreeting",
        message: "What is Trainer 2's name?",
        type: "input",
      },
    ])
    .then(function (answers) {
      const trainerA = new Trainer(answers.trainerAGreeting);
      const trainerB = new Trainer(answers.trainerBGreeting);
      console.log(`Welcome ${trainerA.name} & ${trainerB.name}!`);

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
        .then(function (answers) {
          const trainerAPokeballs = answers.trainerAPokeballs;
          const trainerBPokeballs = answers.trainerBPokeballs;

          for (let i = 0; i < trainerAPokeballs; i++) {
            trainerA.buyPokeball();
          }
          for (let i = 0; i < trainerBPokeballs; i++) {
            trainerB.buyPokeball();
          }

          const pokemonChoices = [
            "Charmander",
            "Squirtle",
            "Bulbasaur",
            "Rattata",
          ];

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
            .then(function (answers) {
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
              const trainerAStartingPokemon = [];
              for (let i = 0; i < trainerA.belt.length; i++) {
                trainerAStartingPokemon.push(trainerA.belt[i].storage.name);
              }
              const trainerBStartingPokemon = [];
              for (let i = 0; i < trainerB.belt.length; i++) {
                trainerBStartingPokemon.push(trainerB.belt[i].storage.name);
              }

              return inquirer
                .prompt([
                  {
                    name: "readyToBattle",
                    message: `${trainerA.name}... ${trainerB.name}... Are you ready to battle?`,
                    type: "list",
                    choices: ["Yes", "Yes"],
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
                .then(function (answers) {
                  const battle = new Battle(
                    trainerA,
                    trainerB,
                    answers.trainerAPokemonChoice,
                    answers.trainerBPokemonChoice
                  );
                  return inquirer
                    .prompt({
                      name: "battle",
                      message: `LET'S BATTLE!`,
                      type: "list",
                      choices: ["LET'S GO!"],
                    })
                    .then(function (answers) {
                      battle.fight();
                    });
                });
            });
        });
    });
}

playGame();

module.exports = { inquirer };