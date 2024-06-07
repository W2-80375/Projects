package com.sunbeaminfo.moviereview.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.recyclerview.widget.RecyclerView;

import com.sunbeaminfo.moviereview.R;
import com.sunbeaminfo.moviereview.activity.SeatActivity;

import java.util.ArrayList;
import java.util.List;

public class SeatAdapter extends BaseAdapter {
    private Context context;
    private List<String> seatData;
  //  private LayoutInflater inflater;
    private List<String> selectedSeats;


    public SeatAdapter(Context context, List<String> seatData) {
        this.context = context;
        this.seatData = seatData;
        //this.inflater = LayoutInflater.from(context);
        this.selectedSeats = new ArrayList<>();
    }

    @Override
    public int getCount() {
        return seatData.size();
    }

    @Override
    public Object getItem(int position) {
        return seatData.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
       // ViewHolder holder;


        if (convertView == null) {

            LayoutInflater inflater = LayoutInflater.from(context);
            convertView = inflater.inflate(R.layout.row_layout, parent, false);
//            holder = new ViewHolder();
//            holder.seatTextView = convertView.findViewById(R.id.column_text_1);
//            holder.checkboxSeat = convertView.findViewById(R.id.checkboxSeat);
        }

        TextView seatTextView = convertView.findViewById(R.id.column_text_1); // Change this ID based on your seat layout
       // seatTextView.setText(seatData.get(position));
        final String seat = seatData.get(position);
        seatTextView.setText(seat);

        CheckBox checkBoxSeat = convertView.findViewById(R.id.checkboxSeat);
        checkBoxSeat.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked && !selectedSeats.contains(seat)) {
                    // CheckBox is checked, perform actions when it's selected
                   // Toast.makeText(SeatAdapter.this, "Booking in progress...", Toast.LENGTH_SHORT).show();
                    Toast.makeText(context, "Seat selected", Toast.LENGTH_SHORT).show();
                       selectedSeats.add(seat);

                } else if (!isChecked && selectedSeats.contains(seat)){
                    // CheckBox is unchecked, perform actions when it's deselected
                    Toast.makeText(context, "Seat deselected", Toast.LENGTH_SHORT).show();
                    selectedSeats.remove(seat);
                }
            }
        });

        // Customize the seat view based on your requirements

        return convertView;


    }

    public List<String> getSelectedSeats() {
        return selectedSeats;
    }

//    static class ViewHolder {
//        TextView seatTextView;
//        CheckBox checkboxSeat;
//    }
}
