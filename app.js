const help_button = document.getElementsByClassName("help")[0]
const new_game_button = document.getElementsByClassName("new-game")[0]
const roll_dice_button = document.getElementsByClassName("roll-dice")[0]
const hold_points_button = document.getElementsByClassName("hold")[0]
const total_score_player_0 = document.querySelector(".total-score-box-0 h2.current_score-0-num")
const total_score_player_1 = document.querySelector(".total-score-box-1 h2.current_score-1-num")
const current_score_player_0 = document.querySelector(".score-box-0 h3")
const current_score_player_1 = document.querySelector(".score-box-1 h3")
const player_0 = document.querySelector(".player-0")
const player_1 = document.querySelector(".player-1")
const dice = document.querySelector(".dice")
const container = document.querySelector(".container")
const bodyItself = document.getElementsByTagName("body")[0]

const player_1_label = player_0.querySelector("h2")
const player_2_label = player_1.querySelector("h2")

let current_score = 0
let total_score = 0 
let current_player = random_player_turn()

// we wait for 3 seconds before we start
setTimeout(togglePlayer,3000) 
 
function rollDice(){
    return Math.floor(Math.random()*6) + 1
}
function random_player_turn(){
    return Math.floor(Math.random()*2)
}
function check_if_player_has_won(curr_player){
    if(total_score >= 100){
        return `player ${curr_player + 1} has won`
    }
}
function togglePlayer(){
    if(current_player == 1){
        player_1.classList.toggle("active-player")
        player_0.classList.remove("active-player")
        
    }
    else {
        player_0.classList.toggle("active-player")
        player_1.classList.remove("active-player")
    } 
}
function switchPlayer(){
    current_player = current_player ^ 1
    togglePlayer()

    // we also need to indicate which player's turn it is so the use can see whose turn it is
    // maybe we can darken certain elements, add an active element
}
function updateDice(dice_val){
    dice.setAttribute('src',`images/dice-${dice_val}.png`)
}
roll_dice_button.addEventListener('click',function(){
    const dice_value = rollDice()
    // we update the ui to the dice value using the pictures dynamically to represent what we have just done

    // we show the dice after we roll it
    dice.classList.add("show")

    updateDice(dice_value)

    if(dice_value !=1){
        current_score += dice_value
    }
    else {
        current_score = 0
        if(current_player == 1){
            current_score_player_1.innerText = current_score
        }
        else {
            current_score_player_0.innerText = current_score
        }    
        switchPlayer()
    }
    // we also update the ui of the current score of the current player 
    if(current_player == 1){
        current_score_player_1.innerText = current_score
    }
    else {
        current_score_player_0.innerText = current_score
    }

})

hold_points_button.addEventListener('click',function(){
    // we go and take the total_score from the current_player's innerText
    if(current_player == 1){
        total_score = parseInt(total_score_player_1.innerText)
    }
    else{
        total_score = parseInt(total_score_player_0.innerText)
    }
    total_score += current_score
    // we reset the current_score
    current_score = 0
    //update the ui for total_score and the current score 
    if(current_player == 1){
        total_score_player_1.innerText = total_score
        current_score_player_1.innerText = 0
    }
    else {
        total_score_player_0.innerText = total_score
        current_score_player_0.innerText = 0
    }
    //check if this player has won.
    const winning_message = check_if_player_has_won(current_player)

    //we quit the game then by disabling all the buttons except the help and new game buttons
    if(winning_message){
        // this player has won we quit the game and return from the function
        roll_dice_button.disabled = true
        hold_points_button.disabled = true
        console.log(winning_message)

        const winning_message_div = document.createElement('div')
        winning_message_div.innerHTML =  `<h2>${winning_message}</h2><br>`
        winning_message_div.classList.add("winner-div")

        container.prepend(winning_message_div)

        // we add the kingly emoji to the player label of the player who won
        current_player == 0 ? player_1_label.innerHTML += `<span>👑</span>` : player_2_label.innerHTML +=  `<span>👑</span>`

        // since someone has won, we remove the show class from dice to hide the dice 
        dice.classList.remove("show")

        // we also deactivate the active classes from player_1 and player_0 
        player_0.classList.remove("active-player")
        player_1.classList.remove("active-player")

    } 

    //else we continue 
    // then we switch player 
    else {
        
        switchPlayer()
    }
})