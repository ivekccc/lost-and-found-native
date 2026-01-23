// ===========================================
// LISTING TYPES - 1:1 SA BACKEND
// ===========================================

import { ListingType, ListingStatus } from './enums';

// Location.java
export interface Location {
  id: number;
  lat: number;
  lng: number;
  address: string;
}

// Category.java
export interface Category {
  id: number;
  title: string;
  description: string;
}

// Listing.java
export interface Listing {
  id: number;
  title: string;
  description: string;
  type: ListingType;
  category: Category;
  location: Location;
  date: string; // LocalDate as ISO string
  status: ListingStatus;
  image: string;
}
