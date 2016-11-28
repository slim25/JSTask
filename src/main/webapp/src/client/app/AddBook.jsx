import React from 'react';
import $ from 'jquery';

class AddBook extends React.Component {
 
 constructor(props) {
	super(props);
	this.state = {newBook : {name: '', pages: ''}};
	
    this.handleSubmit = this.handleSubmit.bind(this);
	 this.handleChangePages = this.handleChangePages.bind(this);
	  this.handleChangeName = this.handleChangeName.bind(this);
 }
 
  handleChangePages(event) {
    this.setState({newBook : {name: this.state.newBook.name, pages: event.target.value}}); 
}
	
  handleChangeName(event) {
    this.setState({newBook : {name: event.target.value, pages: this.state.newBook.pages}}); 
  }
  
 handleSubmit(event) {
	var data = this.state.newBook;
	
	$.ajax({
            type: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
            url: 'http://localhost:8080/addBook',
			success: function(data){
				console.log("ajax succeeded");
			},
			error : function(error){
				console.log("ajax error");
			}
        });
	 React.render( <ListOfBooks />);
	 event.preventDefault();
  }
 render() {
    return (<form onSubmit={this.handleSubmit}>
				<label>
				  Book pages :
				  <input type="number" value={this.state.newBook.pages} onChange={this.handleChangePages} />
				</label>
				<label>
				  Book name :
				  <input type="text" value={this.state.newBook.name} onChange={this.handleChangeName}/>
				</label>
			<input type="submit" value="Submit"/>
		  </form>);
  }
  
}

export default AddBook;