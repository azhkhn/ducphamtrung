<style lang="scss">
@import "./ChartDashBoard.scss";
</style>

<script src="./ChartDashBoard.js">
</script>

<template>
<div class="ChartDashBoard">
	<b-row class="mt-5" style="margin:0">
			<b-col md="8" style="">
				<b-row class="revenue">
					<b-col>
						<div>
							<br>
							<b-row>
								<b-col><b>Revenue</b></b-col>
								<b-col class="text-right"> <b-button variant="link" @click="diffDay"><img class="m-0 p-0 " src="~icons/Arrow Left-blue.png" width="30px" height="30px" /></b-button> {{from | moment('DD/MM/YYYY')}} - {{to | moment('DD/MM/YYYY')}} <b-button variant="link" @click="addDay" :disabled="checkAddDay"><img class="m-0 p-0 " src="~icons/Arrow Right-blue.png" width="30px" height="30px" /></b-button></b-col>
							</b-row>
						</div>
						<div>
							<apexchart width="700px" type="area" :options="options" :series="series"></apexchart>
						</div>
					</b-col>
				</b-row>
				<b-row class="revenue">
					<b-col>
						<div>
							<br>
							<b-row>
								<b-col><b>Booking</b></b-col>
								<b-col class="text-right"> <b-button variant="link" @click="diffDayBooking"><img class="m-0 p-0 " src="~icons/Arrow Left-blue.png" width="30px" height="30px" /></b-button> {{fromBooking | moment('DD/MM/YYYY')}} - {{toBooking | moment('DD/MM/YYYY')}} <b-button variant="link" @click="addDayBooking" :disabled="checkAddDayBooking"><img class="m-0 p-0 " src="~icons/Arrow Right-blue.png" width="30px" height="30px" /></b-button></b-col>
							</b-row>
						</div>
						<div>
							<apexchart width="700px" type="area" :options="optionsBooking" :series="seriesBooking"></apexchart>
						</div>
					</b-col>
				</b-row>
				<b-row class="staff-reveneu">
					<b-col>
						<div>
							<br>
							<b-row>
								<b-col><b>Staff Revenue</b></b-col>
								<b-col class="text-right"> <b-button variant="link" @click="diffDayStaff"><img class="m-0 p-0 " src="~icons/Arrow Left-blue.png" width="30px" height="30px" /></b-button> {{fromStaff | moment('DD/MM/YYYY')}} - {{toStaff | moment('DD/MM/YYYY')}} <b-button variant="link" @click="addDayStaff" :disabled="checkAddDayStaff"><img class="m-0 p-0 " src="~icons/Arrow Right-blue.png" width="30px" height="30px" /></b-button></b-col>
							</b-row>
						</div>
						<div>
							<apexchart width="700px" type="bar" :options="optionsStaff" :series="seriesStaff"></apexchart>
						</div>
					</b-col>

				</b-row>
			</b-col>
			<b-col md="4"  style="padding-left:25px">
				<b-row class="booking-status">
					<b-col>
						<div>
							<br>
							<b-row>
								<b-col md="6"><b>Booking Status</b></b-col>
								<b-col ><datepicker  v-model="fromStatus" name="uniquename" :language="vi" format="dd-MM-yyyy" :disabledDates="state.disabledDates" @click.native="checkDate"></datepicker><icon class="mt-1 mr-2" name="sort-down" scale="1" style="color:#258fe0;position: absolute;top: -4px;right: 10px;"></icon></b-col>
							</b-row>
						</div>
						<br>
						<div>
							<apexchart type="pie" :options="chartOptions" :series="seriesStatus" />
						</div>
					</b-col>
				</b-row>
				<br>
				<b-row class="booking-status">
						<b-col>
						<div>
							<br>
							<b-row>
								<b-col ><b>Booking By Staff</b></b-col>
								<b-col ><datepicker  v-model="fromBookingStaff" name="uniquename" :language="vi" format="dd-MM-yyyy" :disabledDates="state.disabledDates" @click.native="checkDateStaff"></datepicker><icon class="mt-1 mr-2" name="sort-down" scale="1" style="color:#258fe0;position: absolute;top: -4px;right: 10px;"></icon></b-col>
							</b-row>
						</div>
						<br>
						<div>
							<apexchart type="pie"  :options="chartOptionsBookingStaff" :series="seriesBookingStaff" />
						</div>
					</b-col>
				</b-row>

			</b-col>
		</b-row>
</div>

</template>

