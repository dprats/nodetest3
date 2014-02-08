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

};
