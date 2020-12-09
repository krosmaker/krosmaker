export default {
  disclaimer: `
    Grafiki są własnością firmy Ankama i zostały opublikowane za ich pozwoleniem.
    Ta strona nie jest tworzona ani powiązana z firmą Ankama.
  `,

  common: {
    ok: "OK",
    cancel: "Anuluj",
    save: "Zapisz",
    load: "Wczytaj",
    export: "Eksportuj",
    import: "Importuj",
    delete: "Usuń",
    warning: "Uwaga",
    search: "Szukaj",
    download: "Pobierz",
    override: "Nadpisz",
    close: "Zamknij",
    up: "Do góry",
    down: "Do dołu",
    of: "z",
    emptyTablePrompt: "Brak wyników",
  },
  card: {
    ap: "PA",
    hp: "PZ",
    mp: "PR",

    flip: "Obróć",
    round: "Zaokrąglij",

    downloadWarning1: `
      Pobieranie kart obecnie nie jest wspierane na wszystkich przeglądarkach.
      Działa najlepiej w przeglądarce Firefox i powinno działać na Chrome,
      ale jeżeli wyeksportowany obraz różni się od oryginału na stronie,
      spróbuj własnoręcznie wyciąć kartę ze zrzutu ekranu.
    `,
    // Firefox Screnshots (...)
    downloadWarning2: `
      pozwala na zaznaczenie karty i pobranie jej w prosty sposób.
      Niektóre przeglądarki oferują podobne możliwości dzięki rozszerzeniom.
    `,
    downloadWarning3:
      "Warto podkreślić, że wartość zaokrąglenia rogów karty wynosi 18 pikseli.",
    downloadWarningAccept: "Rozumiem",
    downloadWarningIgnore: "OK, nie pokazuj tego więcej",

    edit: {
      // Artwork:
      artwork: "Ilustracja",
      customize: "Ustawienia",
      enableCropping: "Włącz wycinanie",
      imageUploadPrompt: "Kliknij tutaj albo przeciągnij obraz, aby wgrać.",

      // Basic data:
      krosmaster: "Krosmaster",
      name: "Imię",
      rarity: "Typ",
      elite: "Elita",
      common: "Zwykły",
      minion: "Przyzwanie",
      comment: "Komentarz",
      ap: "Punkty akcji",
      hp: "Punkty zdrowia",
      mp: "Punkty ruchu",

      // Export:
      storage: "Zapis",
      fileName: "Nazwa pliku",
      defaultFileName: "Wpisz nazwę",
      overridePrompt1: "Krosmaster o nazwie pliku",
      overridePrompt2: "już istnieje. Czy chcesz nadpisać kartę?",
      noDataHeader: "Brak danych",
      noDataPrompt:
        "Nie masz żadnych zapisanych kart albo dane przeglądarki zostały wyczyszczone.",
      loadKrosmaster: "Wczytaj",
      loadingPrompt:
        "Wybierz kartę do wczytania. Obecne dane karty zostaną nadpisane.",
      krosmasters: "Karty",
      deletePrompt: "Czy na pewno chcesz usunąć",
      saveFirst: "Najpierw zapisz",
      importOverridePrompt:
        "Obecna konfiguracja karty ma niezapisane zmiany, które zostaną utracone jeżeli inna karta zostanie wczytana. Czy chcesz nadpisać dane?",
      loadOverridePrompt:
        "Obecna konfiguracja karty ma niezapisane zmiany, które zostaną utracone jeżeli inna karta zostanie wczytana. Czy chcesz nadpisać dane?",
      importErrorHeader: "Wystąpił błąd",
      invalidFileError: `
        Wybrany plik karty jest nieprawidłowy.
        Plik został uszkodzony albo był modyfikowany ręcznie.
        Jeżeli chcesz spróbować naprawić plik, sprawdź poniższe błędy walidacji.
      `,
      fileFormatError: "Wybrany plik ma nieprawidłowy format. Wybierz inny.",
      validationErrorMessages: "Błędy walidacji",

      // Figurine:
      figurine: "Miniaturka",

      // Powers, spells:
      powers: "Moce",
      spells: "Czary",
      ability: {
        name: "Nazwa",
        description: "Opis",
        editHint:
          "Słowa kluczowe podmieniane na ikony: AP, MP, HP, obrażenia: Injury, Injuries, żywioły: Air, Earth, Fire, Water. Otocz tekst symbolami * aby pogrubić.",
        deletionHeader: "Potwierdzenie",
        deletionPrompt1: "Czy naprawdę chcesz usunąć",
        deletionPrompt2: "Wprowadzone dane zostaną utracone.",
        newPowerName: "Nowa moc",
        newPowerDescription: "Tutaj opisz moc.",
        newSpellName: "Nowy czar",
        newSpellDescription: "Tutaj opisz czar.",
        range: "Zasięg",
        damage: "Obrażenia",
        limit: "Limit",
        element: {
          none: "Brak",
          air: "Powietrze",
          earth: "Ziemia",
          fire: "Ogień",
          water: "Woda",
        },
        regular: "Zwykły",
        special: "Specjalny",
        none: "Brak",
        perTurn: "Na turę",
        perTarget: "Na cel",
      },

      // Notifications:
      notification: {
        export: "Wyeksportowano {name}.",
        import: "Wczytano kartę z pliku.",
        delete: "Usunięto {name}.",
        artworkUpload: "Wgrano ilustrację.",
        figurineUpload: "Wgrano miniaturkę.",
        load: "Wczytano {name}.",
        save: "Zapisano {name}.",
      },
    },
  },
};
