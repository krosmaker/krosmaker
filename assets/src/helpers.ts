import platform from "platform";

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

export function isWindows() {
  return (platform?.os?.family || "").toLowerCase().indexOf("windows") !== -1;
}
