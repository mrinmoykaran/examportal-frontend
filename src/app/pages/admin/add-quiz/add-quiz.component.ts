import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[];
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestion:'',
    active:true,
    category:{cid:''}
  };

  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data:any)=>
      {
        this.categories=data;  
      },
      (error)=>
      {
        console.log(error);
        Swal.fire("Error!","Womething went wring","error");
      }
    );

  }

  addQuiz()
  {
    console.log(this.quizData);
    if(this.quizData.title.trim()=='' || this.quizData.title==null)
    {
      this._snack.open("Title Required!","",{
        duration:3000,
      });
      return;
    }

    //adding quiz
    this._quiz.addQuiz(this.quizData).subscribe(
      (data)=>{
          Swal.fire("Success","Quid is added","success");
          this.quizData={
            title:'',
            description:'',
            maxMarks:'',
            numberOfQuestion:'',
            active:true,
            category:{cid:''}
          };
      },
      (error)=>
      {
        console.log(error);
        Swal.fire("Error","Something went wrong","error");
      }
    );

  }

}
