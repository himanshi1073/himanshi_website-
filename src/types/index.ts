
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  imageUrl: string;
  price: number;
  availableTickets: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  quantity: number;
  totalPrice: number;
  purchaseDate: string;
  status: "confirmed" | "pending" | "cancelled";
}

export interface CartItem {
  eventId: string;
  quantity: number;
  event: Event;
}
