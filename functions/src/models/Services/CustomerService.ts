import { Customer } from '../Customer';
import * as admin from 'firebase-admin';

export class CustomerService {
  async getCustomerList(): Promise<Customer[]> {
    const result = await admin.firestore().collection('customers').get();
    let customerList: Customer[] = [];

    for (const document of result.docs) {
      const item: Customer = {
        ...(document.data() as Customer),
        id: document.id,
      };
      customerList.push(item);
    }
    return customerList;
  }

  async getCustomer(customerName: string): Promise<Customer> {
    const document = await admin.firestore().doc(customerName).get();
    return document.data() as Customer;
  }
}
