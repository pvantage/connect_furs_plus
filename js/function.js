var siteurl = 'http://localhost/connect_furs_plus/index.php?route=';

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
			
			/*if(data['success']['redirect'] == 1)
			{
				localStorage.setItem('cust_id', data['success']['id']);	
				window.location = 'select_info.html';
				
			}else if(data['success']['redirect'] == 2)
			{
				
				localStorage.setItem('cust_id', data['success']['id']);	
				window.location = 'profile-info.html';
			}else{
				localStorage.setItem('cust_id', data['success']['id']);	
				window.location = 'swipe.html';
			}*/
		}
		
		if(data['error'])
		{
			$('#customer_mobile').addClass('req');
		}
	 }
   });
	//
}

function validateOtp(){
	var customer_mob = $('#customer_mob').val();
	var customer_otp = $('#customer_otp').val();
	var action_url = siteurl + 'account/login/otp';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {customer_mobile:customer_mob,otp:customer_otp},
	 crossDomain: true,
	 success: function(data){
		
	   	if(data['success'])
		{
			$('#mobile_no_container').remove();
			$('#customer_mob').val(data['success']['no']);
			$('#otp_container').show();
			
			if(data['success']['redirect'] == 1)
			{
				localStorage.setItem('cust_id', data['success']['id']);
				window.location = 'select_info.html';
				
			}else if(data['success']['redirect'] == 2)
			{
				localStorage.setItem('cust_id', data['success']['id']);
				window.location = 'profile-info.html';
			}else{
				localStorage.setItem('cust_id', data['success']['id']);
				window.location = 'swipe.html';
			}
		}
		
		if(data['error'])
		{
			$('#customer_otp').addClass('req');
			alert(data['error']['otp']);
		}
	 }
   });
}

function checkLogin(){
	if(localStorage.getItem("cust_id") == null) window.location = 'phone-login.html';
}

$(document).ready(function(e){
	$('input[name="customer_mobile"]').on('keydown', function(){
		$('input[name="customer_mobile"]').removeClass('req');
	});
});