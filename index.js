import React from 'react'
import ReactDOM from 'react-dom'

import './style.css';

import List from './List'
import ListItem from './ListItem'

class App extends React.Component {
  render() {
    return <List/>
  }
}

ReactDOM.render(<App/>, document.querySelector('#root'))
