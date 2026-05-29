# Book a Doctor App - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### 1. Authentication

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "patient" // or "doctor"
}

Response (201):
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response (200):
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "role": "patient",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### 2. Doctors

#### Get All Approved Doctors
```
GET /doctors

Response (200):
[
  {
    "_id": "doctor_id",
    "userId": {
      "name": "Dr. Jane Smith",
      "email": "jane@example.com",
      "phone": "9876543210"
    },
    "specialization": "Cardiology",
    "experience": 10,
    "fees": 100,
    "timings": {
      "start": "09:00",
      "end": "17:00"
    },
    "status": "approved",
    "bio": "Experienced cardiologist",
    "clinicAddress": "123 Medical St"
  }
]
```

#### Get Doctor by ID
```
GET /doctors/:id

Response (200):
{
  "_id": "doctor_id",
  "userId": {
    "name": "Dr. Jane Smith",
    "email": "jane@example.com",
    "phone": "9876543210"
  },
  "specialization": "Cardiology",
  "experience": 10,
  "fees": 100,
  "timings": {
    "start": "09:00",
    "end": "17:00"
  },
  "status": "approved",
  "bio": "Experienced cardiologist",
  "clinicAddress": "123 Medical St"
}
```

#### Apply as Doctor
```
POST /doctors/apply
Authorization: Bearer <token>
Content-Type: application/json

{
  "specialization": "Cardiology",
  "experience": 10,
  "fees": 100,
  "timings": {
    "start": "09:00",
    "end": "17:00"
  },
  "bio": "Experienced cardiologist",
  "clinicAddress": "123 Medical St"
}

Response (201):
{
  "message": "Application submitted successfully",
  "doctor": {
    "_id": "doctor_id",
    "userId": "user_id",
    "specialization": "Cardiology",
    "experience": 10,
    "fees": 100,
    "status": "pending"
  }
}
```

### 3. Appointments

#### Book Appointment
```
POST /appointments/book
Authorization: Bearer <token>
Content-Type: application/json

{
  "doctorId": "doctor_id",
  "date": "2024-02-15",
  "timeSlot": "14:30",
  "reason": "Regular checkup"
}

Response (201):
{
  "message": "Appointment booked successfully",
  "appointment": {
    "_id": "appointment_id",
    "userId": "user_id",
    "doctorId": "doctor_id",
    "date": "2024-02-15T00:00:00Z",
    "timeSlot": "14:30",
    "reason": "Regular checkup",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get User Appointments
```
GET /appointments
Authorization: Bearer <token>

Response (200):
[
  {
    "_id": "appointment_id",
    "userId": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "doctorId": {
      "specialization": "Cardiology",
      "fees": 100
    },
    "date": "2024-02-15T00:00:00Z",
    "timeSlot": "14:30",
    "reason": "Regular checkup",
    "status": "pending"
  }
]
```

#### Get Doctor Appointments
```
GET /appointments/doctor/:doctorId
Authorization: Bearer <token>

Response (200):
[
  {
    "_id": "appointment_id",
    "userId": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890"
    },
    "doctorId": "doctor_id",
    "date": "2024-02-15T00:00:00Z",
    "timeSlot": "14:30",
    "reason": "Regular checkup",
    "status": "pending"
  }
]
```

#### Update Appointment
```
PUT /appointments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed", // or "rejected", "completed"
  "notes": "Additional notes"
}

Response (200):
{
  "message": "Appointment updated",
  "appointment": {
    "_id": "appointment_id",
    "status": "confirmed",
    "notes": "Additional notes"
  }
}
```

### 4. Admin

#### Get All Doctor Applications
```
GET /admin/doctors
Authorization: Bearer <admin_token>

Response (200):
[
  {
    "_id": "doctor_id",
    "userId": {
      "name": "Dr. Jane Smith",
      "email": "jane@example.com",
      "phone": "9876543210"
    },
    "specialization": "Cardiology",
    "experience": 10,
    "fees": 100,
    "status": "pending"
  }
]
```

#### Approve Doctor
```
PUT /admin/doctors/:id/approve
Authorization: Bearer <admin_token>

Response (200):
{
  "message": "Doctor approved",
  "doctor": {
    "_id": "doctor_id",
    "status": "approved"
  }
}
```

#### Reject Doctor
```
PUT /admin/doctors/:id/reject
Authorization: Bearer <admin_token>

Response (200):
{
  "message": "Doctor rejected",
  "doctor": {
    "_id": "doctor_id",
    "status": "rejected"
  }
}
```

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Error Response Format

```json
{
  "message": "Error description"
}
```
