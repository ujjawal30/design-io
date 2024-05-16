# design.io

design.io is a collaborative UI designing platform where users can work together in real-time with features like live cursors, real-time chat, and commenting. This project aims to streamline the design process, allowing for seamless collaboration among team members.

## Features

- Real-time collaboration with live cursors
- Real-time chat for instant communication
- Commenting system for feedback and discussions
- Built with modern technologies for a responsive and intuitive user experience

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS, shadcn/ui
- **Backend**: Next.js Server Actions & API routes, MongoDB
- **Authentication**: NextAuth
- **Real-time Collaboration**: Liveblocks

## Deployed Application

This application is deployed and accessible here.

[design-io-web.vercel.app](https://design-io-web.vercel.app/)

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**: Clone this repository to your local machine using the following command:

   ```
   https://github.com/ujjawal30/design-io.git
   ```

2. **Install dependencies**: Navigate to the project directory and install the necessary dependencies using npm or yarn:

   ```
   cd design-io
   npm install
   ```

3. **Set up environment variables**: Create a `.env.local` file in the root of your project and add the following environment variables:

   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=

   LIVEBLOCKS_SECRET_KEY=

   MONGODB_URI=
   MONGODB_NAME=design-io-dev
   ```

4. **Start the development server**: Once the dependencies are installed and environment variables are set, start the development server using the following command:

   ```
   npm run dev
   ```

5. **Access the application**: Open your web browser and navigate to `http://localhost:3000` to access the design.io application.

## Contributors

- [Ujjawal Gupta](https://github.com/ujjawal30)
