new Vue({
  el: '#app',
  data: {
    playerHp: 100,
    monsterHp: 100,
    newGame: true,
    isStartNewGameVisible: true,
    isCommandBarVisible: false,
    actionLog: []
  },
  methods: {
    startNewGame: function () {
      this.newGame = true
      // reset HPs to 100
      this.playerHp = 100
      this.monsterHp = 100
      // show command bar
      this.isStartNewGameVisible = false
      this.isCommandBarVisible = true
      // clear log
      this.actionLog = []
      this.newGame = false
      this.actionLog.push('Ooooooh yeah. Let the game begin.')
    },
    giveUp: function () {
      this.isStartNewGameVisible = true
      this.isCommandBarVisible = false
    },
    attack: function () {
      // do random damage between 1-10 to monster
      this.monsterHp -= this.randomNumber(1,10)
      // do random damage between 1-10 to player
      this.playerHp -= this.randomNumber(1,10)
    },
    specialAttack: function () {
      // do random damage between 5-20 to monster
      this.monsterHp -= this.randomNumber(5,20)
      // do random damage between 5-20 to player
      this.playerHp -= this.randomNumber(5,20)
    },
    heal: function () {
      // do random heal from 1-15 to player
      this.playerHp += this.randomNumber(1,25)
      // do random damage from 1-10 to player
      this.playerHp -= this.randomNumber(1,10)
    },
    randomNumber: function (min, max) {
      return Math.floor(Math.random()*(max-min+1)+min)
    },
    getHpColor: function (hp) {
      if (hp > 75) {
        return 'green';
      } else if (hp > 33) { 
        return 'yellow'
      } else {
        return 'red'
      }
    }
  },
  computed: {
    playerHpStyle: function () {
      return {
        'background-color': this.getHpColor(this.playerHp),
        'color': this.getHpColor(this.playerHp) == 'yellow' ? 'black' : 'white',
        'width': this.playerHp + '%'
      }
    },
    monsterHpStyle: function () {
      return {
        'background-color': this.getHpColor(this.monsterHp),
        'color': this.getHpColor(this.monsterHp) == 'yellow' ? 'black' : 'white',
        'width': this.monsterHp + '%'
      }
    }
  },
  watch: {
    playerHp: function (newValue, oldValue) {
      if (newValue > oldValue) {
        this.actionLog.unshift("Player has been healed for " + (newValue - oldValue) + ' hp.')
      } else {
        this.actionLog.unshift("Player has lost " + (newValue - oldValue)*-1 + ' hp.')
      }

      if (newValue <= 0) {
        alert("Player has lost!")
      } else if (newValue > 100) {
        this.playerHp = 100
      }
    },
    monsterHp: function (newValue, oldValue) {
      if (newValue > oldValue) {
        this.actionLog.unshift("Monster has been healed for " + (newValue - oldValue) + ' hp.')
      } else {
        this.actionLog.unshift("Monster has lost " + (newValue - oldValue)*-1 + ' hp.')
      }

      if (newValue <= 0) {
        alert("Player has won!")
        this.isCommandBarVisible   = false
        this.isStartNewGameVisible = true
      }
    }
  }
});
