package com.sunbeaminfo.moviereview.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.sunbeaminfo.moviereview.R;
import com.sunbeaminfo.moviereview.fragments.MovieListFragment;

public class TicketActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ticket);

        Button ticket= findViewById(R.id.ticket);

        ticket.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(TicketActivity.this, MainActivity.class);
                startActivity(intent);
            }
        });

    }

}