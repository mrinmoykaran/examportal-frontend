import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid;
  questions;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timmer: any;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    this.loadQuestions();
  }
  loadQuestions() {
    this._question.getQuestionOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.timmer = this.questions.length * 2 * 60;
        
    
        console.log(data);
        this.startTimmer();
      },
      (error) => {
        console.log(error);
        Swal.fire("Error", "Error is loading questions", "error");
      }
    );
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(
      () => {
        history.pushState(null, null, location.href);
      }
    );
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.evalQuiz();

      }
    })
  }

  startTimmer() {
    let t= window.setInterval(() => {
      //code excuter after each sec
      if (this.timmer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      }
      else {
        this.timmer--;
      }
    }, 1000);
  }

  getFormattedTime()
  {
    let mm=Math.floor(this.timmer/60);
    let ss=this.timmer-mm*60;
    return `${mm} min: ${ss} sec`;
  }

  evalQuiz()
  {
    // this.isSubmit = true;

    // this.questions.forEach(q => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswers++;
    //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingle;
    //   }
    //   if (q.givenAnswer.trim() != "") {
    //     this.attempted++;
    //   }
    // });

    // console.log("Correct Answers" + this.correctAnswers);
    // console.log("Marks Got : " + this.marksGot);
    // console.log("Attempted : " + this.attempted);

    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>
      {
        console.log(data);
       
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers=data.correctAnswers;
        this.attempted=data.attempted;
        
        this.isSubmit = true;
        
      },
      (error)=>
      {
        console.log(error);
        
      }
    );
  }

  printPage()
  {
    window.print();
  }

}
