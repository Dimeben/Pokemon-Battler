class Pokemon {
  constructor(name, hitPoints = 100, attackDamage = 20) {
    this.name = name;
    this.hitPoints = hitPoints;
    this.attackDamage = attackDamage;
    this.move = "tackle";
  }
  takeDamage(damage = 20) {
    this.hitPoints -= damage;
  }
  useMove(trainer) {
    console.log(`${trainer}'s ${this.name} used ${this.move}.`);
    return this.attackDamage;
  }
  hasFainted() {
    return this.hitPoints <= 0;
  }
  isEffectiveAgainst(opponentPokemon) {
    return this.strongAgainst === opponentPokemon.type;
  }
  isWeakTo(opponentPokemon) {
    return this.weakAgainst === opponentPokemon.type;
  }
}

class FireType extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.type = "fire";
    this.strongAgainst = "grass";
    this.weakAgainst = "water";
  }
}

class WaterType extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.type = "water";
    this.strongAgainst = "fire";
    this.weakAgainst = "grass";
  }
}

class GrassType extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.type = "grass";
    this.strongAgainst = "water";
    this.weakAgainst = "fire";
  }
}

class NormalType extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.type = "normal";
  }
}

class Charmander extends FireType {
  constructor(name) {
    super(name);
    this.move = "ember";
    this.hitPoints = 44;
    this.attackDamage = 17;
  }
}

class Squirtle extends WaterType {
  constructor(name) {
    super(name);
    this.move = "water gun";
    this.hitPoints = 44;
    this.attackDamage = 16;
  }
}

class Bulbasaur extends GrassType {
  constructor(name) {
    super(name);
    this.move = "vine whip";
    this.hitPoints = 45;
    this.attackDamage = 16;
  }
}

class Rattata extends NormalType {
  constructor(name) {
    super(name);
    this.hitPoints = 30;
    this.attackDamage = 10;
  }
}

module.exports = {
  Pokemon,
  FireType,
  WaterType,
  GrassType,
  NormalType,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
};
