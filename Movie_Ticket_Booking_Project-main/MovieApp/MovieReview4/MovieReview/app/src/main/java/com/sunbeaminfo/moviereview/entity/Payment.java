package com.sunbeaminfo.moviereview.entity;


import java.io.Serializable;

public class Payment implements Serializable {
    private String cardNumber;
    private String expMonth;
    private String expYear;
    private float amount;
    private String cvv;

    // Default constructor (required for serialization)
    public Payment() {
    }

    public Payment(String cardNumber, String expMonth, String expYear,float amount, String cvv) {
        this.cardNumber = cardNumber;
        this.expMonth = expMonth;
        this.expYear = expYear;
        this.amount = amount;
        this.cvv = cvv;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpMonth() {
        return expMonth;
    }

    public void setExpMonth(String expMonth) {
        this.expMonth = expMonth;
    }

    public String getExpYear() {
        return expYear;
    }

    public void setExpYear(String expYear) {
        this.expYear = expYear;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "cardNumber='" + cardNumber + '\'' +
                ", expMonth='" + expMonth + '\'' +
                ", expYear='" + expYear + '\'' +
                ", amount=" + amount +
                ", cvv='" + cvv + '\'' +
                '}';
    }
}
