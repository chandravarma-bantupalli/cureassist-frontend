import { PrescribedMedicine } from './prescribed-medicine';

export class Quotation {
  prescriptionId: string;
  prescribedMedicines: PrescribedMedicine[];
  // tslint:disable-next-line:ban-types
  totalPrice: Number;
}
