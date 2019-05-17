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
    const main = document.getElementById('main');
    const div = document.createElement('div');
    div.innerHTML =`
      <p><b>名前: </b>${this.name}</p>
      <p><b>HP: </b>${this.hp}</p>
      <p><b>MP: </b>${this.mp}</p>
    `
    main.appendChild(div);
  }

  attack(defender) {
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。 
      キャラクターが死亡している場合、ターゲットが死亡している場合は攻撃出来ません。
      また、相手に与えたダメージと相手が死んだ場合はそのことを表示します。
    */
    const main = document.getElementById('main');
    const div = document.createElement('div');
    main.appendChild(div);
    if(this.hp <= 0) {
      return div.innerHTML = `<p>${this.name} は死んでいます。攻撃できません</p>`
    } 
    if(defender.hp <= 0) {
      return div.innerHTML = `<p>${defender.name} は死んでいます。攻撃できません</p>`
    }
    const damage = this.calcAttackDamage(defender);
    if(defender.hp <= 0) {
      return div.innerHTML = `<p>${this.name} は${defender.name} に${damage}のダメージを与えた！${defender.name}は死亡した。</p>`
    } else {
      return div.innerHTML = `<p>${this.name}は ${defender.name} に${damage}のダメージを与えた！</p>`
    }
  }

  calcAttackDamage(defender) {
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
    let damage = this.offensePower - defender.defencePower;
    if (damage <= 0) {
      damage = 1;
    }
    return damage
  }
}

class Sorcerer extends Character {
  constructor(props) {
    super(props);
  }

  healSpell(target) {
    /* 
      回復魔法は3のMPを消費する。
      相手のHPを15回復する。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は回復が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
    const main = document.getElementById('main');
    const div = document.createElement('div');
    main.appendChild(div);
    if(this.hp <= 0) {//魔法使いが死んでいる場合
      return div.innerHTML = `<p>魔法使いが死んでいる！回復魔法が使えません。</p>`
    }
    if(target.hp <= 0) {//相手が死んでいる場合
      return div.innerHTML = `<p>${target.name}は死んでいます。回復できません。</p>`
    }

    if(this.mp >= 3) {// 回復魔法で消費するMPは3、もしくはそれ以上
      // HPとMPの計算公式（ここでは具体的に計算できないので、公式だけ書く）
      target.hp = target.hp + 15;
      this.mp = this.mp - 3; 
      return div.innerHTML = `<p>${this.name} は回復魔法を唱えた！${target.name}のHPが回復した！</p>`
    } else {
      return div.innerHTML = `<p>MPが不足している！</p>`
    }
  }

  fireSpell(target) {
    /* 
      攻撃魔法は2のMPを消費する。
      相手に10のダメージを与える。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
   const main = document.getElementById('main');
   const div = document.createElement('div');
   main.appendChild(div);
   if(this.hp <= 0) {
     return div.innerHTML = `<p>魔法使いが死んでいる！攻撃魔法は使えません</p>` 
   }
   if(target.hp <= 0) {
     return div.innerHTML = `<p>${target.name}はすでに死んでいる！</p>`
   }
   if(this.mp >= 2) {
     target.hp = target.hp - 10;
     this.mp = this.mp - 2;
     return div.innerHTML = `<p>${this.name}は攻撃魔法を使った！${target.name}のHPが減った！</p>`
   } else {
     return div.innerHTML = `<p>MPが不足している！</p>`
   }
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