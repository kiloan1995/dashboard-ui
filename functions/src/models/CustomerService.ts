import { ICustomer } from './Database';
import * as admin from 'firebase-admin';

export class CustomerService {
  async getCustomerList(): Promise<ICustomer[]> {
    const result = await admin.firestore().collection('customers').get();

    const customerList: ICustomer[] = [];

    for (const document of result.docs) {
      const item: ICustomer = {
        ...(document.data() as ICustomer),
        id: document.id,
      };
      customerList.push(item);
    }
    return customerList;
  }
  //   async getCustomer(customerID: string): Promise<ICustomer> {
}
