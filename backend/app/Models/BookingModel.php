<?php

namespace App\Models;

use CodeIgniter\Model;

class BookingModel extends Model
{
    protected $table = 'bookings';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = true;
    protected $protectFields = true;
    protected $allowedFields = ['code', 'short_code', 'name', 'email', 'from', 'to'];
    protected bool $allowEmptyInserts = false;
    // Dates
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

    // Validation
    protected $validationRules = [
        'name' => 'required|min_length[2]|max_length[255]',
        'email' => 'required|valid_email|max_length[255]',
        'from' => 'required|valid_date[Y-m-d]',
        'to' => 'required|valid_date[Y-m-d]'
    ];

    protected $validationMessages = [
        'name' => [
            'required' => 'Il nome è obbligatorio',
            'min_length' => 'Il nome deve essere di almeno 2 caratteri',
            'max_length' => 'Il nome non può superare i 255 caratteri'
        ],
        'email' => [
            'required' => "L'email è obbligatoria",
            'valid_email' => 'Formato email non valido',
            'max_length' => "L'email non può superare i 255 caratteri"
        ],
        'from' => [
            'required' => 'La data di inizio è obbligatoria',
            'valid_date' => 'Formato data non valido (YYYY-MM-DD)'
        ],
        'to' => [
            'required' => 'La data di fine è obbligatoria',
            'valid_date' => 'Formato data non valido (YYYY-MM-DD)'
        ]
    ];

    protected $skipValidation = false;
    protected $cleanValidationRules = true;
    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert = ['generateCodes','validateDates'];
    protected $afterInsert = [];
    protected $beforeUpdate = [];
    protected $afterUpdate = [];
    protected $beforeFind = [];
    protected $afterFind = [];
    protected $beforeDelete = [];
    protected $afterDelete = [];

    protected function validateDates(array $data): array
    {
        if (isset($data['data']['from'], $data['data']['to'])) {
            if (strtotime($data['data']['to']) <= strtotime($data['data']['from'])) {
                throw new \InvalidArgumentException('La data di fine deve essere successiva a quella di inizio');
            }
        }
        
        return $data;
    }
    /**
     * Generate UUID and short code before insert
     */
    protected function generateCodes(array $data)
    {
        if (isset($data['data'])) {
            // Generate UUID
            $data['data']['code'] = $this->generateUUID();

            // Generate short code
            $data['data']['short_code'] = $this->generateShortCode();
        }

        return $data;
    }

    /**
     * Generate UUID v4
     */
    private function generateUUID(): string
    {
        return sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xFFFF), mt_rand(0, 0xFFFF),
            mt_rand(0, 0xFFFF),
            mt_rand(0, 0xFFF) | 0x4000,
            mt_rand(0, 0x3FFF) | 0x8000,
            mt_rand(0, 0xFFFF), mt_rand(0, 0xFFFF), mt_rand(0, 0xFFFF)
        );
    }

    /*
     * returns an alphanumeric code of the specified length
     */
    private function getAlphanumericCode($length = 7): string
    {
        $code = array();
        $c = '';
        for ($i = 0; $i < $length; $i++) {
            $code[0] = rand(1, 9);
            $code[1] = chr(rand(97, 122));
            $c .= $code[rand(0, 1)];
        }
        return $c;
    }

    /**
     * Generate short code in format FH-XXXXXXX
     */
    private function generateShortCode(): string
    {
        $attempts = 0;
        $maxAttempts = 10;

        do {
            $code = 'FH-'.strtoupper($this->getAlphanumericCode());
            // Check if code already exists
            $existing = $this->where('short_code', $code)->first();
            $attempts++;
        } while ($existing && $attempts < $maxAttempts);

        if ($attempts >= $maxAttempts) {
            throw new \Exception('Unable to generate unique short code');
        }

        return $code;
    }

    /**
     * Find booking by short code
     */
    public function findByShortCode(string $shortCode)
    {
        return $this->where('short_code', $shortCode)->first();
    }

    /**
     * Find booking by UUID code
     */
    public function findByCode(string $code)
    {
        return $this->where('code', $code)->first();
    }
    /**
     * Find bookings that overlap with the given date range
     */
    public function findByDates(string $from, string $to)
    {
        // Convert dates to Y-m-d format if needed
        $fromDate = date('Y-m-d', strtotime($from));
        $toDate = date('Y-m-d', strtotime($to));
        
        return $this->where("? <= `to`", [$fromDate])
                    ->where("? >= `from`", [$toDate])
                    ->findAll();
    }
}
