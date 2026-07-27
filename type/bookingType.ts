export type BookingStatus =
  | "waiting"
  | "progress"
  | "finished";

export type BookingType = {
  id: number;
  nama: string;
  nomor_hp?: string;
  date: string;
  time: string;
  package_name: string;
  kategori?: string;
  payment_method: string;
  deskripsi?: string;
  harga?: number;
  booking_status: BookingStatus;
  drive_link?: string | null;
};