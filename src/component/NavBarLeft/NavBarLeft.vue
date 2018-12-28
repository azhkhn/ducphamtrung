<style lang="scss">
@import './NavBarLeft.scss';</style>
<script src="./NavBarLeft.js"></script>

<template>
<div>
<div class="left-navbar">
		<ul >
		<li v-if="currentView!=='ApplyforAccess'"><a href="#" @click="change('ApplyforAccess')" class="navbar-left-item"  style="padding-left:0px"><img v-if="currentView!=='ApplyforAccess'" src="~icons/Hotel gray.png" width="30px" height="30px" /><img v-if="currentView==='ApplyforAccess'" src="~icons/Hotel orange.png"  width="30px" height="30px" />{{$t('Apply_for_access')}}</a></li>
		<li v-if="currentView ==='ApplyforAccess'"><a href="#" @click="change('ApplyforAccess')" class="navbar-left-item"  style="padding-left:0px;font-weight: bold;"><img v-if="currentView!=='ApplyforAccess'" src="~icons/Hotel gray.png" width="30px" height="30px" /><img v-if="currentView==='ApplyforAccess'" src="~icons/Hotel orange.png"  width="30px" height="30px" />{{$t('Apply_for_access')}}</a></li>
		<li v-if="currentView!=='AffiliateNetwork'"><a href="#" @click="change('AffiliateNetwork')" class="navbar-left-item" style="padding-left:0px"><img v-if="currentView!=='AffiliateNetwork'"  src="~icons/Connectiongray.png" width="30px" height="30px" /><img v-if="currentView==='AffiliateNetwork'"  src="~icons/Connectionorange.png" width="30px" height="30px" />{{$t('Affiliate_Network')}}</a></li>
		<li v-if="currentView==='AffiliateNetwork'"><a href="#" @click="change('AffiliateNetwork')" class="navbar-left-item" style="padding-left:0px; font-weight: bold;"><img v-if="currentView!=='AffiliateNetwork'"  src="~icons/Connectiongray.png" width="30px" height="30px" /><img v-if="currentView==='AffiliateNetwork'"  src="~icons/Connectionorange.png" width="30px" height="30px" />{{$t('Affiliate_Network')}}</a></li>
		<!-- <li style="border-bottom: none;"><a href="#" @click="change('ReservationSearch')" class="navbar-left-item"><img  src="~icons/ReservationSearch.png" />{{$t('Reservation_Search')}}</a></li> -->
		</ul>


	</div>

	</div>
</template>

