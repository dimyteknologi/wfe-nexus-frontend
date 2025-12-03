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
  id: string; // UUID
  name: string;
  description?: string;
  permissions?: Permission[];
  permissionIds?: string[]; // For API requests
  createdAt?: string;
  status?: "Active" | "Inactive"; // Add this line
}

export interface Organization {
  id: string; // UUID
  name: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  updatedBy: string;
  users?: Array<{
    id: string;
    name: string;
    email: string;
  }>;
}

export interface OrganizationFormData {
  name: string;
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

export interface Permission {
  id: string; // UUID
  permissionName: string;
  permissionCode: string;
  description: string | null;
  roles?: Array<{
    id: string;
    roleId: string;
    permissionId: string;
    role: {
      id: string;
      name: string;
    };
  }>;
}

export interface PermissionFormData {
  permissionName: string;
  permissionCode: string;
}

export interface AssignPermissionPayload {
  roleId: string;
  permissionIds: string[];
}