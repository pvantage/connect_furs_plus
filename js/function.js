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
	window.location = 'phone-login.html';
}

$(document).ready(function(e){
	$('input[name="customer_mobile"]').on('keydown', function(){
		$('input[name="customer_mobile"]').removeClass('req');
	});
});