package MVCPatternExample;

public class MVCTest {

    public static void main(String[] args) {

        // Create Model
        Student student = new Student();
        student.setName("Sohini");
        student.setId(101);
        student.setGrade("A");

        // Create View
        StudentView view = new StudentView();

        // Create Controller
        StudentController controller =
                new StudentController(student, view);

        System.out.println("Initial Student Details:");
        controller.updateView();

        // Update Student Details
        controller.setStudentName("Sohini Sen");
        controller.setStudentGrade("A+");

        System.out.println("\nUpdated Student Details:");
        controller.updateView();
    }
}