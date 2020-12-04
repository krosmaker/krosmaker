import { detect, BrowserInfo } from "detect-browser";

const browser: BrowserInfo | null = detect() as BrowserInfo | null;

export function preventNonNumericInput(
  event: KeyboardEvent,
  allowMinus: boolean = false
) {
  const key = event.key;
  if (allowMinus && key === "-") {
    return;
  } else if (key.length === 1 && isNaN(parseInt(key))) {
    event.preventDefault();
  }
}

export function preventNonNumericPaste(
  event: ClipboardEvent,
  allowMinus: boolean = false
) {
  const text = event.clipboardData?.getData("text") || "";
  if (!text.match(/^\d*$/) && (!allowMinus || text != "-")) {
    event.preventDefault();
  }
}

export function isWindows(): boolean {
  return (browser?.os || "").toLowerCase().indexOf("windows") !== -1;
}

export function isFirefox(): boolean {
  return browser != null && browser.name === "firefox";
}

export function isEdge(): boolean {
  return browser != null && browser.name.indexOf("edge") !== -1;
}
