import React from 'react'
import Todo from './Todo'
//TodoList必须实现或者传递以下几个功能
//1.list 所有的item
//2.在每个item的click事件上‘打勾’
   //本次“打勾”的方式是通过 patch一个URL来实现的（此方式可以自动改变指定item的completed 值，并通过ID进行连接外部和内部的todos,
   //传递外部的completed 值来改变state中的completed 值
//3.结合'hide' or 'show' completed button来改变list 的内容

export default class TodoList extends React.Component {
  
  
  render() {
    return (
      <div id="todos">
        <h2>Todos:</h2>
        {
          this.props.todos.reduce((acc,td)=>{
            if(this.props.displayCompleteds||!td.completed) return acc.concat(
              //因为这个阶段相当于loop，所以必须给每个item一个KEY值 key={td.id}
              <Todo key={td.id}
                toggleCompleted={this.props.toggleCompleted}
                todo={td}
              />
            )
            return acc
          },[])
        }
        {/* 解释：
        对array中的每一个item进行判断，符合要求的直接放入初始OriginalArray=[]中。
        (this.props.displayCompleteds||!td.completed)此段code的意思是
        只要this.props.displayCompleteds===true，无论td.completed的结果是什么，整个code都会显示true
        也就执行return中的累积运算，这样可以达到的目的是：无论item中的completed是true还是false，所有的item都会进行display
        ;如何this.props.displayCompleteds===false，那就要看td.completed的情况，如果本身td.completed===false，那么!td.completed)
        会变成true，也就会执行累加进去的操作，反而言之，这个item就不会执行累加，return的还是原来的array，然后再对下一个item进行判断，知道最后一个item
        
        array.reduce（(acc,td)=>{},初始值）
        */}

      </div>
      
    )
    
    
    
    
  }
}
