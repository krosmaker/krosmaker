export default {
  disclaimer: `
    Les illustrations sont la propriété d'Ankama et sont publiées avec leur aimable autorisation.
    Ce site web n'a pas été mis en place par Ankama et n'en aucune manière lié à Ankama.
  `,

  common: {
    ok: "OK",
    cancel: "Annuler",
    save: "Enregistrer",
    load: "Charger",
    export: "Exporter",
    import: "Importer",
    delete: "Supprimer",
    warning: "Avertissement",
    search: "Rechercher",
    download: "Télécharger",
    override: "Ecraser",
    close: "Fermer",
    up: "Monter",
    down: "Descendre",
    of: "of",                             // -- SGe-GH :: Where does it appear? --
    emptyTablePrompt: "Aucun résultat",
  },
  card: {
    ap: "PA",
    hp: "PV",
    mp: "PM",

    flip: "Retourner",
    round: "Coins arrondis",

    downloadWarning1: `
      Le téléchargement de carte n'est actuellement pas pris en charge pour tous les navigateurs.
      Il fonctionne mieux sous Firefox et Chrome,
      mais si vous constatez des incohérences entre l'image du site et celle exportée,
      vous pouvez contourner le problème en réalisant une copie d'écran à recadrer selon les contours de la carte.
    `,
    // Firefox Screenshots (...)
    downloadWarning2: `
      vous permet de sélectionner les contours de la carte et de télécharger l'image correspondante
      en quelques clics. D'autres navigateurs peuvent proposer ce type de fonctionnalités au travers d'extensions.
    `,
    downloadWarning3:
      "Gardez à l'esprit que le rayon des angles arrondis est de 18 pixels.",
    downloadWarningAccept: "J'ai compris",
    downloadWarningIgnore: "OK, ne plus afficher ce message",

    edit: {
      // Artwork:
      artwork: "Illustration",
      customize: "Personnalisation",
      enableCropping: "Activer le recadrage",
      imageUploadPrompt: "Cliquez ici ou faites glisser une image à charger.",

      // Basic data:
      krosmaster: "Krosmaster",
      name: "Nom",
      rarity: "Rareté",
      elite: "Elite",
      common: "Commune",
      minion: "Invocation",
      comment: "Commentaire",
      ap: "PA",
      hp: "PV",
      mp: "PM",

      // Export:
      storage: "Stockage",
      customFileName: "Nom de fichier personnalisé",
      overridePrompt1: "Le fichier portant le nom du Krosmaster",
      overridePrompt2: "est déjà présent. Voulez-vous écraser la carte ?",
      noDataHeader: "Aucune donnée à charger",
      noDataPrompt:
        "Vous n'avez pas encore enregistré de Krosmaster ou le cache de votre navigateur a été supprimé.",
      loadKrosmaster: "Charger un Krosmaster",
      loadingPrompt:
        "Choisissez un Krosmaster à charger. Cela écrasera les paramètres de la carte en cours d'édition.",
      krosmasters: "Krosmasters",
      deletePrompt: "Etes-vous sûr de vouloir supprimer",   // -- SGe-GH :: In French, there is a mandatory space between the "?" punctuation mark and the word before it -- 
      saveFirst: "Enregistrer d'abord",
      importOverridePrompt:
        "Les données de la carte en cours d'édition comportent des modifications non enregistrées qui seront perdues si une autre carte est importée. Voulez-vous écraser la carte ?",
      loadOverridePrompt:
        "Les données de la carte en cours d'édition comportent des modifications non enregistrées qui seront perdues si une autre carte est importée. Voulez-vous écraser la carte ?",
      importErrorHeader: "Importation impossible",
      invalidFileError: `
        Les données du fichier sélectionné sont incorrectes.
        Le fichier a été corrompu ou édité manuellement.
        Si vous souhaitez tenter de réparer le fichier, essayez de parcourir les erreurs de validation.
      `,
      fileFormatError:
        "Le format du fichier sélectionné est incorrect. Essayez un autre fichier.",
      validationErrorMessages: "Liste des messages d'erreurs",

      // Figurine:
      figurine: "Figurine",

      // Powers, spells:
      powers: "Pouvoirs",
      spells: "Sorts",
      ability: {
        name: "Nom",
        description: "Description",
        editHint:
          "Mots-clés convertis en icones : PA, PM, PV, Blessure, Blessures, Air, Terre, Feu et Eau. Encadrer du texte avec * pour le mettre en gras.",
        deletionHeader: "Confirmation de suppression",
        deletionPrompt1: "Etes-vous sûr de vouloir supprimer",   // -- SGe-GH :: In French, there is a mandatory space between the "?" punctuation mark and the word before it -- 
        deletionPrompt2: "Les données saisies seront perdues.",
        newPowerName: "Nouveau pouvoir",
        newPowerDescription: "Décrire ici les effets du pouvoir.",
        newSpellName: "Nouveau sort",
        newSpellDescription: "Décrire ici les effets du sort.",
        range: "Portée",
        damage: "Dégâts",
        limit: "Limite",
        element: {
          none: "Aucun,
          air: "Air",
          earth: "Terre",
          fire: "Feu",
          water: "Eau",
        },
        regular: "Standard",
        special: "Spéciale",
        none: "Aucune",
        perTurn: "Par tour",
        perTarget: "Par cible",
      },

      // Notifications:
      notification: {
        export: "{name} a été exporté(e).",
        import: "Le paramétrage de la carte a été importé.",
        delete: "{name} a été supprimé(e).",
        artworkUpload: "L'illustration a été chargée.",
        figurineUpload: "L'image de la figurine a été chargée.",
        load: "{name} a été chargé(e).",
        save: "{name} a été enregistré(e).",
      },
    },
  },
};
