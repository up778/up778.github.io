const predo_color_of_page_recup =
  typeof predo_color_of_page !== "undefined" ? predo_color_of_page : "#00c400";

const trans_predo_color_of_page_recup = predo_color_of_page_recup
  ? predo_color_of_page_recup + "77 !important;"
  : "#ffff0050";

const t2rans_predo_color_of_page_recup = predo_color_of_page_recup
  ? predo_color_of_page_recup + "cc !important;"
  : "#ffff00bb";

$("head").append(
  `<style>.customStyle { background-color: ${trans_predo_color_of_page_recup} !important; }</style>`,
);

let clicked_breadcrumb_id = null;
let freeze_refresh = false;

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
    const settings = $.extend(
      {
        levels: 5,

        slideDuration: 0,
        levelClassPrefix: "bcLevel",
      },
      options,
    );

    let lastActiveHeaderId = "";
    let breadcrumbContainer = $(this);
    let breadcrumbList = $('<ul class="breadcrumb"></ul>').prependTo(
      breadcrumbContainer,
    );

    for (let i = 0; i < settings.levels; i++) {
      breadcrumbList.append("<li class='gfre oncliik'></li>");
    }

    //  let $dynamicContentMenuHeaders = $(".dynamicContentMenu__header");

    function refreshBreadcrumb() {
      if (!refreshBreadcrumb.allHeaders) {
        refreshBreadcrumb.allHeaders = $(
          ".dynamicContentMenu__header",
        ).toArray();
      }
      const $allHeaders = $(refreshBreadcrumb.allHeaders);

      let level = 0;
      let currentContainer;

      if (clicked_breadcrumb_id) {
        currentContainer = $("#" + clicked_breadcrumb_id);
        const match = currentContainer.attr("class").match(/bcLevel(\d)/);
        level = match ? parseInt(match[1], 10) : 1;
      } else {
        for (let i = settings.levels; i > 0; i--) {
          const inView = $(
            "." + settings.levelClassPrefix + i + ":in-viewport(300)",
          );
          if (inView.length > 0) {
            level = i;
            currentContainer = inView.first();
            break;
          }
        }
      }

      if (!currentContainer) {
        breadcrumbContainer.slideUp(settings.slideDuration);
        return;
      }

      const currentId = currentContainer.closest("article").attr("id");
      if (lastActiveHeaderId !== currentId) {
        if (lastActiveHeaderId) {
          $allHeaders
            .filter("#dynamicContentMenu__header" + lastActiveHeaderId)
            .css("border", "");
        }

        lastActiveHeaderId = currentId;

        const match = currentId.match(/(\d?[a-zA-Z0-9])$/);
        let lastItem = match ? match[0] : "";
        if (lastItem.length === 2 && lastItem[0] === "0")
          lastItem = lastItem[1];

        const headerTargetId = "dynamicContentMenu__header" + (lastItem - 1);

        $allHeaders.each(function () {
          if (this.id === headerTargetId) {
            $(this).attr(
              "style",
              (i, s) =>
                (s || "") +
                "; border: 2px dashed " +
                predo_color_of_page_recup +
                " !important;",
            );
          }
        });
      }

      // Gestion des niveaux du breadcrumb
      for (let i = settings.levels; i > level; i--) {
        // console.log(
        //   breadcrumbList.find("> li:nth-child(" + (i + 1) + ")"),
        //   "breadcrumbList.find"

        breadcrumbList.find("> li:nth-child(" + (i + 1) + ")").hide();
      }
      for (; level > 0; level--) {
        const cssLevel = level;
        const li = breadcrumbList
          .find("> li:nth-child(" + (cssLevel + 1) + ")")
          .empty();
        const heading = currentContainer
          .find("h" + cssLevel)
          .first()
          .text();
        const siblings = currentContainer
          .parent()
          .children("." + settings.levelClassPrefix + level);

        if (siblings.length > 1) {
          $(
            '<a role="button" data-bs-toggle="dropdown" href="javascript:void(0)">' +
              heading +
              "</a>",
          ).appendTo(li);
          const subMenu = $('<ul class="yyyy">').appendTo(
            $("<div>").appendTo(li),
          );

          siblings.each(function () {
            const siblingHeading = $(this)
              .find("h" + cssLevel)
              .first()
              .text();
            const siblingId = $(this).attr("id");
            const isCurrent = siblingId === currentContainer.attr("id");

            subMenu.append(
              '<li><a class="Jacques2" href="#' +
                siblingId +
                '" style="border-radius:10px;' +
                (isCurrent
                  ? "border:2px dotted " +
                    t2rans_predo_color_of_page_recup +
                    ";"
                  : "") +
                '">' +
                siblingHeading +
                (isCurrent
                  ? '&nbsp;&nbsp;&nbsp; 👈 <span style="color:#f7c226cc !important;font-size:80%"></span>'
                  : "") +
                "</a></li>",
            );
          });
        } else {
          // cas seul → pas de dropdown
          $(
            '<a class="Jacques2" href="#' +
              currentContainer.attr("id") +
              '">' +
              heading +
              "</a>",
          ).appendTo(li);
        }

        li.show();
        currentContainer = currentContainer.parent();
      }

      breadcrumbContainer.slideDown(settings.slideDuration);
    }

    let refreshScheduled = false;

    function scheduleRefresh() {
      if (freeze_refresh) return;
      if (!refreshScheduled) {
        refreshScheduled = true;
        requestAnimationFrame(() => {
          refreshBreadcrumb();
          refreshScheduled = false;
        });
      }
    }

    $(window).on("scroll resize", scheduleRefresh);

    scheduleRefresh();

    return {
      container: breadcrumbContainer,
      refresh: refreshBreadcrumb,
    };
  };
})(jQuery);

$(document).ready(function () {
  const breadcrumb = $("#breadcrumb").initBreadcrumb();

  $("html").on("click", ".Jacques2", function (e) {
    freeze_refresh = true;
    clicked_breadcrumb_id = $(this).attr("href").substring(1);

    breadcrumb.refresh();

    setTimeout(() => {
      freeze_refresh = false;
      clicked_breadcrumb_id = null;
    }, 600);

    const target = $(this).attr("href");
    $(target).addClass("animate__animated animate__shakeX");
    setTimeout(() => {
      $(target).removeClass("animate__animated animate__shakeX");
    }, 500);
  });
});
