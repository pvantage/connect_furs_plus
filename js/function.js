var siteurl = 'http://connectfursplus.vantageappspro.com/index.php?route=';

function gup(sParam){
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

   for(i = 0; i < sURLVariables.length; i++){
        sParameterName = sURLVariables[i].split('=');

        if(sParameterName[0] === sParam){
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function getTemperament(select_id, user_id)
{
	var action_url = siteurl + 'common/common';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {user_id:user_id},
	 crossDomain: true,
	 success: function(data){
	   	if(data['success'])
		{
			$('#' + select_id).html(data['success']);
		}
	 }
   });
}

function getCategory(select_id, user_id)
{
	var action_url = siteurl + 'common/common/category';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {user_id:user_id},
	 crossDomain: true,
	 success: function(data){
	   	if(data['success'])
		{
			$('#' + select_id).html(data['success']);
		}
	 }
   });
}

function loginNow(){
	var customer_mobile = $('#customer_mobile').val();
	var action_url = siteurl + 'account/login';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {customer_mobile:customer_mobile},
	 crossDomain: true,
	 success: function(data){	 
		
	   	if(data['success'])
		{
			$('#mobile_no_container').remove();
			$('#customer_mob').val(data['success']['no']);
			$('#otp_container').show();			
		}
		
		if(data['error'])
		{
			$('#customer_mobile').addClass('req');
		}
	 }
   });
	//
}

function checkLogin(){
	if(localStorage.getItem("cust_id") == null) window.location = 'phone-login.html';
}

function logOut(){
	localStorage.removeItem('cust_id');
	window.location = 'phone-login.html';
}

$(document).ready(function(e){
	$('input[name="customer_mobile"]').on('keydown', function(){
		$('input[name="customer_mobile"]').removeClass('req');
	});
});