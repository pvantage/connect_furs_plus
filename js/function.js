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
	var customer_mobile = $('input[name="customer_mobile"]').val();
	var action_url = siteurl + 'account/login';
	
	var device_platform = device.platform;
	var device_reg_id = device.uuid;
				
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {customer_mobile:customer_mob, latitude: lat, longitude:longi, device_type: device_platform, device_reg_id:device_reg_id},
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

function getState(select_val)
{
	var action_url = siteurl + 'common/common/getState';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {select_val:select_val},
	 crossDomain: true,
	 success: function(data){
	   	if(data['success'])
		{
			$('#state').html(data['success']);
		}
	 }
   });
}

function getCity(select_val, state_id)
{
	var action_url = siteurl + 'common/common/getCity';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {select_val:select_val, state_id:state_id},
	 crossDomain: true,
	 success: function(data){
	   	if(data['success'])
		{
			$('#city').html(data['success']);
		}
	 }
   });
}

function checkLogin(){
	
	if(localStorage.getItem("cust_id") == null) window.location = 'phone-login.html';
}

function logOut(){
	localStorage.removeItem('cust_id');
	cordova.plugins.notification.badge.clear();
	window.location = 'phone-login.html';
}

function chatMessage(current_user){
	var action_url = siteurl + 'account/chat/message';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {login_id:current_user},
	 crossDomain: true,
	 success: function(data){
	   	if(data['success'])
		{
			cordova.plugins.notification.badge.set(parseInt(data['success']));
			var show_chat_msg = '<div class="alertbox alert alert-danger alert-dismissible"><a href="your-connections.html">You have new chat message....</a>';
			
      show_chat_msg += '<button type="button" class="close" data-dismiss="alert">&times;</button></div>';
	  
			$('#bottom_bar').after(show_chat_msg);
		}else{
			cordova.plugins.notification.badge.clear();
		}
	 }
   });
}

$(document).ready(function(e){
	$('input[name="customer_mobile"]').on('keydown', function(){
		$('input[name="customer_mobile"]').removeClass('req');
	});
});