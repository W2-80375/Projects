package com.sunbeaminfo.moviereview.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sunbeaminfo.moviereview.R;
import com.sunbeaminfo.moviereview.adapter.MovieListAdapter;
import com.sunbeaminfo.moviereview.adapter.TheatreAdapter;
import com.sunbeaminfo.moviereview.api.API;
import com.sunbeaminfo.moviereview.api.RetrofitClient;
import com.sunbeaminfo.moviereview.entity.Movie;
import com.sunbeaminfo.moviereview.entity.Theatre;
import com.sunbeaminfo.moviereview.entity.User;
import com.sunbeaminfo.moviereview.utility.MovieReviewConstants;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TheatreActivity extends AppCompatActivity {
    RecyclerView recyclerView;

    TheatreAdapter theatreAdapter;
    List<Theatre> theatreList;

    Movie movie;
    Theatre theatre;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_theaters);
        recyclerView = findViewById(R.id.recyclerView);
        theatreList = new ArrayList<>();



        theatreAdapter = new TheatreAdapter(this, theatreList);

        recyclerView.setAdapter(theatreAdapter);
        recyclerView.setLayoutManager(new GridLayoutManager(this, 1));

        getTheater();
        //getTheatersId();


    }

    private void getTheater() {
        RetrofitClient.getInstance().getApi().getTheaters().enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if(response.body().get("status").getAsString().equals("success")){
                    JsonArray array = response.body().get("data").getAsJsonArray();
                    theatreList.clear();
                    for(JsonElement element:array){
                        JsonObject object = element.getAsJsonObject();
                        Log.e("listoftheater",object.toString());
                        Theatre theatre = new Theatre();
                        theatre.setTheatre_name(object.get("theatre_name").getAsString());
                        theatre.setTitle(object.get("title").getAsString());
                        theatre.setAddress(object.get("address").getAsString());
                        theatre.setTotal_seats(object.get("total_seats").getAsInt());
                        theatre.setRating(object.get("rating").getAsFloat());

                        theatreList.add(theatre);
                        Log.e("theaterlist",""+theatreList);

                    }
                    theatreAdapter.notifyDataSetChanged();
                }
            }
//private void getTheatersId() {
//    RetrofitClient.getInstance().getApi().getTheatersId(movie_id).enqueue(new Callback<JsonObject>() {
//        @Override
//        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
//            if(response.body().get("status").getAsString().equals("success")){
//                JsonArray array = response.body().get("data").getAsJsonArray();
//                theatreList.clear();
//                for(JsonElement element:array){
//                    JsonObject object = element.getAsJsonObject();
//                    Log.e("listoftheater",object.toString());
//                    Theatre theatre = new Theatre();
//                    theatre.setTheatre_name(object.get("theatre_name").getAsString());
//                    theatre.setTitle(object.get("title").getAsString());
//                    theatre.setAddress(object.get("address").getAsString());
//                    theatre.setTotal_seats(object.get("total_seats").getAsInt());
//                    theatre.setRating(object.get("rating").getAsFloat());
//
//                    theatreList.add(theatre);
//                    Log.e("theaterlist",""+theatreList);
//
//                }
//                theatreAdapter.notifyDataSetChanged();
//            }
//        }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(getApplicationContext(), "Something went wrong at Movies List", Toast.LENGTH_SHORT).show();
            }
        });
    }
}


