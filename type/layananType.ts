export interface Layanan {
  id: number;

  title: string;
  description: string | null;

  max_person: number;

  price: string;

  price_self: string;
  price_couple: string;
  price_group: string;
  price_family: string;

  duration: string;
  image: string | null;
  status: boolean;
}