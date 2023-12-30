window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'G-2LCDF4Z1GX');

let questions = [
    
    
{
    question: "평상시 나의 대화 스타일은",
    answers: ["대화가 끊이지 않고, 처음 만난 사람과도 활발하게 이야기를 나눈다.", "말수가 적고, 필요한 때가 아니라면 더 많이 듣는 편이다."],
    image:"animal/골든리트리버.jpg",
    questionType:"EI",
    },
    {
    question: "다른 사람이 보기에 나는",
    answers: ["활동적이고 아이디어가 넘치는 밝은 에너지가 있는사람이다.", "신중하고 조용하지만 속이 깊은 사람이다."],
    image:"animal/꼬똥드툴레아.jpg",
    questionType:"EI",
    },
    {
    question: "새로운 장소나 모임에 갔을 때 나의 모습과 비슷한 것은",
    answers: ["먼저 자기 자신을 소개하고 마음에 드는 상대에게 대화를 시도한다.", "일단 주변의 분위기를 살피며 질문보다는 대답을 하는 편이다."],
    image:"animal/닥스훈트.jpg",
    questionType:"EI",
    },
    {
    question: "무언가를 설치하거나 만들 때 나의 모습은",
    answers: ["설명서에 나온 정석 그대로 설치하거나 만든다.", "한번 보고 감으로 설치하거나 다소 대충 만든다."],
    image:"animal/말티즈.jpg",
    questionType:"SN",
    },
    {
    question: "나와 비슷한 유형은?",
    answers: ["현실적이고 세부사항을 잘 다룬다.", "상상력과 아이디어가 풍부하다."],
    image:"animal/비숑프리제.jpg",
    questionType:"SN",
    },
    {
    question: "업무(공부)스타일을 보면 나는",
    answers: ["현재 주어진 한 가지 일에 집중한다.", "한 가지만 하는 것보단 여러가지 일을 자신의 스타일대로 처리한다."],
    image:"animal/시바견.jpg",
    questionType:"SN",
    },
    {
    question: "고민 상담을 들어줄 때 나와 비슷한 것은",
    answers: ["문제의 해결을 도울 만한 현실적인 조언을 해준다.", "먼저 그 사람의 입장이 되어 감정적으로 공감한다."],
    image:"animal/시베리안허스키.jpg",
    questionType:"TF",
    },
    {
    question: "상대방과 논쟁 시 나는",
    answers: ["팩트를 좋아하며 논쟁에서 무조건 이기는 것이 중요하다.", "내 의견과 다르더라도 상대방의 기분을 고려하는게 마음이 편하다."],
    image:"animal/사모예드.jpg",
    questionType:"TF",
    },
    {
    question: "감정에 대한 나의 생각은",
    answers: ["평소에 감정 표현을 잘 안하는 편이다.", "감정 이입이 쉽고 감정에 치우쳐 화가나는 경우가 많다."],
    image:"animal/진돗개.jpg",
    questionType:"TF",
    },
    {
    question: "나에게 계획은",
    answers: ["하나부터 열까지 세세하고 철저하게 세우는 편이다.", "큰 틀만 잡고 나머지는 유연하게 처리하는 편이다."],
    image:"animal/푸들.jpg",
    questionType:"JP",
    },
    {
    question: "일이나 공부하는 스타일로 나와 비슷한 것은",
    answers: ["시간 단위와 계획을 세워 업무/공부를 끝낸다.", "정해진 순서는 중요하지 않다, 그때그때 몰아서 끝낸다."],
    image:"animal/포메라니안.jpg",
    questionType:"JP",
    },
    {
    question: "나의 여행스타일과 비슷한 것은",
    answers: ["예측 가능하고 계획한 범위 내에서 여행한다.", "즉흥적으로 그날의 느낌에 따라 여행한다."],
    image:"animal/웰시코기.jpg",
    questionType:"JP",
    }
];

function shuffle (array) { 
    return array.sort(() => Math.random() - 0.5); 
};
questions = shuffle(questions);

let currentQuestion = -1;
const answers = [];
const progressBar = document.getElementById("progress");


// const container = document.getElementsByClassName("container");
const questionElement = document.getElementById("question");
const optionsElement = document.querySelector(".options");
const imageElement = document.getElementById("image-section");
const resultImageElement = imageElement; // document.getElementById("result-image-section");
const backButton = document.getElementById("back-button");
const nextButton = document.getElementById("next-button");
const reloadButton = document.getElementById("reload-button")

// const imageSection = document.getElementById("image-section");
const questionSection = document.querySelector(".question-section");
const startSection = document.querySelector(".start-section");

const resultSection = document.querySelector(".result-section");
const resultTitle = document.getElementById("result-title");
const resultDesc = document.getElementById("result-desc");
const resultAnimalDesc = document.getElementById("result-animal-desc");
const resultGood = document.getElementById("result-good");
const resultBad = document.getElementById("result-bad");

let selectedRadio = null; // To track the currently selected answer


const startButton = document.getElementById("start-button");
function startQuestions() {
    // Show or hide the "Start" button based on the result
    // startSection.style.display = "none";
    // questionSection.style.display = "inline"; // Or "inline" depending on your layout

    imageElement.src = "img/img1.jpg"
    currentQuestion = 0;
    displayQuestion();
    // questionSection.scrollIntoView(true);
    
}
startButton.addEventListener("click", startQuestions);


function displayQuestion() {
    const currentQuestionData = questions[currentQuestion];
    questionElement.textContent = currentQuestionData.question;
    optionsElement.innerHTML = ''; // Clear previous options
    imageElement.src = "img/" + currentQuestionData.image; // Change the image based on the question

    // Create and append radio options for the current question
    currentQuestionData.answers.forEach((answer, index) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = answer;
        radio.id = index;
        radio.setAttribute("questionType", currentQuestionData.questionType);

        radio.addEventListener("click", () => {
            if (selectedRadio) {
                selectedRadio.parentElement.style.backgroundColor = ""; // Reset the background color of the previous selection
            }
            selectedRadio = radio;
            
            radio.parentElement.style.backgroundColor = "blue"; // Change selection color to blue
            radio.parentElement.style.color = "#fff";

            displayNextQuestion();
        });
        label.appendChild(radio);
        label.appendChild(document.createTextNode(answer));
        optionsElement.appendChild(label);
    });

    // Set the selected answer if it's already been answered
    if (answers[currentQuestion]) {
        const savedRadio = optionsElement.querySelector(`input[id="${answers[currentQuestion].id}"]`);
        if (savedRadio) {
            savedRadio.checked = true;
            selectedRadio = savedRadio;
            savedRadio.parentElement.style.backgroundColor = "blue"; // Change selected answer's color to blue
            savedRadio.parentElement.style.color = "#fff";
        }
    }
    updateProgressBar();
}

function displayNextQuestion() {
    const selectedRadio = optionsElement.querySelector('input[name="answer"]:checked');
    if (selectedRadio) {
        // console.log(selectedRadio);
        // console.log(selectedRadio.id);
        // console.log(selectedRadio.getAttribute("questiontype"));
        answers[currentQuestion] = { 
            questiontype: selectedRadio.getAttribute("questiontype").toString(),
            id: selectedRadio.id.toString()
        };

        currentQuestion++;
        backButton.disabled = false;
        backButton.style.display = "inline";
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            window.location.href = "index.html?result=" + encodeURIComponent(determineResult(answers));
            // showResults();
        }
    }
}

function displayPreviousQuestion() {
    currentQuestion--;
    if (currentQuestion == 0) {
        backButton.disabled = true;
        backButton.style.display = "none";
    }
    

    displayQuestion();
}

function replaceAt(s, i, c) {
    const arr = [...s];  // Convert string to array
    arr[i] = c;          // Set char c at pos i
    return arr.join(''); // Back to string
}

const similarItems = {
    INFP: {
        GOOD: ["ENFJ", "ENTJ"],
        BAD: ["ISFP", "ESFP"],
    },
    ENFP: {
        GOOD: ["INFJ", "INTJ"],
        BAD: ["ISTP", "ESTP",]
    },
    INFJ: {
        GOOD: ["ENFP", "ENTP"],
        BAD: ["ISFJ", "ESFJ"],
    },
    ENFJ: {
        GOOD: ["INFP", "ISFP"],
        BAD: ["ISTJ", "ESTJ"],
    },
    INTJ: {
        GOOD: ["ENFP", "ENTP"],
        BAD: ["ISFJ", "ESFJ"],
    },
    ENTJ: {
        GOOD: ["INFP", "INTP"],
        BAD: ["ESTJ", "ISTJ"],
    },
    INTP: {
        GOOD: ["ENTJ", "ESTJ"],
        BAD: ["ISFJ", "ESFJ"],
    },
    ENTP: {
        GOOD: ["INFJ", "INTJ"],
        BAD: ["ISFJ", "ESFJ"],
    },
    ISFP: {
        GOOD: ["ENFJ", "ESFJ"],
        BAD: ["INFP", "ENFP"],
    },
    ESFP: {
        GOOD: ["ISFJ", "ISTJ"],
        BAD: ["INFJ", "ENFJ"],
    },
    ISTP: {
        GOOD: ["ESFJ", "ESTJ"],
        BAD: ["INFP", "ENFP"],
    },
    ESTP: {
        GOOD: ["ISFJ", "ISTJ"],
        BAD: ["INFJ", "ENFJ"],
    },
    ISFJ: {
        GOOD: ["ESFP", "ESTP"],
        BAD: ["INFP", "ENFP"],
    },
    ESFJ: {
        GOOD: ["ISFP", "ISTP"],
        BAD: ["INFJ", "ENFJ"],
    },
    ISTJ: {
        GOOD: ["ESFP", "ESTP"],
        BAD: ["INFP", "ENFP"],
    },
    ESTJ: {
        GOOD: ["INTP", "ISFP"],
        BAD: ["INFJ", "ENFJ"]
    }
    

}

// Determine the result based on the score
const results = {
    ISTJ: {
        animal: "시베리안허스키",
        description: "활발함·독립적·친근함",
        animalDescription: `
        총명하고 활발한 시베리안 허스키는 독립심 강하면서 주인에게 충실한 친구로 알려져 있어요.

        #사교성: 사람을 좋아하고 활발하게 상호작용하며, 집단에서도 높은 사교성을 보입니다.
        #지능: 뛰어난 지능과 호기심을 지닌 시베리안 허스키는 주인의 말을 높은 이해력으로 이해합니다.
        #활동적: 끊임없는 활동을 즐기며, 산책, 달리기 등 실외 활동을 통해 에너지를 소비합니다.
        #독립심: 독립적인 성향으로 자기 행동을 결정하며, 주인에게도 일정 부분의 독립성을 유지합니다.

        추가적인 특징:
        #애정표현: 주인에 대한 애정을 분명하게 표현하며, 정서적인 연결을 중요시합니다.
        #농담쟁이: 장난기 많고 유머 감각이 뛰어나, 가끔은 웃음 소리가 주인을 환하게 합니다.
        #심리적통찰: 주인의 감정을 민감하게 감지하고, 위로나 지지를 제공하는 능력을 보여줍니다.`

    },
    ISFJ: {
        animal: "꼬똥드툴레아",
        description: "사랑스러움·활달함·온순함",
        animalDescription: `
        꼬똥드툴레아는 사랑스럽고 활달한 성격으로, 온순한 품격을 지니고 있어요.

        #친화력: 사람과의 상호작용을 즐기며, 친근하고 사려깊은 성격으로 주인과의 유대감을 중요시합니다.
        #활동적: 활기차고 활동적인 성향으로, 놀이와 운동을 통해 체력을 소비하며 기분을 확 풀어놉니다.
        #순종성: 굴종하고 학습에 높은 순응성을 가지며, 훈련과 교육에 잘 반응하는 특징을 보입니다.
        #애정표현: 주인에게 강한 애정을 표현하며, 꼬똥드툴레아와의 상호작용은 주인에게 큰 기쁨을 줍니다.

        추가적인 특징:
        #무뚝뚝함: 가끔은 무뚝뚝한 듯한 표정을 지어도, 사실은 따뜻하고 다정한 마음을 지니고 있습니다.
        #호기심: 새로운 환경이나 물건에 호기심을 가지며, 색다른 것에 끌리는 성향을 보입니다.
        #자기보호: 주인이나 가족을 지키기 위해 자기보호 본능이 강하며, 경계심이 뚜렷합니다.
`
    },
    INFJ: {
        animal: "진돗개",
        description: "충직함·용감함·헌신적",
        animalDescription: `
        진돗개는 충직하고 용감한 성격으로, 주인에 대한 헌신적인 모습으로 유명합니다.

        #헌신성: 주인을 위해 목숨바칠 강한 헌신을 지니며, 가족과의 유대를 중시합니다.
        #용맹함: 용감하고 강인한 성향으로, 수호와 보호 본능이 강하게 발휘됩니다.
        #활동적: 에너지 넘치고 활발한 성격으로, 실외 활동과 뛰어다니는 것을 즐깁니다.
        #영리함: 영리하면서도 순종적인 면모를 지닌 진돗개는 훈련에 높은 순응성을 보입니다.

        추가적인 특징:
        #가정적: 가족과의 조화를 중시하며, 따스하고 가정적인 분위기를 좋아합니다.
        #사회성: 다른 동물이나 사람들과의 사회적 상호작용을 중요시하며, 사교적인 면모를 보입니다.
        #귀여움: 힘차고 무서운 외모와는 달리, 가끔은 귀여운 행동이 나타나 주인을 감동시킵니다.
`
    },
    INTJ: {
        animal: "포메라니안",
        description: "애교스러움·적극적·행복감",
        animalDescription: `
        포메라니안은 애교 넘치고 행복한 성격으로, 적극적인 사랑 꾼으로 알려져 있습니다.
        
        #애정표현: 주인에게 강한 애정을 표현하며, 애교로 마음을 전하는 능력이 뛰어납니다.
        #적극성: 호기심 많고 적극적인 성향으로, 새로운 경험과 놀이를 즐깁니다.
        #흥분도: 민첩하면서도 활기찬 성격으로, 작은 놀이에도 높은 흥분을 보입니다.
        #지능: 뛰어난 지능과 높은 학습력을 가지며, 훈련과 교육에 높은 순응성을 보입니다.
        
        추가적인 특징:
        #용기: 작은 몸집에도 불구하고 용감한 모습으로, 예상치 못한 상황에도 대처 능력이 뛰어납니다.
        #사회성: 다른 개나 사람들과의 교류를 즐기며, 사교적인 성향을 보여 인기를 얻습니다.
        #도도함: 매력적이면서도 도도한 태도로, 특유의 자부심을 가지고 주변을 매료시킵니다.
`
    },
    ISTP: {
        animal: "비숑프리제",
        description: "활발함·애정어림·온순함",
        animalDescription: `
        비숑프리제는 활발하면서도 애정 어린 성격으로, 온화한 미소와 귀여움으로 가득합니다.
        
        #사교성: 다른 동물과 사람들과 소통을 즐기며, 사랑스러운 태도로 주변을 환하게 합니다.
        #활발함: 에너지 넘치는 성향으로, 놀이와 활동을 통해 기운을 발산하고 즐거움을 찾습니다.
        #애정표현: 주인에 대한 애정을 분명하게 표현하며, 상호작용을 통해 정서적 유대감을 형성합니다.
        #순종성: 굴종적이면서도 지능적인 면모를 지닌 비숑프리제는 훈련에 잘 순응하고 학습합니다.
        
        추가적인 특징:
        #호기심: 새로운 물건이나 환경에 호기심을 갖고, 놀이와 탐험을 즐기는 모습이 매력적입니다.
        #유머감각: 기특한 유머 감각으로, 귀엽고 재미있는 행동으로 주인과 주변 사람들을 웃음 속으로 이끕니다.
        #안정감: 안정된 성품과 차분한 에너지로, 주인에게 안정과 안락함을 전해주는 능력을 가지고 있습니다.
`
    },
    ISFP: {
        animal: "시바견",
        description: "자립성·활발함·충직함",
        animalDescription: `
        시바견은 자립심이 강하고 활발한 성격으로, 주인에 대한 충직한 모습으로 유명합니다.
        
        #애정표현: 주인에 대한 애정을 미처라며, 따뜻한 마음을 충분히 전하며 지내는 특징이 있습니다.
        #자립성: 독립적이면서도 주인과의 유대감을 중요시하며, 적절한 거리감을 유지하는 성격입니다.
        #적응력: 다양한 환경에 빠르게 적응하며, 변화에 대한 유연성을 가지고 있습니다.
        #지능: 높은 지능과 기민성을 지녔으며, 훈련에 높은 순응성과 학습 능력을 보여줍니다.
        
        추가적인 특징:
        #유머감각: 재미있는 표정과 행동으로, 가끔은 주인을 웃음 속으로 끌어당깁니다.
        #용감함: 작은 몸집에도 불구하고 용감한 성향으로, 강하고 단호한 결단력을 가지고 있습니다.
        #활동성: 에너지 넘치고 활동적인 면모를 지닌 시바견은 산책이나 놀이를 통해 활기찬 모습을 보여줍니다.`
    },
    INFP: {
        animal: "푸들",
        description: "높은지성·우아함·사려깊음",
        animalDescription: `
        푸들은 지적이면서도 우아한 성격으로, 주인에 대한 사려깊음과 관대한 마음을 지닌 아름다운 견종이에요.
        
        #사교성: 다른 동물과 사람들과 소통을 즐기며, 친근하고 사려깊은 성격으로 유명합니다.
        #훈련성: 고백과 훈련에 높은 순응성을 가지며, 높은 지능으로 다양한 능력을 학습합니다.
        #우아함: 우아하고 세련된 모습으로, 자연스러운 아름다움과 우아함을 지니고 있습니다.
        #애정표현: 주인에 대한 애정을 표현하며, 상호작용을 통해 정성스런 유대를 형성하는 특징이 있습니다.

        추가적인 특징:
        #낭만적: 로맨틱하면서도 낭만적인 성향으로, 아름다운 모습과 근사한 행동으로 눈길을 끕니다.
        #귀여움: 미소와 귀여운 행동으로, 사람들의 마음을 사로잡는 푸들은 가족과 어울림을 즐깁니다.
        #용기: 용감하고 대담한 성향으로, 예상치 못한 상황에도 용기 있게 대처하는 능력을 보여줍니다.`
    },
    INTP: {
        animal: "비글",
        description: "활발함·친근함·목소리감각",
        animalDescription: `
        비글은 활발하고 친근한 성격으로, 특유의 매력적인 목소리와 함께 주인을 환하게 만들어줍니다.
        
        #헌신성: 주인에게 충실하며, 가족과의 유대를 중요시하며 활발한 성격이 특징입니다.
        #활동적: 뛰어다니고 놀기를 즐기며, 에너지 넘치는 모습으로 가족을 활기차게 만듭니다.
        #사교성: 다른 강아지와 사람들과 잘 어울리며, 사교적인 성향으로 유명합니다.
        #흥분도: 민첩하면서도 호기심이 많아, 새로운 환경이나 놀이에 높은 흥분을 보입니다.
        
        추가적인 특징:
        #총명함: 뛰어난 지능과 기민성을 가지며, 훈련에도 높은 순응성을 보입니다.
        #목소리감각: 특유의 울음소리로, 주인과 소통하며 행복한 상황에서 더욱 특출납니다.
        #농담쟁이: 장난기 많고 유머 감각이 뛰어나, 가끔은 주인을 웃음 속으로 이끕니다.`
    },
    ESTP: {
        animal: "말티즈",
        description: "사랑스러움·온순함",
        animalDescription: `
        말티즈는 사랑스럽고 온순한 성격으로, 가끔은 주인에게 헌신적이기도 해요.

        #애정표현: 주인에게 강한 애정을 표현하며, 정성스런 마음으로 유대를 형성하는 특징이 있습니다.
        #사려깊음: 상대방의 감정을 민감하게 살필 수 있는 사려깊은 성향으로 알려져 있습니다.
        #활발함: 작지만 에너지 넘치는 활발한 성격으로, 놀이와 산책을 즐기며 주인을 기쁘게 합니다.
        #적응력: 다양한 환경에서 적응력이 높아, 새로운 환경에 빠르게 적응할 수 있는 특징이 있습니다.
        
        추가적인 특징:
        #예민함: 민감하고 예민한 성향으로, 세심한 관찰과 사려가 돋보입니다.
        #우아함: 아름다운 외모와 우아한 태도로, 여러 이목구비를 갖추어 매력적으로 다가갑니다.
        #유머감각: 가끔은 귀엽고 웃긴 행동으로, 주인과 주변을 즐겁게 만들어줍니다.`
    },
    ESFP: {
        animal: "웰시코기",
        description: "활발함·친근함·즐거움",
        animalDescription: `
        웰시코기는 활발하고 친근한 성격으로, 짧은 다리와 큰 귀가 특징입니다.

        #낙천적: 긍정적이고 낙천적인 성향으로, 주변을 밝게 만들어주는 즐거운 동반자입니다.
        #친화성: 다른 강아지와 사람들과 소통을 즐기며, 사교적인 성향이 돋보입니다.
        #활동성: 에너지 넘치고 활발한 성격으로, 놀이와 산책을 통해 기운을 소비합니다.
        #충성심: 주인에게 충실하고 애정을 표현하며, 가족과의 유대를 중요시합니다.
        
        추가적인 특징:
        #허물없음: 솔직하고 허물 없는 성격으로, 순수하고 귀여운 행동이 돋보입니다.
        #영리함: 높은 지능과 똑똑함으로, 다양한 훈련과 놀이에 적극적으로 참여합니다.
        #웃음소리: 특유의 웃음소리로 주인을 웃게 만들며, 즐거움을 나누는 모습이 사랑스럽습니다.
        `
    },
    ENFP: {
        animal: "퍼그",
        description: "활발함·우호적·사랑스러움",
        animalDescription: `
        퍼그는 활발하고 우호적인 성격으로, 사람들에게 사랑을 받는 매력적인 견종이에요.

        #애정표현: 주인에게 강한 애정을 표현하며, 귀여운 행동으로 주변을 사로잡습니다.
        #사회성: 다양한 사람과 동물들과 잘 어울리며, 사교적인 성향으로 알려져 있습니다.
        #적응력: 다양한 환경에 잘 적응하며, 새로운 경험에 호기심을 갖는 특징이 있습니다.
        #낙천적: 긍정적이고 낙천적인 성향으로, 어떤 상황에서도 희망을 잃지 않습니다.

        추가적인 특징:
        #식탐: 먹을 음식에 대한 열정이 강하며, 식탐이 높아 다양한 음식을 즐겨먹습니다.
        #유머감각: 유머 감각이 풍부하며, 가끔은 귀여운 행동으로 주인과 주변을 웃음 속으로 이끕니다.
        #귀엽게죽음: 귀여운 외모와 특이한 표정으로, "퍼그의 귀엽게 죽음"이라 불리기도 합니다.`
    },
    ENTP: {
        animal: "사모예드",
        description: "우호적·쾌활함·수려함",
        animalDescription: `
        사모예드는 우호적이고 쾌활한 성격으로, 눈부신 백색 털과 함께 주인을 환하게 만듭니다.
        
        #사회성: 사람과 다른 동물에 대한 호기심이 많아, 사교성이 풍부한 특징이 있습니다.
        #적응력: 다양한 환경에서 적응력이 높아, 새로운 환경에도 잘 적응합니다.
        #활동적: 에너지 넘치고 활동적인 성향으로, 산책이나 놀이를 통해 기운을 소비합니다.
        #애정표현: 주인에게 강한 애정을 표현하며, 다정하고 미소 넘치는 모습으로 가족과 어울립니다.
        
        추가적인 특징:
        #진지함: 헌신적이면서도 진지한 성향으로, 주인과의 유대관계를 중시하며 충실합니다.
        #농담쟁이: 가끔은 귀여운 행동과 농담 같은 모습으로, 주변을 웃음 속으로 끌어당깁니다.
        #고집불통: 때때로 고집이 세고 독립적인 면모를 보이나, 그 특유의 매력적인 모습으로 주인을 매료시킵니다.`
    },
    ESTJ: {
        animal: "보더콜리",
        description: "민첩함·지능적·활발함",
        animalDescription: `
        보더콜리는 민첩한 몸과 뛰어난 지능을 가진 활발하고 활기찬 성격의 견종이에요.

        #충실성: 주인에게 충실하고 헌신적이며, 믿음직스러운 파트너로서 알려져 있습니다.
        #사회성: 다른 강아지와 사람들과의 사회적 상호작용을 즐기며, 활발한 성격이 돋보입니다.
        #활동성: 에너지 넘치고 활발한 성향으로, 놀이와 운동이 필요한 활발한 품종입니다.
        #지능: 뛰어난 학습능력과 높은 지능을 가지며, 다양한 훈련과 작업에 능숙합니다.
        
        추가적인 특징:
        #낙천적: 낙천적이고 긍정적인 성향으로, 어려운 상황에서도 끈기와 낙관을 유지합니다.
        #민첩함: 경주와 놀이를 즐기며, 예리한 감각과 민첩한 몸을 통해 활동적인 생활을 선호합니다.
        #의리: 주인을 위해 목숨바칠 정도로 충실하고 의리 있으며, 가족과의 유대를 중시합니다.`
    },
    ESFJ: {
        animal: "닥스훈트",
        description: "사랑스러움·용감함·활기참",
        animalDescription: `
        닥스훈트는 사랑스럽고 용감한 성격으로, 짧은 다리와 긴 몸이 특징입니다.

        #애정표현: 주인에 대한 애정을 표현하며, 사랑스럽고 충실한 동반자로 알려져 있습니다.
        #용감함: 작지만 용감하고 대담한 성향으로, 경계심이 강하게 발휘됩니다.
        #활발함: 에너지 넘치는 활발한 성격으로, 놀이와 운동을 통해 기운을 소비합니다.
        #민첩성: 민첩하고 기민한 성향으로, 높은 지능과 함께 다양한 훈련에 적응합니다.
        
        추가적인 특징:
        #귀여움: 귀여운 외모와 특이한 형태로, 사람들의 마음을 사로잡습니다.
        #충성심: 주인에 대한 충성심이 깊어, 가족과의 유대를 중요시하며 보호 본능이 강조됩니다.
        #사교성: 다른 강아지나 사람들과의 소통을 즐기며, 사회성이 뛰어난 특징이 있습니다.`
    },
    ENFJ: {
        animal: "골든리트리버",
        description: "온순함·가정적·활발함",
        animalDescription: `
        골든리트리버는 온화하고 충성스러운 성격으로, 활발하고 사랑스러운 가정 개입니다.
        
        #가족중심: 가정 내에서 충실하고 사랑스러운 가족 멤버로서 애정 표현이 뛰어납니다.
        #사회성: 사람과 다른 동물과의 소통을 즐기며, 친절하고 사교적인 성향이 돋보입니다.
        #활동성: 활발하고 에너지 넘치는 성격으로, 놀이와 운동을 즐겨 가정을 활기차게 만듭니다.
        #지능: 뛰어난 학습능력과 높은 지능으로 다양한 훈련과 일에 순응성을 보입니다.
        
        추가적인 특징:
        #품격: 고상한 외모와 품격 있는 행동으로, 주위에서 많은 사랑과 인기를 받습니다.
        #수영능력: 물에서 수영하는 것을 좋아하며, 뛰어난 수영 능력을 보여줍니다.
        #친화력: 낯선 사람에 대한 두려움이 적어, 친구들과의 소통과 만남을 즐기는 편입니다.`
    },
    ENTJ: {
        animal: "셰퍼드",
        description: "지능적·용감함·헌신적",
        animalDescription: `
        셰퍼드는 뛰어난 지능과 용감함으로 알려진 충성스러운 개입니다.
        
        #경비견: 집지키기에 뛰어나며, 가족을 보호하는 데 높은 충성심을 보입니다.
        #활동성: 활동적이고 에너지 넘치는 성격으로, 놀이와 훈련을 통해 기운을 소비합니다.
        #지능: 뛰어난 학습능력과 높은 지능으로, 다양한 명령을 이해하고 수행할 수 있습니다.
        #사교성: 가족과의 유대를 중시하며, 아이들과도 잘 어울리는 친근한 성향을 가지고 있습니다.
        
        추가적인 특징:
        #민첩함: 민첩하고 기민한 성향으로, 다양한 환경에서도 빠르게 대처할 수 있습니다.
        #집중력: 목표 달성을 위해 높은 집중력을 보이며, 임무 수행에 신속하게 대응합니다.
        #헌신적: 주인에게 헌신적으로 충성하며, 어려운 상황에서도 끈기와 헌신을 보여줍니다.`
    },
}
let resultIndex = 0;
function determineResult(answers) {
    
    // Calculate the user's score based on their answers
    let scoreEI = 0;
    let scoreSN = 0;
    let scoreTF = 0;
    let scoreJP = 0;

    var answerIdx = 0;
    while (answerIdx < answers.length) {
    // for (ans in answers) {
        ans = answers[answerIdx];
        switch (ans.questiontype){
            case "EI":
                if (ans.id == 0) {
                    scoreEI += 1;
                } else {
                    scoreEI -= 1;
                }
                break;
            case "SN":
                if (ans.id == 0) {
                    scoreSN += 1;
                } else {
                    scoreSN -= 1;
                }
                break;
            case "TF":
                if (ans.id == 0) {
                    scoreTF += 1;
                } else {
                    scoreTF -= 1;
                }
                break;
            case "JP":
                if (ans.id == 0) {
                    scoreJP += 1;
                } else {
                    scoreJP -= 1;
                }
                break;
            default:
                console.log("type not exists.");
        }
        answerIdx += 1;
    }
    
    let result = "ESTJ";

   

    // prints "hallo world"
    
    if (scoreEI < 0) result = replaceAt(result, 0, 'I');
    if (scoreSN < 0) result = replaceAt(result, 1, 'N');
    if (scoreTF < 0) result = replaceAt(result, 2, 'F');
    if (scoreJP < 0) result = replaceAt(result, 3, 'P');
    
        
    // Return the result
    return result;
}

function showResults(result = "none") {
    

    // Logic to determine the result based on answers
    if (result == "none") {
        result = determineResult(answers);
    } else {
        result = result.toUpperCase();
    }
    const resultVal = results[result];
    // questionSection.style = "display: none;";
    // resultSection.style = "display: inline;";
    resultImageElement.src = "img/animal/" + resultVal.animal + ".jpg";
    // Display result and description
    const resultMbti = resultVal.animal + " (" + result + ")";
    const resultTitleMsg = "퍼피 테스트 결과: " + resultMbti;
    resultTitle.textContent = resultTitleMsg;
    resultDesc.textContent = resultVal.description;
    let date = Date.now();
    gtag('event', "MBTI결과", {'event_category': '테스트결과', 'mbti': resultMbti, 'time': date});
    

    resultAnimalDesc.textContent = resultVal.animalDescription;
    let similarItem = similarItems[result];
    let goodItems = similarItem["GOOD"].map(o => results[o].animal).join(", ");
    let badItems = similarItem["BAD"].map(o => results[o].animal).join(", ");
    resultGood.textContent = "잘 어울리는 견종: " + goodItems;
    resultBad.textContent = "잘 안맞는 견종: " +badItems;
    updateProgressBar(1);
    // resultSection.scrollIntoView(true);
}


function updateProgressBar(progress = 0) {
    if (progress == 0) {
        progress = ((currentQuestion + 1) / questions.length) * 100;
    }
    progressBar.style.width = `${progress}%`;
    if (progress > 0) {
        progressBar.style.display = "inline";
        startSection.style.display = "none";
        questionSection.style.display = "inline";
        if (progress == 1) {
            progressBar.style.display = "none";
            questionSection.style.display = "none";
            resultSection.style.display = "inline";
        }
    }

}


nextButton.addEventListener("click", displayNextQuestion);
backButton.addEventListener("click", displayPreviousQuestion);

// reloadButton.addEventListener("click", reload);

// displayQuestion();




// {{ result 쿼리파라미터가 존재할 땐 바로 결과표시 시작

// Function to get URL parameter by name
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


Kakao.init('1cb2ad66785cd7eca7c8346909d44a07');

// Get the value of the 'result' parameter
const resultParam = getUrlParameter('result');

// Replace content based on the value of 'result' parameter
if (resultParam) {

    showResults(resultParam);

    Kakao.Share.createCustomButton({
        container: '#shareKt1',
        templateId: 102209, // 나의 앱 ID 작성
        templateArgs: {
            'result_url': "?result=" + resultParam,
            'result': ": " + results[resultParam].animal + "(" + resultParam + ")",
        }
    });
    Kakao.Share.createCustomButton({
        container: '#shareKt2',
        templateId: 102209, // 나의 앱 ID 작성
        templateArgs: {
            'result_url': "?result=" + resultParam,
            'result': ": " + results[resultParam].animal + "(" + resultParam + ")",
        }
    });    

    Kakao.Share.createCustomButton({
        container: '#shareKt3',
        templateId: 102209, // 나의 앱 ID 작성
        templateArgs: {
          'result_url': "?result=" + resultParam,
          'result': ": " + results[resultParam].animal + "(" + resultParam + ")",
        }
        });
} else {
    Kakao.Share.createCustomButton({
        container: '#shareKt1',
        templateId: 102209, // 나의 앱 ID 작성
      });
    Kakao.Share.createCustomButton({
    container: '#shareKt2',
    templateId: 102209, // 나의 앱 ID 작성
    });
    
    Kakao.Share.createCustomButton({
        container: '#shareKt3',
        templateId: 102209, // 나의 앱 ID 작성
        });
}
// }} result 쿼리파라미터가 존재할 땐 바로 결과표시 끝


