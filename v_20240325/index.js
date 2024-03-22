
// const compressor = require('./compression.js');
const apiUrl = "https://celebme.duckdns.org:8181";
// const apiUrl = "http://localhost:8181"

// 닮은 셀럽 목록 변수
var similarIdolData;
// 얼굴 분석 변수
var faceData;


const lang = $( "#lang option:selected" ).val();
const version = "v_20240325";
var faceNames = {};
(function () {
  
  fetch(version + "/names_" + (lang === "ko" ? "ko" : "en") + ".json")
    .then(response => response.json())
    .then(jsonData => {
      // Use jsonData as needed
      faceNames = jsonData;
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
        // console.log(jsonData);
    })
    .catch(error => {
      console.error("Error fetching JSON:", error);
    });
})();


var resultMeta = {};
(function () {
  fetch(version +"/meta_" + lang + ".json")
    .then(response => response.json())
    .then(jsonData => {
      // Use jsonData as needed
      resultMeta = jsonData;
      // console.log(resultMeta);
    })
    .catch(error => {
      console.error("Error fetching JSON:", error);
    });
})();

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



// 쿠키 확인 
function getCookie(name) {
  var nameOfCookie=name+"=";
  var a=0;
      while(a<=document.cookie.length) {
      var b=(a+nameOfCookie.length);
          if(document.cookie.substring(a,b)==nameOfCookie) {
              if((endOfCookie=document.cookie.indexOf(";",b))==-1)
              endOfCookie=document.cookie.length;
              return unescape(document.cookie.substring(b,endOfCookie));
          }
          a=document.cookie.indexOf(" ",a) +1;
          if(a==0)
          break;
      }
  return "";
}

// 쿠키 설정
function setCookie(name, value, expiredays){
  var todayDate = new Date();
  todayDate.setDate( todayDate.getDate() + expiredays );
  document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}


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
  var confidenceStr = "";
  if (userData.face_cnt > 1) {
    confidenceStr = getMeta("face_gt1");
    $("#face-analysis-result").html(
      confidenceStr + "<br/>"
      + getMeta("face_in_picture") + getMeta(userData.dominant_race) + ", <br/>"
      + getMeta("age") + " " + userData.age + getMeta("age_val") + " " + getMeta(userData.dominant_gender) + ", "
      + getMeta(userData.dominant_emotion) + getMeta("i_guess") + " <br/>"
    );
    $("#charts").show();
  } else if (userData.face_confidence == 0) {
    confidenceStr = getMeta("face_confidence_low");
    $("#face-analysis-result").html(
      confidenceStr + "<br/>"
    );
    $("#charts").hide();
    // $("#result-message").html("");

  } else {
    $("#face-analysis-result").html(
      confidenceStr + "<br/>"
      + getMeta("face_in_picture") + getMeta(userData.dominant_race) + ", <br/>"
      + getMeta("age") + " " + userData.age + getMeta("age_val") + " " + getMeta(userData.dominant_gender) + ", "
      + getMeta(userData.dominant_emotion) + getMeta("i_guess") + " <br/>"
    );
    $("#charts").show();
  }
  

  const ageData = {
    labels: [getMeta("age")],
    datasets: [{
      label: getMeta("age"),
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


  // console.log(Object.keys(userData.gender));
  // console.log(Object.keys(userData.gender).flatMap(value => { return getMeta(value); }));
  // Display gender in pie chart
  const genderData = {
    labels: Object.keys(userData.gender).flatMap(value => {
      return getMeta(value);
    }),
    datasets: [{
      label: getMeta("gender"),
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
            // console.log(value);//context.chart.data.labels[context.dataIndex]
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
      label: getMeta("emotion"),
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
            // console.log(value); //context.chart.data.labels[context.dataIndex]
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
      label: getMeta("race"),
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
            // console.log(value);//context.chart.data.labels[context.dataIndex]
            return context.chart.data.labels[context.dataIndex] + ": " + value.toFixed(1);
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
      // console.log("analyze");
      // console.log(data);
      
      faceData = data;
      drawChart(data);

    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
    });

}


function getSimilarCeleb(inputImage) {
  const formData = new FormData();
  formData.append("img", inputImage); // Adjust file type as needed

  setTimeout( function () {
      fetch(apiUrl + '/find', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data here
        // console.log(data);
        for (var rank = 0; rank < 10; rank++) {
          delete data[rank].source_h ;
          delete data[rank].source_w;
          delete data[rank].source_x ;
          delete data[rank].source_y;
          delete data[rank].target_h;
          delete data[rank].target_w;
          delete data[rank].target_x;
          delete data[rank].target_y;
          delete data[rank].threshold;
        }

        similarIdolData = data;
        for (var rank = 0; rank < 10; rank++) {
          similarIdolData[rank].identity = faceNames[similarIdolData[rank].identity];
        }
        displayIdolPredictionBriefly(data);
        // displayIdolPrediction(1);
        $('#extra-similars').show();
        // updateKakaoLink();
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
    }, 3000);
}
function displayIdolPredictionBriefly(data) {
  $("#result-similar-idol").show();
  for (var rank = 1; rank <= 10; rank++) {
    try {
      const r = data[rank - 1].identity; // .split("/")[1]]

      // $('#fr' + rank).html(r+ ": " +  ((1 - data[rank - 1].distance) * 100).toFixed(1) + "%");
      $('#r' + rank).html(r + ": " + ((1 - data[rank - 1].distance) * 100).toFixed(1) + "% 🔍");

      $('#search' + rank).hide();
      // $('#s' + rank).show();
      if (rank == 1) {
        displayIdolPrediction(1);
        $('#celeb-result').html(getMeta("face_in_picture") + r + getMeta("it_resembles")
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

      // console.log(r);
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
    
    // 동의모드는 추후구현
    // gtag('consent', 'default', {
    //   'ad_storage': 'denied',
    //   'ad_user_data': 'denied',
    //   'ad_personalization': 'denied',
    //   'analytics_storage': 'denied',
    //   'wait_for_update': 500
    // });

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
    $("#loading-message").html(getMeta("analyzing_face"))
    $("#loading").show();
    $(".result-message").hide();
    $("#result-similar-idol").hide();
    document.getElementById("face-image").onload = function (e) {
      var imgData = document.getElementById("face-image");
      cropImage(imgData, function (resizedImg) {
        analyzeFace(resizedImg).then(function () {
          $("#loading-message").html(getMeta("finding_lookalike_celeb"))
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

  // window.location.href = getBaseUrl();
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
  if (similarIdolData) {
    // result 공유용도, 버그있을수있음
    // 한명만 공유하자
    var rsStr = encodeURIComponent(JSON.stringify(similarIdolData[0]));
    const simStr = btoa(rsStr);
    console.log(rsStr + ":" + simStr);
    // const faceStr = encodeURIComponent(JSON.stringify(faceData));
    $('#modalMessage').html(getMeta("copied_with_result"));
    return "?result=" + simStr; //  + "&face=" + faceStr;
  }
  $('#modalMessage').html(getMeta("copied_link"));
  return "";
}

function getBaseUrl() {
  console.log(window.location.href.split("?"));
  var name = window.location.href.split("?")[0];
  // var name = window.location.hostname;
  name = name.split("#")[0];
  // console.log(name);
  if (name.includes("index") == false) {
    name = name  + lang + "/index.html"
  }
  // console.log(name);
  return name; // name + "/" + lang + "/index.html";
}

function getIndexParamsUrl() {
  var linkUrl = getBaseUrl();
  var link = "";
  link = linkUrl.split(window.location.host).pop();
  if (link.length > 0) {
    link = link.substring(1);
  }
  // var linkUrls = linkUrl.split("/")
  
  // if (linkUrls.length > 0) {
  //   link = linkUrls.pop();
  //   link = 
  //   return link;
  // } else {
  //   return "";
  // }
  return link;
  
}

function getShareUrl() {
  var linkUrl = getBaseUrl();
  return linkUrl + getUriComponents();
}

async function shareUrl() {

  const linkUrl = getBaseUrl() + getUriComponents(); // getUriComponents() : result 공유용도, 버그있을수있음
  try {
    await copyToClipboard(linkUrl);
    console.log('url copied to the clipboard.');
    $('#modalMessage').fadeIn();
    setTimeout(function () {
      $('#modalMessage').fadeOut();
    }, 3000); // 3000 milliseconds = 3 seconds

  } catch (error) {
    console.error("copy to clipboard error.");
  }

}

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

function showResults(resultParam, faceParam) {
  $(".image-upload-wrap").hide();
  $("#face-image").attr("src", "https://play-lh.googleusercontent.com/IidzGfx6ICCRnHqGsQYOoyyVcqNnF4sLZTycK5y0fQ0gUhTpd23KwNNgE3c403wkR1s=s128-rw");
  $(".file-upload-content").show();
  const resultDecoded = decodeURIComponent(atob(resultParam));
  console.log(resultDecoded);
  const resultJson = JSON.parse(resultDecoded);
  console.log(resultJson);
  similarIdolData = Array(resultJson);  // 한개만 처리하면서 array 로 생성이 필요함

  const faceDecoded = decodeURI(decodeURIComponent(faceParam));
  const faceJson = JSON.parse(faceDecoded.split("#")[0]);
  faceData = faceJson;
  // console.log(faceData);
  

  var int = setInterval(function () {
    if (typeof google != 'undefined' && google.search.cse) {
      // google.search.cse.element.getElement('ap_search').execute("#{@term}")  

      // sleep(500);
    // }
      // drawChart(faceData);
      $('#result-message').hide();
      // displayIdolPredictionBriefly(similarIdolData);
      displayIdolPrediction(1);
      $('#celeb-result').html(getMeta("face_in_picture") + similarIdolData[0].identity + getMeta("it_resembles")
        // + "셀럽 이름을 눌러서 이미지를 검색해보세요. <br/><br/>" 
      )

      $('#extra-similars').hide();
      
      
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

Kakao.init('0ed053a93843ba490a37bb2964e5baaa');

function shareKakao() {
  var link = getIndexParamsUrl(); // + getUriComoponents: 버그로 막아둠
  if (similarIdolData != null) {
    link = link + getUriComponents(); // 결과공유url
    // console.log(link);
    Kakao.Share.sendCustom(
      {
        templateId: 104987,
      templateArgs: {
        'result_url': link,    // encoded url
        'result': similarIdolData[0].identity + ": " + ((1 - similarIdolData[0].distance) * 100).toFixed(1) + "%" // result text '에스파 닝닝: 56%'
      }
      }
    );
  } else {
    // console.log(link);
    Kakao.Share.sendCustom(
      {
        templateId: 104987,
        templateArgs: {
          'result_url': link,
        }
      }
    );
  }

  
}
// Get the value of the 'result' parameter
const resultParam = getUrlParameter('result');   // resultParam: 'key:value' 형태 ex. '에스파 닝닝: 56%' 로 할수도 있는데, encode 로 10명 결과를 담자.
const faceParam = getUrlParameter('face');
// Replace content based on the value of 'result' parameter
if (resultParam != null) {
 
  showResults(resultParam, faceParam);  // 구현필요

} else {

}


// }} result 쿼리파라미터가 존재할 땐 바로 결과표시 끝