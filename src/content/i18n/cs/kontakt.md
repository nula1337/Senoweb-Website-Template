---
layout: "pages/kontakt.njk"

title: 'Kontakt'
description: 'V Senoweb se specializujeme na tvorbu webových stránek na míru. Nepoužíváme koupené šablony, nástroje pro automatizované budování webů ani nástroje, které by váš web zahlcovali zbytečným kódem a tím vaší stránku zpomalovaly.'
permalink: 'kontakt/'


form:
  name: Kontaktní formulář

  fields:
      - type: text
        name: Jméno
        autocomplete: name
        required: true

      - type: tel
        name: Telefon
        autocomplete: tel
        required: true

      - type: email
        name: Email
        autocomplete: email
        required: true

      - type: textarea
        name: Zpráva
        required: true

  submit: Odeslat
---