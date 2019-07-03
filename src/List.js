import React from 'react'

import ListItem from './ListItem'

//defaults for the list
const title = 'List Title'
const list = ['Eggs', 'Bread', 'Milk',]

export default class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'List Title',
      editingTitle: false,
      list,
      value: '',
      editing: -1,
    }
  }

  handleEditing = i => {
    this.setState({
      editing: i,
      value: this.state.list[i],
    })
  }

  handleDoneEditing = () => {
    this.setState({
      editing: -1,
      value: '',
    })
  }
 
  handleClearArray = () => {
    this.setState({ list: [] })
  }

  handleResetArray = () => {
    this.setState({ list, title });
  }

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  handleAddItem = () => {
    this.setState(state => {
      const list = state.list.concat(state.value)

      return {
        list,
        value: '',
      }
    })
  }

  handleUpdateItem = i => {
    this.setState(state => {
      const list = state.list.map((item, j) => {
        if (j === i) {
          return this.state.value;
        } else {
          return item;
        }
      })
      
      return {
        list,
        value: ''
      }
    })
  }

  handleRemoveItem = i => {
    this.setState({
      editing: -1,
      value: '',
    })
    this.setState(state => {
      const list = state.list.filter((item, j) => i !== j)

      return {
        list,
      }
    })
  }

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleAddItem()
    }
  }

  handleTitleKeyDown = e => {
    if (e.keyCode === 13) {
      this.setState({
        editingTitle: false,
      })
    }
  }

  handleTitleEditing = () => {
    this.setState({
      editingTitle: true,
    })
  }

  handleTitleInputChange = e => {
    this.setState({
      title: e.target.value
    })
  }

  handleTitleDoneEditing = () => {
    this.setState({
      editingTitle: false,
    })
  }

  render() { 
    
    return (
      <div>
        {
          (this.state.editingTitle)
          ? <input
              ref={input => input && input.focus()}
              defaultValue={this.state.title}
              onChange={this.handleTitleInputChange}
              onKeyDown={this.handleTitleKeyDown}
              onBlur={this.handleTitleDoneEditing}
            />    
          : <h1 onClick={this.handleTitleEditing}>{this.state.title}</h1>
        }
        
        <ul>
        
          {this.state.list.map((item, index) => (
            <li key={index}>
              
              <ListItem 
                item={item} 
                index={index}
                editing={this.state.editing} 
                handleEditing={this.handleEditing}
                handleDoneEditing={this.handleDoneEditing}
                handleInputChange={this.handleInputChange}
                handleUpdateItem={this.handleUpdateItem}
                handleRemoveItem={this.handleRemoveItem}
              ></ListItem>

            </li>
          ))}

          <li> 
            {
              (this.state.editing >= 0)
              ? <div> +</div>

              :<input
                type='text'
                placeholder=' +'
                value={this.state.value}
                onChange={this.handleInputChange} 
                onKeyDown={this.handleKeyDown}
              />
            }

            <br/><br/>

            <button type='button' onClick={this.handleClearArray}>
              Clear
            </button>

            <button type='button' onClick={this.handleResetArray}>
              Reset
            </button>
          </li>

        </ul>

      </div>
    )
  }
}