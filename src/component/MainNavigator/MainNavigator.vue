<style  module lang="scss">
  @import './MainNavigator.scss';
</style>
<script src="./MainNavigator.js"></script>

<template>
<div>
	<div id="nav" style="color:yellow;" >
		<b-navbar type="light" toggleable style="padding-left:0">
			<b-navbar-toggle style="display:none" target="nav_dropdown_collapse"></b-navbar-toggle>
			<b-navbar-brand href="/outside/login"><img class="m-0 p-0" src="~icons/ezb2b_color.png" width="80px" height="40px"/></b-navbar-brand>
			<b-collapse is-nav id="nav_dropdown_collapse" style="height:30px">

			<b-navbar-nav class="ml-auto">
				<template v-for="(m, i) in menu">
					<!-- <b-nav-item  @click="menuClick(m)" class="border-right" :key="i">
				<b-button variant="outline-secondary" class="p-0" style="width:130px;height:30px;margin-right:50px">FAQ</b-button>
				</b-nav-item> -->
					<b-nav-item-dropdown v-if="m.sub_menus" :text="m.menu_name" right :key="i">
						<b-dropdown-item v-for="(sm, idx) in m.sub_menus" :key="idx" >
				<b-button style="border-radius: 20px;width: 150px;" type="submit" variant="outline-secondary" class="text-white ml-5" size="md">{{$t(sm.menu_name)}}</b-button>
				</b-dropdown-item>
					</b-nav-item-dropdown>
				</template>
				<!-- Navbar dropdowns -->
				<!-- <b-nav-item-dropdown :text="$t(currentLanguage())" right style="">
				<b-dropdown-item class="text-dark" v-bind:active="isCurrentLanguage('vi')" href="#" @click="changeLanguage('vi')"><img class="m-0 p-0"  style="border-radius: 2px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png" width="30px" height="30px"/> {{$t('vi')}}</b-dropdown-item>
				<b-dropdown-item class="text-dark" v-bind:active="isCurrentLanguage('en')" href="#" @click="changeLanguage('en')"><img class="m-0 p-0" style="border-radius:2px;" src="data:image/png;base64,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" width="30px" height="30px"/> {{$t('en')}}</b-dropdown-item>
				</b-nav-item-dropdown> -->
				<!-- <b-nav-item-dropdown v-if="menu.length>0" text="<span style='color:orange'>Helpline</span>" right style="margin:auto">
				<b-dropdown-item class="text-dark"><icon class="mt-1 pt-1" name="phone" scale="1"></icon> 1900 6159</b-dropdown-item> -->
				<!-- <b-dropdown-item @click="signOut()" href="#">3</b-dropdown-item> -->
				<!-- </b-nav-item-dropdown> -->
				<b-navbar-nav class="ml-auto">
				<p class="text-dark"><img src="~icons/phone-blue.png" width="15px" height="15px" /> <b>1900 6159</b></p>
				</b-navbar-nav>
			</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</div>
</template>

