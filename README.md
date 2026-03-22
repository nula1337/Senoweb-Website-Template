# Senoweb Website Template

Tato šablona slouží jako základ pro tvorbu moderních, rychlých a plně přizpůsobitelných webových stránek. Vychází z repozitáře [CodeStitch Intermediate Website Kit (LESS)](https://github.com/CodeStitchOfficial/Intermediate-Website-Kit-LESS), ale byla upravena a rozšířena pro potřeby ručně vyvíjených webů na míru v rámci **Senoweb**.

## Funkce

- **Eleventy (11ty)** - statický generátor webu
- **Tailwind CSS** – utility-first přístup ke stylování
- **Optimalizace obrázků** – automatické generování více formátů a velikostí
- **Decap CMS** – snadná správa obsahu bez nutnosti zasahovat do kódu
- **Decap Bridge** – integrace pro autentizaci pro Decap CMS
- **SEO-ready** – generování sitemap, čistý kód a minifikace
- **Snadný vývoj** – připravené skripty pro build a lokální server

## Použití šablony

1. V horní části této stránky repozitáře klikněte na tlačítko **Use This Template** a vytvořte nový repozitář.
> [!WARNING]
> Veškeré projekty vytvářené pro **coalmarketing** musí mít repozitář založený výhradně pod GitHub organizací **coalmarketing**.
> ![alt text](https://github.com/nula1337/Senoweb-Website-Template/blob/main/github/github-new-repository.png)
2. Postupujte podle pokynů a vytvořte nový repozitář ze startovací sady.
3. Naklonujte repozitář do svého počítače a otevřete jej v VS Code.
4. Spusťte `npm install` a nainstalujte všechny závislosti.
5. Po dokončení instalace spusťte `npm start` a spusťte vývojový server.
6. Vyplňte soubor `./src/_data/client.js` příslušnými informacemi pro svého klienta.
7. Upravte tailwind proměnné v `./tailwind.config.js`.
8. Upravte soubory webových stránek (použijte `./src`, NE `./public`) podle potřeby. K zahájení práce použijte šablonu v souboru `content/pages/_template.txt` nebo upravte stávající stránky.
9. Nasazení proveďte pomocí Cloudflare Pages.
10. Konfiguraci administrace proveďte pomocí souboru `./src/admin/config.yml`.

## Nasazení projektu

1. Přejděte na [tento odkaz](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/pages) nebo v dashboardu Cloudflare přejděte na **Compute** → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Vyberte git repozitář z organizace coalmarketing.
3. Použijte tuto konfiguraci pro **Build settings**:\
![Cloudflare Pages Build settings](https://github.com/nula1337/Senoweb-Website-Template/blob/main/github/cloudflare-build-configuration.png)
4. Pro zrychlení následných buildů (zejména u optimalizace obrázků) zapněte v nastavení projektu **Settings** → **Build** → **Build cache** → **Enable**\
![Cloudflare Pages Build cache](https://github.com/nula1337/Senoweb-Website-Template/blob/main/github/cloudflare-build-cache.png)

### Nastavení domény

Pokud chceme pro projekt nastavit doménu druhého řádu je zapotřebí přidat doménu do Cloudflare (nastavit Cloudflare nameservery).

### Domenové redirecty

Pro redirecty v rámci webu je možné na Cloudflare Pages použít soubor `./src/_redirects`.
V případě, že je potřeba nastavit redirect na doménové úrovni - například redirect z kořenové domény na subdoménu www. nebo redirect na jinou doménu - je potřeba nastavit redirect pravidlo.
Pro nastavení těchto redirectů je zapotřebí, aby byla doména přidána do Cloudflare (měla nastavená Cloudflare nameservery).

1. Přejděte na [tento odkaz](https://dash.cloudflare.com/?to=/:account/:zone/rules/redirect-rules) nebo v dashboardu Cloudflare přejděte na **Domains** → **domena-projektu.cz** → **Rules** → **Overview**.
2. V **Templates** vyberte **Redirect from root to WWW** nebo **Redirect to a different domain**.
3. Vyplňte URL adresu a uložte redirect pravidlo.
4. Otestujte funkčnost pravidla.

### Decap Bridge

1. Než přejdete k dalšímu kroku, ujistěte se, že máte repozitář na GitHubu a že je váš web nasazen.
2. Přihlaste se na stránce https://decapbridge.com/ přes coalmarketing účet.
3. Přejděte na dashboard a klikněte na „Add site +“. Zobrazí se tato obrazovka:\
![Decap Bridge New site configuration](https://github.com/nula1337/Senoweb-Website-Template/blob/main/github/cloudflare-build-configuration.png)
4. Zadejte název repozitáře v tomto formátu `user-or-org/repository-name`, například: `coalmarketing/new-project`.
5. Vytvořte Github access token:
     - Přihlaste se ke svému účtu na GitHubu.
     - Klikněte na svou profilovou fotku (vpravo nahoře) a klikněte na odkaz „Settings“.
     - Přejděte dolů a klikněte na odkaz „Developer settings“.
     - Klikněte na odkaz „Personal access tokens“ a vyberte možnost „Fine-grained tokens“.
     - Klikněte na tlačítko „Generate new token“ a v případě potřeby zadejte své heslo znovu.
     - Zadejte název tokenu například `Decap Bridge - Španělské Slunce`.
     - Nastavte časový limit „Expiration“ přístupového tokenu na „No expiration“.
     - Hodnotu „Repository access“ nastavte na „Only select repositories“ a vyberte repozitář projektu.
     - V části „Permissions“ nastavte pro **Contents** a **Pull requests** oprávnění pro čtení a zápis. Decap CMS to potřebuje k načtení obsahu z repozitáře a následnému uložení změn.
     - Klikněte na tlačítko „Generate token“, znovu zkontrolujte oprávnění a klikněte na tlačítko „Generate token“.
     - Nezapomeňte si nyní zkopírovat vygenerovaný access token, protože jej již nebudete moci znovu zobrazit.
6. Vygenerovaný Github access token vložte do pole v Decap Bridge formuláři.
7. Do pole „Your Decap CMS login URL“ vložte URL adresu administrace nasazeného projektu, například: `https://new-project.cz/admin/index.html`
8. Volitelně nastavte personalizaci administrace pomocí nahrání loga projektu, zadání názvu a zvolení primární barvy.

#### Vložení backend kódu

1. Po založení nového záznamu Decap Bridge vygeneruje konfiguraci, kterou je potřeba vložit do souboru `./src/admin/config.yml`.
2. Změny pushněte do repozitáře a otestujte systém autentizace. Do administrace projektu se můžete přihlásit stejnými přihlašovacími údaji coalmarketing jako do dashboardu Decap Bridge.
3. Odešlete pozvánky do administrace na email klientů pomocí Decap Bridge dashboardu. Odtud je také možné resetovat jejich heslo atd.

### Basin formuláře

1. Přihlaste se na stránce https://usebasin.com/users/sign_in přes coalmarketing účet.
2. Přejděte na stránku „Projects“ a vytvořte nový projekt.
3. Přejděte na stránku „Forms“ a vytvořte nový formulář.
4. Po vytvoření formuláře Basin vytvoří endpoint odkaz, na který je možné odesílat zprávy z formuláře:\
![Basin form endpoint](https://github.com/nula1337/Senoweb-Website-Template/blob/main/github/basin-new-form.png)
5. Tento odkaz je následně potřeba použít v atributu `action` tagu `form`:\
```html
<form method="POST" action="https://usebasin.com/f/3d1718590a84">
  <label>
    <span>Email</span>
    <input class="input" type="email" name="Email" autocomplete="email" required>
  </label>

  <button type="submit">Odeslat</button>
</form>
```

#### Nastavení formuláře

1. V nastavení formuláře v záložce „Emails“ nastavte emailové adresy, na které se budou zasílat vyplněné zprávy.
2. Nastavte jazyk Basin notifikačních emailů na Čeština (Czech):\
![Basin form language](https://github.com/nula1337/Senoweb-Website-Template/blob/main/github/basin-form-language.png)
3. V záložce „Settings“ nastavte časové pásmo, jazyk a branding stránky s potvrzením úspěšného odeslání formuláře.
4. Volitelně v záložce „Emails“ → „Config“ → „Mailer“ nahrajte vlastní logo projektu, které se zobrazuje v emailech a nastavte emailovou adresu, z které se notifikace odesílají (je potřeba mít doménu přidanou na stránce „Domains“).
