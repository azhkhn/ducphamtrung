<style lang="scss">
@import "./DetailSearch.scss";
</style>
<script src="./DetailSearch.js"></script>
<template >
	<div id="detailSearch" >
		<template>
				<back-to-top visibleoffset="200"><icon class="ml-2 pt-1" name="arrow-alt-circle-up" scale="2" style="color:rgb(111, 126, 150)"></icon></back-to-top>
		</template>
		<!-- <div class="alert1">
				<b-alert :show="dismissCountDown"
						dismissible
						variant="primary"
						@dismissed="dismissCountDown=0"
						@dismiss-count-down="countDownChanged"
						>
				<b>{{$t('INFO_ALERT')}}!</b>
				</b-alert>
		</div> -->
		<div class="sticky">
			<div class="searchroom" >
				<br>
					<b-row style="margin:0px">
						<b-col class="colcenter" md="5" id="span"  style="padding-right:0">
							<span style="border-radius:4px; " @click="collapse3 = false"
																aria-controls="collapse3"
																:aria-expanded="collapse3 ? 'false' : 'false'">
								<HotelDatePicker id="time" :startingDateValue="checkin" :endingDateValue="checkOutdate" @checkInChanged="checkinroom=$event" @checkOutChanged="checkoutroom=$event" format="DD/MM/YYYY"  :maxNights="30" :i18n="datePickerTranslate"></HotelDatePicker>
							</span>
						</b-col>
						<b-col class="colcenter" id="btnadult" md="3">
							<b-field label="Room Details">
								<b-btn class="btn-input"  v-b-toggle.collapse3 variant="outlined">
									<b-row>
										<b-col md="2" align="center" style="padding-right:0"><span><img  src="~icons/Room_Type.png" width="30px" style="height:30px" class=""  /></span></b-col>
										<b-col class="text-secondary text-left mt-1" >{{unitAdultsRoom.quantities}} {{$t('Adults_btn_ResultSearch')}},{{unitRoom.quantities}} {{$t('Childrens_btn_ResultSearch')}}</b-col>
										<b-col md="2">
											<span v-if="collapse3===true"><icon class="mt-1 mr-2" name="caret-up" scale="1" style="color:#258fe0"></icon></span>
											<span v-if="collapse3===false"><icon class="mt-1 mr-2" name="sort-down" scale="1" style="color:#258fe0"></icon></span>
										</b-col>
									</b-row>
								</b-btn>
							<b-collapse  id="collapse3" class="m-0 p-0" v-model="collapse3">
								<b-card  title="" >
									<div class="bobycoll">
										<b-row >
											<b-col md="5" class="text-left text-dark">
												<p  style="margin:0"><b>{{$t('Adults_btn_ResultSearch')}}</b></p>
												<p  style="margin:0"> {{$t('Above_12_years')}}</p>
											</b-col>
											<b-col  style="padding:0">
												<b-row class="rowAdult text-dark">
													<b-col md="3" class="diffAdult" style="padding:0"><b-button class="btnunit" variant="link" @click="diffAdultRoom()" ><icon class="mt-2" name="minus" scale="0.8" ></icon></b-button></b-col>
													<b-col class="textunitAdultsRoom p-0"><input v-model="unitAdultsRoom.quantities" v-on:keypress="isNumber(event)" class="formselectchild"> </b-col>
													<b-col md="3" class="addAdult" style="padding:0"> <b-button class="btnunit" variant="link" @click="addAdultRoom()" ><icon class="mt-2" name="plus" scale="0.8" ></icon></b-button></b-col>
												</b-row>
											</b-col>
										</b-row>
										<br>
										<b-row>
											<b-col  md="5" class="text-left text-dark">
												<p style="margin:0"><b>{{$t('Childrens_btn_ResultSearch')}}</b></p>
												<p style="margin:0">{{$t('Bellow_12_years')}}</p>
											</b-col>
											<b-col  style="padding:0">
												<b-row class="rowAdult">
													<b-col md="3" class="diffAdult" style="padding:0"><b-button class="btnunit" variant="link" @click="diffUnitsRoom()" ><icon class="mt-2" name="minus" scale="0.8" ></icon></b-button></b-col>
													<b-col  class="textunitAdultsRoom p-0"><input v-model="unitRoom.quantities" v-on:keypress="isNumber(event)" class="formselectchild"></b-col>
													<b-col md="3" class="addAdult" style="padding:0"><b-button class="btnunit" variant="link" @click="addUnitsRoom()" ><icon class="mt-2" name="plus" scale="0.8" ></icon></b-button></b-col>
												</b-row>
											</b-col>
										</b-row>
									</div>
								</b-card>
							</b-collapse>
						</b-field>
					</b-col >
					<b-col @click="collapse3 = false"
							aria-controls="collapse3"
							:aria-expanded="collapse3 ? 'false' : 'false'" style="padding-left:0px;">
						<b-form-input v-model="textcoupon" class="btn-input"
						type="text"
						:placeholder="$t('COUPON_CODE')">
						</b-form-input>
					</b-col>
					<b-col class="colcenter" style="padding-left:0px">
						<b-button v-if="checkinroom!==''" class="button_availability" @click="checkavailability(checkinroom,checkoutroom,unitAdultsRoom.quantities,unitRoom.quantities,textcoupon)"  variant="warning" size="md" style="height:45px">{{$t('CHECK_AVAILABILITY')}}</b-button>
						<b-button v-if="checkinroom ===''" class="button_availability" @click="checkavailability(checkin,checkOutdate,unitAdultsRoom.quantities,unitRoom.quantities,textcoupon)"  variant="warning" size="md" style="height:45px">{{$t('CHECK_AVAILABILITY')}}</b-button>
					</b-col>
				</b-row>
				<md-dialog-confirm :md-active.sync="errodate" :md-content="$t('ERROR_DATE')" md-confirm-text="OK"  @md-confirm="onConfirm" />
			<br>
			</div>
		</div>
		<b-row class="pt-4 detailllll pb-5" style="margin: auto;
    margin-top: 64px">
			<b-col style="padding:0">
				<div id="searchbarDt" >
					<!-- <div class="headerDt" ><icon name="address-book" scale="0.8" style="color:white" ></icon> {{$t('CONTACT_TO_THE_HOTEL')}}</div> -->
						<div id="formSearchDt">
							<b-row>
								<b-col>
									<h5><b><span v-for="(j,key) in apihotelname[0]" :key="key" v-if="j.langCode==$store.getters.currentLanguage.code" >{{j.title}}</span></b></h5>
								</b-col>
							</b-row>
							<b-row>
								<b-col>
									<span  v-for="(n,index) in hotel.type.i18ns" :key="index"  v-if="n.langCode==$store.getters.currentLanguage.code">{{n.title}}</span>
								</b-col>
							</b-row>
							<b-row>
								<b-col>
									<template v-for="i in 5">
										<span v-if="hotel.rankStar >= i"><img class="p-0" src="~icons/star.png" width="30px" height="30px" /><span style="margin-left:10px"></span></span>
									</template>
									<span v-if="hotel.rankStar%1!==0"><img class="p-0" src="~icons/star half.png" width="30px" height="30px" /></span>
								</b-col>
							</b-row>
							<br>
							<b-row>
								<b-col sm="2"><icon name="phone"  scale="1" style="color:#ccc"></icon></b-col>
								<b-col style="font-size:13px">{{hotel.phone}}</b-col>
							</b-row>
							<br>
							<b-row>
								<b-col sm="2"><icon name="phone"  scale="1" style="color:#ccc"></icon></b-col>
								<b-col style="font-size:13px">{{hotel.hotline}}</b-col>
							</b-row>
							<br>
							<b-row>
								<b-col sm="2"><icon name="envelope"  scale="1" style="color:#ccc"></icon></b-col>
								<b-col style="font-size:13px">{{hotel.email}}</b-col>
							</b-row>
							<br>
							<b-row>
								<b-col sm="2">
									<icon class="pt-1" name="map-marker-alt" scale="1.5" style="color:#ccc"></icon>
								</b-col>
								<b-col style="font-size:13px">
									<span  v-for=" (j,i) in apihoteladdress[0]" :key="i" v-if="j.langCode==$store.getters.currentLanguage.code">{{j.title}}</span>
								</b-col>
							</b-row>
							<br>
						</div>
					</div>
					<div id="searchbarDt">
						<div id="formFilter">
							<b-row>
								<b-col><img class="m-0 p-0 " src="~icons/Filter-gray.png" width="30px" height="30px" />	<b class="text-secondary">Filter</b></b-col>
							</b-row>
							<br>
							<b-row>
								<b-col md="8">
									<b>{{$t('ROOM_AMENITIES')}}</b>
								</b-col>
								<b-col class="text-right">
									<a class="poiter" @click="deleteTickRoomAmeniti"><span class="text-secondary">{{$t('UN_FILTER')}}</span></a>
								</b-col>
							</b-row>
							<b-row>
								<b-col>
									<div >
										<b-form-group label="">
											<b-form-checkbox-group v-for="(item,index) in lstRoomAmeniti2" v-model="selectedamenitiroom" :key="index"  @change="$event => filterAmeniti($event)">
												<b-form-checkbox stacked text-field="name"  :value="item.id"  v-for="(a,b) in item.names" :key="b" v-if="a.langCode === $store.getters.currentLanguage.code">
													{{a.title}} ({{item.count}})
												</b-form-checkbox>
											</b-form-checkbox-group>
										</b-form-group>
										<!-- <div class="text-left" v-show="lstRoomAmeniti2.length > 5">
											<b-btn  variant="link" v-if="roomAmenityMore==false" @click="roomAmenityMore=true"><icon  class="mt-1" name="caret-down" scale="1" style="color:blue" ></icon> {{$t('SHOW_MORE')}} ({{lstRoomAmeniti2.length - 5 > 0 ? (+lstRoomAmeniti2.length-+5 ):''}})</b-btn>
											<b-btn  variant="link" v-else  @click="roomAmenityMore=false"><icon  name="caret-up" scale="1" style="color:blue"  class="mt-1"></icon> {{$t('Hide')}}</b-btn>
										</div> -->
									</div>
								</b-col>
							</b-row>
						</div>
					</div>
			</b-col>
			<b-col md="9" class="" style="min-height:400px;">
				<div  class="slidehotel">
					<b-carousel id="carousel"
						controls
						background="#f2f2f2"
						:interval="3000"
						img-width="1024"
						img-height="480"
						v-model="slide"
						@sliding-start="onSlideStart"
						@sliding-end="onSlideEnd" v-for="(i,a) in imgs" :key="a"
						style=" height:450px;">
						<b-carousel-slide
									img-width="1024"
									img-height="480"
									v-for="(ii,index) in i" :key="index"
									style="height: 450px; min-height:450px;border-radius:8px;"
									:img-src="ii">
						</b-carousel-slide>
					</b-carousel>
				</div>
				<br>
			<!-- <div class="searchroom1" :id="checkclass1" style="margin-right: 10px;padding-bottom:10px;">
				<br>
				<div style="margin-right:0;display:table">
					<b-col class="colcenter" id="span" style="padding: 0;display:table-cell;width:40%;vertical-align:middle" >
						<span style="border-radius:4px; " @click="collapse2 = false"
				aria-controls="collapse2"
				:aria-expanded="collapse2 ? 'false' : 'false'">
							<HotelDatePicker id="time" :startingDateValue="checkin" :endingDateValue="checkOutdate" @checkInChanged="checkinroom=$event" @checkOutChanged="checkoutroom=$event" format="DD/MM/YYYY"  :maxNights="30" :i18n="datePickerTranslate"></HotelDatePicker>
							<b-row class="text-danger ml-4" v-if="errodate!=0">
								<b-col>{{$t('ERROR_DATE')}}</b-col>
							</b-row>
						</span>
					</b-col>
					<b-col class="colcenter" id="btnadult" style="display:table-cell;width:30%">
						<b-field label="Room Details">
							<b-btn class="btn-input"  v-b-toggle.collapse2 variant="outlined">
								<b-row>
									<b-col md="2" align="center"><span><icon name="users" scale="1.5" style="color:#ccc"></icon></span></b-col>
									<b-col class="text-secondary text-left mt-1" style="padding-right:0"><b>{{unitAdultsRoom.quantities}} {{$t('Adults_btn_ResultSearch')}}, {{unitRoom.quantities}} {{$t('Childrens_btn_ResultSearch')}}</b></b-col>
									<b-col md="2">
										<span v-if="collapse2===true"><icon class="mt-1 mr-2" name="caret-up" scale="1" style="color:#258fe0"></icon></span>
										<span v-if="collapse2===false"><icon class="mt-1 mr-2" name="sort-down" scale="1" style="color:#258fe0"></icon></span>
									</b-col>
								</b-row>
							</b-btn>
								<b-collapse  id="collapse2" class="m-0 p-0" v-model="collapse2">
									<b-card  title="" >
										<div class="bobycoll">
											<b-row >
													<b-col md="5" class="text-left text-dark">
														<p style="margin:0"><b>{{$t('Adults_btn_ResultSearch')}}</b></p>
														<p style="margin:0"> {{$t('Above_12_years')}}</p>
													</b-col>
													<b-col  style="padding:0">
														<b-row class="rowAdult text-dark">
															<b-col md="3" class="diffAdult" style="padding:0"><b-button class="btnunit" variant="link" @click="diffAdultRoom()" ><icon class="mt-2" name="minus" scale="0.8" ></icon></b-button></b-col>
															<b-col class="textunitAdultsRoom p-0"><input v-model="unitAdultsRoom.quantities" v-on:keypress="isNumber(event)" class="formselectchild"> </b-col>
															<b-col md="3" class="addAdult" style="padding:0"> <b-button class="btnunit" variant="link" @click="addAdultRoom()" ><icon class="mt-2" name="plus" scale="0.8" ></icon></b-button></b-col>
														</b-row>
													</b-col>
											</b-row>
											<br>
											<b-row>
												<b-col  md="5" class="text-left text-dark">
													<p style="margin:0"><b>{{$t('Childrens_btn_ResultSearch')}}</b></p>
													<p style="margin:0">{{$t('Bellow_12_years')}}</p>
												</b-col>
												<b-col  style="padding:0">
													<b-row class="rowAdult">
															<b-col md="3" class="diffAdult" style="padding:0"><b-button class="btnunit" variant="link" @click="diffUnitsRoom()" ><icon class="mt-2" name="minus" scale="0.8" ></icon></b-button></b-col>
															<b-col  class="textunitAdultsRoom p-0"><input v-model="unitRoom.quantities" v-on:keypress="isNumber(event)" class="formselectchild"></b-col>
															<b-col md="3" class="addAdult" style="padding:0"><b-button class="btnunit" variant="link" @click="addUnitsRoom()" ><icon class="mt-2" name="plus" scale="0.8" ></icon></b-button></b-col>
													</b-row>
												</b-col>
											</b-row>
										</div>
									</b-card>
								</b-collapse>
						</b-field>
					</b-col >
					<b-col @click="collapse2 = false"
				aria-controls="collapse2"
				:aria-expanded="collapse2 ? 'false' : 'false'" style="padding-left:0px;display:table-cell;width:15%">
						<b-form-input v-model="textcoupon" class="btn-input"
						type="text"
						:placeholder="$t('COUPON_CODE')">
						</b-form-input>
					</b-col>
					<b-col class="colcenter" style="padding:0px">
							<b-button v-if="checkinroom!==''" style="height:48px" class="button_availability" @click="checkavailability(checkinroom,checkoutroom,unitAdultsRoom.quantities,unitRoom.quantities,textcoupon)"  variant="primary" size="md">{{$t('CHECK_AVAILABILITY')}}</b-button>
							<b-button v-if="checkinroom ===''" style="height:48px" class="button_availability" @click="checkavailability(checkin,checkOutdate,unitAdultsRoom.quantities,unitRoom.quantities,textcoupon)"  variant="primary" size="md">{{$t('CHECK_AVAILABILITY')}}</b-button>
					</b-col>
				</div>
			</div> -->
			<h5 v-if="sumroom>0"><b> {{$t('THERE_ARE')}} {{sumroom}} {{$t('ROOM_TYPES_WITH')}} {{sumplans}} {{$t('OPTIONS')}}</b> </h5>
			<h5 v-if="sumroom==0"><b v-if="$store.getters.currentLanguage.code=='vi'"> Không tìm thấy phòng trống</b><b v-if="$store.getters.currentLanguage.code!=='vi'"> No room available</b> </h5>
			<div id="detailsRoom"   v-if="sumroom>0">
				<br>
				<div v-for="(item, index) in items[0]" :key="index" style="margin-bottom:15px; margin-right:0">
				<b-row class="roomm"  v-if="item.filter===1">
					<div class="roomhover" >
					<b-col class="collimgroom" style="padding-left:0px;width:20%;padding-right:0px">
							<figure class="effect-sadie" style="margin:0px" @click.stop="viewDetail(item, $event.target)">
								<img  style="border-radius:6px 0px 0px 6px;height:130px;width:225px;" :src="item.image === null? 'https://yt3.ggpht.com/a-/ACSszfE1mISNfXbxdyiGTeyrA4CnS2Nsy9gw0KCC1g=s900-mo-c-c0xffffffff-rj-k-no':item.image" alt="img01"/>
								<figcaption>
									<p><b-button variant="link"  style="color:#fff">{{$t('ViewDetails_link_DetailSearch')}}</b-button></p>
								</figcaption>
							</figure>
					</b-col>
					<b-col class="collamenitiroom" style="width:50%">
									<b-row>
										<div>
											<b-button variant="link"  @click.stop="viewDetail(item, $event.target)"  ><h5 style="color:black"  v-for="(j,index) in item.names" v-if="j.langCode==$store.getters.currentLanguage.code" :key="index"><b>{{ j.title }}</b></h5></b-button>
										</div>
									</b-row>
									<b-row v-for="(a,b) in item.descriptions" :key="b">
										<b-col ><p v-if="a.langCode===$store.getters.currentLanguage.code" >{{strip(a.title).split(" ", 30).join(" ")}}...</p></b-col>
										<!-- {{a.title.split(" ", 5).join(" ")}}... -->
									</b-row>
									<b-row class="amenitimd" style="font-size:12px">
										<b-col md="4">
											<b-row>
												<b-col md="2">
													<icon class="mt-2" name="image" scale="1" style="color:#ccc"></icon>
												</b-col>
												<b-col  class="" v-for=" (j,index) in item.views" v-if="j.langCode==$store.getters.currentLanguage.code" :key="index">
													 <div class="mt-2">{{j.title}}</div>
												</b-col>
											</b-row>
										</b-col>
										<b-col md="4">
											<b-row>
												<b-col md="2">
													<icon class="mt-2" name="home" scale="1" style="color:#ccc"></icon>
												</b-col>
												<b-col>
													 <div class="mt-2">{{item.size}} m²</div>
												</b-col>
											</b-row>
										</b-col>
										<b-col md="4">
											<b-row>
												<b-col md="2">
													<icon class="mt-2" name="user" scale="1" style="color:#ccc"></icon>
												</b-col>
												<b-col >
													 <div class="mt-2">{{item.maxAdults}}</div>
												</b-col>
											</b-row>
										</b-col>
										<b-col md="4">
											<b-row>
												<b-col md="2">
													<icon class="mt-2" name="child" scale="1" style="color:#ccc"></icon>
												</b-col>
												<b-col >
													 <div class="mt-2">{{(item.maxGuests - item.maxAdults)}}</div>
												</b-col>
											</b-row>
										</b-col>
										<b-col >
											<b-row>
												<b-col md="1">
													<icon class="mt-2" name="bed" scale="1" style="color:#ccc"></icon>
												</b-col>
												<b-col v-for=" (j,index) in item.beds" v-if="j.langCode===$store.getters.currentLanguage.code" :key="index">
													 <div class="mt-2">{{j.title}}</div>
												</b-col>
											</b-row>
										</b-col>
									</b-row>
					</b-col>
					<b-col class="collrate" style="width:20%; margin:auto; padding-left:0">
						<b-row class="roomavai" v-if="item.Special===1">
							<b-col class="Specialcoll">
								<span>{{$t('SPECIAL_OFFER')}}</span>
							</b-col>
						</b-row>
						<b-row class="" >
							<b-col class="minprice">
								<span >{{$t('PRICE_ONLY_FROM')}}<h5 >{{$store.getters['user/getCurrentcy']}} {{formatPrice(item.minprice*hotel.rate)}}</h5></span>
							</b-col>
						</b-row>
						<b-row class="mb-2">
							<b-col>
								<b class="text-center" style="font-size: 14px" >
								<span v-if="item.soluong ">
									<span class="text-danger"  v-if="(item.roomQuantity - item.soluong) === 0"> {{$t('NO_ROOM_LEFT')}}</span>
									<span  class="text-danger"  v-if="(item.roomQuantity - item.soluong) === 1"> {{$t('ONLY')}} 1 {{$t('ROOM_LEFT')}}</span>
									<!-- <span class="text-success"  v-if="(item.roomQuantity - item.soluong) <= 3 && (item.roomQuantity - item.soluong)>1"> {{$t('Hurry')}} {{item.roomQuantity - item.soluong}} {{$t('ROOM_LEFT')}}</span> -->
									<span class="text-secondary" v-if="(item.roomQuantity - item.soluong) >1">{{item.roomQuantity - item.soluong}} {{$t('ROOM_LEFT')}}</span>
								</span>
								<span v-else>
									<span  class="text-danger"  v-if="item.roomQuantity=== 0"> {{$t('NO_ROOM_LEFT')}}</span>
									<span  class="text-danger"  v-if="item.roomQuantity=== 1"> {{$t('ONLY')}} 1 {{$t('ROOM_LEFT')}}</span>
									<!-- <span class="text-success"  v-if="item.roomQuantity <= 3 && item.roomQuantity > 1">{{$t('Hurry')}} {{item.roomQuantity}} {{$t('ROOM_LEFT')}}</span> -->
									<span class="text-secondary" v-if="item.roomQuantity > 1">{{item.roomQuantity}} {{$t('ROOM_LEFT')}}</span>
								</span>
							</b>
							</b-col>
						</b-row>
						<b-row class="rates">
							<b-col >
									<b-button  @click="tesst(item.id)"  variant="primary"  aria-controls="collapse4"
																:aria-expanded="item.showCollapse ? 'true' : 'false'" style="border-radius:4px;width:95%" v-if="item.showCollapse===false" >
										<span v-if="item.showCollapse===false">{{item.plans.length}} Options <icon class="mt-1 mr-2" name="sort-down" scale="1" style="color:#fff"></icon></span>
									</b-button>
									<b-button  @click="tesst(item.id)"  variant="outline-primary"  aria-controls="collapse4"
																:aria-expanded="item.showCollapse ? 'true' : 'false'" style="border-radius:4px;width:95%" v-if="item.showCollapse===true" class="bottonOption">
										<span v-if="item.showCollapse===true">{{item.plans.length}} Options <icon class="mt-1 mr-2" name="caret-up" scale="1" style="color:#258fe0"></icon></span>
									</b-button>
							</b-col>
						</b-row>
					</b-col>
					</div>
				</b-row>
					<b-collapse :id="item.id"  class="mt-2" v-model="item.showCollapse">
					<div id="planCard"   v-for="(ii, index) in item.plans" :key="index" style="display:table; margin-bottom:5px">
							<b-col   class="collpromotion" md="3" style="display:table-cell;width:20%">
								<br>
								<b v-for="(a, index) in ii.names" v-if=" a.langCode==$store.getters.currentLanguage.code" :key="index" class="text-dark" >{{a.title}}</b>
								<br>
								<b-col v-for="(a,index) in ii.descriptions" :key="index" v-if="a.langCode===$store.getters.currentLanguage.code" v-html="a.title" class="text-secondary" style="padding-left:0; font-size:12px"></b-col>
							</b-col>
						<b-col style="display:table-cell;width:50%">
							<br>
							<b-row>
								<b-col md="4">
										<p><icon class="mt-1" name="user" scale="1" style="color:#ccc"></icon> &nbsp;{{ii.guestsIncluded}} {{ $t('GUEST') }}</p>
								</b-col>
								<b-col>
									<img class="p-0" src="~icons/Night-gray.png" width="27px" height="27px" /> {{totalNight}} {{ $t('NIGHT') }}
								</b-col>
							</b-row>
							<br>
							<b-row >
								<b-col md="2">
									<b class="textExtra">Extra</b>
								</b-col>
								<b-col v-if="ii.extraAdultRateType===1"><p class="extra">{{$t('Adults_btn_ResultSearch')}}: {{ii.extraAdultRate}}%</p></b-col>
								<b-col v-if="ii.extraAdultRateType!==1"><p class="extra">{{$t('Adults_btn_ResultSearch')}}: {{$store.getters['user/getCurrentcy']}} {{formatPrice(ii.extraAdultRate*hotel.rate)}} </p></b-col>
								<b-col v-if="ii.extraChildRateType===1"><p class="extra">{{$t('Childrens_btn_ResultSearch')}}: {{ii.extraChildRate}}%</p></b-col>
								<b-col v-if="ii.extraChildRateType!==1"><p class="extra">{{$t('Childrens_btn_ResultSearch')}}: {{$store.getters['user/getCurrentcy']}} {{formatPrice(ii.extraChildRateType*hotel.rate)}}</p></b-col>
							</b-row>
							<div  v-if="ii.promotions.length>0" >
								<div  v-for=" (j,index) in ii.promotions" :key="index" v-if="j!==null">
									<p v-for=" (jj,index) in j.names" :key="index" v-if=" jj.langCode==$store.getters.currentLanguage.code">
										<img class="p-0" src="~icons/Promotion-orange.png" width="30px" height="30px" />
											{{jj.title}} ({{$store.getters['user/getCurrentcy']}} {{formatPrice(j.price*hotel.rate)}})
									</p>
								</div>
							</div>
						</b-col>
						<b-col  md="3"  style="display:table-cell;padding-left:0 ;width:20%;">
							<br>
							<b-row class="" >
								<b-col>
									<h5  class="text-dark"><b >{{$store.getters['user/getCurrentcy']}} {{formatPrice(ii.prommotionPrice*hotel.rate)}}</b> </h5>
								</b-col>
							</b-row>
							<b-row>
								<b-col>
									<strike class="text-muted" v-if="ii.price!==ii.prommotionPrice"><b >{{$store.getters['user/getCurrentcy']}} {{formatPrice(ii.price*hotel.rate)}}</b></strike>
								</b-col>
							</b-row>
							<b-row>
								<b-col>
									<p class="text-secondary" style="font-size: 12px" v-if="hotel.taxIncluded===false">{{$t('PRICES_ARE_SUBJECT_TO_VAT_AND_SERVICE_CHARGE')}}</p>
									<p class="text-secondary" style="font-size: 12px" v-if="hotel.taxIncluded===true">{{$t('THE_PRICE_DOES_INCLUDE_VAT_AND_SERVICE_CHARGE')}}</p>
								</b-col>
							</b-row>
							<br>
							<b-row class="rowselect"  style="margin:0px;">
								<b-col md="3" class="diffAdult" style="padding:0"><b-button class="book" variant="link" @click="diffPlant(item,ii)" :disabled="(ii.choose)===0"><icon class="mt-2" name="minus" scale="0.8" ></icon></b-button></b-col>
								<b-col class="textunitAdultsRoom"><b-form-input v-model="ii.choose"   @input="changePlant(item,ii)"  :max="item.roomQuantity" :min="0" size="sm" style="border:none; text-align:center; font-size:15px" type="number" class="font-weight-bold"></b-form-input></b-col>
								<b-col md="3" class="addAdult"  style="padding:0"><b-button class="book" variant="link" @click="addPlant(item,ii)" :disabled="(item.roomQuantity - item.soluong)===0"><icon class="mt-2" name="plus" scale="0.8" ></icon></b-button></b-col>
							</b-row>
							<br>
							<b-row class="addcart"  style="margin:0px;">
							<b-button v-if="checkinroom!=='' " @click="addCart(item,ii,ii.choose,checkinroom,checkoutroom)" class="btn-radius" variant="primary" :disabled="ii.choose==0">
									<icon name="shopping-cart"></icon> {{$t('ADD_ROOM')}}
							</b-button>
							<b-button v-else @click="addCart(item,ii,ii.choose,checkin,checkOutdate)" class=" btn-radius" variant="primary" :disabled="ii.choose==0">
								<icon name="shopping-cart"></icon> {{$t('ADD_ROOM')}}
							</b-button>
							</b-row>
							<br>
						</b-col>
				</div>
				</b-collapse>
				</div>
			</div>
				<div style="padding-top:10px;">
					<md-tabs class="md-transparent">
					<md-tab :md-label="$t('DESCRIPTION')" active>
						<b-row>
							<b-col md="5">
								<b-row >
									<b-col style="height: 250px">
										<!-- <md-card> -->
											<b-carousel id="carousel1"
															controls
															indicators
															background="#fff"
															:interval="4000"
															img-width="1024"
															img-height="480"
															v-model="slide"
															@sliding-start="onSlideStart"
															@sliding-end="onSlideEnd">
												<b-carousel-slide  img-width="1024" img-height="480" v-for="i in this.hotel.imgs" style="max-height:250px; border-radius:8px;" :img-src="i">
												</b-carousel-slide>
										</b-carousel>
										<!-- </md-card> -->
									</b-col>
								</b-row>
							</b-col>
							<b-col  >
								<b-row>
									<b-col><h5 ><b v-for="i in hotel.names" v-if="i.langCode === $store.getters.currentLanguage.code">{{i.title}}</b></h5></b-col>
								</b-row>
								<b-row>
									<b-col>
										<span  v-for="(n,index) in hotel.type.i18ns" :key="index"  v-if="n.langCode==$store.getters.currentLanguage.code">{{n.title}}</span>
									</b-col>
								</b-row>
								<b-row>
									<b-col class="mt-3">
										<template v-for="ii in 5">
											<span v-if="(hotel.rankStar) >= ii"><img class="p-0" src="~icons/star.png" width="27px" height="27px" /><span style="margin-left:10px"></span></span>
										</template>
											<span v-if="hotel.rankStar%1!==0"><img class="p-0" src="~icons/star half.png" width="27px" height="27px" /></span>
									</b-col>
								</b-row>
								<br>
								<b-row style="font-size:12px">
									<b-col v-for="item in hotel.descriptions" v-if="item.langCode===$store.getters.currentLanguage.code">
										<read-more more-str="read more" :text="item.title" link="#" less-str="read less" :max-chars="250"></read-more>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
						<b-row style="font-size:12px">
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('YEAR_OF_BUILD')}}</b></b-col>
									<b-col class="text-left desboder">{{hotel.build}}</b-col>
								</b-row>
							</b-col>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('DISTANCE_TO_AIRPORT')}}</b></b-col>
									<b-col class="text-left desboder">{{hotel.airportDistance}} km</b-col>
								</b-row>
							</b-col>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('ELECTRONIC_VOLTAGE')}}</b></b-col>
									<b-col class="text-left desboder" >{{hotel.electric}} vol</b-col>
								</b-row>
							</b-col>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('NUMBER_OF_ROOMS')}}</b></b-col>
									<b-col class="text-left desboder"> {{hotel.room}}</b-col>
								</b-row>
							</b-col>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('TIME_TO_AIRPORT')}}</b></b-col>
									<b-col class="text-left desboder">{{hotel.airportTime}} {{$t('MINUTES')}}</b-col>
								</b-row>
							</b-col>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('NUMBER_OF_FLOORS')}}</b></b-col>
									<b-col class="text-left desboder" >{{hotel.floor}}</b-col>
								</b-row>
							</b-col>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('DISTANCE_TO_CENTER')}}</b></b-col>
									<b-col class="text-left desboder" >{{hotel.centerDistance}} km</b-col>
								</b-row>
							</b-col>
						</b-row>
						<br>
					</md-tab>
					<md-tab :md-label="$t('AMENITIES')" >
						<div  v-for="(i,index) in hotel.amenityGroups" :key="index" style="padding-bottom:20px;">
							<b-col>
								<b-row style="padding-bottom:10px;"><b v-for="(j,index) in i.names"  v-if="j.langCode==$store.getters.currentLanguage.code" :key="index" v-html="j.title"></b></b-row>
								<b-row >
									<b-col md="3" v-for="(jj,index) in i.amenities" :key="index" class="mt-2">
										<b-row>
											<b-col md="3"><img class="icon" :src="jj.icon"/></b-col>
											<b-col ><span class="title"  v-for="jjj in jj.names"  v-if="jjj.langCode==$store.getters.currentLanguage.code" v-html="jjj.title"></span></b-col>
										</b-row>
										<!-- <img class="m-0 p-0" :src="jj.icon" style="height:20px" />
										<span v-for="jjj in jj.names"  v-if="jjj.langCode==$store.getters.currentLanguage.code" v-html="jjj.title"></span> -->
									</b-col>
								</b-row>
							</b-col>
						</div>
					</md-tab>
					<md-tab :md-label="$t('POLICY')">
						<b-row>
							<b-col><p  v-for="(p,index) in hotel.hotelPolicies" :key="index" v-if="p.langCode==$store.getters.currentLanguage.code" v-html="p.title"></p></b-col>
						</b-row>
					</md-tab>
					<md-tab  :md-label="$t('AREA_INFO')">
						<b-col v-for="(i,index) in hotel.marks" :key="index" md="6" style="float:left">
						<b-row><b  v-for="(jjj,index) in i.names"  v-if="jjj.langCode==$store.getters.currentLanguage.code" v-html="jjj.title" :key="index"></b></b-row>
						<br>
						<b-row v-for="(jj,index) in i.areas" :key="index" style="width:90%;border-bottom:1px solid #ccc;margin-bottom:20px;">
								<b-col class="text-left" v-for="(jjj,index) in jj.names" :key="index"  v-if="jjj.langCode==$store.getters.currentLanguage.code" v-html="jjj.title"></b-col><b-col class="text-right" md="4">{{jj.distance/1000}} km</b-col>
							</b-row>
						</b-col>
					</md-tab>
					<md-tab md-label="Map">
						<div>
							<GmapMap
								:center="modalMap.location"
								:zoom="12"
								map-type-id="terrain"  style="width: 100%; height: 200px;margin:5px auto">
							<GmapMarker
									:key="index"
									v-for="(m, index) in markers"
									:position="m.position"
									:clickable="false"
									:draggable="false"
									@click="center=m.position"/>
							</GmapMap>
						</div>
					</md-tab>
					</md-tabs>
					<div style="clear:both"></div>
				</div>
					<br>
			<div  class="seen" v-if="similarHotel.length>0 ">
					<h5 class="text-left" id="des"><a name='des'></a><b>{{$t('hearder2_h2_DetailSearch')}}</b></h5>
					<br>
		<template>
				<md-card-media>
					<swiper :options="swiperOption" class="swipersl">
						<swiper-slide v-for="h in similarHotel" class="swiperslide border-right" >
							<div class="slimage">
								<img style="margin: auto;" :src="h.image ===null?'https://yt3.ggpht.com/a-/ACSszfE1mISNfXbxdyiGTeyrA4CnS2Nsy9gw0KCC1g=s900-mo-c-c0xffffffff-rj-k-no':`${h.image}`">
							</div>
							<b-row class="slname">
								<b-col class="text-center">
									<h5 v-for="(item, index) in h.names" :key="index" v-if="item.langCode===$store.getters.currentLanguage.code"><b>{{item.title}}</b></h5>
									<p style="font-size: 12px;padding: 5px 10px; margin:0" v-for="adres in h.address" v-if="adres.langCode===$store.getters.currentLanguage.code"> {{strip(adres.title).split(" ", 15).join(" ")}}...</p>
									<div class="text-center">
										<template v-for="ii in 5">
											<span v-if="(h.rankStar) >= ii"><icon  name="star" scale="1" style="color:#fbb616"></icon><span style="margin-left:5px"></span></span>
										</template>
											<span v-if="h.rankStar%1!==0"><icon name="star-half" scale="1" style="color:#fbb616;"></icon></span>
									</div>
								</b-col>
							</b-row>
							<b-row >
								<b-col class="text-center mt-2">
									<b-button class="btn-radius" @click="bookNow(h.id)" variant="primary">{{$t('BookNow_btn_DetailSearch')}}  <icon class="mt-1" name="arrow-right" scale="0.8" style="color:#ffff"></icon></b-button>
								</b-col>
							</b-row>
							<br>
							<b-row>
								<b-col class="text-center">
									<span v-for="m in $store.getters['user/rate']" v-if="m.fromCode===h.currency && m.toCode=== $store.getters['user/getCurrentcy']"> {{$store.getters['user/getCurrentcy']}} {{formatPrice(h.minPrice*m.rate)}}/ {{$t('NIGHT')}}</span>
								</b-col>
							</b-row>
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
				</md-card-media>

		</template>
			</div>
			<br>
			<div  class="seen" v-if="seenHotel.length>0">
					<h5 class="text-left" id="des"><a name='des'></a><b>{{$t('hearder3_h2_DetailSearch')}}</b></h5>
					<br>
		<template>
				<md-card-media>
					<swiper :options="swiperOption" class="swipersl">
						<swiper-slide v-for="(h,index) in seenHotel" :key="index" class="swiperslide">
							<div class="slimage">
								<img style="margin: auto;" :src="h.image ===null?'https://yt3.ggpht.com/a-/ACSszfE1mISNfXbxdyiGTeyrA4CnS2Nsy9gw0KCC1g=s900-mo-c-c0xffffffff-rj-k-no':`${h.image}`">
							</div>
							<b-row class="slname">
								<b-col class="text-center">
								<h5>
									<h5 v-for="(item, index) in h.names" :key="index" v-if="item.langCode===$store.getters.currentLanguage.code"><b>{{item.title}}</b></h5>
									<b-row>
										<b-col class="text-center">
												<p style="font-size: 12px;padding: 5px 10px; margin:0" v-for="(adres,index) in h.address" :key="index" v-if="adres.langCode===$store.getters.currentLanguage.code"> {{strip(adres.title).split(" ", 15).join(" ")}}...</p>
										</b-col>
									</b-row>
									<div class="text-center">
										<template v-for="ii in 5">
											<span v-if="(h.rankStar) >= ii"><icon  name="star" scale="1" style="color:#fbb616"></icon><span style="margin-left:5px"></span></span>
										</template>
											<span v-if="h.rankStar%1!==0"><icon name="star-half" scale="1" style="color:#fbb616;"></icon></span>
									</div>
								</h5>
								</b-col>
							</b-row>
							<b-row >
								<b-col class="text-center">
									<b-button class="btn-radius" @click="bookNow(h.id)" variant="primary">{{$t('BookNow_btn_DetailSearch')}} <icon class="mt-1" name="arrow-right" scale="0.8" style="color:#ffff"></icon></b-button>
								</b-col>
							</b-row>
							<br>
							<b-row >
								<b-col class="text-center">
								<span v-for="(m,index) in $store.getters['user/rate']" :key="index" v-if="m.fromCode===h.currency && m.toCode=== $store.getters['user/getCurrentcy']"> {{$store.getters['user/getCurrentcy']}} {{formatPrice(h.minPrice*m.rate)}}/ {{$t('NIGHT')}}</span>
								</b-col>
							</b-row>
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
						<br>
						<br>
						<br>
					</swiper>
				</md-card-media>
		</template>
			</div>

			<br>
			</b-col>
		</b-row>
		<b-modal hide-footer size="lg" id="modalMap" @hide="resetModal" v-for="i in modalMap.name" v-if="i.langCode===$store.getters.currentLanguage.code" :title="i.title" >
		<GmapMap
		:center="modalMap.location"
		:zoom="modalMap.zoom"
		map-type-id="terrain"
		style="width: 750px; height: 400px;margin:10px auto">
		<GmapMarker
			:key="index"
			v-for="(m, index) in markers"
			:position="m.position"
			:clickable="false"
			:draggable="false"
			@click="center=m.position"
		/>
		</GmapMap>
		</b-modal>
		<!-- modal view detail-->
		<b-modal size="lg"  hide-footer hide-header   id="viewDetail" @hide="resetModal"  >
			<b-button  @click="hideModal" size="md" @click.stop="hideModal('viewDetail')" style="float:right; background-color: white;border:none;color:black;z-index:100;box-shadow:none;">
				<b><img  src="~icons/Exit.png" width="20px" height="20px"/></b>
				</b-button>
			<div>
			<md-tabs class="md-transparent" >
				<md-tab :md-label="$t('INFOMATION')" style="padding:0">
					<div  class="viewdetailmodal">
					<b-row>
						<b-col md="5" class="mt-3">
							<b-carousel id="carousel1"
											controls
											indicators
											background="#fff"
											:interval="4000"
											img-width="1024"
											img-height="480"
											v-model="slide"
											@sliding-start="onSlideStart"
											@sliding-end="onSlideEnd">
								<b-carousel-slide img-width="1024" img-height="480" v-for="i in itemModal.imgs" style="max-height: 195px; border-radius:8px;" :img-src="i"></b-carousel-slide>
								</b-carousel>
						</b-col>
						<b-col class="mt-3">
							<h5 v-for="j in itemModal.names" v-if="j.langCode==$store.getters.currentLanguage.code"><b>{{j.title}}</b></h5>
							<br>
							<p v-for="j in itemModal.descriptions" v-if="j.langCode==$store.getters.currentLanguage.code" >
								<read-more more-str="read more" :text="j.title" link="#" less-str="read less" :max-chars="160"></read-more>
							</p>
							<br>
								<div class="tablerow">
									<b-col style="padding:0">
										<b-row >
											<b-col v-for="j in itemModal.views" v-if="j.langCode==$store.getters.currentLanguage.code">
												<b-row>
													<b-col md="2">
														<icon class="mt-2" name="image" scale="1.1" style="color:#ccc" ></icon>
													</b-col>
													<b-col >
														<div class="mt-2">{{j.title}}</div>
													</b-col>
												</b-row>
											</b-col>
											<b-col>
												<b-row>
													<b-col md="2">
														<icon class="mt-2" name="home" scale="1.1" style="color:#ccc"></icon>
													</b-col>
													<b-col >
														<div class="mt-2">{{itemModal.size}} m²</div>
													</b-col>
												</b-row>
											</b-col>
											<b-col>
												<b-row>
													<b-col md="2">
														<icon class="mt-2" name="user" scale="1" style="color:#ccc"></icon>
													</b-col>
													<b-col >
														<div class="mt-2">{{itemModal.maxAdults}}</div>
													</b-col>
												</b-row>
											</b-col>
										</b-row>
										<br>
										<b-row >
											<b-col md="4">
												<b-row>
													<b-col md="2">
														<icon class="mt-2" name="child" style="color:#ccc"></icon>
													</b-col>
													<b-col >
														<div class="mt-2">{{itemModal.maxGuests - itemModal.maxAdults}} </div>
													</b-col>
												</b-row>
											</b-col>
											<b-col v-for="j in itemModal.beds" v-if="j.langCode==$store.getters.currentLanguage.code">
												<b-row>
													<b-col md="1">
														<icon class="mt-2" name="bed" scale="1.1" style="color:#ccc"></icon>
													</b-col>
													<b-col >
														<div class="mt-2"> {{j.title}} </div>
													</b-col>
												</b-row>
											</b-col>
										</b-row>
									</b-col>
								</div>
						</b-col>
					</b-row>
					<br>
					</div>
				</md-tab>
				<md-tab :md-label="$t('ROOMAMENITIES')" >
						<div class="" >
									<b-row v-for="i in itemModal.amenityGroups " class="ml-2 mt-2">
										<b-row style="width:100%">
											<b-col  ><b v-for=" j in i.names" v-if="j.langCode==$store.getters.currentLanguage.code">{{j.title}}:</b></b-col>
										</b-row>
										<b-row  style="width:100%">
											<b-col  md="3" class="mt-2" v-for="b in i.amenities" style="margin-top: 10px;" >
												<b-row >
													<b-col md="2" style="padding:0"><img class="" width="20px" style="height:20px" :src="b.icon"/></b-col>
													<b-col style="padding-left:0"><span class="title" v-for=" j in b.names" v-if="j.langCode==$store.getters.currentLanguage.code">{{j.title}}</span></b-col>
												</b-row>
												<!-- <img  :src="b.icon" width="20px" style="height:20px" class=""  />
												 <span v-for=" j in b.names" v-if="j.langCode==$store.getters.currentLanguage.code">{{j.title}}</span> -->
											</b-col>
										</b-row>
									</b-row>
								</div>
					</md-tab>
				<md-tab :md-label="$t('Policy_btn_ResultSearch')">
					<div>
						<br>
					<h5><b>{{$t('CHILDREN_POLICY')}}</b></h5>
					<p>{{$t('CHILDREN_FROM')}} 0 - {{hotel.childrenPolicy.baged}} {{$t('AGE_FREE')}} {{hotel.childrenPolicy.baged}} - {{hotel.childrenPolicy.caged}} {{$t('AGE_ARE_SUBJECT')}}.</p>
				</div>
				<br>
				<div v-if="!hotel.paymentPolicies">
					<h5><b>{{$t('PAYMENT_POLICY')}}</b></h5>
					<li v-for="iii in  hotel.paymentPolicies.length " v-if="hotel.paymentPolicies[iii]!==null"> {{$t('IF_YOU_MAKE')}} {{hotel.paymentPolicies[iii-1].paymentDay}} {{$t('DAYS_PRIOR_TO_THE')}} <span v-if="hotel.paymentPolicies[iii-1].depositType===1">{{hotel.paymentPolicies[iii-1].amount}}%</span> <span v-else>{{formatPrice(hotel.paymentPolicies[iii-1].amount*hotel.rate)}} {{$store.getters['user/getCurrentcy']}}</span> {{$t('OF_THE_TOTAL')}} {{itemModal.paymentPolicy[iii-1].cutOfDate}} {{$t('DAYS_PRIOR_TO_THE')}}.</li>
				</div>
				<br>
				<div v-if="!hotel.cancellationPolicies">
					<h5><b>{{$t('CANCELLATION_POLICY')}}</b></h5>
					<div><li v-for="iii in hotel.cancellationPolicies.length" >
						<span  v-if="hotel.cancellationPolicies[iii-1].cancellationType===1 && hotel.cancellationPolicies[iii-1].amount!=0 && hotel.cancellationPolicies[iii-1].amount!=100 ">{{$t('IF_YOU_CANCEL')}} {{hotel.cancellationPolicies[iii-1].cancellationDay}} {{$t('THE_DAYS_BEFORE')}} {{hotel.cancellationPolicies[iii-1].amount}}% {{$t('CANCELLTION_FEE')}}.</span>
						<span  v-if="hotel.cancellationPolicies[iii-1].cancellationType===1 && hotel.cancellationPolicies[iii-1].amount===0  ">{{$t('FREE_CANCALLATION_IF')}} {{hotel.cancellationPolicies[iii-1].cancellationDay}}  {{$t('BEFORE_CHECKIN')}}.</span>
						<span  v-if="hotel.cancellationPolicies[iii-1].cancellationType===1 && hotel.cancellationPolicies[iii-1].amount===100  ">{{$t('IF_CANCELD_PRIOR')}} {{hotel.cancellationPolicies[iii-1].cancellationDay}} {{$t('DAYS_PRIOR_TO')}}</span>
						<span  v-if="hotel.cancellationPolicies[iii-1].cancellationType===0 && hotel.cancellationPolicies[iii-1].amount!=0  ">{{$t('IF_YOU_CANCEL_YOUR')}} {{hotel.cancellationPolicies[iii-1].cancellationDay}} {{$t('THE_DAYS_BEFORE')}} {{hotel.cancellationPolicies[iii-1].amount*hotel.rate}} {{$store.getters['user/getCurrentcy']}}  {{$t('CANCELLTION_FEE')}}.</span>
						<span  v-if="hotel.cancellationPolicies[iii-1].cancellationType===0 && hotel.cancellationPolicies[iii-1].amount===0  ">{{$t('FREE_CANCALLATION_IF')}} {{hotel.cancellationPolicies[iii-1].cancellationDay}} {{$t('BEFORE_CHECKIN')}}.</span>
					</li></div>
				</div>
				</md-tab>
			</md-tabs>
			</div>
			<div class="clear-both"></div>
			<!-- <hr>
				<div class="text-right">
				<b-button variant="danger" @click="hideModal" size="md" @click.stop="hideModal('viewDetail')">
				{{$t('Close')}}
				</b-button>
				</div> -->
			</b-modal>
			<b-modal hide-footer  size="lg" id="select" @hide="resetModal" style="width:50%" >
				<b-row>
					<b-col md="3">
					</b-col>
					<b-col class="text-center">
					<b-row  style="margin:auto" >
						<b v-if="$store.getters.currentLanguage.code!=='vi'">You are transferring another hotel.
						Your entire shopping cart will be deleted !</b>
						<b v-else>Bạn đang chuyển một khách sạn khác.
						Toàn bộ giỏ hàng của bạn sẽ bị xóa !</b>
					</b-row>
					</b-col>
					<b-col md="3">
					</b-col>
				</b-row>
					<br>
				<b-row>
					<b-col  class="text-center">
						<b-button @click="ok(hotelidmodal)" taget="blank" class="hover-orange btn-radius" variant="outline">OK
						</b-button>
					</b-col>
				</b-row>
			</b-modal>
				<md-dialog-alert
						:md-active.sync="errorAddcart"
						:md-content="$t('ERROR_ADDCART')"
						md-confirm-text="OK" />
</div>
</template>

