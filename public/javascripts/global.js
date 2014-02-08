//UserList data array for filling in info box
var userListData = [];

//DOM ready

$(document).ready(function(){

		
	//populate the user table on initial page load
	populateTable();
	

	$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

});

//Fill table with data

function populateTable(){
		//empty content string


		var tableContent = '';

		
		


		//Jquery AJAX call for JSON
		$.getJSON('/userlist', function( data ){

			userListData = data;

				//for each item in our JSON, add a table row 
				//and cells to the content string
				$.each(data, function(){

					tableContent += '<tr>';
					tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="show Details">' +this.username + '</td>';
					tableContent += '<td>' + this.email +'</td>';
					tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
    		});

				//inject the whole contecnt string into existing HTML table
				$('#userList table tbody').html(tableContent);
		});



};

//Show user info

function showUserInfo(event){

	//prevent link from firing
	event.preventDefault();


	//Retrieve username from link rel attribute
	var thisUserName = $(this).attr('rel');


	//Get index of object based on id value
	var arrayPosition = userListData.map(function(arrayItem){
		return arrayItem.username; }).indexOf(thisUserName);


	

	//Get our user object
	var thisUserObject = userListData[arrayPosition];

	//populate info box

	$('#userInfoName').text(thisUserObject.fullname);
	$('#userInfoAge').text(thisUserObject.age);
	$('#userInfoGender').text(thisUserObject.gender);
	$('#userInfoLocation').text(thisUserObject.location);
	alert(thisUserObject.location);



};

//add user button click

$('#btnAddUser').on('click', adduser);

function adduser(event){
	event.preventDefault;

	//super basic validation
	var errorCount = 0;
	$('#addUser input').each(function(index, val){
		if($(this).val() ==='') {errorCount++}
	});

	if(errorCount === 0){

	//if it is, compile all user info into one object

		var newUser = {
			'username': $('#addUser fieldset input#inputUserName').val(),
			'email': $('#addUser fieldset input#inputUserEmail').val(),
			'fullname': $('#addUser fieldset input#inputUserFullname').val(),
			'location': $('#addUser fieldset input#inputUserLocation').val(),
			'age': $('#addUser fieldset input#inputUserAge').val(),
			'gender': $('#addUser fieldset input#inputUserGender').val()		
		}

		//user AJAX to post the object to our adduser service

		$.ajax({
			type: 'POST',
			data: newUser,
			url: '/adduser',
			dataType: 'JSON'
		}).done(function ( response){

			//check if for successful (blank) response
			if (response.msg === '') {

				// clear the form inputs
				$('#addUser fieldset input').val('');		

				//Update the table
				populateTable();
			}
			else {

				//if something goes wrong, alert the error message that 
				//our service returned
				alert('Error:' + response.msg);
			}

		});

	}

	else {

		//if errorCount is more than 0, erorr out
		alert('Please Fill in all the fields');
		return false;
	}
};