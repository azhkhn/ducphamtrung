
<style lang="scss">
@import './ReservationSearch.scss';</style>
<script src="./ReservationSearch.js"></script>

<template>

	<div id="ReservationSearch">
	<back-to-top visibleoffset="200"><icon class="ml-2 pt-1" name="arrow-alt-circle-up" scale="2" style="color:rgb(111, 126, 150)"></icon></back-to-top>
	<br>
			<div style="text-align: center;" >
				<Spinner name="three-bounce"  v-if="loading" color="#e86e53"/>
			</div>
			<div id="base">
			<div id="searchbarReservation" style="border: none; ">
				<!-- reservation search -->
				<div id="formSearch"  v-on:keyup.enter= "changeFilterReservationSearch()" style="padding:2px">
					<b-row>
						<b-col style="padding-left:5px">
							<b-form-group
									label-size="md"
									:label="$t('Search_by_ReserSearch')"
									label-for="searchBy"
									label-text-align="left">
								<b-form-select id="searchBy"
										type="text" name="searchBy"
										v-model="selectedSearch"
										:options="searchBy"
										value-field="key"
										text-field="value"
									size="md">
								</b-form-select>
							</b-form-group>
						</b-col>
						<b-col v-if="selectedSearch === 'BOOKINGCODE'">
							<b-form-group
									label-size="md"
									:label="$t('Booking_Code_reserSearch')"
									label-for="bookingCode"
									label-text-align="left"
									v-if="selectedSearch === 'BOOKINGCODE'">
										<b-form-input id="bookingCode"
										type="text" name="bookingCode"
										v-model="bookingCode"
											size="md">
										</b-form-input>
							</b-form-group>
						</b-col>
						<b-col v-if="selectedSearch === 'BOOKINGDATE' || selectedSearch === 'CHECKINDATE'|| selectedSearch === 'CHECKOUTDATE'">
							<b-form-group label-size="md" style="position: relative;"
									:label="$t('From_Date')"
									label-for="fromDate"
									label-text-align="left"
									v-if="selectedSearch === 'BOOKINGDATE' || selectedSearch === 'CHECKINDATE'|| selectedSearch === 'CHECKOUTDATE'">
									<datepicker  v-model="fromDate" name="uniquename" :language="vi" format="dd-MM-yyyy" :disabledDates="state1.disabledDates" @click.native="checkDate"></datepicker>
									<img class="p-0" src="~icons/Calendar-gray.png" width="27px" height="27px" style="position: absolute;left: 2px;top: 32px;" />
							</b-form-group>
						</b-col>
						<b-col v-if="selectedSearch === 'BOOKINGDATE' || selectedSearch === 'CHECKINDATE'|| selectedSearch === 'CHECKOUTDATE'">
							<b-form-group label-size="md"  style="position: relative;"
									:label="$t('To_Date')"
									label-for="toDate"
									label-text-align="left"
									v-if="selectedSearch === 'BOOKINGDATE' || selectedSearch === 'CHECKOUTDATE'|| selectedSearch === 'CHECKINDATE'">
									<!-- <icon class="mt-2" name="calendar-alt" scale="1" style="position: absolute;right: 10px;top: 32px;z-index:10"></icon> -->
									<img class="p-0" src="~icons/Calendar-gray.png" width="27px" height="27px" style="position: absolute;left: 2px;top: 32px;z-index:2" />
									<datepicker  v-model="toDate" name="uniquename" :language="vi" format="dd-MM-yyyy" @click.native="checkDate1" :disabledDates="state.disabledDates" ></datepicker>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group
									label-size="md"
									:label="$t('Solution_li5_FooterLoginRegister')"
									label-for="hotel"
									label-text-align="left">
										<b-form-input id="hotel"
										type="text" name="hotel"
										v-model="hotel2"
											size="md"></b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group
									label-size="md"
									:label="$t('ALL_USER_RESERVATION')"
									label-for="User"
									label-text-align="left">
								<b-form-select id="Booking"
										type="text" name="Booking"
										v-model="selectedUser"
										:options="lstUser"
										value-field="key"
										text-field="value"
									size="md">
								</b-form-select>
							</b-form-group>
						</b-col>
						<b-col style="padding-right:5px">
							<b-form-group
									label-size="md"
									:label="$t('Booking_Status_reserSearch')"
									label-for="Booking"
									label-text-align="left">
								<b-form-select id="Booking"
										type="text" name="Booking"
										v-model="selectedStatus"
										:options="bookingStatus"
										value-field="key"
										text-field="value"
									size="md">
								</b-form-select>
							</b-form-group>
						</b-col>
					</b-row>
				</div>
				<div id="search" class="text-right" style="margin-right:-7px;margin-top:5px;">
					<b-button variant="outline-primary" @click="exportTableToExcel('reserSearch', `Report Booking ${fromDate} to ${toDate}`)" style="width: 158px;height: 40px;margin-right:26px">Export Excel</b-button>
					<b-button class="btn-radius text-white" @click="changeFilterReservationSearch"  variant="primary"  size="md" style="width: 158px;
														height: 40px;
														border-radius: 5px;
														background-color: #258fe0;">
														<img  src="~icons/Search.png">{{$t('Search_btn_ResultSearch')}}</b-button>
				</div>
			</div>
		<!-- End div search -->
		<div class="table-hotels"  v-show="loading === false">
			  <b-row>
				<b-col>
						<b-table id="reserSearch" show-empty
							striped
							:items="itemDetail"
							:fields="fields"
							@filtered="onFiltered"
							:current-page="currentPage"
							:per-page="perPage"
							:filter="filter"
							v-if="loading===false"
							:empty-filtered-text= "$t('faill')"
							class="text-center">
						<template slot="ReservationInfo" slot-scope="row">
							<b-row class="text-left" >
								<b-col>
									<a @click.prevent="passdata(row.item)" taget="blank" class="poiter">
											<span  v-if="row.item.bookingStatus ==='CANCEL'"  style="color:red;">
												<b>{{row.item.bookingCode}}</b>
											</span>
											<span v-else>
												<b style="color: #258fe0">{{row.item.bookingCode}}</b>
											</span>
									</a>
								</b-col>
							</b-row>
							<b-row class="text-left">
								<b-col v-if="row.item.bookingStatus=='CANCEL'"><b style="color:red">{{row.item.cusName}} </b> </b-col>
								<b-col v-else ><b>{{row.item.cusName}} </b> </b-col>
							</b-row>
						</template>
						<template slot="Hotel" slot-scope="row">
							<b-row class="text-left" v-for="(a,b) in row.item.i18ns" :key="b" v-if="a.lang === $store.getters.currentLanguage.code">
								<b-col v-if="row.item.bookingStatus=='CANCEL'" >
										<p style="color:gray" >{{a.name}} </p>
								</b-col>
								<b-col v-else ><p >{{a.name}} </p>
								</b-col>
							</b-row>
						</template>
						<template slot="Price" slot-scope="row">
							<b-col class="text-right">
									<span style="color:red" v-if="row.item.bookingStatus ==='CANCEL'">{{row.item.currencyCode}}  {{formatPrice(row.item.totalAmount)}} </span>
									<span v-else>{{row.item.currencyCode}} {{formatPrice(row.item.totalAmount)}}  </span>
								<br>
								<!-- <b-row><strike><b > {{row.value.PriceSum}} VND</b></strike> </b-row> -->
							</b-col>
						</template>
						<template slot="StayDate" slot-scope="row">
							<b-col class="text-center">
								<span>{{row.item.checkinDate | moment('DD/MM/YYYY')}}</span>
								<br>
								 <span>{{row.item.checkoutDate | moment('DD/MM/YYYY')}}</span>
							</b-col>
						</template>
						<template slot="FreeCancel" slot-scope="row">
							<b-col  class="text-center">
								<b v-if="row.item.cancellationResponses.cancelDay!==null">{{$t('before')}} {{row.item.cancellationResponses.cancelDay | moment('DD/MM/YYYY')}}</b>
							</b-col>
						</template>
						<template slot="User" slot-scope="row">
							<b-row>
								<b-col  class="text-left">
									<span>{{row.item.booked}}</span>
								</b-col>
							</b-row>
							<b-row class="text-left">
								<b-col class="text-left">
									<i><p >{{row.item.createdBooking | moment('DD/MM/YYYY') }}</p></i>
								</b-col>
							</b-row>
						</template>
						<template slot="PayMent" slot-scope="row" >
							<b-col v-if="row.item.bookingStatus=='CANCEL'" class="text-right">
								<b style="margin:auto; color: red">---</b>
							</b-col>
							<b-col v-else v-for="(a,index) in row.item.paymentResponses" :key="index" class="text-right">
								<span v-if="a.acounting === 1 ">
									<p class="borderDate2" v-if=" a.paymentDate!==''"><b>{{a.paymentDate | moment('DD/MM/YYYY')}}</b> </p>
									<span v-if="a.amountPayment>=0">{{row.item.currencyCode}} {{formatPrice(a.amountPayment)}} </span>
								</span>
								<span v-if="a.acounting === 2">
									<p class="borderDate1" ><b>{{a.paymentDate | moment('DD/MM/YYYY')}}</b> </p>
									<span v-if="a.amountPayment>=0"> {{row.item.currencyCode}} {{formatPrice(a.amountPayment)}}</span>
								</span>
								<span v-if="a.acounting === 3">
									<!-- <p class="borderDate3" ><b v-if="a.paymentDate!==''">{{a.paymentDate | moment('DD/MM/YYYY')}}</b><b v-else>00/00/0000</b> </p> -->
									<span v-if="a.amountPayment>=0" class="text-danger">{{row.item.currencyCode}} {{formatPrice(a.amountPayment)}} </span>
								</span>
								<span v-if="a.acounting === 0">
									<p class="borderDate0" ><b>{{a.paymentDate | moment('DD/MM/YYYY')}}</b> </p>
									<span v-if="a.amountPayment>=0"> {{row.item.currencyCode}} {{formatPrice(a.amountPayment)}}</span>
								</span>
							</b-col>

						</template>
						<template slot="Status" slot-scope="row">
							<b-col class="text-left">
								<span  v-if="row.item.bookingStatus=='CANCEL'" style="color:red">{{row.item.bookingStatus}} </span>
								<span v-else>{{row.item.bookingStatus}} </span>
							</b-col>
						</template>
						</b-table>
						</b-col>
			  </b-row>
			  <b-row class="pb-5" v-if="itemDetail.length > 0">
				  <!-- {{filter.selectedStatus}} -->
				<b-col md="8" v-if="currentPage*perPage <= totalRows">
			{{$t('List_from')}} <b>{{(currentPage*perPage - perPage) + 1}} </b> {{$t('to')}} <b>{{currentPage*perPage}}</b> {{$t('in')}} <b>{{totalRows}}</b>
				</b-col>
				<b-col md="8" v-else>
			{{$t('List_from')}} <b>{{(currentPage*perPage - perPage) + 1}}</b> {{$t('to')}} <b>{{totalRows}}</b> {{$t('in')}} <b>{{totalRows}}</b>
				</b-col>
				<b-col class="text-right">
					<b-pagination  :total-rows="totalRows" :per-page="perPage" v-model="currentPage"  class="perpage" />
				</b-col>
			</b-row>
		</div>
		</div>
	</div>
</template>

