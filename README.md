# UOL Past Papers

UOL Past Papers is a modern web application built with React and Vite that allows users to easily access past examination papers for courses offered at UOL. The app features a clean, responsive UI with dynamic routing for departments, semesters, and courses. Users can log in using Google OAuth to access additional protected content.

## Features

- **Explore Departments:** Browse through distinct departments.
- **Semester Selection:** View available semesters sorted in ascending order.
- **Course Listings:** Access courses for selected departments and semesters.
- **Authentication:** Secure login using Supabase's Google OAuth (with automatic redirection after successful log in).
- **Responsive Design:** Built with Tailwind CSS and Framer Motion for smooth animations and transitions.

## Tech Stack

- **Frontend:** React, Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Supabase for authentication and database queries

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/UOL-past-papers-tryy.git
   cd UOL-past-papers-tryy
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   *or*
   ```bash
   yarn
   ```

### Environment Setup

1. Create a `.env` file in the root of the project and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Configure Redirect URLs:**
   - In your [Supabase Project Dashboard](https://app.supabase.com/), add your local and production URLs under Authentication settings to handle OAuth redirects:
     - For local development: `http://localhost:3000` (or your dev server port)
     - For production: your deployed URL

### Running the Application

Start the development server:
```bash
npm run dev
```
Open your browser and navigate to the provided URL (typically `http://localhost:3000`).

### Building for Production

To create a production build, run:
```bash
npm run build
```
Then, preview the production build using:
```bash
npm run preview
```

## Usage

- **Browse Departments:** Start by exploring departments on the home screen.
- **Select a Semester:** Click on a department to view available semesters, sorted in ascending order.
- **View Courses:** Select a semester to see the list of courses. If a course does not have a link for the Mid or Final exam, a dialog will inform you accordingly.
- **Login:** If you're not logged in, attempting to view course details will prompt a login popup. Use the provided Google OAuth option to log in.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, improvements, or new features.

## License

This project has no license.
