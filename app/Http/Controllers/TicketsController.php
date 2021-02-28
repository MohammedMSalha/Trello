<?php

namespace App\Http\Controllers;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class TicketsController extends Controller
{




    /**
    * Display a listing of user ticket groupBy status.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $user= new User;
        $userid = Auth::guard('api')->user()->id;
        $data =  User::find($userid)->tickets->groupBy('status');
        return response()->json($data, Response::HTTP_CREATED );   
    }


    /**
     * Update ticket status
     * @param Ticket Id
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updatePosition($id,Request $request){
            $ticket = Ticket::where('id',$id)->where('status','!=',$request->desination)->update(['status'=>$request->desination]);
            if($ticket)
            return response()->json('',Response::HTTP_ACCEPTED); //Ticket Updated
            return response()->json('',Response::HTTP_NO_CONTENT );  // Ticket not updated
    }




    
    /**
     * Store a newly created ticket with deafult status pendding (1)
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {       
        $userid = Auth::guard('api')->user()->id;
        $ticket=new Ticket;
        $ticket->title=$request->title;
        $ticket->description=$request->description;
        $ticket->user_id=$userid;
        $ticket->save();
        return response()->json('Ticket Created',Response::HTTP_CREATED);  // Ticket Created

    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Model\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function show(Ticket $ticket)
    {   
    
           
    }



    


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Model\Ticket  $ticket
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
