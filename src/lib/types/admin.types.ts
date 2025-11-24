export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Moderator" | "User";
  status: "Active" | "Inactive";
  joinDate: string;
  kota: Kota;
  organisasi: Organisasi;
}

interface Kota{
  id:number;
  name:string;  
}

interface Organisasi{
  id:number;
  name:string;  
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
  role: "Admin" | "Moderator" | "User";
  status: "Active" | "Inactive";
  phone: string;
  department: string;
  joinDate: string;
}

export interface User extends UserFormData {
  id: number;
}


export interface StatsCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}