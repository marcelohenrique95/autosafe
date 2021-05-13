import { ProductService } from './../../../service/product.service';
import { FormGroup , FormBuilder} from '@angular/forms';
import { ProductModel } from './../../../model/product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss']
})
export class RegisterProductComponent implements OnInit {

  productRegister: ProductModel;
  productRegisterForm: FormGroup;
  erro: any;

  constructor(private router: Router, private productService: ProductService, private fb: FormBuilder) {
    if (this.router.getCurrentNavigation().extras.state) {
      const nav = this.router.getCurrentNavigation();
      this.productRegister = nav.extras.state.productEdit;
    }
   }

  ngOnInit(): void {
    if (this.productRegister != null) {
      this.productRegisterForm = this.fb.group({
        inputName: [this.productRegister.name], inputProducer: [this.productRegister.producer],
        inputType: [this.productRegister.type], inputStock: [this.productRegister.stock], inputPrice:[this.productRegister.price]
      });
    } else {
      this.productRegisterForm = this.fb.group({
        inputName: [null], inputProducer: [null], inputType: [null], inputStock: [null], inputPrice:[null]
      });
    }
  }

  registerProduct(){
    this.productRegister = new ProductModel();
    this.productRegister.name = this.productRegisterForm.get('inputName').value;
    this.productRegister.producer = this.productRegisterForm.get('inputProducer').value;
    this.productRegister.type = this.productRegisterForm.get('inputType').value;
    this.productRegister.stock = this.productRegisterForm.get('inputStock').value;
    this.productRegister.price = this.productRegisterForm.get('inputPrice').value;
    console.log(this.productRegister)
    return this.productService.postProduct(this.productRegister).subscribe((data: ProductModel) => { this.productRegister = data },(err) => {console.log(err)});
  }

}
