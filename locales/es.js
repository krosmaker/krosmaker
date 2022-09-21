export default {
  disclaimer: `
    Los gráficos son propiedad de Ankama y se publican con su permiso.
    Este sitio web no está producido ni afiliado a Ankama.
  `,

  common: {
    ok: "Aceptar",
    cancel: "Cancelar",
    save: "Guardar",
    load: "Cargar",
    export: "Exportar",
    import: "Importar",
    delete: "Borrar",
    warning: "Precaucion",
    search: "Buscar",
    download: "Descargar",
    override: "Sobreescribir",
    discard: "Descartar",
    close: "Cerrar",
    reset: "Reiniciar",
    up: "Subir",
    down: "Bajar",
    of: "de",
    emptyTablePrompt: "No se encuentran resultados",
  },
  card: {
    ap: "PA",
    hp: "PV",
    mp: "PM",

    flip: "Girar",
    adjust: "Ajustar",

    downloadWarning1: `
        Actualmente, la descarga de las cartas no es compatible en todos los navegadores principales.
        Funciona en Firefox y Chrome,
        pero si experimentas alguna discrepancia entre el sitio web y la imagen exportada,
        siempre puedes hacer una captura de pantalla.
      `,
    // Firefox Screenshots (...)
    downloadWarning2: `
        le permitirá seleccionar el área de la carta y descargar la imagen recortada
        con solo unos clics. Algunos navegadores pueden ofrecer funciones similares a través de extensiones.
      `,
    downloadWarning3:
      "Ten en cuenta que el radio de redondeo de las tarjetas es de 18 píxeles.",
    downloadWarningAccept: "Entendido",
    downloadWarningIgnore: "De acuerdo, no mostrar de nuevo",

    edit: {
      editorUnavailable:
        "Este editor no está disponible para el tipo de tarjeta carta.",

      // Artwork:
      artwork: "Arte",
      customize: "Editar",
      enableCropping: "Habilitar recorte",
      imageUploadPrompt: "Pincha aqui o arrastra una imagen para subirla",

      // Basic data:
      card: "Carta",
      name: "Nombre",
      type: "Tipo",

      fighter: "Combatiente",
      rarity: "Rareza",
      twoSided: "De dos caras",
      suffix: "Sufijo",
      elite: "Élite",
      common: "Comun",
      minion: "Invocación",
      ap: "PA",
      hp: "PV",
      mp: "PM",

      favor: "Favor",
      effect: "Efecto",
      regular: "Regular",
      superior: "Superior",

      challenge: "Desafío",
      active: "Activo",
      passive: "Pasivo",

      version: "Versión",
      comment: "Comentario",

      // Display:
      display: "Configuración de pantalla",
      play: "Jugar",
      print: "Imprimir",
      scale: "Escala",
      roundedCorners: "Esquinas redondas",
      targetCardSize: "Tamaño de la tarjeta de destino",
      width: "Ancho",
      height: "Altura",
      offset: "Offset",
      invalidSizeWarning:
        "Las habilidades están fuera o cerca del final del área de impresión segura.",

      // Export:
      storage: "Almacenamiento",
      customFileName: "Nombre del archivo",
      overridePrompt1: "La carta con el nombre de archivo",
      overridePrompt2: "ya existe. ¿Quieres sobreescribirlo?",
      noDataHeader: "Nada que cargar",
      noDataPrompt:
        "Todavía no ha guardado ningún carta o se ha eliminado la caché de su navegador.",
      loadCard: "Cargar",
      loadingPrompt:
        "Elige la carta que cargar. Esto sobreescribirá los datos actuales.",
      cards: "Cartas",
      deletePrompt: "¿Realmente quieres borrarlo?",
      saveFirst: "Guardar primero",
      importOverridePrompt:
        "Los datos de la carta actual tienen cambios no guardados que se perderán si se importa otra carta. ¿Quieres descartar los cambios?",
      loadOverridePrompt:
        "Los datos de la carta actual tienen cambios no guardados que se perderán si se carga otra carta. ¿Quieres descartar los cambios? ",
      resetOverridePrompt:
        "Los datos de la carta actual tienen cambios no guardados que se perderán. ¿Quieres descartar los cambios?",
      importErrorHeader: "No se puede importar",
      invalidFileError: `
            El archivo seleccionado tiene datos no válidos.
            El archivo está dañado o se modificó manualmente.
            Si desea intentar reparar el archivo, intente revisar los errores de validación.
          `,
      fileFormatError:
        "El archivo seleccionado tiene un formato no válido. Intente con otro.",
      validationErrorMessages: "Error de validación",

      // Figurine:
      figurine: "Figura",
      useSameImage: "Usa la misma imagen",

      // Powers, spells:
      powers: "Poderes",
      spells: "Hechizos",
      ability: {
        name: "Nombre",
        description: "Descripción",
        editHint:
          "Palabras clave convertidas en íconos: AP, MP, HP, Injury, Injuries, Air, Earth, Fire, Water. Coloca * antes y después de un texto para convertirlo en negritas.",
        deletionHeader: "Confirmar borrado",
        deletionPrompt:
          "¿Realmente quieres borrarlo? Los datos introducidos se perderán.",
        newPowerName: "Nuevo poder",
        newPowerDescription: "Describe el poder aquí.",
        newSpellName: "Nuevo hechizo",
        newSpellDescription: "Describe el hechizo aquí.",
        range: "Rango",
        damage: "Daño",
        limit: "Limite",
        element: {
          none: "None",
          air: "Aire",
          earth: "Tierra",
          fire: "Fuego",
          water: "Agua",
        },
        regular: "Regular",
        special: "Especial",
        none: "Nada",
        perTurn: "Por turno",
        perTarget: "Por objetivo",
      },

      // Notifications:
      notification: {
        export: "{name} se ha exportado.",
        import: "Se ha importado la configuración de la carta.",
        delete: "{name} se ha borrado.",
        artworkUpload: "Se ha subido la imagen de arte.",
        figurineUpload: "Se ha subido la imagen de la figura.",
        load: "{name} se ha cargado.",
        save: "{name} se ha guardado.",
      },
    },
  },
};
