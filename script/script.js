/* =======================================================

BUILD A SIMON GAME


  Objective: Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/obYBjE.).

   RULES
-----------------------------------------
1.  Don't look at the example project's code. Figure it out for yourself.
2.  Fulfill the below user stories: 
    - Use whichever libraries or APIs you need. Give it your own personal style.
    - Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
    - I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
    - If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
    - I can see how many steps are in the current series of button presses.
    - If I want to restart, I can hit a button to do so, and the game will return to a single step.
    - I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
    - I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.
    
    
============================================================

**Hint: Here are mp3s you can use for each button:** 

*https://s3.amazonaws.com/freecodecamp/simonSound1.mp3,*

*https://s3.amazonaws.com/freecodecamp/simonSound2.mp3,*

*https://s3.amazonaws.com/freecodecamp/simonSound3.mp3,*

*https://s3.amazonaws.com/freecodecamp/simonSound4.mp3.*

===========================================================

NOTE: You can get feedback on your project by sharing it with your friends on Facebook.


=========================================================== */

var game = {
    pers_sequence: [],      // To Hold the player input sequence
    comp_sequence: [],      // To hold the computer input sequence
    level: 1,               // Initial Level
    check: false,           // Check if level is complete
    count: 0,               // Hold player correct count
    failed: false,          // if you player sequence does not correspond
    strict_mode: false,     // If strict mode is activated
    
    initialize: function(){     // Starts the game with its default state set
        that = this;
        $("#start").click(function(){
           that.start();
            $(this).addClass("disabled");
        });
        $("#reset").click(function(){
            that.reset();
            var start_button = $("#start");
            if(start_button.hasClass("disabled") === true){
                start_button.removeClass(["diabled"]);
            }
        })
    },
    
    reset: function(){      // Resets the whole game
        this.level = 1;
        this.pers_sequence = [];
        this.comp_sequence = [];
        this.failed = false;
        document.getElementById("strict_true").checked = false;
        this.next_level();  
    },
    
    start: function(){
        this.next_level();  
    },
    
    next_level: function(){     // Moves you to next level
        var that = this;
        document.getElementById("stage").value = this.level;
        this.pers_sequence = [];
        if(this.failed === false){
            this.comp_sequence.push(this.gen_random_num());
        }
        var m = 0, times = this.comp_sequence.length;
        function play_flash(){
                setTimeout(function(){
                    that.flash("shape", 1, that.comp_sequence[m]);
                    m++;
                    if(m < times){
                        play_flash();
                    }
                }, 700)
            }
           play_flash();
        this.all_value_complete();
    },
    
    all_value_complete: function(){    // Check to see if the check property is correct
        var that = this;
        while(this.check == false){
            that.person_play();
            var interval = setInterval(function(){
            if(that.pers_sequence.length === that.comp_sequence.length){
                that.check_win();
            }
        }, 200)
            that.check = true;
        }
    },
    
    strict: function(){     // If on strict Mode, Call this function
        var strict_check = document.getElementById("strict_true").checked;
        if(strict_check === true){
            alert("You have failed on level: "+this.level);
            this.level = 1;
            this.comp_sequence = [];
            this.strict_mode = true;
            this.failed = false;
        }
    },
    
    check_win: function(){      // Check if there there is a winner in each round
        if(this.check === true){
           if(this.pers_sequence.slice(-1)[0] === this.comp_sequence.slice(-1)[0]){
                console.log("True");
                this.failed = false;
                this.level++;
                setTimeout(this.next_level(), 2000); 
           }else{
                console.log("False");
                this.failed = true;
                this.strict();
                setTimeout(this.next_level(), 2000);
//                this.end_game();
           }
        }
    },
    
    end_game: function(){       // Game Over
        alert("Game Over, You stopped at level: "+this.level);
        location.reload();
    },
    
    play_audio: function(id){       // Play Audio
        document.getElementById(id).play();
    },
    
    person_play: function(){    // Call the Person to play
        that = this;
        $("#shape1").click(function(){                       
            that.anim(1);
            that.play_audio("sound-1");
            that.sequence(that.pers_sequence, 1);
            that.turn = true;
        });$("#shape2").click(function(){                       
            that.anim(2);
            that.play_audio("sound-2");
            that.sequence(that.pers_sequence, 2);
            that.turn = true;
        });$("#shape3").click(function(){                       
            that.anim(3);
            that.play_audio("sound-3");
            that.sequence(that.pers_sequence, 3);
            that.turn = true;
        });$("#shape4").click(function(){                       
            that.anim(4);
            that.play_audio("sound-4");
            that.sequence(that.pers_sequence, 4);
            that.turn = true;
        });
    },  
    
    sequence: function(arr, value){ // Push to a Sequence
        arr.push(value);
    },
    
    anim: function(id){  // Animate, play sound and push to sequence
        $("#shape"+id).animate({ opacity: "0.5"}, "fast", function(){ $("#shape"+id).animate({opacity: "1"})});
    },
    
    gen_random_num: function(){     // Generates a random number
       var value = Math.floor(Math.random() * (4 - 1 + 1) + 1);
       return value;
    },
    
    flash: function(element, times, pad_num){       // Run animation on each player or computer sequence
        that = this;
        if(times > 0){
            that.play_audio("sound-"+pad_num);
            $("#"+element+pad_num).animate({ opacity: "0.5"}, "fast", function(){ $("#"+element+pad_num).animate({opacity: "1"})}); 
        }
        if(times > 0){
            setTimeout(function(){
                that.flash(element, times, pad_num);
            }, 1000);
            
            times -= 1;
        }
    },
}

$(document).ready(function(){
    game.initialize();
})