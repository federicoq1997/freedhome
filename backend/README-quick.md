# Backend - API Sistema di Gestione Prenotazioni

Backend CodeIgniter 4 per il sistema di gestione prenotazioni Freedhome.

## 🛠️ Tecnologie Utilizzate

- **CodeIgniter 4.4.x** - PHP Framework
- **MySQL 8.0+** - Database
- **PHP 8.1+** - Linguaggio di programmazione

## 🚀 Setup e Installazione

### Prerequisiti
- PHP 8.1 o superiore
- MySQL 8.0 o superiore
- Composer

### Installazione
```bash
# Installa dipendenze
composer install

# Configura environment
cp env .env
# Modifica le credenziali del database in .env

# Esegui migrations
php spark migrate

# Inserisci dati di esempio (opzionale)
php spark db:seed BookingSeeder

# Avvia server di sviluppo
php spark serve
```

## 🔗 API Endpoints

### GET /api/bookings
Restituisce tutte le prenotazioni.

### POST /api/bookings
Crea una nuova prenotazione.

**Request Body:**
```json
{
  "name": "Mario Rossi",
  "email": "mario@example.com",
  "date": "2025-08-10"
}
```

Per documentazione completa, vedere file README principale.
