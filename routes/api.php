<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('auth')->group(function () {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::get('refresh', 'AuthController@refresh');    
    
    Route::group(['middleware' => 'auth:api'], function(){
        Route::get('user', 'AuthController@user');
        Route::post('logout', 'AuthController@logout');
    });
});

Route::group(['middleware' => 'auth:api'], function(){
    // Users
    Route::get('users', 'UserController@index')->middleware('isAdmin');
    Route::get('users/{id}', 'UserController@show')->middleware('isAdminOrSelf');
    //Test
    Route::delete('/user/{id}','AdminController@delete')->middleware('isAdmin');
    Route::post('/terima/{id}','AdminController@terima')->middleware('isAdmin');
    //Get Custom Payload
    Route::get('user/getcustompayloads','UserController@seeToken');
});

// menambahkan route untuk person
// Route::get('/person','PersonController@all');
// Route::get('/person/{id}','PersonController@show');
// Route::post('/person','PersonController@store');
// Route::put('/person/{id}','PersonController@update');
// Route::delete('/person/{id}','PersonController@delete');
// Route::delete('/person/{id}','AdminController@delete');