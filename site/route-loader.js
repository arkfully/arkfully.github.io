(async function () {
  const source = document.documentElement.dataset.source;
  const baseHref = document.documentElement.dataset.base || "../";

  if (!source) {
    return;
  }

  try {
    const response = await fetch(source, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${source}: ${response.status}`);
    }

    let html = await response.text();
    if (!/<base\s/i.test(html)) {
      html = html.replace(/<head([^>]*)>/i, `<head$1>\n  <base href="${baseHref}">`);
    }

    document.open();
    document.write(html);
    document.close();
  } catch (error) {
    console.error(error);

    document.body.innerHTML = [
      "<main style=\"font-family: SUIT, sans-serif; padding: 40px 20px;\">",
      "<h1 style=\"margin-bottom: 12px;\">Page could not be loaded.</h1>",
      `<p><a href="${source.replace("?raw=1", "")}">Open source page</a></p>`,
      "</main>",
    ].join("");
  }
})();
