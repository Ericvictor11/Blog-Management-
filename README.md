# UNN Tori — Blog Management System

**UNN Tori** is a collaborative frontend web development project designed to provide a clean, responsive, and user-friendly blogging platform.

The name **UNN Tori** represents a storytelling platform, with *Tori* meaning *story* in Nigerian Pidgin English.

The project aims to provide a modern interface for reading, publishing, and managing blog content.

## Project Overview

UNN Tori is being developed as a team project using HTML5, CSS3, and vanilla JavaScript.

The platform is designed around several modules, including:

- Homepage and blog post listings
- User login and account registration
- Password reset interface
- Administrative dashboard
- Individual blog post pages
- Contact page

These modules are developed collaboratively and integrated into a single website.

**Current scope:** The authentication frontend has been implemented. Other planned modules are subject to team integration.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure and content |
| CSS3 | Styling, layout, animations, and responsiveness |
| JavaScript | Client-side validation and user interactions |
| Git | Version control |
| GitHub | Team collaboration and source code management |
| Node.js / npm | Running an optional local development server |

No PHP, MySQL, or backend authentication service is currently implemented in the authentication module.

## Authentication Module

The authentication module contains three main pages.

### 1. Login Page

Provides an interface for users to enter their email address and password.

Features include:

- Responsive login form
- Email address validation
- Required password validation
- Password visibility eye icon
- Remember Me interface
- Registration page navigation
- Forgot Password navigation
- Inline form feedback
- Accessible form controls

### 2. Registration Page

Provides an interface for creating an account.

Features include:

- Full name input
- Email address input
- Password and confirmation fields
- Password strength indicator
- Password matching validation
- Password visibility eye icons
- Responsive form layout
- Navigation to the login page

### 3. Reset Password Page

Provides an interface for requesting a password reset.

Features include:

- Email address input
- Client-side email validation
- Inline form feedback
- Responsive layout
- Navigation back to the login page

### Authentication Limitations

The authentication module is currently frontend-only.

Form validation is implemented, but real account creation, credential verification, persistent authentication, and password-reset email delivery require future backend integration.

## Branding and UI Design

The website uses the **UNN Tori** brand identity.

The branding includes:

- Custom circular lion logo
- Gold-accented authentication buttons
- Dark charcoal backgrounds
- Responsive page layouts
- Extra-bold brand typography
- Consistent form styling
- Custom website favicon

### Brand Colors

| Color | Hex Code | Purpose |
|---|---|---|
| Primary Charcoal | `#231F20` | Main dark theme |
| Gold | `#D4AF37` | Primary buttons and accents |
| Dark Gold | `#B89424` | Button hover states |
| Light Gray | `#EFF1F3` | Light backgrounds |
| Green | `#16A34A` | Success indicators |

## Project Structure

The current authentication module is organized approximately as follows:

```text
Blog-Management-System/
│
├── assets/
│   └── images/
│       └── unn-tori-logo.png
│
├── auth/
│   ├── login.html
│   ├── register.html
│   ├── reset-password.html
│   │
│   ├── css/
│   │   ├── auth-shared.css
│   │   ├── login.css
│   │   ├── register.css
│   │   └── reset-password.css
│   │
│   ├── js/
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── reset-password.js
│   │   └── password-visibility.js
│   │
│   └── assets/
│       └── images/
│
└── README.md
```

The project structure will expand as additional team modules are integrated.

## Getting Started

### Prerequisites

A modern web browser is required.

Node.js and npm can be used to run the frontend through a local development server.

### 1. Clone the Repository

```bash
git clone https://github.com/Ericvictor11/Blog-Management-.git
```

### 2. Open the Project Directory

```bash
cd Blog-Management-
```

### 3. Start the Development Server

The authentication module can be served without installing a frontend framework.

Run:

```bash
npx --yes live-server --port=5000 --host=127.0.0.1 --no-browser
```

This starts a local development server on port 5000.

### 4. Access the Website

After starting the server, open the following URLs:

**Login Page**

http://127.0.0.1:5000/auth/login.html

**Registration Page**

http://127.0.0.1:5000/auth/register.html

**Reset Password Page**

http://127.0.0.1:5000/auth/reset-password.html

The local URLs are accessible while the development server is running.

## Responsive Design

The authentication interface is designed to accommodate:

- Mobile devices
- Tablets
- Laptop screens
- Desktop screens

Responsive layouts, spacing, and typography are implemented through CSS media queries.

The interface also includes accessible form labels, keyboard focus indicators, feedback messages, and reduced-motion styling.

## Testing

During development, the authentication module underwent automated checks for:

- HTML structure and asset references
- JavaScript syntax
- Form validation
- Password visibility controls
- Navigation
- Responsive CSS rules

Earlier automated authentication tests passed during development.

The original `auth-ui.test.cjs` test file was subsequently removed as part of project cleanup.

Further browser-based visual and integration testing is recommended before final submission.

## Team Collaboration

This project uses Git and GitHub for collaboration.

Developers work on assigned modules and integrate their changes into the shared repository.

A recommended collaboration process is:

1. Create or switch to a feature branch.
2. Develop the assigned module.
3. Review the modified files.
4. Commit completed work.
5. Push the branch to GitHub.
6. Open a pull request for team review.
7. Merge approved changes into the main branch.

Example:

```bash
git switch -c feature/my-module
git add .
git commit -m "Complete assigned frontend module"
git push -u origin feature/my-module
```

Before merging changes, ensure that shared styles, assets, and navigation links are compatible with the other modules.

## Future Improvements

Potential future development includes:

- Backend account registration
- Secure user authentication
- Password hashing and session management
- Database integration
- Blog post creation and management
- Administrative authorization
- Password reset email delivery
- Complete end-to-end application testing
- Production deployment

These features are not claimed as implemented in the current authentication frontend.

## Project Status

**Status:** Frontend development and team integration in progress.

The Login, Registration, and Reset Password interfaces have been developed, refined, and prepared for integration.

## Repository

GitHub: https://github.com/Ericvictor11/Blog-Management-

## Acknowledgement

UNN Tori is a collaborative learning project demonstrating practical application of frontend web development, responsive design, version control, and teamwork.

---

**UNN Tori — Every Story Matters.**
