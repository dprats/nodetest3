//UserList data array for filling in info box
var userListData = [];

//DOM ready

$(document).ready(function(){

	//populate the user table on initial page load
	populateTable();

});

//Fill table with data

function populateTable(){
		//empty content string

		var tableContent = '';

		//Jquery AJAX call for JSON
		$.getJSON('/userlist', function( data ){

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
