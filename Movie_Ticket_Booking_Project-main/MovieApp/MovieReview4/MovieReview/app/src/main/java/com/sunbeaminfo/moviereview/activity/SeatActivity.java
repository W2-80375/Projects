package com.sunbeaminfo.moviereview.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.GridLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sunbeaminfo.moviereview.R;
import com.sunbeaminfo.moviereview.adapter.SeatAdapter;
import com.sunbeaminfo.moviereview.adapter.TheatreAdapter;
import com.sunbeaminfo.moviereview.api.RetrofitClient;
import com.sunbeaminfo.moviereview.entity.Booking;
import com.sunbeaminfo.moviereview.entity.Movie;
import com.sunbeaminfo.moviereview.entity.Theatre;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SeatActivity extends AppCompatActivity {

    private SeatAdapter seatAdapter;
    private TheatreAdapter theatreAdapter;
    Theatre theatre;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_seat);

        GridLayout gridLayout = findViewById(R.id.gridLayout);


        Button pickDateBtn = findViewById(R.id.pickDateBtn);
        pickDateBtn.setOnClickListener(v -> showDatePicker());

        Button btnBook = findViewById(R.id.btnBook);
        btnBook.setOnClickListener(v -> bookTickets());

        List<String> seatData = new ArrayList<>();
        SeatAdapter seatAdapter = new SeatAdapter(this,seatData);
        //gridLayout.setAdapter(seatAdapter);

        // Create seat buttons programmatically
        for (int i = 0; i < 20; i++) {
            Button seat = new Button(this);
            seat.setText("Seat(140/-) " + (i + 1));
            seatData.add("Seat " + (i + 1));
            seat.setTag(i + 1);
            seat.setBackgroundResource(R.drawable.ic_seat_available); // Set background resource for available seat
            seat.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    // Handle seat selection logic
                    int selectedSeat = (int) view.getTag();
                    Toast.makeText(SeatActivity.this, "Seat " + selectedSeat + " selected", Toast.LENGTH_SHORT).show();
                }
            });

            gridLayout.addView(seat);
        }

//        for (int i = 0; i < 35; i++) {
//            seatData.add("Seat " + (i + 1));
//        }
        seatAdapter = new SeatAdapter(this, seatData);
       // gridLayout.setAdapter(seatAdapter);

        // Handle book button click
        btnBook.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Implement booking logic
                Toast.makeText(SeatActivity.this, "Booking in progress...", Toast.LENGTH_SHORT).show();
            }
        });

        btnBook.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(SeatActivity.this, PaymentActivity.class);
                startActivity(intent);
            }
        });


    }
    private void showDatePicker() {
        DatePickerDialog datePickerDialog = new DatePickerDialog(
                this,
                (view, year, month, dayOfMonth) -> {
                    // Handle the selected date (e.g., display it, store it, etc.)
                    String selectedDate = year + "-" + (month + 1) + "-" + dayOfMonth;
                    showToast("Selected Date: " + selectedDate);
                },
                Calendar.getInstance().get(Calendar.YEAR),
                Calendar.getInstance().get(Calendar.MONTH),
                Calendar.getInstance().get(Calendar.DAY_OF_MONTH)
        );
        datePickerDialog.show();
    }
    private void showToast(String message) {
        Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }

//    private void bookTickets() {
//        // Get selected seats from the adapter
//        List<String> selectedSeats = seatAdapter.getSelectedSeats();
//
//
//        // For this example, I'm assuming you have a TextView to display the selected date
//        TextView selectedDateTextView = findViewById(R.id.selectedDateTextView);
//        String selectedDate = selectedDateTextView.getText().toString();
//
//        // Check if seats are selected and a date is picked
//        if (!selectedSeats.isEmpty() && !selectedDate.isEmpty()) {
//            // Perform the ticket booking logic (you can replace this with your specific implementation)
//            // For now, I'm just displaying a message with the selected seats and date
//            String message = "Booking Confirmed!\nSelected Seats: " + selectedSeats +
//                    "\nSelected Date: " + selectedDate;
//            showToast(message);
//
//            // Here, you may want to navigate to a confirmation screen or show a dialog
//        } else {
//            showToast("Please select seats and pick a date before booking.");
//        }
//    }
private void bookTickets() {
    // Assuming you have selected theater data
    theatre = (Theatre) getIntent().getSerializableExtra("theater");
    String selectedTheater = theatre.getTheatre_name();
    if (selectedTheater != null) {

        Booking bookingRequest = new Booking(theatre.getTheatre_name(), seatAdapter.getSelectedSeats());

        RetrofitClient.getInstance().getApi().bookTickets("your_booking_endpoint", bookingRequest).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if (response.isSuccessful()) {
                    if (response.body().get("status").getAsString().equals("success")) {

                        showToast("Booking Confirmed!\nSelected Seats: " + seatAdapter.getSelectedSeats() +
                                "\nSelected Theater: " + theatre.getTheatre_name());
//                        seatAdapter.addSelectedSeat("Seat " + selectedSeat);
                    } else {
                        // Booking failed, handle accordingly
                        showToast("Failed to book tickets. Please try again.");
                    }
                } else {
                    // Handle non-successful response
                    showToast("Failed to book tickets. Please try again.");
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                // Handle failure
                showToast("Failed to book tickets. Please try again.");
            }
        });
    } else {
        showToast("Please select a theater before booking.");
    }
}







}