# Contrat API - Sondage produit

Ce document prepare le contrat du futur endpoint public de sondage produit pour Lok Izy.

Objectif :
- permettre au site vitrine d'envoyer les reponses du sondage
- enregistrer une reponse produit en base via l'application
- rester simple a brancher depuis le frontend du site
- garder un format de reponse compatible avec la logique frontend deja en place

## Endpoint recommande

```http
POST /api/public/product-survey
Content-Type: application/json
Accept: application/json
```

Nom possible complet si heberge sur l'app :

```txt
https://locativeapp.azurewebsites.net/api/public/product-survey
```

## Requete JSON

Le frontend du site est deja prepare pour envoyer ce payload en `camelCase`.

```json
{
  "fullName": "Laura Prieur",
  "email": "laura@horizon.ch",
  "profile": "proprietaire",
  "surveyPain": "Le suivi des loyers et des incidents me prend trop de temps.",
  "surveyFeature": "Un dashboard clair avec relances automatiques.",
  "surveyPrice": "29 EUR/mois",
  "notifyOnLaunch": true,
  "source": "website_survey_form",
  "createdAtPreview": "2026-05-19T12:34:56.000Z"
}
```

## DTO backend public recommande

```csharp
public sealed class PublicProductSurveyRequest
{
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Profile { get; set; } = "";
    public string? SurveyPain { get; set; }
    public string? SurveyFeature { get; set; }
    public string? SurveyPrice { get; set; }
    public bool NotifyOnLaunch { get; set; } = true;
    public string? Source { get; set; }
    public DateTimeOffset? CreatedAtPreview { get; set; }
}
```

## Entite / table minimale recommandee

```csharp
public sealed class ProductSurveyResponse
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Profile { get; set; } = "";
    public string? SurveyPain { get; set; }
    public string? SurveyFeature { get; set; }
    public string? SurveyPrice { get; set; }
    public bool NotifyOnLaunch { get; set; }
    public string? Source { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
```

## Validation recommandee

Minimum a valider avant ecriture :

- `fullName` requis
- `email` requis et valide
- `profile` requis
- `notifyOnLaunch` requis

Validation metier utile :

- normaliser `email`
- journaliser `source` si present
- ignorer `createdAtPreview` si la date serveur fait foi
- accepter `surveyPain`, `surveyFeature` et `surveyPrice` vides

## Reponse succes recommandee

HTTP :

```http
201 Created
```

Body conseille :

```json
{
  "message": "Sondage enregistre avec succes.",
  "surveyResponseId": "survey_123"
}
```

Notes :
- le frontend du site sait deja lire `message`
- `surveyResponseId` peut aider pour tracer ou dedoublonner plus tard

## Reponses erreur recommandees

### Validation formulaire

```http
400 Bad Request
```

```json
{
  "message": "Certains champs sont invalides.",
  "errors": [
    "Le nom complet est requis.",
    "L'email est invalide."
  ]
}
```

### Conflit metier

Optionnel, si tu veux limiter les doublons exacts :

```http
409 Conflict
```

```json
{
  "message": "Une reponse existe deja pour cet email."
}
```

### Erreur serveur

```http
500 Internal Server Error
```

```json
{
  "message": "Impossible d'enregistrer le sondage pour le moment."
}
```

## Comportement frontend deja en place

Le site :
- lit `message` sur succes
- lit `message`, `error` ou le premier item de `errors` sur erreur
- fonctionne en mode `pending` tant que l'endpoint n'est pas branche

Variables d'environnement cote site :

```env
NEXT_PUBLIC_APP_URL=https://locativeapp.azurewebsites.net
NEXT_PUBLIC_SURVEY_MODE=live
NEXT_PUBLIC_SURVEY_ENDPOINT=https://locativeapp.azurewebsites.net/api/public/product-survey
```

## Recommendation securite

Pour un endpoint public :

- rate limiting
- journalisation des tentatives
- captcha ou protection anti-bot si exposition ouverte
- eventuel anti-doublon basique sur email + fenetre temporelle
