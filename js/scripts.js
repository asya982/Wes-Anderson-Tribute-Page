window.onload = function(){
    let result = {};
    let step = 0;

    function showQuestion (QuestionNum) {
        document.querySelector(".quiz-question").innerHTML = quiz[step]['q'];
        let answer = '';

        for(key in quiz[step]['a']){
            answer += `<li data-v = "${key}" class = "answer-var"> ${quiz[step]['a'][key]} </li>`;
        }
        document.querySelector(".answers").innerHTML = answer;
    }

    document.onclick = function (event) {
        event.stopPropagation();
        if (event.target.classList.contains('answer-var') && step < quiz.length){
            //console.log(event.target);
            if (result[event.target.dataset.v] != undefined){
                result[event.target.dataset.v]++;
            }
            else{
                result[event.target.dataset.v] = 0;
            }

            step++;

            if (step == quiz.length){
                document.querySelector('.quiz-question').remove();
                document.querySelector('.answers').remove();
                showResult();
            }
            else{
                showQuestion(step);
            }
        }
    }

    function showResult(){
        let key = Object.keys(result).reduce(function (a,b) {
            return result[a] > result[b] ? a : b;
        });
        console.log(key);

        let div = document.createElement('div');
        div.classList.add('result');
        div.innerHTML = answers[key]["description"];
        document.querySelector('.quiz_box').appendChild(div);


        let img = document.createElement('img');
        img.classList.add('result');
        img.src = "characterss/" + answers[key]['image'];
        document.querySelector('.quiz_box').appendChild(img);
    }

    showQuestion(step);
}