import Image from 'next/image'

class Todo{
  id:number;
  name:string;
  constructor(id:number,name:string){
    this.id = id;
    this.name =name;
  }
}

function TodoComponent(todo:Todo){
  return (
    <div>
      <p>id : {todo.id}</p>
      <p>name : {todo.name}</p>
    </div>
  );  
}

export default function Home() {
  return (
    <div>
      <h1>Todo App</h1>
      <TodoComponent {...new Todo(1,"test")}/>
    </div>
      )
}
