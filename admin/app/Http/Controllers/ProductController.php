<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request; 
use Illuminate\Http\Response; 
use App\Model\User;
use Hash;
use Validator;
use App\Model\Logo;
use App\Helper\vuforiaclient;
use App\Helper\helpers;
use Auth; 
use Session ;
use App\Model\Campaign;
use App\Model\Product;
use App\Model\Inventory;
use App\Model\Directory;
use Illuminate\Support\Facades\Input;
use Carbon\Carbon;
use File;


class ProductController extends Controller {
	
	
	//public function __construct( )
	//{
		//$this->middleware('auth');
		//Auth::logout();
    	//return redirect('auth/login');	
		
	//}

	public function __construct( )
	{
		if($this->middleware('auth'))
		//if(!Auth::user()->id)
		{
			Auth::logout();
    		return redirect('auth/login');	
    	}
		
	}

	public function postList(Request $request)
	{
		//	dd($request->all());
		// Get current logged in user ID
		$created_by=Auth::user()->id;

		// Get current logged in user TYPE
		$type=Auth::user()->type;
		if($request[0]!="")
		{
			$id=$request[0];
			$product=Product::where('status',1)
						  ->where('id',$id)	
						  ->orderBy('id','DESC')					 
						  ->get();	
		}
		else
		{
			if($type==1)
			{	
				$product=Product::where('status',1)
						   ->orderBy('id','DESC')
						   ->orderBy('id','DESC')
						   ->get();		
			}
			else
			{
				$product=Product::where('status',1)
						  ->where('created_by',$created_by)
						  ->orderBy('id','DESC')
						  ->get();
			}
		}
		return $product;	
	}

	public function getDelete($id = Null)
	{		
		$product = Product::find($id);
		
		
		$product->delete();
		if($product->delete())
		{
			return 'success';
		}	
	}

	public function postUploadlogo(Request $request)
	{	
		//dd($_FILES[ 'file' ][ 'name' ]."------".$_FILES[ 'file' ][ 'tmp_name' ]);
		$obj = new helpers();
		$folder_name=env('UPLOADS');
		$file_name=$_FILES[ 'file' ][ 'name' ];
		$temp_path = $_FILES[ 'file' ][ 'tmp_name' ];

		

		if (!file_exists($folder_name)) {			
			$create_folder= mkdir($folder_name, 0777);
			$thumb_path= mkdir($folder_name."/inventory/thumb", 0777);
			$medium_path= mkdir($folder_name."/inventory/medium", 0777);
			$original_path= mkdir($folder_name."/inventory/original", 0777);
		}
		else
		{			
			$thumb_path= env('UPLOADS')."/inventory/thumb"."/";
			$medium_path= env('UPLOADS')."/inventory/medium"."/";
			$original_path= env('UPLOADS')."/inventory/original"."/";
		}


		$extension = pathinfo($file_name, PATHINFO_EXTENSION);
		$new_file_name = time()."_".rand(111111111,999999999).'.'.$extension; // renameing image

		$file_ori = $_FILES[ 'file' ][ 'tmp_name' ];
		
		move_uploaded_file($file_ori, $original_path.$new_file_name);
		
		$obj->createThumbnail($original_path,$thumb_path,env('THUMB_SIZE'));
		$obj->createThumbnail($original_path,$medium_path,env('MEDIUM_SIZE'));		
		
		return $new_file_name;

	}

	public function postStore(Request $request)
	{
		//dd($request->all());
		
		$product_name=$request[0]['product_name'];
		$sell_price=$request[0]['sell_price'];
		$cost=$request[0]['cost'];
		$retail_price=$request[0]['retail_price'];
		$image_id=$request[0]['image_id'];
		$status=1;
		$created_by=Auth::user()->id;
		if($image_id)
		{
			$directory=Directory::find($image_id);

			$product_image=$directory->copy_url;
		}
		else
		{
			$product_image='';
		}
		//dd($product_image);

		// echo $product_name."<br>";
		// echo $sell_price."<br>";
		// echo $cost."<br>";
		// echo $retail_price."<br>";
		// echo $image_id."<br>";
		
		// exit;
		
		//if(file_exists($medium_image_path))
		//{			
			$product = new Product();
			$product->product_name 	= $product_name;	
			$product->sell_price 		= $sell_price;
			$product->cost 			= $cost;	
			$product->retail_price 	= $retail_price;	
			$product->product_image = $product_image;		
			$product->status 			= 1;			
			$product->created_by 		= $created_by;
			if($product->save())
			{
				return 'success';
			}
			else
			{
				return 'error';
			}
		// }
		// else
		// {
		// 	return 'image_not';
		// }
	}
	public function postAddlogo(Request $request)
	{
		//dd($request->all());
		$rules = array(
				'inventory_name'     => 'required',  
				'sell_price'         => 'required',   
				'cost'         		 => 'required',
				'inventory_image'    => 'required'

			);	
		$validator = Validator::make($request->all(), $rules);
		if ($validator->fails()) {				
			$messages = $validator->messages();
			// redirect our user back to the form with the errors from the validator			
			return redirect()->back()
							 ->withInput()
							 ->withErrors($validator);
		}
		else
		{
			$inventory_name=$request->input('inventory_name');
			$sell_price=$request->input('sell_price');
			$cost=$request->input('cost');
			$inventory_image=$request->input('inventory_image');
			//dd("a");
			//dd($request->all());
			// Get current logged in user ID
			$created_by=Auth::user()->id;

			if($inventory_name=="" || $sell_price=="" || $cost=="")
			{
				return 'error';
			}
			else
			{
				$original_path= env('UPLOADS')."/inventory/original"."/".$inventory_image;
				if(file_exists($original_path))
				{
					$campaign = new Inventory();
					$campaign->inventory_name 		= $inventory_name;	
					$campaign->sell_price 		= $sell_price;
					$campaign->cost 		= $cost;	
					$campaign->inventory_image 		= $inventory_image;		
					$campaign->status 			= 1;			
					$campaign->created_by 		= $created_by;
					if($campaign->save())
					{
						return 'success';
					}
					else
					{
						return 'error';
					}
				}
				else
				{
					return 'image_not';
				}
			} //
		}
	}

	public function postEditproduct(Request $request)
	{
		//dd($request[0]['inventory_name']);
		//dd($request->all());
		$product = Product::find($request[0]['id']);
		//dd($request[0]['campaign_name']);

		$product_name=$request[0]['product_name'];
		$sell_price=$request[0]['sell_price'];
		$cost=$request[0]['cost'];
		$retail_price=$request[0]['retail_price'];
		//$updated_at=$request[0]['updated_at'];
		//$campaign_image=$request->input('campaign_image');

		// Get current logged in user ID
		//$created_by=Auth::user()->id;
		if($request[0]['id']=="")
		{
			return 'invalid_id';
		}
		else if($product_name=="" || $sell_price=="" || $cost=="" || $retail_price=="")
		{
			return 'error';
		}
		else
		{			
			
			$product->product_name 	= $product_name;			
			$product->retail_price 		= $retail_price;	
			$product->sell_price 		= $sell_price;	
			$product->cost 			= $cost;			
			if($product->save())
			{
				return 'success';
			}
			else
			{
				return 'error';
			}			
		}
		
	}

	public function postInventorydetails(Request $request)
	{		
		//dd($request[0]);
		
		$id=$request[0];
		$inventory=Inventory::find($id);
		
		return $inventory;	
	}

	public function getShowaddform()
	{
		return view('admin.reedemer.add_inventory');
	}

	public function postStoreaddform(Request $request)
	{	
		$obj = new helpers();
		$folder_name=env('UPLOADS');
		if($_FILES[ 'file' ][ 'name' ]=="")
		{
			return 'error';
		}
		$file_name=$_FILES[ 'file' ][ 'name' ];
		$temp_path = $_FILES[ 'file' ][ 'tmp_name' ];

		

		if (!file_exists($folder_name)) {			
			$create_folder= mkdir($folder_name, 0777);
			$thumb_path= mkdir($folder_name."/inventory/thumb", 0777);
			$medium_path= mkdir($folder_name."/inventory/medium", 0777);
			$original_path= mkdir($folder_name."/inventory/original", 0777);
		}
		else
		{			
			$thumb_path= env('UPLOADS')."/inventory/thumb"."/";
			$medium_path= env('UPLOADS')."/inventory/medium"."/";
			$original_path= env('UPLOADS')."/inventory/original"."/";
		}


		$extension = pathinfo($file_name, PATHINFO_EXTENSION);
		$new_file_name = time()."_".rand(111111111,999999999).'.'.$extension; // renameing image

		$file_ori = $_FILES[ 'file' ][ 'tmp_name' ];
		
		move_uploaded_file($file_ori, "$original_path$new_file_name");
		
		$obj->createThumbnail($original_path,$thumb_path,env('THUMB_SIZE'));
		$obj->createThumbnail($original_path,$medium_path,env('MEDIUM_SIZE'));
		
		$created_by=Auth::user()->id;
		// Get current logged in user TYPE
		$type=Auth::user()->type;

		$inventory_name=$request->get('inventory_name');
		$sell_price=$request->get('sell_price');
		$cost=$request->get('cost');
		$inventory_image=$new_file_name;	

		if($inventory_name=="" || $sell_price=="" || $cost=="" || $inventory_image=="")
		{
			return 'error';
		}
		
		//dd($inventory_name);

		$inven = new Inventory();
		$inven->inventory_name 		= $inventory_name;	
		$inven->sell_price 		= $sell_price;
		$inven->cost 		= $cost;	
		$inven->inventory_image 		= $inventory_image;		
		$inven->status 			= 1;			
		$inven->created_by 		= $created_by;
		$inven->save();
			
			
		$inventory=Inventory::where('status',1)
				  ->where('created_by',$created_by)	
				  ->orderBy('id','DESC')					 
				  ->get();
		$select='<option value="">-- choose an option --</option>';
		foreach($inventory as $inv)
		{			
			$select.='<option value="'.$inv['id'].'" ng-repeat="inventory in inventory_list" >'.$inv['inventory_name'].'</option>';
		}        
		return $select;
	}
}
