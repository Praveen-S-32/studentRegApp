import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myModal')
  model!: ElementRef;
  studentObj:Student = new Student()
  studentData:Student[] = []
  constructor(){}

  ngOnInit(): void {
    this.loadStudent()
  }

  openModal(){
    const model = document.getElementById('myModal');
    if(model!==null){
      model.style.display="block";
    }
  }

  closeModal(){
    this.studentObj = new Student();
    if(this.model!==null){
      this.model.nativeElement.style.display = "none";
    }
  }

  loadStudent(){
    const data = localStorage.getItem('angular14crud');
    if(data!==null){
      this.studentData = JSON.parse(data)
    }
  }

  saveStudent(){
    const isLocalPresent = localStorage.getItem('angular14crud');
    if(isLocalPresent!=null){
      const oldArr = JSON.parse(isLocalPresent);
      this.studentObj.id= oldArr.length + 1
      oldArr.push(this.studentObj)
      this.studentData = oldArr
      localStorage.setItem('angular14crud',JSON.stringify(oldArr));
    }else{
      const newArr = [];
      this.studentObj.id = 1;
      newArr.push(this.studentObj);
      this.studentData = newArr
      localStorage.setItem('angular14crud',JSON.stringify(newArr));
    }
    this.closeModal()
  }

  onEdit(student:Student){
    this.studentObj = student;
    this.openModal()
  }

  updateStudent(){
    const currentRecord = this.studentData.find(item=>item.id === this.studentObj.id)
    if(currentRecord!=undefined){
      currentRecord.name = this.studentObj.name;
      currentRecord.contact = this.studentObj.contact;
      currentRecord.email = this.studentObj.email;
    }
    localStorage.setItem('angular14crud',JSON.stringify(this.studentData))
    this.closeModal()
  }

  onDelete(student:Student){
    const isDelete = confirm("Are you sure want to delete")
    if(isDelete){
      const currentRecord = this.studentData.findIndex(m=>m.id == this.studentObj.id);
      this.studentData.splice(currentRecord,1)
      localStorage.setItem('angular14crud',JSON.stringify(this.studentData))
    }
  }

}
export class Student{
  id:number;
  name:string;
  contact:string;
  email:string;
  city:string;
  state:string;
  address:string;
  pincode:string;

  constructor(){
    this.id=0;
    this.address="";
    this.city="";
    this.contact="";
    this.email="";
    this.name="";
    this.pincode="";
    this.state="";
  }
}

