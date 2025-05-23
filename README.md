# eld-trip-logger


## Overview

ELD Trip Logger is a full-stack web application designed to help long-distance drivers log their trips, manage hours of service (HOS), and ensure compliance with transportation regulations. It features a Django REST API backend and a React frontend for a seamless user experience.

---

##  Features

- Trip logging with detailed timestamps and locations
- Hours of Service (HOS) tracking for compliance
- User authentication and authorization
- Responsive UI built with React
- REST API backend with Django and Django REST Framework

---

## Technologies Used

- **Backend:** Django, Django REST Framework, PostgreSQL (or your preferred DB)
- **Frontend:** React, React Router, Framer Motion, React Icons
- **Authentication:** JWT (JSON Web Tokens)
- **Others:** Axios for API requests

---

## Prerequisites

Make sure you have the following installed:

- Python 3.8+
- Node.js 14+
- Git
- PostgreSQL (or SQLite for development)

---

# ELD Trip Logger

## Overview

The **ELD Trip Logger** is a comprehensive full-stack web application designed to help long-distance drivers log their trips, efficiently manage Hours of Service (HOS), and ensure seamless compliance with transportation regulations. It features a robust Django REST API backend and a dynamic React frontend for a fluid user experience.

---

##  Features

- **Trip Logging:** Capture detailed trip information with precise timestamps and locations.  
- **Hours of Service (HOS) Tracking:** Stay compliant with regulations through accurate HOS monitoring.  
- **User Authentication & Authorization:** Secure access with robust user management.  
- **Responsive UI:** Enjoy a seamless experience across all devices, powered by React.  
- **REST API Backend:** A powerful and scalable backend built with Django and Django REST Framework.

---

##  Technologies Used

- **Backend:** Django, Django REST Framework, PostgreSQL   
- **Frontend:** React, React Router, Framer Motion, React Icons  
- **Authentication:** JWT (JSON Web Tokens)  
- **Other:** Axios for efficient API requests

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Python 3.8+  
- Node.js 14+  
- Git  
- PostgreSQL (or SQLite for development purposes)

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Thomas-m-waka/eld-trip-logger.git
cd eld-trip-logger
```

### 2. Backend Setup (Django)

Navigate into the backend directory:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv env
source env/bin/activate  # On Windows use: env\Scripts\activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Configure environment variables:

Create a `.env` file in the backend directory and add your secret key and database URL. Replace the placeholder values accordingly.



Run database migrations:

```bash
python manage.py migrate
```

Create a superuser (optional, for admin access):

```bash
python manage.py createsuperuser
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend API will be accessible at `http://localhost:8000/`.

---

### 3. Frontend Setup (React)

Open a new terminal and navigate to the frontend directory:

```bash
cd ../frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend application will be running at `http://localhost:3000/`.

---

## Usage

1. Open the frontend in your browser at `http://localhost:3000/`.  
2. Register or log in with your credentials.  
3. Use the dashboard to log trips and monitor your hours.  
4. Admin users can access the Django Admin interface at `http://localhost:8000/admin`.

