export class ParcelOrder {
  id: number;
  warehouse_id: number;
  order_status_id: number;
  owner_id: number;
  shipper_id: number;
  receiver: any;
  sender: any;
  type: string;
  size: any;
  weight: number;
  value: number;
  handle_instructions: string;
  source_location_id: number;
  dest_location_id: number;
  coupon_code: string;
  service_id: number;
  expected_pickup_from: any;
  expected_pickup_to: any;
  expected_delivery_from: any;
  expected_delivery_to: any;
  is_cod: number;
  cod: number;
  fee_payer: number;
  bank_cash: number;
  route: string;
  last_location: string;
  current_location: string;
  money_remain: number;
  pickup_date: any;
  delivery_date: any;
  delivery_fee: number;
  parcel_price: number;
}
