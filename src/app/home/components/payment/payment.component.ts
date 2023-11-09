import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-payment',
  template: `
  <app-topbar></app-topbar>
  <div class="wrapper">
    <h2>Payment</h2>
    <div class="content-box" *ngFor="let product of products; let i = index">
              <div class="wrapper-text">


                <p class="product-name">
                  Product name:
                  {{product?.name}}
                </p>
                <div class="product-amount">

                  Amount:
                  {{product.quantity }}x
                </div>
              <div class="quantity-container">

                <span>Price: {{product.quantity * product?.price | number :'1.2-2'}} $</span>
              </div>



              </div>
            </div>
            <div class="total-price-container">

              <p class="total-price">Total price is: {{cartTotal}} $</p>
            </div>
            <div class="payment-container">
              <!-- <button class="payment-btn">Payment</button> -->
            <google-pay-button
              environment="TEST"
              buttonType="buy"
              buttonColor="black"
              [paymentRequest]="paymentRequest"
              (loadpaymentdata)="onLoadPaymentData($event)"
              (error)="onError($event)"
              [paymentAuthorizedCallback]="onPaymentDataAuthorized"


            >

            </google-pay-button>

            </div>
  </div>

  `,

  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  cartTotal!: any;
  productList!: any[];
  products: any[] = [];


  paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '0',
      currencyCode: 'USD',
      countryCode: 'US'
    },
    callbackIntents:['PAYMENT_AUTHORIZATION']

  };

  onLoadPaymentData = (
    event: Event

  ):void => {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail)
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData
  ) => {
    console.log('payment authorized', paymentData);
    return {
      transactionState: 'SUCCESS'
    };
  }

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  }




  constructor(  private product_service: ProductService, ) {

  }

  ngOnInit(): void {
    this.cartTotal = JSON.parse(localStorage.getItem('cart_total') as any) || [];
  console.log(this.cartTotal);

  this.product_service.getAllProducts().subscribe({
    next: (res: any) => {
      console.log(res);
      this.productList = res
    },
    error: (error) => {
      alert(error);
    },
    complete: () => {
      console.log('Request Completed');
    },

   })
   this.product_service.loadCart();
   this.products = this.product_service.getProduct();
this.calculateCartTotal()
 }

 calculateCartTotal(): void {
  this.cartTotal = 0;
  for (const product of this.products) {
    // Oblicz całkowitą cenę każdego produktu i dodaj ją do cartTotal
    this.cartTotal += product.quantity * product.price;
  }

  // Uaktualnij wartość totalPrice w paymentRequest na podstawie koszyka
  this.paymentRequest.transactionInfo.totalPrice = this.cartTotal.toFixed(2);
}


}
