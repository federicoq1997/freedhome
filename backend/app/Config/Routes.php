<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// API Routes - no prefix needed since domain already indicates API
// Bookings endpoints
$routes->get('bookings', 'Api\BookingsController::index');
$routes->post('bookings', 'Api\BookingsController::create');
$routes->get('bookings/by-code/(:any)', 'Api\BookingsController::findByShortCode/$1');
$routes->get('bookings/(:num)', 'Api\BookingsController::show/$1');

// Handle preflight OPTIONS requests for CORS
$routes->options('bookings', function() {
    return response()->setStatusCode(200);
});
$routes->options('bookings/(:any)', function() {
    return response()->setStatusCode(200);
});
