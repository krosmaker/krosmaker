// See assets.md for more details.

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const folder = process.argv[2];
if (!folder) {
  console.log("Missing path to images folder.");
  process.exit(1);
}

function getBackgroundForFile(file) {
  const prefix = file.includes("minion") ? "minion" : "krosmaster";
  if (file.includes("front")) {
    return path.join("extras", `${prefix}-front-background.png`);
  }
  if (file.includes("back")) {
    return path.join("extras", `${prefix}-back-background.png`);
  }
}

fs.readdir(folder, (error, files) => {
  if (error) {
    console.log(error);
    return;
  }
  fs.mkdirSync(path.join(folder, "resized"), { recursive: true });
  for (const file of files) {
    if (file.endsWith(".png")) {
      const background = getBackgroundForFile(file);
      if (!background) continue;
      const image = path.join(folder, file).replace(/([ \(\)])/g, "\\$1");
      const output = path
        .join(folder, "resized", file)
        .replace(/([ \(\)])/g, "\\$1")
        .replace("front", "1-front")
        .replace("back", "2-back");
      console.log("Exporting", output);
      execSync(
        `convert ${background} ${image} -gravity center -composite ${output}`
      );
    }
  }
});
