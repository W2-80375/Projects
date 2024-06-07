package com.sunbeaminfo.moviereview.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.sunbeaminfo.moviereview.R;
import com.sunbeaminfo.moviereview.api.API;
import com.sunbeaminfo.moviereview.entity.Movie;

import java.text.SimpleDateFormat;
import java.util.List;

public class MovieDetailsActivity extends AppCompatActivity {

    TextView textTitle,textDate,description;
    ImageView imageMovie;
    RatingBar ratingBar;
    Button bookTicket,cancel;

    List<Movie> movieList;
    Movie movie;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_movie_details);
        textTitle = findViewById(R.id.textTitle);
        textDate = findViewById(R.id.textDate);
        imageMovie = findViewById(R.id.imageMovie);
        ratingBar = findViewById(R.id.ratingBar);
        bookTicket = findViewById(R.id.bookTicket);
        description = findViewById(R.id.description);
        //cancel = findViewById(R.id.cancel);
        movie = (Movie) getIntent().getSerializableExtra("movie");



        if(movie!=null) {

            Log.e("moviedata",""+movie);
            textTitle.setText(movie.getTitle());


            // SimpleDateFormat postFormater = new SimpleDateFormat("MMMM dd, yyyy");
            //  String newDateStr = postFormater. format( movie.getRelease_date());
            //  Log.e("date",newDateStr);
            textDate.setText(movie.getRelease_date());
            ratingBar.setRating(movie.getRating());
            description.setText(movie.getDescription());
            Glide.with(this).load(API.BASE_URL + "/" + movie.getImage()).into(imageMovie);

            bookTicket.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent intent = new Intent(MovieDetailsActivity.this, TheatreActivity.class);
                    startActivity(intent);
                }
            });
//            cancel.setOnClickListener(new View.OnClickListener() {
//                @Override
//                public void onClick(View view) {
//                    finish();
//                }
//            });
        }else {
            Log.e("MovieDetailsActivity", "Movie object is null");
            finish();
        }
    }
}