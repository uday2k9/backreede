<script src="//code.jquery.com/jquery-1.12.0.min.js"></script> 
<link href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<link rel="stylesheet" href="{{ asset('/css/vendors.min.cc72de2f21cf6e67f523.css') }}">
<link rel="stylesheet" href="{{ asset('/css/demo.min.a2f360834fafcc0ef2d1.css') }}">
<link rel="stylesheet" href="{{ asset('/css/custom.css') }}">

  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  

<div class="p-l-20 p-r-20 p-b-20" id="show_message" style="display:none">
<div id="success_div" class="alert alert-success">
    
</div>
 <div id="error_div" class="alert alert-danger">
    
</div>
</div>
<div class="col-md-12">	
	<div class="col-md-12">
		<div class="container">
		  <h2>Add Campaign</h2>
		  <form id="uploadimage" action="" method="post" enctype="multipart/form-data">
			<input type="hidden" name="_token" value="{{ csrf_token() }}">	
			<input type="hidden" name="site_path" id="site_path" value="{{ env('SITE_PATH') }}">
		    <div class="form-group">
		      <label class="control-label col-sm-2" for="inventory_name">Campaign Name:</label>
		      <div class="col-sm-10">
		        <input id="c_name" name="c_name" class="mdl-textfield__input" type="text" placeholder="Name" id="c_name" />
		      </div>
		    </div>
		    <div class="form-group">
		      <label class="control-label col-sm-2" for="inventory_image">Start Date:</label>
		      <div class="col-sm-10">          
		        <input name="c_s_date" class="mdl-textfield__input" type="text" id="c_s_date" readonly placeholder="Start Date" />
		      </div>
		    </div>
		    <div class="form-group">
		      <label class="control-label col-sm-2" for="sell_price">End date:</label>
		      <div class="col-sm-10">          
		        <input name="c_e_date" class="mdl-textfield__input" type="text" id="c_e_date" readonly placeholder="End Date" />
		      </div>
		    </div>
		    
		    <div class="form-group">        
		      <div class="col-sm-offset-2 col-sm-10">
		        <button type="button" onclick="addInventory()"  class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" id="add_inventory">
				Save
				</button> 
		      </div>
		    </div>
		  </form>
		</div>
	</div>	
</div>
<script>
	$( document ).ready(function() {
	    var dateToday = new Date();
	    $( "#c_s_date" ).datepicker({ 

	      dateFormat:"mm/dd/yy",
	      minDate: dateToday,
	      onSelect: function (selected) {
	          var dt = new Date(selected);
	          dt.setDate(dt.getDate() + 1);
	          $("#c_e_date").datepicker("option", "minDate", dt);
	      }
	    });

	    $( "#c_e_date" ).datepicker({
	        dateFormat:"mm/dd/yy",
	        minDate: dateToday,
	        onSelect: function (selected) {
	            var dt = new Date(selected);
	            dt.setDate(dt.getDate() - 1);
	            $("#c_s_date").datepicker("option", "maxDate", dt);
	        }
	    });
	});

	

	function addInventory() 
	{		
		var c_name = $('#c_name').val();
        var c_s_date_raw = $('#c_s_date').val().split('/');
        var c_e_date_raw = $('#c_e_date').val().split('/');
        //var token = $('#_token').val();

        // if(!$('input[type=file]')[0].files[0])
        // {
        // 	 $("#error_div").hide();
        //      $("#show_message").slideDown();
        //      $("#error_div").html("Please insert all fields.");
        //      $("#error_div").show();
        //      $("#success_div").hide();

        //      return false;
        // }
        //var data = $('#date').text();
		var c_s_date = c_s_date_raw[2]+"-"+c_s_date_raw[0]+"-"+c_s_date_raw[1];
		var c_e_date = c_e_date_raw[2]+"-"+c_e_date_raw[0]+"-"+c_e_date_raw[1];
		//alert(c_s_date);
		//return false;

		var formData = new FormData();
		//formData.append('file', $('input[type=file]')[0].files[0]);
		formData.append('c_name', c_name);
		formData.append('c_s_date', c_s_date);
		formData.append('c_e_date', c_e_date);
		//formData.append('_token', token);
		$.ajax({
			url: "../campaign/addcampajax", // Url to which the request is send
			type: "POST",             // Type of request to be send, called as method
			data:  formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
			contentType: false,       // The content type used when sending data to the server.
			cache: false,             // To unable request pages to be cached
			processData:false,        // To send DOMDocument or non processed data file it is set to false
			success: function(data)   // A function to be called if request succeeds
			{	
				//alert(JSON.stringify(data.camp_min_date,null,4));
				//return false;
				if(data=="error")
				{
				  $("#error_div").hide();
	              $("#show_message").slideDown();
	              $("#error_div").html("Please insert all fields.");
	              $("#error_div").show();
	              $("#success_div").hide();
				}
				else
				{
					parent.$("#campaign_id").html(data.select);
					parent.$('#camp_min_date').val(data.camp_min_date); 
					parent.$('#camp_max_date').val(data.camp_max_date); 
					//parent.$(".inventory_cost").val('');
					//parent.$(".selling_price_class").val('');				
					//parent.$('.inventory_image_class').attr('src',site_path+'../uploads/no-image-found.gif');				
		           	parent.$.fancybox.close();
		        }
			}
		});		
	}
</script>