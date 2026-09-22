function hidePlatformSupportVisibilityNote() {
  document.getElementsByClassName("status")[0].classList.add("invisible");
}



function checkPlatformSupport(shareBtn) {
  const supportNote = document.getElementsByClassName("status")[0];
  const domainInput = document.getElementById("instance");

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
};

async function doneTyping(elem) {
  const shareBtn = elem.parentElement.getElementsByClassName("fsb-button")[0];
  const domain = getDomain(el.value);

  const resp = await fetch(
    `https://fediverse-info.stefanbohacek.com/node-info?domain=${domain}&onlysoftware=true`
  );

  shareBtn.innerHTML = shareBtn.innerHTML.replace("Loading", "Share");

  const respJSON = await resp.json();
  const software = respJSON?.software?.name;

  el.dataset.software = software;
  window.fsbGlobalSoftware = software;

  checkPlatformSupport(shareBtn);

  if (software && knownSoftware.includes(software)) {
    updateTheIcon(software);

    if (supportedSoftware.includes(software)) {
      shareBtn.disabled = false;
    }
  } else {
    updateTheIcon("question");
  }
};

function getDomain(str) {
  return str.replace(/(^\w+:|^)\/\//, "");
}

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




// 


function truncate(input) {
  return (input.length > 5 ? `${input.substring(0, 450)}...` : input);
}

let typingTimer;
const doneTypingInterval = 1300;
async function updateIcon(domainInput) {
  clearTimeout(typingTimer);
  if (domainInput.value) {
    typingTimer = setTimeout(() => {
      doneTyping(domainInput);
    }, doneTypingInterval);
  } else {
    updateTheIcon("mastodon");
  }
};






(async () => {


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

        updateTheIcon(savedSoftware);

        if (supportedSoftware.includes(savedSoftware)) {
          shareBtn.disabled = false;
        }
      } else {
        updateIcon(domainInput);
      }
    }

    domainInput.addEventListener("input", () => {
      shareBtn.disabled = true;

      hidePlatformSupportVisibilityNote(shareBtn);
      updateTheIcon("question");

      if (domainInput.value) {
        shareBtn.innerHTML = shareBtn.innerHTML.replace("Share", "Loading");
      } else {
        updateTheIcon("question");
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


      }
    });
  });
})();

