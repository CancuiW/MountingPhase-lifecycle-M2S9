 //{ "id": "3vCke", "name": "laundry", "completed": false }
import React from 'react'

export default class Todo extends React.Component {


  clickItem=()=>{
    this.props.toggle(this.props.item.id)
    
  }
  render() {
    return (
      <div 
          onClick={this.props.toggleCompleted(this.props.todo.id)} 
       >
        {/*  'check'emoji comes from https://emojipedia.org/check-mark/ */}
        {this.props.todo.name}{this.props.todo.completed ? '✔️' : ""}
      </div>
    )
  
    
  }
}
