public class EcommerceSearch {

    public static void main(String[] args) {

        Product[] products = {
            new Product(101, "Laptop", "Electronics"),
            new Product(102, "Mouse", "Electronics"),
            new Product(103, "Keyboard", "Electronics"),
            new Product(104, "Shoes", "Fashion"),
            new Product(105, "Watch", "Accessories")
        };

        int targetId = 104;

        Product linearResult =
                SearchOperations.linearSearch(products, targetId);

        if (linearResult != null) {
            System.out.println("Linear Search Found:");
            System.out.println(linearResult);
        } else {
            System.out.println("Product Not Found");
        }

        Product binaryResult =
                SearchOperations.binarySearch(products, targetId);

        if (binaryResult != null) {
            System.out.println("\nBinary Search Found:");
            System.out.println(binaryResult);
        } else {
            System.out.println("Product Not Found");
        }
    }
}