public class SortingCustomerOrders {

    public static void main(String[] args) {

        Order[] orders = {
            new Order(101, "Rahul", 4500),
            new Order(102, "Ananya", 12000),
            new Order(103, "Priya", 7000),
            new Order(104, "Amit", 2000),
            new Order(105, "Rohan", 9000)
        };

        System.out.println("Original Orders:");
        SortOperations.displayOrders(orders);

        SortOperations.bubbleSort(orders);

        System.out.println("\nAfter Bubble Sort:");
        SortOperations.displayOrders(orders);

        Order[] quickOrders = {
            new Order(101, "Rahul", 4500),
            new Order(102, "Ananya", 12000),
            new Order(103, "Priya", 7000),
            new Order(104, "Amit", 2000),
            new Order(105, "Rohan", 9000)
        };

        SortOperations.quickSort(
                quickOrders,
                0,
                quickOrders.length - 1);

        System.out.println("\nAfter Quick Sort:");
        SortOperations.displayOrders(quickOrders);
    }
}