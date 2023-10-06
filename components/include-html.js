/**
 * Includes a snippet of html from a remote source.
 */
class IncludeHtml extends HTMLElement {
  static observedAttributes = ["src"];

  /**
   * Creates a shadow root and attaches it to the element.
   */
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * Updates the element when an attribute changes.
   */
  attributeChangedCallback() {
    this.refresh();
  }

  /**
   * Refreshes the element's content. Does not support remote script execution.
   */
  async refresh() {
    const sourceUrl = this.getAttribute("src");
    const response = await fetch(sourceUrl, { cache: "no-store" });
    const html = response.ok ? await response.text() : "";
    const enabled = this.getConfig(html)?.ENABLED?.toUpperCase() ?? "TRUE";
    if (enabled === "TRUE") {
      // Disable scripts by setting innerHTML directly (as opposed to appendChild)
      this.shadow.innerHTML = html; 
    }
  }

  /**
   * Returns an object containing configuration keys and values, defined as <!--KEY=VALUE--> in the html.
   * @param {string} html 
   * @returns {{object}} Config object
   */
  getConfig(html) {
    const matches = html.matchAll(/<!--(.*)=(.*)-->/g);
    const config = {};
    for (const [match, key, value] of matches) {
      config[key.trim()] = value.trim();
    }
    return config;
  }
}

customElements.define("include-html", IncludeHtml);
