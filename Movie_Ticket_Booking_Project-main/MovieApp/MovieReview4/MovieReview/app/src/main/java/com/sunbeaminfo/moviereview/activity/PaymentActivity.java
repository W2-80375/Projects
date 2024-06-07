package com.sunbeaminfo.moviereview.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.sunbeaminfo.moviereview.R;

public class PaymentActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_payment);

        Button btnPay = findViewById(R.id.btnPay);


//        EditText etCardNumber, etExpMonth, etExpYear, etCvv;
//
//
//                etCardNumber = findViewById(R.id.etCardNumber);
//                etExpMonth = findViewById(R.id.etExpMonth);
//                etExpYear = findViewById(R.id.etExpYear);
//                etCvv = findViewById(R.id.etCvv);
//                btnPay = findViewById(R.id.btnPay);
//
//                btnPay.setOnClickListener(new View.OnClickListener() {
//                    @Override
//                    public void onClick(View view) {
//                        handlePayment();
//                    }
//                });
//            }
//
//            private void handlePayment() {
//                // Retrieve payment details from EditText fields
//                String cardNumber = etCardNumber.getText().toString();
//                String expMonth = etExpMonth.getText().toString();
//                String expYear = etExpYear.getText().toString();
//                String cvv = etCvv.getText().toString();
//
//                // Validate payment details (add your validation logic here)
//
//                // If payment details are valid, you can proceed with further actions
//                // For now, display a toast message
//                String paymentDetails = "Card Number: " + cardNumber + "\n"
//                        + "Expiration Date: " + expMonth + "/" + expYear + "\n"
//                        + "CVV: " + cvv;
//
//                Toast.makeText(this, "Payment Successful!\n" + paymentDetails, Toast.LENGTH_SHORT).show();
//
//                // You may want to send the payment details to your server or perform other actions here
//
//        }

        btnPay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(PaymentActivity.this, TicketActivity.class);
                startActivity(intent);
            }
        });
    }

}