<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\BookingModel;
use CodeIgniter\HTTP\ResponseInterface;

class BookingsController extends BaseController
{
    protected $bookingModel;

    public function __construct()
    {
        $this->bookingModel = new BookingModel();
        
        // Enable CORS for all requests
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        
        // Handle preflight OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }

    /**
     * Get all bookings
     * GET /api/bookings
     */
    public function index()
    {
        try {
            $bookings = $this->bookingModel->orderBy('created_at', 'DESC')->findAll();
            
            return $this->response->setJSON([
                'success' => true,
                'data' => $bookings
            ]);
        } catch (\Exception $e) {
            return $this->response
                ->setStatusCode(500)
                ->setJSON([
                    'success' => false,
                    'message' => 'Errore nel recupero delle prenotazioni',
                    'error' => $e->getMessage()
                ]);
        }
    }

    /**
     * Create a new booking
     * POST /api/bookings
     */
    public function create()
    {
        try {
            $request = $this->request->getJSON(true);
            
            if (empty($request)) {
                return $this->response
                    ->setStatusCode(400)
                    ->setJSON([
                        'success' => false,
                        'message' => 'Dati non forniti o formato JSON non valido'
                    ]);
            }

            // Validate from is not in the past
            if (isset($request['from']) && isset($request['to'])) {
                $bookingDateFrom = new \DateTime($request['from']);
                $bookingDateTo = new \DateTime($request['to']);
                $today = new \DateTime('today');

                if ($bookingDateFrom < $today) {
                    return $this->response
                        ->setStatusCode(400)
                        ->setJSON([
                            'success' => false,
                            'message' => 'La data di inizio non può essere nel passato',
                            'errors' => ['from' => ['La data di inizio non può essere nel passato']]
                        ]);
                }
                if ($bookingDateTo < $today || $bookingDateTo < $bookingDateFrom) {
                    return $this->response
                        ->setStatusCode(400)
                        ->setJSON([
                            'success' => false,
                            'message' => 'La data di fine non può essere nel passato',
                            'errors' => ['to' => ['La data di fine non può essere nel passato']]
                        ]);
                }
            }

            $bookingId = $this->bookingModel->insert($request);
            
            if ($bookingId === false) {
                $errors = $this->bookingModel->errors();
                return $this->response
                    ->setStatusCode(400)
                    ->setJSON([
                        'success' => false,
                        'message' => 'Errore nella validazione dei dati',
                        'errors' => $errors
                    ]);
            }

            $booking = $this->bookingModel->find($bookingId);
            
            return $this->response
                ->setStatusCode(201)
                ->setJSON([
                    'success' => true,
                    'message' => 'Prenotazione creata con successo',
                    'data' => $booking
                ]);
                
        } catch (\Exception $e) {
            return $this->response
                ->setStatusCode(500)
                ->setJSON([
                    'success' => false,
                    'message' => 'Errore interno del server',
                    'error' => $e->getMessage()
                ]);
        }
    }

    /**
     * Get a specific booking
     * GET /api/bookings/{id}
     */
    public function show($id = null)
    {
        try {
            $booking = $this->bookingModel->find($id);
            
            if (!$booking) {
                return $this->response
                    ->setStatusCode(404)
                    ->setJSON([
                        'success' => false,
                        'message' => 'Prenotazione non trovata'
                    ]);
            }
            
            return $this->response->setJSON([
                'success' => true,
                'data' => $booking
            ]);
        } catch (\Exception $e) {
            return $this->response
                ->setStatusCode(500)
                ->setJSON([
                    'success' => false,
                    'message' => 'Errore nel recupero della prenotazione',
                    'error' => $e->getMessage()
                ]);
        }
    }

    /**
     * Get booking by short code
     * GET /api/bookings/by-code/{short_code}
     */
    public function findByShortCode($shortCode = null)
    {
        try {
            if (!$shortCode) {
                return $this->response
                    ->setStatusCode(400)
                    ->setJSON([
                        'success' => false,
                        'message' => 'Codice prenotazione richiesto'
                    ]);
            }

            $booking = $this->bookingModel->findByShortCode($shortCode);
            
            if (!$booking) {
                return $this->response
                    ->setStatusCode(404)
                    ->setJSON([
                        'success' => false,
                        'message' => 'Prenotazione non trovata con questo codice'
                    ]);
            }
            
            return $this->response->setJSON([
                'success' => true,
                'data' => $booking
            ]);
        } catch (\Exception $e) {
            return $this->response
                ->setStatusCode(500)
                ->setJSON([
                    'success' => false,
                    'message' => 'Errore nel recupero della prenotazione',
                    'error' => $e->getMessage()
                ]);
        }
    }
}
