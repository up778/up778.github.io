var myPlayListPlayer;
jQuery(function () {
  /**
   * Set the video list with all the parameters for each video
   * @type {*[]}
   */
  var videos = [
    {
      videoURL: "VuaJAgx0x_4",
      containment: "#fred",
      autoPlay: true,
      mute: false,
      startAt: 0,
      opacity: 1,
      loop: false,
      ratio: 4 / 3,
      addRaster: true,
      quality: "large",
    },
    {
      videoURL: "3ovA7zeviRo",
      containment: "#fred",
      autoPlay: true,
      mute: true,
      startAt: 10,
      stopAt: 20,
      opacity: 1,
      loop: 2,
      ratio: 4 / 3,
      addRaster: false,
      quality: "large",
    },
    {
      // videoURL: "u9k1FaMIYTs",
      // videoURL: "_i8L7h_ASpw",
      videoURL: "664Io8aGEoQ",
      containment: "#fred",
      autoPlay: true,
      mute: false,
      startAt: 0,
      stopAt: 1000,
      opacity: 0.3,
      loop: 20,
      ratio: 4 / 3,
      addRaster: true,
      quality: "large",
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
