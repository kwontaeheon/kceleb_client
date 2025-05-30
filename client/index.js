const repoUrl =
  "https://raw.githubusercontent.com/kwontaeheon/kceleb_model/main/";
const menModelUrl = repoUrl + "tfjs_men/tfjs/model.json";
const menLabelUrl = repoUrl + "men_label/labels.txt";
const womenModelUrl = repoUrl + "tfjs_women/tfjs/model.json";
const womenLabelUrl = repoUrl + "women_label/labels.txt";

let menModel, womenModel, isMale, menLabel, womenLabel;
async function init() {
  isMale = document.getElementById("fmselector").checked;
  if (isMale) {
    if (!menModel) {
      menModel = await tf.loadGraphModel(menModelUrl);
      response = await fetch(menLabelUrl);
      text = await response.text();
      menLabel = text.split("\n");
      // console.log(menLabel);
      console.log("loaded");
    }
  } else {
    if (!womenModel) {
      womenModel = await tf.loadGraphModel(womenModelUrl);
      response = await fetch(womenLabelUrl);
      text = await response.text();
      womenLabel = text.split("\n");
      // console.log(womenLabel);
      console.log("loaded");
    }
  }
}

function displayIdolPrediction(values, indices) {
  var resultTitle = indices[0];
  var resultExplain = (values[0] * 100).toFixed(1);
  var title =
    "<div class='h2'> 셀럽미: 닮은 아이돌 찾기 결과 </div>" +
    "<div class='h3' style='padding: 10px;'>" +
    resultTitle +
    " (" +
    resultExplain +
    "%) </div>";
  var explain =
    "<div class='h5' > " +
    indices[1] +
    " (" +
    (values[1] * 100).toFixed(1) +
    "%) / " +
    indices[2] +
    " (" +
    (values[2] * 100).toFixed(1) +
    "%) </div>";
  $(".result-message").html(title + explain);
  $("#search").attr(
    "src",
    "search.html?q=allintitle:" + resultTitle + " -청량 -단체사진 -닮은"
  );

  // Show style recommendations
  displayStyleRecommendations();

  gtag("event", resultTitle, {
    event_category: resultExplain,
    result_face: true,
  });
}

function analyzePersonalColor(imageData) {
  // Extract color information from the face image
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 300;
  canvas.height = 300;
  
  // Convert tensor to image data for color analysis
  const img = document.getElementById("face-image");
  ctx.drawImage(img, 0, 0, 300, 300);
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
  
  if (avgR > avgG && avgR > avgB) {
    // Warm undertones
    if (avgR - avgG > 20) {
      personalColor = '웜톤 (봄)';
      colorPalette = ['코랄', '피치', '아이보리', '골드', '터쿼이즈'];
    } else {
      personalColor = '웜톤 (가을)';
      colorPalette = ['베이지', '카키', '브라운', '머스타드', '테라코타'];
    }
  } else {
    // Cool undertones
    if (avgB > avgG) {
      personalColor = '쿨톤 (겨울)';
      colorPalette = ['네이비', '블랙', '화이트', '로얄블루', '실버'];
    } else {
      personalColor = '쿨톤 (여름)';
      colorPalette = ['라벤더', '민트', '소프트핑크', '그레이', '파스텔블루'];
    }
  }
  
  return {
    season: personalColor,
    colors: colorPalette,
    skinTone: { r: Math.round(avgR), g: Math.round(avgG), b: Math.round(avgB) }
  };
}

function getFashionRecommendations(personalColor, isMale) {
  const recommendations = {
    '웜톤 (봄)': {
      female: {
        style: '밝고 화사한 스타일',
        items: ['플로럴 원피스', '코랄 블라우스', '아이보리 니트', '베이지 트렌치코트'],
        colors: ['코랄', '피치', '아이보리', '라이트카키']
      },
      male: {
        style: '내추럴 캐주얼 스타일',
        items: ['베이지 셔츠', '카키 치노팬츠', '네이비 블레이저', '브라운 가죽 재킷'],
        colors: ['베이지', '카키', '네이비', '브라운']
      }
    },
    '웜톤 (가을)': {
      female: {
        style: '시크하고 우아한 스타일',
        items: ['머스타드 니트', '브라운 코트', '카키 팬츠', '테라코타 블라우스'],
        colors: ['머스타드', '브라운', '카키', '테라코타']
      },
      male: {
        style: '클래식 정장 스타일',
        items: ['브라운 수트', '머스타드 셔츠', '카키 치노팬츠', '다크브라운 코트'],
        colors: ['브라운', '머스타드', '카키', '다크브라운']
      }
    },
    '쿨톤 (겨울)': {
      female: {
        style: '모던하고 세련된 스타일',
        items: ['블랙 드레스', '화이트 블라우스', '네이비 코트', '실버 액세서리'],
        colors: ['블랙', '화이트', '네이비', '로얄블루']
      },
      male: {
        style: '포멀 비즈니스 스타일',
        items: ['네이비 수트', '화이트 셔츠', '블랙 코트', '실버 넥타이'],
        colors: ['네이비', '화이트', '블랙', '그레이']
      }
    },
    '쿨톤 (여름)': {
      female: {
        style: '로맨틱하고 부드러운 스타일',
        items: ['라벤더 원피스', '소프트핑크 블라우스', '그레이 가디건', '민트 스카프'],
        colors: ['라벤더', '소프트핑크', '그레이', '민트']
      },
      male: {
        style: '젠틀맨 캐주얼 스타일',
        items: ['그레이 셔츠', '라이트블루 팬츠', '네이비 니트', '화이트 스니커즈'],
        colors: ['그레이', '라이트블루', '네이비', '화이트']
      }
    }
  };
  
  return recommendations[personalColor] ? recommendations[personalColor][isMale ? 'male' : 'female'] : null;
}

function getBeautyRecommendations(personalColor, isMale) {
  const recommendations = {
    '웜톤 (봄)': {
      female: {
        makeup: '밝고 생기있는 메이크업',
        lipColor: ['코랄핑크', '피치', '오렌지레드'],
        eyeColor: ['골드브라운', '코퍼', '피치'],
        tips: ['글로우한 베이스 메이크업', '코랄 블러셔로 생기 연출', '브라운 마스카라 추천']
      },
      male: {
        skincare: '수분 공급 중심 케어',
        tips: ['세안 후 토너와 로션으로 기본 케어', '자외선 차단제 필수', '립밤으로 입술 관리'],
        colors: ['내추럴한 피부 톤 유지']
      }
    },
    '웜톤 (가을)': {
      female: {
        makeup: '깊이있고 우아한 메이크업',
        lipColor: ['브릭레드', '버건디', '브라운'],
        eyeColor: ['골드', '브론즈', '다크브라운'],
        tips: ['매트한 베이스', '브론저로 윤곽 강조', '다크브라운 아이라이너']
      },
      male: {
        skincare: '안티에이징 케어',
        tips: ['에센스와 크림으로 영양 공급', '주기적 스크럽으로 각질 제거', '아이크림으로 눈가 케어'],
        colors: ['따뜻한 피부 톤 유지']
      }
    },
    '쿨톤 (겨울)': {
      female: {
        makeup: '강렬하고 시크한 메이크업',
        lipColor: ['레드', '베리', '플럼'],
        eyeColor: ['실버', '블랙', '네이비'],
        tips: ['화이트 베이스로 밝은 피부 연출', '선명한 립컬러', '블랙 아이라이너로 또렷한 눈매']
      },
      male: {
        skincare: '미백과 수분 케어',
        tips: ['비타민C 세럼으로 브라이트닝', '하이드레이팅 크림', '썬크림으로 피부 보호'],
        colors: ['깨끗하고 밝은 피부 톤']
      }
    },
    '쿨톤 (여름)': {
      female: {
        makeup: '자연스럽고 우아한 메이크업',
        lipColor: ['로즈핑크', '라벤더', '베리핑크'],
        eyeColor: ['실버', '라벤더', '로즈골드'],
        tips: ['투명한 베이스', '소프트한 그라데이션', '핑크 블러셔로 자연스러운 홍조']
      },
      male: {
        skincare: '순한 제품으로 기본 케어',
        tips: ['민감성 피부용 제품 사용', '가벼운 로션으로 보습', '자극 없는 세안제'],
        colors: ['자연스러운 피부 톤 유지']
      }
    }
  };
  
  return recommendations[personalColor] ? recommendations[personalColor][isMale ? 'male' : 'female'] : null;
}

function displayStyleRecommendations() {
  // Get personal color analysis
  const personalColorResult = analyzePersonalColor();
  
  // Get fashion and beauty recommendations
  const fashionRec = getFashionRecommendations(personalColorResult.season, isMale);
  const beautyRec = getBeautyRecommendations(personalColorResult.season, isMale);
  
  // Display personal color result
  const personalColorHtml = `
    <h6><strong>${personalColorResult.season}</strong></h6>
    <p><small>피부톤: RGB(${personalColorResult.skinTone.r}, ${personalColorResult.skinTone.g}, ${personalColorResult.skinTone.b})</small></p>
    <div class="mb-2">
      <strong>추천 컬러:</strong>
      <div class="d-flex flex-wrap mt-1">
        ${personalColorResult.colors.map(color => `<span class="badge badge-light mr-1 mb-1">${color}</span>`).join('')}
      </div>
    </div>
  `;
  
  // Display fashion recommendations
  const fashionHtml = fashionRec ? `
    <h6><strong>${fashionRec.style}</strong></h6>
    <div class="mb-2">
      <strong>추천 아이템:</strong>
      <ul class="list-unstyled mt-1">
        ${fashionRec.items.map(item => `<li><small>• ${item}</small></li>`).join('')}
      </ul>
    </div>
    <div>
      <strong>추천 컬러:</strong>
      <div class="d-flex flex-wrap mt-1">
        ${fashionRec.colors.map(color => `<span class="badge badge-secondary mr-1 mb-1">${color}</span>`).join('')}
      </div>
    </div>
  ` : '<p>스타일 분석 중...</p>';
  
  // Display beauty recommendations
  const beautyHtml = beautyRec ? `
    <h6><strong>${beautyRec.makeup || beautyRec.skincare}</strong></h6>
    ${beautyRec.lipColor ? `
      <div class="mb-2">
        <strong>추천 립 컬러:</strong>
        <div class="d-flex flex-wrap mt-1">
          ${beautyRec.lipColor.map(color => `<span class="badge badge-danger mr-1 mb-1">${color}</span>`).join('')}
        </div>
      </div>
    ` : ''}
    ${beautyRec.eyeColor ? `
      <div class="mb-2">
        <strong>추천 아이 컬러:</strong>
        <div class="d-flex flex-wrap mt-1">
          ${beautyRec.eyeColor.map(color => `<span class="badge badge-info mr-1 mb-1">${color}</span>`).join('')}
        </div>
      </div>
    ` : ''}
    <div>
      <strong>뷰티 팁:</strong>
      <ul class="list-unstyled mt-1">
        ${beautyRec.tips.map(tip => `<li><small>• ${tip}</small></li>`).join('')}
      </ul>
    </div>
  ` : '<p>뷰티 분석 중...</p>';
  
  // Update DOM
  document.getElementById('personal-color-result').innerHTML = personalColorHtml;
  document.getElementById('fashion-style-result').innerHTML = fashionHtml;
  document.getElementById('beauty-style-result').innerHTML = beautyHtml;
  
  // Show the recommendations section
  document.getElementById('style-recommendations').style.display = 'block';
}

/**
  Displays Similar idol name from model prediction
*/
async function predict() {
  var image = document.getElementById("face-image");
  // 흑백여부 false
  console.log("Loaded TensorFlow.js - version: " + tf.version.tfjs);
  const imageData = tf.browser.fromPixels(image, (numChannels = 3)).toFloat();;
  console.log(imageData.shape);
  const imgSize = Math.min(image.naturalWidth, image.naturalHeight);
  console.log(image.naturalWidth, image.naturalHeight);
  const left = (image.naturalWidth - imgSize) / 2.0;
  const top = (image.naturalHeight - imgSize) / 2.0;
  const right = (image.naturalWidth + imgSize) / 2.0;
  const bottom = (image.naturalHeight + imgSize) / 2.0;
  let boxes = [
    [
      top / image.naturalHeight,
      left / image.naturalWidth,
      bottom / image.naturalHeight,
      right / image.naturalWidth,
    ],
  ];
  console.log(boxes);
  // let resizedImage = tf.image.resizeBilinear(imageData, [300, 300]);
  //resizedImage = tf.expandDims(resizedImage, axis=0);
  const img4dResized = tf.expandDims(imageData, (axis = 0));
  let resizedImage = tf.image.cropAndResize(
    img4dResized,
    boxes,
    [0],
    [300, 300]
  );
  
//   const canvas = document.getElementById("test");
//   canvas.width = resizedImage.shape.width;
//   canvas.height = resizedImage.shape.height;
//   drawTensor = resizedImage.reshape([300, 300, 3]).clipByValue(0, 255)
//   .cast('int32');
//   await tf.browser.toPixels(drawTensor, canvas).then(() => {
//     drawTensor.dispose();
//     img4dResized.dispose();
//     imageData.dispose();
//     // console.log(
//     //   "Make sure we cleaned up",
//     //   tf.memory().numTensors
//     // );
//   });

  let pred;
  if (isMale) {
    pred = await menModel.predict(resizedImage);
  } else {
    pred = await womenModel.predict(resizedImage);
  }
  const { values, indices } = tf.topk(pred, 3, true);
  // values.print();
  // indices.print();
  const valuesArr = values.arraySync()[0];
  const indicesArr = indices.arraySync()[0];
  pred.dispose();
  values.dispose();
  indices.dispose();
  resizedImage.dispose();
  let namesArr = ["", "", ""];

  for (var x in [0, 1, 2]) {
    // console.log(x, indicesArr[x]);
    // console.log( menLabel);
    // console.log( womenLabel);
    if (isMale) {
      namesArr[x] = menLabel[indicesArr[x]];
    } else {
      namesArr[x] = womenLabel[indicesArr[x]];
    }
  }
  // console.log(valuesArr, indicesArr, namesArr);
  displayIdolPrediction(valuesArr, namesArr);
}

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
      $("#face-image").attr("src", e.target.result);
      $("#title").html(input.files[0].name);
    };
    await reader.readAsDataURL(input.files[0]);
    $(".file-upload-content").show();
    $("#loading").show();
    document.getElementById("face-image").onload = function () {
      init().then(function () {
        predict().then(function (prom) {
          $(".try-again-btn").show();
          $(".result-message").show();
          $("#loading").hide();
        });
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
  document.getElementById("search").height = 0;
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
