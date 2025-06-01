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

  
  gtag("event", resultTitle, {
    event_category: resultExplain,
    result_face: true,
  });
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
