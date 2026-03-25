(function () {
  const config = window.__ARKFULLY_CLEAN_URL__;

  if (!config || typeof config.canonicalPath !== "string") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.has("raw")) {
    return;
  }

  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  if (!pathname.endsWith(".html")) {
    return;
  }

  const nextParams = new URLSearchParams(params);
  nextParams.delete("raw");

  const query = nextParams.toString();
  const hash = window.location.hash || "";
  const target = config.canonicalPath || "/";
  const url = new URL(target, window.location.href);
  url.search = query ? `?${query}` : "";
  url.hash = hash;

  window.location.replace(url.toString());
})();
