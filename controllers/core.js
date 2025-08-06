var frame_width     = 1920; /* Standard width */
var frame_height    = 1080; /* Standard height */
var ratio           = 1;    /* Current ratio */
var idle_second     = 300;
var current_idle    = 0;
var previous_function = "";
var previous_function_id = "";
var previous_function_id_2 = "";
var next_timer;
var journey_timer;

$(function(){
    
    /* Determine screen ratio */
    calculateRatio();

    /* Transform scale for different screen resolution. */
    $('#container').css('transform', 'scale(' + ratio + ')');

    initEvents();
    
    /* Startup */
    showHomePage();
    
    init_idle_timeout();

    /* Service Worker */
    if ('serviceWorker' in navigator) {
       navigator.serviceWorker.register('service-worker.js');
    }
});

function initEvents(){
    
    /* Back Button */
    $("#page-container").on("click", ".back-button", function(event){
        window[previous_function](previous_function_id, previous_function_id_2);
    });

    /* Home Button */
    $("#page-container").on("click", ".home-button", function(event){
        showHomePage();
    });
    
    /* Volumn Button */
    $("#page-container").on("click", ".volume-button", function(event){
        var bool = $("#audio-player").prop("muted");
        $("#audio-player").prop("muted",!bool);

        /* Add cross icon to speaker icon */
        if(bool){      
            $(".volume-image").remove();
            $(".home-volume-container").append("<img class='tile-thumbnail volume-image' src='./assets/images/Home-Volume-Button.png' />")
        }else{
            $(".volume-image").remove();
            $(".home-volume-container").append("<img class='tile-thumbnail volume-image' src='./assets/images/Home-Volume-Button-Mute.png' />")
        }
    });

    $("body").one("click", function(event){
        playMusic("Procession.mp3");
    });
    
    /* On resize. Never use window as selector, this will trigger all binded resizable. */
    $(window).on('resize', function(event){
        calculateRatio();
        /* $('#container').css('transform', 'scale(' + ratio + ')'); */
    });
}

function init_idle_timeout(){
    
    if(idle_second != 0){
        setInterval(function(){ 
            current_idle++;
            if(current_idle > idle_second){
                current_idle = 0;
                showHomePage();
            }
        }, 1000);
        
        $('body').click(function(){
            current_idle = 0;
        });    
    }
}

function calculateRatio(){
    var container_width = $("#container").width();
    ratio = container_width / frame_width;
}

function changeBackground(src){
    $(".page-background").remove();
    $("#scale-container").append('<img class="page-background no-pointer" src="' + src + '"/>');
}

function playMusic(song){
    $("#audio-player").attr("src", "./assets/audio/" + song);
    $("#audio-player")[0].pause();
    $("#audio-player")[0].load();
    $("#audio-player")[0].oncanplaythrough = $("#audio-player")[0].play();
}

function clearPage(){
    $("#page-container").empty();
    calculateRatio();
}

function addButton(button_types){
    
    var r = new Array(), j = -1;
    $.each(button_types, function(i, val){
        switch(val){
            case "home-volume": 
                r[++j] = "<div class='home-volume-container'>"
                r[++j] =    "<div class='home-volume-inner'>";
                r[++j] =        "<div class='home-button'></div>";
                r[++j] =        "<div class='volume-button'></div>";
                r[++j] =    "</div>";
                r[++j] =    "<img class='tile-thumbnail volume-image' src='./assets/images/Home-Volume-Button" + ($("#audio-player").prop("muted")? "-Mute" : "") + ".png' />";
                r[++j] = "</div>";
                break;
            case "back": 
                r[++j] = "<div class='back-button'>";
                r[++j] =    "<img class='tile-thumbnail' src='./assets/images/Back-Button.png' />";
                r[++j] = "</div>";
                break;
        }
    });
    var obj = $(r.join(""));
    $("#page-container").append(obj);
}

function showHomePage(){   

    clearPage();
    changeBackground('./assets/images/Homepage-Background.png');
    
    var r = new Array(), j = -1;
    r[++j] = "<div class='home-know-value-button'></div>";
    r[++j] = "<div class='home-journey-button'></div>";

    var obj = $(r.join(""));

    $("#page-container").append(obj);

    $(".home-know-value-button").click(function(event){
        showSchoolValueHome();
    });

    $(".home-journey-button").click(function(event){
        showJourneyHome();
    });
}

function showSchoolValueHome(){

    clearPage();
    changeBackground('./assets/images/Know-Your-School-Values-Home.png');
    
    previous_function = "showHomePage";
    addButton(["home-volume", "back"]);

    var r = new Array(), j = -1;
    r[++j] = "<div class='school-value-mean-play-button'></div>";
    r[++j] = "<div class='school-value-live-play-button'></div>";

    var obj = $(r.join(""));

    $("#page-container").append(obj);

    $(".school-value-mean-play-button").click(function(event){
        showSchoolValueMean();
    });

    $(".school-value-live-play-button").click(function(event){
        showSchoolValueLive();
    });
}

function showSchoolValueMean(){
    
    clearPage();
    changeBackground('./assets/images/School-Value-Mean-Instruction-Background.png');
    
    previous_function = "showSchoolValueHome";
    addButton(["home-volume", "back"]);

    $("#page-container").append("<div class='school-value-mean-start-button'></div>");

    $(".school-value-mean-start-button").click(function(event){
        showSchoolValueGame();
    });
}

function showSchoolValueGame(){
    clearPage();
    changeBackground('./assets/images/School-Value-Mean-Game-Background.png');
    
    previous_function = "showSchoolValueMean";
    addButton(["home-volume", "back"]);

    var r = new Array(), j = -1;

    r[++j] = "<div class='leaf-container' data-semaphore='1'>";
    for(var i = 1; i <= 12; i++){
        r[++j] = "<div class='leaf-inner-container' data-answered='0' data-opened='0' data-match='" + values[i].match + "'>";
        r[++j] =    "<div class='leaf'><img src='./assets/images/Leaf.png' class='tile-thumbnail'/></div>";
        r[++j] =    "<div class='leaf-back'><img src='./assets/images/Leaf-Back.png' class='tile-thumbnail'/></div>";
        r[++j] =    "<div class='leaf-answer'><img src='./assets/images/Leaf-" + i + ".png' class='tile-thumbnail'/></div>";
        r[++j] = "</div>";
    }
    r[++j] = "</div>";
    r[++j] = "<div class='game-one-perfect-match'><div class='game-one-perfect-match-home-button'></div><img src='./assets/images/Perfect-Match.png' class='tile-thumbnail'/></div>";

    var obj = $(r.join(""));

    $("#page-container").append(obj);

    $(".leaf-inner-container").click(function(event){
        
        if($(".leaf-container").data("semaphore") == 1){
            
            $(".leaf-container").data("semaphore", 0);
            var answered = $(this).data("answered");
            var opened = $(this).data("opened");
            var match = $(this).data("match");
            
            if(answered == 0 && opened == 0){
                
                var existing_open = $(".leaf-inner-container[data-answered='0'][data-opened='1']").not(this);

                if(existing_open.length > 0){
                    /* One already opened. Check answer and response. */
                    var existing_match = existing_open.data("match");
                    
                    if(match == existing_match){
                        /* Correct. Set answer status for both. */
                        existing_open.attr("data-answered", 1);
                        existing_open.addClass("correct-animate");
                        $(this).attr("data-opened", 1);
                        $(this).addClass("rotateY180");
                        $(this).attr("data-answered", 1);
                        $(this).addClass("correct-animate");
                        setTimeout(function(){$(".leaf-container").data("semaphore", 1);}, 400);

                        /* Complete */
                        if($(".leaf-inner-container[data-answered='1'][data-opened='1']").length == $(".leaf-inner-container").length){
                            setTimeout(function(){
                                $(".game-one-perfect-match").css("opacity", 1).css("transform","scale(1)");
                            }, 1500);
                        }

                    }else{
                        /* Incorrect. Close previous one. */
                        existing_open.removeClass("rotateY180");
                        existing_open.attr("data-opened", 0);
                        /* Open current one */
                        $(this).attr("data-opened", 1);
                        $(this).addClass("rotateY180");
                        setTimeout(function(){$(".leaf-container").data("semaphore", 1);}, 400);
                    }

                }else{
                    /* First time open. Set open status and rotate. */
                    $(".leaf-container").data("semaphore", 0);
                    $(this).attr("data-opened", 1);
                    $(this).addClass("rotateY180");
                    setTimeout(function(){$(".leaf-container").data("semaphore", 1);}, 400);
                }
            }else{
                $(".leaf-container").data("semaphore", 1);
            }
        }
    });

    $(".game-one-perfect-match-home-button").click(function(event){
        showHomePage();
    });
}

function showSchoolValueLive(){

    clearPage();
    changeBackground('./assets/images/School-Value-Live-Instruction-Background.png');
    
    previous_function = "showSchoolValueHome";
    addButton(["home-volume", "back"]);

    $("#page-container").append("<div class='school-value-mean-start-button'></div>");

    $(".school-value-mean-start-button").click(function(event){
        showSchoolValueLiveGame(0);
    });
}

function showSchoolValueLiveGame(stage_index){
    
    if(stage_index < Object.keys(live_value_game).length){

        clearPage();
        changeBackground('./assets/images/Live-Game-' + stage_index + '.png');

        previous_function = "showSchoolValueLive";
        addButton(["home-volume", "back"]);

        var answer_index = live_value_game[stage_index].correct_answer_index;

        var r = new Array(), j = -1;
        r[++j] = "<div class='school-value-choice-container'>";

        for(var i = 0; i < live_value_game[stage_index].choices.length; i++){
            r[++j] = "<div class='school-value-choice-inner-container' data-index='" + i + "'>";
            r[++j] =    live_value_game[stage_index].choices[i];
            r[++j] = "</div>";
        }

        r[++j] = "</div>";
        r[++j] = "<div class='school-value-correct-popup'><img class='tile-thumbnail' src='./assets/images/Live-Correct-Answer.png'/><div class='next-button'></div></div>";
        r[++j] = "<div class='school-value-incorrect-popup'><img class='tile-thumbnail' src='./assets/images/Live-Incorrect-Answer.png'/><div class='try-again-button'></div></div>";

        var obj = $(r.join(""));

        $("#page-container").append(obj);

        $(".next-button").click(function(event){
            $(".school-value-correct-popup").removeClass("school-value-show-popup");
            setTimeout(() => {
                showSchoolValueLiveGame(++stage_index);    
            }, 700);
        });

        $(".try-again-button").click(function(event){
            $(".school-value-choice-inner-container").css("pointer-events", "all");
            $(".school-value-incorrect-popup").removeClass("school-value-show-popup");
            $(".school-value-choice-inner-container").css("color", "white");
        });
        
        $(".school-value-choice-inner-container").click(function(event){

            /* Prevent clicking when showing popup. */
            $(".school-value-choice-inner-container").css("pointer-events", "none");
            
            if($(this).data("index") == answer_index){
                /* Correct */
                $(".school-value-correct-popup").addClass("school-value-show-popup");
                $(this).css("color", "#02F100");
            }else{
                /* Incorrect */
                $(".school-value-incorrect-popup").addClass("school-value-show-popup");
                $(this).css("color", "#FF2A00");
            }
        });
    
    }else{
        /* End game */
        showSchoolValueEndGame();
    }
}

function showSchoolValueEndGame(){

    clearPage();
    changeBackground('./assets/images/Game-1-Ending.png');

    previous_function = "showSchoolValueLive";
    addButton(["home-volume", "back"]);

    var r = new Array(), j = -1;
    
    r[++j] = "<div class='game-one-ending-banner'><img class='tile-thumbnail' src='./assets/images/Game-1-Ending-Congratulation.png'/></div>";
    r[++j] = "<div class='game-one-ending-home-button'><img class='tile-thumbnail' src='./assets/images/Game-1-Ending-Home-Button.png'/></div>";

    var obj = $(r.join(""));

    $("#page-container").append(obj);
    
    $(".game-one-ending-home-button").click(function(event){
        showHomePage();
    });
}

function showJourneyHome(){
    
    clearPage();
    changeBackground('./assets/images/Journey-Intro.png');

    previous_function = "showHomePage";
    addButton(["home-volume", "back"]);

    $("#page-container").append("<div class='journey-home-play-button'></div>");

    $(".journey-home-play-button").click(function(event){
        showJourneySelectFriend();
    });
}

function showJourneySelectFriend(){

    clearPage();
    changeBackground('./assets/images/Journey-Select-Character.png');

    previous_function = "showJourneyHome";
    addButton(["home-volume", "back"]);

    var r = new Array(), j = -1;
    r[++j] = "<div class='green-boy character-select' data-colour='green'><img class='tile-thumbnail' src='./assets/images/Green-Boy.png'/></div>";
    r[++j] = "<div class='red-girl character-select' data-colour='red'><img class='tile-thumbnail' src='./assets/images/Red-Girl.png'/></div>";
    r[++j] = "<div class='yellow-girl character-select' data-colour='yellow'><img class='tile-thumbnail' src='./assets/images/Yellow-Girl.png'/></div>";
    r[++j] = "<div class='blue-boy character-select' data-colour='blue'><img class='tile-thumbnail' src='./assets/images/Blue-Boy.png'/></div>";
    r[++j] = "<div class='character-select-play-button'></div>";

    $("#page-container").append(r.join(""));

    $(".character-select").click(function(event){
        $(".character-select").removeClass("grayscale-image selected-character");
        $(".character-select").not(this).addClass("grayscale-image");
        $(this).addClass("selected-character");
    });

    $(".character-select-play-button").click(function(event){
        if($(".selected-character").length > 0){
            /* Selected */
            showJourneyStartLevel(1, $(".selected-character").data("colour"));
        }else{
            /* Not selected. Animate expand all. */
            $(".character-select").addClass("animate-character");
            setTimeout(function() {
                $(".character-select").removeClass("animate-character");
            }, 800);
        }
    });
}   

function showJourneyStartLevel(current_level, colour){

    clearTimeout(next_timer);
    clearInterval(journey_timer);

    if(current_level <= Object.keys(journey_question).length){

        clearPage();
        changeBackground('./assets/images/Journey-Stage-Home-' + current_level + '.png');

        previous_function = "showJourneySelectFriend";
        addButton(["home-volume", "back"]);

        $("#page-container").append("<div class='journey-level-play-button'></div>");

        $(".journey-level-play-button").click(function(event){
            showJourneyQuestionPage(current_level, colour);
        });

    }else{
        showJourneyEndGame(colour);
    }
}

function showJourneyQuestionPage(current_level, colour){

    clearPage();
    changeBackground('./assets/images/Journey-Question-Frame-' + current_level + '.png');

    previous_function = "showJourneyStartLevel";
    previous_function_id = current_level;
    previous_function_id_2 = colour;
    addButton(["home-volume", "back"]);

    var r = new Array(), j = -1;

    r[++j] = "<div class='stage-" + current_level + "-bar colour-bar " + colour + "-bar'></div>";
    r[++j] = "<div class='stage-" + current_level + "-score score-box'>0%</div>";
    r[++j] = "<div class='stage-" + current_level + "-question-container question-box'></div>";
    r[++j] = "<div class='journey-correct-label journey-label'><img class='tile-thumbnail' src='./assets/images/Journey-Correct.png'/></div>";
    r[++j] = "<div class='journey-incorrect-label journey-label'><img class='tile-thumbnail' src='./assets/images/Journey-Incorrect.png'/></div>";
    r[++j] = "<div class='journey-timer'><div class='journey-timer-text'>1s</div><img class='tile-thumbnail' src='./assets/images/Next-Stage-Timer.png'/></div>";

    if(current_level == 1){
        /* Shield for level one only */
        r[++j] = "<div class='stage-1-shield'><img class='tile-thumbnail' src='./assets/images/Journey-Level-1-Avatar.png'/></div>";
    }

    $("#page-container").append(r.join(""));

    showNextQuestion(current_level, colour, 0, 0);
}

function showNextQuestion(current_level, colour, current_question_index, current_correct_count){

    if(current_question_index < journey_question[current_level].length){

        /* Clear existing */
        $(".question-box").empty();
        $(".journey-label").removeClass("journey-label-exit-timing").css("opacity", 1);
        $(".journey-timer").removeClass("journey-timer-exit");
        $(".journey-timer-text").text("1s");

        var r = new Array(), j = -1;

        /* Show question and answers */
        r[++j] = "<div class='" + colour + "-text question-line'>" + (current_question_index+1) + ". " + journey_question[current_level][current_question_index].question + "</div>";
        r[++j] = "<div class='journey-underline'><img class='tile-thumbnail' src='./assets/images/Journey-Line.png'/></div>";
        
        var characters = ["A","B","C","D"];

        for(var i = 0; i < journey_question[current_level][current_question_index].choices.length; i++){
            r[++j] = "<div class='journey-answer-line' data-index='" + i +"'>" + characters[i] + ") " + journey_question[current_level][current_question_index].choices[i] + "</div>";
        }

        $(".question-box").append(r.join(""));

        if($(".question-line").outerHeight() > 150){
            $(".question-line").css("margin-top", "-35px");
        }

        $(".question-box").animate({ opacity: 1 }, 400);

        $(".journey-answer-line").click(function(event){

            $(".journey-answer-line").off();

            var correct_answer_index = journey_question[current_level][current_question_index].correct_answer_index;
            var is_correct = false;

            if(correct_answer_index == $(this).data("index")){

                /* Correct */
                $(this).css("color","#2CFF00");
                is_correct = true;

                /* Show correct label */
                $(".journey-correct-label").css("top", "870px");

                /* Animate score and score bar */ 
                current_correct_count++;

                var increment_count = (current_correct_count == journey_question[current_level].length && current_level == 1)? 2 : 1;
                
                var bar_height = [498.73, 540, 538];

                $(".colour-bar").animate({
                    top: "-=" + (increment_count / journey_question[current_level].length * bar_height[current_level - 1]),
                    height: "+=" + (increment_count / journey_question[current_level].length * bar_height[current_level - 1])
                }, 800);

                $({ Counter: (current_correct_count - 1)}).animate({ Counter: current_correct_count },{
                    duration: 800,
                    easing: 'swing',
                    step: function(){
                        $(".score-box").text((this.Counter / journey_question[current_level].length * 100).toFixed(1) + "%");
                    }
                });
                
            }else{

                /* Incorrect */
                $(this).css("color","#FF0000");

                /* Show incorrect label */
                $(".journey-incorrect-label").css("top", "870px");
            }

            var d1 = $.Deferred();

            /* Timer to next question. Appear after 1 second. */
            next_timer = setTimeout(function(){
                $(".journey-timer").css("opacity",1);    
                var time = 0;
                journey_timer = setInterval(function(){
                    $(".journey-timer-text").text(time + "s");
                    time--;
                    if(time < 0){
                        clearInterval(journey_timer);
                        d1.resolve();
                    }
                }, 1000);
            }, 1000 * (is_correct? 1.8 : 1.8));

            $.when(d1).done(function(v1){
                /* Slide down answer label */
                $(".journey-label").addClass("journey-label-exit-timing").css("top", "1080px").css("opacity", 0);
                $(".journey-timer").addClass("journey-timer-exit").css("opacity", 0);

                /* Fade out question */
                next_timer = setTimeout(function(){
                    $(".question-box").animate({ opacity: 0 }, 400);
                }, 600);

                next_timer = setTimeout(function(){
                    showNextQuestion(current_level, colour, ++current_question_index, current_correct_count);
                }, 1000);
            });   
        });

    }else{
        /* No more question */
        showLevelEndGame(current_level, colour, current_correct_count);
    }
}

function showLevelEndGame(current_level, colour, current_correct_count){

    clearPage();
    
    previous_function = "showJourneyStartLevel";
    previous_function_id = current_level;
    previous_function_id_2 = colour;
    addButton(["home-volume", "back"]);

    if(current_correct_count >= journey_question[current_level].length){
        /* Success */
        changeBackground('./assets/images/Journey-Level-' + current_level + '-Success.png');

        var r = new Array(), j = -1;
        r[++j] = "<div class='journey-go-next-level-button'></div>";
        r[++j] = "<div class='journey-level-success-" + current_level + "-" + colour + "'>";
        r[++j] =    "<img class='tile-thumbnail' src='./assets/images/Journey-Character-Success-Level-" + current_level + "-" + colour + ".png' />";
        r[++j] = "</div>";
        
        $("#page-container").append(r.join(""));

        $(".journey-go-next-level-button").click(function(event){
            showJourneyStartLevel(++current_level, colour);
        });

    }else{
        /* Fail */
        changeBackground('./assets/images/Journey-Level-' + current_level + '-Fail.png');

        var r = new Array(), j = -1;
        r[++j] = "<div class='journey-try-again-button'></div>";
        r[++j] = "<div class='journey-level-fail-" + current_level + "-" + colour + "'>";
        r[++j] =    "<img class='tile-thumbnail' src='./assets/images/Journey-Character-Fail-Level-" + current_level + "-" + colour + ".png' />";
        r[++j] = "</div>";
        
        $("#page-container").append(r.join(""));

        $(".journey-try-again-button").click(function(event){
            showJourneyStartLevel(current_level, colour);
        });
    }
}

function showJourneyEndGame(colour){
    
    clearPage();
    
    addButton(["home-volume"]);

    changeBackground('./assets/images/Journey-End-Game-' + colour + '.png');

    var r = new Array(), j = -1;
    r[++j] = "<div class='journey-congratulation-banner'><img class='tile-thumbnail' src='./assets/images/Journey-Ending-Banner-" + colour + ".png' /></div>";
    r[++j] = "<div class='journey-play-again-button'><img class='tile-thumbnail' src='./assets/images/Journey-Play-Again.png' /></div>";

    $("#page-container").append(r.join(""));

    $(".journey-play-again-button").click(function(event){
        showJourneyHome();
    });
}