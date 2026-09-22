// New script

// These variables are mutated by onload()
var instanceDomain = "";
var instanceSoftware = "";
var articleTitle = "";
var articleUrl = "";
var articleDesc = "";
var articleText = "";

const localStorageEnabled = (localStorage.getItem("fsb-consent-given") !== "false" ? true : false);

const notes = {
  lemmy: `Older lemmy servers <a href="https://github.com/LemmyNet/lemmy-ui/issues/1913" target="_blank">may not work correctly</a>.`,
  pleroma: `Pleroma <b>might</b> not actually be supported for the moment, see <a href="https://github.com/stefanbohacek/fediverse-share-button/issues/9">this issue</a> for more info.`
};

const shareEndpoints = {
  calckey: "share?text={TEXT}",
  fedibird: "share?text={TEXT}",
  firefish: "share?text={TEXT}",
  foundkey: "share?text={TEXT}",
  glitchcafe: "share?text={TEXT}",
  hometown: "share?text={TEXT}",
  mastodon: "share?text={TEXT}",
  meisskey: "share?text={TEXT}",
  misskey: "share?text={TEXT}",
  pleroma: "share?text={TEXT}",
  diaspora: "bookmarklet?title={TITLE}&notes={DESCRIPTION}&url={URL}",
  forte: "rpost?title={TITLE}&body={DESCRIPTION}%0A{URL}",
  friendica: "compose?title={TITLE}&body={DESCRIPTION}%0A{URL}",
  gnusocial: "notice/new?status_textarea={TEXT}",
  hubzilla: "rpost?title={TITLE}&body={DESCRIPTION}%0A{URL}",
  kbin: "new/link?url={URL}",
  lemmy: "create_post?url={URL}&title={TITLE}&body={DESCRIPTION}",
  microdotblog: "post?text=[{TITLE}]({URL})%0A%0A{DESCRIPTION}",
  streams: "rpost?title={TITLE}&body={DESCRIPTION}%0A{URL}"
};

function error(title, msg) {
  document.getElementsByClassName("error")[0].innerHTML = `<h2>${title}</h2><p>${msg}</p>`;
}

function status(msg) {
  document.getElementsByClassName("status")[0].innerHTML = `<p>${msg}</p>`;
}

function createShareURL() {
  if (instanceSoftware == "" || instanceDomain == "") {
    console.error("createShareURL called without setting instanceSoftware nor instanceDomain?")
    return; // error out.
  }
  
  if (shareEndpoints[instanceSoftware]) {
    return (`https://${instanceDomain}/` + shareEndpoints[instanceSoftware])
    .replace("{TEXT}", encodeURIComponent(articleText))
    .replace("{TITLE}", encodeURIComponent(articleTitle))
    .replace("{DESCRIPTION}", encodeURIComponent(articleDesc))
    .replace("{URL}", encodeURIComponent(articleUrl));
  }
}

function redirect(shareUrl) {
  // window.open(shareURL);
  // Doesn't work on iOS https://stackoverflow.com/questions/20696041/window-openurl-blank-not-working-on-imac-safari
  window.location.assign(shareURL);
}
          
function updateIcon(software) {
  let iconElement = document.getElementsByClassName("icon")[0];
  iconElement.src = `share/icons/${software}.svg`;
  iconElement.alt = `${software} platform logo`;
};



function detectServer() {
  // Sends an external request to figure out the server software.
}


function share() {
  // Called when the user presses the share button
}



window.addEventListener(
  "load",
  function () {
    // Load info from local storage
    if (localStorageEnabled) {
      instanceDomain = localStorage.getItem("fsb-domain");
      instanceSoftware = localStorage.getItem("fsb-software");
    }

    // Load page data
    const params = new URLSearchParams(window.location.search);

    if (!params.has("url") || !params.has("title") || !params.has("desc")) {
      document.getElementsByClassName("error")[0].classList.remove("invisible");
      error(
        "Missing article data",
        "Your link is missing crucial article data, if you followed this link from elsewhere, then that link is broken. Head back to the original article and press again on the share button."
      );
      // return early, error case
      return;
    }

    articleUrl = params.get("url");
    articleTitle = params.get("title");
    articleDesc = params.get("desc");

    // Generate article text from all other params
    articleText = `"${articleTitle}" -- ${articleUrl}`;

    // Make every element visible
    let appChildren = document.getElementById("app").children;
    for (var i = 0; i < appChildren.length; i++) {
      appChildren[i].classList.remove("invisible");
    }
  }
);
