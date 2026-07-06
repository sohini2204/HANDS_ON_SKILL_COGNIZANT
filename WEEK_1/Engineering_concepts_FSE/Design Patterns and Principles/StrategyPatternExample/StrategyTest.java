package StrategyPatternExample;

public class StrategyTest {

    public static void main(String[] args) {

        PaymentContext context = new PaymentContext();

        // Credit Card Payment
        context.setPaymentStrategy(new CreditCardPayment());
        context.executePayment(5000);

        // PayPal Payment
        context.setPaymentStrategy(new PayPalPayment());
        context.executePayment(2500);
    }
}