export interface Product {
  id: string;
  name: string;
  expectedQty: number; // The amount they expect to buy
  shelfPrice: number;  // The actual price found at the supermarket (per unit or total, user decides, but we multiply by qty if we assume it's per unit, let's keep it simple: shelfPrice is the price for the whole quantity or just what they type)
  // Let's assume shelfPrice is the total for the item to keep the math easy for the user while shopping, or per unit. 
  // Let's make it per unit so the total is expectedQty * shelfPrice.
}

export interface AppState {
  isLoggedIn: boolean;
  budget: number;
  products: Product[];
}
