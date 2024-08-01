import TaskForm from "./_components/tasklist-from";

const TaskPage = async ({ params }: { params: { courseId: string } }) => {
  const dummyData = {
    tasks: [
      {
        id: "1",
        title: "Implement User Authentication",
        description:
          "Develop and integrate user authentication using email and password.",
        status: "To-Do",
        priority: "Urgent",
        deadline: new Date("2024-08-15"),
      },
      {
        id: "2",
        title: "Design Home Page UI",
        description:
          "Develop and integrate user authentication using email and password.",
        status: "In Progress",
        priority: "Medium",
        deadline: new Date("2024-08-15"),
      },
      {
        id: "3",
        title: "Integrate Cloud Storage",
        description:
          "Enable cloud storage for note backup and synchronization.",
        status: "Under Review",
        priority: "Urgent",
        deadline: new Date("2024-08-20"),
      },
      {
        id: "4",
        title: "Test Cross-browser Compatibility",
        description:
          "Ensure the app works seamlessly across different web browsers.",
        status: "Completed",
        priority: "Medium",
        deadline: new Date("2024-07-30"),
      },
      {
        id: "5",
        title: "Conduct User Feedback Survey",
        description:
          "Collect and analyze user feedback to improve app features.",
        status: "In Progress",
        priority: "Low",
        deadline: new Date("2024-08-05"),
      },
    ],
  };

  const boardId = "example-board-id";

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Task page</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 ">
        <TaskForm initialData={dummyData} boardId={boardId} />
      </div>
    </div>
  );
};

export default TaskPage;
