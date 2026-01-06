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
