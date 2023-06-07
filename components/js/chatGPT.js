class Gpt {
    constructor($chatList, question) {
        this.$chatList = $chatList;
        this.question = question

        this.openAIUrl = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

        // 질문과 답변 저장
        this.data = [
            {
                "role": "system",
                // "content": "assistant는 친절한 답변가이다"
                "content": "assistant는 노래 전문가이다."
            },
        ];

        // 화면에 뿌려줄 데이터, 질문들
        this.questionData = [];
        
        // 질문을 업데이트 함
        this.sendQuestion(this.question);
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
                console.log(this.answer.match(/(10|\d). \D+[\d]?\n/gm))
                this.printAnswer(this.answer);
                
            } catch (err) {
                console.log(err);
        }
        return this.answer.split('\n').slice(2, 12)  // 예외 처리 필요
    }
}

export default Gpt;
