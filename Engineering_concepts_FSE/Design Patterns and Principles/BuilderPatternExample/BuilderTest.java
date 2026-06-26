package BuilderPatternExample;

public class BuilderTest {

    public static void main(String[] args) {

        // Gaming PC
        Computer gamingPC = new Computer.Builder()
                .setCPU("Intel i9")
                .setRAM(32)
                .setStorage(1000)
                .setGraphicsCard("NVIDIA RTX 4080")
                .build();

        // Office PC
        Computer officePC = new Computer.Builder()
                .setCPU("Intel i5")
                .setRAM(16)
                .setStorage(512)
                .setGraphicsCard("Integrated Graphics")
                .build();

        System.out.println("Gaming PC Configuration:");
        gamingPC.display();

        System.out.println("Office PC Configuration:");
        officePC.display();
    }
}
