<template>
  <div >
    {{searchcity}}
    {{weather}}
    {{listcard}}
<v-layout>
  <v-flex xs12 sm6 md3 lg2 class="pa-5">
     <v-card
    class="mx-auto pa-2"
    
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title class="text-center" style="margin-left:-12px">
      {{searchcity}}
    </v-card-title>

    <v-card-subtitle>
      <v-layout row>
        <v-flex xs7 md7 lg7>
      {{dateBuilder()}} <br>
      
      </v-flex>
      <v-flex xs5 md5 lg5  class="text-center">
        <p style="background-color:#8C9EFF50;color:#263238;font-size:25px;border-radius:10px;" class="pa-4">{{Math.round(weather.main.temp)}}'C </p>       
      </v-flex>
      </v-layout>

      <v-spacer></v-spacer>

     <v-card-actions>
      <v-btn
        icon
        @click="show = !show"
      > 
        <v class="ml-7" >More info</v>
        <v-icon class="ml-2">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
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
        searchcity:[],
        Api_key:  'f761d3b89cd387171fbecf6e8d8e2472',
        url_base: 'https://api.openweathermap.org/data/2.5/weather?q=',
        weather:   {},
        listcard: [],
        show: false
      }
    },

    methods:{
      setResults(results){
        this.weather=results;
        //this.listcard.push(results);
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
        if(this.searchcity.length > 3){
          console.log(this.searchcity.length)
          this.searchcity.shift()
        }
        this.searchcity.push(data);
        fetch(`${this.url_base}${this.searchcity[this.searchcity.length - 1]}&units=metric&appid=${this.Api_key}`)
        .then(res =>{
          return res.json();
        }).then(this.setResults);
      })
    }

   
  
  }
</script>
