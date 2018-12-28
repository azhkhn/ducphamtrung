<style lang="scss">
@import "./PaymentDetail.scss";
</style>
<script src="./PaymentDetail.js"></script>

<template>
	<b-row class="paymentreturn">
	<b-col  v-if="paymentDetail.status === 'PAYMENT_FAILED'" class="text-center">
		<br>
		<br>
		<p><icon class="" name="exclamation-triangle" scale="1.5" style="color:red"></icon></p>
		<p>{{$t('ERROR_BOOKING1')}}!</p>
		<br>
		<p>{{$t('ERROR_BOOKING2')}}.</p>
		<br>
		<p><b-button class="bt"  variant="link"  @click="goHome"><icon class="mt-2" name="angle-double-left" scale="0.7" style="color:blue"></icon> {{$t('BACK_HOME')}}</b-button></p>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
	</b-col>
		<b-col v-if="paymentDetail.status !== 'PAYMENT_FAILED'">
			<b-row>
				<b-col md="8">
				<br>
					<div>
						<img class="p-0" src="~icons/Bill Shape - Up.png" />
					</div>
					<div class="colleftView">
						<b-row class="bookingID">
							<b-col md="3" class="text-center">
								<p v-if="paymentDetail.status === 'AWAIT_FULLY_PAYMENT'"><img class="p-0" src="~icons/Pending-orange.png" width="84px" height="84px" /></p>
								<p v-if="paymentDetail.status === 'CANCEL' || paymentDetail.status === 'CLOSE'"><img class="p-0" src="~icons/Login-gray.png" width="84px" height="84px" /></p>
								<p  v-if="paymentDetail.status === 'AWAIT_PAYMENT'"><img class="p-0" src="~icons/Pending-orange.png" width="84px" height="84px" /></p>
								<p  v-if="paymentDetail.status === 'CONFIRM'"><img class="p-0" src="~icons/Check Mark.png" width="84px" height="84px" /></p>
								<p  v-if="paymentDetail.status === 'IN_SERVICE'"><img class="p-0" src="~icons/Check Mark-blue.png" width="84px" height="84px" /></p>
							</b-col>
							<b-col>
								<b-row>
									<b-col ><h4>{{$t('BOOKING_ID')}}: {{paymentDetail.bookingCode}}</h4></b-col>
								</b-row>
								<b-row>
									<b-col><p>{{paymentDetail.createdDate}}</p></b-col>
								</b-row>
								<b-row v-if="paymentDetail.status === 'AWAIT_FULLY_PAYMENT'">
									<b-col md="5"><p style="height: 30px;border-radius: 35px;background-color: #f8ad00;text-align:center;color:#fff;line-height:30px">{{$t('AWAIT_FULLY_PAYMENT_BOOKING')}}</p></b-col>
								</b-row>
								<b-row v-if="paymentDetail.status === 'CLOSE'">
									<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #b2b2b2; text-align:center;color:#fff;line-height:30px">{{$t('CLOSE_BOOKING')}}</p></b-col>
								</b-row>
								<b-row v-if="paymentDetail.status === 'CONFIRM'">
									<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #0da313; text-align:center;color:#fff;line-height:30px">{{$t('CONFIRM_BOOKING')}}</p></b-col>
								</b-row>
								<b-row  v-if="paymentDetail.status === 'CANCEL'">
									<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #b2b2b2; text-align:center;color:#fff;line-height:30px">{{$t('CANCEL_BOOKING')}}</p></b-col>
								</b-row>
								<b-row  v-if="paymentDetail.status === 'PAYMENT_FAILED'">
									<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #d9390d;text-align:center;color:#fff;line-height:30px">{{$t('PAYMENT_FAILED_BOOKING')}}</p></b-col>
								</b-row>
								<b-row  v-if="paymentDetail.status === 'IN_SERVICE'">
									<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #258fe0; text-align:center;color:#fff;line-height:30px">{{$t('INSERVICE_BOOKING')}}</p></b-col>
								</b-row>
								<b-row v-if="paymentDetail.status === 'AWAIT_PAYMENT'">
									<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #258fe0; text-align:center;color:#fff;line-height:30px">{{$t('AWAIT_BOOKING')}}</p></b-col>
								</b-row>
							</b-col>
						</b-row>
						<b-row class="schedule">
							<b-col md="3" class="text-center"><p><img class="p-0" src="~icons/House Keeping Copy-gray.png" width="30px" height="30px" /></p> <b>Schedule</b></b-col>
							<b-col>
								<p class="CheckInDate"><img class="p-0" src="~icons/Calendar-gray.png" width="24px" height="24px" /> {{paymentDetail.checkIn}} <img class="p-0" src="~icons/Arrow Right-gray.png" width="30px" height="30px" /> <img class="p-0" src="~icons/Calendar-gray.png" width="24px" height="24px" /> {{paymentDetail.checkOut}}</p>
							</b-col>
							<b-col>
								<p class="CheckInDate"><img class="p-0" src="~icons/Room Type-gray.png" width="24px" height="24px" /> {{paymentDetail.adults}} {{$t('Adults_btn_ResultSearch')}}, {{paymentDetail.children}} {{$t('Childrens_btn_ResultSearch')}}</p>
							</b-col>
						</b-row>
						<b-row class="schedule">
							<b-col md="3" class="text-center"><p><img class="p-0" src="~icons/Room Type-gray.png" width="30px" height="30px" /></p> <b>Contact</b></b-col>
							<b-col>
								<p style="padding-left:10px">{{$t('CONTACT_NAME')}}:</p>
								<p class="Contact">{{paymentDetail.cusName}}</p>
								<br>
								<p style="padding-left:10px">{{$t('PHONE_NUMBER')}}:</p>
								<p class="Contact">{{paymentDetail.cusPhone}}</p>
							</b-col>
							<b-col>
								<p style="padding-left:10px">{{$t('EMAIL')}}:</p>
								<p class="Contact">{{paymentDetail.cusEmail}}</p>
								<br>
								<p style="padding-left:10px">{{$t('NATIONALITY')}}:</p>
								<p class="Contact">{{paymentDetail.cusCountry}}</p>
							</b-col>
						</b-row>
						<b-row  class="schedule">
							<b-col md="3" class="text-center"><p><img class="p-0" src="~icons/shopping cart gray.png" width="30px" height="30px"/></p><b>Price</b></b-col>
							<b-col>
								<b-row>
									<b-col >
									<b-table show-empty
										:items="paymentDetail.lines"
										:fields="fields"
										@filtered="onFiltered"
										:current-page="currentPage"
										:per-page="perPage"
										:filter="filter"
										id="tableviewD" >
										<template slot="Title" slot-scope="row">
											<b-col>
												<b>{{row.item.title}} </b> &nbsp;&nbsp;&nbsp;
												<i v-if="row.item.lineType === 0">{{row.item.adults}}  {{$t('Adults_btn_ResultSearch')}}, {{row.item.children}} {{$t('Childrens_btn_ResultSearch')}} </i>

											</b-col>
											<b-col>
												<span v-if="row.item.lineType === 0">
												<i>{{$t('SURCHARGE_PEOPLE')}}: {{paymentDetail.currency}} {{(row.item.extraAdultPrice + row.item.extraChildrenPrice)}} </i>
												</span>
											</b-col>
										</template>
										<template slot="Total" slot-scope="row" class="textright">
											<b-col class="textright">
												<b>{{paymentDetail.currency}} {{formatPrice(((row.item.unitPrice * row.item.quantity)+(row.item.extraAdultPrice + row.item.extraChildrenPrice)))}} </b>
											</b-col>
										</template>
									</b-table>
									</b-col>
								</b-row>
								<br>
								<b-row>
									<b-col class="">
										<b-row>
											<b-col class="" md="9">
												<p>{{$t('SUB_TOTAL')}}:</p>
											</b-col>
											<b-col class="text-right">
												<p>{{paymentDetail.currency}} {{formatPrice(paymentDetail.subTotal)}}</p>
											</b-col>
										</b-row>
										<br>
										<b-row>
											<b-col class="" md="9">
												<p>{{$t('TAX_VAT')}} ({{paymentDetail.vat}}%) {{$t('AND_SERVICE_CHARGE')}} ({{paymentDetail.svc}}%):</p>
											</b-col>
											<b-col class="text-right">
												<b>{{paymentDetail.currency}} {{formatPrice(paymentDetail.totalTaxes)}}</b>
											</b-col>
										</b-row>
										<br>
										<b-row>
											<b-col class="" md="9">
												<b>{{$t('TOTAL')}} (Inc. of taxes):</b>
											</b-col>
											<b-col class="text-right">
												<b style="color:blue">{{paymentDetail.currency}} {{formatPrice(paymentDetail.totalCost)}}</b>
											</b-col>
										</b-row>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
						<b-row class="schedule">
							<b-col md="3" class="text-center"><p><img class="p-0" src="~icons/More-gray.png" width="30px" height="30px" /></p> <b>Adition</b></b-col>
							<b-col>
								<p><b>{{$t('ADDITTIONAL_REQUEST')}}</b></p>
								<b-row>
									<b-col v-if="paymentDetail.earlyCheckin===true"><img class="p-0" src="~icons/Checked.png" width="27px" height="27px" /> {{ $t('EARLY_CHECKING') }}</b-col>
									<b-col v-if="paymentDetail.noSmokingRoom===true"><img class="p-0" src="~icons/Checked.png" width="27px" height="27px" /> {{ $t('NON_SMOKING_ROOM') }} </b-col>
									<b-col v-if="paymentDetail.highFloor===true"><img class="p-0" src="~icons/Checked.png" width="27px" height="27px" /> {{ $t('HIGHT_FLOOR') }}</b-col>
								</b-row>
								<br>
								<b-row>
									<b-col v-if="paymentDetail.notes !==''"><p>{{ $t('OTHER_REQUEST') }}</p></b-col>
								</b-row>
								<b-row>
									<b-col v-if="paymentDetail.notes!==''"><p>{{paymentDetail.notes}}</p></b-col>
								</b-row>
							</b-col>
						</b-row>
						<b-row class="schedule">
							<b-col md="3" class="text-center"><p><img class="p-0" src="~icons/Credit-gray.png" width="30px" height="30px" /></p> <b>Payment</b></b-col>
							<b-col>
								<b-row class="textleft" v-if="paymentDetail.payRes !== null" v-for="item in paymentDetail.payRes">
									<b-col md="8" class="boder">
										<b-row>
											<b-col  class="text-secondary">{{item.paymentMethod}}</b-col>
										</b-row>
										<b-row>
											<b-col>
											Trans. ID: <b>{{item.tranNo}}</b>
											</b-col>
										</b-row>
										<b-row>
											<b-col>
											Trans. date: &nbsp&nbsp <p><b>{{item.tranDate | moment('DD/MM/YYYY')}}</b></p>
											</b-col>
										</b-row>
									</b-col>
									<b-col class="boder">
										<p class="text-right" style="color: gray"><b>{{paymentDetail.currency}}&nbsp; {{formatPrice(item.amountPayment)}}</b></p>
									</b-col>
								</b-row>
								<hr>
								<b-row>
									<b-col>
										<b>{{$t('TOTAL_PAID')}}:</b>
									</b-col>
									<b-col class="text-right">
										<b>{{paymentDetail.currency}}&nbsp;{{formatPrice(paymentDetail.payableAmount)}}</b>
									</b-col>
								</b-row>
								<br>
								<b-row style="height:35px;line-height:35px">
									<b-col  >
										<b style="color:red;font-size:20px">{{$t('UNPAID_AMOUNT')}}:</b>
									</b-col>
									<b-col class="text-right">
										<b style="color:red; font-size:20px">{{paymentDetail.currency}} &nbsp;{{formatPrice((paymentDetail.totalCost-+paymentDetail.payableAmount))}}</b>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
					</div>
					<div>
						<img class="p-0" src="~icons/Bill Shape - Down.png" />
					</div>
					<br>
					<div v-if="paymentDetail.status === 'AWAIT_PAYMENT'">
						<b-row>
							<b-col md="10">
								<p>{{$t('CLICK_ON_THE_RESERVATION_NUMBER')}} <b-link>{{paymentDetail.cusEmail}}</b-link>.</p>
							</b-col>
						</b-row>
					</div>
					<div v-if="paymentDetail.status === 'AWAIT_FULLY_PAYMENT'">
						<b-row>
							<b-col>
								<p>{{$t('THANK_YOU_FOR_USING')}}.</p>
							</b-col>
						</b-row>
					</div>
					<div v-if="paymentDetail.status === 'CONFIRM'">
						<b-row>
							<b-col>
								<p>{{$t('A_CONFIRMATION')}} <span style="color:blue">{{paymentDetail.cusEmail}}</span>.</p>
							</b-col>
						</b-row>
					</div>
					<div v-if="paymentDetail.status === 'CANCEL'">
						<b-row>
							<b-col>
								<p>{{$t('THANK_YOU_FOR_USING')}}.</p>
							</b-col>
						</b-row>
					</div>
				</b-col>
				<b-col>
					<div class="colrightViewHotel">
						<div style="border-bottom:1px solid #dcdcdc">
							<br>
							<h5><b v-for="i in paymentDetail.hotels" v-if="i.langCode==$store.getters.currentLanguage.code"  v-html="i.title"></b></h5>
							<!-- <span v-for="i in paymentDetail.hotelTypes.i18ns" v-if="i.langCode===$store.getters.currentLanguage.code">{{i.title}}</span> -->
							<br>
							<!-- <div>
								<template v-for="ii in 5">
									<span v-if="(paymentDetail.star) >= ii"><icon  name="star" scale="1" style="color:#fbb616"></icon></span>
									<span style="margin-left:15px"></span>
								</template>
									<span v-if="paymentDetail.star%1!==0"><icon name="star-half" scale="1" style="color:#fbb616;margin-left:-15px"></icon></span>
							</div> -->
							<!-- <div>
								<b-row>
									<b-col md="2" style="padding-right:0">
										<img class="p-0" src="~icons/Location-gray.png" width="25px" height="25px" />
									</b-col>
									<b-col style="padding-left:0">
										<span style="font-size: 12px;" v-for="i in paymentDetail.locations" v-if="i.lang===$store.getters.currentLanguage.code">{{i.name}}</span>
									</b-col>
								</b-row>
							</div>
							<br> -->
						</div>
						<br>
						<!-- <div  style="border-bottom:1px solid #dcdcdc">
							<div>
								<b>{{$t('CHECKIN_POLICY')}}:</b>
							</div>
								<br>
							<b-row>
								<b-col >
									{{$t('CHECKIN_TIME')}}:
								</b-col>
								<b-col>
									<p>{{this.paymentDetail.checkinTime}}</p>
								</b-col>
							</b-row>
							<b-row>
								<b-col >
									{{$t('CHECKOUT_TIME')}}:
								</b-col>
								<b-col>
									<p>{{this.paymentDetail.checkoutTime}}</p>
								</b-col>
							</b-row>
							<br>
						</div>
						<br>
						<div  style="border-bottom:1px solid #dcdcdc">
						<br>
							<div>
								<b>{{$t('CHILDREN_POLICY')}}:</b>
							</div>
							<b-row >
								<b-col>{{$t('CHILDREN_BETWEEN')}} 0 - {{this.paymentDetail.babyAgeDetermine}} {{$t('YEAR_OLD_STAY')}}.</b-col>
								<br>
							</b-row>
							<b-row>
								<b-col>{{$t('CHILDREN_BETWEEN')}} {{this.paymentDetail.babyAgeDetermine + 1}} - {{this.paymentDetail.childAgeDetermine}} {{$t('YEAR_OLD_ARE')}}.</b-col>
							</b-row>
							<br>
						</div>
						<br>
						<div style="border-bottom:1px solid #dcdcdc">
							<br>
							<div>
								<b>{{$t('PAYMENT_POLICY')}}:</b>
							</div>
							<b-row md="10" v-for="item in paymentDetail.depositResponses">
								<b-col v-if="item.paymentType === 1">
									<p>{{item.amount}}% {{$t('DEPOSIT_UPON_RESERVATION')}} {{item.paymentDay}} {{$t('DAYS_PRIOR')}}.</p>
								</b-col>
								<b-col v-if="item.paymentType === 0">
									<p>{{item.amount}} {{paymentDetail.currency}} {{$t('DEPOSIT_UPON_RESERVATION')}} {{item.paymentDay}} {{$t('DAYS_PRIOR')}}.</p>
								</b-col>
							</b-row>
							<br>
						</div>
						<br>
						<div >
							<br>
							<div>
								<b>{{$t('CANCELLATION_POLICY')}}:</b>
							</div>
							<div v-for="item in paymentDetail.cancellResponses">
								<div v-if="item.cancellationType === 0">
									<p>{{item.amount}} {{paymentDetail.currency}} {{$t('CANCELLATION_FEES_APPLY')}} {{item.cancellationDay}} {{$t('DAYS_PRIOR')}}.</p>
								</div>
								<div v-else-if="item.cancellationType === 1">
									<div>
										<p>{{item.amount}}% {{$t('CANCELLATION_FEES_APPLY')}} 3 {{$t('DAYS_PRIOR')}}.</p>
									</div>
									<div>
										<p>{{$t('NO_SHOW_OR_EARLY')}}.</p>
									</div>
								</div>
							</div>
						</div>
						<br>
					</div> -->
					<!-- <br> -->
					<!-- <div class="colrightViewAfter">
						<b-row class="pt-4">
							<b-col><b>Booked By</b></b-col>
						</b-row>
						<br>
						<b-row>
							<b-col><b>{{paymentDetail.usernameModel.name}}</b></b-col>
						</b-row>
						<br>
						<b-row>
							<b-col>{{paymentDetail.usernameModel.email}}</b-col>
						</b-row>
						<br>
						<b-row class="pb-4">
							<b-col>{{paymentDetail.usernameModel.mobile}}</b-col>
						</b-row>-->
					</div>
				</b-col>
			</b-row>
			<b-row style="padding-bottom: 60px;">
				<b-col class="text-center"><b-button class="bt"  variant="success"  @click="AddOtherRoom"><icon class="ml-2 mt-1" name="plus" scale="1" style="color:#f1a91d;"></icon> {{$t('ADD_ANOTHER_ROOM')}}</b-button></b-col>
			</b-row>
		</b-col>

	</b-row>

</template>

