class Gpt {
    constructor($form, $input, $chatList) {
        this.$form = $form;
        this.$input = $input;
        this.$chatList = $chatList;

        this.openAIUrl = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

        // 질문과 답변 저장
        this.data = [
            {
                "role": "system",
                "content": "assistant는 노래 전문가이다."
            },
        ];

        // 화면에 뿌려줄 데이터, 질문들
        this.questionData = [];

        // input에 입력된 질문 받아오는 함수
        $input.addEventListener("input", (e) => {
            this.question = e.target.value;
        });

        $form.addEventListener("submit", (e) => {
            e.preventDefault();
            $input.value = null;
            this.sendQuestion(this.question);
            this.apiPost();
            this.printQuestion();
        });
    }

    // 사용자의 질문을 객체를 만들어서 push
    sendQuestion(question) {
        if (question) {
            this.data.push({
                role: "user",
                content: question,
            });
            this.questionData.push({
                role: "user",
                content: question,
            });
        }
    }

    // 화면에 질문 그려주는 함수
    async printQuestion() {
        if (this.question) {
            let li = document.createElement("li");
            li.classList.add("question");
            this.questionData.map((el) => {
                li.innerText = el.content;
            });
            this.$chatList.appendChild(li);
            this.questionData = [];
            this.question = false;
        }
    }

    // 화면에 답변 그려주는 함수
    printAnswer(answer) {
        let li = document.createElement("li");
        li.classList.add("answer");
        li.innerText = answer;
        this.$chatList.appendChild(li);
    }

    // api 요청보내는 함수
async apiPost() {
    try {
        const response = await fetch(this.openAIUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.data),
            redirect: "follow",
        });

        const result = await response.json();
        this.answer = result.choices[0].message.content;
        console.log(this.answer.split('\n').slice(2, 12));
        this.printAnswer(this.answer);
    } catch (err) {
        console.log(err);
    }
}


    getAnswer() {
        return this.answer;
    }
}

export default Gpt;
