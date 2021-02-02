<template>
<div>
  <v-layout row>
   <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >

      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Weather App</span>
      </v-toolbar-title>


      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search City"
        v-model="searchcity"
        @keypress="fetchWeather"

      />

      <v-spacer />

<v-menu
      v-for="([text, rounded], index) in btns"
      :key="text"
      :rounded="rounded"
      offset-y
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          :color="colors[index]"
          class="white--text ma-5"
          v-bind="attrs"
          v-on="on"
        >
          {{ text }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item"
          link
        >
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu
      v-for="([text, rounded], index) in btnss"
      :key="text"
      :rounded="rounded"
      offset-y
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          :color="colors[index]"
          class="white--text ma-5"
          v-bind="attrs"
          v-on="on"
        >
          {{ text }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="item in itemsunit"
          :key="item"
          link
        >
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="../assets/RCBlogo.jpg"
            alt="Vuetify"
          /></v-avatar>
      </v-btn>
    </v-app-bar>
    </v-layout>

    <v-snackbar
      v-model="snackbar" top
    >
      {{ Snackbar_text }}
      <v-btn
        color="white"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

</div>


</template>

<script>
import { bus } from '../main'

  export default {
    name: 'HelloWorld',

    data(){
      return{
        searchcity:'',
        btns: [
        ['Language', 'lg'],
      ],
      btnss: [
        ['Units', 'b-xl'],
      ],
      colors: ['blue accent-2', 'blue accent-2'],
      itemsunit: ['metric', 'standard','imperial',],
      items: ['en','hi','eu','id','fr','kr','pt','zu'],
        snackbar: false,
        Snackbar_text: 'Enter Valid City Name'
      }
    },

    methods:{
      fetchWeather(e){
        if(e.key == 'Enter' && this.searchcity != ''){
            bus.$emit('GetCity',this.searchcity)
            this.searchcity=''
        }
        else if(e.key == 'Enter' && this.searchcity == ''){
          this.snackbar = true
        }
      }
    }
  }
</script>
