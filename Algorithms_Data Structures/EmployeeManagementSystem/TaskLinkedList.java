public class TaskLinkedList {

    private Task head;

    // Add Task
    public void addTask(int taskId,
                        String taskName,
                        String status) {

        Task newTask =
            new Task(taskId, taskName, status);

        if (head == null) {
            head = newTask;
            return;
        }

        Task current = head;

        while (current.next != null) {
            current = current.next;
        }

        current.next = newTask;
    }

    // Search Task
    public Task searchTask(int taskId) {

        Task current = head;

        while (current != null) {

            if (current.taskId == taskId) {
                return current;
            }

            current = current.next;
        }

        return null;
    }

    // Traverse Tasks
    public void traverseTasks() {

        Task current = head;

        while (current != null) {
            System.out.println(current);
            current = current.next;
        }
    }

    // Delete Task
    public void deleteTask(int taskId) {

        if (head == null) {
            return;
        }

        if (head.taskId == taskId) {
            head = head.next;
            System.out.println("Task Deleted Successfully.");
            return;
        }

        Task current = head;

        while (current.next != null &&
               current.next.taskId != taskId) {

            current = current.next;
        }

        if (current.next != null) {
            current.next = current.next.next;
            System.out.println("Task Deleted Successfully.");
        } else {
            System.out.println("Task Not Found.");
        }
    }
}