import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor() { }
  
  todos:Todo[]=[];
  todoStr:string="";
  isSubmitted:boolean=false;
  isValid:boolean=false;
  isUpdate:boolean=false;
  updateTodoForm = new FormGroup({
    updateTodo: new FormControl('',[
      Validators.minLength(6),
      Validators.required
    ]),
    categoryOptionUpdate: new FormControl('',[
      Validators.required
    ])
  })
  
  categories: string[]=[
    'Shopping',
    'Work',
    'Education',
    'Financing'
  ];

  errors:any = {
    "updateTodo" : {

    },
    "categoryOptionUpdate" : {

    }
  }

  ngOnInit(): void {
    this.todos = [
      {
        content: "First todo",
        category: "Education",
        completed: false,
        isShown:true
      },
      {
        content: "Second todo",
        category: "Shopping",
        completed: false,
        isShown:true
      }
    ]
  }

  toggleDone(id:number) {
    this.todos.map((v,i) => {
      if(i == id) v.completed =! v.completed;
      // console.log(v)
      return v;
    })
  }

  deleteTodo(id:number) {
    this.todos = this.todos.filter((v,i) => i !== id);
  }

  addTodo(todo: Todo) {
    if(todo.content.length > 0) {
      this.todos.push(todo);
    }else {
      alert("Input masih kosong")
    }
  }

  // showList(){
  //   this.isShown = true
  // }

  // hideList(){
  //   this.isShown = false
  // }

  toggleUpdate(todo: Todo, i:number) {
    if(this.isUpdate){
      alert("Finish the update first");
    }else {
      this.todos[i].isShown = false;
      this.updateTodoForm.setValue({
        "updateTodo" : todo.content,
        "categoryOptionUpdate" : todo.category
      });
      this.isUpdate=true;
    }
  }
  
  updateDone(i:number) {
    this.isSubmitted=true
    this.isValidate();
    if(this.isValid) {
      this.isUpdate=false;
      this.todos[i].isShown = true
      this.todos[i].content = this.updateTodoForm.get("updateTodo")?.value;
      this.todos[i].category = this.updateTodoForm.get("categoryOptionUpdate")?.value;
      this.updateTodoForm.reset();
    }
  }

  get updateTodo(){
    return this.updateTodoForm.get('updateTodo')
  }

  get categoryOptionUpdate(){
    return this.updateTodoForm.get('categoryOptionUpdate')
  }

  isValidate() {
    if(this.updateTodo?.invalid || this.categoryOptionUpdate?.invalid) {
      this.errors.updateTodo = {...this.updateTodo?.errors}
      this.errors.categoryOptionUpdate = {...this.categoryOptionUpdate?.errors}
      this.isValid=false;
    }else{
      this.errors.updateTodo = {}
      this.errors.categoryOptionUpdate = {}
      this.isValid=true;
    }
  }
  
}
