<style lang="scss">
@import './DashBroad.scss';
</style>
<script src="./DashBroad.js"></script>

<template>
<div>
	<div id="DashBroad">
		<!-- <b-button-group id="nav">
    <b-button class="mx-5" @click="change('Dashboard')" variant="outline-success"><img class="icon-dashbroad" src="~/icons/Dashbroadcolor.png"><br>{{$t('DASHBOARD_PROFILE')}}</b-button>
    <b-button class="mx-5" @click="change('Profile')" variant="outline-success"><img class="icon-dashbroad" src="~/icons/Dashbroad03.png"><br>{{$t('PROFILE_BTN_PROFILE')}}</b-button>
    <b-button class="mx-5" variant="outline-success"><img  class="icon-dashbroad" src="~/icons/Dashbroad04.png"><br>{{$t('BOOKING_PROFILE')}}</b-button>
    <b-button class="mx-5" variant="outline-success"><img class="icon-dashbroad" src="~/icons/Dashbroad05.png"><br>{{$t('REPORT_PROFILE')}}</b-button>
    <b-button class="mx-5" variant="outline-success"><img class="icon-dashbroad" src="~/icons/Dashbroad06.png"><br>{{$t('SETTING_PROFILE')}}</b-button>
  </b-button-group> -->
   <!-- @click="currentView='Report'" -->
    <!-- @click="currentView='Settings'" -->
     <!-- @click="currentView='Booking'" -->
	</div>
  <div id="Content-DashBroad">

       <keep-alive>
           <component :is="currentView"></component>
       </keep-alive>
  </div>

</div>
</template>

