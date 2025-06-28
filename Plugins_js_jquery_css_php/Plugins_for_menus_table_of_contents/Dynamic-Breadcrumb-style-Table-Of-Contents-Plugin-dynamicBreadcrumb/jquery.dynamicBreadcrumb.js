const predo_color_of_page_recup =
  typeof predo_color_of_page !== "undefined" ? predo_color_of_page : "#00c400";

const trans_predo_color_of_page_recup = predo_color_of_page_recup
  ? predo_color_of_page_recup + "77 !important;"
  : "#ffff0050";
const t2rans_predo_color_of_page_recup = predo_color_of_page_recup
  ? predo_color_of_page_recup + "cc !important;"
  : "#ffff00bb";

var customBg =
  "background-color: " + trans_predo_color_of_page_recup + " !important;";
var styleTag = $("<style>.customStyle { " + customBg + " }</style>");
$("head").append(styleTag);

(function ($) {
  /**
   * jQuery Dynamic Breadcrumb Plugin.
   *
   * Copyright 2015, HBT GmbH
   *
   * Simple plugin for generating a dynamic breadcrumb with sub menus. Depends on the jQuery Viewport plugin (http:
   *
   * Call initBreadcrumb on a container like div or nav, then use the added refresh() function to refresh the breadcrumb, e.g.:
   *
   * var breadcrumb = $('#breadcrumb').initBreadcrumb();
   * $(window).scroll(breadcrumb.refresh);
   *
   * Breadcrum levels must contain an identifying class:
   *
   * <div id="id1" class="bcLevel1">
   *   <h2></h2>
   *   <article id="id2" class="bcLevel2">
   *     <h3></h3>
   *     <section id="id3" class="bcLevel3"><h4></h4></section>
   *     <section id="id4 class="bcLevel3"><h4></h4></section>
   *   </article>
   *   </article id="id5" class="bcLevel2">...</article>
   *   ...
   * </div>
   */

  /* do stuff.. */

  $.fn.initBreadcrumb = function (options) {
    var settings = $.extend(
      {
        levels: 5,

        slideDuration: 0,
        levelClassPrefix: "bcLevel",
      },
      options,
    );

    var temp_current_cont = 0;
    var timer22 = 0;
    var breadcrumbContainer = $(this);

    var breadcrumbList = $('<ul class=""></ul>')
      .prependTo(breadcrumbContainer)
      .addClass("breadcrumb");

    for (let i = 0; i < settings.levels; i++) {
      breadcrumbList.append("<li class='gfre oncliik'></li>");
    }

    var $dynamicContentMenuHeaders;
    $(document).ready(function () {
      $dynamicContentMenuHeaders = $(".dynamicContentMenu__header");
    });

    breadcrumbContainer.refresh = function () {
      var level = 0;
      var currentContainer;

      for (let i = settings.levels; i > 0; i--) {
        if (
          $("." + settings.levelClassPrefix + i + ":in-viewport( 120 )")
            .length > 0
        ) {
          level = i;

          currentContainer = $(
            "." + settings.levelClassPrefix + i + ":in-viewport( 120 )",
          ).first();

          if (
            temp_current_cont !=
            "currentContainer:" + currentContainer.closest("article").attr("id")
          ) {
            temp_current_cont =
              "currentContainer:" +
              currentContainer.closest("article").attr("id");

            var etttttt =
              "currentContainer:" +
              currentContainer.closest("article").attr("id");

            let match6 = etttttt.match(/(\d?[a-zA-Z0-9])$/);

            let lastItem = match6 ? match6[0] : null;

            if (lastItem && lastItem.length === 2 && lastItem[0] === "0") {
              lastItem = lastItem[1];
            }

            let lastItem2 = lastItem - 1;

            var ff = "dynamicContentMenu__header" + lastItem2;

            if (timer22 == 0) {
              setTimeout(() => {
                $dynamicContentMenuHeaders.each(function (index, element) {
                  if ($(this).attr("id") == ff) {
                    $(this).css("border", "");
                    // $(this).attr(
                    //   "style",

                    $(this).attr("style", function (i, s) {
                      return (
                        (s || "") +
                        "; border: 2px dashed " +
                        predo_color_of_page_recup +
                        " !important;"
                      );
                    });
                    // $(this).css({
                    //   "border": "2px dashed " + predo_color_of_page_recup + " !important",
                  } else {
                    $(this).css("border", "");
                    // $(this).css(
                    //   "background-color",
                  }
                });
                timer22 = 1;
              }, 2000);
            } else {
              $dynamicContentMenuHeaders.each(function (index, element) {
                if ($(this).attr("id") == ff) {
                  $(this).css("border", "");

                  // $(this).attr(
                  //   "style",

                  $(this).attr("style", function (i, s) {
                    return (
                      (s || "") +
                      "; border: 2px dashed " +
                      predo_color_of_page_recup +
                      " !important;"
                    );
                  });
                  // $(this).css({
                  //   "border": "2px dashed " + predo_color_of_page_recup + " !important",
                } else {
                  $(this).css("border", "");
                  // $(this).css(
                  //   "background-color",
                }
              });
            }
          }

          break;
        }
      }

      if (level > 0) {
        for (let i = settings.levels; i > level; i--) {
          breadcrumbList.find("> li:nth-child(" + (i + 1) + ")").hide();
        }
        for (; level > 0; level--) {
          var cssLevel = level + 1;

          var childLi = breadcrumbList
            .find("> li:nth-child(" + cssLevel + ")")
            .empty();

          cssLevel = level;

          if (level > 0) {
            if (level == 1) {
            }
            $(
              '<a data-bs-toggle="dropdown" aria-expanded="false" role="button" href="javascript:void(0)' +
                '">' +
                currentContainer
                  .find("h" + cssLevel)
                  .first()
                  .text() +
                "</a>",
            ).appendTo(childLi);
          } else {
            $(
              '<a data-bs-toggle="dropdown" aria-expanded="false" role="button"  href="javascript:void(0)' +
                '">' +
                currentContainer
                  .parent()
                  .prev()
                  .find("h" + cssLevel)
                  .first()
                  .text() +
                "</a>",
            ).appendTo(childLi);
          }

          siblings = 0;

          if (level > 0) {
            siblings = currentContainer
              .parent()
              .children("." + settings.levelClassPrefix + level);
          } else {
            siblings = "a";
          }

          if (level > 0) {
            if (siblings.length > 0) {
              var subMenu = $('<ul class="yyyy">').appendTo(
                $("<div>").appendTo(childLi),
              );
              siblings.each(function () {
                if (
                  $(this)
                    .find("h" + cssLevel)
                    .first()
                    .text() ==
                  currentContainer
                    .find("h" + cssLevel)
                    .first()
                    .text()
                ) {
                  subMenu.append(
                    '<li class=" "><a style="border-radius: 10px;border:2px dotted ' +
                      t2rans_predo_color_of_page_recup +
                      ';  class="Jacques2" href="#' +
                      $(this).attr("id") +
                      '">' +
                      $(this)
                        .find("h" + cssLevel)
                        .first()
                        .text() +
                      '&nbsp;&nbsp;&nbsp; 👈 <span style="color:#f7c226cc !important;font-size:80%"></span></a></li>',
                  );
                } else {
                  subMenu.append(
                    '<li class=" "><a class="Jacques2" href="#' +
                      $(this).attr("id") +
                      '">' +
                      $(this)
                        .find("h" + cssLevel)
                        .first()
                        .text() +
                      "</a></li>",
                  );
                }
              });
            }
          } else {
            if (siblings.length > 0) {
              var subMenu = $('<ul class=" ">').appendTo(
                $("<div>").appendTo(childLi),
              );
              $(".class_around_h1").each(function () {
                subMenu.append(
                  '<li><a role="button" href="#' +
                    $(this).attr("id") +
                    '">' +
                    $(this)
                      .find("h" + cssLevel)
                      .first()
                      .text() +
                    "</a></li>",
                );
              });
            }
          }

          childLi.show();
          currentContainer = currentContainer.parent();
        }
        breadcrumbContainer.slideDown(settings.slideDuration);
      } else {
        breadcrumbContainer.slideUp(settings.slideDuration);
      }
    };

    return breadcrumbContainer;
  };
})(jQuery);

$("html").on("click", ".Jacques2", function (e) {
  var clicked_link = $(this).attr("href");

  $(clicked_link).addClass("animate__animated animate__shakeX");
  setTimeout(() => {
    $(clicked_link).removeClass("animate__animated animate__shakeX");
  }, 500);
});
