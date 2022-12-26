import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qid;
  qTitle;
  questions = [];

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _snac: MatSnackBar) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this._question.getQuestionOfQuiz(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteQuestion(quesId) {
    Swal.fire(
      {
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: "Delete",
        title: "Are you sure, want to delete this question?"
      }
    ).then(
      (result) => {
        if (result.isConfirmed) {
          console.log("Confirmed");
          this._question.deleteQuestion(quesId).subscribe(
            (data) => {
              console.log("Deleted");
              this._snac.open("Question Deleted!", "", {
                duration: 3000
              });
              this.questions = this.questions.filter((q) => q.quesId != quesId);
            },
            (error) => {
              this._snac.open("Error is deleting question", "", {
                duration: 3000
              });
              console.log(error);
            }
          );
        }
      }
    );
  }

}
