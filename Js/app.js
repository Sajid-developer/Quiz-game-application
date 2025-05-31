
const quiz_box=document.querySelector('.quiz_box');
const questionText=document.querySelector('.questionBox');
const answerList=document.querySelector('.answer-list');
const scoreBox=document.querySelector('.score');
const question_counter=document.querySelector('.question_counter');

const startBtn=document.querySelector('.startBtn');
const nextBtn=document.querySelector('.nextBtn');
const categoryBtns=document.querySelectorAll('.questionCategory .category-btn');
const numbQuestion=document.querySelectorAll('.numbOfQuestion .number');


let quizCategory=document.querySelector(".category-btn.active").value;
let numbOfQuestions=parseInt(document.querySelector(".number.active").textContent);

const TIMER_LIMIT=15;
let timerValue=TIMER_LIMIT;
let ques_count=0;
let ques_numb=1;
let correctAnswerCount=0;
let WidthValue=0;
let userScore=0;
let counter,counterLine;

categoryBtns.forEach(btn =>{
  btn.addEventListener("click", ()=>{
     document.querySelector(".category-btn.active").classList.remove("active");
     btn.classList.add("active");
     quizCategory=btn.value;
     console.log(quizCategory);
   });
});

numbQuestion.forEach(numb =>{
  numb.addEventListener("click", ()=>{
     document.querySelector(".number.active").classList.remove("active");
     numb.classList.add("active");
     numbOfQuestions=parseInt(numb.textContent);
     console.log(numbOfQuestions);
   });
});

console.log(quizCategory);
console.log(numbOfQuestions);

function resetQuiz(){
    timerValue=TIMER_LIMIT;
    ques_count=0;
    ques_numb=1;
    correctAnswerCount=0;
    WidthValue=0;
    userScore=0;
    clearInterval(counter);
}

startBtn.addEventListener("click", ()=>{
   quiz_box.classList.add('active');
   quizCategory=document.querySelector(".category-btn.active").value;
   numbOfQuestions=parseInt(document.querySelector(".number.active").textContent);
   resetQuiz();
   correctAnswerCount=0;
   RenderQuestion(0);
   QuestionCounter(1);
   StartTimer(TIMER_LIMIT);
   scoreBox.innerHTML= `Score: <strong>${userScore}</strong>`;
   scoreBox.style.display='block';
   document.querySelector('.questionCategory').style.display='none';
   document.querySelector('.numbOfQuestion').style.display='none';
});

const categoryQuestions=QuizData.find(quiz => 
  quiz.category.toLowerCase() === quizCategory.toLowerCase()).questions;

nextBtn.addEventListener("click", ()=>{
  if(ques_count < numbOfQuestions - 1){
     ques_count++;
     ques_numb++;
     RenderQuestion(ques_count);
     QuestionCounter(ques_numb);
     clearInterval(counter);
     StartTimer(timerValue);
  }
  else{
    console.log("Quiz completed");
    console.log(`You answered ${correctAnswerCount} out of ${numbOfQuestions} question correctly.`);
    console.log(`Final Score is: ${userScore}`);
    quiz_box.classList.remove('active');
    scoreBox.style.display='none';
    document.querySelector('.questionCategory').style.display='flex';
    document.querySelector('.numbOfQuestion').style.display='flex';
  }

});


let currentQuestion='';

function RenderQuestion(index){
   answerList.classList.remove('disable');
   currentQuestion=categoryQuestions[index];
   let quest=`<span style="font-size:42px;">${ques_numb}.</span> ${currentQuestion.question}`;
   let optionList='';

   let shuffledOptions=currentQuestion.options.sort((a,b) => 0.5 - Math.random());
  
   shuffledOptions.forEach(option => {
      optionList+=`<li>${option}</li>`; 
    });

    questionText.innerHTML=quest;
    answerList.innerHTML=optionList;

    const answerOptions=answerList.querySelectorAll('li');

    answerOptions.forEach(option =>{
      option.setAttribute("onclick","AnswerSelected(this)");
    });

  nextBtn.style.display='none';

}
 //indicate quiz question number
  function QuestionCounter(quesNumb){
      let counterTag=`<span>${quesNumb}</span> of <span>${numbOfQuestions}</span> Questions`;
      question_counter.innerHTML=counterTag;
}

  let tickIcon='<span><i class="fa-regular fa-circle-check"></i><span>';
  let crossIcon='<span><i class="fa-regular fa-circle-xmark"></i><span>';

function AnswerSelected(answer){
    clearInterval(counter);
    let userAnswer=answer.textContent;
    let correctAnswer=categoryQuestions[ques_count].answer;

  // check if user answer is correct or incorrect
  if(userAnswer === correctAnswer){
    console.log("Answer is correct.");
    answer.classList.add('correct');
    correctAnswerCount++;
    HandleUserScore(quizCategory);
    answer.insertAdjacentHTML("beforeend", tickIcon);
   }
  else{
    console.log("Answer is Incorrect.");
    answer.classList.add('incorrect');
    answer.insertAdjacentHTML("beforeend", crossIcon);
  }

    // all options will be disabled, once user selects
    answerList.classList.add('disable');

    userAnswer!= correctAnswer ? HighlightCorrectAnswer(correctAnswer) : '';
    nextBtn.style.display='block';
}

// highlight correct answer automatically when user selects wrong answer
function HighlightCorrectAnswer(correctAnswer){
    const allOptions=answerList.querySelectorAll('li');
    allOptions.forEach(option =>{
       if(option.textContent === correctAnswer){
           option.classList.add('correct');
           option.insertAdjacentHTML("beforeend", tickIcon);   
       }
    });
  }




