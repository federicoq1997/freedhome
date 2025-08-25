# Freedhome - Sistema di Gestione Prenotazioni

Sistema full-stack per la gestione delle prenotazioni composto da backend CodeIgniter 4 e frontend Next.js.

## 🛠️ Tecnologie Utilizzate

**Backend:**
- **CodeIgniter 4** - PHP Framework
- **MySQL** - Database
- **MAMP** - Server locale (Apache + MySQL + PHP 8.2)

**Frontend:**
- **Next.js 15.x** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling

## 📁 Struttura del Progetto

```
freedhome/
├── backend/               # API CodeIgniter 4
│   ├── app/
│   │   ├── Controllers/Api
│   │   ├── Database/Migrations
│   │   ├── Models/
│   │   └── Config/
│   └── public/
├── frontend/              # Frontend Next.js
│   └── src/
│       ├── app/
│       ├── components/
│       ├── services/
│       └── types/
└── dev-start.sh          # Script avvio sviluppo
```

## 🚀 Avvio del Progetto

### Prerequisiti
- **MAMP** (per backend PHP 8.2 + MySQL)
- **Node.js 18.x** o superiore
- **npm**

### Setup Completo

1. **Avvia MAMP** e configura:
   - Apache Port: 443
   - MySQL Port: 3306
   - Document Root: `~/backend/public`

2. **Oppure usa lo script automatico:**
   ```bash
   ./dev-start.sh
   ```

### URL di Accesso
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [https://api.freedhome-test.it](https://api.freedhome-test.it)

## ⚖️ Trade-off Tecnici e Decisioni

Durante lo sviluppo sono stati considerati i seguenti trade-off per rispettare i tempi di consegna:

### Backend (CodeIgniter 4)
- **Sfide:** Prima esperienza con CodeIgniter, ma dato che sto sviluppando un framework PHP personalizzato, molti concetti architetturali erano già familiari (MVC, routing..)
- **Scelta MAMP:** Utilizzato per velocità di setup locale

### Frontend (Next.js + React)
- **Sfide:** Prima esperienza con React (provenendo da Vue.js)
- **Strategia di Apprendimento:** 
  - Lettura rapida della documentazione ufficiale per concepts generali
  - Utilizzo di GPT-4o come supporto per comprendere rapidamente funzionalità specifiche (gestione stati, hooks, lifecycle) senza dover leggere per intero tutta la documentazione
  - Sfruttamento delle conoscenze Vue.js per concetti simili (componenti, reattività)

### Database e Setup
- **MySQL + phpMyAdmin:** Scelta per familiarità e velocità di prototipazione
- **Script di Automazione:** Creati per semplificare il setup e l'avvio del progetto

### Ottimizzazioni per il Tempo
1. **Riuso di Conoscenze:** Applicazione di pattern Vue.js ai componenti React
2. **Tooling Moderno:** TypeScript per ridurre errori durante lo sviluppo

