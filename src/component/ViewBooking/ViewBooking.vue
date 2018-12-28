
<style lang="scss">
@import './ViewBooking.scss';</style>
<script src="./ViewBooking.js"></script>

<template>
	<div id="ViewBooking">
	<b-row style="padding-bottom:70px">
		<b-col md="8">
		<br>
			<b-row>
					<b-col  class="left" >
						<div class="butt">
							<b-row>
								<b-col  class="text-center"><b-button class="bt"  variant="primary"  @click="AddOtherRoom">{{$t('ADD_ANOTHER_ROOM')}}</b-button></b-col>
								<b-col  class="text-center"><b-button class="bt"  variant="outline-primary"  @click="printSummary"> {{$t('SUMMARY')}}</b-button></b-col>
								<b-col  class="text-center" v-if="itemDetail.bookingStatus !== 'CANCEL' && itemDetail.bookingStatus !== 'CLOSE' && itemDetail.bookingStatus !== 'IN_SERVICE'"><b-button class="bt"  variant="outline-danger" @click="cancelReservation('cancelReservation')" > {{$t('CANCEL_RESERVATION')}}</b-button></b-col>
							</b-row>
						</div>
					</b-col>
				</b-row>
			<div>
				<img class="p-0" src="~icons/Bill Shape - Up.png" />
			</div>
			<div class="colleftView">
				<b-row class="bookingID">
					<b-col md="3" class="text-center">
						<p v-if="itemDetail.bookingStatus === 'AWAIT_FULLY_PAYMENT'"><img class="p-0" src="~icons//Await Payment.png" width="100px" height="100px" /></p>
						<p v-if="itemDetail.bookingStatus === 'CANCEL' || itemDetail.bookingStatus === 'CLOSE' || itemDetail.bookingStatus === 'VOID'"><img class="p-0" src="~icons/Cancelled Void Closed.png" width="100px" height="100px" /></p>
						<p  v-if="itemDetail.bookingStatus === 'AWAIT_PAYMENT'"><img class="p-0" src="~icons/Await Payment.png" width="100px" height="100px" /></p>
						<p  v-if="itemDetail.bookingStatus === 'CONFIRM'"><img class="p-0" src="~icons/Confirmed Booking.png" width="100px" height="100px" /></p>
						<p  v-if="itemDetail.bookingStatus === 'IN_SERVICE'"><img class="p-0" src="~icons/In Services.png" width="100px" height="100px" /></p>
						<p  v-if="itemDetail.bookingStatus === 'PAYMENT_FAILED'"><img class="p-0" src="~icons/Payment Fail.png" width="100px" height="100px" /></p>
					</b-col>
					<b-col>
						<b-row>
							<b-col ><h4>{{$t('BOOKING_ID')}}: {{test.bookingCode}}</h4></b-col>
						</b-row>
						<b-row>
							<b-col><p>{{this.lst.createdDate}}</p></b-col>
						</b-row>
						<b-row v-if="itemDetail.bookingStatus === 'AWAIT_FULLY_PAYMENT'">
							<b-col md="5"><p style="height: 30px;border-radius: 35px;background-color: #f8ad00;text-align:center;color:#fff;line-height:30px">{{$t('AWAIT_FULLY_PAYMENT_BOOKING')}}</p></b-col>
						</b-row>
						<b-row v-if="itemDetail.bookingStatus === 'CLOSE'">
							<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #b2b2b2; text-align:center;color:#fff;line-height:30px">{{$t('CLOSE_BOOKING')}}</p></b-col>
						</b-row>
						<b-row v-if="itemDetail.bookingStatus === 'CONFIRM'">
							<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #0da313; text-align:center;color:#fff;line-height:30px">{{$t('CONFIRM_BOOKING')}}</p></b-col>
						</b-row>
						<b-row  v-if="itemDetail.bookingStatus === 'CANCEL'">
							<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #b2b2b2; text-align:center;color:#fff;line-height:30px">{{$t('CANCEL_BOOKING')}}</p></b-col>
						</b-row>
						<b-row  v-if="itemDetail.bookingStatus === 'PAYMENT_FAILED'">
							<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #d9390d;text-align:center;color:#fff;line-height:30px">{{$t('PAYMENT_FAILED_BOOKING')}}</p></b-col>
						</b-row>
						<b-row  v-if="itemDetail.bookingStatus === 'IN_SERVICE'">
							<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #258fe0; text-align:center;color:#fff;line-height:30px">{{$t('INSERVICE_BOOKING')}}</p></b-col>
						</b-row>
						<b-row v-if="itemDetail.bookingStatus === 'AWAIT_PAYMENT'">
							<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #258fe0; text-align:center;color:#fff;line-height:30px">{{$t('AWAIT_BOOKING')}}</p></b-col>
						</b-row>
						<b-row v-if="itemDetail.bookingStatus === 'VOID'">
							<b-col md="5"><p style="height: 30px;border-radius: 35px; background-color: #258fe0; text-align:center;color:#fff;line-height:30px">{{$t('VOID')}}</p></b-col>
						</b-row>
					</b-col>
				</b-row>
				<b-row class="schedule">
					<b-col md="3" class="text-center"><p><img class="p-0" src="~icons/House Keeping Copy-gray.png" width="30px" height="30px" /></p> <b>Schedule</b></b-col>
					<b-col>
						<p class="CheckInDate"><img class="p-0" src="~icons/Calendar-gray.png" width="24px" height="24px" /> {{this.lst.checkinDate| moment('DD/MM/YYYY')}} <img class="p-0" src="~icons/Arrow Right-gray.png" width="30px" height="30px" /> <img class="p-0" src="~icons/Calendar-gray.png" width="24px" height="24px" /> {{this.lst.checkoutDate| moment('DD/MM/YYYY')}}</p>
					</b-col>
					<b-col >
						<p class="CheckInDate text-left pl-2"><img class="p-0" src="~icons/Room Type-gray.png" width="24px" height="24px" /> {{itemDetail.guests.countAdults}} {{$t('Adults_btn_ResultSearch')}}, {{itemDetail.guests.countChildren}} {{$t('Childrens_btn_ResultSearch')}}</p>
					</b-col>
				</b-row>
				<b-row class="schedule">
					<b-col md="3" class="text-center"><p><img class="p-0" src="~icons/Room Type-gray.png" width="30px" height="30px" /></p> <b>Contact</b></b-col>
					<b-col>
						<p style="padding-left:10px">{{$t('CONTACT_NAME')}}:</p>
						<p class="Contact">{{this.lst.contactName}}</p>
						<br>
						<p style="padding-left:10px">{{$t('PHONE_NUMBER')}}:</p>
						<p class="Contact">{{this.lst.phoneNumber}}</p>
					</b-col>
					<b-col>
						<p style="padding-left:10px">{{$t('EMAIL')}}:</p>
						<p class="Contact">{{this.lst.emailAddress}}</p>
						<br>
						<p style="padding-left:10px">{{$t('NATIONALITY')}}:</p>
						<p class="Contact">{{this.lst.countryCus}}</p>
					</b-col>
				</b-row>
				<b-row  class="schedule">
					<!-- <img class="p-0" src="~icons/shopping cartblack.png" width="30px" height="30px"/> -->
					<b-col md="3" class="text-center"><p><img class="p-0" src="~icons/shopping cart gray.png" width="30px" height="30px"/></p><b>Price</b></b-col>
					<b-col>
						<b-row>
							<b-col >
								<b-col>
								<b-row class="payment">
									<b-col md="5" class="ml-3"><b>{{$t('Title_Viewbooking')}}</b></b-col>
									<b-col class="textright"><b>{{$t('TOTAL')}}</b></b-col>
								</b-row>
								</b-col>
							<b-table show-empty
								:items="this.lst.bookinglineResponses"
								:fields="fields"
								@filtered="onFiltered"
								:current-page="currentPage"
								:per-page="perPage"
								:filter="filter"
								id="tableview">
							<template slot="Title" slot-scope="row" class="text-left">
								<b-col>
									<b-row>
										<b>{{row.item.title}}</b>
									</b-row>
									<b-row  v-if="row.item.lineType === 0">
										<p>{{row.item.adult}} {{$t('Adults_btn_ResultSearch')}}, {{row.item.children}} {{$t('Childrens_btn_ResultSearch')}} </p>
									</b-row>
									<b-row >
										<span v-if="row.item.lineType === 0">{{$t('SURCHARGE_PEOPLE')}}: {{row.item.extraAdultPrice + row.item.extraChildPrice}} {{lst.currency}} </span>
									</b-row>
									<b-row style="margin-top:20px" v-if="row.item.lineType === 0 && row.item.guestName !==null">
										<b-col  class="text-secondary">{{$t('CUSTOMER_NAME')}}</b-col>
									</b-row>
									<b-row v-if="row.item.lineType === 0 && row.item.guestName !==null">
										<span  style="width: 300px;height: 30px;border-radius: 5px;background-color: #f5f5f5;line-height: 30px; padding-left:15px">{{row.item.guestName}} </span>
									</b-row>
									<b-row style="margin-top:20px" v-if="row.item.lineType === 0 && row.item.specialRequest!==null">
										<b-col  class="text-secondary">{{$t('SPECIAL_REQUEST')}}</b-col>
									</b-row>
									<b-row v-if="row.item.lineType === 0 && row.item.specialRequest!==null">
										<span  style="width: 300px;height: 59px;border-radius: 5px;background-color: #f5f5f5;line-height: 30px; padding-left:15px">{{row.item.specialRequest }}</span>
									</b-row>
								</b-col>
							</template>
							<template slot="Total" slot-scope="row" class="text-right">
								<div class="text-right text-secondary">
									<b v-if="row.item.lineType === 0">{{lst.currency}} {{formatPrice((row.item.unitPrice*row.item.quantity + row.item.extraAdultPrice + row.item.extraChildPrice))}} </b>
									<b v-if="row.item.lineType !== 0">{{lst.currency}} {{formatPrice(row.item.unitPrice*row.item.quantity )}} </b>
								</div>
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
										<p>{{lst.currency}} {{formatPrice(itemDetail.subTotal)}}</p>
									</b-col>
								</b-row>
								<br>
								<b-row v-if="lst.taxIncluded===false">
									<b-col class="" md="9">
										<p>{{$t('TAX_VAT')}} ({{this.lst.valueAddedTaxPercent}}%) {{$t('AND_SERVICE_CHARGE')}} ({{this.lst.serviceTaxPercent}}%):</p>
									</b-col>
									<b-col class="text-right">
										<p>{{lst.currency}} {{formatPrice(lst.totalTax)}}</p>
									</b-col>
								</b-row>
								<br>
								<b-row>
									<b-col class="" md="9">
										<b>{{$t('TOTAL')}} (Inc. of taxes):</b>
									</b-col>
									<b-col class="text-right">
										<b  class="text-dark" style="font-size:20px">{{lst.currency}} {{formatPrice(itemDetail.Total)}}</b>
									</b-col>
								</b-row>

							</b-col>
						</b-row>
					</b-col>
				</b-row>
				<b-row class="schedule" v-if="lst.earlyCheckin===true || lst.noSmokingRoom===true || lst.highFloor===true || lst.note!==''">
					<b-col md="3" class="text-center" ><p><img class="p-0" src="~icons/More-gray.png" width="30px" height="30px" /></p> <b>Adition</b></b-col>
					<b-col>
						<p><b>{{$t('ADDITTIONAL_REQUEST')}}</b></p>
						<b-row>
							<b-col v-if="lst.earlyCheckin===true"><img class="p-0" src="~icons/Checked.png" width="27px" height="27px" /> {{ $t('EARLY_CHECKING') }}</b-col>
							<b-col v-if="lst.noSmokingRoom===true"><img class="p-0" src="~icons/Checked.png" width="27px" height="27px" /> {{ $t('NON_SMOKING_ROOM') }} </b-col>
							<b-col v-if="lst.highFloor===true"><img class="p-0" src="~icons/Checked.png" width="27px" height="27px" /> {{ $t('HIGHT_FLOOR') }}</b-col>
						</b-row>
						<b-row>
							<b-col v-if="lst.note!==''"><p>{{ $t('OTHER_REQUEST') }}</p></b-col>
						</b-row>
						<b-row>
							<b-col v-if="lst.note!==''"><p>{{lst.note}}</p></b-col>
						</b-row>
					</b-col>
				</b-row>
				<b-row class="schedule">
					<b-col md="3" class="text-center"><p><img class="p-0" src="~icons/Credit-gray.png" width="30px" height="30px" /></p> <b>Payment</b></b-col>
					<b-col>
						<b-row class="text-left" v-for="item in this.lst.paymentResponses" v-if="itemDetail.bookingStatus !== 'PAYMENT_FAILED' && itemDetail.bookingStatus !== 'AWAIT_PAYMENT'">
							<b-col  class="boder" md="9" >
								<br>
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
									Trans. date: <b>{{item.tranDate | moment('DD/MM/YYYY ')}}</b>
									</b-col>
								</b-row>
							</b-col>
							<b-col class="boder">
								<br>
								<p  class="text-right"><b >{{lst.currency}} {{formatPrice(item.amountPayment)}}</b></p>
							</b-col>
						</b-row>
						<hr>
						<b-row class="boder" style="height:35px;line-height:35px">
							<b-col >
								<b>{{$t('TOTAL_PAID')}}:</b>
							</b-col>
							<b-col class="text-right " v-if="itemDetail.bookingStatus !== 'PAYMENT_FAILED'">
								<b>{{lst.currency}} &nbsp {{formatPrice(this.lst.paid)}}</b>
							</b-col>
							<b-col class="text-right " v-if="itemDetail.bookingStatus === 'PAYMENT_FAILED'">
								<b>{{lst.currency}} &nbsp 0</b>
							</b-col>
						</b-row>
						<b-row class="boder" style="height:35px;line-height:35px">
							<b-col  >
								<b style="color:red;font-size:20px">{{$t('UNPAID_AMOUNT')}}:</b>
							</b-col>
							<b-col class="text-right " v-if="itemDetail.bookingStatus !== 'PAYMENT_FAILED'">
								<b style="color:red;font-size:20px">{{lst.currency}} &nbsp{{formatPrice(this.lst.unpaid)}}</b>
							</b-col>
							<b-col class="text-right " v-if="itemDetail.bookingStatus === 'PAYMENT_FAILED'">
								<b style="color:red;font-size:20px">{{lst.currency}} &nbsp{{formatPrice(itemDetail.Total)}}</b>
							</b-col>
						</b-row>
					</b-col>
				</b-row>
			</div>
			<div>
				<img class="p-0" src="~icons/Bill Shape - Down.png" />
			</div>
			<br>
			<div v-if="itemDetail.bookingStatus === 'AWAIT_PAYMENT'">
				<b-row>
					<b-col md="10">
						<p>{{$t('A_CONFIRMATION')}} <span style="color:blue">{{this.lst.emailAddress}}</span>. {{$t('PLEASE_SHOW')}} <span style="color:blue">{{this.lst.emailHotel}}</span>.</p>
					</b-col>
				</b-row>
			</div>
			<div v-if="itemDetail.bookingStatus === 'AWAIT_FULLY_PAYMENT'">
				<b-row>
					<b-col>
						<p>{{$t('A_CONFIRMATION')}} <span style="color:blue">{{this.lst.emailAddress}}</span>. {{$t('PLEASE_SHOW')}} <span style="color:blue">{{this.lst.emailHotel}}</span>.</p>
					</b-col>
				</b-row>
			</div>
			<div v-if="itemDetail.bookingStatus === 'CONFIRM'">
				<b-row>
					<b-col>
						<p>{{$t('A_CONFIRMATION')}} <span style="color:blue">{{this.lst.emailAddress}}</span>. {{$t('PLEASE_SHOW')}} <span style="color:blue">{{this.lst.emailHotel}}</span>.</p>
					</b-col>
				</b-row>
			</div>
			<div v-if="itemDetail.bookingStatus === 'CANCEL'">
				<b-row>
					<b-col>
						<p>{{$t('A_CANCELLATION_CONFIRMATION')}} <span style="color:blue">{{this.lst.emailAddress}}</span>. {{$t('IF_YOU_HAVE_ANY')}} <span style="color:blue">{{this.lst.emailHotel}}</span>.</p>
					</b-col>
				</b-row>
			</div>
		</b-col>
		<b-col>
			<div class="colrightView">
				<b-row class="pt-4">
					<b-col><b>{{$t('CHOOSE_A_PAYMENT_METHOD')}}</b></b-col>
				</b-row>
				<br>
				<b-row style="margin: auto;">
					<b-col>
						<b-form-group label="">
							<b-form-radio-group v-model="selectedATM" :options="optionsATM" name="radioInline">
							</b-form-radio-group>
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>
						<b-form-checkbox id="checkbox1"
							style="padding-bottom:5px;"
								v-model="status"
								value="accepted"
								unchecked-value="not_accepted">
						</b-form-checkbox>{{ $t('I_AGREE_WITH_THE') }}<b-button variant="link"  @click.stop="viewAgree()"  >{{ $t('BOOKING_TERM_CONDITIONS') }}</b-button>{{ $t('BY_MAKING_THIS_BOOKING') }}.
					</b-col>
					<br>
				</b-row>
				<b-row class="pb-4">
					<b-col ><b-button class="bt"  variant="primary" v-if="itemDetail.bookingStatus !== 'CONFIRM'" >{{$t('PAY_NOW')}}</b-button></b-col>
				</b-row>
			</div>
			<div class="colrightViewHotel">
				<div style="border-bottom:1px solid #dcdcdc">
					<br>
					<h5><b v-for="i in test.i18ns" v-if="i.lang===$store.getters.currentLanguage.code">{{i.name}}</b></h5>
					<span v-for="i in lst.hotelTypes.i18ns" v-if="i.langCode===$store.getters.currentLanguage.code">{{i.title}}</span>
					<br>
					<div>
						<template v-for="ii in 5">
							<span v-if="(lst.star) >= ii" class="mr-3"><icon  name="star" scale="1" style="color:#fbb616"></icon></span>
						</template>
							<span v-if="lst.star%1!==0"><icon name="star-half" scale="1" style="color:#fbb616;"></icon></span>
					</div>
					<div>
						<b-row>
							<b-col md="2" style="padding-right:0">
								<img class="p-0" src="~icons/Location-gray.png" width="25px" height="25px" />
							</b-col>
							<b-col style="padding-left:0">
								<span style="font-size: 12px;" v-for="i in lst.locations" v-if="i.lang===$store.getters.currentLanguage.code">{{i.name}}</span>
							</b-col>
						</b-row>
					</div>
					<br>
				</div>
				<br>
				<div  style="border-bottom:1px solid #dcdcdc">
					<div>
						<b>{{$t('CHECKIN_POLICY')}}:</b>
					</div>
						<br>
					<b-row>
						<b-col >
							{{$t('CHECKIN_TIME')}}:
						</b-col>
						<b-col>
							<p>{{this.lst.checkinTime}}</p>
						</b-col>
					</b-row>
					<b-row>
						<b-col >
							{{$t('CHECKOUT_TIME')}}:
						</b-col>
						<b-col>
							<p>{{this.lst.checkoutTime}}</p>
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
						<b-col>{{$t('CHILDREN_BETWEEN')}} 0 - {{this.lst.babyAgeDetermine}} {{$t('YEAR_OLD_STAY')}}.</b-col>
						<br>
					</b-row>
					<b-row>
						<b-col>{{$t('CHILDREN_BETWEEN')}} {{this.lst.babyAgeDetermine + 1}} - {{this.lst.childAgeDetermine}} {{$t('YEAR_OLD_ARE')}}.</b-col>
					</b-row>
					<br>
				</div>
				<br>
				<div style="border-bottom:1px solid #dcdcdc">
					<br>
					<div>
						<b>{{$t('PAYMENT_POLICY')}}:</b>
					</div>
					<b-row md="10" v-for="item in lst.depositResponses">
						<b-col v-if="item.paymentType === 1">
							<p>{{item.amount}}% {{$t('DEPOSIT_UPON_RESERVATION')}} {{item.paymentDay}} {{$t('DAYS_PRIOR')}}.</p>
						</b-col>
						<b-col v-if="item.paymentType === 0">
							<p>{{item.amount}} {{lst.currency}} {{$t('DEPOSIT_UPON_RESERVATION')}} {{item.paymentDay}} {{$t('DAYS_PRIOR')}}.</p>
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
					<div v-for="item in lst.cancellResponses">
						<div v-if="item.cancellationType === 0">
							<p>{{item.amount}} {{lst.currency}} {{$t('CANCELLATION_FEES_APPLY')}} {{item.cancellationDay}} {{$t('DAYS_PRIOR')}}.</p>
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
			</div>
			<br>
			<div class="colrightViewAfter">
				<b-row class="pt-4">
					<b-col><b>Booked By</b></b-col>
				</b-row>
				<br>
				<b-row>
					<b-col><b>{{lst.usernameModel.name}}</b></b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>{{lst.usernameModel.email}}</b-col>
				</b-row>
				<br>
				<b-row class="pb-4">
					<b-col>{{lst.usernameModel.mobile}}</b-col>
				</b-row>
			</div>
		</b-col>
	</b-row>


	<!-- modalprin -->
	 <b-modal id="printVoucher" size="lg" hide-header hide-footer>

		<div class="text-right">
			<b-button variant="primary" @click="hideModal" size="md" @click.stop="print('printVoucher')">
			Print
			</b-button>
			<b-button variant="danger" @click="hideModal" size="md" @click.stop="hideModal('printVoucher')">
			{{$t('Close')}}
			</b-button>
		</div>
	</b-modal>
	<!-- modalprinsummary -->
	 <b-modal id="printSummary" size="lg" hide-header hide-footer>
		<div id="summany">
	<b-row>
	<b-col md="1"></b-col>
		<b-col md="10" >
		<br>
			<div >
				<h5><b v-for="i in test.i18ns" v-if="i.lang===$store.getters.currentLanguage.code">{{i.name}}</b></h5>
				<hr>
			</div>
			<div>
				<div v-if="itemDetail.bookingStatus === 'CLOSE'">
					<b-row>
						<b-col ><h4><i>{{$t('BOOKING_ID')}}</i></h4></b-col>
						<b-col><h4><b  style="color: red">{{test.bookingCode}}</b></h4></b-col>
					</b-row>
					<b-row>
						<b-col><p>{{$t('THIS_RESERVATION')}} {{this.lst.createdDate}}</p></b-col>
					</b-row>
					<b-row>
						<b-col><icon class="text-primary" name="sign-out-alt" scale="1	" ></icon> <b class="text-primary">{{$t('CLOSE_BOOKING')}}</b></b-col>
					</b-row>
				</div>
				<div v-if="itemDetail.bookingStatus === 'IN_SERVICE'">
					<b-row>
						<b-col md="2"><h4><i>{{$t('BOOKING_ID')}}</i></h4></b-col>
						<b-col><h4><b  style="color: red">{{test.bookingCode}}</b></h4></b-col>
					</b-row>
					<b-row>
						<b-col><p>{{$t('THIS_RESERVATION')}} {{this.lst.createdDate}}</p></b-col>
					</b-row>
					<b-row>
						<b-col><icon class="text-success" name="sign-in-alt" scale="1" ></icon>&nbsp &nbsp<b class="text-success">{{$t('INSERVICE_BOOKING')}}</b></b-col>
					</b-row>
				</div>
				<div v-if="itemDetail.bookingStatus === 'PAYMENT_FAILED'">
					<b-row>
						<b-col class="text-danger"><h4>{{$t('PAYMENT_FAILED')}}!</h4></b-col>
					</b-row>
					<br>
					<b-row>
						<b-col ><h4><i>{{$t('BOOKING_ID')}}</i></h4></b-col>
						<b-col><h4><b >{{test.bookingCode}}</b></h4></b-col>
					</b-row>
				</div>
				<div v-if="itemDetail.bookingStatus === 'AWAIT_FULLY_PAYMENT'">
					<b-row>
						<b-col><b>{{$t('THANK_YOU_FOR_USING')}}</b></b-col>
					</b-row>
					<b-row>
						<b-col ><h4><i>{{$t('BOOKING_ID')}}</i></h4></b-col>
						<b-col><h4><b >{{test.bookingCode}}</b></h4></b-col>
					</b-row>
					<b-row>
						<b-col class="mt-2"><p>{{$t('THIS_RESERVATION')}} {{this.lst.createdDate}}</p></b-col>
					</b-row>
					<b-row>
						<b-col><icon class="text-danger" name="exclamation-circle" scale="1" ></icon> <b class="text-danger">{{$t('AWAIT_FULLY_PAYMENT_BOOKING')}}</b></b-col>
					</b-row>
					<br>
				</div>
				<!-- successfully -->
				<div v-if="itemDetail.bookingStatus === 'AWAIT_PAYMENT'">
				<b-row>
					<b-col><b>{{$t('THANK_YOU_FOR_USING')}}</b></b-col>
				</b-row>
				<b-row>
					<b-col><h5><i>{{$t('BOOKING_ID')}}</i></h5></b-col>
					<b-col><h5><b >{{test.bookingCode}}</b></h5></b-col>
				</b-row>
				<b-row>
					<b-col><p>{{$t('THIS_RESERVATION')}} {{this.lst.createdDate}}</p></b-col>
				</b-row>

				<b-row>
					<b-col><icon name="exclamation-circle" scale="1" class="text-danger"></icon> <b class="text-danger">{{$t('Await_Payment_Bookings')}}</b></b-col>
				</b-row>

				<b-row>
					<b-col><p>{{$t('YOU_HAVE_AWAIT')}}.</p></b-col>
				</b-row>
				<br>
				</div>
					<div v-if="itemDetail.bookingStatus === 'CONFIRM'">
				<b-row>
					<b-col><h4 style="color: green"><b>{{$t('BOOKING_CREATED')}}!</b></h4></b-col>
				</b-row>
				<b-row>
					<b-col md="10">
						<p>{{$t('A_CONFIRMATION')}} <span style="color:blue">{{this.lst.emailAddress}}</span>. {{$t('PLEASE_SHOW')}} <span style="color:blue">{{this.lst.emailHotel}}</span>.</p>
					</b-col>
					<b-col><icon class="" name="check-circle" scale="5" style="color: green"></icon></b-col>
				</b-row>
				<b-row>
					<b-col><b>{{$t('THANK_YOU_FOR_USING')}}.</b></b-col>
				</b-row>
				<br>
				<br>
				<b-row>
					<b-col md="2"><h4><i>{{$t('BOOKING_ID')}}</i></h4></b-col>
					<b-col><h4><b >{{test.bookingCode}}</b></h4></b-col>
				</b-row>
				<br>
				<b-row>
					<b-col><p>{{$t('THIS_RESERVATION')}} {{lst.createdDate}}</p></b-col>
				</b-row>
				<br>
				<b-row>
					<b-col><icon class="mt-1" name="check-circle" scale="1	" style="color:green"></icon> <b style="color:green">{{$t('CONFIRMED_BOOKING')}}</b></b-col>
				</b-row>
				<br>
				</div>
				<!-- cancel -->
				<div v-if="itemDetail.bookingStatus === 'CANCEL'">
				<b-row>
					<b-col><h4 style="color: red"><b>{{$t('CANCELLED_BOOKING')}}</b></h4></b-col>
				</b-row>
				<b-row>
					<b-col md="10">
						<p>{{$t('A_CANCELLATION_CONFIRMATION')}} <span style="color:blue">{{this.lst.emailAddress}}</span>. {{$t('IF_YOU_HAVE_ANY')}} <span style="color:blue">{{lst.emailHotel}}</span>.</p>
					</b-col>
					<!-- <b-col><icon class="" name="times-circle" scale="5" style="color: red"></icon></b-col> -->
				</b-row>
				<b-row>
					<b-col><b>{{$t('THANK_YOU_FOR_USING')}}.</b></b-col>
				</b-row>
				<b-row>
					<b-col><h4><i>{{$t('BOOKING_ID')}}</i></h4></b-col>
					<b-col><h4><b  style="color: red">{{test.bookingCode}}</b></h4></b-col>
				</b-row>
				<b-row>
					<b-col><p>{{$t('THIS_RESERVATION')}} {{this.lst.createdDate}}</p></b-col>
				</b-row>
				<b-row>
					<b-col><icon class="" name="times-circle" scale="1	" style="color:red"></icon> <b style="color:red">{{$t('CANCEL_BOOKING')}}</b></b-col>
				</b-row>
				</div>
				<b-row id="printVoucher">
					<b-col>
						<b-row>
							<b-col>
								<b>{{$t('CONTACT_NAME')}}:</b>
							</b-col>
							<b-col class="text-right">
								<b>{{this.lst.contactName}}</b>
							</b-col>
						</b-row>

						<b-row>
							<b-col>
								<b>{{$t('EMAIL')}}:</b>
							</b-col>
							<b-col  class="text-right">
								<b>{{this.lst.emailAddress}}</b>
							</b-col>
						</b-row>

						<b-row>
							<b-col>
								<b>{{$t('PHONE_NUMBER')}}:</b>
							</b-col>
							<b-col  class="text-right">
								<b>{{this.lst.phoneNumber}}</b>
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<b>{{$t('NATIONALITY')}}:</b>
							</b-col>
							<b-col  class="text-right">
								<b>{{this.lst.countryCus}}</b>
							</b-col>
						</b-row>
					</b-col>
					<b-col>
						<b-row>
							<b-col>
								<b>{{$t('CHECKIN_DATE')}}:</b>
							</b-col>
							<b-col  class="text-right">
								<b>{{this.lst.checkinDate | moment('DD/MM/YYYY')}}</b>
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<b>{{$t('CHECKOUT_DATE')}}:</b>
							</b-col>
							<b-col  class="text-right">
								<b>{{this.lst.checkoutDate | moment('DD/MM/YYYY')}}</b>
							</b-col>
						</b-row>
						<div>
						<b-row>
							<b-col>
								<b>{{$t('NIGHT')}}:</b>
							</b-col>
							<b-col  class="text-right">
								<b>{{itemDetail.nights}}</b>
							</b-col>
						</b-row>
						<b-row  >
							<b-col>
								<b>{{$t('GUEST')}}:</b>
							</b-col>
							<b-col  class="text-right">
								<b>{{itemDetail.guests.countAdults}} {{$t('Adults_btn_ResultSearch')}}, {{itemDetail.guests.countChildren}} {{$t('Childrens_btn_ResultSearch')}}</b>
							</b-col>
						</b-row>
						</div>
					</b-col>
				</b-row>
				<br>
				<br>
				<b-row>
					 <b-col >
					<b-col>
					<!-- <b-row class="payment">
						<b-col md="1"><b>Q</b></b-col>
						<b-col md="6"><b>{{$t('Title_Viewbooking')}}</b></b-col>
						<b-col class="textright"><b>{{$t('UnitPrice_Viewbooking')}}</b></b-col>
						<b-col class="textright"><b>{{$t('TOTAL')}}</b></b-col>
					</b-row> -->
					</b-col>
			  		<b-table show-empty
						striped
						:items="this.lst.bookinglineResponses"
						:fields="fields"
						@filtered="onFiltered"
						:current-page="currentPage"
						:per-page="perPage"
						:filter="filter"
						id="tableview" class="text-center">

					<!-- <template slot="Q" slot-scope="row">
						<b-col class="text-center">
							<b>{{row.item.quantity}} </b>
						</b-col>
					</template> -->
					<template slot="Title" slot-scope="row" >
						<b-col>
							<b-row><b>{{row.item.title}} </b> &nbsp &nbsp &nbsp
							 <i v-if="row.item.lineType === 0">{{row.item.adult}} {{$t('Adults_btn_ResultSearch')}}, {{row.item.children}} {{$t('Childrens_btn_ResultSearch')}} </i>
							</b-row>
						</b-col>
						<b-col >
							<b-row >
							 <i v-if="row.item.lineType === 0">{{$t('SURCHARGE_PEOPLE')}}: {{lst.currency}} {{row.item.extraAdultPrice + row.item.extraChildPrice}} </i>
							</b-row>
						</b-col>
					</template>

					<!-- <template slot="UnitPrice" slot-scope="row" >
						<b-col >
							<b>{{lst.currency}} {{formatPrice(row.item.unitPrice)}} </b>
						</b-col>
					</template> -->
					<template slot="Total" slot-scope="row" >
						<b-col >
							<b v-if="row.item.lineType === 0">{{lst.currency}} {{formatPrice((row.item.unitPrice*row.item.quantity + row.item.extraAdultPrice + row.item.extraChildPrice))}} </b>
							<b v-if="row.item.lineType !== 0">{{lst.currency}} {{formatPrice(row.item.unitPrice*row.item.quantity )}} </b>
						</b-col>
					</template>

					</b-table>
					</b-col>
				</b-row>
				<hr>
				<b-row>
					<b-col >
						<b-row>
							<b-col >
								<b>{{$t('SUB_TOTAL')}}:</b>
							</b-col>
							<b-col class="text-right">
								<b>{{lst.currency}} {{formatPrice(itemDetail.subTotal)}}</b>
							</b-col>
						</b-row>
						<b-row v-if="lst.taxIncluded===false">
							<b-col >
								<b>{{$t('TAX_VAT')}} ({{this.lst.valueAddedTaxPercent}}%) {{$t('AND_SERVICE_CHARGE')}} ({{this.lst.serviceTaxPercent}}%):</b>
							</b-col>
							<b-col class="text-right">
								<b>{{lst.currency}} {{formatPrice(lst.totalTax)}}</b>
							</b-col>
						</b-row>
						<b-row>
							<b-col >
								<b>{{$t('TOTAL')}} (Inc. of taxes):</b>
							</b-col>
							<b-col class="text-right">
								<b style="color:blue; font-size:20px">{{lst.currency}} {{formatPrice(itemDetail.Total)}}</b>
							</b-col>
						</b-row>
					</b-col>
				</b-row>
				<hr>
					<b-row>
							<b-col>
							<b-row  style=" background-color: #ccc;border-radius: 4px 4px 0px 0px;height: 30px;line-height: 30px;">
								<b-col md="8" class="textleft">
									<b>{{$t('PAYMENT_TRANSACTION')}}</b>
								</b-col>
								<b-col class="text-right">
									<b>{{$t('AMOUNT')}}</b>
								</b-col>
							</b-row>
							<b-row class="textleft" v-for="item in this.lst.paymentResponses">
								<b-col  class="boder">
									<b-row>
										<p >{{item.title}}</p>
									</b-row>
									<b-row>
										<b-col>
										Trans. ID: <b>{{item.tranNo}}</b>
										</b-col>
									</b-row>
									<b-row>
										<b-col>
										Trans. date: <b>{{item.tranDate}}</b>
										</b-col>
									</b-row>
								</b-col>
								<b-col class="boder">
									<br>
									<p class="text-right" ><b> {{formatPrice(item.amountPayment)}}</b></p>
								</b-col>
							</b-row>
							<hr>
									<b-row>
										<b-col >
											<b>{{$t('TOTAL_PAID')}}:</b>
										</b-col>
										<b-col class="text-right ">
											<b>{{lst.currency}} &nbsp {{formatPrice(lst.paid)}}</b>
										</b-col>
									</b-row>
									<b-row>
										<b-col  >
											<b>{{$t('UNPAID_AMOUNT')}}:</b>
										</b-col>
										<b-col class="text-right ">
											<b style="color:red;font-size:15px">{{lst.currency}} &nbsp{{formatPrice(this.lst.unpaid)}}</b>
										</b-col>
									</b-row>
							</b-col>
					</b-row>
					<hr>
					<b-row class="backcolor">
						<b-col>
							<b-col>
							<b-row>
								<b>{{$t('CHECKIN_POLICY')}}:</b>
							</b-row>

							<b-row>
								<b-col>
									{{$t('CHECKIN_TIME')}}: {{this.lst.checkinTime}}
								</b-col>
								<b-col>
									{{$t('CHECKOUT_TIME')}}: {{this.lst.checkoutTime}}
								</b-col>
							</b-row>
							<br>
							<b-row>
								<b>{{$t('CHILDREN_POLICY')}}:</b>
							</b-row>
								<b-row >
								<b-col>{{$t('CHILDREN_BETWEEN')}} 0 - {{this.lst.babyAgeDetermine}} {{$t('YEAR_OLD_STAY')}}.</b-col>
								<br>
								</b-row>
								<b-row>
								<b-col>{{$t('CHILDREN_BETWEEN')}} {{this.lst.babyAgeDetermine + 1}} - {{this.lst.childAgeDetermine}} {{$t('YEAR_OLD_ARE')}}.</b-col>
								</b-row>
								<br>
							<b-row>
								<b>{{$t('PAYMENT_POLICY')}}:</b>
							</b-row>
							<b-row md="10" v-for="item in lst.depositResponses">
								<b-col v-if="item.paymentType === 1">
									<p>{{item.amount}}% {{$t('DEPOSIT_UPON_RESERVATION')}} {{item.paymentDay}} {{$t('DAYS_PRIOR')}}.</p>
								</b-col>
								<b-col v-if="item.paymentType === 0">
									<p>{{item.amount}} {{lst.currency}} {{$t('DEPOSIT_UPON_RESERVATION')}} {{item.paymentDay}} {{$t('DAYS_PRIOR')}}.</p>
								</b-col>
							</b-row>
							<br>
							<b-row>
								<b>{{$t('CANCELLATION_POLICY')}}:</b>
							</b-row>
							<b-col md="10">
							</b-col>
							<b-col md="10" v-for="item in this.lst.cancellResponses">
								<!-- <b-row v-if="item.amount === 0">
									<p>{{$t('NO_CANCELLATION_FEES_IF')}}. </p><br>
								</b-row> -->
								<b-row v-if="item.cancellationType === 0">
									<p>{{item.amount}} {{lst.currency}} {{$t('CANCELLATION_FEES_APPLY')}} {{item.cancellationDay}} {{$t('DAYS_PRIOR')}}.</p>
								</b-row>
								<div v-else-if="item.cancellationType === 1">
									<b-row >
										<p>{{item.amount}}% {{$t('CANCELLATION_FEES_APPLY')}} 3 {{$t('DAYS_PRIOR')}}.</p>
									</b-row>
									<b-row>
										<p>{{$t('NO_SHOW_OR_EARLY')}}.</p>
									</b-row>
								</div>

							</b-col>

							</b-col>
						</b-col>
					</b-row>
					<br>
			</div>
		</b-col>

		<b-col md="1"></b-col>

	</b-row>
		</div>
		<div class="text-center">
			<b-button variant="primary" @click="hideModal" size="md" @click.stop="print('summany','printSummary')">
			{{$t('Print')}}
			</b-button>
			<b-button variant="danger" @click="hideModal" size="md" @click.stop="hideModal('printSummary')">
			{{$t('Close')}}
			</b-button>
		</div>
	</b-modal>
	<!-- modal cancel reservation -->
	 <b-modal id="cancelReservation" size="lg" hide-header hide-footer>
        <div>
			<h4><b>{{$t('ARE_YOU_SURE')}} ?</b></h4>
			<hr>
			<p>
				{{$t('IF_YOU_WISH')}}
			</p>
			<br>
			<b-row>
				<b-col>
				 <b-form-textarea id="textarea1"
                     v-model="textcancelReservation"
                     placeholder="Enter something"
                     :rows="3"
                     :max-rows="6">
                 </b-form-textarea>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
				    <b>{{$t('CANCELLATION_POLICY')}}:</b>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
				<b-col  v-for="item in this.lst.cancellResponses">
					<b-row v-if="item.cancellationType === 0">
						<p>{{item.amount}} {{lst.currency}} {{$t('CANCELLATION_FEES_APPLY')}} {{item.cancellationDay}} {{$t('DAYS_PRIOR')}}.</p>
					</b-row>
					<div v-else-if="item.cancellationType === 1">
						<b-row >
							<p>{{item.amount}}% {{$t('CANCELLATION_FEES_APPLY')}} 3 {{$t('DAYS_PRIOR')}}.</p>
					    </b-row>
						<b-row>
							<p>{{$t('NO_SHOW_OR_EARLY')}}.</p>
						</b-row>
					</div>
				</b-col>
				</b-col>
			</b-row>
		</div>
		<hr>

		<div class="text-right">
			<b-button variant="warning" @click.stop="btnCancelReservation('cancelReservation')" size="md" :disabled="textcancelReservation===''" >
			<span style="color:white">{{$t('CANCEL_RESERVATION')}}</span>
			</b-button>
			<b-button variant="danger" @click="hideModal" size="md" @click.stop="hideModal('cancelReservation')">
			{{$t('Close')}}
			</b-button>
		</div>
	</b-modal>
    <!-- modal change reservation -->
	 <b-modal id="changeReservation" size="lg" hide-header hide-footer>
        <div>
			<br>
			<b-row>
				<b-col>
					<p>{{$t('IF_YOU_LIKE')}} <span style="color:blue">{{this.lst.emailHotel}}</span>.</p>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
				    <b>{{$t('CANCELLATION_POLICY')}}:</b>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
				<b-col  v-for="item in lst.cancellResponses">
					<b-row v-if="item.cancellationType === 0">
						<p>{{item.amount}} {{lst.currency}} {{$t('CANCELLATION_FEES_APPLY')}} {{item.cancellationDay}} {{$t('DAYS_PRIOR')}}.</p>
					</b-row>
					<div v-else-if="item.cancellationType === 1">
						<b-row >
							<p>{{item.amount}}% {{$t('CANCELLATION_FEES_APPLY')}} 3 {{$t('DAYS_PRIOR')}}.</p>
					    </b-row>
						<b-row>
							<p>{{$t('NO_SHOW_OR_EARLY')}}.</p>
						</b-row>
					</div>
				</b-col>
				</b-col>
			</b-row>
        </div>
		<div class="text-right">
			<b-button variant="danger" @click="hideModal" size="md" @click.stop="hideModal('changeReservation')">
			{{$t('Close')}}
			</b-button>
		</div>
	</b-modal>
	<!-- chính sách -->
	<!-- <b-modal size="lg" hide-footer hide-header id="agree" @hide="resetModal" >

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
				<div v-if="itemModal.paymentPolicy!== null">
					<div v-for="(item,index) in itemModal.paymentPolicy" :key="index" >
						<div v-if="item.depositType === 1">
							<p>&nbsp;&nbsp;&nbsp;{{$t('PREPAYMENT')}} {{item.amount}}% {{$t('WITHIN')}} {{paymentDay}} </p>
						</div>
						<div v-if="item.depositType === 0">
							<p>&nbsp;&nbsp;&nbsp;{{$t('PREPAYMENT')}} {{item.amount}} {{$store.getters['user/getCurrentcy']}} {{$t('WITHIN')}} {{paymentDay*exchangeRate}} </p>
						</div>
					</div>
				</div>
				<br><h5 ><b> {{$t('CANCELLATION_POLICY')}}</b></h5><br>
				<div v-if="itemModal.cancelPolicy!==null">
					<div v-for="(item,index) in itemModal.cancelPolicy" :key="index" >
						<div v-if="item.cancellationType === 1">
							<p>&nbsp;&nbsp;&nbsp;{{$t('IF_CANCELED_LATER')}} {{item.cancellationDay}} {{$t('DAY_WILL_BE_PAID')}} {{item.amount}} % </p>
						</div>
						<div v-if="item.cancellationType === 0">
							<p>&nbsp;&nbsp;&nbsp;{{$t('IF_CANCELED_LATER')}} {{item.cancellationDay}}  {{$t('DAY_WILL_BE_PAID')}} {{item.amount*exchangeRate}} {{$store.getters['user/getCurrentcy']}}</p>
						</div>
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
		</b-modal> -->
	</div>
</template>

