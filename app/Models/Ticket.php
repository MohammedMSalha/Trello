<?php

namespace App\Models;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = ['title','description','file'];



    /**
    * Ticket have one user.
    * @version 1.0 
    * @author Mohammed M.Salha
    */
    public function user(){
        return $this->belongsTo(User::class);
    }
}
