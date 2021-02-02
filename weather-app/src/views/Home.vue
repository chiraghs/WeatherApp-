<template>
<div >
<v-layout row wrap>
  <v-flex  class="pa-5" xs12 sm6 md4 lg3  v-for='item in listcard.slice().reverse()' :key='item.name'>
     <v-card
    class="mx-auto pa-2" >
    <v-img
      :src="getImgLink(parseFloat(item.main.temp))"
      height="200px" alt=""
    ></v-img>

    <v-card-title class="text-center" style="margin-left:-12px">
      {{item.name}},{{item.sys.country}}
    </v-card-title>

    <v-card-subtitle>
      <v-layout row>
        <v-flex xs7 md7 lg7>
      {{dateBuilder()}} <br>

      </v-flex>
      <v-flex xs5 md5 lg5  class="text-center">
        <p style="background-color:#8C9EFF50;color:#263238;font-size:25px;border-radius:10px;" class="pa-4">{{Math.round(item.main.temp)}}'C </p>
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

        <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-send</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{item.wind.speed}} km/h , {{item.wind.deg}}deg</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-book</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{item.main.pressure}} </v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-home</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{item.main.humidity}}</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-menu</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{item.main.temp_min}}</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-cloud-download</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{item.clouds.all}}%</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-info>{{item.weather[0].main}}, {{item.weather[0].description}} </v-list-item-info>
    </v-list-item>

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
        unitt:'metric',
        langg:'hi',
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
        this.listcard.push(results);
      },
      getImgLink(stemp){
        if(stemp <=4){
          return require('../assets/'+'snow'+'.jpg')
        }
        else if(stemp >=4 && stemp <16){
          return require('../assets/'+'cold'+'.jpg')
        }
        else if(stemp >=16 && stemp <26){
          return require('../assets/'+'normal'+'.jpg')
        }
        else{
          return require('../assets/'+'hot'+'.jpg')
        }

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
        if(this.searchcity.length > 7){
          this.searchcity.shift()
          this.listcard.shift()
        }
        this.searchcity.push(data);
        fetch(`${this.url_base}${this.searchcity[this.searchcity.length - 1]}&units=${this.unitt}&appid=${this.Api_key}&lang=${this.langg}`)
        .then(res =>{
          return res.json();
        }).then(this.setResults);
      })
    }

  }
</script>
