console.log("I am the console!");

function quizAlert() {
        alert("You're about to start the quizz!");
        quizConfirm();
}

function quizConfirm() {
    // Check if all fields are filled
    var inputs = document.querySelectorAll('.quiz input[type="text"]');
    var allFieldsFilled = true;
    inputs.forEach(function(input) {
        if (input.value.trim() === '') {
            allFieldsFilled = false;
            return;
        }
    });

    if (!allFieldsFilled) {
        alert("Please fill in all fields!");
        return;
    }

    var res = confirm("Are you sure you want to continue?");

    if (res == true) {
        alert("The quiz will start in 5 seconds!");
        var timer = 5;
        var confirmation = document.createElement("p");
        confirmation.textContent = timer + " seconds";
        confirmation.style.color = "red";
        confirmation.style.fontSize = "1.5em";
        confirmation.style.fontWeight = "bold";
        confirmation.style.textAlign = "center";

        var start = document.getElementById("information");
        start.appendChild(confirmation);
        start.disabled = true; 

        var interval = setInterval(function() {
            timer--;
            console.log(timer);
            confirmation.textContent = timer + " seconds";

            if (timer == 0) {
                clearInterval(interval);
                confirmation.textContent = "Here we go! Good luck!";
                document.getElementsByClassName("quiz")[0].style.display = "block";
                document.getElementsByTagName("button")[0].style.display = "block";
                document.getElementById("start-quiz").disabled = true; 
            }
        }, 1000);
    } else {
        alert("You will be redirected to the home page!");
        window.location.href = "home.html";
    }
}

function submitQuiz() {
    // Initialisation
    let score = 0;
    const radioAnswer1 = document.querySelector('input[name="question1"]:checked');
    const checkboxAnswers = document.querySelectorAll('input[name="question2[]"]:checked');
    const textAnswer = document.getElementById('question3').value.toLowerCase();

    // Check radio button answer for question 1
    if (radioAnswer1 && radioAnswer1.value === 'a') {
        score += 4;
    }

    // Check checkbox answers for question 2
    const correctAnswers = ['a', 'b'];
    checkboxAnswers.forEach(answer => {
        if (correctAnswers.includes(answer.value)) {
            score += 2;
        }
    });

    // Check text answer
    if (textAnswer.includes('example')) {
        score += 10;
    }

    // Get the results table and add a new row
    const resultsTable = document.getElementById('results');
    const newRow = resultsTable.insertRow();
    // Create cells for attempt number and score, and set their content
    const attemptNumberCell = newRow.insertCell(0);
    const scoreCell = newRow.insertCell(1);
    attemptNumberCell.textContent = resultsTable.rows.length - 1; 
    scoreCell.textContent = score;
}