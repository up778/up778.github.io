$(document).ready(function () {
  document.querySelectorAll(".ezoom_button").forEach((button) => {
    button.addEventListener("click", function () {
      const container = button.closest("div");
      const image = container.parentElement.querySelector(".ezoom");

      if (image) {
        const zoomistContainer = document.createElement("div");

        zoomistContainer.classList.add("zoomist_desactived");
        zoomistContainer.classList.add("zoomist-container");
        zoomistContainer.style.position = "fixed";
        zoomistContainer.style.top = "0";
        zoomistContainer.style.left = "0";
        zoomistContainer.style.width = "100vw";
        zoomistContainer.style.height = "100vh";
        zoomistContainer.style.zIndex = "9999";
        zoomistContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        zoomistContainer.style.display = "flex";
        zoomistContainer.style.alignItems = "center";
        zoomistContainer.style.justifyContent = "center";
        zoomistContainer.style.overflow = "hidden";

        const zoomistWrapper = document.createElement("div");
        zoomistWrapper.style.backgroundColor = "#0000ff22";
        zoomistWrapper.classList.add("zoomist_desactived");
        zoomistWrapper.classList.add("zoomist-wrapper");
        zoomistWrapper.style.position = "absolute";
        zoomistWrapper.style.width = "5000px";
        zoomistWrapper.style.height = "5000px";
        zoomistWrapper.style.overflow = "hidden";
        zoomistWrapper.style.display = "flex";
        zoomistWrapper.style.alignItems = "center";
        zoomistWrapper.style.justifyContent = "center";

        const zoomistImage = document.createElement("img");
        zoomistImage.classList.add("zoomist_desactived");
        zoomistImage.classList.add("zoomist-image");
        zoomistImage.src = image.src;
        zoomistImage.style.transition = "transform 0.05s ease-in-out";
        zoomistImage.style.objectFit = "contain";
        zoomistImage.style.width = "90vw";
        zoomistImage.style.height = "auto";
        zoomistImage.style.transform = "scale(1)";
        zoomistImage.style.cursor = "grab";
        zoomistImage.draggable = false;

        zoomistWrapper.appendChild(zoomistImage);
        zoomistContainer.appendChild(zoomistWrapper);
        document.body.appendChild(zoomistContainer);

        let isDragging = false;
        let startX = 0,
          startY = 0;
        let currentX = 0,
          currentY = 0;

        const applyTransform = () => {
          zoomistImage.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${zoomSlider.value})`;
        };

        const startDrag = (e) => {
          e.preventDefault();
          isDragging = true;
          startX = e.clientX - currentX;
          startY = e.clientY - currentY;
          zoomistImage.style.cursor = "grabbing";

          document.addEventListener("pointermove", moveDrag, {
            passive: false,
          });
          document.addEventListener("pointerup", stopDrag);
        };

        const moveDrag = (e) => {
          if (!isDragging) return;
          e.preventDefault();
          currentX = e.clientX - startX;
          currentY = e.clientY - startY;
          applyTransform();
        };

        const stopDrag = () => {
          if (isDragging) {
            isDragging = false;
            zoomistImage.style.cursor = "grab";

            document.removeEventListener("pointermove", moveDrag);
            document.removeEventListener("pointerup", stopDrag);
          }
        };

        zoomistImage.addEventListener("pointerdown", startDrag);

        const zoomSlider = document.createElement("input");
        zoomSlider.type = "range";
        zoomSlider.min = 0.1;
        zoomSlider.max = 20;
        zoomSlider.step = 0.1;
        zoomSlider.value = 1;
        zoomSlider.style.marginLeft = "100px";
        zoomSlider.style.marginRight = "100px";
        zoomSlider.style.position = "absolute";
        zoomSlider.style.bottom = "40px";
        zoomSlider.style.left = "50%";
        zoomSlider.style.transform = "translateX(-50%)";
        zoomSlider.style.width = "200px";
        zoomSlider.style.zIndex = "10001";

        zoomSlider.addEventListener("input", function () {
          zoomistImage.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${zoomSlider.value})`;
        });

        zoomistContainer.appendChild(zoomSlider);

        const addButton = (text, top, left, callback) => {
          const button = document.createElement("button");
          button.textContent = text;
          button.style.position = "absolute";
          button.style.top = top;
          button.style.left = left;
          button.style.zIndex = "10001";
          button.style.padding = "10px";
          button.style.backgroundColor = "rgba(0,0,0,0.7)";
          button.style.color = "white";
          button.style.border = "none";
          button.style.borderRadius = "5px";
          button.style.border = "1px dotted gray";
          button.addEventListener("click", callback);
          zoomistContainer.appendChild(button);
        };

        addButton("+", "20px", "20px", () => {
          let scale = parseFloat(zoomSlider.value);
          scale = Math.min(scale + 0.1, 10);
          zoomSlider.value = scale;
          zoomSlider.dispatchEvent(new Event("input"));
        });

        addButton("-", "20px", "70px", () => {
          let scale = Math.max(parseFloat(zoomSlider.value) - 0.1, 0.1);
          zoomSlider.value = scale;
          zoomSlider.dispatchEvent(new Event("input"));
        });

        addButton("Reset", "20px", "120px", () => {
          currentX = 0;
          currentY = 0;
          zoomSlider.value = 1;
          zoomistImage.style.transform = `translate3d(0px, 0px, 0) scale(1)`;
        });
        addButton("Reset", "calc(100% -  70px)", "calc(50% -  290px)", () => {
          currentX = 0;
          currentY = 0;
          zoomSlider.value = 1;
          zoomistImage.style.transform = `translate3d(0px, 0px, 0) scale(1)`;
        });

        const zoomOutButtonBottomLeft = document.createElement("button");
        zoomOutButtonBottomLeft.textContent = "-";
        zoomOutButtonBottomLeft.style.position = "absolute";
        zoomOutButtonBottomLeft.style.bottom = "20px";
        zoomOutButtonBottomLeft.style.left = "calc(50% - 90px)";
        zoomOutButtonBottomLeft.style.padding = "10px";
        zoomOutButtonBottomLeft.style.backgroundColor = "rgba(0,0,0,0.7)";
        zoomOutButtonBottomLeft.style.color = "white";
        zoomOutButtonBottomLeft.style.border = "none";
        zoomOutButtonBottomLeft.style.borderRadius = "5px";
        zoomOutButtonBottomLeft.style.zIndex = "10002";
        zoomOutButtonBottomLeft.style.border = "1px dotted gray";
        zoomOutButtonBottomLeft.addEventListener("click", () => {
          let scale = parseFloat(zoomSlider.value);
          scale = Math.max(scale - 0.1, 0.1);
          zoomSlider.value = scale;
          zoomSlider.dispatchEvent(new Event("input"));
        });
        zoomistContainer.appendChild(zoomOutButtonBottomLeft);

        const zoomInButtonBottomRight = document.createElement("button");
        zoomInButtonBottomRight.textContent = "+";
        zoomInButtonBottomRight.style.position = "absolute";
        zoomInButtonBottomRight.style.bottom = "20px";
        zoomInButtonBottomRight.style.right = "calc(50% -  280px)";
        zoomInButtonBottomRight.style.padding = "10px";
        zoomInButtonBottomRight.style.backgroundColor = "rgba(0,0,0,0.7)";
        zoomInButtonBottomRight.style.zIndex = "10002";
        zoomInButtonBottomRight.style.color = "white";
        zoomInButtonBottomRight.style.border = "none";
        zoomInButtonBottomRight.style.borderRadius = "5px";
        zoomInButtonBottomRight.style.border = "1px dotted gray";
        zoomInButtonBottomRight.addEventListener("click", () => {
          let scale = parseFloat(zoomSlider.value);
          scale = Math.min(scale + 0.1, 10);
          zoomSlider.value = scale;
          zoomSlider.dispatchEvent(new Event("input"));
        });
        zoomistContainer.appendChild(zoomInButtonBottomRight);

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.style.position = "absolute";
        closeButton.style.top = "20px";
        closeButton.style.right = "20px";
        closeButton.style.zIndex = "10001";
        closeButton.style.padding = "10px";
        closeButton.style.backgroundColor = "rgba(100, 0, 0, 0.2)";
        closeButton.style.color = "white";
        closeButton.style.border = "none";
        closeButton.style.borderRadius = "5px";
        closeButton.style.border = "1px dotted gray";
        closeButton.addEventListener("click", function () {
          zoomistContainer.remove();
        });

        zoomistContainer.appendChild(closeButton);

        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") {
            zoomistContainer.remove();
          }
        });

        zoomistContainer.addEventListener("wheel", function (e) {
          e.preventDefault();
          let scale = parseFloat(zoomSlider.value);
          scale += e.deltaY < 0 ? 0.1 : -0.1;
          scale = Math.min(Math.max(scale, 0.1), 10);
          zoomSlider.value = scale;
          zoomSlider.dispatchEvent(new Event("input"));
        });
      }
    });
  });
});
