// const compressor = require('./compression.js');
// const apiUrl = "https://celebme.duckdns.org:8181";
// const apiUrl = "https://knnlnzvrb56n7cvift2sajvyza.apigateway.ap-chuncheon-1.oci.customer-oci.com/v1"
// const apiUrl = "http://158.180.71.186:8181";
// const apiUrl = "https://celebme-api.duckdns.org:8181";
const apiUrl = "https://celebme.duckdns.org:8181";
// const apiUrl = "http://localhost:8181";
// const apiUrl = "http://149.130.218.11:8181";

// 닮은 셀럽 목록 변수
var similarIdolData;
// 얼굴 분석 변수
var faceData;


const lang = $("#lang option:selected").val();
const version = "/v_20260308_2";
var faceNames = {};
var faceNamesKo = {};
const jsonContainer = document.getElementById('json-container');
const toggleButton = document.getElementById('toggleButton');

(function () {
  fetch(version + "/names_ko.json")
    .then(response => response.json())
    .then(jsonData => {
      faceNamesKo = jsonData;
    });

  fetch(version + "/names_" + (lang === "ko" ? "ko" : "en") + ".json")
    .then(response => response.json())
    .then(jsonData => {
      // Use jsonData as needed
      faceNames = jsonData;
      const jsonKeys = Object.keys(faceNames);
      const celebCount = jsonKeys.length;
      const countEl = document.getElementById('celeb-count');
      if (countEl) countEl.textContent = celebCount;
      document.querySelectorAll('.celeb-count-display').forEach(function(el) {
        el.textContent = celebCount;
      });

      jsonKeys.forEach(key => {
        const badge = document.createElement('span');
        badge.classList.add('celeb-badge');
        badge.textContent = faceNames[key];
        badge.title = faceNames[key] + ' 검색';
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', function() {
          searchCelebByName(faceNames[key]);
          document.querySelectorAll('.celeb-badge.selected').forEach(function(b) { b.classList.remove('selected'); });
          badge.classList.add('selected');
        });
        jsonContainer.appendChild(badge);
      });
      // console.log(jsonData);
    })
    .catch(error => {
      console.error("Error fetching JSON:", error);
      gtag("event", "errorFetchingJson", {
        event_category: "error",
      });
    });
})();


var resultMeta = {};
(function () {
  fetch(version + "/meta-" + lang + ".json")
    .then(response => response.json())
    .then(jsonData => {
      // Use jsonData as needed
      resultMeta = jsonData;
      // console.log(resultMeta);

      drawDefaultChart();
      // 초기 설정: 쿼리가 있는 경우 base url로 점프뛰기
      if (window.location.href.includes("gsc.q"))
        window.location.href = getBaseUrl();
      // for (var rank = 1; rank <= 2; rank++) {
      //   console.log("hide.."); 
      //   document.getElementById("search" + rank + "-head").style.display = "none";

      // }
    })
    .catch(error => {
      console.error("Error fetching JSON:", error);
      gtag("event", "errorFetchingJson", {
        event_category: "error",
      });
    });
})();

function getMeta(name) {
  try {
    // Handle dot notation for nested properties
    if (name.includes('.')) {
      const keys = name.split('.');
      let value = resultMeta;
      for (const key of keys) {
        if (value && typeof value === 'object') {
          value = value[key];
        } else {
          value = undefined;
          break;
        }
      }
      if (value === undefined) {
        console.log(`Meta key not found: ${name}, available keys:`, Object.keys(resultMeta));
        return name;
      }
      return value;
    }
    
    // Handle simple property access
    const result = resultMeta[name] || resultMeta[name.toLowerCase()] || name;
    if (result === name) {
      console.log(`Meta key not found: ${name}, available keys:`, Object.keys(resultMeta));
    }
    return result;
  } catch (error) {
    console.log(error);
    gtag("event", "errorGetMeta", {
      event_category: "error",
    });
    return name;
  }
}





function setAnalysisStep(step) {
  for (var i = 1; i <= 5; i++) {
    var el = document.getElementById('astep-' + i);
    if (!el) continue;
    el.classList.remove('active', 'done');
    if (i < step) el.classList.add('done');
    else if (i === step) el.classList.add('active');
  }
  for (var j = 1; j <= 4; j++) {
    var line = document.getElementById('aline-' + j);
    if (line) line.classList.toggle('done', j < step);
  }
}

function toggleCelebList() {
  const panel = document.getElementById('celeb-list-panel');
  const btn = document.getElementById('celebListToggleBtn');
  if (panel.style.display === "none") {
    panel.style.display = "block";
    btn.innerHTML = '<span class="try-again-text" style="font-size:1.4rem;">&#9650; ' + getMeta("celebListCloseText") + '</span>';
    document.getElementById('celebSearchInput').focus();
  } else {
    panel.style.display = "none";
    btn.innerHTML = '<span class="try-again-text" style="font-size:1.4rem;">&#127775; ' + getMeta("celebListText") + '(<span id="celeb-count">569</span>)</span>';
  }
}

function filterCelebList(query) {
  const badges = jsonContainer.querySelectorAll('.celeb-badge');
  const q = query.trim().toLowerCase();
  badges.forEach(function(badge) {
    badge.style.display = badge.textContent.toLowerCase().includes(q) ? 'inline-block' : 'none';
  });
}

function searchCelebByName(name) {
  document.getElementById('celeb-cse-result').style.display = 'block';
  var interval = setInterval(function() {
    if (typeof google !== 'undefined' && google.search && google.search.cse) {
      clearInterval(interval);
      var el = google.search.cse.element.getElement('celeblist');
      if (el) {
        el.execute(name + ' 연예인');
        document.getElementById('celeb-cse-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, 200);
}
// toggleButton.addEventListener('click', function () {

// });


// 쿠키 확인 
function getCookie(name) {
  var nameOfCookie = name + "=";
  var a = 0;
  while (a <= document.cookie.length) {
    var b = (a + nameOfCookie.length);
    if (document.cookie.substring(a, b) == nameOfCookie) {
      if ((endOfCookie = document.cookie.indexOf(";", b)) == -1)
        endOfCookie = document.cookie.length;
      return unescape(document.cookie.substring(b, endOfCookie));
    }
    a = document.cookie.indexOf(" ", a) + 1;
    if (a == 0)
      break;
  }
  return "";
}

// 쿠키 설정
function setCookie(name, value, expiredays) {
  var todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + expiredays);
  document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}


function cropImage(imgElement, callback, maxWidth = 512, maxHeight = 512) {
  const canvas = document.getElementById('cropped-face-image-1');
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

var ageChart, emotionChart, genderChart, raceChart, confidenceStr;
function drawChart(userData) {

  // Chart.register(ChartDataLabels);
  var cropSuccess = true;
  confidenceStr = "";
  if (userData.face_confidence == 0) {
    confidenceStr = getMeta("face_confidence_low");
    $("#face-analysis-result").html(
      confidenceStr + "<br/>"
    );
    $("#style-recommendations").hide();
    // $("#charts").hide();
    cropSuccess = false;
  } else {
    if (userData.face_cnt > 1) {
      confidenceStr = getMeta("face_gt1");

    }
    $("#style-recommendations").show();
    // 한 명 이상 인식되었을때에만 gif 생성버튼을 표시한다.
    try{ 
    document.getElementById("createGif").style.display = "block";
    document.getElementById("createComparisonPic").style.display = "block";
    $("#result-message-section").show();
    $("#download-comparison").show();
    $("#make-comparison").show();
    } catch (e) {

    }

    $("#face-analysis-result").html(
      confidenceStr + "<br/>"
      + getMeta("face_in_picture") + getMeta(userData.dominant_race) + ", <br/>"
      + getMeta("age") + " " + userData.age + getMeta("age_val") + " " + getMeta(userData.dominant_gender) + ", "
      + getMeta(userData.dominant_emotion) + getMeta("i_guess") + " <br/>"
    );



    $("#charts").show();

    var canvas = document.getElementById('cropped-face-image-2');
    canvas.width = userData.region['w'];
    canvas.height = userData.region['h'];
    canvas.style.border = "5px solid";
    var ctx = canvas.getContext('2d');
    var image = document.getElementById('cropped-face-image-1');

    ctx.drawImage(image, userData.region['x'], userData.region['y'], userData.region['w'], userData.region['h'], 0, 0, userData.region['w'], userData.region['h']);

    canvas.toBlob((croppedImage) => {
      $("#loading-message").html(getMeta("finding_lookalike_celeb"));
      setTimeout(getSimilarCeleb, 5000, croppedImage);

    }, 'image/webp');

    // Display style recommendations after displaying the first result
    setTimeout(() => {
      displayStyleRecommendations();
    }, 1000);
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
      plugins: {
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
    labels: Object.keys(userData.gender).flatMap(value => { return getMeta(value); }),
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
            return value.toFixed(2) + '%';
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
    labels: Object.keys(userData.emotion).flatMap(value => { return getMeta(value); }),
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
    labels: Object.keys(userData.race).flatMap(value => { return getMeta(value); }),
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

  return cropSuccess;

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
      var cropSuccess = drawChart(data);
      if (cropSuccess == false) {
        $("#loading-message").html(getMeta("finding_lookalike_celeb"));
        // crop 실패시 이미지 유사성 비교를 위해 이미지 그대로 입력
        setTimeout(getSimilarCeleb, 5000, inputImage);
      }


    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
      gtag("event", "errorAnalyzeFace", {
        event_category: "error",
      });
      $("#celeb-spinner").hide();
      $("#loading-message").html(
        getMeta("error_msg")
      );

    });

}


function getSimilarCeleb(inputImage) {
  const formData = new FormData();
  formData.append("img", inputImage); // Adjust file type as needed

  fetch(apiUrl + '/find2', {
    method: 'POST',
    body: formData
  })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
      $("#celeb-spinner").hide();
      $("#loading-message").html(
        getMeta("error_msg")
      );
      gtag("event", "errorGetSimilarCeleb", {
        event_category: "error",
      });
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response data here
      // console.log(data);
      try {
        similarIdolData = data;
        for (var rank = 0; rank < 10; rank++) {
          delete data[rank].source_h;
          delete data[rank].source_w;
          delete data[rank].source_x;
          delete data[rank].source_y;
          delete data[rank].target_h;
          delete data[rank].target_w;
          delete data[rank].target_x;
          delete data[rank].target_y;
          delete data[rank].threshold;

          similarIdolData[rank].name = faceNames[similarIdolData[rank].identity];
          similarIdolData[rank].nameKo = faceNamesKo[similarIdolData[rank].identity];
          similarIdolData[rank].originalIdentity = similarIdolData[rank].originalIdentity;
        }
       
        // for (var rank = 0; rank < 10; rank++) {
          
        // }
      } catch (error) {
        console.log(error);
        gtag("event", "errorGetSimilarCelebDelete", {
        event_category: "error",
      });
      }

      
      // console.log(faceNames, faceNamesKo,similarIdolData );
      setAnalysisStep(5);
      displayIdolPredictionBriefly(similarIdolData);
      $('#extra-similars').show();
      $('#result-creation').show();
      $(".try-again-btn").show();
      $(".share-action-btn").show();
      $(".result-message").addClass('result-fade-in').show();
      $("#celeb-spinner").hide();

      // SEO: 결과 표시 시 title·meta description 업데이트
      try {
        var top1Ko = similarIdolData[0].nameKo || similarIdolData[0].name;
        document.title = top1Ko + ' 닮은꼴 | 셀럽미 닮은 연예인 찾기';
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', '내 얼굴 분석 결과, ' + top1Ko + '와 가장 닮았어요! 셀럽미에서 나의 닮은 K-pop 아이돌·배우를 무료로 찾아보세요.');
      } catch(e) {}

      // document.getElementById('cropped-image-2')
      // displayComparisonCelebMe(1); // 얼굴분석완료이후에 움짤이미지 생성


      $("#loading-message").html(getMeta("celeb_finished"))

      // window.history.replaceState({}, document.title, "/");
      $("html, body").animate(
        {
          scrollTop: document.getElementById("headtitle").offsetTop - 50 // 50px 여유 공간
        },
        800 // 애니메이션 지속 시간(ms)
      );
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {

      }

    })
    .catch(error => {
      // Handle errors here
      gtag("event", "errorDisplaySimilarCeleb", {
        event_category: "error",
      });
      console.error('Error:', error);
      $("#celeb-spinner").hide();
      $("#loading-message").html(
        getMeta("error_msg")
      );
    });
}
function analyzePersonalColor(imageData) {
  // Extract color information from the face image
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 300;
  canvas.height = 300;

  // Convert tensor to image data for color analysis
  const img = document.getElementById("cropped-face-image-2");
  if (!img || !img.src) {
    // Fallback to main face image if cropped image is not available
    const mainImg = document.getElementById("face-image");
    if (mainImg && mainImg.src) {
      ctx.drawImage(mainImg, 0, 0, 300, 300);
    } else {
      return null;
    }
  } else {
    ctx.drawImage(img, 0, 0, 300, 300);
  }

  const pixelData = ctx.getImageData(0, 0, 300, 300).data;

  // Analyze skin tone and undertones
  let totalR = 0, totalG = 0, totalB = 0;
  let pixelCount = 0;

  // Sample pixels from center area (face region)
  for (let y = 100; y < 200; y++) {
    for (let x = 100; x < 200; x++) {
      const index = (y * 300 + x) * 4;
      totalR += pixelData[index];
      totalG += pixelData[index + 1];
      totalB += pixelData[index + 2];
      pixelCount++;
    }
  }

  const avgR = totalR / pixelCount;
  const avgG = totalG / pixelCount;
  const avgB = totalB / pixelCount;

  // Determine personal color season based on skin tone analysis
  let personalColor = '';
  let colorPalette = [];
 
  // 아이린 229 207 202
  // 229 -
  if (avgR > avgG && avgR > avgB && avgG + avgB < 300) {
    // Warm undertones
    if (avgR - avgG > 20) {
      personalColor = getMeta("personalColorSeasons.warm_spring");
      colorPalette = [getMeta("colors.coral"), getMeta("colors.peach"), getMeta("colors.ivory"), getMeta("colors.gold"), getMeta("colors.turquoise")];
    } else {
      personalColor = getMeta("personalColorSeasons.warm_autumn");
      colorPalette = [getMeta("colors.beige"), getMeta("colors.khaki"), getMeta("colors.brown"), getMeta("colors.mustard"), getMeta("colors.terracotta")];
    }
  } else {
    // Cool undertones
    if (avgB > avgG) {
      personalColor = getMeta("personalColorSeasons.cool_winter");
      colorPalette = [getMeta("colors.navy"), getMeta("colors.black"), getMeta("colors.white"), getMeta("colors.royal_blue"), getMeta("colors.silver")];
    } else {
      personalColor = getMeta("personalColorSeasons.cool_summer");
      colorPalette = [getMeta("colors.lavender"), getMeta("colors.mint"), getMeta("colors.soft_pink"), getMeta("colors.gray"), getMeta("colors.pastel_blue")];
    }
  }

  let resultDescription = `<h4><strong>${personalColor} <span style="color:rgb(${Math.round(avgR)}, ${Math.round(avgG)}, ${Math.round(avgB)})">■</span> </strong></h4>`;
  // <p><small>피부톤: RGB(${Math.round(avgR)}, ${Math.round(avgG)}, ${Math.round(avgB)}) </small></p>`;
document.getElementById('personal-color-overview').innerHTML = resultDescription;
// console.log(resultDescription);
  return {
    season: personalColor,
    colors: colorPalette,
    skinTone: { r: Math.round(avgR), g: Math.round(avgG), b: Math.round(avgB) }
  };
}

function getFashionRecommendations(personalColor, isMale) {
  const recommendations = {
    [getMeta("personalColorSeasons.warm_spring")]: {
      female: {
        style: getMeta("fashionStyles.bright_cheerful"),
        items: [getMeta("fashionItems.floral_dress"), getMeta("fashionItems.coral_blouse"), getMeta("fashionItems.ivory_knit"), getMeta("fashionItems.beige_trench_coat")],
        colors: [getMeta("colors.coral"), getMeta("colors.peach"), getMeta("colors.ivory"), getMeta("fashionItems.light_khaki")]
      },
      male: {
        style: getMeta("fashionStyles.natural_casual"),
        items: [getMeta("fashionItems.beige_shirt"), getMeta("fashionItems.khaki_chino_pants"), getMeta("fashionItems.navy_blazer"), getMeta("fashionItems.brown_leather_jacket")],
        colors: [getMeta("colors.beige"), getMeta("colors.khaki"), getMeta("colors.navy"), getMeta("colors.brown")]
      }
    },
    [getMeta("personalColorSeasons.warm_autumn")]: {
      female: {
        style: getMeta("fashionStyles.chic_elegant"),
        items: [getMeta("fashionItems.mustard_knit"), getMeta("fashionItems.brown_coat"), getMeta("fashionItems.khaki_pants"), getMeta("fashionItems.terracotta_blouse")],
        colors: [getMeta("colors.mustard"), getMeta("colors.brown"), getMeta("colors.khaki"), getMeta("colors.terracotta")]
      },
      male: {
        style: getMeta("fashionStyles.classic_formal"),
        items: [getMeta("fashionItems.brown_suit"), getMeta("fashionItems.mustard_shirt"), getMeta("fashionItems.khaki_chino_pants"), getMeta("fashionItems.dark_brown_coat")],
        colors: [getMeta("colors.brown"), getMeta("colors.mustard"), getMeta("colors.khaki"), getMeta("fashionItems.dark_brown")]
      }
    },
    [getMeta("personalColorSeasons.cool_winter")]: {
      female: {
        style: getMeta("fashionStyles.modern_sophisticated"),
        items: [getMeta("fashionItems.black_dress"), getMeta("fashionItems.white_blouse"), getMeta("fashionItems.navy_coat"), getMeta("fashionItems.silver_accessories")],
        colors: [getMeta("colors.black"), getMeta("colors.white"), getMeta("colors.navy"), getMeta("colors.royal_blue")]
      },
      male: {
        style: getMeta("fashionStyles.formal_business"),
        items: [getMeta("fashionItems.navy_suit"), getMeta("fashionItems.white_shirt"), getMeta("fashionItems.black_coat"), getMeta("fashionItems.silver_tie")],
        colors: [getMeta("colors.navy"), getMeta("colors.white"), getMeta("colors.black"), getMeta("colors.gray")]
      }
    },
    [getMeta("personalColorSeasons.cool_summer")]: {
      female: {
        style: getMeta("fashionStyles.romantic_soft"),
        items: [getMeta("fashionItems.lavender_dress"), getMeta("fashionItems.soft_pink_blouse"), getMeta("fashionItems.gray_cardigan"), getMeta("fashionItems.mint_scarf")],
        colors: [getMeta("colors.lavender"), getMeta("colors.soft_pink"), getMeta("colors.gray"), getMeta("colors.mint")]
      },
      male: {
        style: getMeta("fashionStyles.gentleman_casual"),
        items: [getMeta("fashionItems.gray_shirt"), getMeta("fashionItems.light_blue_pants"), getMeta("fashionItems.navy_knit"), getMeta("fashionItems.white_sneakers")],
        colors: [getMeta("colors.gray"), getMeta("fashionItems.light_blue"), getMeta("colors.navy"), getMeta("colors.white")]
      }
    }
  };

  return recommendations[personalColor] ? recommendations[personalColor][isMale ? 'male' : 'female'] : null;
}

function getBeautyRecommendations(personalColor, isMale) {
  const recommendations = {
    [getMeta("personalColorSeasons.warm_spring")]: {
      female: {
        makeup: getMeta("beautyStyles.bright_lively_makeup"),
        lipColor: [getMeta("beautyColors.coral_pink"), getMeta("colors.peach"), getMeta("beautyColors.orange_red")],
        eyeColor: [getMeta("beautyColors.gold_brown"), getMeta("beautyColors.copper"), getMeta("colors.peach")],
        tips: [getMeta("beautyTips.glow_base_makeup"), getMeta("beautyTips.coral_blusher"), getMeta("beautyTips.brown_mascara")]
      },
      male: {
        skincare: getMeta("beautyStyles.moisture_centered_care"),
        tips: [getMeta("beautyTips.basic_care_after_cleansing"), getMeta("beautyTips.sunscreen_essential"), getMeta("beautyTips.lip_balm_care")],
        colors: [getMeta("beautyTips.natural_skin_tone")]
      }
    },
    [getMeta("personalColorSeasons.warm_autumn")]: {
      female: {
        makeup: getMeta("beautyStyles.deep_elegant_makeup"),
        lipColor: [getMeta("beautyColors.brick_red"), getMeta("beautyColors.burgundy"), getMeta("colors.brown")],
        eyeColor: [getMeta("colors.gold"), getMeta("beautyColors.bronze"), getMeta("beautyColors.dark_brown")],
        tips: [getMeta("beautyTips.matte_base"), getMeta("beautyTips.bronzer_contouring"), getMeta("beautyTips.dark_brown_eyeliner")]
      },
      male: {
        skincare: getMeta("beautyStyles.anti_aging_care"),
        tips: [getMeta("beautyTips.essence_cream_nutrition"), getMeta("beautyTips.regular_scrub"), getMeta("beautyTips.eye_cream_care")],
        colors: [getMeta("beautyTips.warm_skin_tone")]
      }
    },
    [getMeta("personalColorSeasons.cool_winter")]: {
      female: {
        makeup: getMeta("beautyStyles.intense_chic_makeup"),
        lipColor: [getMeta("beautyColors.red"), getMeta("beautyColors.berry"), getMeta("beautyColors.plum")],
        eyeColor: [getMeta("colors.silver"), getMeta("colors.black"), getMeta("colors.navy")],
        tips: [getMeta("beautyTips.white_base_bright_skin"), getMeta("beautyTips.vivid_lip_color"), getMeta("beautyTips.black_eyeliner_sharp")]
      },
      male: {
        skincare: getMeta("beautyStyles.whitening_moisture_care"),
        tips: [getMeta("beautyTips.vitamin_c_brightening"), getMeta("beautyTips.hydrating_cream"), getMeta("beautyTips.sunscreen_protection")],
        colors: [getMeta("beautyTips.clean_bright_skin")]
      }
    },
    [getMeta("personalColorSeasons.cool_summer")]: {
      female: {
        makeup: getMeta("beautyStyles.natural_elegant_makeup"),
        lipColor: [getMeta("beautyColors.rose_pink"), getMeta("colors.lavender"), getMeta("beautyColors.berry_pink")],
        eyeColor: [getMeta("colors.silver"), getMeta("colors.lavender"), getMeta("beautyColors.rose_gold")],
        tips: [getMeta("beautyTips.transparent_base"), getMeta("beautyTips.soft_gradation"), getMeta("beautyTips.pink_blusher_natural")]
      },
      male: {
        skincare: getMeta("beautyStyles.gentle_basic_care"),
        tips: [getMeta("beautyTips.sensitive_skin_products"), getMeta("beautyTips.light_lotion_moisturize"), getMeta("beautyTips.gentle_cleanser")],
        colors: [getMeta("beautyTips.natural_skin_tone_maintain")]
      }
    }
  };

  return recommendations[personalColor] ? recommendations[personalColor][isMale ? 'male' : 'female' ] : null;
}

function displayStyleRecommendations() {
  // Get personal color analysis
  const personalColorResult = analyzePersonalColor();
    gtag("event", `personalColor_${personalColorResult.season}`, {
      event_category: "personalColorAnalysis",
    });
    if (!personalColorResult) {
    console.log("Personal color analysis failed");
    return;
  }

  // Determine gender based on face analysis data
  let isMale = false;
  if (faceData && faceData.dominant_gender) {
    isMale = faceData.dominant_gender === 'Man';
  }

  // Get fashion and beauty recommendations
  const fashionRec = getFashionRecommendations(personalColorResult.season, isMale);
  const beautyRec = getBeautyRecommendations(personalColorResult.season, isMale);

  // Display face images in all quadrants
  displayFaceInQuadrants();

  // Show best matching season
  showBestMatchingSeason(personalColorResult.season);

  // Display fashion recommendations
  const fashionHtml = fashionRec ? `
    <h4><strong>${fashionRec.style}</strong></h4>
    <div class="mb-3">
      <strong>${getMeta("recommendationLabels.recommended_items")}:</strong>
      <ul class="mt-2">
        ${fashionRec.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
    <div>
      <strong>${getMeta("recommendationLabels.recommended_colors")}:</strong>
      <div class="color-display mt-2">
        ${fashionRec.colors.map(color => `<span class="badge">${color}</span>`).join('')}
      </div>
    </div>
  ` : `<p>${getMeta("statusMessages.style_analyzing")}</p>`;

  // Display beauty recommendations
  const beautyHtml = beautyRec ? `
    <h4><strong>${beautyRec.makeup || beautyRec.skincare}</strong></h4>
    ${beautyRec.lipColor ? `
      <div class="mb-3">
        <strong>${getMeta("recommendationLabels.recommended_lip_colors")}:</strong>
        <div class="color-display mt-2">
          ${beautyRec.lipColor.map(color => `<span class="badge">${color}</span>`).join('')}
        </div>
      </div>
    ` : ''}
    ${beautyRec.eyeColor ? `
      <div class="mb-3">
        <strong>${getMeta("recommendationLabels.recommended_eye_colors")}:</strong>
        <div class="color-display mt-2">
          ${beautyRec.eyeColor.map(color => `<span class="badge">${color}</span>`).join('')}
        </div>
      </div>
    ` : ''}
    <div>
      <strong>${getMeta("recommendationLabels.beauty_tips")}:</strong>
      <ul class="mt-2">
        ${beautyRec.tips.map(tip => `<li>${tip}</li>`).join('')}
      </ul>
    </div>
  ` : `<p>${getMeta("statusMessages.beauty_analyzing")}</p>`;

  // Update DOM
  const fashionStyleElement = document.getElementById('fashion-style-result');
  const beautyStyleElement = document.getElementById('beauty-style-result');

  if (fashionStyleElement) fashionStyleElement.innerHTML = fashionHtml;
  if (beautyStyleElement) beautyStyleElement.innerHTML = beautyHtml;

  // Show the recommendations section
  const styleRecommendationsElement = document.getElementById('style-recommendations');
  if (styleRecommendationsElement) {
    styleRecommendationsElement.style.display = 'block';
  }
}

function displayFaceInQuadrants() {
  // Get the cropped face image
  const faceCanvas = document.getElementById('cropped-face-image-2');
  if (!faceCanvas) return;

  const faceImageSrc = faceCanvas.toDataURL();

  // Display the same face image in all quadrants
  const seasons = ['spring', 'summer', 'autumn', 'winter'];
  seasons.forEach(season => {
    const faceImg = document.getElementById(`${season}-face`);
    if (faceImg) {
      faceImg.src = faceImageSrc;
    }
  });
}

function showBestMatchingSeason(bestSeason) {
  // Hide all best badges first
  const badges = document.querySelectorAll('.best-badge');
  badges.forEach(badge => badge.style.display = 'none');

  // Map season names to quadrant IDs
  const seasonMapping = {
    [getMeta("personalColorSeasons.warm_spring")]: 'spring-quadrant',
    [getMeta("personalColorSeasons.warm_autumn")]: 'autumn-quadrant',
    [getMeta("personalColorSeasons.cool_summer")]: 'summer-quadrant',
    [getMeta("personalColorSeasons.cool_winter")]: 'winter-quadrant'
  };

  // Show best badge for the matching season
  const matchingQuadrantId = seasonMapping[bestSeason];
  if (matchingQuadrantId) {
    const matchingQuadrant = document.getElementById(matchingQuadrantId);
    if (matchingQuadrant) {
      const badge = matchingQuadrant.querySelector('.best-badge');
      if (badge) {
        badge.style.display = 'block';
      }

      // Add special highlight effect
      // matchingQuadrant.style.transform = 'scale(1.05)';
      // matchingQuadrant.style.zIndex = '10';
      // matchingQuadrant.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
    }
  }
}

function displayIdolPredictionBriefly(data) {
  $("#result-similar-idol").show();
  for (var rank = 1; rank <= 10; rank++) {
    try {
      const r = data[rank - 1].name; // .split("/")[1]]

      // $('#fr' + rank).html(r+ ": " +  ((1 - data[rank - 1].distance) * 100).toFixed(1) + "%");
      $('#r' + rank).html(r + ": " + ((1 - data[rank - 1].distance) * 100).toFixed(1) + "% 🔍");
      // console.log(data[rank-1].originalIdentity);
      //  object-fit: cover;
      $('#rank' + rank).html(`
        <div style="width: 100%; height: 100%; max-width: 512px; max-height: 512px; margin: 0 auto;">
          <img src="/${data[rank-1].originalIdentity}"
               style="padding: 4%; border-radius: 20%; width: 100%; height: 100%;"
               alt="${r} 닮은 연예인 - 셀럽미 닮은꼴 테스트"
               id="imgRank${rank}"
               crossorigin="anonymous">
        </div>
      `);

     //  $('#search' + rank).hide();
      // $('#s' + rank).show();
      if (rank == 1) {
        displayIdolPrediction(1, initial=true);
        $('#celeb-result').html(
          confidenceStr + "<br/>" +
          getMeta("face_in_picture") + r + getMeta("it_resembles")
          // + "셀럽 이름을 눌러서 이미지를 검색해보세요. <br/><br/>" 
        )

        
      }
    } catch (error) {
      console.log(error);
      gtag("event", "errorDisplayIdolPredictionBriefly", {
        event_category: "error",
      });
    }
  }


}

function displayIdolPrediction(rank, initial = false) {
  data = similarIdolData;

  // console.log(data);
  const r = data[rank - 1].name; // .split("/")[1]];
  const koName = data[rank - 1].nameKo; // .split("/")[1]];
  try {
    // if ($('#search' + rank).is(":visible")) {
    //   $('#search' + rank).hide();
    //   $('#r' + rank).html(r + ": " + ((data[rank - 1].distance) * 100).toFixed(1) + "% 🔍");
    // }
    // else {

      // console.log(r);
      q =  koName;
      // q = '"' + koName + '"' + " portrait -youtube";
      // q = koName + " portrait -youtube -남편 -아내 -여러명 -논란";

      // var element = google.search.cse.element.getElement('q' + rank);
      var element = google.search.cse.element.getElement('q0');
      element.execute(q);
      
      if (!initial) {
        $("html, body").animate(
          {
            scrollTop: $("#result-creation").offset().top - 50 // 50px 여유 공간
          },
          800 // 애니메이션 지속 시간(ms)
        );
      }
      $('#search' + rank).show();
      // $('#r' + rank).html(r + ": " + ((data[rank - 1].distance) * 100).toFixed(1) + "% _");

      // window.history.replaceState({}, document.title, "/");
      window.history.replaceState({}, document.title, getBaseUrl());

      gtag("event", "similar_idol_result", {
        celeb: koName.replaceAll(" ", ""),
        rank: rank
      });
      gtag("event", koName.replaceAll(" ", ""), {
        event_category: "similar_idol_result",
        rank: rank,
        result_face: true,
      });
    // }

    displayComparisonCelebMe(rank); // 첫번째 결과로 이미지 표시하기

  } catch (error) {
    console.log(error);
    gtag("event", "errorDisplayIdolPrediction", {
        event_category: "error",
      });
  }


}

/**
  Displays Similar idol name from model prediction
*/
// async function predict() {

//   displayIdolPrediction(valuesArr, namesArr);
// }


let selectedImages = [null, null];
function selectImage(input, imageNumber) {
  // TODO: 닮은비율찾기 구현
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            let previewImg = document.getElementById('preview-' + imageNumber);
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
            selectedImages[imageNumber - 1] = input.files[0];

            // 두 이미지가 모두 선택되었는지 확인
            // if (selectedImages[0] && selectedImages[1]) {
            //     document.getElementById('start-button').style.display = 'block';
            // }
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function resizeAndCropImage(file, targetSize) {
  // match 에서 사용하는 crop image 모듈 (얼굴이 아닌 512로 자르기))
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => {
      reject(new Error('파일 읽기 실패'));
      gtag("event", "errorResizing", {
        event_category: "error",
      });
    };
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let width = img.width;
      let height = img.height;
      let offsetX = 0;
      let offsetY = 0;

      // 짧은 쪽을 targetSize에 맞춤
      if (width < height) {
        height = height * (targetSize / width);
        width = targetSize;
      } else {
        width = width * (targetSize / height);
        height = targetSize;
      }

      // 크롭할 위치 계산
      offsetX = (width - targetSize) / 2;
      offsetY = (height - targetSize) / 2;

      // 캔버스 크기 설정
      canvas.width = targetSize;
      canvas.height = targetSize;

      // 이미지를 리사이즈하고 크롭하여 그리기
      ctx.drawImage(img, -offsetX, -offsetY, width, height);

      resolve(canvas.toDataURL('image/jpeg', 0.95));

      // // 캔버스를 Blob으로 변환
      // canvas.toBlob((blob) => {
      //   resolve(blob);
      // }, 'image/jpeg', 0.95);
      };
      img.onerror = () => {
        reject(new Error('이미지 로딩 실패'));
        gtag("event", "errorResizingCrop", {
        event_category: "error",
      });
      };
      img.src = e.target.result;//
    };
    //  URL.createObjectURL(file);
    reader.readAsDataURL(file);
  });
}

// 이미지 처리 및 FormData에 추가하는 함수
async function processAndAppendImage(file, formData, name) {
  const processedImage = await resizeAndCropImage(file, 512);
  // Base64 데이터 URL을 Blob으로 변환
  const response = await fetch(processedImage);
  const blob = await response.blob();
  formData.append(name, blob, file.name);

  const img = document.getElementById("processed-" + name);
  img.src = processedImage;
}

async function startMatch() {
  if (selectedImages[0] == null || selectedImages[1] == null) {
    gtag("event", "matchStartError", {
      event_category: "startMatch",
    });
    alert(getMeta('face_error_select'));
    return;
  }
  gtag("event", "matchStartOK", {
    event_category: "startMatch",
  });

  $("#loading-message").html(getMeta("analyzing_face"))
  $("#loading").show();
  // 1초 대기
  await new Promise(resolve => setTimeout(resolve, 1000));


  const formData = new FormData();
  await processAndAppendImage(selectedImages[0], formData, "img1");
  await processAndAppendImage(selectedImages[1], formData, "img2");

  // formData.append("img1", selectedImages[0]); // Adjust file type as needed
  // formData.append("img2", selectedImages[1]); // Adjust file type as needed
  try {
    const response = await fetch(apiUrl + '/verify', {
      method: 'POST',
      body: formData
    });
    const faceCombResponse = await response.json();
    displayResults(faceCombResponse);
    gtag("event", "matchFinish", {
      event_category: "startMatch",
    });
  } catch (error) {
    console.error('Error:', error);
    gtag("event", "matchFinishError", {
      event_category: "startMatch",
    });
    alert(getMeta("error_msg"));
  }
  $("#loading").hide();
}

function createComparisonImage(img1, img2, rank, celebme=false) {
    const canvas = document.getElementById('comparison-canvas');
    const ctx = canvas.getContext('2d');

    // 캔버스 크기 설정
    canvas.width = 800;
    canvas.height = 200;

    // 이미지 그리기 함수
    function drawImage(img, x, y, width, height) {
        ctx.drawImage(img, 0, 0, img.width, img.height, x, y, width, height);
    }

    // 왼쪽 이미지
    drawImage(img1, 0, 0, 200, 200);

    // 오른쪽 이미지
    drawImage(img2, 600, 0, 200, 200);

    // 중앙 왼쪽 (66% img1, 33% img2)
    ctx.globalAlpha = 0.66;
    drawImage(img1, 200, 0, 200, 200);
    ctx.globalAlpha = 0.33;
    drawImage(img2, 200, 0, 200, 200);

    // 중앙 오른쪽 (33% img1, 66% img2)
    ctx.globalAlpha = 0.33;
    drawImage(img1, 400, 0, 200, 200);
    ctx.globalAlpha = 0.66;
    drawImage(img2, 400, 0, 200, 200);

    // 닮은 정도 표시
    if (celebme == true) {
      document.getElementById('similar-celeb').textContent = `${similarIdolData[rank-1].name}`;
      const similarityScore = ((1 - similarIdolData[rank-1].distance) * 100);
      document.getElementById('similarity-score').textContent = `${similarityScore.toFixed(2)}%`;

      // 일치 여부 표시
      const threshold1 = 65; // 예시 임계값, 실제 사용 시 조정 필요
      const threshold2 = 55; // 예시 임계값, 실제 사용 시 조정 필요
      var similarType = "face_not_match";
      if (similarityScore <= threshold2) {
        similarType = "face_not_match";
      } else if(similarityScore <= threshold1) {
        similarType = "face_not_match_but_similar";
      } else {
        similarType = "face_match";
      }
      gtag("event", "CelebmeMatchType_" + similarType, {
        event_category: "celebMe",
      });
      $("#verification-result").html(getMeta(similarType));
    }

    // 투명도 초기화
    ctx.globalAlpha = 1;

    // 캡처 및 다운로드 버튼 표시
    // const element = document.getElementById('result-message-section');
    // element.style.display = 'block';
    const captureButton = document.getElementById('download-comparison');
    // captureButton.style.display = 'block';
    // const captureCreateButton = document.getElementById('make-comparison');
    // captureCreateButton.style.display = 'block';
    const createButton = document.getElementById('createComparisonPic');
    createButton.style.display = 'none';
    captureButton.addEventListener('click', captureAndDownload);
}

// 이미지 다운로드 함수
function captureAndDownload() {
  gtag("event", "matchCaptureAndDownload", {
    event_category: "startMatch",
  });
    const element = document.getElementById('result-message-section');
    html2canvas(element, {useCORS: true, allowTaint: true}).then(function(canvas) {
        const link = document.createElement('a');
        link.download = 'celebme-' + Date.now().toString() + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// 이미지 로딩을 Promise로 감싸는 함수
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
    img.crossOrigin = 'anonymous';
  });
}

async function displayResults(result) {
  // 결과 섹션 표시
  document.getElementById('match-result-message').style.display = 'block';

  // 다운로드 버튼에 이벤트 리스너 추가
  const downloadButton = document.getElementById('download-comparison');
  // downloadButton.style.display = 'block';
  downloadButton.addEventListener('click', captureAndDownload);

  // 얼굴 인식 여부 확인
  const isFace1Detected = !(result.facial_areas.img1.w === 512 && result.facial_areas.img1.h === 512);
  const isFace2Detected = !(result.facial_areas.img2.w === 512 && result.facial_areas.img2.h === 512);

  if (!isFace1Detected || !isFace2Detected) {
    // 하나 이상의 이미지에서 얼굴이 인식되지 않은 경우
    $("#img1-face-detected").html(!isFace1Detected ? getMeta('face_img1') : "");
    $("#img2-face-detected").html(!isFace2Detected ? getMeta('face_img2') : "");
    $("#face-not-detected").html(getMeta('face_not_detected'));
  } 

  // 유사도 점수 계산 (0에서 100 사이의 값으로 정규화)
  const similarityScore = Math.max(0, Math.min(100, (1 - result.distance) * 100));
  document.getElementById('similarity-score').textContent = `${similarityScore.toFixed(2)}%`;

  // 일치 여부 표시
  const threshold1 = 65; // 예시 임계값, 실제 사용 시 조정 필요
  const threshold2 = 55; // 예시 임계값, 실제 사용 시 조정 필요
  var similarType = "face_not_match";
  if (similarityScore <= threshold2) {
    similarType = "face_not_match";
  } else if(similarityScore <= threshold1) {
    similarType = "face_not_match_but_similar";
  } else {
    similarType = "face_match";
  }
  gtag("event", "matchType_" + similarType, {
    event_category: "startMatch",
  });

  $("#verification-result").html(getMeta(similarType));
  document.getElementById('verification-result').style.color = similarType == "face_match" ? 'green' : 'blue';

  // 이미지를 얼굴영역으로  자르기 및 표시
  cropAndDisplayImage(document.getElementById('processed-img1'), result.facial_areas.img1, 'cropped-image-1');
  cropAndDisplayImage(document.getElementById('processed-img2'), result.facial_areas.img2, 'cropped-image-2');

  // 연결되는 이미지 생성
  const img1Src = document.getElementById('cropped-image-1').src;
  const img2Src = document.getElementById('cropped-image-2').src;

  // 두 이미지를 동시에 로드
  const [img1, img2] = await Promise.all([
      loadImage(img1Src),
      loadImage(img2Src)
  ]);

  // 이미지가 모두 로드된 후 비교 이미지 생성
  createComparisonImage(img1, img2, 1);

}

function cropAndDisplayImage(imgSource, area, elementId) {


  const canvas = document.createElement('canvas');
  canvas.width = area.w;
  canvas.height = area.h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imgSource, area.x, area.y, area.w, area.h, 0, 0, area.w, area.h);
  document.getElementById(elementId).src = canvas.toDataURL();

}

async function readURL(input) {
  if (input.files && input.files[0]) {
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
    $("#celeb-spinner").show();
    $(".result-message").hide();
    $(".share-action-btn").hide();
    $(".try-again-btn").hide();
    $("#result-similar-idol").hide();
    setAnalysisStep(1);
    $("#loading-message").html(getMeta("analyzing_face"));
    setTimeout(function() { setAnalysisStep(2); $("#loading-message").html(getMeta("recognizing_face")); }, 1000);
    setTimeout(function() { setAnalysisStep(3); $("#loading-message").html(getMeta("analyzing_features")); }, 2800);
    setTimeout(function() { setAnalysisStep(4); $("#loading-message").html(getMeta("comparing_data")); }, 5500);

    document.getElementById("face-image").onload = function (e) {
      var imgData = document.getElementById("face-image");
      cropImage(imgData, function (resizedImg) {
        setTimeout(function () {
          analyzeFace(resizedImg);
        }, 5000);
      });
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
  $("html, body").animate(
    {
      scrollTop: document.getElementById("headtitle").offsetTop - 50 // 50px 여유 공간
    },
    800 // 애니메이션 지속 시간(ms)
  );

  // 페이지 새로고침해서 광고 다시 로드하기 위한 용도
  window.location.href = getBaseUrl();
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
      gtag("event", "errorCopyToClipboard", {
        event_category: "error",
      });
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
    // console.log(rsStr + ":" + simStr);
    // const faceStr = encodeURIComponent(JSON.stringify(faceData));
    $('#modalMessage').html(getMeta("copied_with_result"));
    return "?result=" + simStr; //  + "&face=" + faceStr;
  }
  $('#modalMessage').html(getMeta("copied_link"));
  return "";
}

function getBaseUrl() {
  // console.log(window.location.href.split("?"));
  var name = window.location.href.split("?")[0];
  // var name = window.location.hostname;
  name = name.split("#")[0];
  // console.log(name);
  // if (name.includes("index") == false) {
  //   if (lang == "ko") {
  //     name = name + "index.html";
  //   } else {
  //     name = name + lang + "/index.html";
  //   }
  // }


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
    gtag("event", "errorShareUrl", {
        event_category: "error",
      });
    console.error("copy to clipboard error.");
  }

}

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) { }
}

function showResults(resultParam, faceParam) {
  // result 가 있을경우 canonical url 에 추가  : 셀럽미는 결과가 너무 많아서 일단 보류
  // var uC = document.querySelector("link[rel='canonical']");
  // var newURL = window.location.href.split("#")[0];
  // uC.setAttribute("href", newURL);

  $("#display4").hide();
  $("#display3").hide();
  $("#display5").hide();
  $("#display6").hide();
  $(".section").hide();
  $(".file-upload").hide();
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
      $('#r1').html(similarIdolData[0].name + ": " + ((1 - similarIdolData[0].distance) * 100).toFixed(1) + "% 🔍");
      // displayIdolPredictionBriefly(similarIdolData);
      if (similarIdolData && similarIdolData[0] && similarIdolData[0].originalIdentity) {


        $('#rank1').html(`
          <div style="width: 100%; height: 100%; max-width: 512px; max-height: 512px; margin: 0 auto;">
            <img src="/${similarIdolData[0].originalIdentity}" 
                style="padding: 4%; border-radius: 20%; width: 100%; height: 100%;"
                alt="Original celebrity image"
                id="imgRank1"
                crossorigin="anonymous">
          </div>
        `);
      }

      displayIdolPrediction(1, initial=true);
      $('#celeb-result').html(getMeta("face_in_picture") + similarIdolData[0].name + getMeta("it_resembles")
        // + "셀럽 이름을 눌러서 이미지를 검색해보세요. <br/><br/>" 
      )

      $('#extra-similars').hide();
      // $('#result-creation').hide();

      $("html, body").animate(
        {
          scrollTop: document.getElementById("headtitle").offsetTop - 50 // 50px 여유 공간
        },
        800 // 애니메이션 지속 시간(ms)
      );

      const name = getBaseUrl()
      window.history.replaceState({}, document.title, name);
      clearInterval(int);
    }

  }, 200)



  $(".try-again-btn").show();
  $(".share-action-btn").show();
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

function shareKakao(customTemplateId) {
  var templateId = customTemplateId || 104987;
  var link = getIndexParamsUrl(); // + getUriComoponents: 버그로 막아둠
  if (similarIdolData != null) {
    link = link + getUriComponents(); // 결과공유url
    // console.log(link);
    Kakao.Share.sendCustom(
      {
        templateId: templateId,
        templateArgs: {
          'result_url': link,    // encoded url
          'result': similarIdolData[0].name + ": " + ((1 - similarIdolData[0].distance) * 100).toFixed(1) + "%" // result text '에스파 닝닝: 56%'
        }
      }
    );
  } else {
    // console.log(link);
    Kakao.Share.sendCustom(
      {
        templateId: templateId,
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
  displaySampleStyleRecommendations();
}


// }} result 쿼리파라미터가 존재할 땐 바로 결과표시 끝
async function displayComparisonCelebMe(searchIdx) {
  gtag('event', 'displayComparisonCelebMe', {'event_category': 'displayComparisonCelebMe', 'event_label': 'displayComparisonCelebMe'});
  // 로딩표시
  var loadingGif = document.getElementById('comparisonLoading');
  loadingGif.style.display = 'block'; // loading

  // 3초 대기
  await new Promise(resolve => setTimeout(resolve, 5000));

  // 연결되는 이미지 생성
  var img1 = document.getElementById('cropped-face-image-2'); 
  // var search1 = document.getElementById('search' + searchIdx);  // 첫번째일 때
  // var target = search1.getElementsByClassName('gs-image-scalable').item(1);
  var target = document.getElementById('imgRank' + searchIdx);


  // 두 이미지를 동시에 로드
  const [img2] = await Promise.all([
      loadImage(target.src)
  ]);


  // 이미지가 모두 로드된 후 비교 이미지 생성
  createComparisonImage(img1, img2, searchIdx, celebme=true);

  // 로딩 토글
  loadingGif.style.display = 'none';
  var downButton = document.getElementById('download-comparison');
  // downButton.style.display = 'block';
}

function displayAnimation(searchIdx) {
  gtag('event', 'gif생성클릭', {'event_category': 'gif생성클릭', 'event_label': 'gif생성클릭'});
  try {
    (adsbygoogle = window.adsbygoogle || []).push({});
  } catch (error) {

  }

  var image1 = document.getElementById('cropped-face-image-2'); // cropped-face-image-1
  // var image2 = document.getElementById('cropped-face-image-1');

  // var search1 = document.getElementById('search' + searchIdx);  // 첫번째일 때
  // var target = search1.getElementsByClassName('gs-image-scalable').item(1);
  var target = document.getElementById('imgRank' + searchIdx);

  const image2 = new Image();
  image2.src = target.src;
  image2.crossOrigin = 'anonymous';

  var loadingGif = document.getElementById('gifLoading');
  loadingGif.style.display = 'block'; // loading


  image2.onload = () => {
    const canvas = document.getElementById('hiddenCanvas');
    const ctx = canvas.getContext('2d');


    let gif = new GIF({
      workers: 1,
      // workerScript: URL.createObjectURL(workerBlob),
      quality: 1,
      width: canvas.width,
      height: canvas.height,
      dither: false, // 'Atkinson-serpentine',
      background: 0x00FF00,
      transparent: null, // 0xFF0000, // '#0f0', //  0x00FF00,
      debug: false
      //width: 1024,
      // height: 500,
    });


    const transitionFrames = 20; // Number of frames for the transition
    // Draw image1
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
    ctx.font = "22px MaruBuriBold";
    var fontWidth = 22;
    var fontHeight = canvas.height - fontWidth;
    ctx.fillStyle = "#ffffff";
    ctx.lineWidth = 1.2;
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 2;
    ctx.strokeStyle = '#000000';
    var contentText = "celebme.net " + similarIdolData[searchIdx - 1].name + ": " + (similarIdolData[searchIdx - 1].distance * 100).toFixed(1) + "%";
    ctx.fillText(contentText, fontWidth, fontHeight);
    ctx.strokeText(contentText, fontWidth, fontHeight);
    gif.addFrame(ctx, { copy: true, delay: 500 }); // Delay before transition
    ctx.globalCompositeOperation = 'source-over';
    // Transition frames
    for (let i = 0; i <= transitionFrames; i++) {
      ctx.globalAlpha = i / transitionFrames;
      ctx.drawImage(image2, 0, 0, canvas.width, canvas.height);
      ctx.fillText(contentText, fontWidth, fontHeight);
      ctx.strokeText(contentText, fontWidth, fontHeight);
      gif.addFrame(ctx, { copy: true, delay: 100 });
    }

    // Draw image2
    ctx.globalAlpha = 1.0;
    ctx.drawImage(image2, 0, 0, canvas.width, canvas.height);
    ctx.fillText(contentText, fontWidth, fontHeight);
    ctx.strokeText(contentText, fontWidth, fontHeight);
    gif.addFrame(ctx, { copy: true, delay: 500 }); // Delay after transition
    console.log("finished1");

    // Render the GIF
    gif.on('finished', (blob) => {

      console.log("finished");
      var reader = new FileReader();
      reader.readAsDataURL(blob); // Convert blob to base64
      reader.onloadend = function () {
        var base64data = reader.result; // This is the base64 string
        var gifImage = document.getElementById('outputGIF');
        gifImage.src = base64data;

      };

      var downloadButton = document.getElementById('downloadGif');
      downloadButton.style.display = 'block';
      downloadButton.addEventListener('click', function () {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        var now = new Date();
        var year = now.getFullYear();
        var month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        var day = String(now.getDate()).padStart(2, '0');

        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var seconds = String(now.getSeconds()).padStart(2, '0');

        a.download = `celebme_${year}-${month}-${day}_${hours}${minutes}${seconds}.gif`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });

      loadingGif.style.display = 'none';
      var animation = document.getElementById('animation');
      animation.style.display = 'block';

    });

    gif.render();


  };





  // });
}




function drawDefaultChart() {
  const autocolors = window['chartjs-plugin-autocolors'];
  Chart.register(autocolors);
  //  Chart.register(ChartDataLabels);  // 표시하면 너무 난잡해짐
  Chart.defaults.font.size = 14;

  var ageData = {
    labels: [getMeta("age")],
    datasets: [{
      label: getMeta("age"),
      data: [15],
      backgroundColor: ['#11BB84']
    }]
  };

  ageChart = new Chart(document.getElementById('ageChart'), {
    type: 'bar',
    data: ageData,
    plugins: [ChartDataLabels],
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        }
      }
    }
  });

  const genderData = {
    labels: [getMeta("man"), getMeta("woman"), ],
    datasets: [{
      label: getMeta("gender"),
      maintainAspectRatio: false,
      data: [9.1, 90.9],
      backgroundColor: ['#36A2EB', '#FF6384']
    }]
  };

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
  var sampleEmotion = {
    angry
    : 
    0.24389417376369238,
    disgust
    : 
    0.000049055682893595076,
    fear
    : 
    0.1466436544433236,
    happy
    : 
    94.46457028388977
    ,
    neutral
    : 
    1.4133663848042488,
    sad
    : 
    3.7277135998010635,
    surprise
    :  
    0.0037621048250002787}
  const emotionData = {
    labels: Object.keys(sampleEmotion).flatMap(value => {
      return getMeta(value);
    }),
    datasets: [{
      label: getMeta("emotion"),
      data: Object.values(sampleEmotion),
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
  var raceSampleData = {
    asian
      : 
      97.17755913734436,

      black
      : 
      0.00031450833830604097,
      indian
      : 
      0.000944622115639504,
      "latino hispanic"
      : 
      2.0162636414170265,
      "middle eastern"
      : 
      0.2743645804002881,
      white
      : 
      0.5305574741214514
  }
  const raceData = {
    labels: Object.keys(raceSampleData).flatMap(value => {
      return getMeta(value);
    }),
    datasets: [{
      label: getMeta("race"),
      data: Object.values(raceSampleData),
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

function displaySampleStyleRecommendations() {
  // Sample personal color result
  

  // Display sample face in all quadrants (placeholder image)
  const sampleFaceImage = '/banner_org.png'; // Using existing banner as placeholder
  const seasons = ['spring', 'summer', 'autumn', 'winter'];
  seasons.forEach(season => {
    const faceImg = document.getElementById(`${season}-face`);
    if (faceImg) {
      faceImg.src = sampleFaceImage;
    }
  });

  // Show best matching season (spring as sample)
  const springQuadrant = document.getElementById('spring-quadrant');
  if (springQuadrant) {
    const badge = springQuadrant.querySelector('.best-badge');
    if (badge) {
      badge.style.display = 'block';
    }
    // springQuadrant.style.transform = 'scale(1.05)';
    // springQuadrant.style.zIndex = '10';
    // springQuadrant.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
  }

  // Update DOM with sample content
  const fashionStyleElement = document.getElementById('fashion-style-result');
  const beautyStyleElement = document.getElementById('beauty-style-result');

  // if (fashionStyleElement) fashionStyleElement.innerHTML = sampleFashionHtml;
  // if (beautyStyleElement) beautyStyleElement.innerHTML = sampleBeautyHtml;

  // Show the recommendations section
  const styleRecommendationsElement = document.getElementById('style-recommendations');
  if (styleRecommendationsElement) {
    styleRecommendationsElement.style.display = 'block';
  }
}