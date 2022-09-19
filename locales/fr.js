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
    override: "Écraser",
    discard: "Jeter",
    close: "Fermer",
    reset: "Réinitialiser",
    up: "Monter",
    down: "Descendre",
    of: "sur",
    emptyTablePrompt: "Aucun résultat",
  },
  card: {
    ap: "PA",
    hp: "PV",
    mp: "PM",

    flip: "Retourner",
    adjust: "Ajuster",

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
      editorUnavailable:
        "Cet éditeur n'est pas disponible pour le type de carte choisi.",

      // Artwork:
      artwork: "Illustration",
      customize: "Personnalisation",
      enableCropping: "Activer le recadrage",
      imageUploadPrompt: "Cliquez ici ou faites glisser une image à charger.",

      // Basic data:
      card: "Carte",
      name: "Nom",
      type: "Catégorie",

      fighter: "Combattant",
      rarity: "Rareté",
      elite: "Elite",
      common: "Commune",
      minion: "Invocation",
      ap: "PA",
      hp: "PV",
      mp: "PM",

      favor: "Faveur",
      effect: "Effet",
      regular: "Régulière",
      superior: "Supérieure",

      challenge: "Défi",
      active: "Actif",
      passive: "Passif",

      version: "Version",
      comment: "Commentaire",

      // Display:
      display: "Paramètres d'affichage",
      play: "Jouer",
      print: "Imprimer",
      scale: "Échelle",
      roundedCorners: "Coins arrondis",
      targetCardSize: "Taille cible de la carte",
      width: "Largeur",
      height: "Taille",
      offset: "Offset",
      invalidSizeWarning:
        "Les capacités sont à l'extérieur ou près de la fin de la zone d'impression sécurisée.",

      // Export:
      storage: "Stockage",
      customFileName: "Nom de fichier personnalisé",
      overridePrompt1: "Le fichier portant le nom",
      overridePrompt2: "est déjà présent. Voulez-vous écraser la carte ?",
      noDataHeader: "Aucune donnée à charger",
      noDataPrompt:
        "Vous n'avez pas encore enregistré de cartes ou le cache de votre navigateur a été supprimé.",
      loadCard: "Charger une carte",
      loadingPrompt:
        "Choisissez une carte à charger. Cela écrasera les paramètres de la carte en cours d'édition.",
      cards: "Cartes",
      deletePrompt: "Etes-vous sûr de vouloir supprimer {item} ?",
      saveFirst: "Enregistrer d'abord",
      importOverridePrompt:
        "Les données de la carte en cours d'édition comportent des modifications non enregistrées qui seront perdues si une autre carte est importée. Voulez-vous jeter les modifications ? ",
      loadOverridePrompt:
        "Les données de la carte en cours d'édition comportent des modifications non enregistrées qui seront perdues si une autre carte est importée. Voulez-vous jeter les modifications ? ",
      resetOverridePrompt:
        "Les données de la carte en cours d'édition comportent des modifications non enregistrées qui seront perdues. Voulez-vous jeter les modifications ? ",
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
          "Mots-clés convertis en icones : AP, MP, HP, Injury, Injuries, Air, Earth, Fire et Water. Encadrer du texte avec * pour le mettre en gras.",
        deletionHeader: "Confirmation de suppression",
        deletionPrompt:
          "Etes-vous sûr de vouloir supprimer {item} ? Les données saisies seront perdues.",
        newPowerName: "Nouveau pouvoir",
        newPowerDescription: "Décrire ici les effets du pouvoir.",
        newSpellName: "Nouveau sort",
        newSpellDescription: "Décrire ici les effets du sort.",
        range: "Portée",
        damage: "Dégâts",
        limit: "Limite",
        element: {
          none: "Aucun",
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
