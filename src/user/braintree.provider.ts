import { Injectable } from '@nestjs/common';
import * as braintree from 'braintree';

@Injectable()
export class BraintreeProvider {
readonly gateway: braintree.BraintreeGateway;

constructor() {
    this.gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: '6hjmcbvghc9srkkf',
    publicKey: "r9r248g7h8z7szsn",
    privateKey: "2fbb53fcbfdf6613147c7fef5c432eba"
    });
}

}