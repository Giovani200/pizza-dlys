# Pizza D-Lys

Refonte du site vitrine de [Pizza D-Lys](http://pizzadlys.com/index.php), restaurant de restauration rapide à Dammarie-les-Lys. Site statique, mobile d'abord, construit autour de deux actions : appeler le restaurant ou commander sur Uber Eats.

Conçu et développé par **Giovani**.

**Lighthouse** (build de production, mobile) : Performance 100 · Accessibilité 100 · Bonnes pratiques 100

## Fonctionnalités

- Carte complète (pizzas, tacos, burgers, formules) générée depuis des données structurées
- Statut Ouvert / Fermé en temps réel, calculé côté client en heure de Paris
- Direction artistique « affiche de comptoir » : collage animé, bandeau défilant, apparition au défilement
- Mise en page fluide de 360 à 1920 px, avec une barre d'actions collante sur mobile
- Accessibilité visée WCAG 2.2 AA, vérifiée par des tests automatisés
- Aucun cookie ni script tiers

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, export statique) et React 19
- TypeScript
- CSS Modules et design tokens compilés en variables CSS
- Vitest, Playwright et axe-core

## Démarrage

Node.js 20.9 ou plus récent est requis. Google Chrome est utilisé par les tests d'accessibilité.

```bash
npm install
npm run dev
```

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement sur http://localhost:3000 |
| `npm run build` | Export statique dans `out/` |
| `npm run preview` | Sert l'export en local |
| `npm test` | Tests unitaires et de contenu |
| `npm run test:a11y` | Tests d'accessibilité sur l'export |
| `npm run verify` | Build et suite de tests complète |
| `npm run lint` | Analyse statique |

## Architecture

```
app/          routes, mise en page commune et styles globaux
components/   composants partagés
content/      contenu du site en JSON (carte, infos, textes, mentions légales)
design/       design tokens
lib/          logique métier : horaires, formatage, textes alternatifs
scripts/      génération des variables CSS et des déclinaisons d'images
tests/        tests unitaires (Vitest) et d'accessibilité (Playwright)
```

**Contenu piloté par les données.** Aucun texte, plat ou prix n'est écrit dans les composants : tout provient de `content/`, et les valeurs dérivées (nombre de plats, prix de départ) sont calculées.

**Design tokens.** `design/tokens.json` est la source unique des couleurs, de la typographie, des espacements et des durées. Il est compilé en variables CSS avant chaque build. La typographie est fluide (`clamp()`) entre les deux tailles de référence, avec des bornes en `rem` pour respecter le zoom.

**Export statique.** Le site ne requiert aucun serveur. Le statut d'ouverture est calculé dans le navigateur avec `useSyncExternalStore`, pour éviter un état figé au moment du build et toute erreur d'hydratation.

**Images responsives.** Chaque image est déclinée en plusieurs largeurs au build, puis servie via un loader `next/image` personnalisé, avec un attribut `sizes` adapté à chaque emplacement.

## Tests

- **Contenu** : le HTML généré affiche exactement les plats et les prix de `content/menu.json`.
- **Horaires** : le statut est vérifié à chaque borne d'ouverture, y compris lors du passage à l'heure d'été.
- **Accessibilité** : sur chaque page, en mobile et en desktop, absence de violation détectée par axe-core, cibles tactiles d'au moins 44 px, navigation clavier complète avec focus visible.
- **Intégrité de l'export** : chaque image référencée existe, et chaque page a sa meta description.

## Déploiement

`npm run build` produit un site statique dans `out/`, déployable sur n'importe quel hébergeur de fichiers statiques. Le site est exclu de l'indexation (`noindex`) tant que la refonte n'est pas validée par le restaurant.

## Licence

Code © Giovani. Le nom, le logo, les visuels et le contenu de la carte appartiennent à Pizza D-Lys.
