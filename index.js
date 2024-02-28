const apiUrl = "https://tkorg.duckdns.org:8181"

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


function cropImage(imgElement, callback, maxWidth=512, maxHeight = 512) {
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

  canvas.toBlob(function(blob) {
      callback(blob);
  }, 'image/webp');
}

var ageChart, emotionChart, genderChart, raceChart;
function drawChart(userData) {
  
  const autocolors = window['chartjs-plugin-autocolors'];
  

  Chart.register(autocolors);
  // Chart.register(ChartDataLabels);

  const ageData = {
    labels: ["Age"],
    datasets: [{
      label: 'Age',
      data: [userData.age],
      backgroundColor: ['#FF6384']
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
          plugins: {
            autocolors: {
              mode: 'data'
            },
            legend: {
              display: false,
            }
          }
        }
    });
  

  

  
  
  // Display gender in pie chart
  const genderData = {
    labels: Object.keys(userData.gender),
    datasets: [{
      label: 'Gender',
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
        plugins: {
          autocolors: {
            mode: 'data'
          },
          datalabels: {
              formatter: function(value, context) {
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
    labels: Object.keys(userData.emotion),
    datasets: [{
      label: 'Emotion',
      data: Object.values(userData.emotion)
    }]
  };
  
  if (emotionChart != null) {
    emotionChart.destroy();
  }
  emotionChart = new Chart(document.getElementById('emotionChart'), {
    type: 'bar',
    data: emotionData,
    options: {
        plugins: {
            autocolors: {
                mode: 'data'
            },
            datalabels: {
                formatter: function(value, context) {
                    console.log(value); //context.chart.data.labels[context.dataIndex]
                    return context.chart.data.labels[context.dataIndex] + ": " + value.toFixed(1);
                }
            },
            legend: {
              display: false,
            }
        },
      }
  });

  // Display race in radar chart
  const raceData = {
    labels: Object.keys(userData.race),
    datasets: [{
      label: 'Race',
      data: Object.values(userData.race)
    }]
  };
  if (raceChart != null) {
    raceChart.destroy();
  }
  raceChart =   new Chart(document.getElementById('raceChart'), {
    type: 'bar',
    data: raceData,
    options: {
        plugins: {
          autocolors: {
            mode: 'data'
          },
          datalabels: {
              formatter: function(value, context) {
                  console.log(value);//context.chart.data.labels[context.dataIndex]
                  return context.chart.data.labels[context.dataIndex] + ": " + value.toFixed(1);
              }
          },
          legend: {
            display: false,
          }
        },
        
      }
  });
}

async function analyzeFace(inputImage) {
  const formData = new FormData();
  formData.append("img", inputImage); // Adjust file type as needed
  return await fetch('http://tkorg.duckdns.org:8181/analyze', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response data here
    console.log("analyze");
    console.log(data);
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

  return await fetch('http://tkorg.duckdns.org:8181/find', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response data here
    // console.log(data);
    displayIdolPrediction(data);
    
      $(".try-again-btn").show();
      $(".result-message").show();
      $("#loading").hide();
    
  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });

}

function displayIdolPrediction(data) {
  console.log(data);
  const first = data[0];
  
  // var resultTitle = first[''];
  // var resultExplain = (values[0] * 100).toFixed(1);
  // var title =
  //   "<div class='h2'> 셀럽미: 닮은 아이돌 찾기 결과 </div>" +
  //   "<div class='h3' style='padding: 10px;'>" +
  //   resultTitle +
  //   " (" +
  //   resultExplain +
  //   "%) </div>";
  // var explain =
  //   "<div class='h5' > " +
  //   indices[1] +
  //   " (" +
  //   (values[1] * 100).toFixed(1) +
  //   "%) / " +
  //   indices[2] +
  //   " (" +
  //   (values[2] * 100).toFixed(1) +
  //   "%) </div>";
  // $(".result-message").html(title + explain);
  try {
  q1 = 'allintitle:' + faceNames[data[0].identity.split("/")[1]] + ' -청량 -단체사진 -닮은"';
  $('#r1').html(faceNames[data[0].identity.split("/")[1]]+ ": " +  ((1 - data[0].distance) * 100).toFixed(2) + "%");
  q2 = 'allintitle:' + faceNames[data[1].identity.split("/")[1]] + ' -청량 -단체사진 -닮은"';
  $('#r2').html(faceNames[data[1].identity.split("/")[1]]  + ": " + ((1 - data[1].distance) * 100).toFixed(2) + "%");
  q3 = 'allintitle:' + faceNames[data[2].identity.split("/")[1]] + ' -청량 -단체사진 -닮은"';
  $('#r3').html(faceNames[data[2].identity.split("/")[1]]  + ": " + ((1 - data[2].distance)* 100).toFixed(2) + "%");
  q4 = 'allintitle:' + faceNames[data[3].identity.split("/")[1]] + ' -청량 -단체사진 -닮은"';
  $('#r4').html(faceNames[data[3].identity.split("/")[1]]  + ": " + ((1 - data[3].distance) * 100).toFixed(2) + "%");
  q5 = 'allintitle:' + faceNames[data[4].identity.split("/")[1]] + ' -청량 -단체사진 -닮은"';
  $('#r5').html(faceNames[data[4].identity.split("/")[1]]  + ": " + ((1 - data[4].distance) * 100).toFixed(2) + "%");
  q6 = 'allintitle:' + faceNames[data[5].identity.split("/")[1]] + ' -청량 -단체사진 -닮은"';
  $('#r6').html(faceNames[data[5].identity.split("/")[1]]  + ": " + ((1 - data[5].distance) * 100).toFixed(2) + "%");
  q7 = 'allintitle:' + faceNames[data[6].identity.split("/")[1]] + ' -청량 -단체사진 -닮은"';
  $('#r7').html(faceNames[data[6].identity.split("/")[1]]  + ": " + ((1 - data[6].distance) * 100).toFixed(2) + "%");
  q8 = 'allintitle:' + faceNames[data[7].identity.split("/")[1]] + ' -청량 -단체사진 -닮은"';
  $('#r8').html(faceNames[data[7].identity.split("/")[1]]  + ": " + ((1 - data[7].distance) * 100).toFixed(2) + "%");
  q9 = 'allintitle:' + faceNames[data[8].identity.split("/")[1]] + ' -청량 -단체사진 -닮은"';
  $('#r9').html(faceNames[data[8].identity.split("/")[1]]  + ": " + ((1 - data[8].distance) * 100).toFixed(2) + "%");
  q10 = 'allintitle:' +faceNames[data[9].identity.split("/")[1]]  + ' -청량 -단체사진 -닮은"';
  $('#r10').html(faceNames[data[9].identity.split("/")[1]]  + ": " + ((1 - data[9].distance) * 100).toFixed(2) + "%");
  } catch (error) {

  }

  
  

  var element = google.search.cse.element.getElement('q1');
  var element2 = google.search.cse.element.getElement('q2');
  var element3 = google.search.cse.element.getElement('q3');
  var element4 = google.search.cse.element.getElement('q4');
  var element5 = google.search.cse.element.getElement('q5');
  var element6 = google.search.cse.element.getElement('q6');
  var element7 = google.search.cse.element.getElement('q7');
  var element8 = google.search.cse.element.getElement('q8');
  var element9 = google.search.cse.element.getElement('q9');
  var element10 = google.search.cse.element.getElement('q10');

  try {
  element.execute(q1);
  element2.execute(q2);
  element3.execute(q3);
  element4.execute(q4);
  element5.execute(q5);
  element6.execute(q6);
  element7.execute(q7);
  element8.execute(q8);
  element9.execute(q9);
  element10.execute(q10);
  } catch (error) {

  }
  
  window.history.replaceState({}, document.title, "/");
  $("html, body").scrollTop(
    document.getElementsByClassName("title")[0].offsetTop
  );
  // $("#search1").attr(
  //   "src",
  //   q1
  // );
  // $( "#search1" ).innerHTML = q1;
  // $( "#search1" ).load('index.html?' + 'q1=abc');
  
  // $("#search2").attr(
  //   "src",
  //   q2
  // );
  // $( "#search2" ).innerHTML = q2;

  // $("#search3").attr(
  //   "src",
  //   q3
  // );
  // $( "#search3" ).innerHTML = q3;

  // gtag("event", resultTitle, {
  //   event_category: resultExplain,
  //   result_face: true,
  // });
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
    $("#loading").show();
    $(".result-message").hide();
    document.getElementById("face-image").onload = function (e) {
      var imgData = document.getElementById("face-image");
      cropImage(imgData, function(resizedImg) {
        analyzeFace(resizedImg).then(function () {
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
