import { Router } from '@angular/router';
import { ProductService } from './../../../service/product.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductModel } from './../../../model/product.model';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  public paginaAtual = 1;
  allProduct: ProductModel;
  erro: any;
  productGroup: FormGroup;

  constructor(private productService: ProductService, private router: Router , private fb: FormBuilder) {
    this.getterProduct();
   }

  ngOnInit(): void {
  }

  getterProduct(){
    this.productService.getProduct().subscribe(
      (data: ProductModel) => {
        this.allProduct = data;

      },
      (error: any) => {
        this.erro = error;
        console.error("ERROR:" , error);

      }
    )
  }

  editProduct(productEdit: ProductModel){
    this.router.navigateByUrl('/register-product',{
      state: {productEdit: productEdit}
    })
  }

}
