import React from 'react'

export default class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.props.handleDoneEditing()
      this.props.handleUpdateItem(this.props.index)
    } 
  }

  handleInputChange = e => {
    this.props.handleInputChange(e)
  }

  handleBlur = e => {
    const currentTarget = e.currentTarget

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.props.handleDoneEditing()
      }
    }, 0)
  }

  render() {
    return (
      this.props.editing === this.props.index
      ? <div onBlur={this.handleBlur}>
          <input 
            ref={input => input && input.focus()}
            defaultValue={this.props.item}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            
          />
          <button
            type='button'
            onClick={() => this.props.handleRemoveItem(this.props.index)}>
            x
          </button>
        </div>
      : <div onClick={() => this.props.handleEditing(this.props.index)}>
          {this.props.item}
        </div>
    )
  }
}