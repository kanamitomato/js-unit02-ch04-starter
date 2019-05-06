class Character {
  constructor(props) {
    this.name = props.name
    this.hp = props.hp
    this.initialHP = props.initialHP
    this.mp = props.mp
    this.initialMP = props.initialMP
    this.offensePower = props.offensePower
    this.defencePower = props.defencePower
  }

  showStatus() {
    /* 
      キャラクターの名前、HP、MPを表示する。
    */
    const characterStatus = document.getElementById('main');
    return characterStatus.innerHTML =`
      <p><b>名前: </b>${this.name}</p>
      <p><b>HP: </b>${this.hp}</p>
      <p><b>MP: </b>${this.mp}</p>
    `
  }

  attack(defender) {
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。 
      キャラクターが死亡している場合、ターゲットが死亡している場合は攻撃出来ません。
      また、相手に与えたダメージと相手が死んだ場合はそのことを表示します。
    */
    const attackStatus = document.getElementById('main');
    if(this.hp <= 0) {
      return attackStatus.innerHTML = `<p>${this.name}は死んでいます。攻撃できません</p>`
    } 
    if(defender.hp <= 0) {
      return attackStatus.innerHTML = `<p>${defender.name}は死んでいます。攻撃できません</p>`
    }
    const damage = calcAttackDamage();
    return attackStatus.innerHTML = `<p>${this.name}は${defender.name}に${damage}のダメージを与えた！${defender.name}は死亡した。</p>`
  }

  calcAttackDamage(defender) {
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
    // const damage = defender.offensePower - this.defencePower;
    // if (damage >= 0) {
    //   return this.hp += 1;
    // }
  }
}

class Sorcerer extends Character {
  constructor() {
    
  }

  healSpell(target) {
    /* 
      回復魔法は3のMPを消費する。
      相手のHPを15回復する。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は回復が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
  }

  fireSpell(target) {
    /* 
      攻撃魔法は2のMPを消費する。
      相手に10のダメージを与える。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
  }
}

{
  const fighter = new Character({
    name: '武道家',
    hp: 40,
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  const sorcerer = new Sorcerer({
    name: '魔法使い',
    hp: 25,
    mp: 10,
    offensePower: 8,
    defencePower: 10
  })
  const monster = new Character({
    name: 'モンスター',
    hp: 60,
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  sorcerer.attack(monster);
  monster.attack(sorcerer);
  fighter.attack(monster);
  sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  sorcerer.showStatus();
  monster.showStatus();
}