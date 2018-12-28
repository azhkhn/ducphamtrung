<style lang="scss">
@import "./PageHeaderBlue.scss";
</style>

<script src="./PageHeaderBlue.js">
</script>

<template>
	<div class="pageHeader-blu">
		<div id="pageheader-all" >
			<b-row>

				<!-- <b-col md="7">
					<b-navbar toggleable type="dark">
						<b-navbar-nav >
							<b-navbar-brand href="/b2b/avaiSearch"><img class=" p-0" src="~icons/ezb2b.png" width="80px" height="40px" /></b-navbar-brand>
							<b-nav-item :id="avaisearch" @click="menuClick('/b2b/avaiSearch')" href="/b2b/avaiSearch">
								<b-button  variant="link" class="p-0 Availability" @click="AVAILABILITY()" ><img  src="~icons/Plan_header.png" width="27px" style="height:30px" /> {{$t('HOME')}}</b-button>
							</b-nav-item>
							<b-nav-item :id="hotel"  @click="menuClick('/b2b/hotelsofta')" href="/b2b/hotelsofta">
								<b-button variant="link" class="p-0 Availability" @click="hotels()"><img  src="~icons/Hotel_header.png" width="27px" style="height:30px" /> {{$t('HOTELS')}}</b-button>
							</b-nav-item>
							<b-nav-item :id="booking" @click="menuClick('/b2b/reservationSearch')" href="/b2b/reservationSearch">
								<b-button  variant="link" class="p-0 Availability" @click="ReservationSearch()"><img  src="~icons/Booking_header.png" width="27px" style="height:30px" /> Booking</b-button>
							</b-nav-item>
							<img  src="~icons/Report_header.png" width="27px" style="height:30px" class="mt-2"  />
							<b-nav-item-dropdown   text="Report" right  class="itemheader text-dark mt-2" href="/b2b/chartDashBoard">
								<b-dropdown-item class="text-dark" href="#" variant="link" @click="ChartDashBoard('/b2b/chartDashBoard')">{{$t('DASHBROAD')}}</b-dropdown-item>
							</b-nav-item-dropdown>
						</b-navbar-nav>
					</b-navbar>
				</b-col> -->
				<b-col>
					<b-navbar toggleable type="dark" style="float:right">
						<b-navbar-nav>
							<div class="cartheadeer mt-2" v-if="this.$store.getters['buy/bookings'].length !==0">
								<b-button id="btnCart" variant="link" @click="cart()"  v-if="this.$store.getters['buy/bookings'].length!==0" style="border-radius:20px;height: 28px;">
									<icon class="" name="shopping-cart" scale="1.3" style="color:white;"></icon>
									<span class="badge" v-if="this.$store.getters['buy/bookings'].length!==0">{{this.$store.getters['buy/bookings'].length}}</span>
									 <!-- v-b-tooltip.hover.top.html="tipMethodview($t('BOOK'))" -->
								</b-button>
								<b-button id="btnCart" variant="link" @click="cart()"  v-if="this.$store.getters['buy/bookings'].length===0" >
									<icon class="" name="shopping-cart" scale="1.3" style="color:white"></icon>
								</b-button>
							</div>
							<!-- <b-button variant="link" class="p-2" style="color:white" @click="Dashboard('Dashboard')">{{$t('DASHBROAD')}}</b-button> -->
							<icon name="user-circle" class="mt-3" style="color:#fff" scale="1.3"></icon>
							<b-nav-item-dropdown :text="user" right style="" class="itemheader text-dark mt-2">
								<b-dropdown-item class="text-dark" href="#" @click="myinfo">{{$t('PROFILE')}}</b-dropdown-item>
								<b-dropdown-item class="text-dark" href="#" @click="modalChangePassword($event)">{{$t('CHANGE_PASSWORD')}}</b-dropdown-item>
								<b-dropdown-item class="text-dark" href="#" @click="signOut()">{{$t('LOGOUT')}}</b-dropdown-item>
							</b-nav-item-dropdown>
						</b-navbar-nav>
					</b-navbar>
				</b-col>
			</b-row>
		</div>
					<b-modal size="sm" id="modalChangePassword" :title="$t('CHANGE_PASSWORD')" hide-header hide-footer @hidden="onHidden">
						<b-row>
							<b-col>
								<b-row>
									<b-col>{{$t('Current_Password')}}</b-col>
								</b-row>
								<b-row>
									<b-col>
										<b-form-group class="validatePageHeader"  label-size="md"  label-for="emailProfile" label-text-align="right">
											<b-form-input id="currentPass" type="password" v-model="itemss.currentPass" name="currPassword" size="md">
											</b-form-input>
										</b-form-group>
										<b-row>
											<b-col class="text-left">
												<span class="text-danger"  v-if="errorChangePassword === false && itemss.currentPass === ''">
													{{ $t('ValidateLocation_cb_AvaiSearch') }}
												</span>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<br>
								<b-row>
									<b-col>{{$t('New_Password')}}</b-col>
								</b-row>
								<b-row>
									<b-col>
										<b-form-group class="validatePageHeader" label-size="md" label-for="newPass" label-text-align="right">
											<b-form-input id="newPass" type="password" v-model="itemss.newPass" name="newPass" size="md">
										</b-form-input>
										</b-form-group>
										<b-row>
											<b-col class="text-left">
												<span class="text-danger" v-if="errorChangePassword === false && itemss.newPass.length < 8">
													{{ $t('NEWPASS_ERROR_REQUIRED') }}
												</span>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
								<br>
								<b-row>
									<b-col>{{$t('CfNew_Password')}}</b-col>
								</b-row>
								<b-row>
									<b-col>
										<b-form-group class="validatePageHeader" label-size="md"  label-for="cfNewPass" label-text-align="right">
											<b-form-input id="cfNewPass" type="password" v-model="itemss.cfnewPass" name="cfNewPass" size="md" >
											</b-form-input>
										</b-form-group>
										<b-row>
											<b-col class="text-left">
												<span class="text-danger"  v-if="errorChangePassword === false && itemss.cfnewPass === ''">
													{{ $t('ValidateLocation_cb_AvaiSearch') }}
												</span>
												<span class="text-danger" v-if="errorCfPassword === false && errorChangePassword === true">
													{{ $t('CFNEWPASS_ERROR_REQUIRED') }}
											</span>
												</b-col>
										</b-row>
									</b-col>
								</b-row>
								<b-row>
									<b-col md="4">
											<b-button class="btn-password" variant="link" size="md" @click="hideModal" @click.stop="hideModal('editProfile')" style="width: 95px;height: 37px;border-radius: 5px;border: solid 1px #258fe0;">{{$t('Cancel')}}</b-button>
									</b-col>
									<b-col >
										<b-button class="btn-password" variant="primary" size="md" @click.stop="cfchangePassword(itemss)" style="width: 100%;height: 37px;border-radius: 5px;border: solid 1px #258fe0;"> {{$t('Save')}} </b-button>
									</b-col>
								</b-row>
							</b-col>
						</b-row>

					</b-modal>
					<b-modal id="detailCart" size="lg" hide-header hide-footer>
						<template >
							<b-row>
								<b-col class="ml-3"><h4><b  style="color:#ccc"><icon class="" name="shopping-cart" scale="1.3" style="color:#ccc"></icon> {{$t('BOOKING_DETAIL')}}</b></h4></b-col>
							</b-row>
							<br>
							<b-row v-if="shopping.length > 0">
								<b-col class="ml-3"><h4>{{shopping[0].nameHotel}}</h4></b-col>
							</b-row>
							<br>
							<b-row class="headercart" style="margin:auto">
								<b-col class="name_room text-left" md="7"><b>{{$t('NAME_ROOM')}}</b></b-col>
								<b-col class="Quanlity text-center" md="1"><b>{{$t('Q')}}</b></b-col>
								<b-col class="Total text-right" md="3"><b>{{$t('TOTAL')}}</b></b-col>
								<b-col md="1"></b-col>
							</b-row>
							<br>
							<b-row v-for="(i,index) in $store.getters['buy/bookings']" :key="index" class="maincart" style="border-bottom:1px solid #ccc;margin-left:0px">

								<b-col class="name_room  mt-2 text-left" md="7">
									<p v-for="(ii,index) in i.nameplant" :key="index" v-if="ii.langCode===$store.getters.currentLanguage.code" class="">{{ii.title}}</p>
								</b-col>

								<b-col class="Quanlity mt-2 text-center" md="1">
									{{i.quantities}}
								</b-col>
								<b-col class="mt-2 text-right" md="3" >
									<p v-if="i.promotion === 0">
										{{$store.getters['user/getCurrentcy']}} {{formatPrice(i.price*items.rate)}}</p>
									<p v-else >{{$store.getters['user/getCurrentcy']}}  {{formatPrice(i.promotion*items.rate)}}</p>
								</b-col>
								<!-- <b-col> {{$store.getters['user/getCurrentcy']}} {{formatPrice(i.price*items.rate)}}</b-col> -->
								<b-col class="text-right" md="1">
									<b-row v-if="i.promotion === 0">
										<!-- <b-col> {{$store.getters['user/getCurrentcy']}} {{formatPrice(i.price*items.rate)}}</b-col> -->
										<!-- <b-col md="2" style="padding-right:0"> -->
											<b-button class="btndelete" variant="link" @click="deleteShop(i)">
												<icon  name="trash-alt" style="color:red;" scale="1"></icon>
											</b-button>
										<!-- </b-col> -->
									</b-row>
									<b-row v-else >
										<!-- <b-col class="mt-2">{{$store.getters['user/getCurrentcy']}} {{formatPrice(i.promotion*items.rate)}}</b-col> -->
										<!-- <b-col md="4" class="mt-1"> -->
											<b-button class="btndelete" variant="link" @click="deleteShop(i)">
											<icon name="trash-alt" style="color:red;" scale="1"  v-b-tooltip.hover.top.html="tipMethodview($t('DELETE'))"></icon>
											</b-button>
										<!-- </b-col> -->
									</b-row>
								</b-col>
							</b-row>
							<br>
							<b-row v-if="$store.getters['buy/bookings'].length === 0">
								<b-col class="text-center"><h5>{{$t('YOUR_SHOPPING_CART_IS_EMPTY')}}!</h5></b-col>
							</b-row>
							<b-row v-if="$store.getters['buy/bookings'].length > 0">
								<b-col cols="8" class="text-left">
									<p class="text-secondary ml-3" v-if="$store.getters['buy/bookings'].length > 0&&$store.getters['buy/bookings'][0].taxIncluded===false">* {{$t('THE_PRICE_DOES_NOT_INCLUDE_VAT_AND_SERVICE_CHARGE')}}</p>
									<p class="text-secondary ml-3" v-if="$store.getters['buy/bookings'].length > 0&&$store.getters['buy/bookings'][0].taxIncluded===true">* {{$t('THE_PRICE_DOES_INCLUDE_VAT_AND_SERVICE_CHARGE')}}</p>
								</b-col>
								<b-col cols="4" class="text-center" style="padding-right:25px;"  >
									<h5><b>{{$store.getters['user/getCurrentcy']}} {{formatPrice(totalShop*items.rate)}}</b></h5>
								</b-col>
							</b-row>
							<br>
							<b-row >
								<b-col class="text-right" md="9">
									<b-button variant="link" @click="clickDetailSearch" style="width: 230px;height: 37px;border-radius: 5px;border: solid 1px #258fe0;"> {{$t('CONTINUE_SHOPPING')}}</b-button>
								</b-col>
								<b-col class="text-right">
									<b-button variant="primary" v-if="$store.getters['buy/bookings'].length !== 0"  @click="clickBookRoom" style="width: 100%;height: 37px;border-radius: 5px;border: solid 1px #258fe0;"> {{$t('BOOK_NOW')}}</b-button>
								</b-col>
							</b-row>
						</template>
					</b-modal>
</div>
</template>

