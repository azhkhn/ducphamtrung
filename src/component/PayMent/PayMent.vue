<style lang="scss">
	@import "./Payment.scss";
</style>

<script src="./Payment.js">

</script>



<template>
	<div id="Payment1">
		<div class="spinner" v-if="flag===3">
			<Spinner name="three-bounce" color="#e86e53" class="spin" />
		</div>
		<br>
		<br>

		<div>
			<b-row style="width:99%;margin:auto">

				<b-col class="container">
					<!-- <b-row style="margin-bottom:5px">
						<b-col style="text-align:center;color:#0b6ff1"><b> 1. {{$t('CHOOSE_YOUR_ROOM')}}</b></b-col>
						<b-col style="text-align:center;color:#0b6ff1"><b> 2. {{$t('ENTER_BOOKING_PAYMENT_DETAIL')}}</b></b-col>
						<b-col style="text-align:center;color:#767c84"><b> 3. {{$t('BOOKING_CONFIRMATION')}}</b></b-col>
					</b-row>

					<b-progress height="5px" :value="75" variant="primary" class="mb-2">
						<b-progress-bar :value="30" striped="striped"><b><h6></h6></b></b-progress-bar>
						<b-progress-bar :value="40" striped="striped"><b><h6></h6></b></b-progress-bar>
						<b-progress-bar :value="30" variant="secondary"><b><h6></h6></b></b-progress-bar>
					</b-progress> -->
					<ul class="progressbar">
						<li class="active active1"><b>{{$t('CHOOSE_YOUR_ROOM')}}</b></li>
						<li class="active active2"><b>{{$t('ENTER_BOOKING_PAYMENT_DETAIL')}}</b></li>
						<li class="noActive"><b>{{$t('BOOKING_CONFIRMATION')}}</b></li>
					</ul>

				</b-col>
			</b-row>
		</div>
		<b-row class="">
			<div id="app" class="container" style="margin-left:20px">
				<br>
				<h4>{{$t('ROOMS_AVAILABLE_IN')}} <b>{{minute}} : {{sec}}</b> </h4>
				<!-- {{$t('MINUTES')}} <b></b> {{$t('SEC')}} -->
			</div>
			<b-col md="8" style="min-height:400px;margin-left:20px">
				<div class="GuestInformation">
					<div class="headerPayment">
						<h5 style="padding-top:20px;"><b>{{$t('GUEST_INFORMATION')}}</b></h5>
					</div>
					<div class="formGuestInformation">
						<br>
						<!-- Contact email phone and country -->
						<div style="margin-left:5px;">
							<b-row >
								<b-col md="5">
									<div>
										<span class="textInfo">{{$t('CONTACT_NAME')}}</span>
										<span style="color: red">(*)</span>
										<br>
										<b-form-input v-model.trim="inputBooking.contactName" placeholder="" v-validate="'required'" id="contactName" type="text" name="contactName" size="md"></b-form-input>
										<span class="text-danger" v-if="errors.has('contactName')">{{ $t('ValidateLocation_cb_AvaiSearch') }}</span>

									</div>
								</b-col>
								<b-col md="5">
									<div>
										<span class="textInfo">{{$t('EMAIL')}}</span> <span style="color: red">(*)</span>
										<br>
										<b-form-input v-model="inputBooking.email" placeholder="abc@gmail.com" v-validate="'required|email'" id="emailadress" type="text" name="emailadress"></b-form-input>
										<span class="text-danger" v-if="errors.has('emailadress')">{{ $t('CONFIRMADDRESSEMAIL_ERROR_REQUIRED') }}</span>
									</div>
								</b-col>
							</b-row>
							<br>
							<b-row>
								<b-col md="5">
									<div>
										<span class="textInfo">{{$t('PHONE_NUMBER')}}</span> <span style="color: red">(*)</span><br>
										<input style="border: 1px solid #ccc;border-radius: 4px;padding:0px 10px" type="number" v-model="inputBooking.phoneNumber" placeholder="" v-validate="'required|min:9'" id="phoneNumber" name="phoneNumber" size="md">
										<span class="text-danger" v-if="errors.has('phoneNumber')">{{ $t('TELEPHONE_ERROR_REQUIRED') }}</span>
									</div>
								</b-col>
								<b-col md="5">
									<div>
										<span class="textInfo">{{$t('NATIONALITY')}}</span> <span style="color: red">(*)</span>
										<br>
										<b-form-select style="height:40px" type="text" name="country" size="md" v-model="inputBooking.nationality" placeholder="Viet Nam" v-validate="'required'" id="country">
											<option v-for="option in lstCountry">{{option.title}}</option>
										</b-form-select>
										<span class="text-danger" v-if="errors.has('country')">{{ $t('COUNTRY_ERROR_REQUIRED') }}</span>
									</div>
								</b-col>
							</b-row>
						</div>
					</div>
					<div class="CustomerInformation">
						<b-button @click="tesst('collapseinfo')" variant="link" aria-controls="collapse4" :aria-expanded="showCollapse ? 'true' : 'false'">
							<span v-if="showCollapse===true">{{$t('Hide')}} {{$t('CUSTOMER_INFORMATION')}}</span>
							<span v-if="showCollapse===false">{{$t('Show')}} {{$t('CUSTOMER_INFORMATION')}}</span>
						</b-button>
					</div>
					<!--information customer -->
					<b-collapse id="collapseinfo" class="mt-2" v-model="showCollapse">
						<div class="room" v-for="(i,index) in shoppingPlan" :key="index">
							<b-row style="margin-left:5px">
								<h5><b v-for="(ii,index) in i.nameplant" :key="index" v-if="ii.langCode==$store.getters.currentLanguage.code">  {{ii.title}} </b> </h5>
							</b-row>
							<br>
							<b-row style="margin-left:5px;">
								<b-col class="" md="5">
									<b-row>
										<b-col>
											<span class="textInfo">{{ $t('GUEST_DETAIL') }}</span>
										</b-col>
									</b-row>
									<b-row>
										<b-col>
											<b-form-input @change="$event =>guestDetails($event,i,index)" :placeholder="$t('Guest_Name')"></b-form-input>
										</b-col>
									</b-row>
								</b-col>
								<b-col md="5">
									<b-row>
										<b-col>
											<div class="AdultChil">
												<span class="textInfo">{{ $t('Adults_btn_ResultSearch') }}</span><br>
												<b-form-group label-size="md">
													<b-row class="rowselect1" style="margin:0px;">
														<b-button variant="link" @click="diffPlantAdult(i,index)" :disabled="i.sl <= 1 || i.sl == null">
															<icon class="mt-1" name="minus" scale="0.8"></icon>
														</b-button>
														<span class="slview" v-if="i.sl">{{i.sl}}</span><span class="slview" v-else>{{$t('Q')}}</span>
														<b-button variant="link" @click="addPlantAdult(i,index)" :disabled="i.disable == 0 ||i.sl >= i.maxAdultsRoom ">
															<icon class="mt-1" name="plus" scale="0.8"></icon>
														</b-button>
													</b-row>
												</b-form-group>
											</div>
										</b-col>
										<b-col >
											<div class="AdultChil">
												<span class="textInfo">{{ $t('Childrens_btn_ResultSearch') }}</span>
												<b-form-group label-size="md">
													<b-row class="rowselect1" style="margin:0px;">
														<b-button variant="link" @click="diffPlantChild(i,index)" :disabled="i.slC <= 0 || i.slC == null">
															<icon class="mt-1" name="minus" scale="0.8"></icon>
														</b-button>
														<span class="slview" v-if="i.slC">{{i.slC}}</span><span class="slview" v-else>{{$t('Q')}}</span>
														<b-button variant="link" @click="addPlantChild(i,index)" :disabled="i.disable == 0 || i.slC >=(i.maxGuests- i.maxAdultsRoom  )||i.maxGuests===i.maxAdultsRoom ||i.childrenPermitted===true">
															<icon class="mt-1" name="plus" scale="0.8"></icon>
														</b-button>
													</b-row>
												</b-form-group>
											</div>
										</b-col>
									</b-row>
								</b-col>
							</b-row>

							<!-- Special request -->

							<b-row style="margin-left:5px">
								<b-col md="10">
									<b-row>
										<b-col>
											<span class="textInfo">{{ $t('SPECIAL_REQUEST')}} </span>
										</b-col>
									</b-row>
									<b-row>
										<b-col>
											<b-form-input class="inputttt" @change="$event =>selectRequest($event,i,index)" :placeholder="$t('Special_request')"></b-form-input>
										</b-col>
									</b-row>
								</b-col>
							</b-row>
							<br>
							<br>
						</div>
					</b-collapse>
				</div>
				<div class="Optionalextrasoradditionalservices">
					<div class="headerPayment">
						{{ $t('OPTIONAL_EXTRAS_OR_ADDITIONAL_SERVICES') }}
					</div>
					<div class="formOptional">
						<b-col v-for="item in service" :key="item.idservice" style="width: 100%; margin: auto;">
							<br>
							<b-row class="option">
								<b-col md="3">
									<b-card overlay :img-src="item.image" img-alt="Card Image" text-variant="white" class="" style="width:150px;border-radius: 5px 0 0 5px;">
									</b-card>
								</b-col>

								<b-col>
									<b v-for="(i,index) in item.name" :key="index" v-if="i.langCode==$store.getters.currentLanguage.code"> {{i.title}}</b>
								</b-col>
								<b-col md="3">
									<b>{{$store.getters['user/getCurrentcy']}} {{formatPrice(item.price*exchangeRate)}}  </b>
								</b-col>
								<b-col md="2" style="margin-right:30px;">
									<b-form-select v-model="item.selected=0" @change="$event => choose($event,item)">
										<option v-for="option in formatArray(item.amount)">{{option}}</option>
									</b-form-select>
								</b-col>
							</b-row>
						</b-col>
						<br>
					</div>
				</div>

				<div class="Optionalextrasoradditionalservices">
					<div class="headerPayment">
						{{ $t('ADDITIONAL_REQUEST') }}
					</div>
					<div class="formOptional" >
						<br>
						<b-row>
							<b-col style="margin-left:20px; ">
								<b-form-checkbox id="checkbox" v-model="Earlychecking">
									{{ $t('EARLY_CHECKING') }}
								</b-form-checkbox>
							</b-col>
							<b-col style="margin-left:20px; ">
								<b-form-checkbox id="checkbox11" v-model="Nonsmokingroom">
									{{ $t('NON_SMOKING_ROOM') }}
								</b-form-checkbox>
							</b-col>
							<b-col style="margin-left:20px; ">
								<b-form-checkbox id="checkbox12" v-model="Hightfloor">
									{{ $t('HIGHT_FLOOR') }}
								</b-form-checkbox>
							</b-col>
							<b-col>
								<b-form-checkbox id="checkbox123" v-model="OtherRequest" @change="$event =>ShowCollapse($event)">
									{{ $t('OTHER_REQUEST') }}
								</b-form-checkbox>
							</b-col>
						</b-row>

						<br>
						<b-collapse id="collapse6" class="mt-2" v-model="showCollapse1">
							<b-row class="room">
								<b-col style="margin:0 15px">
									<span class="textInfo">{{ $t('OTHER_REQUEST') }} </span>
								</b-col>
							</b-row>
							<b-row class="room">
								<b-col style="margin:0 15px">
									<b-form-textarea id="textarea1" v-model="Otherrequests" placeholder="For the best services, please write down yours extra requests (if have)." :rows="3" :max-rows="6">
									</b-form-textarea>
								</b-col>
							</b-row>
							<br>
						</b-collapse>

					</div>

				</div>
				<div class="ChooseAPaymentMethod" v-if="paymenttoday!==0 || paymentcheck === '2'">
					<div class="headerPayment" style="margin-bottom:5px;">
						{{$t('CHOOSE_A_PAYMENT_METHOD')}}
					</div>
					<div class="formChooseAPaymentMethod">
						<b-row style="width: 98%; margin: auto;">
							<b-col>
								<b-form-group label="">
									<b-form-radio-group v-model="selectedATM" :options="optionsATM" name="radioInline">
									</b-form-radio-group>
								</b-form-group>
							</b-col>
						</b-row>
						<!-- <b-row style="width: 100%; margin: auto;">
							<b-col>{{$t('THE_SYSTEM_SUPPORTS_F0LLOWING')}}:</b-col>
						</b-row> -->
						<b-row style="width: 100%; margin: auto;">
							<b-col><img class="icon-dashbroad" src="~/asset/image/card.jpg" style="width:100%"></b-col>
							<!-- <b-col><img class="icon-dashbroad" src="~/icons/payment_logos_2.jpg" style="width:95%"></b-col>
							<b-col> <img class="icon-dashbroad" src="~/icons/payment_logos_3.jpg" style="width:95%"></b-col> -->
						</b-row>
						<br>
					</div>
				</div>
				<br>
			</b-col>
			<b-col style="min-height:400px;padding-left:5px;">
				<!--Reservation Info-->
				<div id="paymentbar">
					<!-- <div class="headerPayment">{{ $t('RESERVATION_INFO') }}
					</div> -->
					<div id="formReservationInfo">
						<b-row style="padding-bottom:10px;">
							<h5 id="title"><b>{{shopping[0].nameHotel}}</b></h5>
						</b-row>
						<b-row style="margin-left:-20px;">
							<b-col>
								<template v-for="i in 5">
										<span v-if="(shopping[0].rankStar)>=i"><icon class="ml-2 mt-1" name="star" scale="1" style="color:#f1a91d"></icon></span>
								</template>
									<span v-if="shopping[0].rankStar%1!==0"><icon class="ml-2 mt-1" name="star-half" scale="1" style="color:#f1a91d"></icon></span>
							</b-col>
						</b-row>

						 <b-row style="margin-left:-20px;">
							  <b-col><icon class="ml-2 pt-1" name="map-marker-alt" scale="1" style="color:#f1a91d"></icon> <span v-for=" (i,index) in shopping[0].address" :key="index" v-if="i.langCode==$store.getters.currentLanguage.code"> {{i.title}}</span>
							  </b-col>
						</b-row>
						<hr>
						<b-row><b-col>{{ $t('CHECKIN_DATE') }}:</b-col> <b-col class="text-right"> {{shopping[0].checkindatebook | moment('DD/MM/YYYY')}}</b-col></b-row>
						<b-row><b-col>{{ $t('CHECKOUT_DATE') }}: </b-col> <b-col class="text-right">  {{shopping[0].checkoutdatebook | moment('DD/MM/YYYY')}}</b-col></b-row>
						<b-row><b-col>{{ $t('TOTAL_LENGTH_OF_STAY') }}: </b-col> <b-col class="text-right"> {{totalNight}} {{ $t('NIGHT') }}</b-col></b-row><br>
						<!--Change stay date-->
						<a href="/b2b/resultSearch" style="color: blue" @click="changeRoom()"><u>{{ $t('CHANGE_STAY_DATE') }}</u></a>
						<hr>
						<b-row>
							<b-col>{{ $t('GUEST') }}:</b-col>
							<b-col class="text-right"><span >{{shopping[0].adult}} </span> {{$t('Adults_btn_ResultSearch')}}, <span >{{shopping[0].children}} </span> {{$t('Childrens_btn_ResultSearch')}}</b-col>
						</b-row>
						<b-row class="pt-3" v-for="(i,index) in shopping" :key="index">
							<b-col>
								<b-row>
									<b-col md="7">
										<p v-for="(j,index) in i.nameplant" :key="index" v-if="j.langCode==$store.getters.currentLanguage.code"><b>{{i.quantities}} x {{j.title}}</b></p>
									</b-col>
									<b-col style="text-align: right">
										<p> {{$store.getters['user/getCurrentcy']}} {{formatPrice(+i.price*exchangeRate)}}</p>
									</b-col>
								</b-row>
								<b-row v-if="(+i.price - +i.promotion)>0">
									<b-col md="6">
										<p class="text-success">{{$t('PROMOTION')}}: </p>
									</b-col>
									<b-col style="text-align: right" class="text-success">
										<p v-if="(+i.price - +i.promotion)>0"> {{$store.getters['user/getCurrentcy']}} -{{formatPrice((+i.price - +i.promotion)*exchangeRate)}}</p>
										<p v-if="(+i.price - +i.promotion)<0"> {{$store.getters['user/getCurrentcy']}} {{formatPrice((+i.price - +i.promotion)*exchangeRate)}}</p>
									</b-col>
								</b-row>
								<b-row v-for="(ii,index) in lstplant" :key="index" v-if="ii.idplant===i.idplant && ii.idroom===i.idRoom">
									<b-col>
										<p>{{ii.slAdult}} {{$t('Adults_btn_ResultSearch')}}, {{ii.slChil}} {{$t('Childrens_btn_ResultSearch')}}</p>
									</b-col>
								</b-row>
								<b-row v-for="(ii,index) in lstplant"  :key="index" v-if="ii.idplant===i.idplant && ii.idroom===i.idRoom">
									<b-col  md="6">
										<p ><b> {{ $t('EXTRA') }}:</b> {{ii.sumAdultPl}} {{$t('Adults_btn_ResultSearch')}}, {{ii.sumChidrenPl}} {{$t('Childrens_btn_ResultSearch')}}</p>
									</b-col>
									<b-col style="text-align: right">{{$store.getters['user/getCurrentcy']}} {{formatPrice(ii.sumprice*exchangeRate)}}</b-col>
								</b-row>
							</b-col>
						</b-row>
						<hr>
						<a href="/b2b/detailSearch" @click="changeRoom()" style="color: blue"><u>{{ $t('CHANGE_ROOM') }}</u></a>
					</div>
				</div>
				<div id="paymentbar">

					<div class="headerPayment">{{ $t('TOTAL_AMOUNT') }}</div>
					<div style="border-bottom: 1px solid #ccc; width:90%; margin:auto;">
					</div>
					<div>
						<br>
						<b-col>
							<b-row>
								<b-col>{{ $t('RETAIL_PRICE') }}</b-col>
								<b-col style="text-align: right">{{$store.getters['user/getCurrentcy']}} {{formatPrice(retailprice*exchangeRate)}}</b-col>
							</b-row>
							<b-row v-if="(retailprice-sumpromotion)>0">
								<b-col>{{ $t('DISCOUNT') }}</b-col>
								<b-col style="text-align: right">{{$store.getters['user/getCurrentcy']}} {{formatPrice((retailprice-sumpromotion)*exchangeRate)}}</b-col>
							</b-row>
							<b-row v-if="sumpriceservice!==0">
								<b-col>{{$t('EXTRA')}} {{$t('SERVICE')}}</b-col>
								<b-col style="text-align: right">{{$store.getters['user/getCurrentcy']}} {{formatPrice(sumpriceservice*exchangeRate)}}</b-col>
							</b-row>

							<b-row v-if="lstpl.length!==0"><br>
								<b-col>{{ $t('SURCHARGE_PEOPLE') }} </b-col>
								<b-col style="text-align: right">{{$store.getters['user/getCurrentcy']}} {{formatPrice(subTotalEX*exchangeRate)}}</b-col>
							</b-row>
							<br>
							<div style="border-bottom: 1px solid #ccc; width:100%; margin:auto;"></div>
							<br>
							<b-row >
								<b-col>{{ $t('SUB_TOTAL') }}</b-col>
								<b-col style="text-align: right">{{$store.getters['user/getCurrentcy']}} {{formatPrice(subTotal*exchangeRate)}}</b-col>
							</b-row>
							<b-row v-if="shopping[0].taxIncluded===false">
								<b-col>{{ $t('TAX_VAT') }}({{shopping[0].valueAddedTaxPercent}}%) {{ $t('AND_SERVICE_CHARGE') }} ({{shopping[0].serviceTaxPercent}}%)</b-col>
								<b-col style="text-align: right"> {{$store.getters['user/getCurrentcy']}} {{formatPrice(taxTotal*exchangeRate)}}</b-col>
							</b-row>
							<br>
							<div style="border-bottom: 1px solid #ccc; width:100%; margin:auto;"></div>
							<br>
							<b-row>
								<b-col><h5><b>{{ $t('TOTAL') }} (Inc. of taxes)</b></h5></b-col>
								<b-col style="text-align: right"><h5><b>{{$store.getters['user/getCurrentcy']}} {{formatPrice(Total*exchangeRate)}}</b></h5></b-col>
							</b-row>
						</b-col>
						<br>
					</div>
				</div>
				<div id="paymentbar">
					<div class="headerPayment">{{ $t('PAYMENT') }}</div>
					<div style="border-bottom: 1px solid #ccc; width:90%; margin:auto;"></div>
					<div>
						<b-col>
							<br>
							<b-row v-if="paymenttype===1 && paymenttoday !==0 && paymenttoday !==100 && Total!==0">
								<b-col md="1"> <md-radio style="margin:0px" v-model="paymentcheck" value='1' name="check" class="md-primary"></md-radio></b-col>
								<b-col >{{ $t('PAYMENT_TODAY') }} ( {{paymenttoday}}%)  </b-col>
								<b-col class="text-right" md="5"><b >{{$store.getters['user/getCurrentcy']}} {{formatPrice((paymenttoday/100)*Total*exchangeRate)}}</b><br><b v-if="shopping[0].currency!==$store.getters['user/getCurrentcy']">({{shopping[0].currency}} {{formatPrice((paymenttoday/100)*Total)}})</b></b-col>
							</b-row>
							<b-row v-if="paymenttype!==1  && paymenttoday !==0 && Total>=paymenttoday && Total!==0">
								<b-col md="1"> <md-radio style="margin:0px" v-model="paymentcheck" value='1'  name="check" class="md-primary"></md-radio></b-col>
								<b-col >{{ $t('PAYMENT_TODAY') }}</b-col>
								<b-col class="text-right" md="5"> <b class="text-right">{{$store.getters['user/getCurrentcy']}} {{formatPrice(paymenttoday*exchangeRate)}}</b><br><b v-if="shopping[0].currency!==$store.getters['user/getCurrentcy']">({{shopping[0].currency}} {{formatPrice(paymenttoday)}})</b></b-col>
							</b-row>
							<b-row v-if="(paymenttoday ===0 ||(Total < paymenttoday && paymenttype!==1))||Total===0">
								<b-col md="1"> <md-radio style="margin:0px" v-model="paymentcheck" value='3'  name="check" class="md-primary"></md-radio></b-col>
								<b-col >{{ $t('postpaid') }}</b-col>
								<b-col class="text-right" md="5"> <b class="text-right"></b></b-col>
							</b-row>
							<br>
							<b-row v-if="Total!==0">
								<b-col md="1"><md-radio style="margin:0px"  v-model="paymentcheck" value='2'  name="check" class="md-primary"></md-radio></b-col>
								<b-col >{{ $t('PAYMENT_NOW') }} (100%)  </b-col>
								<b-col class="text-right" > <b class="text-right">{{$store.getters['user/getCurrentcy']}} {{formatPrice(Total*exchangeRate)}} </b> <br><b v-if="shopping[0].currency!==$store.getters['user/getCurrentcy']">({{shopping[0].currency}} {{formatPrice(Total)}})</b></b-col>
							</b-row>
							<br>
						</b-col>
					</div>
					<div style="border-bottom: 1px solid #ccc; width:90%; margin:auto;"></div>
					<br>
					<div>
						<b-col>
							<b-form-checkbox id="checkbox1"
							style="padding-bottom:5px;"
								v-model="status"
								value="accepted"
								unchecked-value="not_accepted">
							</b-form-checkbox>{{ $t('I_AGREE_WITH_THE') }}<b-button variant="link"  @click.stop="viewAgree($event.target)"  >{{ $t('BOOKING_TERM_CONDITIONS') }}</b-button>{{ $t('BY_MAKING_THIS_BOOKING') }}.
						</b-col>
						<br>
					</div>
					<div>
						<b-col>
							<b-row>
								<b-col class="" md="3"><b-button class=""  variant="outline-primary" @click="cancel()" style="width: 100px;height: 40px;border-radius: 5px;">{{$t('Cancel')}}</b-button></b-col>
								<b-col class="btnn" v-if="flag!==3"><b-button  @click="Confirm()" variant="primary" :disabled="(status!=='not_accepted' && status!=='' ?false:true) || flag === 3 || Total <= 0" style=" width: 100%;height: 40px; border-radius: 5px;background-color:#258fe0;">{{$t('Confirm_col_AffiliateNetwork')}}</b-button></b-col>
							</b-row>
							<br>
							<md-dialog-confirm :md-active.sync="active" :md-content="$t('ERROR_CONFIRM')" @md-confirm="onConfirm" />
						</b-col>
					</div>
				</div>

				<br>
			</b-col>
		</b-row>


	<b-modal size="lg" hide-footer hide-header id="agree" @hide="resetModal" >

		<b-row>
			<b-col md="10">
				<h4><b>{{$t('BOOKING_TERM_CONDITIONS')}}</b></h4>
			</b-col>
			<b-col class="text-right">
				<b-button  @click="hideModal" size="md" @click.stop="hideModal('agree')" variant="link" style="padding:0px;">
						<p><img src="~icons/Exit.png" width="30px" height="30px" /></p>
			</b-button>

			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col>
				<h5 ><b>{{$t('PAYMENT_POLICY')}}</b></h5>
				<div v-for="(item,index) in itemModal.paymentPolicy" :key="index" v-if="item!==null">
						<div v-if="item.depositType === 1">
							<p>&nbsp;&nbsp;&nbsp;{{$t('PREPAYMENT')}} {{item.amount}}% {{$t('WITHIN')}} {{paymentDay}} </p>
						</div>
						<div v-if="item.depositType === 0">
							<p>&nbsp;&nbsp;&nbsp;{{$t('PREPAYMENT')}} {{item.amount}} {{$store.getters['user/getCurrentcy']}} {{$t('WITHIN')}} {{paymentDay*exchangeRate}} </p>
						</div>
					</div>
						<br><h5 ><b> {{$t('CANCELLATION_POLICY')}}</b></h5><br>
						<div v-for="(item,index) in itemModal.cancelPolicy" :key="index" v-if="item!==null">
						<div v-if="item.cancellationType === 1">
							<p>&nbsp;&nbsp;&nbsp;{{$t('IF_CANCELED_LATER')}} {{item.cancellationDay}} {{$t('DAY_WILL_BE_PAID')}} {{item.amount}} % </p>
						</div>
						<div v-if="item.cancellationType === 0">
							<p>&nbsp;&nbsp;&nbsp;{{$t('IF_CANCELED_LATER')}} {{item.cancellationDay}}  {{$t('DAY_WILL_BE_PAID')}} {{item.amount*exchangeRate}} {{$store.getters['user/getCurrentcy']}}</p>
						</div>
					</div>
					<br>

					<h5 ><b v-if="itemModal.childrenPolicy">{{$t('CHILDREN_POLICY')}}</b></h5><br>
					<p>&nbsp;&nbsp;<img  src="~icons/Children.png" width="30px" style="height:30px" class="" />
					{{$t('CHILDREN_BETWEEN')}} 0 - {{baged}} {{$t('YEARS_OLD_FREE_WITHOUT_EXTRA_BED')}}.
					</p>
					<br>
					<p>&nbsp;&nbsp;<img  src="~icons/Children.png" width="30px" style="height:30px" class="" />
					{{$t('CHILDREN_BETWEEN')}} {{baged + 1}} - {{caged}} {{$t('YEARS_OLD_CHARGED_BY_50_EXTRA_BED_OF_ADULT')}}.
					</p>
					<br>
					<h5><b>{{$t('CHECKIN_POLICY')}}</b></h5>
					<br>
					<b-row>
						<b-col md="4">
							<p >&nbsp;&nbsp;<img  src="~icons/Login-gray.png" width="27px" style="height:30px" class=""  /> {{$t('CHECKIN_TIME')}}: {{this.inHour}}</p>
						</b-col>
						<b-col>
							<p>&nbsp;&nbsp;<img  src="~icons/Logout-gray.png" width="27px" style="height:30px" class=""  /> {{$t('CHECKOUT_TIME')}}: {{this.outHour}}</p>
						</b-col>
					</b-row>
				<br>

			</b-col>
		</b-row>
		</b-modal>
	</div>
</template>

