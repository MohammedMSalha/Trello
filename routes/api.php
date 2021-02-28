<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JwtAuthController;
use App\Http\Controllers\TicketsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
 
Route::group(
    [
        'middleware' => 'api',
        'namespace'  => 'App\Http\Controllers',
        'prefix'     => 'auth',
    ],
    function ($router) {
        Route::post('login', 'JwtAuthController@login');
        Route::post('register', 'JwtAuthController@register');
        Route::post('logout', 'JwtAuthController@logout');
        Route::post('refresh', 'JwtAuthController@refresh');
        Route::get('tickets', 'TicketsController@index');
        Route::put('tickets/{id}', 'TicketsController@updatePosition');
        Route::post('tickets', 'TicketsController@store');
    }
);
 
