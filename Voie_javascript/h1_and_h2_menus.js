var nombre_de_h1 = $("h1").length;
var index_pour_sections_entre_h2 = 10;
var index_pour_menu_h2 = 12;
var bordures_pour_h2_et_h3_ont_elles_été_activées = 1;

var div_pour_les_videos_de_background;
var bb;
let ytPlayer;

const _originalYTAPIReady = window.onYouTubeIframeAPIReady;

window.onYouTubeIframeAPIReady = function () {
  if (typeof _originalYTAPIReady === "function") {
    _originalYTAPIReady();
  }

  ytPlayer = new YT.Player("iframe_myPlayerID", {
    events: {
      onReady: function () {
        console.log("YouTube player ready (nouvelle initialisation)");
      },
    },
  });
};

function getTotalTime() {
  if (ytPlayer && typeof ytPlayer.getDuration === "function") {
    return ytPlayer.getDuration();
  }
  return 0;
}

window._original_background_html = $("html").attr("style") || null;
window._original_background_body = $("body").attr("style") || null;

function return_button_for_backrgound_video(
  video_background_youtube11_url_1,
  video_background_youtube11_url_2,
  video_background_youtube11_url_3,
) {
  if (
    typeof video_background_youtube11_url_1 != "undefined" &&
    typeof video_background_youtube11_url_2 != "undefined" &&
    typeof video_background_youtube11_url_3 != "undefined"
  ) {
    var concatenated =
      '"' +
      video_background_youtube11_url_1 +
      '","' +
      video_background_youtube11_url_2 +
      '","' +
      video_background_youtube11_url_3 +
      '"';
    div_pour_les_videos_de_background = `<div
        class="dropdown"
        style="background-color: transparent;position:fixed;left:0px;top:370px"
        id="button_for_video_background"
      >
        <button
          class="flex-column me-1 mt-1 btn dropdown-toggle bi-film"
          type="button"
          role="button"
          data-bs-toggle="dropdown"
          data-bs-auto-close="false"
          aria-expanded="false"
          style="color: rgba(172, 173, 238, 1); background-color: #430003;"
          title="btn pour film en arrière plan de la page (fonction expérimentale)"
          data-popover-title="Titre pour Bouton"
          data-popover-content='&lt;i class="bi-arrow-left"&gt; Bouton pour afficher des boutons pour vidéo&lt;br /&gt; en arrière plan de la page ⚠️ attention, fonction expérimentale'
        ></button>
        <ul class="dropdown-menu-start dropdown-menu class_for_append_test flex-column force-dropup" style="background-color:transparent"  data-bs-display="static">
          <li>
            <div
              id="youtube_mb_buttons"
              class="btn boutons_background_video btn-group-vertical container btn_video_background"
              style="max-width: 3vw; max-height: 50vh; z-index: 400; border: dashed #444 1px; color: #ccc; background-color: #3d0000ff;"
            >
              <div style="font-size:14px; display:none">
                boutons pour vidéo de fond <br />attention, fonction
                expérimentale.<br />
                normalement, commencer à lire une vidéo devrait ajouter une barre de
                lecture en bas de la fenêtre.(Barre transparente sauf si curseur de souris au dessus).
              </div>
  <button
  class="btn btn_video_background"
  style="color: #3d0000ff; font-size: 14px; cursor: pointer; z-index: 4000; position: relative;"
  id="bckgd_video_play_button"
  onclick="
    (function() {
      const player = jQuery('#myPlayerID');
      if (player.length && typeof player.YTPPlay === 'function') {
        player.YTPPlay();
      } else {
        add_ytmb('${video_background_youtube11_url_1}', '${video_background_youtube11_url_2}', '${video_background_youtube11_url_3}');
      }
    })();"
>
  ▶️
</button>
              <button
              id="bckgd_video_pause_button"
             class="btn btn_video_background"
                style="      color: #000000;      font-size: 14px;      cursor: pointer;      z-index: 4000;      position: relative;  "
                onclick="jQuery('#myPlayerID').YTPPause();"
              >
                ⏸️
              </button>
              <button
                class="btn btn_video_background flex-column btn_special_9"
                style="color: #000000; font-size: 14px; cursor: pointer;"
                onclick="jQuery('#myPlayerID').YTPPlayPrev()"
              >⏮️</button>
              
              <button
                class="btn btn_video_background"
                style=" contain:contain; color: #fff;  font-size: 14px;  cursor: pointer; z-index: 4000; position: relative;"
                onclick="jQuery('#myPlayerID').YTPPlayNext();jQuery('#myPlayerID').YTPMute();testyy()" >
                ⏭️
              </button>
    
              <button
                class="btn bi-arrows-fullscreen btn_video_background"
                style="
    
                contain:contain;
      color: #fff !important;
      font-size: 14px;
      cursor: pointer;
      z-index: 4000;
      position: relative;"
    
                onclick="jQuery('#myPlayerID').YTPFullscreen()"
              ></button>
    
              <button
                class="btn btn_video_background"
                style="color: #000000; font-size: 14px; cursor: pointer;"
                id="mute_button"
                onclick="toggleMute()"
              >
                🔇
              </button>
              <button
                class="btn btn_video_background"
                style="color: #000000; font-size: 14px; cursor: pointer;"
                onclick="stop_video_background()"
              >
                <!-- onclick="jQuery('#myPlayerID').YTPStop()" -->
                <!-- fonctionna pas -->
                ⏹️
              </button>
</div>
          </li>
        </ul>
      </div>`;

    bb =
      `<div id="myPlayerID" class="player mb_YTPlayer isMuted" data-property="{videoURL:'http://youtu.be/` +
      video_background_youtube11_url_1 +
      `',containment:'#oiseau',startAt:0,mute:true,autoPlay:false,loop:20000,opacity:0.2}" style="display: none"></div>`;
    return div_pour_les_videos_de_background;
  }
}

function togglePlayPause() {
  var player = jQuery("#myPlayerID");
  var playPauseButton = jQuery("#playPauseButton");

  if (player.hasClass("isPlaying")) {
    player.YTPPause();
    playPauseButton.html("▶️");
    player.removeClass("isPlaying");
  } else {
    player.YTPPlay();
    playPauseButton.html("⏸️");
    player.addClass("isPlaying");
  }
}

jQuery("#playPauseButton").click(function () {
  togglePlayPause();
});

jQuery("#myPlayerID").on("YTPPlay", function () {
  jQuery("#playPauseButton").html("⏸️");
  jQuery("#myPlayerID").addClass("isPlaying");
});

jQuery("#myPlayerID").on("YTPPause", function () {
  jQuery("#playPauseButton").html("▶️");
  jQuery("#myPlayerID").removeClass("isPlaying");
});

function toggleMute() {
  var player = jQuery("#myPlayerID");
  var muteButton = jQuery("#mute_button");

  if (player.hasClass("isMuted")) {
    player.YTPUnmute();

    muteButton.html("🔇");
    player.removeClass("isMuted");
  } else {
    player.YTPMute();
    muteButton.html("🔊");
    player.addClass("isMuted");
  }
}

function add_ytmb(url1, url2, url3) {
  stop_video_background();

  $("script#www-widgetapi-script").slice(1).remove();
  if (!$("#YTAPI").length)
    $("head").prepend(
      `<script src="https://www.youtube.com/iframe_api?v=3.3.9" id="YTAPI"></script>`,
    );
  if (!$("#www-widgetapi-script").length)
    $("head").prepend(
      `<script type="text/javascript" id="www-widgetapi-script" src="https://www.youtube.com/s/player/b7ed0796/www-widgetapi.vflset/www-widgetapi.js" async></script>`,
    );

  setTimeout(() => {
    const playerId = "#myPlayerID";

    if (!$("#wrapper_myPlayerID").length) {
      $("body").prepend(
        `<div id="wrapper_myPlayerID" class="mbYTP_wrapper" style="position: fixed; z-index: 0; min-width: 100%; min-height: 100%; left: 0; top: 0; overflow: hidden; opacity: 0.4;"></div>`,
      );
    }

    $("#wrapper_myPlayerID")
      .off("click")
      .on("click", function (e) {
        e.stopPropagation();
      });

    if (!$(playerId).length) {
      $("#wrapper_myPlayerID").append(`
        <div id="myPlayerID" class="player mb_YTPlayer isMuted"
          data-property='{
            "videoURL":"${url1}",
            "containment":"#wrapper_myPlayerID",
            "startAt":0,
            "mute":true,
            "autoPlay":false,
            "loop":20000,
            "opacity":0.2
          }'
          style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
        </div>`);
    }

    if (!$("#controlBar_myPlayerID").length) {
      $("body").append(`
    <div id="controlBar_myPlayerID" class="mb_YTPBar inlinePlayer" style="white-space: nowrap; position: absolute; z-index: 100;">
      <div class="buttonBar">
        <span class="mb_YTPPlayPause ytpicon">P</span>
        <span class="mb_YTPMuteUnmute ytpicon">M</span>
        <div class="mb_YTPVolumeBar simpleSlider" style="display: inline-block; cursor: default;">
          <div class="level horizontal" style="width: 50%;"></div>
        </div>
        <span class="mb_YTPTime">00 : 04 / 01 : 05</span>
        <span class="mb_YTPUrl ytpicon" title="view on YouTube">Y</span>
        <span class="mb_OnlyYT ytpicon">O</span>
      </div>
      <div class="mb_YTPProgress" style="position: absolute;">
        <div class="mb_YTPLoaded" style="position: absolute; left: 0px; width: 38.9232%;"></div>
        <div class="mb_YTPseekbar" style="position: absolute; left: 0px; width: 81.5588px;"></div>
      </div>
    </div>
  `);

      forcer_affichage_barre_de_controle();
    }

    function forcer_affichage_barre_de_controle() {
      $("#wrapper_myPlayerID").css("pointer-events", "none");
      $("#myPlayerID").css("pointer-events", "none");
      $(".YTPOverlay").css("pointer-events", "none");
      const $barre = $("#controlBar_myPlayerID");

      if ($barre.length) {
        $barre.css({
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          "z-index": "2147483647",
          "background-color": "rgba(0, 0, 0, 0.6)",
          "pointer-events": "auto",
        });

        $barre.find(".mb_YTPProgress, .mb_YTPLoaded, .mb_YTPseekbar").css({
          "z-index": "2147483647",
          position: "relative",
        });

        $("#wrapper_myPlayerID").css("z-index", "1");
        $("#myPlayerID").css("z-index", "0");
        $(".YTPOverlay").css("pointer-events", "none");
      } else {
        console.warn(
          "#controlBar_myPlayerID introuvable pour appliquer le patch",
        );
      }
    }

    $("#controlBar_myPlayerID").css("z-index", 2147483647);

    $(".background_class_horizontal_heading").css("background-color", "black");

    const $elements = $(".bcLevel2, article, .bclevel3, .bclevel4");
    window._original_styles_for_video_background = [];

    $elements.each(function () {
      window._original_styles_for_video_background.push({
        element: this,
        style: this.getAttribute("style"),
      });
      $(this).addClass("video_bg_transparent");
      $(this).css({
        "background-color": "transparent",
        opacity: "1",
      });
    });

    $(".breadcrumb").css("background", "transparent");
    if (typeof show_or_not_breadcrumb === "function") show_or_not_breadcrumb();
    document.body.setAttribute("style", "background: #00000000 !important;");
    document.documentElement.setAttribute(
      "style",
      "background: #00000000 !important;",
    );

    const videos = [url1, url2, url3].map((url) => ({
      videoURL: url,
      containment: "#wrapper_myPlayerID",
      autoPlay: true,
      mute: true,
      startAt: 0,
      opacity: 0.6,
      loop: true,
      ratio: "4/3",
      addRaster: false,
      coverImage:
        "../../Images mosaïques pour arrière plan web/bird-6812884_1920.jpg",
      gaTrack: "false",
    }));

    const myPlayListPlayer = $(playerId).YTPlaylist(videos, false, () => {
      setTimeout(() => {
        $(playerId).YTPPlay();
        const $player = $(playerId);
        function waitForDuration(callback, maxTries = 20, interval = 200) {
          let tries = 0;
          const checkDuration = setInterval(() => {
            const duration = getTotalTime();
            if (duration > 0) {
              clearInterval(checkDuration);
              callback(duration);
            } else if (tries++ > maxTries) {
              clearInterval(checkDuration);
              console.error("Impossible de récupérer la durée de la vidéo");
            }
          }, interval);
        }

        $player.on("YTPReady", function () {
          waitForDuration((duration) => {
            $(".YTPOverlay").css("pointer-events", "none");
            $(".mb_YTPProgress, .mb_YTPLoaded, .mb_YTPseekbar")
              .off("click")
              .on("click", function (e) {
                e.stopPropagation();
                const progressBar = $(".mb_YTPProgress").first();
                const offset = progressBar.offset();
                const width = progressBar.width();
                const clickX = e.pageX - offset.left;
                const ratio = Math.min(Math.max(clickX / width, 0), 1);
                const seekTo = duration * ratio;
                console.log("Seek to:", seekTo);
                if (ytPlayer && typeof ytPlayer.seekTo === "function") {
                  ytPlayer.seekTo(seekTo, true);
                } else {
                  console.error("ytPlayer.seekTo() non disponible");
                }
              });
          });
        });
      }, 200);
    });
    ytPlayer = myPlayListPlayer;

    let currentVideoIndex = 0;
    myPlayListPlayer.on("YTPEnded", () => {
      currentVideoIndex = (currentVideoIndex + 1) % videos.length;
      const nextVideo = videos[currentVideoIndex].videoURL;
      $.get(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${nextVideo}&format=json`,
      )
        .done(() => myPlayListPlayer.changeMovie(nextVideo, false))
        .fail(() => {
          currentVideoIndex = (currentVideoIndex + 1) % videos.length;
          myPlayListPlayer.changeMovie(
            videos[currentVideoIndex].videoURL,
            false,
          );
        });
    });

    myPlayListPlayer.on("YTPData", function (e) {
      $("#videoID").html(e.prop.id);
      $("#videoTitle").html(e.prop.title);
    });
  }, 600);

  setTimeout(() => {
    const $player = $("#myPlayerID");

    $(".mb_YTPProgress").css({
      position: "fixed",
      bottom: "0",
      left: "0",
      width: "100%",
      height: "14px",
      backgroundColor: "#333",
      zIndex: "10000",
      cursor: "pointer",
      opacity: "0.6",
    });

    $(".mb_YTPLoaded").css({
      height: "100%",
      backgroundColor: "#666",
    });

    $(".mb_YTPseekbar").css({
      height: "100%",
      backgroundColor: "#ccc",
    });

    $(".YTPOverlay").css("pointer-events", "none");
  }, 1000);
}

function stop_video_background() {
  try {
    jQuery("#myPlayerID").YTPPause();
  } catch (e) {}
  try {
    jQuery("#myPlayerID").YTPStop();
  } catch (e) {}

  $("#myPlayerID").remove();
  $("#wrapper_myPlayerID").remove();
  $("#controlBar_myPlayerID").remove();

  $("html").removeClass("video_bg_transparent");
  $("body").removeClass("video_bg_transparent");

  $(".bcLevel2, article, .bclevel3, .bclevel4")
    .css({
      "background-color": "",
      opacity: "",
    })
    .removeClass("video_bg_transparent");

  $(".background_class_horizontal_heading").css("background-color", "");
  $(".breadcrumb").css("background", "");

  // Restaurer styles initiaux sauvegardés
  if (Array.isArray(window._original_styles_for_video_background)) {
    window._original_styles_for_video_background.forEach(
      ({ element, style }) => {
        if (style !== null) element.setAttribute("style", style);
        else element.removeAttribute("style");
      },
    );
  }
  window._original_styles_for_video_background = [];

  setTimeout(() => {
    if (window.background_html_and_body_image)
      $("html, body").css(
        "background",
        window.background_html_and_body_image + " !important",
      );

    if (window._original_background_html !== null)
      $("html").attr("style", window._original_background_html);
    else $("html").removeAttr("style");

    if (window._original_background_body !== null)
      $("body").attr("style", window._original_background_body);
    else $("body").removeAttr("style");
  }, 300);

  $("style").each(function () {
    if (
      $(this).html().includes(".mbYTP_wrapper") ||
      $(this).html().includes("YTPlayer")
    ) {
      $(this).remove();
    }
  });
}

function add_button_for_background_video(
  video_background_youtube11_url_1,
  video_background_youtube11_url_2,
  video_background_youtube11_url_3,
) {
  setTimeout(() => {
    $("body").append(
      "" +
        return_button_for_backrgound_video(
          video_background_youtube11_url_1,
          video_background_youtube11_url_2,
          video_background_youtube11_url_3,
        ) +
        "",
    );
    // }
  }, 1000);
}

function toggle_sections_2_and_3_borders() {
  if (bordures_pour_h2_et_h3_ont_elles_été_activées) {
    $(".bcLevel2, .bcLevel3")
      .css({
        "border-top": "transparent",
        "border-left": "transparent",
      })
      .addClass("bordures-cachees");
    bordures_pour_h2_et_h3_ont_elles_été_activées = 0;
  } else {
    $(".bcLevel2")
      .css({
        "border-top": "1px dotted orange",

        "border-left": "1px solid orange",
      })
      .removeClass("bordures-cachees");
    $(".bcLevel3")
      .css({
        "border-top": "1px dotted #ff009d",

        "border-left": "1px solid #ff009d",
      })
      .removeClass("bordures-cachees");
    bordures_pour_h2_et_h3_ont_elles_été_activées = 1;
  }
}

const myModalEl = document.getElementById(
  "https://fr.wikipedia.org/wiki/Luisa_Piccarreta20",
);

function h3() {
  if ($("h3").length > 0) {
    $("h3").each(function (index) {
      var index_corrected = index + 1;
      $(this).wrap(
        `<div id="tube_des_h3_${index_corrected}" 
          class="tube_d_un_h3_${index_corrected} tube_h3" 
          style="z-index: 10${index_pour_menu_h2};position:sticky;
          top:110px;background:black;margin: 0px !important;max-width:50%;">
        </div>`,
      );
    });
  }
}

function know_if_avif_supported() {
  var avif = document.createElement("img");
  avif.src =
    "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
  avif.onload = function () {
    return;
  };
  avif.onerror = function () {
    return;
  };
}

function getMeta() {
  var test = 8;
  var img = new Image();
  img.src =
    "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
  img.onload = function () {
    console.log("avif supported getmeta");

    return "test";
  };
  img.onerror = function () {
    console.log("avif -----not----- supported getmeta");

    return "eeeee";
  };
}

function choose_image_format_according_to_browser() {
  var img = new Image();
  img.src =
    "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";

  img.onload = function () {
    if (this.width != 468 && this.height != 60) {
      return true;
    }
  };

  img.onerror = function () {
    changer_éventuellement_avif_en_png_ou_jpg();

    return false;
  };

  return true;
}

function tab2() {
  $("body").empty();
  $("body").append();

  includeHTML2();
}

$(document).ready(function () {
  if (hasTouch()) {
    console.log("hasTouch");

    try {
      for (var si in document.styleSheets) {
        var styleSheet = document.styleSheets[si];
        if (!styleSheet.rules) continue;

        for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.rules[ri].selectorText) continue;

          if (styleSheet.rules[ri].selectorText.match(":hover")) {
            styleSheet.deleteRule(ri);
          }
        }
      }
    } catch (ex) {}
  }
});

function hasTouch() {
  return (
    "ontouchstart" in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

$(document).ready(function () {
  if (hasTouch()) {
    console.log("hasTouch");
    $(".right_dynamic_menu").hide();
  }
});

window.value_of_scroll_to_offset = 0;
function show_or_hide_barres_menu_h2() {
  $(".class_menu_just_next_h1").toggle();
}

function show_or_hide_barres_menu_h1() {
  $(".class_around_h1").toggleClass("sticky-mode");

  window.value_of_scroll_to_offset = $(".class_around_h1").hasClass(
    "sticky-mode",
  )
    ? -60
    : 0;

  $(".class_menu_just_next_h1").css(
    "top",
    $(".class_around_h1").hasClass("sticky-mode") ? "35px" : "0px",
  );
}

function show_or_not_breadcrumb_removed_already_in_html() {
  if ($(".breadcrumb").is(":visible")) {
    $("#breadcrumb").empty();
    $("h2, h3").css("z-index", "0 !important");
  } else {
    var breadcrumb = $("#breadcrumb").initBreadcrumb({});
    $(window).on("scroll", breadcrumb.refresh);
    breadcrumb.refresh();
  }
}

function show_or_not_right_menu_déjà_dans_le_html() {
  let isVisible = $(".dynamicContentMenu__header").is(":visible");

  $("#dinamicMenu").toggle(!isVisible);
  $("body").css("width", isVisible ? "96vw" : "84vw");
  $(".boutons_background_video").css("width", isVisible ? "4vw" : "");
  $(".bg_for_youtube_button").css("right", isVisible ? "1vw" : "13vw");
  $(".table_outside_a_table_and_outside_card").css({
    "max-width": isVisible ? "" : "82vw !important",
    width: isVisible ? "96%" : "",
  });
  $(".titre").toggle(!isVisible);
}

function offsetAnchor(test) {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 100);
  }
}

function changer_éventuellement_avif_en_png_ou_jpg() {
  $(".capsule_dun_h2, .capsule1, lite-youtube").css(
    "background-image",
    function (_, bg) {
      return bg
        .replace(/Images_for_backgrounds_avif\//g, "")
        .replace(/avif/g, "jpg");
    },
  );

  $("html, body").css({
    background: function (_, bg) {
      return (
        bg
          .replace(/Images_for_backgrounds_avif\//g, "")
          .replace(/avif/g, "jpg") + " !important"
      );
    },
    "background-position": "center",
    "background-repeat": "repeat",
    "background-attachment": "fixed !important",
    "background-size": "100% !important",
  });

  check_if_file_Loaded_for_titres_backgrounds(
    $("html").css("background"),
    $(this),
    1,
  );
}

function show_or_not_background_image_disabled() {
  console.log(
    $("body").css("background").indexOf('url("")'),
    `$("body").css("background").indexOf('url("")')`,
  );
  console.log("-----------end------------");

  console.log("⬇️⬇️⬇️⬇️");
  if ($("body").css("background").indexOf('url("")') > -1) {
    console.log("background pas trouvé");

    $("html").attr(
      "style",
      "background: " + background_html_and_body_image + " !important",
    );
    $("body").attr(
      "style",
      "background: " + background_html_and_body_image + " !important",
    );
  } else {
    console.log("background trouvé");

    console.log(
      background_html_and_body_image,
      `background_html_!!!!!!!!!!!!!!!!!!!!!!!`,
    );
    console.log("---------------------");

    $("html").css("background", 'url("")');
    $("body").css("background", 'url("")');
  }
}

var dieze_perma_id_last_p_de_modif_clicked = $();
var currentPage = window.location.pathname.split("/").pop();

$("body").on("click", "p[class^='p_de_modif']", function (e) {
  e.preventDefault();

  var $link = $(this).find("a").first();
  var href = $link.attr("href");
  if (!href) return;

  var hrefParts = href.split("#");
  if (hrefParts[0] === currentPage || hrefParts[0] === "") {
    var anchor = "#" + hrefParts[1];

    // Si l'ancre cible est dans un popover_content
    // console.log("l'ancre cible est dans un popover_content");
    var $popoverContent = $(".popover_content").has(anchor);
    if ($popoverContent.length) {
      const $btnPopover = $popoverContent
        .prevAll("button[data-bs-toggle='popover']")
        .first();
      if ($btnPopover.length) {
        const $popoverWrapper = $btnPopover.closest(".popover_wrapper");

        if ($popoverWrapper.length) {
          const offset =
            $popoverWrapper.offset().top +
            $popoverWrapper.outerHeight() / 2 -
            $(window).height() / 2;
          $("html, body").scrollTop(offset);
          restartAnimation($popoverWrapper, "rotateIn");
        } else {
          console.warn("Élément .popover_wrapper introuvable pour le scroll.");
        }

        return;
      }

      return;
    }

    var $target = $(anchor);
    if ($target.length) {
      $("html, body").animate({ scrollTop: $target.offset().top - 141 }, 0);
    } else {
      console.warn("Aucun élément trouvé pour l'ancre:", anchor);
      return;
    }
  } else {
    window.location.href = href;
    return;
  }

  if (typeof dieze_perma_id_last_p_de_modif_clicked !== "undefined") {
    $(dieze_perma_id_last_p_de_modif_clicked).stop(true, true);
  }

  var tag = $target.prop("tagName");
  var classes = $target.attr("class") || "";
  // console.log("ggggggggggggggggggggggghhh");

  const animations = {
    H1: () => animate_background_title_jquery_ui($target, "red"),
    H2: () => animate_background_title_jquery_ui($target, "orange"),
    H3: () => animate_background_title_jquery_ui($target, "pink"),
    H4: () => animate_background_title_jquery_ui($target, "yellow"),
    H5: () => animate_background_title_jquery_ui($target, "yellow"),
    H6: () => animate_background_title_jquery_ui($target, "yellow"),
    IMG: () => {
      if ($target[0].outerHTML.indexOf(".svg") < 0) {
        animate_background_title_jquery_ui($target, "yellow");
      }
    },

    BLOCKQUOTE: () =>
      animate_background_title_jquery_ui($target, "2px dotted green"),
    SECTION: () => {
      if ($(this).hasClass("h_titre")) {
        animate_background_title_jquery_ui($target, "2px dotted pink");
      } else if ($(this).hasClass("h_partie")) {
        animate_background_title_jquery_ui($target, "yellow");
      }
    },
  };

  if (animations[tag]) {
    animations[tag]();
  }

  if ($(this).hasClass("h_audio")) {
    const $table = $target.closest("figure");
    $table.removeClass("animate__animated animate__shakeX");
    setTimeout(() => {
      $table.addClass("animate__animated animate__shakeX");
    }, 500);
  }

  if ($(this).hasClass("h_citation")) {
    restartAnimation($target, "flash");
  }
  if ($(this).hasClass("h_table")) {
    restartAnimation($target, "zoomIn");
  }

  if (classes.includes("div_around_iframe")) {
    const $table = $target.closest("table");
    $table.removeClass("animate__animated animate__shakeX");
    setTimeout(() => {
      $table.addClass("animate__animated animate__shakeX");
    }, 500);
  }

  if (
    tag === "SECTION" &&
    (classes.includes("bcLevel2") || classes.includes("bcLevel3"))
  ) {
    const borderColor = classes.includes("bcLevel2") ? "#ff009d" : "#cf3eff";
    setTimeout(() => {
      if (bordures_pour_h2_et_h3_ont_elles_été_activées) {
        $target.css({
          "border-top": "1px dotted " + borderColor,
          "border-left": "1px solid " + borderColor,
        });
      }
    }, 6000);
  }

  dieze_perma_id_last_p_de_modif_clicked = href;
});

function animate_background_title_jquery_ui(ajkl, border_width_solid_color) {
  $(ajkl)
    .find(":header")
    .first()
    .attr("style", "border: " + border_width_solid_color + " !important");
  $(ajkl).find(":header").first().animate({ borderColor: "#00000000" }, 4200);
  setTimeout(() => {
    $(ajkl).find(":header").first().attr("style", "border: 0px solid");
  }, 2200);
}

function restartAnimation($el, effect) {
  if (!$el.length) return;
  const classNames = `animate__animated animate__${effect}`;

  $el.removeClass(classNames);

  void $el[0].offsetWidth;

  $el.addClass(classNames);
}

function animate_element(clicked_link, effect) {
  restartAnimation($(clicked_link), effect);
}

function animate_element_titre(clicked_link, effect, element) {
  const $header = $(clicked_link).find(":header").first();
  restartAnimation($header, effect);
}

var reduced_body_size = 0;
function reduce_body_size_from_offcanva(param) {
  $("body").attr("style", "width: 70vw !important");
  reduced_body_size = 1;
}

$(document).ready(function () {
  setTimeout(() => {
    const myOffcanvas = document.getElementById("offcanvasNavbar");

    myOffcanvas.addEventListener("shown.bs.offcanvas", (event) => {
      reduced_body_size = 0;
    });

    myOffcanvas.addEventListener("hide.bs.offcanvas", (event) => {
      if (reduced_body_size == 1) {
        $("body").attr("style", "width: 84vw !important");
      }
    });
  }, 2000);
});

$(document).ready(function () {
  let timerId;
  $(window).on("hashchange", function () {
    clearTimeout(timerId);

    if (window.location.hash) {
      history.replaceState(
        "",
        document.title,
        window.location.href.split("#")[0],
      );
    }
    // }, 10); // Adjust the debounce interval as needed
  });
});

// console.log("hhhhhhhhh");
$(document).ready(function () {
  var filename = location.pathname.match(/[^\/]+$/)[0];
  // var filename0 = filename;
  var filename_histo = decodeURI(filename);
  // console.log(filename_histo, `filename_histo`);

  // console.log("ggggmmmm");
  setTimeout(() => {
    $(".icon_on_top").each(function () {
      // element == this
      // console.log(index, `index`);
      // console.log($(this)[0].outerHTML);
      // const content = element.outerHTML;, `$(this).html()`);
      if ($(this)[0].outerHTML.indexOf(filename_histo) > 0) {
        // console.log("rrrrrrrrrrrrrrrrrrrrrr");
        // $(this).find("picture").css("border", "1px solid #ff00f0");
        // $(this).css("border", "1px solid #ff00f0");
        $(this).parent().css("border", "2px solid #ff006a");
        // $(this).find("picture").css("border-radius", "10%");
        $(this).parent().css("border-radius", "10%");
        $(this).parent().addClass("selected_border");
      }
    });
  }, 2000);
});

// const myModalEl = document.getElementById('https:

$("body").on(
  "show.bs.modal",
  ".div_for_modal_for_link_outside_modal",
  function () {
    var closest_article = $(this).closest("article");
    closest_article.css("content-visibility", "visible");

    if (!$(this).hasClass("footermod2")) {
      var src_from = $(this)
        .find(".avoid_iframe_pour_iframe_wiki_etc")
        .attr("id");
      if (src_from.indexOf("page=") < 0) {
        src_from = src_from.replace(/[_]*\d*$/im, "");
      }
      $(this)
        .find(".avoid_iframe_pour_iframe_wiki_etc")
        .append(
          '<iframe width="" height="" style="height: 70vh; width: 98%;" src="' +
            src_from +
            '" title="" frameborder="0" allowfullscreen="allowfullscreen" sandbox="allow-scripts allow-popups allow-same-origin"></iframe>',
        );
    } else {
    }
  },
);

$("body").on(
  "hide.bs.modal",
  ".div_for_modal_for_link_outside_modal",
  function () {
    var closest_article = $(this).closest("article");

    closest_article.css("content-visibility", "visible");

    $(this).find(".avoid_iframe_pour_iframe_wiki_etc").find("iframe").remove();
  },
);

$("body").on("show.bs.modal", ".footermod3", function () {
  var src_from_footer = $(this).attr("id");

  if (src_from_footer.indexOf("page=") < 0) {
    src_from_footer = src_from_footer
      .replace(/[_]*\d*$/im, "")
      .replace(/^#/im, "");
  }
  // var efef = $(this).find("a").attr("data-bs-target").replace(/^#/im, "");
  // console.log(src_from_footer, `src_from_footer2`);
  // console.log(document.getElementById('https://www.drawio.com/47'), `document.getElementById()`);
  // $(document.getElementById(afaf))
  // console.log($(".div_pour_iframes").find('#https://www.drawio.com/47').html(), `$(".div_pour_iframes").find(afaf).html()`);

  $(this)
    .find(".avoid_iframe_pour_iframe_wiki_etc")
    .append(
      '<iframe width="" height="" style="height: 90vh; width: 98%;" src="' +
        src_from_footer +
        '" title="" frameborder="0" allowfullscreen="allowfullscreen" sandbox="allow-scripts allow-popups allow-same-origin"></iframe>',
    );
});
$("body").on("hide.bs.modal", ".footermod3", function () {
  var closest_article = $(this).closest("article");
  $("article").each(function () {});
  closest_article.css("content-visibility", "visible");
  $(this).find(".avoid_iframe_pour_iframe_wiki_etc").find("iframe").remove();
});

$(document).ready(function () {
  var previous_tag_number = 0;
  $(":header").each(function () {
    var tag_name_number = $(this).prop("tagName").substring(1, 2);

    var aio = "";
    if (tag_name_number == 2 && previous_tag_number <= 2) {
      aio = "titii";
    }
    previous_tag_number = tag_name_number;
    var text = $(this)[0].innerHTML;

    var id = $(this).attr("id") || $(this).parent().attr("id");
    var tag_name_number_special = 3 - tag_name_number;
    $(".liste_tous_titres_class").append(
      '<li class="on_hover_lien_all_titles tytyu"><a class="' +
        aio +
        " dropdown-item lien_all_title_" +
        tag_name_number +
        ' lien_de_titre" style="font-size:1' +
        tag_name_number_special +
        '0%" href="#' +
        id +
        '">' +
        text +
        "</a></li>",
    );
  });

  $(".liste_tous_titres_class").prepend(
    '<div class="first_paragraph_of_tous_les_titres" style="text-align:center;position: sticky;top:-10px;background-color:#555">Liste de tous les titres de la page</div>',
  );
});

$(document).on("click", ".lien_de_titre", function (event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top + -160,
    },
    0,
  );
  var ajkl = $(this).attr("href");

  animate_background_title_jquery_ui(ajkl, "2px dotted purple");
});

var img_count = 0;

var zoomist;

$("body").on("dblclick", "img", function () {
  if (
    !$(this).hasClass("img_zoomed") &&
    !$(this).hasClass("image_without_picture") &&
    !$(this).hasClass("zoomist_desactived") &&
    !$(this).hasClass("b_bas")
  ) {
    window.addEventListener("click", onClickOutside);
    $(this).addClass("img_zoomed");
    img_count = img_count + 1;

    var tintin = "zedzed" + img_count;

    var dfd = $.Deferred();

    dfd.done(one($(this), tintin), zoomist_fct(tintin));

    function one(ttt, tintini) {
      var pourcentage_enventualy_agrandi = ttt[0].style["width"];
      if (ttt[0].style["width"].indexOf("%") > 0) {
        var pourcentage_agrandi0 = ttt[0].style["width"].replace("%", "");
        // console.log(pourcentage_agrandi0, `pourcentage_agrandi0`);
        // pourcentage_agrandi0 = +pourcentage_agrandi0 + +10;
        pourcentage_agrandi0 = +pourcentage_agrandi0 + +30;
        // console.log(pourcentage_agrandi0, `pourcentage_agrandi0`);
        pourcentage_enventualy_agrandi = pourcentage_agrandi0 + "%";
      }
      // console.log(pourcentage_enventualy_agrandi, `pourcentage_enventualy_agrandi`);

      // var height_pour_svg = (ttt[0].naturalWidth + " px") || "auto";
      var height_pour_svg = "60vh";

      if (ttt.attr("src").indexOf(".svg") > 0) {
        height_pour_svg = "height:70vh";
      } else {
        height_pour_svg = "";
      }

      // console.log(height_pour_svg_2, `height_pour_svg`);
      if (ttt.css("float") == "left" || ttt.css("float") == "right") {
        ttt.wrap(
          '<div class="zoomist-container" id="' +
            tintini +
            '" style="max-width:' +
            pourcentage_enventualy_agrandi +
            ";float:" +
            ttt.css("float") +
            ";" +
            height_pour_svg +
            '"></div>',
        );
      } else {
        ttt.wrap(
          '<div class="zoomist-container" id="' +
            tintini +
            '" style="max-width:' +
            pourcentage_enventualy_agrandi +
            ";" +
            height_pour_svg +
            '"></div>',
        );
      }

      ttt.wrap('<div class="zoomist-wrapper" style="max-width:100%"></div>');
      ttt.wrap('<div class="zoomist-image" style="max-width:100%"></div>');
    }

    dfd.resolve();

    function zoomist_fct(tintin) {
      var tintin_dieze = "#" + tintin;

      zoomist = new Zoomist("" + tintin_dieze + "", {
        // Optional parameters
        // width: 800,
        // height: 800,
        maxScale: 10,
        // pinchable: false,
        bounds: false,
        // if you need slider
        slider: true,
        // if you need zoomer
        zoomer: true,
        minScale: 0.1,
        initScale: 1,
      });

      setTimeout(() => {
        // zoomist.move(410, 40);
        // zoomist.zoom(2);
        // zoomist.moveTo(41, 40);
      }, 1000);

      // }, 2000);
      // console.log("ggggg");
    }
  }
});

const onClickOutside = (e) => {
  if (!e.target.className.includes("zoomist-image")) {
    // console.log(e.target, `e.target`);
    // show = false;
    // console.log("fffffvvv");
    // console.log(e.target.tagName, `e.target.tagName`);
    // window.removeEventListener("click", onClickOutside);
    if (
      e.target.tagName != "IMG" &&
      !e.target.className.includes("zoomist-zoomer") &&
      !e.target.className.includes("zoomist-slider") &&
      !e.target.className.includes("zoomist-wrapper")
    ) {
      // console.log("fffffggsss");
      $(".img_zoomed").each(function () {
        $(this).removeClass("img_zoomed");
        $(this).unwrap(".zoomist-image");
        $(this).unwrap(".zoomist-wrapper");
        $(this).unwrap(".zoomist-container");

        // element == this
        // zoomist.zoom(3);
        // zoomist.destroy();
        // zoomist.destroyModules();
      });
      $(".zoomist-slider, .zoomist-zoomer").each(function () {
        $(this).remove();
        window.removeEventListener("click", onClickOutside);
      });
    }
  }
};

// }, 2000);

// new Zoomist('#zoomist')

var Albert = 0;
$(document).ready(function () {
  let background_coquille_image;

  const body = document.body;
  const computedStyle = getComputedStyle(body);
  background_coquille_image = computedStyle.backgroundImage;
  Albert = background_coquille_image;

  function applyBackgroundImage(selector) {
    $(selector).css({
      "background-image": background_coquille_image,
      "background-size": "100%",
    });
  }

  function handleError(message) {
    console.error(message);
  }

  $(document).on("click", ".bouton_haut_droit", function () {
    $.ajax({
      url: "Additional_html/coquille2_top.html",
      dataType: "html",
      cache: false,
    })
      .done(function (html) {
        $(".deuxieme_coquille_top_button").replaceWith(html);
        applyBackgroundImage(".deuxieme_coquille_top_button");
        initAudioPlayers();
      })
      .fail(function () {
        handleError("Erreur lors du chargement de 'coquille2_top.html'.");
      });
  });

  $(document).on("click", ".bouton_haut_gche", function () {
    $.ajax({
      url: "Additional_html/coquille4_top_l.html",
      dataType: "html",
      cache: false,
    })
      .done(function (html) {
        const $html = $(html);
        $(".quatrieme_coquille_top_button").replaceWith($html);
        applyBackgroundImage(".quatrieme_coquille_top_button");
      })
      .fail(function () {
        handleError("Erreur lors du chargement de 'coquille4_top_l.html'.");
      });
  });

  $(document).on("click", "#btn_dropdown_top_left_plus", function (e) {
    $(".bouton_haut_gche").trigger("click");
  });

  $(document).on("click", ".info_bouton_haut_gche", function () {
    $.ajax({
      url: "Additional_html/coquille_top_left_info.html",
      dataType: "html",
      cache: false,
    })
      .done(function (html) {
        $(".info_coquille_top_button").replaceWith(html);
        applyBackgroundImage(".info_coquille_top_button");
      })
      .fail(function () {
        handleError(
          "Erreur lors du chargement de 'info_coquille_top_button.html'.",
        );
      });
  });

  let prefix = window.location.href.includes("github") ? "" : "../../";

  // Gestion du clic pour le bouton btn_new_3

  $(document).on("click", ".btn_new_3", function () {
    let filename = $(this).attr("trois_week_attrib");
    let ffilename_sans_ext_ = filename.replace(".html", "");
    filename =
      "Pages_pour_historique_site/Parties_added_3_last_weeks/" +
      ffilename_sans_ext_ +
      "_added_3_last_weeks.html";

    filename = prefix + filename;
    let where_to_search = $(this).parent().find(".to_replace_btn_btn2")
      ? "." + $(this).next().children().attr("class")
      : ".trois_last_news_weeks";

    $.ajax({
      url: filename,
      dataType: "html",
      cache: false,
    })
      .done(function (html) {
        $(where_to_search).replaceWith(html);
      })
      .fail(function () {
        handleError(
          "Erreur lors du chargement du fichier 'Parties_added_3_last_weeks'.",
        );
      });
  });

  $(document).on("click", ".btn_modif_3", function () {
    let filename = $(this).attr("trois_week_attrib");
    let ffilename_sans_ext_ = filename.replace(".html", "");
    filename =
      "Pages_pour_historique_site/Parties_modifs_3_last_weeks/" +
      ffilename_sans_ext_ +
      "_modifs_3_last_weeks.html";
    filename = prefix + filename;
    $.ajax({
      url: filename,
      dataType: "html",
      cache: false,
    })
      .done(function (html) {
        $(".to_replace_btn_btn3").replaceWith(html);
      })
      .fail(function () {
        handleError(
          "Erreur lors du chargement du fichier 'Parties_modifs_3_last_weeks'.",
        );
      });
  });
});

function offsetAnchor() {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 200);
  }
}
function for_breadcrumb_links_offsetAnchor() {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 120);
  }
}
$(document).on("click", "a", function (event) {
  if (!$(this).attr("class")) {
    window.setTimeout(function () {
      offsetAnchor();
    }, 0);
  } else
    window.setTimeout(function () {
      for_breadcrumb_links_offsetAnchor();
    }, 0);
});

function toggle_falling_leaves(param) {
  if ($(".image_autumn").css("display") == "none") {
    $(".image_autumn").css("display", "block");
  } else {
    $(".image_autumn").css("display", "none");
  }
}
setTimeout(() => {}, 100);

let currentAudio = null;

function select_audio(audio) {
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
  }
  currentAudio = audio;

  updateButtonStyle(currentAudio);
}

function fct_toggle_audio() {
  if (currentAudio) {
    if (currentAudio.paused) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }

    updateButtonStyle(currentAudio);
  } else {
    console.log("No audio selected.");
  }
}

function updateButtonStyle(audio) {
  if (!audio) return;

  const externalToggleButton = document.getElementById("toggle_audio");
  if (externalToggleButton) {
    if (audio.paused) {
      externalToggleButton.classList.remove("playing_audio");
      externalToggleButton.classList.add("paused_audio");
    } else {
      externalToggleButton.classList.remove("bi-cassette");
      externalToggleButton.classList.remove("paused_audio");
      externalToggleButton.classList.add("playing_audio");
    }
  }
  const externalToggleButton2 = document.getElementById(
    "bouton_pour_rejoindre_audio",
  );
  if (externalToggleButton) {
    if (audio.paused) {
      externalToggleButton2.classList.remove(
        "bouton_pour_rejoindre_audio_playing_audio",
      );
      externalToggleButton2.classList.add(
        "bouton_pour_rejoindre_audio_paused_audio",
      );
    } else {
      externalToggleButton2.classList.remove(
        "bouton_pour_rejoindre_audio_paused_audio",
      );
      externalToggleButton2.classList.add(
        "bouton_pour_rejoindre_audio_playing_audio",
      );
    }
  }

  const playerContainer = audio.parentElement.querySelector(
    ".custom_audio_player_p",
  );
  if (!playerContainer) return;
  const customToggleButton = playerContainer.querySelector(".play_pause_p_p");
  if (!customToggleButton) return;

  if (audio.paused) {
    customToggleButton.innerHTML = '<i class="bi-play"></i>';
    customToggleButton.classList.remove("playing");
  } else {
    customToggleButton.innerHTML = '<i class="bi-pause"></i>';
    customToggleButton.classList.add("playing");
  }
}

const audioElements = document.getElementsByTagName("audio");
for (let i = 0; i < audioElements.length; i++) {
  audioElements[i].addEventListener("play", function () {
    select_audio(this);
  });
  audioElements[i].addEventListener("pause", function () {
    if (this === currentAudio) {
      updateButtonStyle(this);
    }
  });
  audioElements[i].addEventListener("click", function () {
    select_audio(this);
  });
}

function testyy() {}

$(document).ready(function () {
  const predo_trans = predo_color_of_page + "60";

  const minus_10 = decreaseColor(predo_color_of_page, 30);
  const minus_30 = decreaseColor(predo_color_of_page, 30);
  const trans_minus_60 = decreaseColor(predo_color_of_page, 60) + "cc";

  const minus_60 = decreaseColor(predo_color_of_page, 60);
  const minus_70 = decreaseColor(predo_color_of_page, 70);
  const minus_85 = decreaseColor(predo_color_of_page, 85);
  const plus_25 = increaseColor(predo_color_of_page, 25);
  const plus_50 = increaseColor(predo_color_of_page, 50);
  const plus_70 = increaseColor(predo_color_of_page, 50);

  const sheet = document.styleSheets[0];
  const insert = (rule) => sheet.insertRule(rule, sheet.cssRules.length);

  const rules = [
    `#controlBar_myPlayerID {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    pointer-events: auto;
  }`,
    `.mb_YTPProgress, .mb_YTPLoaded, .mb_YTPseekbar {
    position: relative;
    z-index: 9999;
    cursor: pointer;
  }`,

    `.modal-backdrop {
  width: 98vw;
    }`,

    `.audio_playing_p {
  border: 1px dashed ${minus_10} !important;
}`,

    `.playing_audio {
      color: ${plus_50} !important; 
      border: 1px dashed ${plus_50} !important;
    }`,
    `.bouton_pour_rejoindre_audio_playing_audio {
      // color: ${plus_50} !important; 
      border: 1px dashed ${plus_50} !important;
    }`,

    `#breadcrumb > ul > li:nth-child(n) > div > ul > li:nth-child(n) > a:hover {
      color: ${plus_50}; 
      border-radius: 10px;
    }`,
    `.breadcrumb > li > a:hover {
      background-color: ${predo_trans} !important;
    }`,
    `#breadcrumb > ul > li:nth-child(3) > div > ul > li:nth-child(n) > a:hover {
      color: ${plus_50};
    }`,
    `.dynamicContentMenu__item:hover {
      color: ${plus_70} !important;
    }`,
    `.zoomist-image {
      background-color: ${minus_70} !important;
    }`,
    `.zoomist-wrapper {
      background-color: ${minus_70} !important;
    }`,
    `lite-youtube > .lty-playbtn2 {
      background-color: ${predo_trans} !important;
    }`,
    `button:hover {
      color: ${plus_50} !important;
    }`,
    `.boutons_ezoom {
      background-color: ${trans_minus_60} !important;
    }`,
    `.cadre_pour_infos_pour_boutons_svg {
      background-color: ${minus_60} !important;
    }`,
    `.first_paragraph_of_tous_les_titres {
      background-color: ${minus_60} !important;
    }`,
    `.liste_tous_titres_class {
    border: 2px solid ${minus_30} !important;
    }`,
    `#breadcrumb > ul > li:nth-child(n) > div > ul > li:nth-child(2n + 1) {
     background-color: ${minus_70} !important;
    }`,

    `.modal_for_wikipedia {
  position: relative; /* ou relative si nécessaire */
  z-index: 300 !important; /* supérieur à tout élément flottant */
}`,

    `.modal-backdrop {
         z-index:999 !important;
         position: absolute;
        }`,
    `
    .modal-content,.modal-body {
      overflow-y: auto;
      z-index: 1800 !important;
    }`,

    `.dropdown-menu {
    border:1px solid ${predo_color_of_page} !important;
    }`,
    `.un_conserve_top_l_case {
    background-color: ${minus_30} !important;
    }`,
    `.grand_titre {
     text-shadow: 0 0 15px ${plus_50}, 0 0 35px ${plus_50} !important;
    }`,
    `.div_around_iframe {
   
     z-index: 20000 !important;
      }`,

    `.border_for_video {
  position: relative;
  border-radius: 10%;
  background: black;
  z-index: 0;
}`,

    `.border_for_video::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -2px;
  bottom: -1px;
  border-radius: 10px;
  z-index: -1;
  background:
    repeating-linear-gradient(to right, ${plus_25} 0 1px, transparent 1px 1vw) top
      center / 100% 1px no-repeat,
    repeating-linear-gradient(to right, ${plus_25} 0 1px, transparent 1px 1vw) bottom
      center / 100% 1px no-repeat,
    repeating-linear-gradient(to bottom, ${plus_25} 0 1px, transparent 1px 1vw) left
      center / 1px 100% no-repeat,
    repeating-linear-gradient(to bottom, ${plus_25} 0 1px, transparent 1px 1vw) right
      center / 1px 100% no-repeat;
}`,
    `.popover_editable {
 background-color: ${minus_70} !important;
    border: 1px dashed grey !important;

    }`,

    ` .popover_content { position: relative !important;
     background  : ${Albert} !important;
     background-attachment:fixed !important;
     background-position: center center !important;
     background-size: 100% !important;
    }`,

    `
    #chatContainer{
background  : ${Albert} !important;
     }`,

    `.modal-content {

background: ${Albert} !important;
    }`,

    `.btn_custom_source {
  color: #ffffff;
  /* background-color: #4e668a; */
  background-color: #6381af !important;
  border-right: 0px solid black !important;
}`,

    `
    .modal_body_wikipedia,.modal_body_not_wikipedia {
  overflow-y: hidden !important;
}`,

    `.no_border_for_video::before {
  background: none !important;
}`,
    `.svg_pan_zoom {
      display: block !important; width: 100%; max-width: 100%; height: auto;
    }`,

    `.boutons_ezoom {
       display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
      padding: 0.5rem;
      width: 100%;
      box-sizing: border-box;
      background-color: #000044;
      
    }`,
    `.boutons_ezoom button,
.boutons_ezoom input[type="range"]  {
 flex: 0 1 auto;
  max-width: calc(100% / 4 - 1rem) !important; /* ajustable selon le nombre max visible */
  min-width: 20px;
  height: auto;
  font-size: 1rem;
}`,

    `.dropup {
  position: relative !important;
}`,

    `.reload_button_youtube, .info_button_youtube  {
background-color: #00000099 !important;;
}`,
  ];

  rules.forEach(insert);
});

const panzoom_problematic_styles = `
.panzoom_range::-moz-range-track {
  height: 6px;
  background: ${predo_color_of_page};
  border-radius: 4px;
}

.panzoom_range::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: white;
  border: 2px solid ${predo_color_of_page};
  border-radius: 50%;
  cursor: pointer;
  margin-top: -5px;
}

.panzoom_range::-webkit-slider-thumb {
  width: 16px;
  height: 16px;
  background: white;
  border: 2px solid ${predo_color_of_page};
  border-radius: 50%;
  cursor: pointer;
  margin-top: -5px;
  -webkit-appearance: none;
}

.panzoom_range::-webkit-slider-runnable-track {
  height: 6px;
  background: ${predo_color_of_page};
  border-radius: 4px;
}

.panzoom_range::-ms-thumb {
  width: 16px;
  height: 16px;
  background: white;
  border: 2px solid ${predo_color_of_page};
  border-radius: 50%;
  cursor: pointer;
}

.panzoom_range::-ms-track {
  height: 6px;
  background: transparent;
  border-color: transparent;
  color: transparent;
}

.panzoom_range::-ms-fill-lower,
.panzoom_range::-ms-fill-upper {
  background: ${predo_color_of_page};
  border-radius: 4px;
}
`;

const panzoom_style = document.createElement("style");
panzoom_style.textContent = panzoom_problematic_styles;
document.head.appendChild(panzoom_style);

function increaseColor(hex, percent) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  r = Math.min(255, Math.round(r * (1 + percent / 100)));
  g = Math.min(255, Math.round(g * (1 + percent / 100)));
  b = Math.min(255, Math.round(b * (1 + percent / 100)));

  let newHex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return newHex;
}
function decreaseColor(hex, percent) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  r = Math.max(0, Math.round(r * (1 - percent / 100)));
  g = Math.max(0, Math.round(g * (1 - percent / 100)));
  b = Math.max(0, Math.round(b * (1 - percent / 100)));

  let newHex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return newHex;
}

document
  .querySelectorAll(".toggle_youtube_buttons")
  .forEach(function (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      document.querySelectorAll(".yt_extra_buttons").forEach(function (el) {
        const current = window.getComputedStyle(el).display;
        el.style.display = current === "none" ? "flex" : "none";
      });
    });
  });

document
  .querySelector(".toggle_youtube_borders")
  .addEventListener("click", () => {
    document.querySelectorAll(".border_for_video").forEach((el) => {
      el.classList.toggle("no_border_for_video");
    });
  });

$(document).ready(function () {
  document.querySelectorAll(".panzoom_reset").forEach((btn) => {
    btn.addEventListener("click", () => {
      const range = document.querySelector(".panzoom_range");
      if (range) {
        range.value = 1;
        range.dispatchEvent(new Event("input", { bubbles: true }));
        range.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });

  document.querySelectorAll(".panzoom_in").forEach((btn) => {
    btn.addEventListener("click", () => {
      const range = document.querySelector(".panzoom_range");
      if (range) {
        let val = parseFloat(range.value);
        val = Math.min(val + 0.2, parseFloat(range.max));
        range.value = val.toFixed(1);
        range.dispatchEvent(new Event("input", { bubbles: true }));
        range.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });

  document.querySelectorAll(".panzoom_out").forEach((btn) => {
    btn.addEventListener("click", () => {
      const range = document.querySelector(".panzoom_range");
      if (range) {
        let val = parseFloat(range.value);
        val = Math.max(val - 0.2, parseFloat(range.min));
        range.value = val.toFixed(1);
        range.dispatchEvent(new Event("input", { bubbles: true }));
        range.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });
  document.querySelectorAll(".dropdown-menu button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
});

$("body").on("click", ".dynamicContentMenu__item", function () {
  const uniqueText = $(this).data("unique");
  if (!uniqueText) return;

  const normalizedUnique = normalizeText(uniqueText);

  const $targetH1 = $("h1")
    .filter(function () {
      return normalizeText($(this).text()) === normalizedUnique;
    })
    .first();

  if ($targetH1.length) {
    const color =
      typeof predo_color_of_page !== "undefined"
        ? predo_color_of_page
        : "yellow";
    animate_background_title_jquery_ui($targetH1, color);
  }
});

function normalizeText(str) {
  if (!str) return "";

  // Décomposer accents
  let normalized = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  // Supprimer espaces multiples et caractères invisibles Unicode
  normalized = normalized.replace(/\s+/g, " ");

  return normalized;
}

function animate_background_title_jquery_ui($h1, border_color) {
  if (!$h1.length) return;

  $h1.css("--flash-color", border_color);

  $h1.removeClass("h1_flash_animation");
  void $h1[0].offsetWidth;
  $h1.addClass("h1_flash_animation");
}
