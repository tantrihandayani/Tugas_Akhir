export type Transaksi = {
  id: number;
  nama: string;
  paket: string;
  tanggal: string;
  waktu: string;
  metode: string;
  harga?: string | number;
  nomor_hp?: string;
  payment_status?: string;
  booking_status?: string;
};