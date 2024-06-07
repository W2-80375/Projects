package com.sunbeaminfo.moviereview.adapter;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.sunbeaminfo.moviereview.fragments.MovieListFragment;
import com.sunbeaminfo.moviereview.fragments.ProfileFragment;

public class MainFragmentAdapter extends FragmentStateAdapter {
    public MainFragmentAdapter(@NonNull FragmentActivity fragmentActivity) {
        super(fragmentActivity);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
        switch (position){
            case 0:
                return new MovieListFragment();
            case 1:
                return new ProfileFragment();
        }
        return null;
    }

    @Override
    public int getItemCount() {
        return 2;
    }
}
