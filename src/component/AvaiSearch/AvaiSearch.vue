<style lang="scss" >
	@import './AvaiSearch.scss';
</style>

<script src="./AvaiSearch.js">

</script>

<template >
	<div id="avaiSearch"  v-bind:style="{'max-height': heightWindow}">
		<b-img class="imgback" src= "../static/file/backgroundHome.jpg" />
		<back-to-top visibleoffset="200">
			<icon class="ml-2 pt-1" name="arrow-alt-circle-up" scale="2" style="color:rgb(111, 126, 150)"></icon>
		</back-to-top>
		<div  v-if="loadingg===true"  style="text-align: center;z-index:1;background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8));position: absolute;
		top: 0px;
		margin: auto;
		left: 0px;
		right: 0px; height: 100%;
         width: 100%;">
			<Spinner name="three-bounce" style="margin-top:10%" v-if="loadingg" color="#fff"/>
		</div>
		<div class="contentSearch">
			<div  class="cardSearch" v-if="loadingg===false">
				<div >
				<b-row>
					<b-col md="3" class="coll" @click="collapse1 = false" aria-controls="collapse1" :aria-expanded="collapse1 ? 'false' : 'false'">
						<b-col><b>{{$t('Locations_cb_AvaiSearch')}}</b></b-col>
						<img class="p-0" src="~icons/Location-gray.png" width="27px" height="27px" style="position: absolute; z-index: 10;  left: 20px;  top: 40px;" />
						<multiselect class="testt multiSelect" :show-labels="false" v-model="selected" :options="filterLocationsLang" :placeholder= "$t('CbAlert_lb_AvaiSearch')" label="title" track-by="title" style="border:0px;" ></multiselect>
						<!-- <b-row class="text-danger" v-if="error!=''">
							<b-col>{{error}}</b-col>
						</b-row> -->
					</b-col>
					<b-col  md="4" class="coll">
						<div @click="collapse1 = false"	 aria-controls="collapse1"	:aria-expanded="collapse1 ? 'false' : 'false'">
							<b-row>
								<b-col><b>{{$t('Checkin_cb_AvaiSearch')}}</b></b-col>
								<b-col><b>{{$t('Checkout_cb_AvaiSearch')}}</b></b-col>
							</b-row>
							<HotelDatePicker class="testt datetimeHotel"  format="DD-MM-YYYY" :startingDateValue="checkindate" :endingDateValue="checkOutdate" :maxNights="30" :i18n="datePickerTranslate" @checkInChanged="checkindate=$event" @checkOutChanged="checkOutdate=$event">
							</HotelDatePicker>
						</div>
						<!-- <b-row style="color:red" v-if="error1!=''">
							<b-col>{{error1}}</b-col>
						</b-row> -->
					</b-col>
					<b-col  md="3" class="coll">
						<b-col><b >{{$t('RoomDetails_cb_AvaiSearch')}}</b></b-col>
						<b-btn class="testt selectRoomdetail"  v-b-toggle.collapse1 variant="outlined">
									<b-row>
										<b-col md="3" style="padding:0"><img  src="~icons/Room_Type.png" width="27px" style="height:30px" class=""  /></b-col>
										<b-col class="text-left mt-1" style="padding:0">
											<span style="color:black">{{unitAdults.quantities}} {{$t('Adults_btn_ResultSearch')}}</span>,
											<span style="color:black">{{unit.quantities}} {{$t('Childrens_btn_ResultSearch')}}</span>
										</b-col>
										<b-col md="2">
											<span v-if="collapse1===true"><icon class="mt-1 mr-2" name="caret-up" scale="1" style="color:#258fe0"></icon></span>
											<span v-if="collapse1===false"><icon class="mt-1 mr-2" name="sort-down" scale="1" style="color:#258fe0"></icon></span>
										</b-col>
									</b-row>
								</b-btn>
								<b-collapse id="collapse1" class="collslap" accordion="my-accordion" v-model="collapse1">
									<b-card  title="" >
										<div class="bobycoll">
											<b-row >
													<b-col md="5" class="text-left text-dark" >
														<p class="Adultp"><b>{{$t('Adults_btn_ResultSearch')}}</b></p>
														<p class="Adultp"> {{$t('Above_12_years')}}</p>
													</b-col>
													<b-col>
														<b-row class="rowAdult text-dark" style="margin:0">
															<b-col md="3" class="diffAdult  text-center" style="padding:0"><b-button style="width:100%" class="btnunit" variant="link" @click="diffAdult()" ><icon class="mt-2" name="minus" scale="0.8" ></icon></b-button></b-col>
															<b-col class="textunitAdultsRoom p-0"><input v-model="unitAdults.quantities" v-on:keypress="isNumber(event)" class="formselectchild"> </b-col>
															<b-col md="3" class="addAdult  text-center" style="padding:0"> <b-button class="btnunit" variant="link" @click="addAdult()" style="width:100%"><icon class="mt-2" name="plus" scale="0.8" ></icon></b-button></b-col>
														</b-row>
													</b-col>
											</b-row>
											<br>
											<b-row>
												<b-col  md="5" class="text-left text-dark" >
													<p class="Adultp"><b>{{$t('Childrens_btn_ResultSearch')}}</b></p>
													<p class="Adultp">{{$t('Bellow_12_years')}}</p>
												</b-col>
												<b-col>
													<b-row class="rowAdult" style="margin:0">
															<b-col md="3" class="diffAdult  text-center" style="padding:0"><b-button class="btnunit" variant="link" @click="diffUnits()" ><icon class="mt-2" name="minus" scale="0.8" ></icon></b-button></b-col>
															<b-col  class="textunitAdultsRoom p-0"><input v-model="unit.quantities" v-on:keypress="isNumber(event)" class="formselectchild"></b-col>
															<b-col md="3" class="addAdult  text-center" style="padding:0"><b-button class="btnunit" variant="link" @click="addUnits()" ><icon class="mt-2" name="plus" scale="0.8" ></icon></b-button></b-col>
													</b-row>
												</b-col>
											</b-row>
										</div>
									</b-card>
								</b-collapse>
					</b-col>
					<b-col  md="2" class="coll">
						<b-col style="margin-bottom: 20px;"></b-col>
							<b-button style="border-radius:4px; width:100%" variant="warning" class="text-white search" size="md" @click="select(checkindate,checkOutdate,unitAdults.quantities,unit.quantities,counterChilds)">
								{{$t('Search_btn_ResultSearch')}} <icon class="mt-1" name="arrow-right" scale="0.8" style="color:#ffff"></icon>
							</b-button>
							<md-dialog-confirm :md-active.sync="error1" :md-content="$t('ERROR_DATE')" md-confirm-text="OK"  @md-confirm="onConfirm" />
							<md-dialog-confirm :md-active.sync="error" :md-content="$t('ERROR_LOCATION')"  md-confirm-text="OK" @md-confirm="onConfirm" />
					</b-col>
				</b-row>
				<br>
				</div>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>

</template>

