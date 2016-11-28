import React from 'react';
import {render} from 'react-dom';

import ListOfBooks from './ListOfBooks.jsx';
import AddBook from './AddBook.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello to bookstore!</p>
		<ListOfBooks />
		<AddBook />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));