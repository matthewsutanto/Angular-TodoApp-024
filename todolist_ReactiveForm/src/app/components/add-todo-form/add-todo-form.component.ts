import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css']
})
export class AddTodoFormComponent{
  @Output() newTodoEvent = new EventEmitter<Todo>();
  @Input() todoUpdate:string="";
  isSubmitted:boolean=false;
  isValid:boolean=false;
  inputTodoForm = new FormGroup({
    inputTodo: new FormControl('',[
      Validators.minLength(6),
      Validators.required
    ]),
    categoryOption: new FormControl('',[
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
    "inputTodo" : {

    },
    "categoryOption" : {

    }
  }
  addTodo() {
    this.isSubmitted=true
    this.isValidate();
    if(this.isValid) {
      const todo: Todo = {
        content: this.inputTodoForm.get("inputTodo")?.value,
        category: this.inputTodoForm.get("categoryOption")?.value,
        completed: false,
        isShown: true
      };
      this.inputTodoForm.reset();
      this.newTodoEvent.emit(todo)
    }
  }

  get inputTodo(){
    return this.inputTodoForm.get('inputTodo')
  }

  get categoryOption(){
    return this.inputTodoForm.get('categoryOption')
  }

  isValidate() {
    if(this.inputTodo?.invalid || this.categoryOption?.invalid) {
      this.errors.inputTodo = {...this.inputTodo?.errors}
      this.errors.categoryOption = {...this.categoryOption?.errors}
      this.isValid=false;
    }else{
      this.errors.inputTodo = {}
      this.errors.categoryOption = {}
      this.isValid=true;
    }
  }

  inputChange(){
    this.isSubmitted=false;
  }
}
