import PhotoSearch from "./unsplash";
import { useGesture } from "@use-gesture/react";
class SimpleImage {
  constructor({ data, api, block }) {
    // this.data = data;

    this.data = {
      url: data.url || "",
      // caption: data.caption || "",
      withBorder: data.withBorder !== undefined ? data.withBorder : false,
      withBackground:
        data.withBackground !== undefined ? data.withBackground : false,
      stretched: data.stretched !== undefined ? data.stretched : false,
    };

    this.wrapper = undefined;
    this.addImg = undefined;
    this.box = undefined;
    this.embedImg = undefined;
    this.settings = [
      {
        name: "withBorder",
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`,
      },
      {
        name: "stretched",
        icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`,
      },
      {
        name: "withBackground",
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>`,
      },
    ];

    this.api = api;

    this.isResizing = false;
    this.image = undefined;
    this.leftIcon = undefined;
    this.rightIcon = undefined;

    this.startX = 0;
    this.startY = 0;
    this.startWidth = 0;
    this.startHeight = 0;
    this.aspectRatio = 0;
    this.originalWidth = 0;
    this.blockAPI = block;
  }

  static get toolbox() {
    return {
      title: "Image",
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    };
  }

  render() {
    const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

    this.addImg = document.createElement("div");
    this.addImg.classList.add("img-box");

    const showcaseSearch = document.createElement("div");
    showcaseSearch.classList.add("showcase-search");
    const showcaseInput = document.createElement("input");
    const query = "cars";
    // const query = showcaseInput.value;

    showcaseInput.placeholder = "Search for an image...";
    showcaseInput.classList.add("showcase-input");
    showcaseSearch.appendChild(showcaseInput);
    const showcaseBtn = document.createElement("button");
    showcaseSearch.appendChild(showcaseBtn);
    showcaseBtn.classList.add("showcase-btn");
    showcaseBtn.innerHTML = "search";

    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("simple-image");

    this.embedImg = document.createElement("div");
    this.embedImg.classList.add("embed-img");

    this.box = document.createElement("div");
    this.box.classList.add("showcase-box");
    this.box.appendChild(showcaseSearch);
    this.box.appendChild(this.wrapper);

    if (this.data && this.data.url) {
      this._createImage(this.data.url, this.data.caption);
      return this.embedImg;
    }

    const uploadIcons = document.createElement("div");
    uploadIcons.classList.add("upload-icons");

    const embedImgIcon = document.createElement("div");
    embedImgIcon.innerHTML = "Embed Link";
    embedImgIcon.classList.add("embedImg-icon");

    // const embedImg = document.createElement("div")
    // embedImg.appendChild(addImg)

    const embedLink = document.createElement("div");
    embedLink.classList.add("embed-link");
    const embedInput = document.createElement("input");
    embedInput.classList.add("embed-input");
    const embedLinkBtn = document.createElement("button");
    embedLinkBtn.classList.add("embedLink-btn");
    embedLinkBtn.innerHTML = "Embed Link";
    embedInput.placeholder = "pate the embed url";
    embedInput.value = this.data && this.data.url ? this.data.url : ""; // need to do this
    embedLink.appendChild(embedInput);

    embedInput.addEventListener("paste", (e) => {
      e.clipboardData.getData("text");
      // this._createImage(e.clipboardData.getData("text"));
    });

    embedLinkBtn.addEventListener("click", () => {
      if (container.contains(this.addImg)) {
        container.removeChild(this.addImg);
      }
      const imgUrl = embedInput.value;
      this._createImage(imgUrl);
      container.appendChild(this.embedImg);
    });

    embedImgIcon.addEventListener("click", (e) => {
      if (this.addImg.contains(this.box)) {
        this.addImg.removeChild(this.box);
      }

      embedLink.appendChild(embedInput);
      embedLink.appendChild(embedLinkBtn);
      this.addImg.appendChild(embedLink);
    });

    const unsplashImgIcon = document.createElement("div");
    unsplashImgIcon.innerHTML = "Unsplash";
    unsplashImgIcon.classList.add("unsplashImg-icon");

    uploadIcons.appendChild(embedImgIcon);
    uploadIcons.appendChild(unsplashImgIcon);

    let imagesFetched = false;
    let imgUrlsArr = [];
    unsplashImgIcon.addEventListener("click", () => {
      // if (!imagesFetched) {
      imagesFetched = true;
      if (this.addImg.contains(embedLink)) {
        this.addImg.removeChild(embedLink);
      }
      // if(imgUrlsArr.length < 10){

      fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          // imgShowcase.appendChild(data)
          const imgUrls = data.results.map((result) => result.urls.regular);
          imgUrlsArr = imgUrlsArr.concat(imgUrls);
          for (const imgUrl of imgUrls) {
            const imgShowcase = document.createElement("img");
            imgShowcase.setAttribute("src", imgUrl);
            this.wrapper.appendChild(imgShowcase);

            imgShowcase.classList.add("unsplash-img");
            this.addImg.appendChild(this.box);
          }
          console.log(data, "success bro");
        })
        .catch((error) => {
          console.error("Error fetching photos:", error);
        });
      // }
      // }
    });

    this.addImg.appendChild(uploadIcons);
    // this.addImg.appendChild(uploadBtn);

    const container = document.createElement("div");
    container.appendChild(this.addImg);
    // container.appendChild(this.wrapper);
    // container.appendChild(this.box);

    this.wrapper.addEventListener("click", (event) => {
      const clickedImg = event.target;
      if (clickedImg.classList.contains("unsplash-img")) {
        const imgUrl = clickedImg.getAttribute("src");
        this._unsplashCreateImg(imgUrl);
        container.removeChild(this.addImg);
        container.appendChild(this.embedImg);
      }
    });

    let resizableElements = {};

    this.embedImg.addEventListener("click", (event) => {
      const clickedImg = event.target;
      // console.log("event embed triggered bro");

      if (clickedImg.tagName === "IMG") {
        if (!resizableElements[clickedImg.id]) {
          const resizableDiv = document.createElement("div");
          resizableDiv.className = "resizable";
          const resizer = document.createElement("div");
          resizer.className = "resizer";

          const imgWidth = clickedImg.style.width;
          const imgHeight = clickedImg.style.height;

          clickedImg.style.height = "100%";
          clickedImg.style.width = "100%";

          resizableDiv.style.width = imgWidth;
          resizableDiv.style.height = imgHeight;

          resizableDiv.appendChild(clickedImg); // Clone the clicked image
          resizableDiv.appendChild(resizer);

          this.embedImg.appendChild(resizableDiv);

          initResizing(resizableDiv);
          resizableElements[clickedImg.id] = resizableDiv;
        }
      }
    });

    document.addEventListener("click", (event) => {
      const clickedElement = event.target;

      if (!clickedElement.closest(".resizable")) {
        for (const id in resizableElements) {
          const resizableDiv = resizableElements[id];
          const img = resizableDiv.querySelector("img");

          const width = resizableDiv.style.width;
          const height = resizableDiv.style.height;

          img.style.width = width;
          img.style.height = height;

          this.embedImg.appendChild(img);
          resizableDiv.remove();
          delete resizableElements[id];
        }
      }
    });

    function initResizing(resizableDiv) {
      let startX, startY, startWidth, startHeight;

      function initDrag(e) {
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(
          document.defaultView.getComputedStyle(resizableDiv).width,
          10
        );
        startHeight = parseInt(
          document.defaultView.getComputedStyle(resizableDiv).height,
          10
        );
        document.documentElement.addEventListener("mousemove", doDrag, false);
        document.documentElement.addEventListener("mouseup", stopDrag, false);
      }

      function doDrag(e) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const newWidth = startWidth + deltaX;
        const newHeight = startHeight + deltaY;

        resizableDiv.style.width = newWidth + "px";
        resizableDiv.style.height = newHeight + "px";
      }

      function stopDrag() {
        document.documentElement.removeEventListener(
          "mousemove",
          doDrag,
          false
        );
        document.documentElement.removeEventListener(
          "mouseup",
          stopDrag,
          false
        );
      }

      // Attach the drag initialization to the resizer element
      const resizer = resizableDiv.querySelector(".resizer");
      resizer.addEventListener("mousedown", initDrag, false);
    }

    return container;
  }

  _unsplashCreateImg(url, captionText) {
    const image = document.createElement("img");
    const caption = document.createElement("div");
    // caption.classList.add('caption')
    image.src = url;
    // caption.placeholder = "Caption..."
    // caption.contentEditable = true;
    // caption.value = captionText || "";

    // console.log(url, "this is unsplash create img url");
    this.embedImg.innerHTML = "";
    this.embedImg.appendChild(image);
    this.embedImg.appendChild(caption);
  }

  _createImage(url, captionText) {
    const image = document.createElement("img");
    // const caption = document.createElement("input");
    const caption = document.createElement("div");
    // caption.classList.add("caption")
    image.src = url;
    // caption.placeholder = "Caption...";
    // caption.contentEditable = true;
    // caption.value = captionText || "";

    this.embedImg.innerHTML = "";
    this.embedImg.appendChild(image);
    // this.embedImg.appendChild(caption);
  }

  save(blockContent) {
    // const input = blockContent.querySelector("input"); // it was needed when getting the input url after pressing save

    const image = blockContent.querySelector("img");
    // const caption = blockContent.querySelector("input");
    // const caption = blockContent.querySelector("[contenteditable]");

    // return {
    return Object.assign(this.data, {
      url: image.src,
      // caption: caption.value,
      // caption: caption.innerHTML || "",
      // };
    });
  }

  validate(savedData) {
    if (!savedData.url.trim()) {
      return false;
    }
    return true;
  }

  renderSettings() {
    const wrapper = document.createElement("div");

    this.settings.forEach((tune) => {
      let button = document.createElement("div");

      // button.classList.add('cdx-settings-button');
      // button.classList.toggle('cdx-settings-button--active', this.data[tune.name]);

      button.classList.add(this.api.styles.settingsButton);
      button.classList.toggle(
        this.api.styles.settingsButtonActive,
        this.data[tune.name]
      );

      button.innerHTML = tune.icon;
      wrapper.appendChild(button);

      button.addEventListener("click", () => {
        this._toggleTune(tune.name);
        // button.classList.toggle('cdx-settings-button--active');
        button.classList.toggle(this.api.styles.settingsButtonActive);
      });
    });

    return wrapper;
  }

  _toggleTune(tune) {
    this.data[tune] = !this.data[tune];
  }

}

export default SimpleImage;
