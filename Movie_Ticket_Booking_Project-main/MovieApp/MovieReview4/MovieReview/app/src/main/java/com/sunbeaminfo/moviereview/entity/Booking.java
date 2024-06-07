package com.sunbeaminfo.moviereview.entity;

import java.io.Serializable;
import java.util.List;

public class Booking implements Serializable {

    private int theaterId;
    private List<String> selectedSeats;

    public Booking(String theaterId, List<String> selectedSeats) {
        this.theaterId = Integer.parseInt(theaterId);
        this.selectedSeats = selectedSeats;
    }

    public int getTheaterId() {
        return theaterId;
    }

    public void setTheaterId(int theaterId) {
        this.theaterId = theaterId;
    }

    public List<String> getSelectedSeats() {
        return selectedSeats;
    }

    public void setSelectedSeats(List<String> selectedSeats) {
        this.selectedSeats = selectedSeats;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "theaterId=" + theaterId +
                ", selectedSeats=" + selectedSeats +
                '}';
    }
}
