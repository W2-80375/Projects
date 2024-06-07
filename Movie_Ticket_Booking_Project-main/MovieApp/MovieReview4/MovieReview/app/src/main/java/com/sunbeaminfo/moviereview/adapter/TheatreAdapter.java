package com.sunbeaminfo.moviereview.adapter;

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

import com.sunbeaminfo.moviereview.R;
import com.sunbeaminfo.moviereview.activity.SeatActivity;
import com.sunbeaminfo.moviereview.entity.Theatre;

import java.util.List;

public class TheatreAdapter extends RecyclerView.Adapter<TheatreAdapter.MyViewHolder>{

    Context context;
    List<Theatre> theatreList;

    public TheatreAdapter(Context context,List<Theatre> theatreList) {
        this.context = context;
        this.theatreList = theatreList;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.theater_list,null);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        holder.theaterName.setText("Theater Name : "+theatreList.get(position).getTheatre_name());
        holder.theaterAddress.setText("Theatre Address : "+theatreList.get(position).getAddress());
        holder.totalSeats.setText("Total Seats : "+theatreList.get(position).getTotal_seats() + "");
        holder.movieName.setText("Movie Title : "+theatreList.get(position).getTitle());
        holder.ratingBar.setRating((float)theatreList.get(position).getRating());


    }

    @Override
    public int getItemCount() {
        return theatreList.size();
    }



    class MyViewHolder extends RecyclerView.ViewHolder{

        TextView theaterName,theaterAddress,totalSeats,movieName;
        ImageView img;
        RatingBar ratingBar;


        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            theaterName = itemView.findViewById(R.id.theaterName);
            theaterAddress = itemView.findViewById(R.id.theaterAddress);
            totalSeats = itemView.findViewById(R.id.totalSeats);
             ratingBar = itemView.findViewById(R.id.ratingBar);
            movieName = itemView.findViewById(R.id.titleMovie);



//            img.setOnClickListener(new View.OnClickListener() {
//                @Override
//                public void onClick(View v) {
//                    Intent intent = new Intent(context, SeatActivity.class);
//                    intent.putExtra("id",theatreList.get(getAdapterPosition()).get);
//                    context.startActivity(intent);
//                }
//            });
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent intent = new Intent(context, SeatActivity.class);
                    intent.putExtra("theatre",theatreList.get(getAdapterPosition()));
                    context.startActivity(intent);
                }
            });


        }
    }
}
