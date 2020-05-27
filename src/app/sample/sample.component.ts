import { Component, OnInit, Inject, ViewChild, Input, Output, SimpleChanges, SimpleChange } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import {DataService, typesOfShoes } from './model'
import { MatOption } from '@angular/material/core';
import { MatSelectionList } from '@angular/material/list';
import {CheckboxHarnessFilters, MatCheckboxHarness} from '@angular/material/checkbox/testing'
import { isNumber } from 'util';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent  {
 
  frmStepOne: FormGroup;
  isSelected:boolean;
  isAll:boolean;
  checkArray: FormArray;
  x:number=1;
  data: typesOfShoes[];
  flag:boolean=true;
  indeterminate = false;
  checked = false;
  name: string;
  

  constructor(private _formBuilder: FormBuilder,@Inject(DataService) private dataService: DataService) { 
     this.data = dataService.getData();
     this.frmStepOne = this._formBuilder.group({
      firstCtrl: ['',Validators.required],
      searchbar:['',Validators.required],
      selectedshoes:this._formBuilder.array([''],[Validators.required]),
      selectAll:['']
    });
  }


z(){debugger;
  let final=[];
  let arr=[1,2];
  let check=[1,2,3,4];
  let m:any
 // let k=arr.map(x=>m=check.forEach(y=>{if(y==x) return y;}));
  let k=arr.map(x=>m=check.filter(y=>{if(y==x) return y;}).toString()).join(',');
  console.log(k);
  for(var i=0;i<arr.length;i++)
  {
   for(var j=0;j<check.length;j++)
   {
     if(arr[i]==check[j])
     {
        final.push(arr[i]);
     }
   }
  }
  let arr1:any;
  let arr2:any;
  arr1 = ['B','C','0D',0,'D0','AB0CD'];
  
   arr2=arr1.filter(x=>!isNumber(x)).join(',');
  

}



  ngOnInit() {
    this.z();
    let k=this.data.map(x=>x.id).join(',');
    //console.log(k)
    this.data.forEach(element => {
      if(element.id==this.x)
      {
        this.name=element.name;
      }
    });
    //console.log(this.name)
  };
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(SimpleChange);
  }
  onSubmit() {
    if(this.frmStepOne.valid){
      console.log(this.frmStepOne.value);
    }
  }
  
  unselectbyselect(){
    if(this.checkArray.length==this.data.length)
      {
        this.isSelected=true;
        this.isAll=true;
      }
      else
      {
      
        this.isAll=false;
      }
  }
  
  MatCheckbox(evy)
  {
    console.log(evy);
    this.checkArray= this.frmStepOne.get('selectedshoes') as FormArray;
    if (evy.checked) 
    {
      let z=evy.source.value;
      this.checkArray.push(new FormControl(evy.source.value))
      
    } 
    else 
    {
      let i: number = 0;
      this.checkArray.controls.forEach((item: FormControl) => {
        if (item.value == evy.source.value) 
        {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
      
    }
    
    this.unselectbyselect();
   }
   select(ev){
     if(ev.checked){
      this.isSelected=true;
        this.checkArray = this.frmStepOne.get('selectedshoes') as FormArray;
    
       this.data.forEach(item=>{
        this.checkArray.push(new FormControl(item.name));
      
       })
       
     }
     else
     {
      let j: number = 0;
      this.isSelected=false;
      
      this.checkArray.clear();
      }
     
   }

}

