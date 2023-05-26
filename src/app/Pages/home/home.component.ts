import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from 'src/app/Shared/Services/service.service';
import { ProductdetailComponent } from '../productdetail/productdetail.component';
import { Product } from 'src/app/Shared/interfaces/product.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(public dialog: MatDialog, private service: ServiceService) { }

  images = [
    {
      src: 'https://peru21.pe/resizer/Q-FJJsYBO0XDVoatA2evvlgq6FQ=/580x330/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/NPWZ3NUUK5BSBIK62Q33KTTZQI.jpg',
      alt: 'img1',
    },
    {
      src:'https://previews.123rf.com/images/dezay/dezay1803/dezay180300025/97532018-veh%C3%ADculo-de-pasajeros-montado-a-partir-de-piezas-de-repuesto-nuevas-para-el-mercado-de-repuestos-de.jpg',
      alt: 'img2',
    },
    {
      src:'https://st2.depositphotos.com/3064125/10726/i/600/depositphotos_107267576-stock-photo-auto-car-parts.jpg',
      alt: 'img3',
    }
  ]

  indicators = true;
  slideInterval = 3000;
  selectIndex = 0;

  ngOnInit(): void {
    this.autoSlideImg();
    this.getProducts();
  }
  
  selectImg(index: number): void{
    this.selectIndex = index;
  }

  autoSlideImg(): void{
    setInterval(()=>{
      this.onNextImg();
    }, this.slideInterval);
  }

  onNextImg(){
    if(this.selectIndex === this.images.length - 1){
      this.selectIndex = 0;
    } else{
      this.selectIndex++;
    }
  }

  products: any = [];
  bestS: any = [];

  getProducts() {
    this.service.getProds('http://localhost:3001').subscribe(res => {
      this.products = res;
      this.bestS = this.products.slice(0,5);
      return this.bestS;
    })
  }

  openDialogMore(product: Product) {
    this.dialog.open(ProductdetailComponent, {
      width: "45%",
      data: product
    })
  }
}  