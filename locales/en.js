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
    close: "Close",
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
    round: "Round",

    downloadWarning1: `
      Card downloading is currently not supported on every major browser.
      It works best on Firefox and Chrome,
      but if you experience any discrepancies between the website and the exported image,
      cropping screenshots manually is your best bet.
    `,
    // Firefox Screnshots (...)
    downloadWarning2: `
      will allow you to select the card area and download the cropped image
      with just a few clicks. Some browsers might offer similar features via extensions.
    `,
    downloadWarning3:
      "Keep in mind that the border radius for the rounded cards is 18 pixels.",
    downloadWarningAccept: "I understand",
    downloadWarningIgnore: "OK, don't show this again",

    edit: {
      // Artwork:
      artwork: "Artwork",
      customize: "Customize",
      enableCropping: "Enable cropping",
      imageUploadPrompt: "Click here or drag an image to upload.",

      // Basic data:
      krosmaster: "Krosmaster",
      name: "Name",
      rarity: "Rarity",
      elite: "Elite",
      common: "Common",
      minion: "Minion",
      comment: "Comment",
      ap: "AP",
      hp: "HP",
      mp: "MP",

      // Export:
      storage: "Storage",
      customFileName: "Custom file name",
      overridePrompt1: "Krosmaster with file name",
      overridePrompt2: "already exists. Do you want to override the card?",
      noDataHeader: "Nothing to load",
      noDataPrompt:
        "You have not saved any Krosmasters yet or your browser cache has been removed.",
      loadKrosmaster: "Load Krosmaster",
      loadingPrompt:
        "Choose a Krosmaster to load. This will override the current card settings.",
      krosmasters: "Krosmasters",
      deletePrompt: "Do you really want to delete",
      saveFirst: "Save first",
      importOverridePrompt:
        "The current card data has unsaved changes which will be lost if another card is imported. Do you want to override the card?",
      loadOverridePrompt:
        "The current card data has unsaved changes which will be lost if another card is loaded. Do you want to override the card?",
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

      // Powers, spells:
      powers: "Powers",
      spells: "Spells",
      ability: {
        name: "Name",
        description: "Description",
        editHint:
          "Keywords converted to icons: AP, MP, HP, Injury, Injuries, Air, Earth, Fire and Water. Surround text with * to bold.",
        deletionHeader: "Confirm deletion",
        deletionPrompt1: "Do you really want to delete",
        deletionPrompt2: "Entered data will be lost.",
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
