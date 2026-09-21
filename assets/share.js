const canUseLocalStorage =
  localStorage.getItem("fsb-consent-given") !== "false" ? true : false;
const checkPlatformSupport = (shareBtn) => {
  const supportNote =
    shareBtn.parentElement.parentElement.getElementsByClassName(
      "fsb-support-note"
    )[0];

  const domainInput =
    shareBtn.parentElement.parentElement.getElementsByClassName(
      "fsb-domain"
    )[0];

  supportNote.classList.add("fsb-d-none");

  let note =
    shareBtn.parentElement.parentElement.getElementsByClassName(
      "fsb-note"
    )[0];

  if (!note) {
    note = document.createElement("p");
    note.classList.add("fsb-note");
    note.classList.add("fsb-d-none");
    supportNote.parentNode.insertBefore(note, supportNote.nextSibling);
  }

  const supportNoteLink =
    shareBtn.parentElement.parentElement.getElementsByClassName(
      "fsb-support-note-link"
    )[0];

  if (note) {
    note.classList.add("fsb-d-none");
  }

  if (!supportedSoftware.includes(window.fsbGlobalSoftware)) {
    supportNoteLink.href = `https://${domainInput.value}`;
    supportNoteLink.innerHTML = domainInput.value;
    supportNote.classList.remove("fsb-d-none");
  }

  if (note && notes[window.fsbGlobalSoftware]) {
    note.innerHTML = notes[window.fsbGlobalSoftware];
    note.classList.remove("fsb-d-none");
  }
};const doneTyping = async (el) => {
  const shareBtn = el.parentElement.getElementsByClassName("fsb-button")[0];
  const domain = getDomain(el.value);

  const resp = await fetch(
    `https://fediverse-info.stefanbohacek.com/node-info?domain=${domain}&onlysoftware=true`
  );

  shareBtn.innerHTML = shareBtn.innerHTML.replace("Loading", "Share");

  const respJSON = await resp.json();
  const software = respJSON?.software?.name;
  const iconEl = el.parentElement.getElementsByClassName("fsb-icon")[0];

  el.dataset.software = software;
  window.fsbGlobalSoftware = software;

  checkPlatformSupport(shareBtn);

  if (software && knownSoftware.includes(software)) {
    updateTheIcon(iconEl, software);

    if (supportedSoftware.includes(software)) {
      shareBtn.disabled = false;
    }
  } else {
    updateTheIcon(iconEl, "question");
  }
};
const getDomain = (str) => str.replace(/(^\w+:|^)\/\//, "");
const getFSBPath = () => {
  var scripts = document.getElementsByClassName("fsb-script")[0];
  src = scripts.src;
  return src.replace("/script.min.js", "");
};
const getPageDescription = () => {
  let pageDescription = "";

  const metaDescription =
    document.querySelector("meta[name='description']") ||
    document.querySelector("meta[property='og:description']") ||
    null;
  if (metaDescription && metaDescription.getAttribute) {
    pageDescription = metaDescription.getAttribute("content");
  }

  return encodeURIComponent(pageDescription);
};const getPageTitle = () => {
  let pageTitle = document.title;

  try {
    pageTitle = document
      .querySelector("meta[property='og:title']")
      .getAttribute("content");
  } catch (error) {
    // noop
  }

  return encodeURIComponent(pageTitle);
};
const getPageURL = () => encodeURIComponent(window.location.href);
const getSelectedText = () => {
  // https://stackoverflow.com/a/5379408

  let text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  // return text.replace(/(\r\n|\n|\r)/gm, "");
  return truncate(text);
};
const hidePlatformSupportVisibilityNote = (shareBtn) => {
  const supportNote =
    shareBtn.parentElement.parentElement.getElementsByClassName(
      "fsb-support-note"
    )[0];

  supportNote.classList.add("fsb-d-none");
};
// List of suported fediverse software.

const knownSoftware = [
  "activitypods",
  "akkoma",
  "anacus",
  "andstatus",
  "anfora",
  "audon",
  "awakari",
  "azorius",
  "bonfire",
  "bookwyrm",
  "bridgy_fed",
  "brighteon_social",
  "brutalinks",
  "buttondown",
  "calckey",
  "castopod",
  "chatter_net",
  "chirp",
  "communecter",
  "diaspora",
  "discourse",
  "dolphin",
  "drupal",
  "emissary",
  "epicyon",
  "f2ap",
  "fedibird",
  "fedify",
  "firefish",
  "flipboard",
  "flockingbird",
  "flohmarkt",
  "forgeflex",
  "forgefriends",
  "forgejo",
  "forte",
  "foundkey",
  "friendica",
  "funkwhale",
  "gancio",
  "gath.io",
  "ghost",
  "gitlab",
  "glitch-soc",
  "gnu_social",
  "goblin",
  "goldfish",
  "gotosocial",
  "greatape",
  "guppe",
  "hollo",
  "hometown",
  "honk",
  "hubzilla",
  "iceshrimp",
  "immers",
  "juick",
  "kazarma",
  "kbin",
  "kepi",
  "ktistec",
  "lemmy",
  "libervia",
  "loforo",
  "loops",
  "mangane",
  "mastodon",
  "mbin",
  "micro.blog",
  "minds",
  "misskey",
  "mistpark",
  "misty",
  "mitra",
  "mobilizon",
  "neodb",
  "nextcloud_social",
  "nodebb",
  "notestock",
  "openengiadina",
  "osada",
  "owncast",
  "peertube",
  "piefed",
  "pinetta",
  "pixelfed",
  "pleroma",
  "plume",
  "podcast_index",
  "postmarks",
  "prismo",
  "quanta",
  "rebased",
  "redaktor",
  "redmatrix",
  "reel2bits",
  "roadhouse",
  "ruffy",
  "seppo",
  "sharky",
  "shuttlecraft",
  "skohub",
  "smithereen",
  "snac",
  "soapbox",
  "socialhome",
  "streams",
  "sublinks",
  "swanye",
  "takahe",
  "takesama",
  "threads",
  "vernissage",
  "viverse",
  "vocata",
  "wafrn",
  "wildebeest",
  "wordpress",
  "write.as",
  "writefreely",
  "wxwclub",
  "xwiki",
  "yeet",
  "zap",
];
const notes = {
  lemmy: `Older lemmy servers <a href="https://github.com/LemmyNet/lemmy-ui/issues/1913" target="_blank">may not work correctly</a>.`,
};
const supportedSoftware = [
  "calckey",
  "diaspora",
  "fedibird",
  "firefish",
  "foundkey",
  "friendica",
  "glitchcafe",
  "glitch-soc",
  "gnusocial",
  "hometown",
  "hubzilla",
  "kbin",
  "lemmy",
  "mastodon",
  "meisskey",
  "microdotblog",
  "misskey",
  "pleroma",
  "sharkey",
  "threads",
];const truncate = (input) =>
  input.length > 5 ? `${input.substring(0, 450)}...` : input;
let typingTimer;
const doneTypingInterval = 1300;

const updateIcon = async (domainInput) => {
  clearTimeout(typingTimer);
  if (domainInput.value) {
    typingTimer = setTimeout(() => {
      doneTyping(domainInput);
    }, doneTypingInterval);
  } else {
    const iconEl =
      domainInput.parentElement.getElementsByClassName("fsb-icon")[0];
    updateTheIcon(iconEl, "mastodon");
  }
};
const updateTheIcon = (iconElement, software) => {
  iconElement.src = `${getFSBPath()}/icons/${software}.svg`;
  iconElement.alt = `${software} platform logo`;
};



(async () => {
  const savedDomain = canUseLocalStorage
    ? localStorage.getItem("fsb-domain")
    : false;
  const savedSoftware = canUseLocalStorage
    ? localStorage.getItem("fsb-software")
    : false;

  if (savedSoftware) {
    window.fsbGlobalSoftware = savedSoftware;
  }

  [...document.getElementsByClassName("fsb-prompt")].forEach((fsbPrompt) => {
    const domainInput = fsbPrompt.getElementsByClassName("fsb-domain")[0];
    const shareBtn = fsbPrompt.getElementsByClassName("fsb-button")[0];

    if (savedDomain) {
      domainInput.value = savedDomain;

      if (savedSoftware) {
        domainInput.dataset.software = savedSoftware;
        shareBtn.disabled = true;

        const iconEl =
          domainInput.parentElement.getElementsByClassName("fsb-icon")[0];
        updateTheIcon(iconEl, savedSoftware);

        if (supportedSoftware.includes(savedSoftware)) {
          shareBtn.disabled = false;
        }
      } else {
        updateIcon(domainInput);
      }
    }

    domainInput.addEventListener("input", () => {
      shareBtn.disabled = true;
      const iconEl =
        domainInput.parentElement.getElementsByClassName("fsb-icon")[0];

      hidePlatformSupportVisibilityNote(shareBtn);
      updateTheIcon(iconEl, "question");

      if (domainInput.value) {
        shareBtn.innerHTML = shareBtn.innerHTML.replace("Share", "Loading");
      } else {
        updateTheIcon(iconEl, "question");
        shareBtn.innerHTML = shareBtn.innerHTML.replace("Loading", "Share");
      }
      updateIcon(domainInput);
    });

    domainInput.addEventListener("change", () => {
      // shareBtn.disabled = true;
      // hidePlatformSupportVisibilityNote(shareBtn);
    });

    fsbPrompt.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const domain = getDomain(domainInput?.value?.trim());

      if (domain?.length) {
        const shareText = getSelectedText() || getPageTitle();

        if (canUseLocalStorage) {
          localStorage.setItem("fsb-domain", domain);
          if (window.fsbGlobalSoftware) {
            localStorage.setItem("fsb-software", window.fsbGlobalSoftware);
          }
        }

        const shareEndpoints = {
          calckey: "share?text={TEXT}",
          diaspora: "bookmarklet?title={TITLE}&notes={DESCRIPTION}&url={URL}",
          fedibird: "share?text={TEXT}",
          firefish: "share?text={TEXT}",
          forte: "rpost?title={TITLE}&body={DESCRIPTION}%0A{URL}",
          foundkey: "share?text={TEXT}",
          friendica: "compose?title={TITLE}&body={DESCRIPTION}%0A{URL}",
          glitchcafe: "share?text={TEXT}",
          gnusocial: "notice/new?status_textarea={TEXT}",
          hometown: "share?text={TEXT}",
          hubzilla: "rpost?title={TITLE}&body={DESCRIPTION}%0A{URL}",
          kbin: "new/link?url={URL}",
          lemmy: "create_post?url={URL}&title={TITLE}&body={DESCRIPTION}",
          mastodon: "share?text={TEXT}",
          meisskey: "share?text={TEXT}",
          microdotblog: "post?text=[{TITLE}]({URL})%0A%0A{DESCRIPTION}",
          misskey: "share?text={TEXT}",
          streams: "rpost?title={TITLE}&body={DESCRIPTION}%0A{URL}",
        };

        let shareURL = `https://${domain}/share?text=${
          shareText + "%0A%0A" + getPageURL()
        }`;

        if (domainInput?.dataset?.software) {
          const software = domainInput.dataset.software;
          const endpoint = shareEndpoints[software];

          if (endpoint) {
            shareURL = `https://${domain}/${endpoint}`
              .replace("{TEXT}", shareText + "%0A%0A" + getPageURL())
              .replace("{TITLE}", shareText)
              .replace("{DESCRIPTION}", getPageDescription())
              .replace("{URL}", getPageURL());
          }
        }

        // window.open(shareURL);
        // Doesn't work on iOS https://stackoverflow.com/questions/20696041/window-openurl-blank-not-working-on-imac-safari
        window.location.assign(shareURL);
      }
    });
  });
})();
