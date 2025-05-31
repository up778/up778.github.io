function whichBrowser() {
  if (isFirefox()) {
    return "Firefox";
  } else if (isEdge()) {
    return "Edge";
  } else if (isIE()) {
    return "Internet Explorer";
  } else if (isOpera()) {
    return "Opera";
  } else if (isVivaldi()) {
    return "Vivalid";
  } else if (isChrome()) {
    return "Chrome";
  } else if (isSafari()) {
    return "Safari";
  } else {
    return "Unknown";
  }
}
function agentHas(keyword) {
  return navigator.userAgent.toLowerCase().search(keyword.toLowerCase()) > -1;
}
function isIE() {
  return !!document.documentMode;
}
function isSafari() {
  return (
    (!!window.ApplePaySetupFeature || !!window.safari) &&
    agentHas("Safari") &&
    !agentHas("Chrome") &&
    !agentHas("CriOS")
  );
}
function isChrome() {
  return agentHas("CriOS") || agentHas("Chrome") || !!window.chrome;
}
function isFirefox() {
  return agentHas("Firefox") || agentHas("FxiOS") || agentHas("Focus");
}
function isEdge() {
  return agentHas("Edg");
}
function isOpera() {
  return agentHas("OPR");
}
function isVivaldi() {
  return agentHas("Vivaldi");
}

if (whichBrowser() == "Edge") {
} else {
}

function check_if_file_Loaded_for_titres_backgrounds(fileName, object, body) {
  fileName = fileName.substring(5, fileName.length - 2);

  $.ajax({
    type: "HEAD",

    async: true,
    url: fileName,
  })
    .done(function () {
      if (body == 1) {
        fileName = fileName.replace(/\.avif/gm, ".jpg");
        fileName = "url('" + fileName + "')";

        $("html")[0].style["background"] = fileName;
        $("body")[0].style["background"] = fileName;
      }
    })

    .fail(function () {
      if (body == 1) {
        fileName = fileName.replace(/\.jpg/gm, ".png");
        fileName = "url('" + fileName + "')";

        var styles = {
          background: fileName,
          "background-position": "center",
          "background-repeat": "repeat",
          "background-attachment": "fixed !important",
        };
        $("html").css(fileName);
        $("body").css(fileName);
      } else {
        fileName = fileName.replace(/\.jpg/gm, ".png");
        fileName = "url('" + fileName + "')";

        object.css("background-image", fileName);
        console.log("fail");
      }
    });
}
