---
runme:
  id: 01HQ49MNVPJ78M11GDF80Y8STJ
  version: v3
---

# Mes-docs (backend)

Mes-docs est un générateur d'ordonnances mis en place pour faciliter et fluidifier l'écriture de prescriptions médicales. Mes-docs permet aussi aux pharmaciens de lire avec plus de facilités les medicaments préscrits.

## Tech Stack

**Server:** Node, Express

## Lancer le projet

Installer les dépendences du backend

```bash {"id":"01HQ49MNVPJ78M11GDF5NAPBGH"}
  cd mes-docs/backend
  npm install
  nodemon server
```

L'API tourne sur le port 5050

## API Références

#### Créer une ordonnance

```http {"id":"01HQ49MNVPJ78M11GDF5NPSCYW"}
  POST /new-prescription
```

| Paramètres | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `docName` | `string` | **Required**. Nom du médecin |
| `profession` | `string` | **Required**. Profession du médecin |
| `docAddress` | `string` | **Required**. Adresse du cabinet du médecin |
| `docCityAndZipCode` | `string` | **Required**. Ville et code postal du cabinet du médecin |
| `docPhone` | `string` | **Required**. Téléphone du cabinet du médecin |
| `generationDate` | `string` | **Required**. Date de génération de l'ordonnance |
| `patientGender` | `string` | **Required**. Genre du patient |
| `patientSName` | `string` | **Required**. Nom de famille du patient |
| `patientFName` | `string` | **Required**. Prénom du patient|
| `patientAge` | `number` | **Required**. Âge du patient |
| `patientWeight` | `number` | **Required**. Poids du patient |
| `prescriptions` | `array` | **Required**. Liste des prescriptions, chaque prescription contient les champs suivants : medication (médication prescrite), dosage (dosage de la médication), instructions (instructions pour la prise de la médication) |

## Auteure

- [@arasolonjatovo](https://www.github.com/arasolonjatovo)

