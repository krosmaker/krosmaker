# Assets

## Cards

The card assets were extracted from the official Spanish translations PDF
published by Ankama available at
[BoardGameGeek](https://boardgamegeek.com/boardgame/256940/krosmaster-blast/files).

To extract the graphics, perform the following steps:

- Extract the raw images from the PDF:

```bash
pdfimages source.pdf destination/
```

- Locate the required images. They should be stored as pairs of `.ppm`
  files, one of which is the actual image, and the other being its alpha
  layer (e.g., `-001.ppm`, `-002.ppm`).

- Make sure that the images have the same size. The alpha layer can be
  larger than the corresponding image. The black and white images with the
  alpha layers should be safe to scale down to the corresponding image sizes
  without having to preserve their aspect ratios.

- Merge the scaled alpha layers with the extracted images:

```bash
convert image.ppm alpha.ppm -compose CopyOpacity -composite output.png
```

Replace the file names accordingly.

- Since the original assets were compressed and scaled down to 150 DPI,
  they have to be upscaled to twice their size to meet the 300 DPI
  requirement, as well as denoised to remove the compression artifacts.
  Both are can be done with AI-based super-resolution tools.

## Front images

### Krosmaster figurines

The figurine and minion images can be collected from the archives of
the KrosFinder site. Currently these assets are available within the
[KrosArchive](https://krosarchive.es/EN/seasons) or possibly via the
[Internet Archive](https://web.archive.org/web/*/krosfinder.com).

The figurine images available from KrosFinder need to be upscaled to
roughly twice the size to match the current quality of the card assets.
Some larger figurine images can be found on the Ankama websites (shop,
news archive), or on other sites like the BoardGameGeek.

### Minion illustrations

Summon images without any background are very difficult to find.
They are often available only as decent quality token scans at best.
A background remover, as well as upscaling and denoising is necessary
to extract the minion artworks with a transparent background in usable
quality.

In particular, [PhotoScissors](https://photoscissors.com/) online tool
can be used for automatic background removal, as at the time of writing
this guide it is free and fairly accurate, with the option to correct
the results manually.

After the backgrounds are removed, Gimp can be used to add a black shadow
outline (5 px blur size, 120% opacity), and an oval shadow image under
the minion (60% opacity).

## Artworks

### Krosmaster artworks

While these are not the same images as those used for the Krosmaster Arena
cards, the majority of the Krosmaster artworks from the first 3 seasons
were published by Ankama and can be found on various websites such as
[Pinterest](https://id.pinterest.com/esther13456/krosmaster/). It seems
that the author of most of these graphics is
[Nicola Saviori](https://nicolasaviori.artstation.com/). For newer seasons,
high quality card scans are usually the best bet.

While the same artworks are also available via the KrosFinder archives,
these are usually scaled down and of lower quality than the source
material.

#### Outpainting

Outside of a few published wallpapers, the vast majority of the available
artworks are in the portrait orientation. However, **Krosmaster: Blast**
cards are printed in the landscape orientation, which not only causes the
original Arena artworks to be cropped, but also poses a problem in terms
of the necessary image resolution.

One way to solve this would be to rotate the image, but then the printed
card does not fit the game's convention and looks out of place when
compared to the official cards. On the other hand, cropping out the middle
part of each illustration can still cause artifacts due to the necessary
scaling up, and most of all it removes roughly half of each image.

Fortunately, AI-based tools are getting pretty decent at the so-called
_outpainting_, which allows generating consistent content outside of the
original graphic bounds. These include models such as
[DALL·E](https://openai.com/dall-e-2/) or the open-sourced
[Stable Diffusion](https://huggingface.co/CompVis/stable-diffusion).

When attempting to _outpaint_ the image at 300 DPI, make sure to scale it
down so that its height is equal to **675 px**, and then use the tool to
extend the image horizontally to **950 px**. When the image is exactly **950✕675 px**, cropping within the Krosmaker application is no longer
necessary.

### Minion artworks

Minion background images can be made (almost) from scratch in Gimp by
following these steps:

1. Open the [background](../assets/img/back/background-minion.png) image.
1. Add the minion image as a separate _reference_ layer.
1. Adjust the minion image size. It can be safely scaled up, as it will
   not be a part of the final image. The reference should take up most
   of the canvas vertically, with around 20 to 30 pixels to the borders.
1. Add a new layer: _outline_.
1. Set the foreground color to `e5ccff`. (Alternatively, you can achieve
   this color by using white and applying the `Colors > Colorize` tool
   with hue set to **0.75**, saturation to **1**, and lightness to
   **-0.1**.)
1. Set the paintbrush tool's brush to `Hardness 050` and size to **18**.
1. Using the selection tool, select the outlines of the minion image.
1. Use `Edit > Stroke selection` to paint over the section with the
   paintbrush tool.
1. Add any necessary details with the paintbrush and gradient tools.
   You can adjust the size as needed. Try to keep the image minimalistic.
1. Use `Filters > Blur > Gaussian blur` with size X and Y set to **7**.
1. Set layer opacity to **12.5**.
1. Make the minion image layer transparent.
1. Add at least 2 new layers: _stars_.
1. Paint a few white **1** pixel dots with the pencil tool on each layer.
   They will form the star constellation painted over the outline.
   Avoid placing dots over inner elements like eyes.
1. Use `Filters > Light and shadow > Sparkle` on each layer with slightly
   different settings. Use a random spike angle. Adjust the flare intensity,
   spike length and spike density to make sure that each of the stars
   appears different. You can use spike length of **24** for 1 layer,
   and **7** for the other. Undo and repeat the progress with different
   settings until finding a satisfactory combination of stars.
1. Optionally use `Filters > Blur > Gaussian blur` with around **0.5-1**
   size to smoothen the stars if necessary.
1. Merge the star layers.
1. Set the paintbrush tool to the `Hardness 025` brush, **25-50** opacity,
   and around **30-50** pixel size.
1. Place a dot over the middle of each star with the paintbrush tool.
   Adjust brush size and opacity appropriately to apply glow for each star
   according to its size.
1. Set the stars layer opacity to **80**.
1. Add a new layer: _constellation_.
1. Set the foreground color to `b9b8ff`. (Alternatively, you can achieve
   this color by using white and applying the `Colors > Colorize` tool
   with hue set to **0.67**, saturation to **1**, and lightness to
   **-0.14**.)
1. Set the dynamics of the paintbrush to `Pen generic`, its brush to
   `Harness 075`, its size to **10**, and the opacity back to **100**.
1. Place a dot on one of the stars with the paintbrush tool. Shift-click on
   the nearest star to connect the stars with a line. You can also break
   the lines on the outline of the image even if there are no stars placed,
   but avoid more than one angle between two stars. Repeat until all stars
   all connected.
1. Select the `Eraser` tool. Increase the size to **20** and set opacity to
   around **20-40**.
1. Soften the lines that are outside the outline and other illustration
   details from the _outline_ layer.
1. Set the constellation layer opacity to **20**.

The final result should consist of:

- The _background_ layer with the default minion artwork background image.
- A transparent _reference_ layer with the original minion image used for
  tracing (not rendered).
- A blurred _outline_ layer representing the minion.
- A layer with _stars_ placed over the outline.
- A _constellation_ layer joining the stars with subtle lines drawn
  roughly over the outline.

The results may not be in exactly the same style as the originals,
but they can get reasonably close with some effort.
