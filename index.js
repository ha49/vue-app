Vue.component('game-box', {
    props: {
        name: String,
        value: Number,
        isSelected: Boolean
    },
    template: '\
        <button :class="`dice_${this.value} `" v-on:click="$emit(\'select\')"></button>'
});

Vue.component('points', {
    props: {
        name: String,
        points: Number,
        claimed: Boolean
    },
    template: '\
            <tr>\
            <td width="20%"><button class="`claim_button`  " v-on:click="$emit(\'claim\')" v-if="this.claimed == false">{{name}}</button></td><td width="60%">Points: {{points}}</td><td width="20%"></td>\
            </tr>\
            '
});

var vm = new Vue({
        el: '#app',
        data: {
            counter:0,
            scoreCounter:0,
            totalScore:0,

            dices: [
                {id: 1, value: 0, name: 'one', isSelected: false},
                {id: 2, value: 0, name: 'two', isSelected: false},
                {id: 3, value: 0, name: 'three', isSelected: false},
                {id: 4, value: 0, name: 'four', isSelected: false},
                {id: 5, value: 0, name: 'five', isSelected: false}
            ],
            scores: [
                {id: 1, value: 0, isSelected:false, text: "ONES"},
                {id: 2, value: 0, isSelected:false, text: "TWOS"},
                {id: 3, value: 0, isSelected:false, text: "THREES"},
                {id: 4, value: 0, isSelected:false, text: "FOURS"},
                {id: 5, value: 0, isSelected:false, text: "FIVES"},
                {id: 6, value: 0, isSelected:false, text: "SIXES"}
            ],
            rerolls: 0,

        },
        methods: {
            rollDice: function () {
                if (this.rerolls < 3)


                    this.counter++;
                var dice_result = this.dices;
                var score_result = this.scores;

                //roll unselected dices
                for (var i = 0; i < 5; i++) {
                    if (dice_result[i].isSelected === false) {
                        dice_result[i].value = Math.floor(Math.random() * 6 + 1);
                    }

                }


                this.rerolls++;




                this.dices = dice_result;

                //initial score values
                for (var i = 0; i < 6; i++) {
                    if (score_result[i].isSelected === false)
                        score_result[i].value = 0;
                }

                //calculate scores
                for (var i = 0; i < 5; i++) {
                    switch (this.dices[i].value) {
                        case 1:
                            if (score_result[0].isSelected === false)
                                score_result[0].value += 1;
                            break;
                        case 2:
                            if (score_result[1].isSelected === false)
                                score_result[1].value += 2;
                            break;
                        case 3:
                            if (score_result[2].isSelected === false)
                                score_result[2].value += 3;
                            break;
                        case 4:
                            if (score_result[3].isSelected === false)
                                score_result[3].value += 4;
                            break;
                        case 5:
                            if (score_result[4].isSelected === false)
                                score_result[4].value += 5;
                            break;
                        case 6:
                            if (score_result[5].isSelected === false)
                                score_result[5].value += 6;
                            break;
                    }
                }

                this.scores = score_result;

                return this;

            },
            newgame: function() {
                location.reload();
            },

            newGame: function () {
                this.counter = 0;
                this.scoreCounter = 0;
                this.rerolls=0;

                for (var i = 0; i < 6; i++) {
                    this.scores[i].isSelected = false;
                    this.scores[i].value = 0;
                }
                location.reload()
                return this;
            },



            selectScore: function (scoreId) {
                if (this.scores[scoreId - 1].isSelected)
                {
                    alert("Select a new score!");
                    return this;
                }

                this.rerolls = 0;
                //initial dice values
                for (var i = 0; i < 5; i++) {
                    this.dices[i].isSelected = false;
                }

                this.totalScore+= this.scores[scoreId-1].value;

                this.scores[scoreId - 1].isSelected = true;

                this.scoreCounter++;

                if (this.scoreCounter === 6)
                {
                    alert("Game over! Your Total Score is " + this.totalScore);
                }


                return this;
            },

            holdOrReleaseDices: function (diceId) {

                if (this.dices[diceId - 1].isSelected)
                    this.dices[diceId - 1].isSelected = false;
                else
                    this.dices[diceId - 1].isSelected = true;

                return this;
            },



        }
    })
;