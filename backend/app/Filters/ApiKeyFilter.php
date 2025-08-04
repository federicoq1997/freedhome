<?php
namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class ApiKeyFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $apiKey = $request->getHeaderLine('Api-Key');
				$token = $request->getHeaderLine('Token');
        
        $validKeys = [
            'e70f0c05-9207-4ed6-ace1-0b4b5d0cc028'
        ];
        $validTokens = [
            'ebe6591d-1a32-475b-9a9a-f84643fba23c'
        ];
        $isNotValidApiKey = empty($apiKey) || !in_array($apiKey, $validKeys);
				$isNotValidToken = empty($token) || !in_array($token, $validTokens);
        if ($isNotValidApiKey || $isNotValidToken) {
            return service('response')
                ->setJSON([
                    'success' => false,
                    'message' => 'API Key o Token non validi o mancanti.'
                ])
                ->setStatusCode(401);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null){}
}