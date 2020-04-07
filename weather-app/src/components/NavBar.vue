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
