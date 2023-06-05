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
            {
                "role": "user",
                "content": "팝송 리스트 추천 해줘"
            },
            {
                "role": "assistant",
                "content": "좋은 팝송 리스트를 추천해 드립니다.\n\
                1. Thinking Out Loud - Ed Sheeran\n\
                2. Shape of You - Ed Sheeran\n\
                3. Hello - Adele\n\
                4. Someone Like You - Adele\n\
                5. Just The Way You Are - Bruno Mars\n\
                6. Uptown Funk - Bruno Mars\n\
                7. Can't Stop The Feeling! - Justin Timberlake\n\
                8. Bad Guy - Billie Eilish\n\
                9. Blinding Lights - The Weeknd\n\
                10. Don't Stop Believin' - Journey\n\
                이런 노래들이 새벽의 고요함과 잘 어울릴 것 같습니다. 감상하세요!"
            },
            {
                "role": "user",
                "content": "노래 리스트 추천 해줘"
            }
        ];

        // 화면에 뿌려줄 데이터, 질문들
        this.questionData = [];
        
        // 질문을 업데이트 함
        this.sendQuestion(question);
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

    // main.js 에 빠져도 될 함수?
    // 화면에 질문 그려주는 함수
    printQuestion() {
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
                this.printQuestion()
                this.answer = result.choices[0].message.content;
                this.printAnswer(this.answer);
            } catch (err) {
                console.log(err);
        }
        return this.answer.split('\n').slice(2, 12)  // 예외 처리 필요
    }
}

export default Gpt;
