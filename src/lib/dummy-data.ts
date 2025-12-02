import { User, City, Role, Organization } from './types/admin.types';

export let DUMMY_CITIES: City[] = [
  { id: 1, name: "Jakarta Pusat", code: "JKT-P", province: "DKI Jakarta", status: "Active", createdAt: "2024-01-01" },
  { id: 2, name: "Surabaya", code: "SBY", province: "Jawa Timur", status: "Active", createdAt: "2024-01-15" },
  { id: 3, name: "Bandung", code: "BDG", province: "Jawa Barat", status: "Inactive", createdAt: "2024-02-01" },
  { id: 4, name: "Medan", code: "MDN", province: "Sumatera Utara", status: "Active", createdAt: "2024-02-20" },
  { id: 5, name: "Makassar", code: "MKS", province: "Sulawesi Selatan", status: "Active", createdAt: "2024-03-10" },
  { id: 6, name: "Semarang", code: "SMG", province: "Jawa Tengah", status: "Active", createdAt: "2024-04-05" },
  { id: 7, name: "Palembang", code: "PLB", province: "Sumatera Selatan", status: "Active", createdAt: "2024-05-12" },
  { id: 8, name: "Denpasar", code: "DPS", province: "Bali", status: "Active", createdAt: "2024-06-20" },
];

export let DUMMY_ROLES: Role[] = [
  { id: 1, name: "Admin", description: "Full access to all resources and settings", permissions: ["all"], status: "Active", createdAt: "2023-01-01" },
  { id: 2, name: "Moderator", description: "Can manage users and content", permissions: ["read", "write", "delete_content"], status: "Active", createdAt: "2023-02-01" },
  { id: 3, name: "User", description: "Standard user access", permissions: ["read"], status: "Active", createdAt: "2023-03-01" },
  { id: 4, name: "Viewer", description: "Read-only access to public content", permissions: ["read"], status: "Inactive", createdAt: "2023-04-01" },
  { id: 5, name: "Editor", description: "Can edit content but not publish", permissions: ["read", "write"], status: "Active", createdAt: "2023-05-10" },
];

export let DUMMY_ORGANIZATIONS: Organization[] = [
  { id: 1, name: "Tech Solutions Inc.", code: "TSI", type: "Technology", status: "Active", contactEmail: "contact@techsolutions.com", createdAt: "2022-01-01" },
  { id: 2, name: "Green Earth NGO", code: "GEN", type: "Non-Profit", status: "Active", contactEmail: "info@greenearth.org", createdAt: "2022-05-15" },
  { id: 3, name: "City Government", code: "GOV", type: "Government", status: "Active", contactEmail: "admin@city.gov", createdAt: "2021-11-20" },
  { id: 4, name: "Health Plus", code: "HLP", type: "Healthcare", status: "Inactive", contactEmail: "support@healthplus.com", createdAt: "2023-01-10" },
  { id: 5, name: "Edu Future", code: "EDU", type: "Education", status: "Active", contactEmail: "contact@edufuture.ac.id", createdAt: "2022-08-01" },
  { id: 6, name: "Global Trade Corp", code: "GTC", type: "Logistics", status: "Active", contactEmail: "info@globaltrade.com", createdAt: "2023-03-15" },
];

export let DUMMY_USERS: User[] = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@example.com", 
    role: "Admin", 
    status: "Active", 
    phone: "081234567890",
    department: "IT",
    joinDate: "2024-01-01",
    kota: { id: 1, name: "Jakarta Pusat" },
    organisasi: { id: 1, name: "Tech Solutions Inc." }
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane@example.com", 
    role: "Moderator", 
    status: "Active", 
    phone: "081234567891",
    department: "Operations",
    joinDate: "2024-02-15",
    kota: { id: 2, name: "Surabaya" },
    organisasi: { id: 2, name: "Green Earth NGO" }
  },
  { 
    id: 3, 
    name: "Bob Wilson", 
    email: "bob@example.com", 
    role: "User", 
    status: "Inactive", 
    phone: "081234567892",
    department: "Finance",
    joinDate: "2024-03-10",
    kota: { id: 3, name: "Bandung" },
    organisasi: { id: 3, name: "City Government" }
  },
  { 
    id: 4, 
    name: "Alice Brown", 
    email: "alice@example.com", 
    role: "User", 
    status: "Active", 
    phone: "081234567893",
    department: "HR",
    joinDate: "2024-04-05",
    kota: { id: 4, name: "Medan" },
    organisasi: { id: 4, name: "Health Plus" }
  },
  { 
    id: 5, 
    name: "Charlie Davis", 
    email: "charlie@example.com", 
    role: "User", 
    status: "Active", 
    phone: "081234567894",
    department: "Marketing",
    joinDate: "2024-05-20",
    kota: { id: 5, name: "Makassar" },
    organisasi: { id: 5, name: "Edu Future" }
  },
];
