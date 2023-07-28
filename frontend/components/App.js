// { "message": "Here are your Todos",
// "data": [{ "id": "3vCke", "name": "laundry", "completed": false }, 
//          { "id": "MRKBF", "name": "dishes", "completed": false },
//          { "id": "3bkrn", "name": "groceries", "completed": false }] }



import React from 'react'
import axios from 'axios';
import TodoList from './TodoList';
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'


export default class App extends React.Component {
  //we can omit the whole constructor(){} function  to 'state={}' object
  //in Class component, we don't need declare one variable or function by "const"or "let"
  state={
    todos:[],
    error:'',//store the error infor from Axios operation(Get,Post,Patch)
    todoNameInput:'',
    displayCompleteds:true//aim to control the button whether display or hide the items of list
  }

  setAxiosResponseError = err => this.setState({ ...this.state, error: err.response.data.message })

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })//we can use 'debugger' to see the data in the res---->res=>{debugger}
      })
      .catch(this.setAxiosResponseError)
  }

  // execute componentDidMount () once after FRIST RENDER ***important***
  componentDidMount() {
    this.fetchAllTodos()
  }


  onTodoNameInputChange=evt=>{
    const {value}=evt.target
    this.setState({...this.state,todoNameInput:value})
  }
  resetForm=()=>this.setState({...this.state,todoNameInput:''})
  
  postNewTodo=()=>{
    //only input the {name:xxxx}to POST(URL),we can automatically add a new item in external array
    axios.post(URL,{name:this.state.todoNameInput})
         .then(res=>{
          //res.data.data is a new item eg:{ "id": "3vCke", "name": "laundry", "completed": false }
          this.setState({...this.state,todos:this.state.todos.concat(res.data.data)})
          // another way to add a new item ---> todos:[...this.state.todos,res.data.data]
           
          this.resetForm()
         })
         .catch(this.setAxiosResponseError)
  }
  onTodoFormSubmit=evt=>{
    evt.preventDefault()
    this.postNewTodo()

  }
  //click one item and put the item.id into toggleCompleted() function
  //patch http://localhost:9000/api/todos/id 能找到指定item 并修改其中的内容
  //patch 中的res和其他（GET，POST）不一样，是一个已经自动修改过指定item中 completed===！completed的返回值
  //所以当发现 state中的id ===从外界patch 的id时 return res.data.data
  
  toggleCompleted=id=>()=>{
    axios.patch(`${URL}/${id}`)
        .then(res=>{
          this.setState({
            ...this.state,
            todos:this.state.todos.map(td=>{
              if(td.id !==id) return td
              return res.data.data
            })
          })
        })
        .catch(this.setAxiosResponseError)
  }
  toggleDisplayCompleteds=()=>{
    this.setState({...this.state,
    displayCompleteds:!this.state.displayCompleteds})
  }
  

//all information in JSX are getting the data in state
  render() {
    
    return (<div>
                <div id="error">Error:{this.state.error}</div>
              
                <TodoList 
                  todos={this.state.todos}
                  displayCompleteds={this.state.displayCompleteds}
                  toggleCompleted={this.toggleCompleted}
                
                />

                <Form onTodoFormSubmit={this.onTodoFormSubmit}
                      todoNameInput={this.state.todoNameInput}
                      onTodoNameInputChange={this.onTodoNameInputChange}
                      toggleDisplayCompleteds={this.toggleDisplayCompleteds}
                      displayCompleteds={this.state.displayCompleteds}
                />

    </div>)
  }
}
