# Cahier de recettes

Pré-requis:
- Node.js (>=16)
- MongoDB en local ou une URI MongoDB Atlas

Installation:

```bash
npm install
cp .env.example .env
# puis modifier .env si besoin
npm run dev
```

Endpoints principaux:
- `POST /recettes` : créer une recette
- `GET /recettes` : lister les recettes
- `GET /recettes/:id` : récupérer une recette
- `PUT /recettes/:id` : mettre à jour une recette
- `DELETE /recettes/:id` : supprimer une recette

Documentation:

- Swagger UI (local): `GET /api-docs` (installez la dépendance `swagger-ui-express` si nécessaire)

Authentification:

- `POST /auth/register` : créer un compte (body: `username`, `email`, `password`)
- `POST /auth/login` : récupérer un token JWT (body: `email`, `password`)

Pour appeler une route protégée (ex: `POST /recettes`) ajoutez l'en-tête:

`Authorization: Bearer <votre_token>`

Installer la dépendance Swagger (si non présente):

```bash
npm install swagger-ui-express
```
