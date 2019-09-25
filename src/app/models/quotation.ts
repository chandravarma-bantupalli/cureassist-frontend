import { PrescribedMedicine } from './prescribed-medicine';
export class Quotation {
  pharmacyId: string;
  prescriptionId: string;
  prescribedMedicines: PrescribedMedicine[];
  totalCost: number;
}
