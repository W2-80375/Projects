package com.sunbeaminfo.moviereview.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.sunbeaminfo.moviereview.R;
import com.sunbeaminfo.moviereview.activity.MovieDetailsActivity;
import com.sunbeaminfo.moviereview.api.API;
import com.sunbeaminfo.moviereview.entity.Movie;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class MovieListAdapter extends RecyclerView.Adapter<MovieListAdapter.MyViewHolder>{

    Context context;
    List<Movie> movieList;

    public MovieListAdapter(Context context, List<Movie> movieList) {
        this.context = context;
        this.movieList = movieList;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.list_movies,null);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        holder.textTitle.setText(movieList.get(position).getTitle());
       // holder.textDate.setText("Release Date - "+movieList.get(position).getRelease_date());
        String rawDate = movieList.get(position).getRelease_date();
        try {
        SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        Date date = inputFormat.parse(rawDate);

        // Format the date to display only the date part
        SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd");
        String formattedDate = outputFormat.format(date);

        holder.textDate.setText("Release Date - " + formattedDate);
        } catch (ParseException e) {
            e.printStackTrace();
            // Handle parsing exception if needed
        }
        holder.ratingBar.setRating((float)movieList.get(position).getRating());
//         holder.itemView.findViewById(R.id.imageMovie);
        Glide.with(context)
                .load(API.BASE_URL+"/"+movieList.get(position).getImage())
                .into(holder.imageMovie);



    }

    @Override
    public int getItemCount() {
        return movieList.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder{
        ImageView imageMovie;
        TextView textTitle,textDate;
        RatingBar ratingBar;
        @SuppressLint("WrongViewCast")
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            imageMovie = itemView.findViewById(R.id.imageMovie);
            textTitle = itemView.findViewById(R.id.textTitle);
            textDate = itemView.findViewById(R.id.textDate);
            ratingBar = itemView.findViewById(R.id.ratingBar);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(context, MovieDetailsActivity.class);
                    intent.putExtra("movie",movieList.get(getAdapterPosition()));
                    context.startActivity(intent);
                }
            });
            imageMovie.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent intent = new Intent(context, MovieDetailsActivity.class);
                    intent.putExtra("movie",movieList.get(getAdapterPosition()));
                    context.startActivity(intent);
                }
            });

        }
    }
}
