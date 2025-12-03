# Implementasi Pemilihan Permission pada Halaman Role

## Ringkasan Perubahan

Saya telah mengimplementasikan fitur pemilihan permission pada halaman `admin/role/new` untuk membuat role baru. Sekarang form dapat:

1. Mengambil daftar permission dari API endpoint `GET /permissions`
2. Menampilkan permission sebagai checkbox yang dapat dipilih
3. Mengirim request body dengan format yang benar ke API

## File yang Dimodifikasi

### 1. `/src/lib/types/admin.types.ts`
- Menambahkan field `permissionIds?: string[]` pada interface `Role`
- Field ini digunakan untuk mengirim array ID permission ke API

### 2. `/src/components/admin/RoleForm.tsx`
- Import `usePermissions` hook dan `Permission` type
- Menambahkan state untuk menyimpan `permissionIds`
- Menambahkan fungsi `handlePermissionChange` untuk toggle checkbox permission
- Menambahkan UI section "Permissions" dengan grid checkbox untuk setiap permission
- Setiap checkbox menampilkan:
  - `permissionName` (nama permission)
  - `permissionCode` (kode permission)

### 3. `/src/hooks/useRoles.ts`
- Memodifikasi fungsi `createRole` untuk memformat request body
- Request body sekarang mengirim:
  ```json
  {
    "name": "Role Name",
    "permissionIds": ["uuid1", "uuid2", ...]
  }
  ```

## Cara Kerja

1. **Load Permissions**: Saat form dibuka, `usePermissions` hook akan fetch semua permission dari API
2. **Display Permissions**: Permission ditampilkan dalam grid 3 kolom (responsive) dengan checkbox
3. **Select Permissions**: User dapat mencentang/uncheck permission yang diinginkan
4. **Submit Form**: Saat submit, hanya `name` dan `permissionIds` yang dikirim ke API

## Format Request Body

Sesuai dengan requirement, request body yang dikirim adalah:

```json
{
  "name": "Manager",
  "permissionIds": [
    "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "b2c3d4e5-f6a7-8901-2345-67890abcdef1"
  ]
}
```

## UI/UX Features

- ✅ Loading state saat fetch permissions
- ✅ Hover effect pada checkbox permission
- ✅ Visual feedback dengan border hijau saat hover
- ✅ Responsive grid layout (1 kolom mobile, 2 kolom tablet, 3 kolom desktop)
- ✅ Icon 🔑 untuk section permissions
- ✅ Menampilkan permission name dan code untuk clarity

## Testing

Untuk menguji implementasi:

1. Buka halaman `/admin/role/new`
2. Isi nama role
3. Pilih permission yang diinginkan dengan mencentang checkbox
4. Submit form
5. Verifikasi request body di Network tab browser atau console log
