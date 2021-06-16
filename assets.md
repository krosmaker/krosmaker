# Cards

The card assets were extracted from the official Spanish translations PDF
published by Ankama available at
[BoardGameGeek](https://boardgamegeek.com/boardgame/256940/krosmaster-blast/files).

In order to extract the assets, perform the following steps:

- Extract the raw images from the PDF:

```bash
pdfimages source.pdf destination/
```

- Locate the required images. They should be stored as pairs of `PPM`
  files, one of which is the actual image with the other being its alpha layer.

- Scale the images to the same size. The alpha layer can be larger than
  the actual image. The alpha layer images should be safe to scale down
  to the image sizes without having to preserve their width and height
  proportions.

- Merge the scaled alpha layers with the extracted images:

```bash
convert image.ppm alpha.ppm -compose CopyOpacity -composite output.png
```

# Front images

## Krosmaster figurines

The figurine and minion images were collected from the archives of
the KrosFinder site. Currently these assets are available via
[KrosArchive](https://krosarchive.es/EN/seasons).

The figurine images available from KrosFinder are already scaled down
to almost perfect size given the current quality of the card assets.
If card assets of better quality and resolution were to be published,
larger figurine images can be found on the Ankama websites (shop, news
archive) and on other sites like BoardGameGeek.

## Minion artworks

Minion images without any background are very difficult to find.
They are often available only as high quality token scans at best.
A background remover is necessary to extract the minion artworks with
a transparent background.

In particular, [PhotoScissors](https://photoscissors.com/) tool was used,
as at the time it was a free online tool that allowed to easily correct
the results manually, and had a pretty accurate background removal algorithm
in the first place.

After the backgrounds were removed, Gimp was used to add a shadow outline
(2.5 X and Y blur size, 100% opacity) and a shadow image under the minion
(60% opacity).

# Artworks

## Krosmasters

The majority of the artworks were published by Ankama and can be found on
various websites such as
[Pinterest](https://id.pinterest.com/esther13456/krosmaster/).

While the same artworks are also available via KrosFinder archives, these
are usually scaled down and of lower quality than the source material.

## Minions

Minion background images were made (almost) from scratch in Gimp with
the following process:

1. Open the [background](assets/img/background-minion.png) image.
1. Add the minion image that will be traced as a separate layer.
1. Adjust the minion image scale. It can be safely scaled up, as it will
   not be a part of the final image. The reference should take up most
   of the canvas vertically, with around 10 to 15 pixels to the borders.
1. Add a new layer: _outline_.
1. Set the foreground color to `e5ccff`. (Alternatively, you can achieve
   this color by using white and applying the `Colors > Colorize` tool
   with hue set to **0.75**, saturation to **1**, and lightness to
   **-0.1**.)
1. Set the paintbrush tool size to **9** and brush to `Hardness 050`.
1. Using the selection tool, select the outlines of the minion image.
1. Use `Edit > Stroke selection` to paint over the section with the
   paintbrush tool.
1. Add any necessary details with the paintbrush tool. You can adjust
   the tool size as needed. Try to keep the image minimalistic.
1. Use `Filters > Blur > Gaussian blur` with size X and Y set to **3.5**.
1. Set layer opacity to **12.5**.
1. Make the minion image layer transparent.
1. Add at least 2 new layers: _stars_.
1. Paint a few white **1** pixel dots with the pencil tool on each layer.
   They will form the star constellation painted over the outline.
   Avoid placing dots over inner elements like eyes.
1. Use `Filters > Light and shadow > Sparkle` on each layer with slightly
   different settings. Use a random spike angle. Adjust the flare intensity,
   spike length and spike density to make sure that each of the stars
   appears different. You can use spike length of **16** for 1 layer,
   and **6** for the other. Undo and repeat the progress until finding
   a satisfactory combination of stars.
1. Merge the star layers.
1. Set the paintbrush tool to **25-50** opacity, `Hardness 025` brush, and
   around **25-40** size.
1. Place a dot over the middle of each star with the paintbrush tool.
   Adjust brush size and opacity appropriately to apply glow for each star
   according to its size.
1. Set the stars layer opacity to **80**.
1. Add a new layer: _constellation_.
1. Set the foreground color to `b9b8ff`. (Alternatively, you can achieve
   this color by using white and applying the `Colors > Colorize` tool
   with hue set to **0.67**, saturation to **1**, and lightness to
   **-0.14**.)
1. Set the dynamics of the paintbrush to `Pen generic`, its size to **7**,
   the opacity back to **100**, and brush to `Harness 075`.
1. Place a dot on one of the stars with the paintbrush tool. Shift-click on
   the nearest star to connect the stars with a line. You can also break the
   lines on the outline of the image even if there is no star places, but
   avoid more than one angle between two starts. Repeat until all stars all
   connected.
1. Set the constellation layer opacity to **20**.
1. Use the eraser tool to dampen some of the constellation lines, especially
   those outside of the figurine outline.

The final result should consist of:

- The background layer with the default minion artwork background image.
- A transparent layer with the original minion image used for tracing
  (not rendered).
- A blurred outline layer representing the minion.
- A layer with stars placed over the outline.
- A constellation layer with joins the stars with subtle lines drawn roughly
  over the outline.

The results are 100% in the same style as the originals, but they can be
reasonably close.

# PDF export

The following steps allow to create a printable PDF similar to the official
resources:

1. Export the cards as PNG images into a single folder. Keep in mind that
   the alphabetical order of the file names will reflect the order of the PDF
   pages.
1. On some platforms the exported images might not be trimmed. Make sure
   that there is no transparent space around the cards. The image size should
   be equal to 521 × 373 pixels for Krosmaster cards and 402 × 258 pixels
   for minion cards.
1. Make sure to keep the `back` and `front` words in the file names.
   If you are exporting minion cards, add `minion` to the file name.
   This necessary for following scripts in order to correctly sort and extend
   backgrounds of the images.
1. Run the [`background-adder.js`](extras/background-adder.js) script with
   `node extras/background-adder.js path/to/folder` in the root folder of the
   project. Note that it requires the file names to contain keywords such as
   `minion`, `back`, `front` in order to match the image with the correct
   background. This will enlarge the images for printing and export them
   to a nested `resized/` folder.
1. Run the following ImageMagick command to export a PDF:

```bash
# Krosmasters or other 63x88mm cards:
convert extras/bounds-63x88.png path/to/folder/resized/*.png -units pixelsperinch -density 128 path/to/output.pdf

# Minions or other 44x68mm cards:
convert extras/bounds-44x68.png path/to/folder/resized/*.png -units pixelsperinch -density 128 path/to/output.pdf
```

By default, PDF writing permissions might be turned off. In order to change
that, add the following line in the `<policymap>` section of the ImageMagick
configuration (usually located at `/etc/ImageMagick-7/policy.xml` on Linux):

```xml
<policy domain="coder" rights="read | write" pattern="PDF" />
```
