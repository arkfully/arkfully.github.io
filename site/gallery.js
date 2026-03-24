import PhotoSwipeLightbox from "https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe-lightbox.esm.min.js";

const galleries = document.querySelectorAll(".js-pswp-gallery");

const whenImageReady = (image) => {
  if (!image) return Promise.resolve();
  if (image.complete && image.naturalWidth) return Promise.resolve();

  return new Promise((resolve) => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", resolve, { once: true });
  });
};

const syncItemSize = (item) => {
  const image = item.querySelector("img");

  if (!image || !image.naturalWidth || !image.naturalHeight) {
    return;
  }

  item.dataset.pswpWidth = String(image.naturalWidth);
  item.dataset.pswpHeight = String(image.naturalHeight);
};

const initGallery = async (gallery) => {
  if (!gallery.id) return;

  const items = [...gallery.querySelectorAll("a")];

  await Promise.all(items.map((item) => whenImageReady(item.querySelector("img"))));
  items.forEach(syncItemSize);

  const lightbox = new PhotoSwipeLightbox({
    gallery: `#${gallery.id}`,
    children: "a",
    pswpModule: () =>
      import("https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.esm.min.js"),
    showHideAnimationType: "zoom",
    bgOpacity: 0.92,
    wheelToZoom: true,
    spacing: 0.12,
  });

  lightbox.init();
};

galleries.forEach((gallery) => {
  initGallery(gallery);
});
