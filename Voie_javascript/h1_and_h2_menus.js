var nombre_de_h1 = $("h1").length;
var index_pour_sections_entre_h2 = 10;
var index_pour_menu_h2 = 12;
var bordures_pour_h2_et_h3_ont_elles_été_activées = 1;

var div_pour_les_videos_de_background;
var bb;
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
  div_pour_les_videos_de_background =
    `<div
    class="d-flex dropup justify-content-center"
    style="background-color: transparent;position:fixed;left:0px;bottom:100px"
    id="button_for_video_background"
  >
    <button
      class="flex-column me-1 mt-1 btn dropdown-toggle bi-film justify-content-center pop_button"
      type="button"
      role="button"
      data-bs-toggle="dropdown"
       data-bs-auto-close="false"
      aria-expanded="false"
      style="color: rgb(135, 136, 221); background-color: rgb(25, 24, 25); --darkreader-inline-color: #84adf3; --darkreader-inline-bgcolor: #000000;"
      title="btn pour film en arrière plan de la page (fonction expérimentale)"
      data-popover-title="Titre pour Bouton"
    data-popover-content='&lt;i class="bi-arrow-left"&gt; Bouton pour afficher des boutons pour vidéo&lt;br /&gt; en arrière plan de la page ⚠️ attention, fonction expérimentale'
    ></button>
    <ul class="dropdown-menu class_for_append_test flex-column" style="background-color:transparent">
      <li>
        <div
          id="youtube_mb_buttons"
          class="btn boutons_background_video btn-group-vertical container btn_video_background"
          style=" position: fixed;
  bottom: 8vh;
  left: 0vw;
  max-width: 3vw;
  max-height:50vh;

  z-index: 400;
  border: dashed #444 1px;
  color: #ccc;
  background-color: #00000060;"
        >
          <div style="font-size:14px; display:none">
            boutons pour vidéo de fond <br />attention, fonction
            expérimentale.<br />
            normalement, commencer à lire une vidéo devrait ajouter une barre de
            lecture en bas de la fenêtre.(Barre transparente sauf si curseur de souris au dessus).
          </div>

          <button
          class="btn btn_video_background flex-column btn_special_9"
            style="color: #000000; font-size: 14px; cursor: pointer;"
              onclick="jQuery('#myPlayerID').YTPPlayPrev()"
          >⏮️</button>
          <button
          class="btn btn_video_background"
            style="

  "btn btn_video_background
  color: #000000;
  font-size: 14px;
  cursor: pointer;
  z-index: 4000;
  position: relative;

"
            onclick='add_ytmb(` +
    concatenated +
    `);'
          >
            <!-- onclick="jQuery('html,body').css('background', 'black');jQuery('#myPlayerID').YTPPlay();" -->
            ▶️
          </button>
          <button
         class="btn btn_video_background"
            style="


  "btn btn_video_background
  color: #000000;
  font-size: 14px;
  cursor: pointer;
  z-index: 4000;
  position: relative;

"
            onclick="jQuery('#myPlayerID').YTPPause();"
          >
            ⏸️
          </button>
          <button
           class="btn btn_video_background"
            style=" contain:contain;  "btn btn_video_background
  color: #fff;  font-size: 14px;  cursor: pointer; z-index: 4000; position: relative;"
            onclick="jQuery('#myPlayerID').YTPPlayNext();jQuery('#myPlayerID').YTPMute();testyy()" >
            ⏭️
          </button>

          <button
           class="btn bi-arrows-fullscreen btn_video_background"
            style="

            contain:contain;
  "btn btn_video_background
  color: #fff !important;
  font-size: 14px;
  cursor: pointer;
  z-index: 4000;
  position: relative;"

            onclick="jQuery('#myPlayerID').YTPFullscreen()"
          ></button>

          <button
           class="btn btn_video_background"
            style="
  "btn btn_video_background
  color: #000000;
  font-size: 14px;
  cursor: pointer;
  z-index: 4000;
  position: relative;

"
            onclick="jQuery('#myPlayerID').YTPUnmute()"
          >
            🔊
          </button>
          <button
           class="btn btn_video_background"
            style="
  "btn btn_video_background
  color: #000000;
  font-size: 14px;
  cursor: pointer;
  z-index: 4000;
  position: relative;

"
            onclick="jQuery('#myPlayerID').YTPMute()"
          >
            🔇
          </button>
          <button
           class="btn btn_video_background"
            style=" "btn btn_video_background
color: #000000;    font-size: 14px;
cursor: pointer;    z-index: 4000;
position: relative;text-align:center !important;"

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
}

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

function background_de_certains_h2() { }

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
    } catch (ex) { }
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
const currentPage = window.location.pathname.split("/").pop();

$("body").on("click", "p[class^='p_de_modif']", function () {
  var ajkl = $(this).find("a").attr("href");

  $(dieze_perma_id_last_p_de_modif_clicked).stop(true, true);

  var ajklParts = ajkl.split("#");
  if (ajklParts[0] === currentPage || ajklParts[0] === "") {
    // 🔹 On est déjà sur la bonne page → On scroll
    var anchor = "#" + ajklParts[1];
    var target = $(anchor);

    if (target.length) {
      console.log("Élément trouvé:", target);
      $("html, body").animate({ scrollTop: target.offset().top - 141 }, 0);
    } else {
      console.warn("Aucun élément trouvé pour l'ancre:", anchor);
    }
  } else {
    window.location.href = ajkl;
  }

  if ($(ajkl).prop("tagName") == "H1") {
    animate_background_jquery_ui(ajkl, "2px dotted yellow");
  }
  if ($(ajkl).prop("tagName") == "H2") {
    animate_background_title_jquery_ui(ajkl, "2px dotted yellow");
  }
  if ($(ajkl).prop("tagName") == "H3") {
    animate_background_jquery_ui(ajkl, "2px dotted yellow");
  }
  if ($(ajkl).prop("tagName") == "H4") {
    animate_background_jquery_ui(ajkl, "2px dotted yellow");
  }
  if ($(ajkl).prop("tagName") == "H5") {
    animate_background_jquery_ui(ajkl, "2px dotted yellow");
  }
  if ($(ajkl).prop("tagName") == "H6") {
    animate_background_jquery_ui(ajkl, "2px dotted yellow");
  }
  if ($(ajkl).prop("tagName") == "IMG") {
    if ($(ajkl)[0].outerHTML.indexOf(".svg") < 0) {
      animate_background_jquery_ui(ajkl, "2px dotted yellow");
    }
  }
  if ($(ajkl).prop("tagName") == "BLOCKQUOTE") {
    animate_background_jquery_ui(ajkl, "2px dotted green");
  }

  if ($(ajkl).prop("tagName") == "SECTION" && $(this).hasClass("h_titre")) {
    animate_background_title_jquery_ui(ajkl, "2px dotted pink");
  }

  if ($(ajkl).prop("tagName") == "SECTION" && $(this).hasClass("h_partie")) {
    animate_background_jquery_ui(ajkl, "2px dotted yellow");
  }

  if ($(this).hasClass("h_audio")) {
    animate_background_title_jquery_ui(ajkl, "2px dotted yellow");
  }

  if ($(ajkl).hasClass("h_citation")) {
    animate_background_jquery_ui(ajkl, "2px dotted yellow");
  }
  if ($(ajkl).hasClass("h_table")) {
    animate_background_jquery_ui(ajkl, "2px dotted yellow");
  } else if ($(ajkl).hasClass("div_around_iframe")) {
  }

  dieze_perma_id_last_p_de_modif_clicked = ajkl;
});
function animate_background_jquery_ui(ajkl, border_width_solid_color) {
  $(ajkl).attr("style", "border: " + border_width_solid_color + " !important");
  $(ajkl).animate({ borderColor: "#00000000" }, 4200);
  setTimeout(() => {
    $(ajkl).attr("style", "border: 0px solid");
  }, 2200);
}

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

$("body").on("click", "p[class^='p_de_modif']", function (e) {
  e.preventDefault();

  var $clicked_link = $(this).find("a").first();
  var target = $($clicked_link.attr("href"));

  if (!target.length) return;

  var tag = target.prop("tagName");
  var classList = target.attr("class") || "";

  const animations = {
    H1: "flash",
    H2: "flash",
    H3: "flash",
    H4: "flash",
    H5: "flash",
    H6: "flash",
    IMG: "pulse",
    TABLE: "pulse",
    SECTION: "pulse",
  };

  if (animations[tag]) {
    animate_element_titre(target, animations[tag], tag.toLowerCase());
  } else if (
    classList.includes("h_citation") ||
    classList.includes("h_nouvelle_vidéo")
  ) {
    animate_element_titre(target, "pulse");
  } else if (classList.includes("div_around_iframe")) {
    target.closest("table").removeClass("animate__animated animate__shakeX");
    setTimeout(() => {
      target.closest("table").addClass("animate__animated animate__shakeX");
    }, 500);
  }

  if (
    tag === "SECTION" &&
    (classList.includes("bcLevel2") || classList.includes("bcLevel3"))
  ) {
    const borderColor = classList.includes("bcLevel2") ? "#ff009d" : "#cf3eff";

    setTimeout(() => {
      if (bordures_pour_h2_et_h3_ont_elles_été_activées) {
        target.css({
          "border-top": "1px dotted " + borderColor,
          "border-left": "1px solid " + borderColor,
        });
      }
    }, 6000);
  }
});

function animate_element(clicked_link, effect) {
  $(clicked_link).removeClass(`animate__animated animate__${effect}`);
  setTimeout(() => {
    $(clicked_link).addClass(`animate__animated animate__${effect}`);
  }, 500);
}
function animate_element_titre(clicked_link, effect, element) {
  $(clicked_link)
    .find(":header")
    .first()
    .removeClass(`animate__animated animate__${effect}`);
  setTimeout(() => {
    $(clicked_link)
      .find(":header")
      .first()
      .addClass(`animate__animated animate__${effect}`);
  }, 500);
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

function add_ytmb(
  video_background_youtube11_url_1,
  video_background_youtube11_url_2,
  video_background_youtube11_url_3,
) {
  // console.log($(".inserted_ytmb").length, `$(".inserted_ytmb").length`);
  if ($(".inserted_ytmb").length == 0) {
    $("head").append(
      `<script class="inserted_ytmb">
    var myPlayListPlayer;
    jQuery(function () {
      /**
       * Set the video list with all the parameters for each video
       * @type {*[]}
       */
      let videos = [
        {
          videoURL: "` +
      video_background_youtube11_url_1 +
      `",
          containment: "body",
          autoPlay: false,
          mute: false,
          startAt: 0,
          opacity: 0.4,
          loop: true,
          ratio: "4/3",
          addRaster: false,
          coverImage:
            "../../Images mosaïques pour arrière plan web/bird-6812884_1920.jpg",
          gaTrack: "false",
          // showControls: false,
        },
        {
          videoURL: "` +
      video_background_youtube11_url_2 +
      `",
          containment: "body",
          autoPlay: true,
          mute: false,
          startAt: 0,
          opacity: 0.4,
          loop: true,
          ratio: "4/3",
          addRaster: false,
          coverImage:
            "../../Images mosaïques pour arrière plan web/bird-6812884_1920.jpg",
          gaTrack: "false",
        },
        {
          videoURL: "` +
      video_background_youtube11_url_3 +
      `",
          containment: "body",
          autoPlay: true,
          mute: false,
          startAt: 0,
          opacity: 0.4,
          loop: true,
          ratio: "4/3",
          addRaster: false,
          coverImage:
            "../../Images mosaïques pour arrière plan web/bird-6812884_1920.jpg",
          gaTrack: "false",
        },
      ];

      myPlayListPlayer = jQuery("#myPlayerID").YTPlaylist(
        videos,
        false,
        function (video) {
          /*
                  if (video.videoData) {
                      jQuery("#videoID").html(video.videoData.id);
                      jQuery("#videoTitle").html(video.videoData.title);
                  }
      */
        }
      );

      myPlayListPlayer.on("YTPData", function (e) {
        jQuery("#videoID").html(e.prop.id);
        jQuery("#videoTitle").html(e.prop.title);
      });
    });
  </script>

`,
    );
    $("head").append("" + bb + "");

    // console.log(ff, `ff`);

    setTimeout(() => {
      // jQuery('html,body').css('background', 'black');

      $("html,body").attr("style", "background: #00000000 !important");

      $(".background_class_horizontal_heading").attr(
        "style",
        "background-color: black",
      );

      jQuery("#myPlayerID").YTPPlay();
      setTimeout(() => {
        jQuery("#myPlayerID").YTPPlay();
      }, 1500);
      $(".bcLevel2").each(function () {
        $(this).attr("style", "background-color: #00000000 !important");
        $(".breadcrumb").attr("style", "background: transparent !important");
      });
      show_or_not_breadcrumb();
    }, 1500);
  }
  if ($("#myPlayerID").length == 1) {
    jQuery("#myPlayerID").YTPPlay();
  }
}

function add_button_for_background_video(
  video_background_youtube11_url_1,
  video_background_youtube11_url_2,
  video_background_youtube11_url_3,
) {
  setTimeout(() => {
    $("body").append("" + div_pour_les_videos_de_background + "");
    // }
  }, 1000);
}

function stop_video_background() {
  $(
    "#myPlayerID, .inserted_ytmb, #controlBar_myPlayerID, #wrapper_myPlayerID, #www-widgetapi-script, #YTAPI",
  ).remove();

  setTimeout(() => {
    $("html, body").css(
      "background",
      window.background_html_and_body_image + " !important",
    );
  }, 300);
}

function toggle_sections_2_and_3_borders() {
  if (bordures_pour_h2_et_h3_ont_elles_été_activées) {
    $(".bcLevel2, .bcLevel3").css({
      "border-top": "transparent",
      "border-left": "transparent",
    });
    bordures_pour_h2_et_h3_ont_elles_été_activées = 0;
  } else {
    $(".bcLevel2").css({
      "border-top": "1px dotted #ff009d",
      "border-left": "1px solid #ff009d",
    });
    $(".bcLevel3").css({
      "border-top": "1px dotted #cf3eff",
      "border-left": "1px solid #cf3eff",
    });
    bordures_pour_h2_et_h3_ont_elles_été_activées = 1;
  }
}

$(document).ready(function () {
  var filename = location.pathname.match(/[^\/]+$/)[0];

  var filename_histo = decodeURI(filename);

  setTimeout(() => {
    $(".icon_on_top").each(function () {
      if ($(this)[0].outerHTML.indexOf(filename_histo) > 0) {
        $(this).css("border", "1px solid #ff00f0");

        $(this).css("border-radius", "10%");
      }
    });
  }, 2000);
});

const myModalEl = document.getElementById(
  "https://fr.wikipedia.org/wiki/Luisa_Piccarreta20",
);

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
          '<iframe width="" height="" style="height: 90vh; width: 98%;" src="' +
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
  $("article").each(function () { });
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
        pourcentage_agrandi0 = +pourcentage_agrandi0 + +10;
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

$(document).ready(function () {
  let background_coquille_image;

  const body = document.body;
  const computedStyle = getComputedStyle(body);
  background_coquille_image = computedStyle.backgroundImage;

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
        $(".quatrieme_coquille_top_button").replaceWith(html);
        applyBackgroundImage(".quatrieme_coquille_top_button");
      })
      .fail(function () {
        handleError("Erreur lors du chargement de 'coquille4_top_l.html'.");
      });
  });

  $(document).on("click", ".btn_new_3", function () {
    let filename = $(this).attr("trois_week_attrib");
    let ffilename_sans_ext_ = filename.replace(".html", "");
    filename =
      "Pages_pour_historique_site/Parties_added_3_last_weeks/" +
      ffilename_sans_ext_ +
      "_added_3_last_weeks.html";

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
    window.scrollTo(window.scrollX, window.scrollY - 110);
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
setTimeout(() => { }, 100);

let currentAudio = null;

function select_audio(audio) {
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
  }
  currentAudio = audio;

  updateButtonStyle(currentAudio);
}

function fct_toggle_audio() {
  const toggleButton = document.getElementById("toggle_audio");
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
  const toggleButton = document.getElementById("toggle_audio");
  if (audio.paused) {
    toggleButton.classList.remove("playing_audio");

    toggleButton.classList.add("paused_audio");
  } else {
    toggleButton.classList.remove("bi-cassette");
    toggleButton.classList.remove("paused_audio");

    toggleButton.classList.add("playing_audio");
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

function testyy() {
  setTimeout(() => {
    jQuery("#myPlayerID").YTPMute();
    setTimeout(() => {
      jQuery("#myPlayerID").YTPUnmute();
    }, 2000);
  }, 2000);
}
