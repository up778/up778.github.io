$(document).ready(function () {
  $(".svg_pan_zoom").each(function (index, element3) {
    const panzoom2 = Panzoom(element3, {
      easing: "ease-in-out",

      canvas: false,

      cursor: "normal",

      disablePan: false,
      disableZoom: false,

      disableXAxis: false,
      disableYAxis: false,

      duration: 200,

      easing: "ease-in-out",

      excludeClass: "panzoom-exclude",

      handleStartEvent: function (e) {
        e.preventDefault();
        e.stopPropagation();
      },

      maxScale: 2,

      minScale: 0.2,

      overflow: "hidden",

      panOnlyWhenZoomed: false,

      pinchAndPan: false,

      relative: false,

      startX: 0,

      startY: 0,

      startScale: 1,

      step: 0.2,

      touchAction: "none",
      maxZoom: 2,
      minZoom: 0.2,
    });

    element3.addEventListener(
      "wheel",
      function (event) {
        if (!(event.shiftKey || event.altKey)) return;
        panzoom2.zoomWithWheel(event);

        $(this)
          .parent()
          .next()
          .find(".panzoom_range")
          .val(panzoom2.getScale())
          .val(panzoom2.getScale());

        $(this).next().trigger("change");
      },
      { passive: true },
    );

    panzoom2.pan(10, 10);
    panzoom2.zoom(1, { animate: true });

    $(this)
      .parent()
      .next()
      .find(".panzoom_out")
      .first()
      .on("click", function (e) {
        e.preventDefault();
        panzoom2.zoomOut();
        $(this).next().next().val(panzoom2.getScale());
        $(this).next().next().trigger("change");
      });
    $(this)
      .parent()
      .next()
      .find(".panzoom_in")
      .first()
      .on("click", function (e) {
        e.preventDefault();
        panzoom2.zoomIn();
        $(this).next().val(panzoom2.getScale());
        $(this).next().trigger("change");
      });

    $(this)
      .parent()
      .next()
      .find(".panzoom_range")
      .first()
      .on("click", function (e) {
        e.preventDefault();
        panzoom2.zoom(event.target.valueAsNumber);
        var test = $(this)
          .parent()
          .next()
          .find(".panzoom_range")
          .first()[0].value;
      });

    $(this)
      .parent()
      .next()
      .find(".panzoom_reset")
      .first()
      .on("click", function (e) {
        e.preventDefault();
        panzoom2.reset();
        $(this).prev().val(panzoom2.getScale());
        $(this).prev().trigger("change");
      });
  });
});
