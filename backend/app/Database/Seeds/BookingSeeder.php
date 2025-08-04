<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use App\Models\BookingModel;

class BookingSeeder extends Seeder
{
    public function run()
    {
        $bookingModel = new BookingModel();
        
        $data = [
            [
                'name' => 'Mario Rossi',
                'email' => 'mario.rossi@example.com',
                'from' => '2025-08-10',
                'to' => '2025-08-14',
            ],
            [
                'name' => 'Giulia Bianchi',
                'email' => 'giulia.bianchi@example.com',
                'from' => '2025-08-12',
                'to' => '2025-08-20',
            ],
            [
                'name' => 'Francesco Verdi',
                'email' => 'francesco.verdi@example.com',
                'from' => '2025-08-15',
                'to' => '2025-08-16',
            ],
            [
                'name' => 'Lucia Neri',
                'email' => 'lucia.neri@example.com',
                'from' => '2025-08-18',
                'to' => '2025-08-27',
            ],
            [
                'name' => 'Alessandro Ferrari',
                'email' => 'alessandro.ferrari@example.com',
                'from' => '2025-08-20',
                'to' => '2025-08-30',
            ],
        ];

        // Insert each booking to trigger code generation
        foreach ($data as $booking) {
            $bookingModel->insert($booking);
        }
    }
}
