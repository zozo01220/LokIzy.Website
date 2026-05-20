# Contrat API - Inscription Free

Ce document prepare le contrat du futur endpoint public d'inscription `Free` pour Lok Izy.

Objectif :
- permettre au site vitrine d'envoyer une inscription self-service
- creer une `Organization` en plan `Free`
- creer le compte `Owner` principal associe
- rester compatible avec `OrganizationService.CreateOrganizationWithOwnerAsync(...)`

Source backend de reference :
- `LocativeApp_V2/Services/OrganizationService.cs`
- DTO cible : `OrganizationCreationRequest`

## Endpoint recommande

```http
POST /api/public/register-free
Content-Type: application/json
Accept: application/json
```

Nom possible complet si heberge sur l'app :

```txt
https://app.lok-izy.fr/api/public/register-free
```

## Requete JSON

Le frontend du site est deja prepare pour envoyer ce payload en `camelCase`.

```json
{
  "plan": "Free",
  "organizationName": "Horizon Gestion",
  "legalName": "Horizon Gestion SARL",
  "contactFirstName": "Laura",
  "contactLastName": "Prieur",
  "contactEmail": "laura@horizon.ch",
  "contactPhone": "+41 79 000 00 00",
  "billingEmail": "laura@horizon.ch",
  "registrationNumber": null,
  "ownerDisplayName": "Laura Prieur",
  "ownerEmail": "laura@horizon.ch",
  "ownerPassword": "MotDePasseTresFort123!",
  "companyName": "Horizon Gestion",
  "taxId": null,
  "addressLine1": null,
  "addressLine2": null,
  "postalCode": null,
  "city": null,
  "country": null,
  "notes": "Demande provenant du site marketing"
}
```

## Mapping attendu vers `OrganizationCreationRequest`

Le contrat frontend est deja aligne sur le DTO backend existant :

```csharp
public sealed class OrganizationCreationRequest
{
    public string OrganizationName { get; set; } = "";
    public string LegalName { get; set; } = "";
    public string ContactFirstName { get; set; } = "";
    public string ContactLastName { get; set; } = "";
    public string ContactEmail { get; set; } = "";
    public string? ContactPhone { get; set; }
    public string? BillingEmail { get; set; }
    public string? RegistrationNumber { get; set; }
    public string Plan { get; set; } = "Free";
    public string OwnerDisplayName { get; set; } = "";
    public string OwnerEmail { get; set; } = "";
    public string OwnerPassword { get; set; } = "";
    public string? CompanyName { get; set; }
    public string? TaxId { get; set; }
    public string? AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string? PostalCode { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public string? Notes { get; set; }
}
```

Avec `System.Text.Json`, le plus simple est de garder les memes noms en PascalCase dans le DTO C# et de laisser la serialisation JSON accepter le `camelCase`.

## Validation recommandee

Minimum a valider avant appel du service :

- `plan` doit valoir `Free`
- `organizationName` requis
- `contactFirstName` requis
- `contactLastName` requis
- `contactEmail` requis et valide
- `ownerEmail` requis et valide
- `ownerPassword` requis, longueur mini 8

Validation metier utile :

- `ownerEmail` et `contactEmail` peuvent etre identiques
- forcer `plan = "Free"` meme si le client envoie autre chose
- refuser si organisation deja existante sur le slug
- refuser si utilisateur deja existant sur `ownerEmail`

## Reponse succes recommandee

HTTP :

```http
201 Created
```

Body conseille :

```json
{
  "message": "Compte Free cree avec succes.",
  "organizationId": "org_123",
  "organizationName": "Horizon Gestion",
  "plan": "Free",
  "ownerEmail": "laura@horizon.ch",
  "loginUrl": "https://app.lok-izy.fr/Account/Login"
}
```

Notes :
- le frontend du site sait deja lire `message`
- `loginUrl` est pratique pour une redirection ou un CTA post-inscription

## Reponses erreur recommandees

### Validation formulaire

```http
400 Bad Request
```

```json
{
  "message": "Certains champs sont invalides.",
  "errors": [
    "Le nom de l'organisation est requis.",
    "Le mot de passe doit contenir au moins 8 caracteres."
  ]
}
```

### Conflit metier

```http
409 Conflict
```

```json
{
  "message": "Un utilisateur existe deja avec cet email owner."
}
```

Ou :

```json
{
  "message": "Une organisation avec ce nom existe deja."
}
```

### Erreur serveur

```http
500 Internal Server Error
```

```json
{
  "message": "Impossible de creer le compte pour le moment."
}
```

## Comportement frontend deja en place

Le site :
- lit `message` sur succes
- lit `message`, `error` ou le premier item de `errors` sur erreur
- fonctionne en mode `pending` tant que l'endpoint n'est pas branche

Variables d'environnement cote site :

```env
NEXT_PUBLIC_APP_URL=http://vps-1da1a09d.vps.ovh.net:5000
NEXT_PUBLIC_REGISTRATION_MODE=live
NEXT_PUBLIC_REGISTRATION_ENDPOINT=https://app.lok-izy.fr/api/public/register-free
```

## Proposition de DTO backend public

Tu peux reutiliser directement `OrganizationCreationRequest`, ou definir un DTO public dedie pour verrouiller le contrat :

```csharp
public sealed class PublicRegisterFreeRequest
{
    public string Plan { get; set; } = "Free";
    public string OrganizationName { get; set; } = "";
    public string LegalName { get; set; } = "";
    public string ContactFirstName { get; set; } = "";
    public string ContactLastName { get; set; } = "";
    public string ContactEmail { get; set; } = "";
    public string? ContactPhone { get; set; }
    public string? BillingEmail { get; set; }
    public string? RegistrationNumber { get; set; }
    public string OwnerDisplayName { get; set; } = "";
    public string OwnerEmail { get; set; } = "";
    public string OwnerPassword { get; set; } = "";
    public string? CompanyName { get; set; }
    public string? TaxId { get; set; }
    public string? AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string? PostalCode { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public string? Notes { get; set; }
}
```

Mapping recommande :

```csharp
var creationRequest = new OrganizationCreationRequest
{
    Plan = "Free",
    OrganizationName = request.OrganizationName,
    LegalName = request.LegalName,
    ContactFirstName = request.ContactFirstName,
    ContactLastName = request.ContactLastName,
    ContactEmail = request.ContactEmail,
    ContactPhone = request.ContactPhone,
    BillingEmail = request.BillingEmail,
    RegistrationNumber = request.RegistrationNumber,
    OwnerDisplayName = request.OwnerDisplayName,
    OwnerEmail = request.OwnerEmail,
    OwnerPassword = request.OwnerPassword,
    CompanyName = request.CompanyName,
    TaxId = request.TaxId,
    AddressLine1 = request.AddressLine1,
    AddressLine2 = request.AddressLine2,
    PostalCode = request.PostalCode,
    City = request.City,
    Country = request.Country,
    Notes = request.Notes
};
```

## Recommendation securite

Pour un endpoint public :

- rate limiting
- journalisation des tentatives
- captcha ou protection anti-bot si exposition ouverte
- eventuelle verification email avant activation complete
- ne jamais laisser le client choisir librement un plan autre que `Free`
