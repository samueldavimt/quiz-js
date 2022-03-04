const qs = (e)=>{
    return document.querySelector(e)
}

const qsall = (e)=>{
    return document.querySelectorAll(e)
}

let letters = 'abcdefghijklmnopqrstuvwxyz'

let currentQuestion = 0

let hits = 0
let mistakes = 0
let blocked = false

const selectOption = {

    verify(){
        selectOption.progressBar()
        let idQuestion = this.dataset.idQuestion
        let idOption = this.dataset.idOption

        let localVerify = questions[idQuestion].options[idOption]

        if(!blocked){
            if(localVerify.value == true){
                console.log('acertou')
                hits ++
            }else{
                console.log('errou')
                mistakes ++
            }
    
            currentQuestion ++
            handleQuestion()
        }
       
    },

    calculateResult(){
        blocked = true
        let numQuestions = questions.length
        let percent = (hits / numQuestions) * 100

        let msg = ''
        let color = ''

        if(percent == 100){
            msg = 'Mestre! Excelente!'
            color = '#08dd08'
        }else if(percent >= 80){
            msg = 'Excelente! Parabéns!'
            color = 'gold'
        }else if(percent >= 50){
            msg = 'Ótimo! Muito Bom!'
            color = 'blue'
        }else if(percent >= 30){
            msg = 'Quase lá'
            color = 'orange'
        }else {
            msg = 'Não foi dessa Vez!'
            color = 'red'
        }

        qs('.result .msg').innerHTML = msg
        
        qs('.result .percent').innerHTML = `Acertou ${percent}%`
        qs('.result .percent').style.color = color

        qs('.result .hits').innerHTML = `Você acertou ${hits} de ${numQuestions} questões`
        

        qs('.result').style.opacity = '0'
        setTimeout(()=>{
            qs('.result').style.opacity = '1'
        },300)

        qs('.result').style = 'display: block !important;'

        qs('.result button').onclick = selectOption.reset
        

    },

    reset(){
        blocked = false
        qs('.progress-percent').style.width = `3%`
        currentQuestion = 0
        hits = 0
        mistakes = 0

        qs('.result').style.opacity = '0'
        setTimeout(()=>{
            qs('.result').style.display = 'none'
        },300)
        handleQuestion()
    
    },

    progressBar(){
        let percentage = ((currentQuestion +1) / questions.length) * 100
        console.log(percentage)

        qs('.progress-percent').style.width = `${percentage}%`
    }
}

let handleQuestion = ()=>{

    if(questions[currentQuestion]){

        qs('.container-options').innerHTML = ''
        
        let question = questions[currentQuestion]

        qs('.question .question-title').innerHTML = `Questão ${currentQuestion + 1}`

        qs('.question .question-value').innerHTML = question.question

        question.options.forEach((option,index)=>{

            let tagOption = qs('.models .option').cloneNode(true)

            tagOption.querySelector('.value-option').innerHTML = option.option

            tagOption.querySelector('.letter').innerHTML = letters[index].toUpperCase()

            tagOption.dataset.idQuestion = currentQuestion
            tagOption.dataset.idOption = index

            tagOption.addEventListener('click',selectOption.verify)
            
            qs('.container-options').append(tagOption)
        })
    }else{
        selectOption.calculateResult()
    }
   
}

handleQuestion()


