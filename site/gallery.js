import PhotoSwipeLightbox from "https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe-lightbox.esm.min.js";

const galleries = document.querySelectorAll(".js-pswp-gallery");

galleries.forEach((gallery) => {
  if (!gallery.id) return;

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
});
