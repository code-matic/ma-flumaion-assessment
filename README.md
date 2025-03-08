# TaskMaster - Task Scheduler Application

![TaskMaster Logo](https://img.shields.io/badge/TaskMaster-Schedule%20with%20Ease-blue)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Redux](https://img.shields.io/badge/Redux-4.x-764ABC?logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?logo=tailwind-css)

A modern task scheduling application built with React, TypeScript, Redux, and Tailwind CSS. TaskMaster allows users to efficiently manage their tasks with time slot booking, task editing, and conflict detection.

## 🚀 Features

- **Task Management**: Create, edit, and delete tasks with detailed information
- **Time Slot Booking**: Schedule tasks with specific time slots
- **Conflict Detection**: Automatically detects and prevents overlapping time slots
- **Date Filtering**: View tasks scheduled for specific dates
- **Priority Levels**: Assign different priority levels to tasks
- **Status Tracking**: Track task status (New, Pending, In Progress, Completed)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Persistent Storage**: Tasks are saved to localStorage for persistence

## 📋 Task Properties

Each task includes the following information:

- Task name
- Description
- Status (New, Pending, In Progress, Completed)
- Due date
- Time slot (start time and end time)
- Priority (Low, Medium, High)
- Assignee
- Creation and update timestamps

## 🛠️ Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static typing for improved code quality
- **Redux Toolkit**: State management
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation
- **Tailwind CSS**: Utility-first CSS framework
- **React Toastify**: Toast notifications
- **Lucide React**: Icon library
- **UUID**: Unique ID generation
- **Vite**: Build tool and development server

## 🔧 Setup and Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/code-matic/ma-flumaion-assessment.git
   cd task-scheduler
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Usage

### Adding a Task

1. Click the "Add Task" button
2. Fill in the task details:
   - Name
   - Description
   - Status
   - Due Date
   - Time Slot (start and end time)
   - Priority
   - Assignee
3. Click "Create Task"

### Editing a Task

1. Click the edit (pencil) icon on a task
2. Modify the task details
3. Click "Update Task"

### Deleting a Task

1. Click the delete (trash) icon on a task
2. The task will be removed immediately

### Filtering Tasks by Date

1. Use the date picker in the filter section
2. The task list will update to show only tasks for the selected date
3. Click "Clear Filter" to show all tasks again

### Time Slot Conflicts

- If you try to schedule a task that overlaps with an existing task on the same day, you'll see a conflict error
- Adjust the time slot to resolve the conflict

## 🧩 Project Structure

```
src/
├── @types/          # TypeScript type definitions
├── assets/          # Static assets
├── components/      # React components
│   ├── input/       # Form input components
│   ├── TaskForm.tsx # Task creation/editing form
│   ├── TaskItem.tsx # Individual task display
│   └── TaskList.tsx # List of tasks
├── lib/             # Utility libraries
├── pages/           # Page components
│   └── Tasks.tsx    # Main tasks page
├── redux/           # Redux store setup
├── reduxfeatures/   # Redux slices and actions
│   └── taskSlice.ts # Task-related state management
├── utils/           # Utility functions
├── zod_validation/  # Zod validation schemas
│   └── taskSchema.ts # Task validation schema
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## 🔒 Data Persistence

TaskMaster uses localStorage to persist task data between sessions. No server-side storage is required, making it easy to deploy and use.

## 🧪 Validation

The application includes comprehensive validation:

- Required fields
- Time slot validation (end time must be after start time)
- Time slot conflict detection
- Input format validation

## 🎨 Styling

The application uses Tailwind CSS for styling, providing a clean, modern interface that is fully responsive across devices.

## 🔍 Future Enhancements

- User authentication
- Task categories and tags
- Recurring tasks
- Notifications and reminders
- Dark mode
- Calendar view to show blocked out tasks
- Drag and drop interface
- Export/import functionality

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

If you have any questions or feedback, please reach out to us at [akanbi.mubaraq@codematic.io](mailto:akanbi.mubaraq@codematic.io).

---

Built with ❤️ by [ Mubaraq Akanbi ]
