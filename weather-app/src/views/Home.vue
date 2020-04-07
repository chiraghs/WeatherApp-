<template>
  <div >
    {{searchcity}}
    {{weather}}
<v-layout>
  <v-flex xs12 sm6 md3 lg2 class="pa-5">
     <v-card
    class="mx-auto pa-2"
    
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title class="text-center">
      CityName
    </v-card-title>

    <v-card-subtitle>
      <v-layout row>
        <v-flex xs6 md6 lg6>
      Date <br>
      <v-text>W1</v-text>

      <v-text>W2</v-text>
      </v-flex>
      <v-flex xs6 md6 lg6  class="text-center">
        <p style="background-color:#8C9EFF50;color:#263238;font-size:25px;border-radius:10px;" class="pa-4">7 C </p>       
      </v-flex>
      </v-layout>
    </v-card-subtitle>

      

      <v-spacer></v-spacer>


    
  </v-card>
  </v-flex>
  </v-layout>
  </div>
</template>

<script>

import { bus } from '../main'

export default {
  name: 'Home',

  data(){
      return{
        searchcity:'',
        Api_key:  'f761d3b89cd387171fbecf6e8d8e2472',
        url_base: 'https://api.openweathermap.org/data/2.5/weather?q=',
        weather:   {}
      }
    },

    methods:{
      setResults(results){
        this.weather=results;
      },
      dateBuilder () {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
      
    }
    },

    created(){
      bus.$on('GetCity', (data) => {
        this.searchcity = data;
        fetch(`${this.url_base}${this.searchcity}&units=metric&appid=${this.Api_key}`)
        .then(res =>{
          return res.json();
        }).then(this.setResults);
      })
    }

   
  
  }
</script>
