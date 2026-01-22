function appliquer_apparence_lettres() {
  setTimeout(() => {
    const patterns_replacements = [
      [/<strong>([DC])<\/strong>(ieu|hrist)/g, "<strong>$1</strong>$2"],
      [
        /\bChien([s]*)([.,;:]?)/g,
        '<span class="font_i_chien_Majuscule">C</span><span class="font_i_chien">hien$1</span>$2',
      ],
      [/\bchien([s]*)\b/g, '<span class="font_i_chien">chien$1</span>'],

      [
        /<strong>D<\/strong>ieu/gi,
        '<span class="font_i_3"><strong>Dieu</strong></span>',
      ],
      [/\bDieu\b/gi, '<span class="font_i_3"><strong>Dieu</strong></span>'],
      [/\bFils\b/gi, '<span class="font_i_3"><strong>F</strong>ils</span>'],
      [/\bThéologie\b/g, '<span class="font_i_3">Théologie</span>'],
      [/\bEsprit\b/g, '<span class="font_i_3">Esprit</span>'],
      [/\b([aA])ng([ée])([\w]*)/gu, '<span class="font_i_3">$1ng$2$3</span>'],
      [/\bJ\*sus\b/g, '<span class="font_i_3"><strong>J</strong>*sus</span>'],
      [/\b([dD])ivin([\w]*)/gu, '<span class="font_i_3">$1ivin$2</span>'],
      [
        /\b([tT])rinit(\p{L}*)\b(?!\s*")/giu,
        '<span class="font_i_3">$1rinit$2</span>',
      ],
      [
        /\b([cC])harit([é]*)([\w]*)/giu,
        '<span class="font_i_3">$1harit$2$3</span>',
      ],

      // 🌟 Orient / Occident
      [
        /(?<![_"#])Occidentaux(?![_"#])/gu,
        '<span class="font_i_maj_Occidentaux">O</span><span class="font_i_ccidentaux">ccidentaux</span>',
      ],
      [
        /(?<![/_"#])Orientaux(?![_"#])/gu,
        '<span class="font_i_maj_Orientaux">O</span><span class="font_i_rientaux">rientaux</span>',
      ],
      [
        /(?<![/_"#])([oO])rient(?!at|é|ée|és|ées)([al]?[\p{L}]*)(?![_"#])/giu,
        '<span class="font_i_orient">$1rient$2</span>',
      ],
      [
        /(?<![_"#])([oO])ccident([al]?[\p{L}]*)(?![_"#])/giu,
        '<span class="font_i_occident">$1ccident$2</span>',
      ],
      [
        /(?<![_">#])\b([Gg])auche(?!_)([\w]*)/g,
        '<span class="font_i_occident">$1auche$2</span>',
      ],
      [
        /(?<![_">#])\b([Dd])roite(?!_)([\w]*)/g,
        '<span class="font_i_orient">$1roite$2</span>',
      ],
      // [/\b([Mm])usulman([\w]*)([.,;:]?)/g, '<span class="font_i_orient">$1usulman$2</span>$3'],
      [
        /\b([Mm])usulman([\w]*)/g,
        '<span class="font_i_orient">$1usulman$2</span>',
      ],

      [
        /\bdémon([\p{L}]*)\b(?![^<]*<\/span>)/giu,
        '<span class="font_i_dém">démon$1</span>',
      ],
      [
        /\b([mM])al([\p{L}]*)\b(?![^<]*<\/span>)/gu,
        '<span class="font_i_dém">$1al$2</span>',
      ],
      [/\benfer\b(?![^<]*<\/span>)/gi, '<span class="font_i_dém">enfer</span>'],
      [
        /\bsatan([\p{L}]*)\b(?![^<]*<\/span>)/gu,
        '<span class="font_i_dém">satan$1</span>',
      ],
      [
        /\bdiab([lo])([\p{L}]*)\b(?![^<]*<\/span>)/gu,
        '<span class="font_i_dém">diab$1$2</span>',
      ],
      [
        /\b([oO])rgueil([\p{L}]*)\b(?![^<]*<\/span>)/gu,
        '<span class="font_i_dém">$1rgueil$2</span>',
      ],
      [
        /\b([tT])én([éè])bre([\p{L}]*)\b(?![^<]*<\/span>)/gu,
        '<span class="font_i_dém">$1én$2bre$3</span>',
      ],
      [/"possédés"/gu, '"<span class="font_i_dém_2">possédés</span>"'],

      [/\b([cC])ani([\w]*)\b/giu, '<span class="font_i_chien">$1ani$2</span>'],
      [/\bbalourd([\w]*)\b/g, '<span class="font_i_chien">balourd$1</span>'],
      [/\bpataud\b/gi, '<span class="font_i_chien">pataud</span>'],
      [
        /(?<!-)\b([cC])hat([s]*)\b/g,
        '<span class="font_i_orient">$1hat$2</span>',
      ],
      [/\b([fF])éli([\w]*)\b/giu, '<span class="font_i_orient">$1éli$2</span>'],

      [
        /\bPierre-Marie( P\.?)?\b/gu,
        '<span class="font_i_celtica">P</span><span class="font_i_celtica">ierre-</span><span class="font_i_celtica">M</span><span class="font_i_celtica">arie$1</span>',
      ],
      [/\boddr\b/gi, '<span class="font_i_celtica">oddr</span>'],
      [/\bstar wars\b/gi, '<span class="font_i_star_wars">star wars</span>'],
      [/\bLeïla\b/gi, '<span class="font_i_star_wars">Leïla</span>'],

      [
        /(?<![-_#])([Ee])xtra-?terrestre([\w]*)(?![_#])/giu,
        '<span class="font_i_Extra_terrestres_min">$1xtra-terrestre$2</span>',
      ],
      [
        /(?<![_#])David Vincent(?![_#])/giu,
        '<span class="font_i_Extra_terrestres_min">David Vincent</span>',
      ],
      [
        /(?<![_#])Les Envahisseurs(?![_#])/giu,
        '<span class="font_i_fume">Les Envahisseurs</span>',
      ],

      [
        /(?<![/_">#])([Uu])folog([\w]*)\b(?!_)/giu,
        '<span class="font_i_Extra_terrestres_min">$1folog$2</span>',
      ],

      [
        /<strong>C<\/strong>hrist([\w]*)/g,
        '<span class="font_europ"><strong>C</strong>hrist$1</span>',
      ],
      [
        /\bChrist([\w]*)\b/g,
        '<span class="font_europ"><strong>C</strong>hrist$1</span>',
      ],

      [
        /\b([sS])port([\w]*)\b/gi,
        '<span class="font_i_occident">$1port$2</span>',
      ],
      [
        /\b([Ff])ootball([\w]*)\b/gi,
        '<span class="font_i_occident">$1ootball$2</span>',
      ],
      [
        /\b([bB])allon([\w]*)\b/gi,
        '<span class="font_i_occident">$1allon$2</span>',
      ],
      [
        /\b([bB])alle([s]*)\b/gi,
        '<span class="font_i_occident">$1alle$2</span>',
      ],
      [/\bSalim Laïbi\b/gi, '<span class="font_i_occident">Salim Laïbi</span>'],
      [
        /\bRépubli([\w]*)\b/gi,
        '<span class="font_i_occident">Républi$1</span>',
      ],
      [
        /\b([cC])roisade([s]*)\b/g,
        '<span class="font_europ">$1roisade$2</span>',
      ],

      [/pas\s<span\s+class="font_i_dém">\s*mal\s*<\/span>/gu, "pas mal"],
      [
        /(?<![_#])\b([\p{L}]*)([fF])um([ée])([\w]*)\b(?!_)/gu,
        '<span class="font_i_fume">$1$2um$3$4</span>',
      ],

      [/\bColombine\b/g, '<span class="font_i_ombine">Colombine</span>'],
      [/\bZarathoustra\b/gi, '<span class="font_i_persia">Zarathoustra</span>'],
      [
        /\bO c c i d e n t a u x\b/gi,
        '<span class="font_i_maj_Occidentaux">O</span><span class="font_i_ccidentaux"> c c i d e n t a u x</span>',
      ],
      [
        /\bO r i e n t a u x\b/gi,
        '<span class="font_i_maj_Orientaux">O</span><span class="font_i_rientaux"> r i e n t a u x</span>',
      ],
      [
        /\b([fF])ille([\w]*)\b/gi,
        '<span class="font_i_Fille"><strong>$1ille$2</strong></span>',
      ],
    ];

    document
      .querySelectorAll("p, h1, h2, h3, h4, h5, li, td, div, a")
      .forEach((el) => {
        if (
          el.tagName === "BUTTON" ||
          el.closest("button, input, select, textarea")
        )
          return;

        if (el.tagName === "LITE-YOUTUBE" || el.querySelector("lite-youtube"))
          return;
        if (el.tagName === "INPUT" || el.querySelector("input")) return;
        if (el.tagName === "IMG" || el.querySelector("img")) return;
        if (el.tagName === "PICTURE" || el.querySelector("picture")) return;

        if (el.closest(".background_class_horizontal_heading")) return;
        if (el.querySelector(".div_around_iframe")) return;
        if (el.closest(".pop_button")) return;
        if (el.closest(".right_dynamic_menu")) return;

        if (el.querySelector("video")) return;
        if (el.querySelector(".boutons_ezoom")) return;
        if (el.querySelector(".btn_yt_video_jump")) return;
        if (el.closest(".btn_audio_jump")) return;
        if (el.closest(".btn_audio_pause")) return;

        const originalHref =
          el.tagName === "A" ? el.getAttribute("href") : null;

        const wrapper = document.createElement("div");
        wrapper.innerHTML = el.innerHTML;

        patterns_replacements.forEach(([regex, replacement]) => {
          wrapper.innerHTML = wrapper.innerHTML.replace(regex, replacement);
        });

        el.innerHTML = wrapper.innerHTML;

        if (originalHref !== null) el.setAttribute("href", originalHref);
      });
  }, 50);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", appliquer_apparence_lettres);
} else {
  appliquer_apparence_lettres();
}
