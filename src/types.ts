
export type Scale = 'H0' | 'N';
export type Category = 'Loks' | 'Güterwagen' | 'Personenwagen' | 'Sonstiges';

export interface RollingStock {
  id: string;
  scale: Scale;
  category: Category;
  title: string;
  description?: string;
  image: string; // public path e.g. /images/demo/img001.png
  year?: number;
  brand?: string;
  roadNumber?: string;
}
