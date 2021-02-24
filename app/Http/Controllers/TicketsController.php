<?php

namespace App\Http\Controllers;
use App\Models\Ticket;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class TicketsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /*$ticket=new Ticket;
        $ticket->title=$request->title;
        $ticket->details=$request->description;
        $ticket->price=$request->file;
        $product->save();
        return response(
            '',Response::HTTP_CREATED 
        );*/
    }






    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Model\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Ticket $ticket)
    {   
    
           
    }





    /**
     * Update the specified resource in storage (Ticket Status).
     *
     * @param  int  $id
     * @return Response
     * @author Mohammed M.Salha
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate(['status' => 'required|between:1,4|integer', 'cat' => 'required', 'desc' => 'required']);

        if (!$validatedData)
        {
            return Redirect::back()->withErrors($validatedData);
        }
        $ticket = Ticket::find($id);
        if ($ticket == null)
        {
           //return response error
        }
        $ticket->status = $request->status;
        $ticket->save();
        return redirect()
            ->back()
            ->withSuccess('Success,ticket Moved ^_^');
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Model\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ticket $ticket)
    {
        /*$ticket->delete();
        return response(
            null,
            Response::HTTP_NO_CONTENT   
        );*/
    }
}
