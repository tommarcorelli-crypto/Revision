# Révision IT / Cybersécurité

PWA de révision pour l'informatique, la cybersécurité et le SISR : fiches, flashcards, quiz, répétition espacée (Anki SRS) et un terminal Linux/Windows simulé avec scénarios guidés.

## Structure du projet

```
index.html         Structure de la page, tous les écrans (fiches, flashcards, quiz, stats, terminal)
style.css           Tous les styles
data.js              Données des fiches (FICHES, catLabels, catOrder)
terminal-data.js    Données du mode Terminal (TERM_SHELLS, TERM_SCENARIOS)
script.js            Logique applicative (état, rendu, événements, quiz, flashcards, Anki, terminal)
sw.js                 Service worker (cache offline)
manifest.json      Métadonnées PWA (nom, icônes, couleurs)
icons/                  Icônes de l'app (192, 512, 512-maskable, apple-touch)
```

Ordre de chargement des scripts dans `index.html` : `data.js` → `terminal-data.js` → `script.js`. Les deux premiers doivent toujours être chargés avant `script.js`, qui utilise leurs variables.

## Ajouter une fiche

Une fiche est un objet dans le tableau `FICHES` (`data.js`) :

```js
{
  id: 105,                          // unique, entier
  cat: "reseau",                    // doit correspondre à une clé de catLabels
  titre: "Le protocole DHCP",
  sub: "DORA, bail, ports UDP 67/68",   // sous-titre affiché sous le titre
  schema: `<svg ...>...</svg>`,     // optionnel — schéma SVG inline
  def: "DHCP attribue automatiquement...",   // définition courte
  points: ["Point clé 1", "Point clé 2", "..."],   // liste à puces
  piege: "Erreur fréquente à éviter.",
  retenir: "Phrase de synthèse à retenir.",
  keywords: ["DORA", "lease", "UDP 67/68"]    // utilisés pour la recherche
}
```

Tous les champs sont obligatoires sauf `schema` (uniquement si un schéma visuel est utile). Les fiches sont groupées par catégorie dans le fichier avec des commentaires de section (`// RÉSEAU`, `// SÉCURITÉ`, etc.) — purement pour la lisibilité, sans effet sur le code.

## Ajouter ou modifier une catégorie

Deux endroits à mettre à jour dans `data.js`, toujours ensemble :

- `catLabels` : associe le code de catégorie à son libellé affiché, ex. `secu: "🔒 Sécurité"`
- `catOrder` : tableau définissant l'ordre d'affichage des catégories dans la sidebar

## Ajouter un shell ou une commande dans le terminal

Dans `terminal-data.js`, `TERM_SHELLS` est un objet par shell (`linux`, `windows`, etc.) :

```js
linux: {
  label: "🐧 Linux/Bash",
  prompt: "user@linux:~$",
  color: "#86efac",
  intro: [{t:"ok", s:"Message affiché à l'ouverture"}],
  commands: {
    "pwd": () => [{t:"ok", s:"/home/user"}],
    // chaque commande est une fonction qui retourne un tableau de lignes
    // t: "ok" | "warn" | "err" | "info" | "head" (style de la ligne)
  }
}
```

## Ajouter un scénario guidé

Dans `terminal-data.js`, `TERM_SCENARIOS` est un tableau de scénarios :

```js
{
  id: "forensic-linux",
  label: "🔍 Forensique Linux",
  shell: "linux",              // doit correspondre à une clé de TERM_SHELLS
  desc: "Description du scénario",
  steps: [
    {
      titre: "Étape 1 — ...",
      contexte: "Texte affiché avant l'étape",
      hint: "Indice si l'utilisateur est bloqué",
      expected: ["commande exacte", "alternative acceptée"],
      output: [{t:"ok", s:"ligne de résultat"}],
      explication: "Ce qu'il faut comprendre de cette étape"
    }
  ]
}
```

## Service Worker / cache

`sw.js` utilise une stratégie network-first pour tous les fichiers `.html`, `.js`, `.css` (toujours la version la plus récente), et cache-first pour les icônes et `manifest.json`.

**Important :** à chaque déploiement de changements significatifs, monter le numéro dans `CACHE_NAME` (ex. `revision-it-v3` → `v4`) pour forcer une invalidation propre du cache chez les utilisateurs ayant déjà installé l'app.
