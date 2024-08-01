"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils"; // Utility function for conditional class names
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "To-Do" | "In Progress" | "Under Review" | "Completed";
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: Date;
}
interface TaskListProps {
  items: Task[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}
export const TaskList = ({ items, onEdit, onReorder }: TaskListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setTasks(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedTasks = items.slice(startIndex, endIndex + 1);
    setTasks(items);
    const bulkUpdateData = updatedTasks.map((task) => ({
      id: task.id,
      position: items.findIndex((item) => item.id === task.id),
    }));
    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 text-sm rounded-md mb-4",
                      task.status === "Completed" &&
                        "bg-green-200 border-green-200 text-green-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-2 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        task.status === "Completed" &&
                          "border-r-green-200 hover:bg-green-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {task.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          task.priority === "Urgent" && "bg-red-700",
                          task.priority === "Medium" && "bg-yellow-700",
                          task.priority === "Low" && "bg-green-700"
                        )}
                      >
                        {task.priority}
                      </Badge>
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          task.status === "Completed" && "bg-green-700"
                        )}
                      >
                        {task.status}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(task.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
