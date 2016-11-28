import React from 'react';
import $ from 'jquery';

class ListOfBooks extends React.Component {

  constructor(props) {
    super(props);
	this.state = {books : []};
	this.getBooks = this.getBooks.bind(this);
	this.getBooks(); 
	
	this.handleEdit.bind(this);
	
  }
	handleEdit(bookId, event) {
		var objectToSave = this.state.books.find(book => book.id === bookId);
		
		$.ajax({
            type: "POST",
			contentType: "application/json",
			data: JSON.stringify(objectToSave),
            url: 'http://localhost:8080/addBook',
			success: function(data){
				console.log("ajax succeeded");
			},
			error : function(error){
				console.log("ajax error");
			}
        });
	 event.preventDefault();
	}
	handleDelete(bookId, event) {
		
		$.ajax({
            type: "GET",
			contentType: "application/json",
            url: 'http://localhost:8080/deleteBook?id=' + bookId,
			success: function(data){
				console.log("ajax succeeded");
				var allBooks = this.state.books;
				for (var n = 0 ; n < allBooks.length ; n++) {
					if (allBooks[n].id == bookId) {
					  var removedObject = allBooks.splice(n,1);
					  removedObject = null;
					  break;
					}
				}
				this.setState({books: allBooks});
			}.bind(this),
			error : function(error){
				console.log("ajax error");
			}
        });
		event.preventDefault();
	}
	
	handleNameChange(bookId, event) {
		$.each(this.state.books, function() {
			if (this.id == bookId) {
			
				this.name = event.target.value;
			}
		});
	}
	
	handlePagesChange(bookId, event) {
		$.each(this.state.books, function() {
			if (this.id == bookId) {
				
				this.pages = event.target.value;
			}
		});
	}
	
  getBooks() {
	$.ajax({
            type: "GET",
			contentType: "application/json; charset=utf-8",
            url: 'http://localhost:8080/books'
        }).done(function (data) {
			console.log(data);
			this.setState({books: data});
		}.bind(this));
  }
  
  render() {
    return (<ul> Book list : 
				{this.state.books.map(function(book) {
					return <li key={book.id}>id : {book.id}
					| name : <input type="text" defaultValue={book.name} onChange={this.handleNameChange.bind(this, book.id)} />
					| pages: <input type="number" defaultValue={book.pages} onChange={this.handlePagesChange.bind(this, book.id)}  />
					| <button onClick={this.handleEdit.bind(this, book.id)}>Edit</button>
					| <button onClick={this.handleDelete.bind(this, book.id)}>Delete</button></li>
				}.bind(this))} 
			</ul>);
  }

}

export default ListOfBooks;