const quizData = [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: "Paris"
      },
      {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
      },
      {
        question: "What does CSS stand for?",
        options: [
          "Central Style Sheets",
          "Cascading Style Sheets",
          "Computer Style Sheets",
          "Creative Style System"
        ],
        answer: "Cascading Style Sheets"
      },
      {
        question: "Which HTML tag is used to link JavaScript?",
        options: ["<js>", "<javascript>", "<script>", "<link>"],
        answer: "<script>"
      },{
      question: "Which CSS property controls the text size?",
      options: ["font-style", "text-size", "font-size", "text-style"],
      answer: "font-size"
    },
    {
      question: "Inside which HTML element do we put the CSS?",
      options: ["<style>", "<css>", "<script>", "<design>"],
      answer: "<style>"
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["<!-- -->", "//", "/* */", "**"],
      answer: "//"
    },
    {
      question: "What is the correct syntax for referring to an external script?",
      options: [
        "<script src='app.js'>",
        "<script href='app.js'>",
        "<js src='app.js'>",
        "<link src='app.js'>"
      ],
      answer: "<script src='app.js'>"
    },
    {
      question: "Which of the following is used to create a function in JavaScript?",
      options: ["function myFunc()", "def myFunc()", "void myFunc()", "create myFunc()"],
      answer: "function myFunc()"
    }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const resultEl = document.getElementById("result");
    const nextBtn = document.getElementById("nextBtn");

    function loadQuestion() {
      answered = false;
      const q = quizData[currentQuestion];
      questionEl.textContent = `Q${currentQuestion + 1}: ${q.question}`;
      optionsEl.innerHTML = "";
      resultEl.textContent = "";
      nextBtn.style.display = "none";

      q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        optionsEl.appendChild(btn);
      });
    }

    function checkAnswer(selected) {
      if (answered) return;
      answered = true;

      const correctAnswer = quizData[currentQuestion].answer;
      const buttons = document.querySelectorAll(".option-btn");

      buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
          btn.style.backgroundColor = "green";
        } else if (btn.textContent === selected) {
          btn.style.backgroundColor = "red";
        }
      });

      if (selected === correctAnswer) {
        score++;
      }

      nextBtn.style.display = "inline-block";
    }

    function nextQuestion() {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        showFinalResult();
      }
    }

    function showFinalResult() {
      questionEl.textContent = "Quiz Completed!";
      optionsEl.innerHTML = "";
      nextBtn.style.display = "none";
      resultEl.textContent = `Your Score: ${score} / ${quizData.length}`;
    }

    // Load first question
    loadQuestion();


    async function fetchJoke() {
      try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await response.json();
        const jokeDiv = document.getElementById("joke");
        jokeDiv.innerHTML = `<strong>${data.setup}</strong><br>${data.punchline}`;
      } catch (error) {
        document.getElementById("joke").textContent = "Failed to fetch joke. Try again!";
        console.error("Error fetching joke:", error);
      }
    }