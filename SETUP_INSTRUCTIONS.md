# Book a Doctor App - Setup Instructions

## Quick Start Guide

### Prerequisites
- Node.js v14+ installed
- MongoDB account (Atlas recommended)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/chaimor/book-a-doctor-app.git
cd book-a-doctor-app
```

### Step 2: Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/book-a-doctor-app
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. In a new terminal, navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Step 4: Access the Application

1. Open your browser and go to `http://localhost:5173`
2. Register as a new user (Patient or Doctor)
3. Login with your credentials
4. Explore the app!

## Features

### For Patients
- Browse all approved doctors
- Book appointments with doctors
- Track appointment status
- View appointment history

### For Doctors
- Apply to become a doctor
- View appointment requests
- Approve or reject appointments
- Manage your profile

### For Admins
- View all doctor applications
- Approve or reject doctors
- Monitor system activity

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Doctors
- `GET /api/doctors` - Get all approved doctors
- `GET /api/doctors/:id` - Get doctor details
- `POST /api/doctors/apply` - Apply as doctor

### Appointments
- `POST /api/appointments/book` - Book appointment
- `GET /api/appointments` - Get user appointments
- `PUT /api/appointments/:id` - Update appointment

### Admin
- `GET /api/admin/doctors` - Get all doctor applications
- `PUT /api/admin/doctors/:id/approve` - Approve doctor
- `PUT /api/admin/doctors/:id/reject` - Reject doctor

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify Node.js version (v14+)
- Check if port 5000 is available

### Frontend won't connect to backend
- Verify backend is running on port 5000
- Check CORS settings
- Clear browser cache

### Database connection failed
- Verify MongoDB Atlas IP whitelist
- Check username and password
- Ensure database name in URI is correct

## Project Structure

```
book-a-doctor-app/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── DoctorList.jsx
│   │   │   ├── BookAppointment.jsx
│   │   │   ├── DoctorDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── index.html
│
├── README.md
├── SETUP_INSTRUCTIONS.md
└── .gitignore
```

## Technologies Used
- **Frontend**: React 18, Vite, Bootstrap 5, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **HTTP Client**: Axios

## License
MIT
