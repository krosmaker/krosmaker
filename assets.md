# Cards

The card assets were extracted from the official Spanish translations PDF
published by Ankama available at [BoardGameGeek](https://boardgamegeek.com/boardgame/256940/krosmaster-blast/files).

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

The figurine and minion images were collected from the archives of KrosFinder.
Currently these assets are available via [KrosArchive](https://krosarchive.es/EN/seasons).

The figurine images available from KrosFinder are already scaled down
to almost perfect size given the current quality of the card assets.
If card assets of better quality and resolution were to be published,
larger figurine images can be found on the Ankama websites (shop, news
archive) and on other sites like BoardGameGeek.

## Minion artworks

Minion images without any background are very difficult to find.
They are oftem available only as high quality token scans at best.
A background remover is necessary to extract the minion artworks with
a transparent background.

In particular, [PhotoScissors](https://photoscissors.com/) tool was used,
as at the time it was a free online tool that allowed to easily correct
the results manually, and had a pretty accurate background removal algorithm
in the first place.

# Artworks

## Krosmasters

The majority of the artworks were published by Ankama and can be found on
various websites such as [Pinterest](https://id.pinterest.com/esther13456/krosmaster/).

While the same artworks are also available via KrosFinder archives, these
are usually scaled down and of lower quality than the source material.

## Minions

Minion background images were made (almost) from scratch in Gimp with
the following process:

1. Open the [background](assets/img/background-minion.png) image.
1. Add the minion image that will be traced as a separate layer.
1. Adjust the minion image scale. It can be safely scaled up, as it will
   not be a part of the final image.
1. Add a new layer.
1. Set the paintbrush tool size to **9**.
1. Using the selection tool, select the outlines of the minion image.
1. Use `Edit > Stroke selection` to paint over the slection with the
   paintbrush tool.
1. Add any necessary details with the paintbrush tool.
1. Use `Filters > Blur > Gaussian blur` with default settings twice.
1. Set layer opacity to around **0.3.**.
1. Make the minion image layer transparent.
1. Add 2 new layers.
1. Paint a few white **1** pixel dots with the pencil tool on each layer.
   They will form the star constelation painted over the outline.
   Avoid placing dots over inner elements like eyes.
1. Use `Filters > Light and shadow > Sparkle` on each layer. Use a random
   spike angle. Adjust the flare intensity, spike length and spike density
   to make sure that each of the stars appears different.
1. Set the star layers opacities to around **0.8**.
1. Add a new layer.
1. Set the dynamics of the paintbrush to `Pen generic` and its size to **2**.
1. Place a dot on one of the stars with the paintbrush tool. Shift-click on
   the nearest star to connect the stars with a line. Place the line twice if it
   appears too faint. Repeat until all stars all connected.
1. Set the lines layer opacity to around **0.8**.

The final result should consist of:

- The background layer with the default minion artwork background image.
- A transparent layer with the original minion image used for tracing
  (not rendered).
- A blured outline layer representing the minion.
- Two layers with stars placed over the outline. Can be safely merged into one.
- A constelation layer with joins the stars with subtle lines drawn roughly
  over the outline.

The results are not exactly the same style, but they are reasonably close.
