export type PelangganType = {
  id: number;
  name: string;
  phone: string;
  totalBooking: number;
  status: "Loyal" | "New" | "Regular";
};