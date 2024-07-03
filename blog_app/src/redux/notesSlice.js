import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    title: 'Rabbit',
    description: "Rabbits love nothing more than having the space to run around, play, dig and explore while enjoying a bit of 'me' time. Show your bunnies you love them by offering a secure environment where they can display these natural behaviours safely away from predators. A happy rabbit is a loved rabbit!",
    mediaLink: 'https://cdn.cdnparenting.com/articles/2021/09/22115215/1411747946.jpg',
    bgColor: '#E0BCD1',
    date: '2024-06-26'
  },
  {
    id: '2',
    title: 'Dog',
    description: '“No matter how little money and how few possessions you own, having a dog makes you rich.” “The bond with a true dog is as lasting as the ties of this earth will ever be.” “The love of a dog is a pure thing. He gives you a trust which is total.',
    mediaLink: 'https://assets.vogue.in/photos/62502b8d90038a40f11ff27c/2:3/w_1280,c_limit/Dog%202.png',
    bgColor: '#D9E6A6',
    date: '2024-06-25'
  },
  {
    id: '3',
    title: 'Cat',
    description: "Cats are known for their mysterious and independent nature, but they can also be incredibly affectionate creatures. It's important for cat owners to understand the various ways cats express their love to strengthen the bond between them.",
    mediaLink: 'https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_960_720.jpg',
    bgColor: '#A6E6E6',
    date: '2024-06-24'
  },
  {
    id: '4',
    title: 'Fish',
    description: "Fish are known for their graceful movements and diverse colors, making them fascinating pets for aquarium enthusiasts. Understanding their habitat requirements and ensuring proper care are crucial for their well-being.",
    mediaLink: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1312&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg',
    bgColor: '#F5DCF4',
    date: '2024-06-27'
  },
  {
    id: '5',
    title: 'Mouse',
    description: "Mice are small rodents known for their curiosity and quick movements. As pets, they require specific housing and enrichment to stay healthy and active. Understanding their behavior helps in creating a safe and stimulating environment.",
    mediaLink: 'https://a-z-animals.com/media/2019/11/Mouse-in-wood.jpg',
    bgColor: '#BDBBED',
    date: '2024-06-28'
  },
  {
    id: '6',
    title: 'Parrot',
    description: "Parrots are highly intelligent and colorful birds known for their ability to mimic human speech and playful nature. They require social interaction, mental stimulation, and a varied diet to thrive as pets.",
    mediaLink: 'https://images.pexels.com/photos/1040397/pexels-photo-1040397.jpeg',
    bgColor: '#F5F58D',
    date: '2024-06-29'
  },
  {
    id: '7',
    title: 'Hamster',
    description: "Hamsters are small, nocturnal rodents appreciated for their compact size and low maintenance. They need a cage with plenty of bedding, toys for enrichment, and a balanced diet to ensure their well-being.",
    mediaLink: 'https://as2.ftcdn.net/v2/jpg/07/14/74/53/1000_F_714745308_FR7MPW2VaxdRqTreg5iifVBeSTSJjGrt.jpg',
    bgColor: '#f5f5dc',
    date: '2024-06-25'
  },
  {
    id: '8',
    title: 'Guinea Pig',
    description: "Guinea pigs are small, sociable rodents known for their gentle nature and vocalizations. They require a spacious cage, a diet rich in hay and fresh vegetables, and regular interaction to thrive as pets.",
    mediaLink: 'https://animals.sandiegozoo.org/sites/default/files/2019-04/animals_guineapig-domestic.jpg',
    bgColor: '#ffdab9',
    date: '2024-06-30'
  },
  {
    id: '9',
    title: 'Turtle',
    description: "Turtles are ancient reptiles known for their hard shells and slow movements. They require a tank with both water and dry land areas, a diet of vegetables and occasional protein, and UVB lighting for proper shell and bone health.",
    mediaLink: 'https://images.pexels.com/photos/3652958/pexels-photo-3652958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpg',
    bgColor: '#B9EDB9',
    date: '2024-06-29'
  }
 
];
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.push({ id: Date.now().toString(), ...action.payload });
    },
    deleteNote: (state, action) => {
      return state.filter(note => note.id !== action.payload);
    },
    updateNote: (state, action) => {
      const { id, description } = action.payload;
      const note = state.find(note => note.id === id);
      if (note) {
        note.description = description;
      }
    },
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
