public class TaskManagementSystem {

    public static void main(String[] args) {

        TaskLinkedList taskList =
                new TaskLinkedList();

        taskList.addTask(
                101,
                "Design Database",
                "Pending");

        taskList.addTask(
                102,
                "Develop Backend",
                "In Progress");

        taskList.addTask(
                103,
                "Test Application",
                "Pending");

        System.out.println("All Tasks:");

        taskList.traverseTasks();

        System.out.println("\nSearching Task 102:");

        Task task = taskList.searchTask(102);

        if (task != null) {
            System.out.println(task);
        } else {
            System.out.println("Task Not Found.");
        }

        System.out.println("\nDeleting Task 103:");

        taskList.deleteTask(103);

        System.out.println("\nUpdated Tasks:");

        taskList.traverseTasks();
    }
}