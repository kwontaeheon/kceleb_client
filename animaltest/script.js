window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'G-2LCDF4Z1GX');

let questions = [
    
    {
        question: "첫 모임에서 새로운 사람들을 만났을 때 당신은?",
        answers: ["저 사람 성격이 나랑 맞겠는데? 인사하면서 두루두루 얘기해보자.", "구석에 가있자. 혼자있고 싶어."],
        image: "img1.jpg",
        questionType: "EI",
        
    },
    {
        question: "모임에서 갑작스럽게 계획에 없던 아이스브레이킹을 시킨다면 당신의 반응은?",
        answers: ["재밌겠다. 적극적으로 해야지!", "뭐 이런 걸 시켜? 집에 가고 싶다. 괜히 왔어."],
        image: "img2.jpg",
        questionType: "EI",
    },
    {
        question: "모임에서 조별 이름을 정해야해요. 이 때 당신은?",
        answers: ["우리 조 구성원들 공통점에 따라 이름을 생각해보자.", "고민할 거 없어. 대충 오늘은 평일이니까 평일조로 하자."],
        image: "img3.jpg",
        questionType: "SN",
    },
    {
        question: "과제가 생겼어요. 이 때 당신은?",
        answers: ["다음 일정까지 어느 부분을 보고 무엇을 해올지 계획한다.", "과제는 적당히 느낌적으로 하면 된다."],
        image: "img4.jpg",
        questionType: "SN",
    },
    {
        question: "인터넷으로 셀럽미 강의를 듣게 됐어요. 이 때 당신은?",
        answers: ["셀럽미가 뭐지? 정보를 찾아보며 학습한다.", "인터넷 강의는 종류가 참 많구나. 세상은 아이디어로 가득해!"],
        image: "img4.jpg",
        questionType: "SN",
    },
    {
        question: "일정이 촉박한데 조원들 사이에 갈등이 생겼어요. 이 때 당신은?",
        answers: ["안그래도 바쁜데 나랑은 상관없는 일이다.", "누가 잘못한건지 의견을 들어보자."],
        image: "img5.jpg",
        questionType: "JP",
    },
    {
        question: "조별 리더를 뽑아야해요. 이 때 당신은?",
        answers: ["내가 리더 감인지는 모르겠지만 나밖에 이 사람들을 품을 사람은 없는 것 같다.", "난 누구든 잘 따를 수 있다. 내가 리더가 아니기만 하면 된다."],
        image: "img6.jpg",
        questionType: "EI",
    },
    {
        question: "당신의 컴퓨터 폴더 목록은 정리정돈된 편인가요, 아니면 상황에 따라 유동적으로 바꿔가는 편인가요?",
        answers: ["정리정돈된 편이다.", "유동적인 편이다."],
        image: "img7.jpg",
        questionType: "JP",
    },
    {
        question: "기말고사가 코앞으로 다가왔는데 족보가 돌아다닌다고 해요. 이 때 당신은?",
        answers: ["족보가 있는 친구를 찾고 공유해달라고 하거나, 같이 공부하자고 한다.", "족보가 있건 없건 중요하지 않다. 나 스스로 공부한 것 만큼만 점수를 받겠다."],
        image: "img8.jpg",
        questionType: "JP",
    },
    {
        question: "두시간을 웨이팅해서 맛집에 겨우 들어왔는데 먹고싶었던 메뉴가 품절됐어요. 이 때 당신은?",
        answers: ["괜찮아, 다른거 먹지뭐", "오늘은 날이 안좋다. 안 먹을래."],
        image: "img9.jpg",
        questionType: "TF",
    },
    {
        question: "전공 수업 과제로 무섭고 위험한 실험을 해야해요. 이 때 당신은?",
        answers: ["무섭지만 어쨌든 해야하니까 천천히 조심스럽게 실험한다.", "과제로 준 거니까 크게 위험하진 않을것 같다. 대담하고 빠르게 실험한다."],
        image: "img10.jpg",
        questionType: "TF",
    },
    {
        question: "조원들 갈등이 심해져 몸싸움이 일어났는데, 먼저 때린 조원이 사과하는 모습을 본다면?",
        answers: ["사과는 당연한거고, 우리 조원들 피해까지 모두 신고해야겠다.", "그래도 사과하는데 받아주고, 다시 으쌰으쌰 해보자!"],
        image: "img11.jpg",
        questionType: "TF",
    }
];

function shuffle (array) { 
    return array.sort(() => Math.random() - 0.5); 
};
questions = shuffle(questions);

let currentQuestion = -1;
const answers = [];
const progressBar = document.getElementById("progress");
const progressDiv = document.getElementById("progress-bar");


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
        animal: "비버",
        description: "신중하고 조직적인 성향",
        animalDescription: `
        비버와 비슷한 성향의 사람들은, 이러한 특징을 가지고 다양한 업무와 상황에서 성공적으로 나아갈 수 있습니다.
        
        논리적: 비버는 문제 해결과 과업 완수를 위해 논리적이고 체계적인 방식으로 작업합니다. 계획적인 성향을 가지며, 일을 철저하게 수행하는 특징이 있습니다.

        조직력: 비버는 환경을 체계적으로 구성하고 유지하는 데 능숙합니다. 그들은 자신의 활동과 자원을 조직적으로 활용하며, 일상적인 일들을 체계적으로 처리합니다.
        
        고민 깊음: 비버는 문제에 대한 깊은 고민을 하며, 대부분의 상황에서 사전에 계획을 세워 문제를 예방하려고 합니다.
        
        근면성실: 비버는 노력하고 꾸준한 노력을 통해 목표를 달성하는 데 진정으로 헌신합니다. 열심히 일하며, 믿음직스럽고 신뢰할 만한 특성을 가지고 있습니다.
        
        사회적이지만 내성적: 비버는 다른 사람과 협력하고 상호작용하는 데 흥미를 가지지만 때로는 조용하고 내성적인 모습을 보일 수 있습니다. 그들은 다른 사람들과 잘 어울리면서도 고요한 시간을 즐깁니다.
        
        자원 절약: 비버는 자원을 절약하고 재활용하는 데 관심을 갖습니다. 이는 환경에 대한 책임감을 나타낼 수도 있습니다.`
    },
    ISFJ: {
        animal: "코끼리",
        description: "따뜻하고 관대한 성향",
        animalDescription: `
        많은 이들이 사회적이며 지능적인 코끼리와 비슷한 사람들의 고유한 성격과 특징을 존중하고 사랑합니다.
        
        지능과 기억력: 코끼리는 매우 지능적이며 탁월한 기억력을 가지고 있습니다. 이들은 긴 시간 동안 중요한 정보나 위치를 기억할 수 있으며, 지적인 동물로 간주됩니다.

        사교성: 코끼리는 무리 지어 생활하며, 사회적 동물로서 상호 작용을 즐깁니다. 무리에서의 관계와 상호작용은 코끼리의 생존에 중요한 역할을 합니다.
        
        돌봄과 보호성: 특히 어린 코끼리들은 어르고 돌봐주는 성격을 가지고 있습니다. 어른 코끼리는 어린 코끼리들을 돌보며 보호합니다.
        
        대인 관계: 코끼리는 각 개체 간의 깊은 유대감을 형성합니다. 특히 가족 구성원 사이에서 강한 유대감과 상호 의존성이 있습니다.
        
        차분한 성향: 코끼리는 보통 차분하고 안정적인 성향을 가지고 있습니다. 이로 인해 냉정하게 상황을 판단하고 결정을 내릴 수 있습니다.
        
        포용적인 특징: 코끼리는 다른 동물들과 다양한 종류의 환경과 생태계에서 공존할 수 있습니다. 이로 인해 코끼리는 통합과 조화를 상징하는 동물로 간주됩니다.
        
        지속적인 학습: 코끼리는 새로운 것을 배우고 적응하는 데 뛰어납니다. 새로운 환경이나 상황에서도 빠르게 적응하며, 학습능력이 높습니다.
        
        온화한 성향: 코끼리는 일반적으로 온화하고 공격적이지 않습니다. 그러나 가족이나 무리를 보호할 때에는 강한 방어적 성향을 보일 수 있습니다.`
    },
    INFJ: {
        animal: "늑대",
        description: "이해심 깊고 예지력 있는 성향",
        animalDescription: `
        사회적이고 협력적인 성격을 가진 늑대와 비슷한 성향의 사람들은, 모임에서 타인과 상호 작용에 탁월하며 매우 독특하고 흥미로운 성향을 보입니다.
        
        무리 지어 생활: 늑대는 주로 무리를 이루어 생활하는 사회적 동물입니다. 무리에서의 협력과 상호작용이 중요하며, 무리의 구성원 간의 강한 유대감이 있습니다.

        지능과 전략성: 늑대는 지능적이고 전략적인 동물로 간주됩니다. 사냥 시 전략을 짜고 협력하여 사냥을 성공시키는 데 뛰어납니다.
        
        가족 중심성: 늑대의 무리는 가족 중심으로 구성되며, 가족 구성원 간의 강한 유대감이 있습니다. 부모 늑대는 어린 늑대를 돌봐주고 보호합니다.
        
        포용적인 성향: 늑대는 다른 무리원이나 종에 대해 포용적인 성향을 가질 수 있습니다. 다양한 환경과 동물들과 공존할 수 있습니다.
        
        리더십과 계층성: 늑대 무리에는 계층적인 구조가 있으며, 지도자 역할을 하는 "알파" 늑대가 존재합니다. 알파 늑대는 무리의 안전과 효율적인 조직을 담당합니다.
        
        책임감: 늑대는 무리와 가족을 위해 책임을 지는 성향을 가집니다. 어린 늑대들을 돌봐주고 가족 구성원을 보호합니다.
        
        사냥과 협력: 늑대는 사냥 시 무리 내에서 협력하고 팀워크를 보이며 효과적인 사냥을 수행합니다. 이들은 사냥 시 전략적으로 대상을 공격하고 사육합니다.
        
        의사 소통: 늑대는 다양한 음성과 시각적 신호를 사용하여 무리원끼리 의사 소통을 합니다. 의사 소통은 무리의 조직과 협력에 중요한 역할을 합니다.`
    },
    INTJ: {
        animal: "부엉이",
        description: "분석적이고 지적인 성향",
        animalDescription: `
        부엉이는 지혜와 조용함의 상징적인 동물입니다.
        
        지혜와 지식: 부엉이는 그들의 지혜와 지식으로 알려져 있습니다. 이들은 주로 밤에 활동하며, 어두운 환경에서도 잘 봅니다. 이로 인해 지혜와 순발력을 상징하는 동물로 간주됩니다.

        고요함과 조용함: 부엉이는 조용한 동물로 알려져 있습니다. 이들은 주로 무엇을 깊이 생각하고 관찰하는 데 많은 시간을 할애합니다.
        
        독립성: 부엉이는 독립적인 성향을 가집니다. 이들은 대부분 혼자 사는 경향이 있으며, 자신만의 영역을 지키려고 합니다.
        
        분석과 관찰: 부엉이는 주로 사물을 세심하게 분석하고 관찰합니다. 이들은 작은 세부사항에 주의를 기울이며, 문제를 해결하기 위해 논리적으로 생각합니다.
        
        대담함: 부엉이는 주로 밤에 활동하며, 어두운 환경에서 다른 동물들보다 뛰어난 시각을 가지고 있습니다. 이로 인해 어두운 밤에 대담하게 사냥을 합니다.
        
        고립과 고요함을 존중: 부엉이는 다른 동물들과의 교류를 피하며, 평온하고 고요한 환경을 선호합니다. 이로 인해 고요함과 평온을 중시하는 동물로 간주됩니다.
        
        절제된 표현: 부엉이는 주로 절제된 표현을 가집니다. 이들은 다른 동물들과의 소통을 최소한으로 유지하며, 필요할 때만 음성을 내기도 합니다.`
    },
    ISTP: {
        animal: "치타",
        description: "모험적이고 민첩한 성향",
        animalDescription: `
        빠른 속도와 사냥 능력으로 유명한 치타의 특징을 가진 사람들은 독립적이고 효율적인 생활 방식을 가지고 있으며, 그 민첩성과 빠른 속도는 많은 사람들에게 놀라움을 줍니다.
        
        민첩함과 빠름: 치타는 뛰어난 민첩성을 가지고 있으며, 랜달리 속력을 내어 매우 빠르게 달릴 수 있습니다. 이 빠른 속도로 사냥을 하는 데 특화되어 있습니다.

        독립성: 치타는 주로 혼자 사는 성향을 가집니다. 이들은 대부분 혼자 사냥하며, 자신만의 영역을 지키려고 합니다.
        
        사냥의 전문가: 치타는 뛰어난 사냥 기술을 가지고 있으며, 랜달리 속력을 이용하여 빠르게 먹잇감을 추격합니다. 이들은 주로 고기를 사냥하며, 사냥에 성공하면 빠르게 먹습니다.
        
        조용함: 치타는 조용한 동물로 알려져 있습니다. 이들은 사냥 시 소음을 최소화하고 높은 경쾌함을 유지합니다.
        
        포용적인 성향: 치타는 다른 동물들과의 교류를 피하지는 않지만, 주로 혼자 먹이를 찾으려는 경향이 있습니다.
        
        변화와 민첩성: 치타는 변화에 대한 적응력이 뛰어나며, 갑작스러운 상황에 빠르게 대처할 수 있습니다.`
    },
    ISFP: {
        animal: "돌고래",
        description: "활발하고 사교적인 성향",
        animalDescription: `
        친근하고 사교적인 동물인 돌고래와 비슷한 사람들은, 그들의 지능과 즐거운 성격으로 인해 많은 사람들에게 인기를 끌어당깁니다.
        
        사교적: 돌고래는 매우 사교적이고 사람을 좋아합니다. 그들은 무리를 이루어 생활하며, 상호작용과 소통을 즐깁니다.

        지능: 돌고래는 동물 중에서 가장 높은 지능을 가진 동물 중 하나로 알려져 있습니다. 그들은 문제 해결 능력이 뛰어나며, 새로운 무리원과 상황에 빠르게 적응할 수 있습니다.
        
        재미와 놀이: 돌고래는 놀기를 좋아합니다. 그들은 물에서 놀이를 즐기며, 물 밖에서도 사람들과 놀이를 즐깁니다. 이로 인해 돌고래는 종종 기쁨과 재미의 상징으로 간주됩니다.
        
        친절함: 돌고래는 일반적으로 친절하며 사람들과의 상호작용을 원합니다. 그들은 주변의 사람들에게 상대방을 즐겁게 하고 돕는 데 관심을 가집니다.
        
        소통: 돌고래는 복잡한 음성과 몸짓으로 소통합니다. 그들은 무리원끼리 정보를 공유하고 다른 돌고래와 상호작용하기 위해 음성과 몸짓을 사용합니다.
        
        공동체 의식: 돌고래는 공동체 의식을 가집니다. 그들은 무리원을 돕고 보호하며, 상호간의 도움과 협력을 중시합니다.
        
        재능: 돌고래는 수영과 점프, 도티, 물 밖에서의 다양한 묘기를 통해 자신의 재능을 뽐낼 수 있습니다.
        
        민첩성: 돌고래는 물속에서 매우 민첩하게 움직입니다. 그들은 특히 물 아래에서 빠른 행동과 뛰어난 수영 능력을 보입니다.`
    },
    INFP: {
        animal: "나비",
        description: "창의적이고 낙관적인 성향",
        animalDescription: `
        나비와 비슷한 성향의 사람들은, 미적인 감각이 뛰어나며 변화에 유연합니다. 많은 사람들에게 긍정적인 영향을 주곤 합니다.
        
        자유로움과 변화: 나비는 자유로움과 변화의 상징으로 여겨집니다. 그들은 번영과 성장을 상징하며, 변화와 변신을 표현하는 동물로 간주됩니다.

        낙천주의: 나비는 일반적으로 낙천주의적이고 긍정적인 상징입니다. 그들은 어두운 상황에서도 긍정적으로 변화와 성장을 받아들이는 모습을 보입니다.
        
        아름다움과 다양성: 나비는 그들의 아름다움과 다양성으로 알려져 있습니다. 다양한 종류의 나비가 존재하며, 그들의 아름다운 날개 무늬와 색상은 많은 사람들을 매혹시킵니다.
        
        경이로움: 나비의 변신 과정은 많은 사람들에게 경이로움을 불러일으킵니다. 유충에서 번데기로, 그리고 성충으로의 변신은 생명주기의 미라클을 상징합니다.
        
        심볼리즘: 나비는 다양한 문화와 종교에서 중요한 상징으로 사용됩니다. 이들은 변화, 부활, 영적인 성장, 새로운 시작, 자유, 아름다움 등을 나타내는 데 사용됩니다.
        
        여행과 모험: 나비는 종종 여행과 모험을 상징합니다. 그들의 날개를 펴고 새로운 지역으로 날아가는 것은 모험과 자유를 상징하는 행동으로 여겨집니다.
        
        생명 주기: 나비는 생명 주기의 다양한 단계를 통해 성장하고 변화합니다. 이러한 생명 주기는 새로운 시작과 성장을 상징하는데 사용됩니다.`
    },
    INTP: {
        animal: "여우",
        description: "독립적이고 명민한 성향",
        animalDescription: `
        여우와 비슷한 성향의 사람들은 지능적으로 뛰어나며 다양한 사람들에게 중요한 역할을 하곤 합니다.
        
        교활함과 지능: 여우는 뛰어난 지능과 교활함으로 유명합니다. 그들은 문제를 해결하고 생존하기 위해 지능적인 전략을 사용합니다.

        독립성: 여우는 주로 혼자 사는 경향이 있습니다. 이들은 자신만의 영역을 지키며 독립적으로 먹이를 찾습니다.
        
        신중함: 여우는 신중하게 행동하며, 사냥 시에도 조용하고 순박하게 움직입니다. 이들은 흔적을 지우고 자신의 존재를 숨기기 위해 노력합니다.
        
        재치와 농담: 여우는 종종 재치 있고 농담을 좋아합니다. 그들은 다른 동물들과 농담하거나 상황에 맞는 행동을 합니다.
        
        신중한 사고: 여우는 신중한 사고를 가지고 있으며, 문제를 해결하기 위해 여러 가능한 방법을 고려합니다.
        
        민첩성: 여우는 빠른 속도로 움직일 수 있으며, 사냥 시에는 민첩하게 움직여 먹잇감을 잡습니다.
        
        사회성: 여우는 종종 두 마리로 무리를 이루어 생활하며, 가족 관계가 중요하게 여겨집니다.
        
        부정적인 이미지: 여우는 종종 음모와 교활함의 상징으로 인식되기도 합니다. 이는 이야기나 전설에서 나타나는 흔한 모티프 중 하나입니다.`
    },
    ESTP: {
        animal: "매",
        description: "대담하고 화끈한 성향",
        animalDescription: `
        매와 비슷한 성향의 사람들은 뛰어난 능력과 독립적인 성향을 보입니다. 그들의 미덕, 용기, 그리고 자주성으로 인해 다양한 사람들로부터 존경받습니다.
        
        독립성과 자주성: 매는 주로 독립적이며 자주적인 동물로 알려져 있습니다. 이들은 자신만의 영역을 유지하며, 혼자 사냥하고 먹이를 찾습니다.

        날개의 힘: 매는 강력한 날개와 날기 능력을 가지고 있습니다. 이들은 높은 곳에서 날아다니며 사냥을 하거나 지역을 순찰합니다.
        
        집중력과 빠른 반응: 매는 사냥 시에 뛰어난 집중력과 빠른 반응 속도를 가집니다. 이로 인해 먹이를 놓치지 않고 성공적으로 사냥을 합니다.
        
        냉정함: 매는 냉정하고 차분한 성향을 가집니다. 이들은 사냥 시에 감정을 통제하고 계획적으로 행동합니다.
        
        호흡과 민첩성: 매는 뛰어난 호흡 능력과 민첩성을 가지고 있습니다. 이로 인해 긴 비행 시간 동안도 활발하게 활동할 수 있습니다.
        
        사회적 구조: 일부 매들은 무리를 이루어 생활하며, 가족 구조를 형성합니다. 이러한 무리 구조에서는 협력과 상호작용이 중요합니다.
        
        예민함과 경계심: 매는 주변 환경에 대한 예민성을 가지고 있으며, 경계심이 강합니다. 이는 위험을 감지하고 방어하는 데 도움이 됩니다.
        
        통찰력: 매는 상황을 판단하고 먹이의 행동을 예측하는 데 뛰어난 통찰력을 가집니다.`
    },
    ESFP: {
        animal: "강아지",
        description: "친절하고 활기찬 성향",
        animalDescription: `
        강아지와 비슷한 성향의 사람들은 대체로 친화력이 좋고 신뢰감을 주며 다정한 성향을 보입니다.
        
        충성심과 애정: 강아지는 주인에게 대단히 충실하고 애정적인 동물로 알려져 있습니다. 그들은 주인과의 교감과 상호작용을 즐깁니다.

        친화력: 대부분의 강아지는 친화력이 뛰어나며, 다른 사람과 다른 동물과의 상호작용을 원합니다.
        
        재미와 활발함: 강아지는 놀기를 좋아하고 활발한 성격을 가질 수 있습니다. 그들은 놀이와 활동을 통해 에너지를 발산하며, 주인과 놀이를 즐깁니다.
        
        보호 본능: 강아지는 주인과 주인의 가족을 보호하려는 본능을 가질 수 있습니다. 이로 인해 가정에서 경고음을 내거나 방어적인 행동을 할 수 있습니다.
        
        훈련 가능성: 대부분의 강아지는 훈련 가능성이 높으며, 기본적인 명령을 배울 수 있습니다. 훈련은 강아지의 행동과 사회화에 중요한 역할을 합니다.
        
        호기심: 강아지는 호기심이 많습니다. 그들은 주변 환경을 탐구하고 새로운 냄새, 소리 및 경험을 즐깁니다.
        
        허기: 강아지는 식사 시간을 중요하게 여깁니다. 그들은 정기적인 식사 및 물 공급이 필요합니다.
        
        신뢰: 강아지는 주인에 대한 신뢰를 가집니다. 주인의 지원과 사랑을 받는 것을 중요하게 여깁니다.
        
        애정과 다정함: 강아지는 다른 동물과 사람에 대한 애정과 다정한 성향을 가질 수 있습니다.`
    },
    ENFP: {
        animal: "공작새",
        description: "화려하고 자유로운 성향",
        animalDescription: `
        공작새와 비슷한 성향의 사람들은 아름다운 외모와 자신감 넘치는 행동을 보입니다.
        
        아름다움과 자신감: 공작새는 그들의 아름다운 깃털과 고요한 걷기로 인해 자신감과 미감이 묻어나는 동물로 알려져 있습니다. 그들은 자신의 외모에 대한 자부심을 가질 수 있습니다.
        
        사교성: 공작새는 다른 새나 동물들과의 상호작용을 즐깁니다. 그들은 사냥 시에도 다른 공작새와 함께 활동하기를 선호할 수 있습니다.
        
        길냥이: 공작새는 종종 걸어다니는 모습이 고양이처럼 보이며, 길게 늘어진 다리와 자신감 넘치는 걸음걸이가 특징입니다.
        
        소리지르기: 공작새는 자주 소리를 지르며, 높은 소리로 특정 지역을 지키는 데 사용합니다.
        
        관심을 끌기: 공작새는 그들의 아름다운 깃털과 허풍부리는 행동으로 주변의 관심을 끌기를 좋아합니다. 이를 통해 파트너를 유혹하고 먹잇감을 눈치채게 합니다.
        
        뛰어난 모성: 공작새의 암컷은 보금자리를 만들고 거기서 알을 풂으로써 뛰어난 모성을 보입니다. 알과 새끼를 보호하기 위해 노력합니다.
        
        영역성: 공작새는 특정 지역을 지키기 위해 무릎근간한 행동을 할 수 있으며, 경계를 확실히 설정합니다.`
    },
    ENTP: {
        animal: "문어",
        description: "혁신적이고 다재다능한 성향",
        animalDescription: `
        문어와 비슷한 성향의 사람들은 독특한 성향과 행동 양식으로 주변 사람들에게 흥미를 일으킵니다.
        
        지능과 학습능력: 문어는 높은 지능을 가진 동물로 알려져 있습니다. 그들은 다양한 과제를 해결하고 환경에 적응하는 데 뛰어난 학습능력을 보입니다.
        
        신중한 행동: 문어는 신중하게 움직이며, 먹이를 사냥하거나 환경에서 잠복합니다. 그들은 대부분의 상황에서 조용하고 신중한 행동을 취합니다.
        
        뛰어난 민첩성: 문어는 수중에서 뛰어난 민첩성을 가집니다. 그들은 바다나 해양 환경에서 유연하게 움직일 수 있습니다.
        
        사회성: 일부 문어는 다른 문어와 함께 무리를 이루어 생활하며, 상호작용과 소통을 즐깁니다.
        
        용의성: 문어는 주변 환경을 감지하고 필요할 때 숨을 수 있습니다. 이러한 방어 메커니즘은 위험을 피하고 생존을 보호하는 데 도움이 됩니다.
        
        고집과 호기심: 문어는 종종 고집스럽고 호기심이 많습니다. 새로운 환경을 탐험하거나 다른 동물과 상호작용하기를 좋아합니다.
        
        적응력: 문어는 몸을 다양한 방법으로 구부리고 동글거리며 환경에 적응합니다. 이는 먹이를 잡거나 숨을 때 사용됩니다.`
    },
    ESTJ: {
        animal: "사자",
        description: "단호하고 리더십이 강한 성향",
        animalDescription: `
        사자와 비슷한 성향의 사람들은 대체로 무리 생활과 협동 행동을 강조합니다.
        
        자신감과 힘: 사자는 강하고 자신감 넘치는 동물로 알려져 있습니다. 그들은 사파리의 군주로 자신을 자랑스럽게 여깁니다.

        사교성: 사자들은 무리를 이루어 생활하며 사회적 동물입니다. 그들은 무리의 일원으로서 협력하며 사냥하고 쉬는 시간을 보냅니다.
        
        팀 플레이: 사자 무리는 팀 플레이를 중요시하며 사냥 시에 협동하여 큰 사냥감을 잡습니다. 이들은 서로의 역할을 이해하고 협력합니다.
        
        보호 본능: 특히 암사자는 어린 사자들을 보호하며 무리 안에서 안전을 유지합니다. 이러한 보호 본능은 무리의 생존을 보장합니다.
        
        지적 호기심: 사자는 호기심이 많은 동물로, 주변 환경을 탐험하고 새로운 것을 배우려고 합니다.
        
        휴식과 게으름: 사자는 헤비웨이트 챔피언 중 하나로 알려져 있으며, 쉬는 시간을 중요시합니다. 그들은 일일 생활에서 대다수의 시간을 휴식과 수면에 할애합니다.
        
        높은 소리: 사자는 강렬하고 길게 울음소리를 내며, 이는 무리원들 간의 소통과 영토 주장을 위한 소리로 사용됩니다.
        
        높은 사회적 계급: 사자 무리 안에서는 계급이 형성되며, 주인과 암사자는 상대적으로 높은 지위를 가집니다.
        
        영토적 행동: 사자는 자신의 영토를 지키기 위해 활동하며, 다른 무리나 동물을 허용하지 않을 수 있습니다.`
    },
    ESFJ: {
        animal: "백조",
        description: "차분하고 다정한 성향",
        animalDescription: `
        백조와 비슷한 성향의 사람들은 우아하고 아름다운 외모와 고요한 성격으로 많은 이들에게 감동을 주곤 합니다. 
        
        우아함과 아름다움: 백조는 그들의 우아한 몸집과 아름다운 깃털로 유명합니다. 그들은 물 위에서 우아한 움직임을 보이며 아름다운 노래를 부립니다.

        고요함: 백조는 종종 고요하고 조용한 동물로 알려져 있습니다. 그들의 움직임은 우아하면서 차분합니다.
        
        사회성: 백조는 다른 백조와 함께 무리를 이루어 생활하며, 종족 별로 무리를 이룰 때가 많습니다.
        
        가족 중심: 백조는 가족 중심의 동물로 알려져 있습니다. 일부 백조는 수많은 연례적인 이민을 통해 이사하며, 가족 단위로 생활합니다.
        
        반응성: 백조는 주변 환경에 대한 민감한 반응을 보이며, 위험을 감지하면 신속하게 반응합니다.
        
        낮선 이들과 조우: 백조는 종종 다른 동물과 만날 때 무심하게 대응합니다. 그러나 무리의 안전을 위해 위협이 된다면 방어적으로 행동할 수 있습니다.
        
        물고기와 식물을 주로 먹음: 백조는 주로 물고기와 수생 식물을 먹으며, 물에서 먹이를 찾아 먹습니다.
        
        무리 속에서 서로 도우며 지냄: 백조 무리에서는 서로 돕고 보호하는 행동을 보입니다. 특히 어린 백조에 대한 보호가 강조됩니다.

        장수와 길이: 백조는 장수와 길이로 알려져 있으며, 노년까지 살 수 있습니다.`
    },
    ENFJ: {
        animal: "말",
        description: "사회적이고 동정심 많은 성향",
        animalDescription: `
        말의 성격과 비슷한 유형의 사람들은, 대체로 다재다능한 편으로 커뮤니케이션에도 능한 편입니다.

        지능과 학습능력: 말은 지능이 높고 학습 능력이 뛰어납니다. 그들은 새로운 명령을 배우고 다양한 작업을 수행할 수 있습니다.

        충성심: 말은 주인에 대한 충성심이 강하며, 그들과의 강한 유대감을 형성합니다. 이는 인간과 말 사이의 긴밀한 관계를 이끌어냅니다.
        
        용기와 힘: 말은 강력하고 용감한 동물로, 어려운 환경에서도 힘을 발휘합니다. 그들은 특히 기타 스포츠 및 경주 활동에서 활용됩니다.
        
        사회성: 말은 다른 말과의 사회적 상호작용을 즐깁니다. 말무리에서 서로 놀고 경쟁하며 소통합니다.
        
        집단 행동: 말은 집단 행동을 좋아합니다. 말무리에서는 서로를 지원하고 보호하며, 특히 자연 환경에서의 생존에 필요한 팀 플레이를 합니다.
        
        소통: 말은 몸집과 목소리를 통해 감정을 표현하며, 주인이나 다른 말과의 상호작용을 통해 소통합니다.
        
        반려 동물: 일부 말은 반려 동물로서 채용되며, 그들은 가족과 함께 시간을 보내고 취미로 승마를 즐깁니다.
        
        자립성: 말은 자립성이 높은 동물로, 먹이를 찾고 무리 내에서 살아남을 능력이 강합니다.`
    },
    ENTJ: {
        animal: "독수리",
        description: "목표지향적이고 지도력이 강한 성향",
        animalDescription: `
        독수리 성격을 닮은 사람들은, 그들의 용맹함과 뛰어난 능력으로 주목받으며 무리에서 높은 지위에 있을 가능성이 높습니다.
        
        용맹과 힘: 독수리는 용맹스럽고 강력한 동물로 알려져 있습니다. 그들은 높은 고도에서 빠른 속도로 사냥을 하며, 큰 먹이를 잡아먹습니다.

        높은 지능: 독수리는 지능이 뛰어나며, 사냥과 생존을 위한 전략적 사고를 가집니다.
        
        독립성: 독수리는 대개 혼자 사냥하며, 독립성을 높이 갖추고 있습니다.
        
        높은 비행 능력: 독수리는 높은 고도에서 날아다니며, 멀리 있는 먹이를 찾아내고 사냥합니다.
        
        영토 주장: 독수리는 자신의 영토를 주장하며, 다른 독수리나 동물을 영역에서 쫓아냅니다.
        
        소중한 가족: 독수리는 가족을 소중히 여기며, 파트너와 자녀를 보호하고 양육합니다.
        
        고요하고 신중한 행동: 독수리는 주로 고요하고 조용한 행동을 취하며, 먹이를 노릴 때 몸을 낮추고 신중하게 접근합니다.
        
        높은 관찰력: 독수리는 주변 환경을 주의 깊게 관찰하며, 먹이와 위험을 신속하게 감지합니다.
        
        앞서가는 사회적 지위: 일부 독수리는 다른 독수리나 조류와의 상호작용에서 높은 사회적 지위를 유지합니다.
        
        전략적 사냥: 독수리는 먹이를 사냥할 때 전략적으로 접근하며, 먹이의 약점을 파악합니다.`
    }
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
    // result 가 있을경우 canonical url 에 추가
    var uC = document.querySelector("link[rel='canonical']");
    var newURL = window.location.href.split("#")[0];
    uC.setAttribute("href", newURL);

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
    const resultTitleMsg = "테스트 결과: " + resultMbti;
    resultTitle.textContent = resultTitleMsg;
    resultDesc.textContent = resultVal.description;
    let date = Date.now();
    gtag('event', "MBTI결과", {'event_category': '테스트결과', 'mbti': resultMbti, 'time': date});
    

    resultAnimalDesc.textContent = resultVal.animalDescription;
    let similarItem = similarItems[result];
    let goodItems = similarItem["GOOD"].map(o => results[o].animal).join(", ");
    let badItems = similarItem["BAD"].map(o => results[o].animal).join(", ");
    resultGood.textContent = "당신과 잘 맞는 동물: " + goodItems;
    resultBad.textContent = "잘 맞지 않는 동물: " +badItems;
    updateProgressBar(1);
    // nextButton.style.display = "none";
    // backButton.style.display = "none";
    // resultSection.scrollIntoView(true);
}


function updateProgressBar(progress = 0) {
    if (progress == 0) {
        progress = ((currentQuestion + 1) / questions.length) * 100;
    }
    progressBar.style.width = `${progress}%`;
    if (progress > 0) {
        progressDiv.style.display = "inline";
        startSection.style.display = "none";
        questionSection.style.display = "inline";
        if (progress == 1) {
            progressDiv.style.display = "none";
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


Kakao.init('2949227d164a7f67c415b0770a7a0d2f');

// Get the value of the 'result' parameter
const resultParam = getUrlParameter('result');

// Replace content based on the value of 'result' parameter
if (resultParam) {

    showResults(resultParam);

    Kakao.Share.createCustomButton({
        container: '#shareKt1',
        templateId: 100198, // 나의 앱 ID 작성
        templateArgs: {
            'result_url': "?result=" + resultParam,
            'result': ": " + results[resultParam].animal + "(" + resultParam + ")",
        }
    });
} else {
    Kakao.Share.createCustomButton({
        container: '#shareKt1',
        templateId: 100198, // 나의 앱 ID 작성
      });
}