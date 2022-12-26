import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [];

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
      },
      (error) => {
        console.log(error);
        Swal.fire("Error!!", "Error in loading data", "error");
      }
    );
  }

  deleteQuiz(qid) {

    Swal.fire({
      icon: "error",
      title: "Are you sure want to delete?",
      confirmButtonText: "Delete",
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qid).subscribe(
          () => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qid);
            Swal.fire("Success", "Quiz Deleted!", "success");
          },
          (error) => {
            Swal.fire("Error", "Error is deleting quiz!", "error");
          }
        );
      }
    });
  }

}
