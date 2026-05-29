# Book a Doctor App

An innovative healthcare booking platform designed to streamline the process of connecting patients with healthcare providers.

## Features
- Patient registration and login
- Browse and filter doctors by specialization
- Book appointments with doctors
- Appointment status tracking
- Doctor dashboard to manage appointments
- Admin panel to approve doctors
- Secure authentication with JWT
- Responsive UI with React and Bootstrap

## Tech Stack
- **Frontend:** React, React Router, Bootstrap, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt

## Project Structure
```
book-a-doctor-app/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
├── server/                 # Node.js Backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── index.js
│   └── package.json
├── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd server
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key" > .env

# Start server
npm start
```

### Frontend Setup
```bash
cd client
npm install

# Start frontend
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout

### Doctors
- `GET /api/doctors` - Get all approved doctors
- `POST /api/doctors/apply` - Apply as a doctor
- `GET /api/doctors/:id` - Get doctor details

### Appointments
- `POST /api/appointments/book` - Book appointment
- `GET /api/appointments` - Get user appointments
- `GET /api/appointments/doctor/:id` - Get doctor appointments
- `PUT /api/appointments/:id` - Update appointment status

### Admin
- `GET /api/admin/doctors` - Get all doctor applications
- `PUT /api/admin/doctors/:id/approve` - Approve doctor
- `PUT /api/admin/doctors/:id/reject` - Reject doctor

## Usage

1. Start the backend server
2. Start the frontend development server
3. Open http://localhost:5173 in your browser
4. Register as a patient or doctor
5. Browse doctors and book appointments

## Deliverables
- ✅ Project code files
- ✅ Project documentation
- ✅ API documentation
- ✅ Setup instructions

## License
MIT
