
const questions = {
    Python: [
        {q: "Which keyword defines a function?",
         o: ["function", "def", "fun", "define"], a: 1},
        {q: "Which data type stores True or False?",
         o: ["int", "str", "bool", "float"], a: 2},
        {q: "Which symbol is used for comments?",
         o: ["//", "#", "/*", "--"], a: 1}
    ],

    Java: [
        {q: "Which keyword creates a class?",
         o: ["class", "define", "struct", "new"], a: 0},
        {q: "Which method starts a Java program?",
         o: ["start()", "run()", "main()", "init()"], a: 2},
        {q: "Java is a ____ language.",
         o: ["Markup", "Programming", "Query", "Style"], a: 1}
    ],

    HTML: [
        {q: "What does HTML stand for?",
         o: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Markup Language", "None"], a: 0},
        {q: "Which tag creates a paragraph?",
         o: ["<h1>", "<p>", "<div>", "<br>"], a: 1},
        {q: "Which tag inserts an image?",
         o: ["<image>", "<pic>", "<img>", "<src>"], a: 2}
    ],

    GK: [
        {q: "What is the capital of India?",
         o: ["Mumbai", "Chennai", "New Delhi", "Kolkata"], a: 2},
        {q: "Which planet is known as the Red Planet?",
         o: ["Earth", "Mars", "Jupiter", "Venus"], a: 1},
        {q: "How many days are there in a leap year?",
         o: ["365", "366", "364", "360"], a: 1}
    ]
};

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;
let answered = false;

function startQuiz() {
    const category = document.getElementById("category").value;

    currentQuestions = questions[category];
    currentIndex = 0;
    score = 0;
    timeLeft = 60;

    document.getElementById("home").classList.add("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");

    showQuestion();

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent =
            "Time: " + timeLeft + " seconds";

        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    answered = false;

    const q = currentQuestions[currentIndex];

    document.getElementById("question").textContent =
        (currentIndex + 1) + ". " + q.q;

    const options = document.getElementById("options");
    options.innerHTML = "";

    q.o.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index, btn);
        options.appendChild(btn);
    });

    document.getElementById("nextBtn").textContent =
        currentIndex === currentQuestions.length - 1
        ? "Finish Quiz" : "Next";
}

function selectAnswer(index, button) {
    if (answered) return;

    answered = true;

    const correct = currentQuestions[currentIndex].a;

    if (index === correct) {
        score++;
        button.style.background = "#90ee90";
    } else {
        button.style.background = "#ffaaaa";
        document.getElementById("options").children[correct]
            .style.background = "#90ee90";
    }

    Array.from(document.getElementById("options").children)
        .forEach(btn => btn.disabled = true);
}

function nextQuestion() {
    if (!answered) {
        alert("Please select an answer!");
        return;
    }

    currentIndex++;

    if (currentIndex < currentQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);

    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("score").textContent =
        "Your Score: " + score + "/" + currentQuestions.length;

    document.getElementById("message").textContent =
        score === currentQuestions.length
        ? "Excellent! Perfect score!"
        : "Good attempt! Keep practising.";
}

function restartQuiz() {
    clearInterval(timer);

    document.getElementById("result").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
}
