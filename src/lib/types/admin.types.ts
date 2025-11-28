export interface User {
  id: string; // UUID
  email: string;
  name: string;
  roleId: string;
  cityId: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  updatedBy: string;
  role?: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
    updatedBy: string;
  };
  city?: {
    id: string;
    name: string;
  };
  institution?: {
    id: string;
    name: string;
  };
}

interface Kota{
  id:number;
  name:string;  
}

interface Organisasi{
  id:number;
  name:string;  
}

export interface City {
  id: string; // UUID
  name: string;
}

export interface CityFormData {
  name: string;
}

export interface Role {
  id: number;
  name: string;
  description?: string;
  permissions?: string[];
  status: "Active" | "Inactive";
  createdAt?: string;
}

export interface Organization {
  id: number;
  name: string;
  code?: string;
  type?: string;
  status: "Active" | "Inactive";
  contactEmail?: string;
  createdAt?: string;
}

export interface StatsCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string; // Optional for edit, required for create (handled in validation)
  roleId: string;
  cityId: string;
  institutionId: string;
  status?: "Active" | "Inactive"; // Make optional as API doesn't seem to use it
  phone?: string;
  department?: string;
  joinDate?: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  name: string;
  roleId: string;
  cityId: string;
  institutionId: string;
}