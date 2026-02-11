# Senoweb Website Template

Tato šablona slouží jako základ pro tvorbu moderních, rychlých a plně přizpůsobitelných webových stránek. Vychází z repozitáře [CodeStitch Intermediate Website Kit (LESS)](https://github.com/CodeStitchOfficial/Intermediate-Website-Kit-LESS), ale byla upravena a rozšířena pro potřeby ručně vyvíjených webů na míru v rámci **Senoweb**.

## Funkce

- **Eleventy (11ty)** - statický generátor webu
- **Tailwind CSS** – utility-first přístup ke stylování
- **Optimalizace obrázků** – automatické generování více formátů a velikostí
- **Decap CMS** – snadná správa obsahu bez nutnosti zasahovat do kódu
- **SEO-ready** – generování sitemap, čistý kód a minifikace
- **Snadný vývoj** – připravené skripty pro build a lokální server
- **Netlify podpora** – jednoduché nasazení s využitím pluginů


## Instalace

> [!CAUTION]
> Veškeré projekty vytvářené pro **coalmarketing** musí mít repozitář založený výhradně pod GitHub organizací **coalmarketing a musí být veřejné**.
> Použití privátního repozitáře nebo repozitáře založeného na osobním GitHub účtu (i v případě, že je vývojář členem organizace) vede na Netlify k automatickému účtování Git Contributor poplatků.

![alt text](https://github.com/nula1337/Senoweb-Website-Template/blob/main/github/github-new-repository.png)

### Postup

1. V horní části této stránky repozitáře klikněte na tlačítko **Use This Template** a vytvořte nový repozitář.
2. Postupujte podle pokynů a vytvořte nový repozitář ze startovací sady.
3. Zkopírujte repozitář do svého počítače a otevřete jej v VS Code.
4. Spusťte `npm install` a nainstalujte všechny závislosti.
5. Po dokončení instalace spusťte `npm start` a spusťte vývojový server.
6. Vyplňte soubor `./src/_data/client.js` příslušnými informacemi pro svého klienta.
7. Upravte tailwind proměnné `@theme` v ./src/assets/css/input.css
8. Upravte soubory webových stránek (použijte ./src, NE ./public) podle potřeby. K zahájení práce použijte šablonu v souboru content/pages/_template.txt nebo upravte stávající stránky.
9. Nasazení proveďte pomocí Netlify.
10. Zprovoznění administrace proveďte pomocí Decap CMS.
