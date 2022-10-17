export default {
  disclaimer: `
    As imagens são protegidas por direitos autorais da Ankama e publicados com a sua permissão.
    Este site não foi produzido ou afiliado à Ankama.
  `,

  common: {
    ok: "OK",
    cancel: "Cancelar",
    save: "Salvar",
    load: "Carregar",
    export: "Exportar",
    import: "Importar",
    delete: "Excluir",
    warning: "Aviso",
    search: "Procurar",
    download: "Download",
    override: "Sobrepor",
    discard: "Descartar",
    close: "Fechar",
    reset: "Resetar",
    up: "Subir",
    down: "Descer",
    of: "of",
    emptyTablePrompt: "Nenhum resultado encontrado",
  },
  card: {
    ap: "PA",
    hp: "PV",
    mp: "PM",

    flip: "Virar",
    adjust: "Ajustar",

    downloadWarning1: `
      Atualmente, o download das cartas não é suportado em todos os principais navegadores.
      Funciona melhor no Firefox e no Chrome,
      mas se houver muita diferença entre o site e a imagem exportada,
      sugiro capturar a imagem da tela manualmente.
    `,
    // Firefox Screenshots (...)
    downloadWarning2: `
      permitirá que você selecione a área da carta e baixe a imagem recortada com apenas
      alguns cliques. Alguns navegadores podem oferecer recursos semelhantes atráves de
      extensões instaladas.
    `,
    downloadWarning3:
      "Lembre-se de que o raio da borda das cartas arredondadas é de 18 pixels.",
    downloadWarningAccept: "I Concordo",
    downloadWarningIgnore: "OK, não mostre isso novamente",

    edit: {
      editorUnavailable:
        "Este editor não está disponível para o tipo de carta escolhida.",

      // Artwork:
      artwork: "Imagem (Arte)",
      customize: "Customizar",
      enableCropping: "Habilitar corte",
      imageUploadPrompt:
        "Clique aqui ou arraste uma imagem para fazer o upload.",

      // Basic data:
      card: "Carta",
      name: "Nome",
      type: "Tipo",

      fighter: "Combatente",
      rarity: "Raridade",
      twoSided: "Dois lados",
      suffix: "Sufixo",
      elite: "Raro",
      common: "Comum",
      minion: "Invocação",
      ap: "PA",
      hp: "PV",
      mp: "PM",

      favor: "Favor",
      effect: "Efeito",
      regular: "Regular",
      superior: "Superior",

      challenge: "Desafio",
      active: "Ativo",
      passive: "Passivo",

      version: "Versão",
      comment: "Comentários",

      // Display:
      display: "Display",
      play: "Verificação",
      print: "Imprimir",
      scale: "Escala",
      roundedCorners: "Cantos arredondados",
      targetCardSize: "Tamanho da carta",
      width: "Largura",
      height: "Altura",
      offset: "Deslocamento",
      invalidSizeWarning:
        "As habilidades estão fora ou muito próximas do final da área de segura de impressão.",

      // Export:
      storage: "Armazenamento",
      customFileName: "Nome do arquivo",
      overridePrompt1: "Carta com o nome do arquivo",
      overridePrompt2: "já existe. Deseja substituir a carta?",
      noDataHeader: "Nada para carregar",
      noDataPrompt:
        "Você ainda não salvou nenhuma carta ou o cache do seu navegador foi limpo.",
      loadCard: "Carregar carta",
      loadingPrompt:
        "Escolha uma carta para carregar. Isso substituirá as configurações da carta atual.",
      cards: "Cards",
      deletePrompt: "Você realmente deseja excluir {item}?",
      saveFirst: "Salve primeiro",
      importOverridePrompt:
        "Os dados da carta atual possuem alterações não salvas que serão perdidas se outra carta for importada. Deseja descartar as alterações?",
      loadOverridePrompt:
        "Os dados da carta atual possuem alterações não salvas que serão perdidas se outra carta for carregada. Deseja descartar as alterações?",
      resetOverridePrompt:
        "As dados da carta atual possuem alterações não salvas que serão perdidas. Deseja descartar as alterações?",
      importErrorHeader: "Não foi possível importar",
      invalidFileError: `
        O arquivo selecionado tem dados inválidos.
        O arquivo está corrompido ou foi modificado manualmente.
        Se você quiser tentar corrigir o arquivo, tente passar pelos erros de validação.
      `,
      fileFormatError:
        "O arquivo selecionado tem formato inválido. Por favor, tente outro.",
      validationErrorMessages: "Mensagens de erro de validação",

      // Figurine:
      figurine: "Imagem",
      useSameImage: "Usar a mesma imagem",

      // Powers, spells:
      powers: "Poderes",
      spells: "Feitiços",
      ability: {
        name: "Nome",
        description: "Descrição",
        editHint:
          "Palavras chave serão convertidas em ícones: AP (PA), MP (PM), HP (PV), Injury (ferimento), Air (ar), Earth (terra), Fire (fogo) e Water (água). Para colocar o texto em negrito use * no ínicio e no fim da palavra.",
        deletionHeader: "Confirmar exclusão",
        deletionPrompt:
          "Você realmente deseja excluir {item}? Os dados inseridos serão perdidos.",
        newPowerName: "Novo Poder",
        newPowerDescription: "Descreva o poder aqui.",
        newSpellName: "Novo Feitiço",
        newSpellDescription: "Descreva o feitiço aqui.",
        range: "Alcance",
        damage: "Dano",
        limit: "Limite",
        element: {
          none: "Nenhum",
          air: "Ar",
          earth: "Terra",
          fire: "Fogo",
          water: "Água",
        },
        regular: "Normal",
        special: "Especial",
        none: "Nenhum",
        perTurn: "Por turno",
        perTarget: "Por alvo",
      },

      // Notifications:
      notification: {
        export: "{name} foi exportado.",
        import: "Configuração da carta foi importada.",
        delete: "{name} foi excluído.",
        artworkUpload: "Imagem (Arte) foi carregada.",
        figurineUpload: "Imagem foi carregada.",
        load: "{name} foi carregado.",
        save: "{name} foi salvo.",
      },
    },
  },
};
