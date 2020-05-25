import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import {DataService, typesOfShoes } from './model'
import { MatOption } from '@angular/material/core';
import { MatSelectionList } from '@angular/material/list';
import {CheckboxHarnessFilters, MatCheckboxHarness} from '@angular/material/checkbox/testing'

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
  data: typesOfShoes[];
  flag:boolean=true;
  indeterminate = false;
  checked = false;
  x={selectedshoes:["Boots"]};
  constructor(private _formBuilder: FormBuilder,@Inject(DataService) private dataService: DataService) { 
     this.data = dataService.getData();
     this.frmStepOne = this._formBuilder.group({
      firstCtrl: [''],
      searchbar:[''],
      selectedshoes:this._formBuilder.array([]),
      selectAll:['']
    });
  }
  
  ngOnInit() {
    
  };
  
  onSubmit() {
    console.log(this.frmStepOne.value);

  }
  
  unselectbyselect(){
    if(this.checkArray.length==this.data.length)
      {
        this.isAll=true;
      }
      else
      {
        this.isAll=false;
      }
  }
  
  MatCheckbox(evy)
  {
    
    this.checkArray= this.frmStepOne.get('selectedshoes') as FormArray;
    if (evy.checked) 
    {
      this.checkArray.push(new FormControl(evy.source.value));
     
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
     
        this.checkArray = this.frmStepOne.get('selectedshoes') as FormArray;
    
       this.data.forEach(item=>{
        this.checkArray.push(new FormControl(item.name));
      
       })
       this.isSelected=true;
     }
     else
     {
      let j: number = 0;
      this.isSelected=false;
      
      this.checkArray.clear();
      }
     
   }

}

