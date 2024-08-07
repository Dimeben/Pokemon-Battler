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
} = require("../pokemon.js");
const { Pokeball } = require("../pokeball.js");
const { Trainer } = require("../trainer.js");
const { Battle } = require("../battle.js");

describe("Pokemon", () => {
  describe("Creating the Pokemon Class", () => {
    test("Class creates a pokemon with properties of default values", () => {
      const pikachu = new Pokemon("Pikachu");
      const expectedOutput = {
        name: "Pikachu",
        hitPoints: 100,
        attackDamage: 20,
        move: "tackle",
      };
      expect(pikachu).toEqual(expectedOutput);
    });
    test("Class creates a pokemon with properties of custom values", () => {
      const pikachu = new Pokemon("Pikachu", 90, 22);
      expect(pikachu.hitPoints).toBe(90);
      expect(pikachu.attackDamage).toBe(22);
    });
  });

  describe("Pokemon methods", () => {
    test("takeDamage - will take a number and reduce the health property by the number given", () => {
      const pikachu = new Pokemon("Pikachu");
      const expectedOutput = {
        name: "Pikachu",
        hitPoints: 80,
        attackDamage: 20,
        move: "tackle",
      };
      pikachu.takeDamage();
      expect(pikachu).toEqual(expectedOutput);
    });
    test("take damage - attack damage and hitpoints relate to custom values", () => {
      const ben = new Trainer("Ben");
      const martin = new Trainer("Martin");
      const charmander = new Pokemon("Charmander", 44, 17);
      const squirtle = new Pokemon("Squirtle", 44, 16);
      ben.buyPokeball();
      martin.buyPokeball();
      ben.catch(charmander);
      martin.catch(squirtle);
      const battle = new Battle(ben, martin, charmander, squirtle);
      battle.fight();
      battle.fight();
      const output1 = charmander.hitPoints;
      const output2 = squirtle.hitPoints;
      const expectedOutput1 = 28;
      const expectedOutput2 = 27;
      expect(output1).toBe(expectedOutput1);
      expect(output2).toBe(expectedOutput2);
    });
    test("useMove will return the attack damage of a Pokemon and will also console log the attack", () => {
      const consoleSpy = jest.spyOn(console, "log");
      const pikachu = new Pokemon("Pikachu");
      const output = pikachu.useMove();
      expect(output).toEqual(20);
      expect(consoleSpy).toHaveBeenCalledWith("Pikachu used tackle.");
      consoleSpy.mockRestore();
    });
    test("hasFainted returns true/false based on if their hit points are 0 or not", () => {
      const pikachu = new Pokemon("Pikachu");
      const output1 = pikachu.hasFainted();
      pikachu.takeDamage();
      pikachu.takeDamage();
      pikachu.takeDamage();
      pikachu.takeDamage();
      pikachu.takeDamage();
      const output2 = pikachu.hasFainted();
      expect(output1).toEqual(false);
      expect(output2).toEqual(true);
    });
  });

  describe("Pokemon Types", () => {
    test("Type property matches subclass", () => {
      const moltres = new FireType("Moltres");
      const lapras = new WaterType("Lapras");
      const leafeon = new GrassType("Leafeon");
      const snorlax = new NormalType("Snorlax");
      expect(moltres.type).toBe("fire");
      expect(lapras.type).toBe("water");
      expect(leafeon.type).toBe("grass");
      expect(snorlax.type).toBe("normal");
    });
    test("isEffectiveAgainst will return true/false depending on effectiveness", () => {
      const moltres = new FireType("Moltres");
      const lapras = new WaterType("Lapras");
      const leafeon = new GrassType("Leafeon");
      const snorlax = new NormalType("Snorlax");
      expect(snorlax.isEffectiveAgainst(leafeon)).toBe(false);
      expect(moltres.isEffectiveAgainst(lapras)).toBe(false);
      expect(moltres.isEffectiveAgainst(leafeon)).toBe(true);
    });
    test("isWeakTo will return true/false depending on effectiveness", () => {
      const moltres = new FireType("Moltres");
      const lapras = new WaterType("Lapras");
      const leafeon = new GrassType("Leafeon");
      const snorlax = new NormalType("Snorlax");
      expect(snorlax.isWeakTo(leafeon)).toBe(false);
      expect(moltres.isWeakTo(lapras)).toBe(true);
      expect(moltres.isWeakTo(leafeon)).toBe(false);
    });
    test("Pokemon types are initalised with custom argurments", () => {
      const moltres = new FireType("Moltres", 110, 15);
      expect(moltres.hitPoints).toBe(110);
      expect(moltres.attackDamage).toBe(15);
      const lapras = new WaterType("Lapras", 110, 15);
      expect(lapras.hitPoints).toBe(110);
      expect(lapras.attackDamage).toBe(15);
      const leafeon = new GrassType("Leafeon", 110, 15);
      expect(leafeon.hitPoints).toBe(110);
      expect(leafeon.attackDamage).toBe(15);
      const snorlax = new NormalType("Snorlax", 110, 15);
      expect(snorlax.hitPoints).toBe(110);
      expect(snorlax.attackDamage).toBe(15);
    });
  });

  describe("Pokemon Species", () => {
    test("Pokemons' move match their relevant sub class", () => {
      const charmander = new Charmander("Charmander");
      const squirtle = new Squirtle("Squirtle");
      const bulbasaur = new Bulbasaur("Bulbasaur");
      const rattata = new Rattata("Rattata");
      expect(charmander.move).toBe("ember");
      expect(squirtle.move).toBe("water gun");
      expect(bulbasaur.move).toBe("vine whip");
      expect(rattata.move).toBe("tackle");
    });
    test("Hitpoints and damage are assigned by species subclasses", () => {
      const charmander = new Charmander("Charmander", 100000, 100000);
      const squirtle = new Squirtle("Squirtle");
      const bulbasaur = new Bulbasaur("Bulbasaur");
      const rattata = new Rattata("Rattata");
      expect(charmander.hitPoints).toBe(44);
      expect(charmander.attackDamage).toBe(17);
      expect(squirtle.hitPoints).toBe(44);
      expect(squirtle.attackDamage).toBe(16);
      expect(bulbasaur.hitPoints).toBe(45);
      expect(bulbasaur.attackDamage).toBe(16);
      expect(rattata.hitPoints).toBe(30);
      expect(rattata.attackDamage).toBe(10);
    });
  });
});

describe("Pokeball", () => {
  describe("Creating a Pokeball class", () => {
    test("Class creates a Pokeball with properties", () => {
      const pokeball = new Pokeball();
      const expectedOutput = {
        storage: {},
        isFull: false,
      };
      expect(pokeball).toEqual(expectedOutput);
    });
  });
  describe("Pokeball methods", () => {
    test("throw - If the pokeball is empty it will add the pokemon to storage", () => {
      const pokeball = new Pokeball();
      const pikachu = new Pokemon("Pikachu");
      pokeball.throw(pikachu);
      const output = pokeball.storage;
      const expectedOutput = pikachu;
      expect(output).toEqual(pikachu);
    });
    test("throw - Will change isFull to true once a pokemon is caught", () => {
      const pokeball = new Pokeball();
      const pikachu = new Pokemon("Pikachu");
      pokeball.throw(pikachu);
      const output = pokeball.isFull;
      expect(output).toEqual(true);
    });
    test("throw - If pokeball is full, it cannot be used to catch pokemon", () => {
      const pokeball = new Pokeball();
      const pikachu = new Pokemon("Pikachu");
      const eevee = new Pokemon("Eevee");
      pokeball.throw(pikachu);
      pokeball.throw(eevee);
      const output = pokeball.storage;
      expect(output).toEqual(pikachu);
    });
    test("throw - If pokemon is caught, message is logged to console", () => {
      const consoleSpy = jest.spyOn(console, "log");
      const pokeball = new Pokeball();
      const pikachu = new Pokemon("Pikachu");
      pokeball.throw(pikachu);
      expect(consoleSpy).toHaveBeenCalledWith("You caught Pikachu!!!");
      consoleSpy.mockRestore();
    });
    test("throw - If envoked without argument, returns storage and logs to console", () => {
      const consoleSpy = jest.spyOn(console, "log");
      const pokeball = new Pokeball();
      const pikachu = new Pokemon("Pikachu");
      pokeball.throw(pikachu);
      const output = pokeball.throw();
      expect(output).toEqual(pikachu);
      expect(consoleSpy).toHaveBeenCalledWith("GO PIKACHU!!");
      consoleSpy.mockRestore();
    });
    test("throw - if invoked without an argument and is empty, then logs to console", () => {
      const consoleSpy = jest.spyOn(console, "log");
      const pokeball = new Pokeball();
      pokeball.throw();
      expect(consoleSpy).toHaveBeenCalledWith("Oops! This pokeball is empty!");
      consoleSpy.mockRestore();
    });
    test("isEmpty will return true or false if pokemon is in storage", () => {
      const pokeball = new Pokeball();
      const charmander = new Pokemon("Charmander");
      const output1 = pokeball.isEmpty();
      pokeball.throw(charmander);
      const output2 = pokeball.isEmpty();
      expect(output1).toBe(true);
      expect(output2).toBe(false);
    });
    test("contains will return the name of the pokemon or console log is empty", () => {
      const pokeball = new Pokeball();
      const mewtwo = new Pokemon("Mewtwo");
      const output1 = pokeball.contains();
      pokeball.throw(mewtwo);
      const output2 = pokeball.contains();
      expect(output1).toBe("empty ...");
      expect(output2).toBe("Mewtwo");
    });
  });
});

describe("Trainer", () => {
  test("creates a trainer with properties", () => {
    const trainer = new Trainer("Martin");
    const expectedOutput = {
      name: "Martin",
      belt: [],
      pokeballQuantity: 0,
      pokeballMax: 6,
    };
    expect(trainer).toEqual(expectedOutput);
  });
  describe("Trainer Methods", () => {
    test("catch - logs to console when no empty pokeballs availible", () => {
      const consoleSpy = jest.spyOn(console, "log");
      const trainer = new Trainer("Ben");
      const ditto = new Pokemon("Ditto");
      trainer.catch(ditto);
      expect(consoleSpy).toHaveBeenCalledWith(
        "You don't have any spare pokeballs to use!"
      );
      consoleSpy.mockRestore();
    });
    test("catch - will envoke an empty pokeball's throw method", () => {
      const trainer = new Trainer("Martin");
      const lugia = new Pokemon("Lugia");
      const pokeball = new Pokeball();
      trainer.belt.push(pokeball);
      trainer.pokeballQuantity = 1;
      trainer.catch(lugia);
      const output = pokeball.storage;
      expect(output).toEqual(lugia);
    });
    test("catch - first empty pokeball will be used", () => {
      const trainer = new Trainer("Ben");
      const pikachu = new Pokemon("Pikachu");
      const mewtwo = new Pokemon("Mewtwo");
      const pokeball1 = new Pokeball();
      const pokeball2 = new Pokeball();
      trainer.belt.push(pokeball1);
      trainer.belt.push(pokeball2);
      trainer.pokeballQuantity = 2;
      trainer.catch(pikachu);
      trainer.catch(mewtwo);
      const output1 = trainer.belt[0].storage;
      const output2 = trainer.belt[1].storage;
      expect(output1).toEqual(pikachu);
      expect(output2).toEqual(mewtwo);
    });
    test("catch - doens't call throw method if there are no empty pokeballs", () => {
      const trainer = new Trainer("Ben");
      const pikachu = new Pokemon("Pikachu");
      const mew = new Pokemon("Mew");
      const mewtwo = new Pokemon("Mewtwo");
      const pokeball1 = new Pokeball();
      const pokeball2 = new Pokeball();
      trainer.belt.push(pokeball1);
      trainer.belt.push(pokeball2);
      trainer.pokeballQuantity = 2;
      trainer.catch(pikachu);
      trainer.catch(mew);
      trainer.catch(mewtwo);
      const output1 = trainer.belt[0].storage;
      const output2 = trainer.belt[1].storage;
      const output3 = trainer.belt.length;
      expect(output1).toEqual(pikachu);
      expect(output2).toEqual(mew);
      expect(output3).toBe(2);
    });
    test("catch - console logs when you have space in party but not enough pokeballs", () => {
      const consoleSpy = jest.spyOn(console, "log");
      const trainer = new Trainer("Aimée");
      const pikachu = new Pokemon("Pikachu");
      const mew = new Pokemon("Mew");
      const mewtwo = new Pokemon("Mewtwo");
      const pokeball1 = new Pokeball();
      const pokeball2 = new Pokeball();
      trainer.belt.push(pokeball1);
      trainer.belt.push(pokeball2);
      trainer.pokeballQuantity = 2;
      trainer.catch(pikachu);
      trainer.catch(mew);
      trainer.catch(mewtwo);
      expect(consoleSpy).toHaveBeenCalledWith(
        "You have no pokeballs left! You need to buy more pokeballs!"
      );
      consoleSpy.mockRestore();
    });
    test("catch - console logs when your party is full", () => {
      const consoleSpy = jest.spyOn(console, "log");
      const trainer = new Trainer("Aimée");
      const pikachu = new Pokemon("Pikachu");
      const mew = new Pokemon("Mew");
      const mewtwo = new Pokemon("Mewtwo");
      const weedle = new Pokemon("Weedle");
      const jynx = new Pokemon("Jynx");
      const magikarp = new Pokemon("Magikarp");
      const mrMime = new Pokemon("Mr Mime");
      const pokeball1 = new Pokeball();
      const pokeball2 = new Pokeball();
      const pokeball3 = new Pokeball();
      const pokeball4 = new Pokeball();
      const pokeball5 = new Pokeball();
      const pokeball6 = new Pokeball();
      trainer.belt.push(pokeball1);
      trainer.belt.push(pokeball2);
      trainer.belt.push(pokeball3);
      trainer.belt.push(pokeball4);
      trainer.belt.push(pokeball5);
      trainer.belt.push(pokeball6);
      trainer.pokeballQuantity = 6;
      trainer.catch(pikachu);
      trainer.catch(mew);
      trainer.catch(mewtwo);
      trainer.catch(weedle);
      trainer.catch(jynx);
      trainer.catch(magikarp);
      trainer.catch(mrMime);
      expect(consoleSpy).toHaveBeenCalledWith("Your party is already full!");
      consoleSpy.mockRestore();
    });
    test("getPokemon - will call throw on first pokeball in belt", () => {
      const trainer = new Trainer("Martin");
      const blastoise = new Pokemon("Blastoise");
      const pokeball1 = new Pokeball();
      trainer.belt.push(pokeball1);
      trainer.pokeballQuantity = 1;
      trainer.catch(blastoise);
      const output = trainer.getPokemon("Blastoise");
      expect(output).toBe(blastoise);
    });
    test("getPokemon - will return console log if pokemon name doens't match", () => {
      const consoleSpy = jest.spyOn(console, "log");
      const trainer = new Trainer("Ben");
      const blastoise = new Pokemon("Blastoise");
      const pokeball1 = new Pokeball();
      trainer.belt.push(pokeball1);
      trainer.pokeballQuantity = 1;
      trainer.catch(blastoise);
      trainer.getPokemon("Charazard");
      expect(consoleSpy).toHaveBeenCalledWith(
        "You don't have a Pokemon by this name!"
      );
      consoleSpy.mockRestore();
    });
    test("getPokemon -  will search for pokemon throughout the belt", () => {
      const trainer = new Trainer("Ben");
      const blastoise = new Pokemon("Blastoise");
      const mew = new Pokemon("Mew");
      const mewtwo = new Pokemon("Mewtwo");
      const weedle = new Pokemon("Weedle");
      const jynx = new Pokemon("Jynx");
      const magikarp = new Pokemon("Magikarp");
      const pokeball1 = new Pokeball();
      const pokeball2 = new Pokeball();
      const pokeball3 = new Pokeball();
      const pokeball4 = new Pokeball();
      const pokeball5 = new Pokeball();
      const pokeball6 = new Pokeball();
      trainer.pokeballQuantity = 6;
      trainer.belt.push(pokeball1);
      trainer.belt.push(pokeball2);
      trainer.belt.push(pokeball3);
      trainer.belt.push(pokeball4);
      trainer.belt.push(pokeball5);
      trainer.belt.push(pokeball6);
      trainer.catch(blastoise);
      trainer.catch(mew);
      trainer.catch(mewtwo);
      trainer.catch(weedle);
      trainer.catch(jynx);
      trainer.catch(magikarp);
      const output = trainer.getPokemon("Weedle");
      expect(output).toEqual(weedle);
    });
    test("getPokemon - will return console log if the belt is empty", () => {
      const consoleSpy = jest.spyOn(console, "log");
      const trainer = new Trainer("Ben");
      trainer.getPokemon("Charazard");
      expect(consoleSpy).toHaveBeenCalledWith(
        "You don't have a Pokemon by this name!"
      );
      consoleSpy.mockRestore();
    });
    test("buyPokeball - creates a new pokeball and adds it the belt", () => {
      const trainer = new Trainer("Martin");
      trainer.buyPokeball();
      const output = trainer.belt.length;
      expect(output).toBe(1);
    });
    test("buyPokeball - doesn't add a pokeball to the belt if it is full", () => {
      const trainer = new Trainer("Martin");
      trainer.buyPokeball();
      trainer.buyPokeball();
      trainer.buyPokeball();
      trainer.buyPokeball();
      trainer.buyPokeball();
      trainer.buyPokeball();
      trainer.buyPokeball();
      const output = trainer.belt.length;
      expect(output).toBe(6);
    });
  });
});

describe("Battle", () => {
  describe("Setting up battle class", () => {
    test("Invoking battle contains properties", () => {
      const ben = new Trainer("Ben");
      const martin = new Trainer("Martin");
      const mewtwo = new Pokemon("Mewtwo");
      const lugia = new Pokemon("Lugia");
      ben.buyPokeball();
      martin.buyPokeball();
      ben.catch(mewtwo);
      martin.catch(lugia);
      const battle = new Battle(ben, martin, mewtwo, lugia);
      const expectedOutput = {
        trainerA: ben,
        trainerB: martin,
        trainerACurrentPokemon: mewtwo,
        trainerBCurrentPokemon: lugia,
        currentTurn: ben,
        result: {},
      };
      expect(battle).toEqual(expectedOutput);
    });
  });
  describe("Methods", () => {
    describe("Fight methods", () => {
      test("fight - defending pokemon takes damage", () => {
        const ben = new Trainer("Ben");
        const martin = new Trainer("Martin");
        const mewtwo = new Pokemon("Mewtwo");
        const lugia = new Pokemon("Lugia");
        ben.buyPokeball();
        martin.buyPokeball();
        ben.catch(mewtwo);
        martin.catch(lugia);
        const battle = new Battle(ben, martin, mewtwo, lugia);
        battle.fight();
        const output = lugia.hitPoints;
        expect(output).toBe(80);
      });
      test("fight - second round alternates attacking/defending pokemon", () => {
        const ben = new Trainer("Ben");
        const martin = new Trainer("Martin");
        const mewtwo = new Pokemon("Mewtwo");
        const lugia = new Pokemon("Lugia");
        ben.buyPokeball();
        martin.buyPokeball();
        ben.catch(mewtwo);
        martin.catch(lugia);
        const battle = new Battle(ben, martin, mewtwo, lugia);
        battle.fight();
        battle.fight();
        const output = mewtwo.hitPoints;
        expect(output).toBe(80);
      });
      test("fight - strongAgainst multiplies (reduces) damage by 0.75", () => {
        const ben = new Trainer("Ben");
        const martin = new Trainer("Martin");
        const charmander = new Charmander("Charmander");
        const squirtle = new Squirtle("Squirtle");
        ben.buyPokeball();
        martin.buyPokeball();
        ben.catch(charmander);
        martin.catch(squirtle);
        const battle = new Battle(ben, martin, charmander, squirtle);
        battle.fight();
        const output = squirtle.hitPoints;
        expect(output).toBe(32);
      });
      test("fight - strongAgainst multiplies (increases) damage by 1.25", () => {
        const ben = new Trainer("Ben");
        const martin = new Trainer("Martin");
        const charmander = new Charmander("Charmander");
        const squirtle = new Squirtle("Squirtle");
        ben.buyPokeball();
        martin.buyPokeball();
        ben.catch(charmander);
        martin.catch(squirtle);
        const battle = new Battle(ben, martin, charmander, squirtle);
        battle.fight();
        battle.fight();
        const output = charmander.hitPoints;
        expect(output).toBe(24);
      });
      test("fight - battle message will be returned if an attack is not effective/is super effective", () => {
        const consoleSpy = jest.spyOn(console, "log");
        const ben = new Trainer("Ben");
        const martin = new Trainer("Martin");
        const charmander = new Charmander("Charmander");
        const squirtle = new Squirtle("Squirtle");
        ben.buyPokeball();
        martin.buyPokeball();
        ben.catch(charmander);
        martin.catch(squirtle);
        const battle = new Battle(ben, martin, charmander, squirtle);
        battle.fight();
        battle.fight();
        expect(consoleSpy).toHaveBeenCalledWith("It's not very effective...");
        expect(consoleSpy).toHaveBeenCalledWith("It's super effective!");
        consoleSpy.mockRestore();
      });
      test("fight - message will appear when a pokemon has fainted", () => {
        const consoleSpy = jest.spyOn(console, "log");
        const ben = new Trainer("Ben");
        const martin = new Trainer("Martin");
        const charmander = new Charmander("Charmander");
        const squirtle = new Squirtle("Squirtle");
        ben.buyPokeball();
        martin.buyPokeball();
        ben.catch(charmander);
        martin.catch(squirtle);
        const battle = new Battle(ben, martin, charmander, squirtle);
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        expect(consoleSpy).toHaveBeenCalledWith("Charmander has fainted!");
        consoleSpy.mockRestore();
      });
      test("fight - trainer will be prompted to pick a new pokemon when theirs has fainted", () => {
        const ben = new Trainer("Ben");
        const martin = new Trainer("Martin");
        const charmander = new Charmander("Charmander");
        const bulbasaur = new Bulbasaur("Bulbasaur");
        const squirtle = new Squirtle("Squirtle");
        ben.buyPokeball();
        ben.buyPokeball();
        martin.buyPokeball();
        ben.catch(charmander);
        ben.catch(bulbasaur);
        martin.catch(squirtle);
        const battle = new Battle(ben, martin, charmander, squirtle);
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        expect(battle.trainerACurrentPokemon).toEqual(bulbasaur);
      });
      test("fight - trainer will be told that they need to flee when they have no more pokemon left", () => {
        const consoleSpy = jest.spyOn(console, "log");
        const ben = new Trainer("Ben");
        const martin = new Trainer("Martin");
        const charmander = new Charmander("Charmander");
        const squirtle = new Squirtle("Squirtle");
        ben.buyPokeball();
        ben.buyPokeball();
        martin.buyPokeball();
        ben.catch(charmander);
        martin.catch(squirtle);
        const battle = new Battle(ben, martin, charmander, squirtle);
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        expect(consoleSpy).toHaveBeenCalledWith(
          "You're out of Pokemon! You have to flee!"
        );
        consoleSpy.mockRestore();
      });
      test("fight - When a trainer has lost, a victory message will be displayed for the winner", () => {
        const consoleSpy = jest.spyOn(console, "log");
        const ben = new Trainer("Ben");
        const martin = new Trainer("Martin");
        const charmander = new Charmander("Charmander");
        const squirtle = new Squirtle("Squirtle");
        ben.buyPokeball();
        ben.buyPokeball();
        martin.buyPokeball();
        ben.catch(charmander);
        martin.catch(squirtle);
        const battle = new Battle(ben, martin, charmander, squirtle);
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        expect(consoleSpy).toHaveBeenCalledWith(
          "You're out of Pokemon! You have to flee!"
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          "Ben is out of pokemon! Martin wins!!!"
        );
        consoleSpy.mockRestore();
      });
      test("fight - test to check that all methods work correctly when multiple pokemon of varying types are used", () => {
        const consoleSpy = jest.spyOn(console, "log");
        const ben = new Trainer("Ben");
        const martin = new Trainer("Martin");
        const charmander1 = new Charmander("Charmander");
        const squirtle1 = new Squirtle("Squirtle");
        const bulbasaur1 = new Bulbasaur("Bulbasaur");
        const rattata1 = new Rattata("Rattata");
        const charmander2 = new Charmander("Charmander");
        const squirtle2 = new Squirtle("Squirtle");
        const bulbasaur2 = new Bulbasaur("Bulbasaur");
        const rattata2 = new Rattata("Rattata");
        const charmander3 = new Charmander("Charmander");
        const squirtle3 = new Squirtle("Squirtle");
        const bulbasaur3 = new Bulbasaur("Bulbasaur");
        const rattata3 = new Rattata("Rattata");
        ben.buyPokeball();
        ben.buyPokeball();
        ben.buyPokeball();
        ben.buyPokeball();
        ben.buyPokeball();
        ben.buyPokeball();
        ben.buyPokeball();
        martin.buyPokeball();
        martin.buyPokeball();
        martin.buyPokeball();
        martin.buyPokeball();
        martin.buyPokeball();
        martin.buyPokeball();
        ben.catch(charmander1);
        ben.catch(squirtle1);
        ben.catch(bulbasaur1);
        ben.catch(rattata1);
        ben.catch(charmander2);
        ben.catch(squirtle2);
        martin.catch(bulbasaur2);
        martin.catch(rattata2);
        martin.catch(charmander3);
        martin.catch(squirtle3);
        martin.catch(bulbasaur3);
        martin.catch(rattata3);
        const battle = new Battle(ben, martin, charmander1, squirtle3);
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        battle.fight();
        expect(consoleSpy).toHaveBeenCalledWith(
          "You're out of Pokemon! You have to flee!"
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          "Martin is out of pokemon! Ben wins!!!"
        );
      });
    });
  });
});
