/**
 * See (http:
 * @name $
 * @class
 * See the jQuery Library  (http:
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See (http:
 * @name fn
 * @class
 * See the jQuery Library  (http:
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */

(function (factory) {
  if (typeof define === "function" && define.amd && define.amd.jQuery) {
    define(["jquery"], factory);
  } else if (typeof module !== "undefined" && module.exports) {
    factory(require("jquery"));
  } else {
    factory(jQuery);
  }
})(function ($) {
  "use strict";

  var VERSION = "1.0.0",
    PLUGIN_NS = "DynamicContentMenu",
    PLUGIN_NAME = "dynamicContentMenu",
    pluginClassName = PLUGIN_NAME,
    pluginFocusClassName = "activev1",
    pluginHideClassName = PLUGIN_NAME + "_hide",
    headerClassName = PLUGIN_NAME + "__header",
    headerClass = "." + headerClassName,
    subheaderClassName = PLUGIN_NAME + "__subheader",
    subheaderClass = "." + subheaderClassName,
    itemClassName = PLUGIN_NAME + "__item",
    itemClass = "." + itemClassName,
    extendPageClassName = PLUGIN_NAME + "__extend-page",
    extendPageClass = "." + extendPageClassName;

  var DynamicContentMenu = function (element, options) {
    this.options = options;
    this.$element = $(element);
    this._create(element);
  };

  DynamicContentMenu.DEFAULTS = {
    context: "body",

    ignoreSelector: null,

    selectors: "h1",

    showAndHide: true,

    showEffect: "slideDown",

    showEffectSpeed: "medium",

    hideEffect: "slideUp",

    hideEffectSpeed: "medium",

    smoothScroll: true,

    smoothScrollSpeed: "medium",

    scrollTo: 0,

    showAndHideOnScroll: true,

    highlightOnScroll: true,

    highlightOffset: 0,

    theme: "material",

    extendPage: true,

    extendPageOffset: 100,

    history: true,

    scrollHistory: false,

    hashGenerator: "pretty",

    highlightDefault: true,
  };

  DynamicContentMenu.prototype._create = function (element) {
    var self = this;

    self.extendPageScroll = true;

    self.items = [];

    self._generateHtmlMenu();

    self._addCSSTheme();

    self._addCSSClasses();

    self.webkit = (function () {
      for (var prop in window) {
        if (prop) {
          if (prop.toLowerCase().indexOf("webkit") !== -1) {
            return true;
          }
        }
      }

      return false;
    })();

    self._setEventHandlers();

    $(window).on("load", function (e) {
      self._setActiveElement(true);

      $("html, body")
        .promise()
        .done(function () {
          setTimeout(function () {
            self.extendPageScroll = false;
          }, 0);
        });
    });
  };

  DynamicContentMenu.prototype._generateHtmlMenu = function () {
    var self = this,
      firstElem,
      ul,
      ignoreSelector = self.options.ignoreSelector;

    if (this.options.selectors.indexOf(",") !== -1) {
      firstElem = $(this.options.context)
        .parents()
        .find(
          this.options.selectors
            .replace(/ /g, "")
            .substr(0, this.options.selectors.indexOf(",")),
        );
      // firstElem = $(this.htmly).parents().find(this.options.selectors.replace(/ /g,"").substr(0, this.options.selectors.indexOf(",")));
      // console.log(firstElem,"firstElem");
    } else {
      firstElem = $(this.options.context).find(
        this.options.selectors.replace(/ /g, ""),
      );
      // var $log = $(body);
      // firstElem = $(log).parents().find(this.options.selectors.replace(/ /g, ""));
      // firstElem = $(this.htmly).parents().find(this.options.selectors.replace(/ /g, ""));
      // firstElem = $(this.options.context.replace((this.options.context)[0].innerHTML,html_modified)).find(this.options.selectors.replace(/ /g,""));
    }

    if (!firstElem.length) {
      self.$element.addClass(pluginHideClassName);

      return;
    }

    self.$element.addClass(pluginClassName);
    // self.$element.addClass(pluginClassName + " d-inline-flex");

    firstElem.each(function (index) {
      if ($(this).is(ignoreSelector)) {
        return;
      }

      ul = $("<ul/>", {
        id: headerClassName + index,
        class: headerClassName,
      }).append(self._nestElements($(this), index));

      if (index % 2 == 3) {
      } else {
        ul.addClass("grey_background");

        ul.css("border-bottom", "1px dotted grey");
      }
      self.$element.append(ul);

      if (5 == 4) {
        var tintin = $(this).closest(".capsule1");

        tintin.each(function () {
          if ($(this).find(self.options.selectors).length === 0) {
            $(this)
              .filter(self.options.selectors)
              .each(function () {
                if ($(this).is(ignoreSelector)) {
                  return;
                }

                self._appendSubheaders.call(this, self, ul);
              });
          } else {
            $(this)
              .find(self.options.selectors)
              .each(function (index) {
                if ($(this).is(ignoreSelector)) {
                  return;
                }
                self._appendSubheaders.call(this, self, ul);
              });
          }
        });
      } else {
        $(this)
          .nextUntil(this.nodeName.toLowerCase())
          .each(function () {
            if ($(this).find(self.options.selectors).length === 0) {
              $(this)
                .filter(self.options.selectors)
                .each(function () {
                  if ($(this).is(ignoreSelector)) {
                    return;
                  }
                  self._appendSubheaders.call(this, self, ul);
                });
            } else {
              $(this)
                .find(self.options.selectors)
                .each(function (index) {
                  if ($(this).is(ignoreSelector)) {
                    return;
                  }

                  self._appendSubheaders.call(this, self, ul);
                });
            }
          });
      }
    });
  };

  (DynamicContentMenu.prototype._setActiveElement = function (pageload) {
    var self = this,
      hash = window.location.hash.substring(1),
      elem = self.$element.find('li[data-unique="' + hash + '"]');

    if (hash.length) {
      self.$element.find("." + self.focusClass).removeClass(self.focusClass);

      elem.addClass(self.focusClass);

      if (self.options.showAndHide) {
        elem.click();
      }
    } else {
      self.$element.find("." + self.focusClass).removeClass(self.focusClass);

      if (!hash.length && pageload && self.options.highlightDefault) {
        self.$element.find(itemClass).first().addClass(self.focusClass);
      }
    }

    return self;
  }),
    (DynamicContentMenu.prototype._nestElements = function (self, index) {
      var arr, item, hashValue;

      arr = $.grep(this.items, function (item) {
        return item === self.text();
      });

      if (arr.length) {
        this.items.push(self.text() + index);
      } else {
        this.items.push(self.text());
      }

      hashValue = this._generateHashValue(arr, self, index);

      item = $("<li/>", {
        class: itemClassName,

        "data-unique": hashValue,
      }).append(
        $("<a/>", {
          text: self.text(),
        }),
      );

      self.before(
        $("<div/>", {
          name: hashValue,

          "data-unique": hashValue,
        }),
      );

      return item;
    }),
    (DynamicContentMenu.prototype._generateHashValue = function (
      arr,
      self,
      index,
    ) {
      var hashValue = "",
        hashGeneratorOption = this.options.hashGenerator;

      if (hashGeneratorOption === "pretty") {
        hashValue = self.text().toLowerCase().replace(/\s/g, "-");
        hashValue = self.text().replace(/"/g, /''/g);
        // str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        // Remove accents/diacritics in a string in JavaScript - Stack Overflow
        // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
        hashValue = self
          .text()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        //hashValue = self.text().toLowerCase();
        // console.log(hashValue,"1")

        while (hashValue.indexOf("--") > -1) {
          hashValue = hashValue.replace(/--/g, "-");
          hashValue = self.text().replace(/"/g, /''/g);
          hashValue = self
            .text()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          // hashValue = self.text().toLowerCase();
          // console.log(hashValue,"2")
        }

        while (hashValue.indexOf(":-") > -1) {
          hashValue = hashValue.replace(/:-/g, "-");
          hashValue = self.text().replace(/"/g, /''/g);
          hashValue = self
            .text()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          //hashValue = self.text().toLowerCase();
          // console.log(hashValue,"3")
        }
      } else if (typeof hashGeneratorOption === "function") {
        hashValue = hashGeneratorOption(self.text(), self);
        hashValue = self.text().replace(/"/g, /''/g);
      } else {
        // console.log("hello5"); +++++++++++++++++++++++++++++fonctionna+++++++++++++++++++++++

        hashValue = self.text().replace(/\s/g, "");
        hashValue = self.text().replace(/"/g, /''/g); //fonctionnel
      }

      // add the index if we need to
      if (arr.length) {
        hashValue += "" + index;
      }

      // return the value

      // console.log(hashValue,j,"hashValue");
      // console.log(arr.length,"arr.length");

      // if (arr.length && arr.length<1){
      return hashValue;
      // }
    }),
    // _appendElements
    // ---------------
    //      Helps create the table of contents list by appending subheader elements

    (DynamicContentMenu.prototype._appendSubheaders = function (self, ul) {
      // The current element index
      // console.log($(this).index(self.options.selectors), "______fffffffffffcx_______");
      var index = $(this).index(self.options.selectors),
        // Finds the previous header DOM element
        previousHeader = $(self.options.selectors).eq(index - 1),
        currentTagName = +$(this).prop("tagName").charAt(1),
        previousTagName = +previousHeader.prop("tagName").charAt(1),
        lastSubheader;

      // If the current header DOM element is smaller than the previous header DOM element or the first subheader
      if (currentTagName < previousTagName) {
        // Selects the last unordered list HTML found within the HTML element calling the plugin
        self.$element
          .find(subheaderClass + "[data-tag=" + currentTagName + "]")
          .last()
          .append(self._nestElements($(this), index));
      } else if (currentTagName === previousTagName) {
        // If the current header DOM element is the same type of header(eg. h4) as the previous header DOM element
        ul.find(itemClass)
          .last()
          .after(self._nestElements($(this), index));
      } else {
        // Selects the last unordered list HTML found within the HTML element calling the plugin
        ul.find(itemClass)
          .last()
          // Appends an unorderedList HTML element to the dynamic `unorderedList` variable and sets a common class name
          .after(
            $("<ul/>", {
              class: subheaderClassName,

              "data-tag": currentTagName,
            }),
          )
          .next(subheaderClass)
          // Appends a list item HTML element to the last unordered list HTML element found within the HTML element calling the plugin
          .append(self._nestElements($(this), index));
      }
    }),
    // _setEventHandlers
    // ----------------
    //      Adds jQuery event handlers to the newly generated table of contents
    (DynamicContentMenu.prototype._setEventHandlers = function () {
      // _Local variables_

      // Stores the plugin context in the self variable
      var self = this,
        // Instantiates a new variable that will be used to hold a specific element's context
        $self,
        duration;

      this.$element.on("click." + PLUGIN_NS, "li", function (event) {
        if (self.options.history) {
          window.location.hash = $(this).attr("data-unique");
        }

        self.$element.find("." + self.focusClass).removeClass(self.focusClass);

        $(this).addClass(self.focusClass);

        if (self.options.showAndHide) {
          var elem = $('li[data-unique="' + $(this).attr("data-unique") + '"]');

          self._triggerShow(elem);
        }

        self._scrollTo($(this));
      });

      this.$element.find("li").on({
        "mouseenter.DynamicContentMenu": function () {
          $(this).addClass(self.hoverClass);

          $(this).css("cursor", "pointer");
        },

        "mouseleave.DynamicContentMenu": function () {
          if (self.options.theme !== "bootstrap") {
            $(this).removeClass(self.hoverClass);
          }
        },
      });

      if (
        self.options.extendPage ||
        self.options.highlightOnScroll ||
        self.options.scrollHistory ||
        self.options.showAndHideOnScroll
      ) {
        $(window).on("scroll.DynamicContentMenu", function () {
          $("html, body")
            .promise()
            .done(function () {
              var winScrollTop = $(window).scrollTop(),
                winHeight = $(window).height(),
                docHeight = $(document).height(),
                scrollHeight = $("body")[0].scrollHeight,
                elem,
                lastElem,
                lastElemOffset,
                currentElem;

              if (self.options.extendPage) {
                if (
                  (self.webkit &&
                    winScrollTop >=
                      scrollHeight -
                        winHeight -
                        self.options.extendPageOffset) ||
                  (!self.webkit &&
                    winHeight + winScrollTop >
                      docHeight - self.options.extendPageOffset)
                ) {
                  if (!$(extendPageClass).length) {
                    lastElem = $(
                      'div[data-unique="' +
                        $(itemClass).last().attr("data-unique") +
                        '"]',
                    );

                    if (!lastElem.length) return;

                    lastElemOffset = lastElem.offset().top;

                    $(self.options.context).append(
                      $("<div />", {
                        class: extendPageClassName,

                        height: Math.abs(lastElemOffset - winScrollTop) + "px",

                        "data-unique": extendPageClassName,
                      }),
                    );

                    if (self.extendPageScroll) {
                      currentElem = self.$element.find("li.activev1");

                      self._scrollTo(
                        $(
                          'div[data-unique="' +
                            currentElem.attr("data-unique") +
                            '"]',
                        ),
                      );
                    }
                  }
                }
              }

              setTimeout(function () {
                var closestAnchorDistance = null,
                  closestAnchorIdx = null,
                  anchors = $(self.options.context).find("div[data-unique]"),
                  anchorText;

                anchors.each(function (idx) {
                  var distance = Math.abs(
                    ($(this).next().length ? $(this).next() : $(this)).offset()
                      .top -
                      winScrollTop -
                      self.options.highlightOffset,
                  );
                  if (
                    closestAnchorDistance == null ||
                    distance < closestAnchorDistance
                  ) {
                    closestAnchorDistance = distance;
                    closestAnchorIdx = idx;
                  } else {
                    return false;
                  }
                });

                anchorText = $(anchors[closestAnchorIdx]).attr("data-unique");

                elem = $('li[data-unique="' + anchorText + '"]');

                if (self.options.highlightOnScroll && elem.length) {
                  self.$element
                    .find("." + self.focusClass)
                    .removeClass(self.focusClass);

                  elem.addClass(self.focusClass);
                }

                if (self.options.scrollHistory) {
                  if (window.location.hash !== "#" + anchorText) {
                    window.location.replace("#" + anchorText);
                  }
                }

                if (
                  self.options.showAndHideOnScroll &&
                  self.options.showAndHide
                ) {
                  self._triggerShow(elem, true);
                }
              }, 0);
            });
        });
      }
    }),
    (DynamicContentMenu.prototype.show = function (elem, scroll) {
      var self = this,
        element = elem;

      if (!elem.is(":visible")) {
        if (
          !elem.find(subheaderClass).length &&
          !elem.parent().is(headerClass) &&
          !elem.parent().is(":visible")
        ) {
          elem = elem.parents(subheaderClass).add(elem);
        } else if (
          !elem.children(subheaderClass).length &&
          !elem.parent().is(headerClass)
        ) {
          elem = elem.closest(subheaderClass);
        }

        switch (self.options.showEffect) {
          case "none":
            elem.show();

            break;

          case "show":
            elem.show(self.options.showEffectSpeed);

            break;

          case "slideDown":
            elem.slideDown(self.options.showEffectSpeed);

            break;

          case "fadeIn":
            elem.fadeIn(self.options.showEffectSpeed);

            break;

          default:
            elem.show();

            break;
        }
      }

      if (elem.parent().is(headerClass)) {
        self.hide($(subheaderClass).not(elem));
      } else {
        self.hide(
          $(subheaderClass).not(
            elem.closest(headerClass).find(subheaderClass).not(elem.siblings()),
          ),
        );
      }

      return self;
    }),
    (DynamicContentMenu.prototype.hide = function (elem) {
      var self = this;

      switch (self.options.hideEffect) {
        case "none":
          elem.hide();

          break;

        case "hide":
          elem.hide(self.options.hideEffectSpeed);

          break;

        case "slideUp":
          elem.slideUp(self.options.hideEffectSpeed);

          break;

        case "fadeOut":
          elem.fadeOut(self.options.hideEffectSpeed);

          break;

        default:
          elem.hide();

          break;
      }

      return self;
    });

  DynamicContentMenu.prototype._triggerShow = function (elem, scroll) {
    var self = this;

    if (elem.parent().is(headerClass) || elem.next().is(subheaderClass)) {
      self.show(elem.next(subheaderClass), scroll);
    } else if (elem.parent().is(subheaderClass)) {
      self.show(elem.parent(), scroll);
    }

    return self;
  };

  DynamicContentMenu.prototype._addCSSTheme = function () {
    if (this.options.theme === "material") {
      this.$element.addClass("scod-theme-material");
    }

    return this;
  };

  DynamicContentMenu.prototype._addCSSClasses = function () {
    this.$element
      .find(headerClass + "," + subheaderClass)
      .addClass("scod-flex-container");
    this.focusClass = pluginFocusClassName;

    return this;
  };

  DynamicContentMenu.prototype.setOption = function () {
    $.Widget.prototype._setOption.apply(this, arguments);
  };

  DynamicContentMenu.prototype.setOptions = function () {
    $.Widget.prototype._setOptions.apply(this, arguments);
  };

  DynamicContentMenu.prototype._scrollTo = function (elem) {
    var self = this,
      duration = self.options.smoothScroll || 0,
      scrollTo = self.options.scrollTo,
      //!!!scrollTo = window.value_of_scroll_to_offset,

      currentDiv = $('div[data-unique="' + elem.attr("data-unique") + '"]');

    if (!currentDiv.length) {
      return self;
    }

    $("html, body")
      .promise()
      .done(function () {
        $("html, body").animate(
          {
            scrollTop:
              currentDiv.offset().top -
              (isFunction222(scrollTo) ? scrollTo.call() : scrollTo) +
              "px",
          },
          {
            duration: duration,
          },
        );
      });

    return self;
  };

  function Plugin(option, _relatedTarget) {
    var self = this;

    return this.each(function () {
      var $this = $(this);
      var instance = $this.data(PLUGIN_NS);

      var options = $.extend(
        {},
        DynamicContentMenu.DEFAULTS,
        $this.data(),
        typeof option == "object" && option,
      );

      if (!instance)
        $this.data(
          PLUGIN_NS,
          (instance = new DynamicContentMenu(this, options)),
        );

      if (typeof option == "string") {
        if (!$.isFunction(instance[option]) || option.charAt(0) === "_") {
          $.error(
            "no such method '" +
              option +
              "' for " +
              PLUGIN_NAME +
              " plugin instance",
          );
        }

        instance[option](Array.prototype.slice.call(arguments, 1));
      } else if (!instance) {
        $.error("Plugin must be initialised before using method: " + option);
      }
    });
  }

  var old = $.fn[PLUGIN_NAME];

  $.fn[PLUGIN_NAME] = Plugin;
  $.fn[PLUGIN_NAME].Constructor = DynamicContentMenu;

  $.fn[PLUGIN_NAME].noConflict = function () {
    $.fn[PLUGIN_NAME] = old;
    return this;
  };
});

function isFunction222(func) {
  return typeof func === "function";
}
