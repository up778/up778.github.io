/**
 * A lightweight youtube embed. Still should feel the same to the user, just MUCH faster to initialize and paint.
 *
 * Thx to these as the inspiration
 *   https:
 *   https:
 *
 * Once built it, I also found these:
 *   https:
 *   https:
 *   https:
 */

var last_played_video = 0;
var id_de_l_iframe_de_la_video = 0;
var b2ackground_coquille_image;

class LiteYTEmbed extends HTMLElement {
  connectedCallback() {
    this.videoId = this.getAttribute("video_id");
    this.srccc = this.getAttribute("src");

    var img_src_iframe_8;

    if (this.getAttribute("plac") == 0) {
      img_src_iframe_8 =
        this.getAttribute("img_src_iframe_8") ||
        this.getAttribute("img_src_iframe");
    } else {
      img_src_iframe_8 = "../../Images/V0_Backgrounds/abbey-1160492_1920.jpg";
    }

    let playBtnEl = this.querySelector(".lty-playbtn");

    let playBtnEl2 = this.querySelector(".lty-playbtn2");

    this.playLabel =
      (playBtnEl && playBtnEl.textContent.trim()) ||
      this.getAttribute("playlabel") ||
      "";

    // var aa = "▶️" + this.getAttribute("title_from_internet");
    var title_from_internet_var = this.getAttribute("title_from_internet");
    this.playLabel2 =
      (playBtnEl2 && playBtnEl2.textContent.trim()) ||
      this.getAttribute("playlabel") ||
      this.getAttribute("titlee") ||
      this.getAttribute("title2") ||
      title_from_internet_var ||
      "Play";

    /**
     * Lo, the youtube placeholder image!  (aka the thumbnail, poster image, etc)
     *
     * See https:
     *
     * TODO: Do the sddefault->hqdefault fallback
     *       - When doing this, apply referrerpolicy (https:
     * TODO: Consider using webp if supported, falling back to jpg
     */

    if (!this.style.backgroundImage) {
      var poster_plus = this.getAttribute("plac");

      var i2mg_src_iframe_8;
      if (this.getAttribute("plac") && this.getAttribute("plac") == 0) {
        i2mg_src_iframe_8 =
          this.getAttribute("img_src_iframe_8") ||
          this.getAttribute("img_src_iframe");
      } else {
        i2mg_src_iframe_8 =
          "../../Images/V0_Backgrounds/abbey-1160492_1920.jpg";
      }

      var background_image = 'url("' + i2mg_src_iframe_8;

      if (this.getAttribute("plac") == 0) {
        this.style.backgroundImage = background_image || poster_plus;
      } else if (this.getAttribute("plac") == 1) {
        this.style.backgroundImage =
          "url('" + this.getAttribute("p_oster_evt") + "')" ||
          "url('../../Images/V0_Backgrounds/abbey-1160492_1920.jpg')" ||
          poster_plus ||
          background_image;
      } else {
        this.style.backgroundImage = background_image;
      }
    }

    if (this.style.backgroundImage) {
      if (whichBrowser() == "Edge" || whichBrowser() == "Internet Explorer") {
      }
    }

    if (!playBtnEl) {
      playBtnEl = document.createElement("button");
      playBtnEl.type = "button";
      playBtnEl.title = "button. ";
      playBtnEl.title +=
        (playBtnEl2 && playBtnEl2.textContent.trim()) ||
        this.getAttribute("playlabel") ||
        this.getAttribute("titlee") ||
        this.getAttribute("title2") ||
        title_from_internet_var ||
        "Play";
      playBtnEl.classList.add("lty-playbtn");
      this.append(playBtnEl);
    }
    if (!playBtnEl.textContent) {
      const playBtnLabelEl = document.createElement("span");

      playBtnLabelEl.className = "lty_text";

      playBtnLabelEl.textContent = this.playLabel;
      playBtnEl.append(playBtnLabelEl);
    }

    this.addNoscriptIframe();

    playBtnEl.removeAttribute("href");

    if (!playBtnEl2) {
      playBtnEl2 = document.createElement("button");
      playBtnEl2.type = "button";
      playBtnEl2.classList.add("lty-playbtn2");
      this.append(playBtnEl2);
    }
    if (!playBtnEl2.textContent) {
      const playBtnLabelEl2 = document.createElement("span");

      playBtnLabelEl2.className = "lty_text2";

      playBtnLabelEl2.textContent = this.playLabel2;
      playBtnEl2.append(playBtnLabelEl2);
    }
    playBtnEl2.removeAttribute("href");

    this.addEventListener("pointerover", LiteYTEmbed.warmConnections, {
      once: true,
    });

    this.addEventListener("click", this.addIframe);

    this.needsYTApi =
      this.hasAttribute("js-api") ||
      navigator.vendor.includes("Apple") ||
      navigator.userAgent.includes("Mobi");
  }

  /**
   * Add a <link rel={preload | preconnect} ...> to the head
   */
  static addPrefetch(kind, url, as) {
    const linkEl = document.createElement("link");
    linkEl.rel = kind;
    linkEl.href = url;
    if (as) {
      linkEl.as = as;
    }
    document.head.append(linkEl);
  }

  /**
   * Begin pre-connecting to warm up the iframe load
   * Since the embed's network requests load within its iframe,
   *   preload/prefetch'ing them outside the iframe will only cause double-downloads.
   * So, the best we can do is warm up a few connections to origins that are in the critical path.
   *
   * Maybe `<link rel=preload as=document>` would work, but it's unsupported: http:
   * But TBH, I don't think it'll happen soon with Site Isolation and split caches adding serious complexity.
   */
  static warmConnections() {
    if (LiteYTEmbed.preconnected) return;

    LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube-nocookie.com");

    LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com");

    LiteYTEmbed.addPrefetch(
      "preconnect",
      "https://googleads.g.doubleclick.net",
    );
    LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net");

    LiteYTEmbed.preconnected = true;
  }

  fetchYTPlayerApi() {
    if (window.YT || (window.YT && window.YT.Player)) return;

    this.ytApiPromise = new Promise((res, rej) => {
      var el = document.createElement("script");
      el.src = "https://www.youtube.com/iframe_api";

      el.async = true;
      el.onload = (_) => {
        YT.ready(res);
      };
      el.onerror = rej;
      this.append(el);
    });
  }

  /** Return the YT Player API instance. (Public L-YT-E API) */
  async getYTPlayer() {
    if (!this.playerPromise) {
      await this.activate();
    }

    return this.playerPromise;
  }

  async addYTPlayerIframe() {
    this.fetchYTPlayerApi();

    await this.ytApiPromise;

    const videoPlaceholderEl = document.createElement("div");
    videoPlaceholderEl.id = "iframe_id_" + this.videoId;

    this.append(videoPlaceholderEl);

    const paramsObj = Object.fromEntries(this.getParams().entries());

    this.playerPromise = new Promise((resolve) => {
      let player = new YT.Player(videoPlaceholderEl, {
        width: "100%",
        videoId: this.videoId,
        playerVars: paramsObj,
        events: {
          onReady: (event) => {
            event.target.playVideo();
            resolve(player);
          },
          onStateChange: (eventi) => {
            onPlayerStateChange(eventi);
          },
        },
      });
    });

    return this.display_block();
  }

  addNoscriptIframe() {
    const iframeEl = this.createBasicIframe();
    const noscriptEl = document.createElement("noscript");

    noscriptEl.innerHTML = iframeEl.outerHTML;
    this.append(noscriptEl);
  }

  getParams() {
    const params = new URLSearchParams(this.getAttribute("params") || []);
    params.append("autoplay", "1");
    params.append("playsinline", "1");
    return params;
  }

  async activate() {
    if (this.classList.contains("lyt-activated")) return;
    this.classList.add("lyt-activated");

    if (this.needsYTApi) {
      return this.addYTPlayerIframe(this.getParams());
    }

    const iframeEl = this.createBasicIframe();
    this.append(iframeEl);

    iframeEl.focus();
  }

  createBasicIframe() {
    const iframeEl = document.createElement("iframe");
    iframeEl.width = 560;
    iframeEl.height = 315;

    iframeEl.title = this.playLabel;
    iframeEl.allow =
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframeEl.allowFullscreen = true;

    iframeEl.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?${this.getParams().toString()}`;
    return iframeEl;
  }

  /**
   * In the spirit of the `lowsrc` attribute and progressive JPEGs, we'll upgrade the reliable
   * poster image to a higher resolution one, if it's available.
   * Interestingly this sddefault webp is often smaller in filesize, but we will still attempt it second
   * because getting _an_ image in front of the user if our first priority.
   *
   * See https:
   */

  upgradePosterImage() {
    setTimeout(() => {
      const webpUrl = `https://i.ytimg.com/vi_webp/${this.videoId}/sddefault.webp`;
      const img = new Image();
      img.fetchPriority = "low";
      img.referrerpolicy = "origin";
      img.src = webpUrl;
      img.onload = (e) => {
        const noAvailablePoster =
          e.target.naturalHeight == 90 && e.target.naturalWidth == 120;
        if (noAvailablePoster) return;

        this.style.backgroundImage = `url("${webpUrl}")`;
      };
    }, 100);
  }

  async display_block() {
    setTimeout(() => {
      this.style.display = "block";
    }, 300);
  }

  async addIframe() {
    this.style.display = "none";

    if (this.classList.contains("lyt-activated")) return;
    this.classList.add("lyt-activated");

    const params = new URLSearchParams(this.getAttribute("params") || []);
    params.append("autoplay", "1");
    params.append("playsinline", "1");

    return this.addYTPlayerIframe(params);

    const iframeEl = document.createElement("iframe");
    iframeEl.width = 560;
    iframeEl.height = 315;
    iframeEl.id = "55555555555";

    iframeEl.title = this.playLabel;
    iframeEl.textContent = this.playLabel2;
    iframeEl.allow =
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframeEl.allowFullscreen = true;

    if (this.videoId.indexOf("clipt") > 0) {
      iframeEl.src = `https://www.youtube.com/embed/` + this.videoId + ``;
      // iframeEl.src = `https:
    } else {
      iframeEl.src = `https://www.youtube.com/embed/${encodeURIComponent(
        this.videoId,
      )}?${params.toString()}`;
    }

    this.append(iframeEl);

    iframeEl.focus();
  }
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    document
      .querySelector(".class_btn_play_pause_youtube_video")
      .style.setProperty("background-color", "#44444480");

    if (last_played_video != 0) {
    }

    if (
      last_played_video != event.target.playerInfo.videoData.video_id &&
      event.target.options.playerVars.start
    ) {
      event.target.seekTo(event.target.options.playerVars.start);
    }

    if (event.target.options.videoId.indexOf("clip") > 0) {
      last_played_video = event.target.options.videoId;
    } else {
      last_played_video = event.target.playerInfo.videoData.video_id;
    }
    id_de_l_iframe_de_la_video = event.target.g.id;

    event.target.g.classList.add("is_actualy_playing");
  } else if (event.data === YT.PlayerState.PAUSED) {
    document
      .querySelector(".class_btn_play_pause_youtube_video")
      .style.setProperty("background-color", "#dd000040");
  } else if (event.data === YT.PlayerState.ENDED) {
    document
      .querySelector(".class_btn_play_pause_youtube_video")
      .style.setProperty("background-color", "#dd000040");
  }
}

function play_pause_youtube_video(vidFunc) {
  var test;

  test = "iframe_id_" + last_played_video;
  var element5 = document.getElementById(test);

  if (element5 === null) {
    test = id_de_l_iframe_de_la_video;
  } else {
    test = "iframe_id_" + last_played_video;
  }

  var iframe4 = document.getElementById(test).contentWindow;

  var iframe5 = document.getElementById(test);

  if (iframe5.classList == "is_actualy_playing") {
    iframe4.postMessage(
      '{"event":"command","func":"' + "pauseVideo" + '","args":""}',
      "*",
    );

    iframe5.classList.remove("is_actualy_playing");
  } else {
    iframe4.postMessage(
      '{"event":"command","func":"' + "playVideo" + '","args":""}',
      "*",
    );
  }
}

function reach_played_youtube_video() {
  var test = "iframe_id_" + last_played_video;

  var iframe5 = document.getElementById(test);

  if (iframe5 === null) {
    test = id_de_l_iframe_de_la_video;
    iframe5 = document.getElementById(test);
  } else {
  }

  if (iframe5.classList == "is_actualy_playing") {
    var id = id_de_l_iframe_de_la_video;

    var elem = document.getElementById(id);
    elem.scrollIntoView({
      behavior: "instant",
      block: "center",
      inline: "nearest",
    });
  } else {
    var id;

    if (last_played_video.indexOf("clip") > 0) {
      id = last_played_video;
    } else {
      id = last_played_video.substring(0, 11);
    }

    var elem = document.querySelector('[video_id="' + id + '"]');

    elem.scrollIntoView({
      behavior: "instant",
      block: "center",
      inline: "nearest",
    });
  }
}

customElements.define("lite-youtube", LiteYTEmbed);
