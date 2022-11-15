export default {
  disclaimer: `
    The graphics are copyrighted by Ankama and published with their permission.
    This website is not produced by or affiliated with Ankama.
  `,

  common: {
    ok: "OK",
    cancel: "Cancel",
    save: "Save",
    load: "Load",
    export: "Export",
    import: "Import",
    delete: "Delete",
    warning: "Warning",
    search: "Search",
    download: "Download",
    override: "Override",
    discard: "Discard",
    close: "Close",
    reset: "Reset",
    up: "Up",
    down: "Down",
    of: "of",
    emptyTablePrompt: "No results found",
  },
  card: {
    ap: "AP",
    hp: "HP",
    mp: "MP",

    flip: "Flip",
    adjust: "Adjust",

    downloadWarning1: `
      Card downloading is currently not supported on every major browser.
      It works best on Firefox and Chrome,
      but if you experience any discrepancies between the website and the exported image,
      cropping screenshots manually is your best bet.
    `,
    // Firefox Screenshots (...)
    downloadWarning2: `
      will allow you to select the card area and download the cropped image
      with just a few clicks. Some browsers might offer similar features via extensions.
    `,
    downloadWarning3:
      "Keep in mind that the border radius for the rounded cards is 18 pixels.",
    downloadWarningAccept: "I understand",
    downloadWarningIgnore: "OK, don't show this again",

    edit: {
      editorUnavailable:
        "This editor is not available for the chosen type of card.",

      // Artwork:
      artwork: "Artwork",
      customize: "Customize",
      enableCropping: "Enable cropping",
      imageUploadPrompt: "Click here or drag an image to upload.",

      // Basic data:
      card: "Card",
      name: "Name",
      type: "Type",

      fighter: "Fighter",
      rarity: "Rarity",
      twoSided: "Two-sided",
      suffix: "Suffix",
      elite: "Elite",
      common: "Common",
      minion: "Minion",
      ap: "AP",
      hp: "HP",
      mp: "MP",

      favor: "Favor",
      effect: "Effect",
      regular: "Regular",
      superior: "Superior",
      custom: "Custom",

      challenge: "Challenge",
      active: "Active",
      passive: "Passive",

      version: "Version",
      comment: "Comment",

      // Display:
      display: "Display",
      play: "Play",
      print: "Print",
      scale: "Scale",
      roundedCorners: "Round corners",
      targetCardSize: "Target card size",
      width: "Width",
      height: "Height",
      offset: "Offset",
      invalidSizeWarning:
        "The abilities are outside or very near the end of the safe printing area.",

      // Export:
      storage: "Storage",
      customFileName: "Custom file name",
      overridePrompt1: "Card with the file name",
      overridePrompt2: "already exists. Do you want to override the card?",
      noDataHeader: "Nothing to load",
      noDataPrompt:
        "You have not saved any cards yet or your browser cache has been removed.",
      loadCard: "Load card",
      loadingPrompt:
        "Choose a card to load. This will override the current card settings.",
      cards: "Cards",
      deletePrompt: "Do you really want to delete {item}?",
      saveFirst: "Save first",
      importOverridePrompt:
        "The current card data has unsaved changes which will be lost if another card is imported. Do you want to discard the changes?",
      loadOverridePrompt:
        "The current card data has unsaved changes which will be lost if another card is loaded. Do you want to discard the changes?",
      resetOverridePrompt:
        "The current card data has unsaved changes which will be lost. Do you want to discard the changes?",
      importErrorHeader: "Unable to import",
      invalidFileError: `
        The selected file has invalid data.
        The file is either corrupted or was modified manually.
        If you want to attempt to fix the file, please try to go through the validation errors.
      `,
      fileFormatError:
        "The selected file has invalid format. Please try another.",
      validationErrorMessages: "Validation error messages",

      // Figurine:
      figurine: "Figurine",
      useSameImage: "Use the same image",

      // Powers, spells:
      powers: "Powers",
      spells: "Spells",
      ability: {
        name: "Name",
        description: "Description",
        editHint:
          "Keywords converted to icons: AP, MP, HP, Injury, Injuries, Air, Earth, Fire and Water. Surround text with * to bold.",
        deletionHeader: "Confirm deletion",
        deletionPrompt:
          "Do you really want to delete {item}? Entered data will be lost.",
        newPowerName: "New power",
        newPowerDescription: "Describe the power here.",
        newSpellName: "New spell",
        newSpellDescription: "Describe the spell here.",
        range: "Range",
        damage: "Damage",
        limit: "Limit",
        element: {
          none: "None",
          air: "Air",
          earth: "Earth",
          fire: "Fire",
          water: "Water",
        },
        regular: "Regular",
        special: "Special",
        none: "None",
        perTurn: "Per turn",
        perTarget: "Per target",
      },

      // Notifications:
      notification: {
        export: "{name} was exported.",
        import: "Card configuration was imported.",
        delete: "{name} was deleted.",
        artworkUpload: "Artwork image was uploaded.",
        figurineUpload: "Figurine image was uploaded.",
        load: "{name} was loaded.",
        save: "{name} was saved.",
      },
    },
  },
};
