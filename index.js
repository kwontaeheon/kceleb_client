
// const compressor = require('./compression.js');
const apiUrl = "http://celebme.duckdns.org:8181"

// 닮은 셀럽 목록 변수
var similarIdolData;
// 얼굴 분석 변수
var faceData;
const faceNames = {
  "1": "BTS RM",
  "2": "BTS 뷔",
  "3": "BTS 진",
  "4": "BTS 슈가",
  "5": "BTS 정국",
  "6": "BTS 지민",
  "7": "BTS 제이홉",
  "8": "EXO 첸",
  "9": "EXO 디오",
  "10": "EXO 레이",
  "11": "EXO 백현",
  "12": "EXO 세훈",
  "13": "EXO 수호",
  "14": "EXO 찬열",
  "15": "EXO 카이",
  "16": "EXO 시우민",
  "17": "NCT 런쥔",
  "18": "NCT 마크",
  "19": "NCT 재민",
  "20": "NCT 재현",
  "21": "NCT 제노",
  "22": "NCT 지성",
  "23": "NCT 천러",
  "24": "NCT 해찬",
  "25": "공유",
  "26": "규현",
  "27": "로운",
  "28": "송강",
  "29": "영탁",
  "30": "태연",
  "31": "강혜원",
  "32": "강호동",
  "33": "고윤정",
  "34": "공효진",
  "35": "김남길",
  "36": "김민재",
  "37": "김연아",
  "38": "김유정",
  "39": "김종국",
  "40": "김종민",
  "41": "김태리",
  "42": "김혜수",
  "43": "김호중",
  "44": "남궁민",
  "45": "류준열",
  "46": "류현진",
  "47": "마동석",
  "48": "박나래",
  "49": "박보영",
  "50": "박서준",
  "51": "박은빈",
  "52": "박지성",
  "53": "박지현",
  "54": "박진영",
  "55": "배인혁",
  "56": "백종원",
  "57": "비투비",
  "58": "서인국",
  "59": "서장훈",
  "60": "성시경",
  "61": "손흥민",
  "62": "송가인",
  "63": "송지효",
  "64": "송하윤",
  "65": "신동엽",
  "66": "신혜선",
  "67": "아이유",
  "68": "오유진",
  "69": "유연석",
  "70": "유재석",
  "71": "이강인",
  "72": "이대호",
  "73": "이병헌",
  "74": "이성민",
  "75": "이세영",
  "76": "이영애",
  "77": "이이경",
  "78": "이정재",
  "79": "이정후",
  "80": "이제훈",
  "81": "이종석",
  "82": "이찬원",
  "83": "이하늬",
  "84": "이효리",
  "85": "임시완",
  "86": "임영웅",
  "87": "장나라",
  "88": "장민호",
  "89": "장윤정",
  "90": "전현무",
  "91": "정동원",
  "92": "정우성",
  "93": "정해인",
  "94": "조세호",
  "95": "조인성",
  "96": "지창욱",
  "97": "차은우",
  "98": "차태현",
  "99": "최수종",
  "100": "탁재훈",
  "101": "한소희",
  "102": "한효주",
  "103": "황정민",
  "104": "뉴진스 민지",
  "105": "뉴진스 하니",
  "106": "뉴진스 해린",
  "107": "뉴진스 혜인",
  "108": "라이즈 성찬",
  "109": "라이즈 소희",
  "110": "라이즈 승한",
  "111": "라이즈 앤톤",
  "112": "라이즈 원빈",
  "113": "라이즈 은석",
  "114": "아이브 가을",
  "115": "아이브 레이",
  "116": "아이브 리즈",
  "117": "아이브 이서",
  "118": "에스파 닝닝",
  "119": "에스파 윈터",
  "120": "에스파 지젤",
  "121": "엔믹스 규진",
  "122": "엔믹스 릴리",
  "123": "엔믹스 배이",
  "124": "엔믹스 설윤",
  "125": "엔믹스 지니",
  "126": "엔믹스 지우",
  "127": "엔믹스 해원",
  "128": "뉴진스 다니엘",
  "129": "라이즈 쇼타로",
  "130": "아이브 안유진",
  "131": "아이브 장원영",
  "132": "에스파 카리나",
  "133": "강다니엘",
  "134": "더보이즈 뉴",
  "135": "더보이즈 큐",
  "136": "더보이즈 상연",
  "137": "더보이즈 선우",
  "138": "더보이즈 에릭",
  "139": "더보이즈 영훈",
  "140": "더보이즈 주연",
  "141": "더보이즈 케빈",
  "142": "더보이즈 현재",
  "143": "데이식스 성진",
  "144": "데이식스 원필",
  "145": "소녀시대 서현",
  "146": "소녀시대 수영",
  "147": "소녀시대 써니",
  "148": "소녀시대 유리",
  "149": "소녀시대 효연",
  "150": "트와이스 나연",
  "151": "트와이스 다현",
  "152": "트와이스 모모",
  "153": "트와이스 미나",
  "154": "트와이스 사나",
  "155": "트와이스 정연",
  "156": "트와이스 지효",
  "157": "트와이스 쯔위",
  "158": "트와이스 채영",
  "159": "더보이즈 제이콥",
  "160": "더보이즈 주학년",
  "161": "데이식스 영케이",
  "162": "르세라핌 카즈하",
  "163": "르세라핌 허윤진",
  "164": "르세라핌 홍은채",
  "165": "소녀시대 티파니",
  "166": "여자아이들 미연",
  "167": "여자아이들 민니",
  "168": "여자아이들 소연",
  "169": "여자아이들 슈화",
  "170": "여자아이들 우기",
  "171": "스트레이키즈 한",
  "172": "베이비몬스터 라미",
  "173": "베이비몬스터 로라",
  "174": "베이비몬스터 루카",
  "175": "베이비몬스터 아사",
  "176": "베이비몬스터 아현",
  "177": "스트레이키즈 리노",
  "178": "스트레이키즈 방찬",
  "179": "스트레이키즈 승민",
  "180": "스트레이키즈 창빈",
  "181": "스트레이키즈 현진",
  "182": "베이비몬스터 치키타",
  "183": "베이비몬스터 파리타",
  "184": "스트레이키즈 필릭스",
  "185": "비투비 이창섭",
  "186": "세븐틴 준",
  "187": "세븐틴 호시",
  "188": "세븐틴 민규",
  "189": "세븐틴 원우",
  "190": "세븐틴 에스쿱스",
  "191": "블랙핑크 로제",
  "192": "블랙핑크 리사",
  "193": "블랙핑크 제니",
  "194": "블랙핑크 지수"
}

var resultMeta = {
  "man": "남자",
  "woman": "여자",
  "angry": "화남😡",
  "disgust": "싫어함😱",
  "fear": "두려움😨",
  "happy": "행복함🥳",
  "neutral": "무표정🙂",
  "sad": "슬픔😭",
  "surprise": "놀람😳",
  "asian": "아시아인",
  "black": "흑인",
  "indian": "인도인",
  "latino hispanic": "라틴 계열 미국인",
  "middle eastern": "중동인",
  "white": "백인",
}

function getMeta(name) {

  try {
    return resultMeta[name.toLowerCase()];

  } catch (error) {
    console.log(error);
    return name;
  }

}


const jsonContainer = document.getElementById('json-container');
const toggleButton = document.getElementById('toggleButton');
const jsonKeys = Object.keys(faceNames);
jsonKeys.forEach(key => {
  const keyValueContainer = document.createElement('div');
  const keyElement = document.createElement('span');
  const valueElement = document.createElement('span');

  keyElement.classList.add('json-key');
  valueElement.classList.add('json-string');

  keyElement.textContent = `"${key}": `;
  valueElement.textContent = `"${faceNames[key]}"`;

  keyValueContainer.appendChild(keyElement);
  keyValueContainer.appendChild(valueElement);

  jsonContainer.appendChild(keyValueContainer);
});

function toggleCelebList() {
  const x = jsonContainer;
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
// toggleButton.addEventListener('click', function () {
  
// });
$(".result-message").hide();



function cropImage(imgElement, callback, maxWidth = 512, maxHeight = 512) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = imgElement;

  const aspectRatio = img.naturalWidth / img.naturalHeight;
  let newWidth = maxWidth;
  let newHeight = maxHeight;

  if (aspectRatio > 1) {
    newHeight = Math.min(maxHeight, img.naturalHeight);
    newWidth = newHeight * aspectRatio;
  } else {
    newWidth = Math.min(maxWidth, img.naturalWidth);
    newHeight = newWidth / aspectRatio;
  }

  canvas.width = maxWidth;
  canvas.height = maxHeight;
  ctx.drawImage(img, (maxWidth - newWidth) / 2, (maxHeight - newHeight) / 2, newWidth, newHeight);

  canvas.toBlob(function (blob) {
    callback(blob);
  }, 'image/webp');
}

var ageChart, emotionChart, genderChart, raceChart;
function drawChart(userData) {

  const autocolors = window['chartjs-plugin-autocolors'];


  Chart.register(autocolors);
  Chart.defaults.font.size = 14;
  // Chart.register(ChartDataLabels);
  $("#face-analysis-result").html(
    "사진 속 얼굴은 " + getMeta(userData.dominant_race) + ", <br/>" 
    + "나이 " + userData.age + " 세 " + getMeta(userData.dominant_gender) + ", "
    + getMeta(userData.dominant_emotion) + " 으로 보입니다.<br/>"

    
  )

  const ageData = {
    labels: ["나이"],
    datasets: [{
      label: '나이',
      data: [userData.age],
      backgroundColor: ['#11BB84']
    }]
  };
  if (ageChart != null) {
    ageChart.destroy();
  }
  ageChart = new Chart(document.getElementById('ageChart'), {
    type: 'bar',
    data: ageData,
    plugins: [ChartDataLabels],
    options: {
      maintainAspectRatio: false,
      // indexAxis: 'y',
      plugins: {
        // autocolors: {
        //   mode: 'label'
        // },
        legend: {
          display: false,
        }
      }
    }
  });


  console.log(Object.keys(userData.gender));
  console.log(Object.keys(userData.gender).flatMap(value => { return getMeta(value); }));
  // Display gender in pie chart
  const genderData = {
    labels: Object.keys(userData.gender).flatMap(value => {
      return getMeta(value);
    }),
    datasets: [{
      label: '성별',
      maintainAspectRatio: false,
      data: Object.values(userData.gender),
      backgroundColor: ['#36A2EB', '#FF6384']
    }]
  };

  if (genderChart != null) {
    genderChart.destroy();
  }
  genderChart = new Chart(document.getElementById('genderChart'), {
    type: 'bar',
    data: genderData,
    plugins: [ChartDataLabels],
    options: {
      maintainAspectRatio: false,
      plugins: {
        autocolors: {
          mode: 'data'
        },
        datalabels: {
          formatter: function (value, context) {
            console.log(value);//context.chart.data.labels[context.dataIndex]
            return value.toFixed(1);
          }
        },
        legend: {
          display: false,
        }
      },
    }
  });

  // Display emotion in radar chart
  const emotionData = {
    labels: Object.keys(userData.emotion).flatMap(value => {
      return getMeta(value);
    }),
    datasets: [{
      label: '감정',
      data: Object.values(userData.emotion),
      hoverOffset: 50,
      borderWidth: 0,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(125, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 135)',
        'rgb(255, 205, 86)',
        'rgb(125, 125, 86)',
        'rgb(225, 125, 86)',
      ],
      circumference: 180,
      rotation: 90
    }],
    
  };

  if (emotionChart != null) {
    emotionChart.destroy();
  }
  emotionChart = new Chart(document.getElementById('emotionChart'), {
    type: 'doughnut',
    data: emotionData,
    options: {
      indexAxis: 'y',
      maintainAspectRatio: false,
      plugins: {
        autocolors: {
          mode: 'data'
        },
        datalabels: {
          formatter: function (value, context) {
            console.log(value); //context.chart.data.labels[context.dataIndex]
            return context.chart.data.labels[context.dataIndex] + ": " + value.toFixed(1);
          }
        },
        legend: {
          display: true,
          position: 'bottom'
        }
      },
    }
  });

  // Display race in radar chart
  const raceData = {
    labels: Object.keys(userData.race).flatMap(value => {
      return getMeta(value);
    }),
    datasets: [{
      label: '인종',
      data: Object.values(userData.race),
      hoverOffset: 50,
      borderWidth: 0,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(125, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 135)',
        'rgb(255, 205, 86)',
        'rgb(125, 125, 86)'
      ],
      circumference: 180,
      rotation: -90
    }]
  };
  if (raceChart != null) {
    raceChart.destroy();
  }
  raceChart = new Chart(document.getElementById('raceChart'), {
    type: 'doughnut',
    data: raceData,
    options: {
      // indexAxis: 'y',
      maintainAspectRatio: false,
      plugins: {
        
        autocolors: {
          mode: 'data'
        },
        datalabels: {
          formatter: function (value, context) {
            console.log(value);//context.chart.data.labels[context.dataIndex]
            return  context.chart.data.labels[context.dataIndex] + ": " + value.toFixed(1);
          }
        },
        legend: {
          display: true
        }
      },

    }
  });
}

async function analyzeFace(inputImage) {
  const formData = new FormData();
  formData.append("img", inputImage); // Adjust file type as needed
  return await fetch(apiUrl + '/analyze', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data here
      console.log("analyze");
      console.log(data);
      faceData = data;
      drawChart(data);

    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
    });

}


async function getSimilarCeleb(inputImage) {
  const formData = new FormData();
  formData.append("img", inputImage); // Adjust file type as needed

  return await fetch(apiUrl + '/find', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data here
      console.log(data);
      similarIdolData = data;
      for (var rank = 0; rank < 10; rank++) {
        similarIdolData[rank].identity = faceNames[similarIdolData[rank].identity];
      }
      displayIdolPredictionBriefly(data);
      // displayIdolPrediction(1);
      
      updateKakaoLink();
      $(".try-again-btn").show();
      $(".result-message").show();
      $("#loading").hide();
      // window.history.replaceState({}, document.title, "/");
      $("html, body").scrollTop(
        document.getElementsByClassName("title")[0].offsetTop
      );

    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
    });

}
function displayIdolPredictionBriefly(data) {
  $("#result-similar-idol").show();
  for (var rank = 1; rank <= 10; rank++) {
    try {
      const r = data[rank - 1].identity ; // .split("/")[1]]
     
      // $('#fr' + rank).html(r+ ": " +  ((1 - data[rank - 1].distance) * 100).toFixed(1) + "%");
      $('#r' + rank).html(r + ": " + ((1 - data[rank - 1].distance) * 100).toFixed(1) + "% 🔍");

      $('#search' + rank).hide();
      // $('#s' + rank).show();
      if (rank == 1) {
        displayIdolPrediction(1);
        $('#celeb-result').html("사진 속 얼굴이 " + r + " 을(를) 가장 닮았어요." + "<br/><br/>"
        // + "셀럽 이름을 눌러서 이미지를 검색해보세요. <br/><br/>" 
        )
      }
    } catch (error) {
      console.log(error);
    }
  }


}

function displayIdolPrediction(rank) {
  data = similarIdolData;

  // console.log(data);
  const r = data[rank - 1].identity; // .split("/")[1]];
  try {
    if ($('#search' + rank).is(":visible")) {
      $('#search' + rank).hide();
      $('#r' + rank).html(r + ": " + ((1 - data[rank - 1].distance) * 100).toFixed(1) + "% 🔍");
    }
    else {
      
      console.log(r);
      q = 'allintitle:"' + r + '"';

      var element = google.search.cse.element.getElement('q' + rank);
      element.execute(q);
      $('#search' + rank).show();
      $('#r' + rank).html(r + ": " + ((1 - data[rank - 1].distance) * 100).toFixed(1) + "% _");
      
      // window.history.replaceState({}, document.title, "/");
      window.history.replaceState({}, document.title, getBaseUrl());

      gtag("event", "similar_idol_result", {
        celeb: r.replaceAll(" ", ""),
        rank: rank
      });
      gtag("event", r.replaceAll(" ", ""), {
        event_category: "similar_idol_result",
        rank: rank,
        result_face: true,
      });
    }

  } catch (error) {
    console.log(error);
  }


}

/**
  Displays Similar idol name from model prediction
*/
// async function predict() {

//   displayIdolPrediction(valuesArr, namesArr);
// }

async function loadImage(url, elem) {
  return new Promise(function (resolve, reject) {
    elem.onload = function () {
      resolve(elem);
    };
    elem.src = url;
  });
}
async function readURL(input) {
  if (input.files && input.files[0]) {
    $(".try-again-btn").hide();

    gtag("event", "AI호출시작", {
      event_category: "AI호출시작",
    });
    var reader = new FileReader();
    reader.onload = function (e) {
      $(".image-upload-wrap").hide();
      var imgData = e.target.result;
      $("#face-image").attr("src", imgData);
      $("#title").html(input.files[0].name);
    };
    await reader.readAsDataURL(input.files[0]);
    $(".file-upload-content").show();
    $("#loading-message").html("얼굴을 분석하고 있어요.")
    $("#loading").show();
    $(".result-message").hide();
    $("#result-similar-idol").hide();
    document.getElementById("face-image").onload = function (e) {
      var imgData = document.getElementById("face-image");
      cropImage(imgData, function (resizedImg) {
        analyzeFace(resizedImg).then(function () {
          $("#loading-message").html("닮은 아이돌을 찾고 있어요.")
          getSimilarCeleb(resizedImg);
        })


      })

      // predict().then(function (prom) {

      //     });

    };
  } else {
    removeUpload();
  }
}

function removeUpload() {
  document.getElementsByClassName("file-upload-input")[0].value = "";
  $(".file-upload-input").replaceWith($(".file-upload-input").clone());
  $("#face-image").value = "";
  $("#face-image").replaceWith($("#face-image").clone());
  $(".file-upload-content").hide();
  $(".image-upload-wrap").show();
  $(".result-message").hide();

  window.location.href = getBaseUrl();
  // document.getElementById("search").height = 0;
  $("html, body").scrollTop(
    document.getElementsByClassName("title")[0].offsetTop
  );
}
$(".image-upload-wrap").bind("dragover", function () {
  $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function () {
  $(".image-upload-wrap").removeClass("image-dropping");
});

function iosApp() {
  document.getElementById("addThis").style.display = "none";
  document.getElementById("disqus_thread").style.display = "none";
  var kakao = document.getElementsByClassName("kakao_ad_area");
  for (var i = 0; i < kakao.length; i++) {
    if (kakao[i]) {
      kakao[i].style.display = "none";
    }
  }
  document.getElementById("yotube-top-link").style.display = "none";
}


// function arrayToQueryString(array) {
//   return array.map(item => encodeURIComponent(item)).join('&');
// }

async function copyToClipboard(textToCopy) {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
  } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
          
      // Move textarea out of the viewport so it's not visible
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
          
      document.body.prepend(textArea);
      textArea.select();

      try {
          document.execCommand('copy');
      } catch (error) {
          console.error(error);
      } finally {
          textArea.remove();
      }
  }
}



function getUriComponents() {
  if (similarIdolData && faceData) {
    const simStr = encodeURI(encodeURIComponent(JSON.stringify(similarIdolData)));
    const faceStr = encodeURI(encodeURIComponent(JSON.stringify(faceData)));
    $('#modalMessage').html("결과를 포함한 링크를 복사했어요.");
    return "?result=" + simStr + "&face=" + faceStr;
  }
  $('#modalMessage').html("링크를 복사했어요.");
  return "";
}

function getBaseUrl() {
  console.log(window.location.href.split("?"));
  var name = window.location.href.split("?")[0];
  name = name.split("#")[0];
  console.log(name);
  return name;
}

function getIndexParamsUrl() {
  var linkUrl = getBaseUrl();
  linkUrl = linkUrl.split("/").pop();
  return linkUrl + getUriComponents();
}

function getShareUrl() {
  var linkUrl = getBaseUrl();
  return linkUrl + getUriComponents();
}

async function shareUrl() {
  
  const linkUrl = getShareUrl();
  try {
    await copyToClipboard(linkUrl);
    console.log('url copied to the clipboard.');
    $('#modalMessage').fadeIn();
    setTimeout(function() {
        $('#modalMessage').fadeOut();
    }, 3000); // 3000 milliseconds = 3 seconds
    
  } catch(error) {
    console.error("copy to clipboard error.");
  }
    
}

function showResults(resultParam, faceParam) {
  $(".image-upload-wrap").hide();
  $("#face-image").attr("src", "https://play-lh.googleusercontent.com/IidzGfx6ICCRnHqGsQYOoyyVcqNnF4sLZTycK5y0fQ0gUhTpd23KwNNgE3c403wkR1s=s128-rw");
  $(".file-upload-content").show();
  const resultDecoded = decodeURI(decodeURIComponent(resultParam));
  const resultJson = JSON.parse(resultDecoded.split("#")[0]);
  similarIdolData = resultJson;

  const faceDecoded = decodeURI(decodeURIComponent(faceParam));
  const faceJson = JSON.parse(faceDecoded.split("#")[0]);
  faceData = faceJson;
  console.log(faceData);
  
  var int=setInterval(function() {
    if (typeof google != 'undefined' && google.search.cse) {
      // google.search.cse.element.getElement('ap_search').execute("#{@term}")  
      

      drawChart(faceData);
      displayIdolPredictionBriefly(similarIdolData);
      const name = getBaseUrl()
      window.history.replaceState({}, document.title, name);
      clearInterval(int);
      
    }
  }, 200)

  

  $(".try-again-btn").show();
  $(".result-message").show();
  // window.location.href = window.location.pathname + "?q1=" + faceNames[similarIdolData[0].identity];
  // displayIdolPrediction(1);
}


// {{ result 쿼리파라미터가 존재할 땐 바로 결과표시 시작

// 카카오 공유
// Function to get URL parameter by name
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

Kakao.init('8b998f0abc3beae40dc620c58067dd55');

function updateKakaoLink() {
  
  Kakao.Share.createCustomButton({
    container: '#shareKt1',
    templateId: 104987, // 나의 앱 ID 작성
    templateArgs: {
        'result_url': getIndexParamsUrl(),    // encoded url
        'result': similarIdolData[0].identity  + ": " + ((1 - similarIdolData[0].distance) * 100).toFixed(1) + "%"
        ,    // result text '에스파 닝닝: 56%'
    }
});
}
// Get the value of the 'result' parameter
const resultParam = getUrlParameter('result');   // resultParam: 'key:value' 형태 ex. '에스파 닝닝: 56%' 로 할수도 있는데, encode 로 10명 결과를 담자.
const faceParam = getUrlParameter('face');
// Replace content based on the value of 'result' parameter
if (resultParam != null) {

    showResults(resultParam, faceParam);  // 구현필요
    
} else {
    
}
Kakao.Share.createCustomButton({
  container: '#shareKt1',
  templateId: 104987, // 나의 앱 ID 작성
});

// }} result 쿼리파라미터가 존재할 땐 바로 결과표시 끝