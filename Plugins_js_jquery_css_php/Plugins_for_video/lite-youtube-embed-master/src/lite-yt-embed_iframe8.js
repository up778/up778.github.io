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
window.forceNextSeek = null;
let derniers_elements_lite_yt_joues = [];

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
    return this.playerPromise || Promise.resolve(null);
  }

  async addYTPlayerIframe() {
    this.fetchYTPlayerApi();

    await this.ytApiPromise;

    const videoPlaceholderEl = document.createElement("div");
    videoPlaceholderEl.id = "iframe_id_" + this.videoId;

    this.append(videoPlaceholderEl);

    const paramsObj = Object.fromEntries(this.getParams().entries());

    const parentDiv = document
      .getElementById("iframe_id_" + this.videoId)
      ?.closest(".div_around_iframe");
    const liteYT = parentDiv?.querySelector("lite-youtube");

    if (liteYT) {
      let rawUrl =
        liteYT.getAttribute("video_id") || liteYT.getAttribute("src");
      if (rawUrl) {
        const url = new URL("https://dummy.com/?" + rawUrl.split("?")[1]);

        const clip = url.searchParams.get("clip");
        const clipt = url.searchParams.get("clipt");

        if (clip && clipt) {
          paramsObj.clip = clip;
          paramsObj.clipt = clipt;
        }
      }
    }

    if (typeof this.videoId === "string") {
      const cleanId = this.videoId.split("?")[0].split("&")[0];
      if (/^[a-zA-Z0-9_-]{11}$/.test(cleanId)) {
        this.videoId = cleanId;
      } else {
        console.warn("ID vidéo invalide détecté :", this.videoId);
        return;
      }
    }

    this.playerPromise = new Promise((resolve) => {
      let player = new YT.Player(videoPlaceholderEl, {
        width: "100%",

        videoId: this.videoId,
        playerVars: {
          ...paramsObj,
        },
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
      this.playerPromise = this.addYTPlayerIframe();
      return this.playerPromise;
    } else {
      const iframeEl = this.createBasicIframe();
      this.append(iframeEl);
      iframeEl.focus();
      this.playerPromise = Promise.resolve(null);
    }
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

    if (!derniers_elements_lite_yt_joues.includes(this)) {
      derniers_elements_lite_yt_joues.push(this);

      if (derniers_elements_lite_yt_joues.length > 2) {
        derniers_elements_lite_yt_joues.shift();
      }
    }

    document.querySelectorAll("lite-youtube").forEach((lt) => {
      if (!derniers_elements_lite_yt_joues.includes(lt)) {
        reset_to_lite_youtube(lt);
      }
    });

    const params = new URLSearchParams(this.getAttribute("params") || []);
    params.append("autoplay", "1");
    params.append("playsinline", "1");
    params.append("controls", "1");

    return this.addYTPlayerIframe(params);
  }
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    dernier_element_lite_yt_joué =
      event.target.g?.closest("lite-youtube") || null;

    const el = document.querySelectorAll(".class_btn_play_pause_youtube_video");

    document.querySelectorAll("lite-youtube").forEach((lt) => {
      if (!derniers_elements_lite_yt_joues.includes(lt)) {
        reset_to_lite_youtube(lt);
      }
    });

    el.forEach((button) => {
      button.style.setProperty("background-color", "#be000061");
      const plus_50 = increaseColor(predo_color_of_page, 50);
      button.style.setProperty("border", "1px dashed " + plus_50 + "");
    });

    // ------------------ ICI ------------------
    // Ajouter la remise à poster pour toutes les autres vidéos
    document.querySelectorAll("lite-youtube").forEach((lt) => {
      if (lt !== dernier_element_lite_yt_joué) {
        reset_to_lite_youtube(lt);
      }
    });

    if (last_played_video != 0) {
    }

    if (
      last_played_video != event.target.playerInfo.videoData.video_id &&
      event.target.options.playerVars.start
    ) {
      const start = event.target.options.playerVars.start;

      if (!window.forceNextSeek && start && start > 0) {
        setTimeout(() => event.target.seekTo(start), 100);
      } else {
        window.forceNextSeek = null;
      }
    }

    if (event.target.options.videoId.indexOf("clip") > 0) {
      last_played_video = event.target.options.videoId;
    } else {
      last_played_video = event.target.playerInfo.videoData.video_id;
    }
    id_de_l_iframe_de_la_video = event.target.g.id;

    event.target.g.classList.add("is_actualy_playing");
  } else if (event.data === YT.PlayerState.PAUSED) {
    const el = document.querySelectorAll(".class_btn_play_pause_youtube_video");

    el.forEach((button) => {
      button.style.setProperty("background-color", "#dd000081");

      button.style.setProperty("border", "0px dashed grey");
    });
  } else if (event.data === YT.PlayerState.ENDED) {
    const el = document.querySelectorAll(".class_btn_play_pause_youtube_video");
    el.forEach((button) => {
      button.style.setProperty("background-color", "transparent");
      button.style.setProperty("border", "0px dashed grey");
    });
  }
}

function play_pause_youtube_video() {
  let iframe5 = null;

  if (derniers_elements_lite_yt_joues.length > 0) {
    let dernier_element =
      derniers_elements_lite_yt_joues[
        derniers_elements_lite_yt_joues.length - 1
      ];
    let wrapper = dernier_element.closest(
      'div.div_around_iframe[id*="iframe_video_id"]',
    );
    if (!wrapper) {
      wrapper = dernier_element.closest(".div_around_iframe");
    }
    iframe5 = wrapper?.querySelector("iframe");
  }

  if (!iframe5) {
    console.warn(
      "Impossible de localiser l'iframe via le dernier élément connu.",
    );
    return;
  }

  const iframe4 = iframe5.contentWindow;

  if (iframe5.classList.contains("is_actualy_playing")) {
    iframe4.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*",
    );

    iframe5.classList.remove("is_actualy_playing");
  } else {
    iframe4.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*",
    );
  }
}

function reach_played_youtube_video() {
  if (derniers_elements_lite_yt_joues.length > 0) {
    let dernier_element =
      derniers_elements_lite_yt_joues[
        derniers_elements_lite_yt_joues.length - 1
      ];
    let wrapper = dernier_element.closest(
      'div.div_around_iframe[id*="iframe_video_id"]',
    );
    if (!wrapper) {
      wrapper = dernier_element.closest(".div_around_iframe");
    }

    setTimeout(() => {
      wrapper?.scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "nearest",
      });

      const $target = $(wrapper.closest("table"));
      restartAnimation($target, "shakeX");
    }, 30);
  } else {
    console.warn(
      "Aucun élément lite-youtube en cours de lecture n’a été détecté.",
    );
  }
}

function reset_to_lite_youtube(liteYT) {
  if (!liteYT) return;

  if (derniers_elements_lite_yt_joues.includes(liteYT)) return;

  const iframe = liteYT.querySelector("iframe");
  if (iframe) iframe.remove();

  liteYT.classList.remove("lyt-activated");
  liteYT.style.display = "block";
}

customElements.define("lite-youtube", LiteYTEmbed);

async function jumpToTime(videoId, containerId, timeInSeconds) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const liteYT = container.querySelector("lite-youtube");
  if (!liteYT) return;

  if (!derniers_elements_lite_yt_joues.includes(liteYT)) {
    derniers_elements_lite_yt_joues.push(liteYT);
    if (derniers_elements_lite_yt_joues.length > 2) {
      derniers_elements_lite_yt_joues.shift();
    }
  }

  if (liteYT.classList.contains("lyt-activated")) {
    try {
      const player = await liteYT.getYTPlayer();
      await waitForPlayerReady(player);
      window.forceNextSeek = timeInSeconds;
      player.seekTo(timeInSeconds, true);
      player.playVideo();
    } catch (e) {
      console.warn("Erreur avec getYTPlayer:", e);
    }
    return;
  }

  const playButton = liteYT.querySelector(".lty-playbtn, .lty-playbtn2");
  if (playButton) {
    playButton.click();

    const observer = new MutationObserver(async (mutations, obs) => {
      const iframe = liteYT.querySelector("iframe");
      if (!iframe) return;

      try {
        const player = await liteYT.getYTPlayer();
        window.forceNextSeek = timeInSeconds;
        player.seekTo(timeInSeconds, true);
        player.playVideo();
      } catch (e) {
        console.warn("Erreur après activation:", e);
      } finally {
        obs.disconnect();
      }
    });

    observer.observe(liteYT, { childList: true, subtree: true });
  } else {
    console.warn("Bouton lecture introuvable dans lite-youtube");
  }
}

function waitForPlayerReady(player, timeout = 4000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const checkReady = () => {
      if (player?.getPlayerState) {
        resolve();
      } else if (Date.now() - start > timeout) {
        reject(new Error("Player non prêt après délai"));
      } else {
        setTimeout(checkReady, 100);
      }
    };
    checkReady();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn_yt_video_jump");
    if (!btn) return;
    e.preventDefault();

    const videoId = btn.dataset.videoId;
    const containerId = btn.dataset.containerId;
    const seconds = parseInt(btn.dataset.time, 10);

    jumpToTime(videoId, containerId, seconds);
  });
});

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".class_btn_pause_yt_video");
  if (!btn) return;

  e.preventDefault();

  const video_id = btn.dataset.videoId;
  const container_id = btn.dataset.containerId;

  const container = document.getElementById(container_id);
  if (!container) {
    console.warn("Conteneur non trouvé :", container_id);
    return;
  }

  const lite_yt = container.querySelector("lite-youtube");
  if (!lite_yt) {
    console.warn("Élément lite-youtube non trouvé dans :", container_id);
    return;
  }

  dernier_element_lite_yt_joué = lite_yt;

  lite_yt
    .getYTPlayer?.()
    .then(async (player) => {
      if (!player) {
        console.warn("Player introuvable via getYTPlayer");
        return;
      }

      try {
        await waitForPlayerReady(player);

        const state = player.getPlayerState?.();

        if (state === 1) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
      } catch (err) {
        console.warn("Erreur pendant la lecture/pause :", err);
      }
    })
    .catch((err) => {
      console.warn("Échec getYTPlayer :", err);
    });
});
