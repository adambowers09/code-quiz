var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var scoreText = document.querySelector('#score');

var currentQuestion = {}
var acceptingAnswers = true
var score = 0


var questions = [
    {
        question: "What country covers 2 continents?",
        choice1: "Russia",
        choice2: "England",
        choice3: "Canada",
        choice4: "Australia",
        answer: 1,
    },
    {
        question: "What NBA team did Michael Jordan play for?",
        choice1: "LA Lakers",
        choice2: "Miami Heat",
        choice3: "Chicago Bulls",
        choice4: "New York Knicks",
        answer: 3,
    },
    {
        question: "How many bones are in the human body?",
        choice1: "5",
        choice2: "90",
        choice3: "206",
        choice4: "148",
        answer: 3,
    },
    {
        question: "Bill Gates is the founder of?",
        choice1: "Samsung",
        choice2: "Apple",
        choice3: "Nintendo",
        choice4: "Microsoft",
        answer: 4,
    }
]

var SCORE_POINTS = 100
var MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    
    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()