import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop'

export interface Character{
  nome: string
  image: string
  fatality: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lista-dinamica';

  myList: Character[] = [];
  confirmList: Character[] =[];

  constructor(private httpClient: HttpClient){
    this.getMyList()
  }

  getMyList(){
    this.httpClient.get<Character[]>('../assets/data.json')
    .subscribe(list => this.myList = list)
  }

  drop(event: CdkDragDrop<Character[]>){
    //verifica qual lista
    if(event.previousContainer == event.container){
      // movendo na mesma lista
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex)
    }else{
      //transferindo item para outra lista
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
