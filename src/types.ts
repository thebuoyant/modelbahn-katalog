export type Scale = "H0" | "N";
export type Category = "Loks" | "Güterwagen" | "Personenwagen" | "Sonstiges";
export type Aspect = "4:3" | "16:9";
export interface RollingStock {
  id: string;
  scale: Scale;
  category: Category;
  title: string;
  description?: string;
  image43: string;
  year?: number;
  brand?: string;
  roadNumber?: string;
  areaOfApplication?: string;
}
