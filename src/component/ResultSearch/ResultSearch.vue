<style lang="scss" scope>
@import "./ResultSearch.scss";
</style>
<script src="./ResultSearch.js">
</script>
<template>
	<div id="ResultSearch" >
		<template>
				<back-to-top visibleoffset="200"><icon class="ml-2 pt-1" name="arrow-alt-circle-up" scale="2" style="color:rgb(111, 126, 150)"></icon></back-to-top>
		</template>
		<br>
		<div v-if="items.length <=0 && loading === false" style="margin-top:65px">
			<b-col class="text-center p-0" v-if="$store.getters.currentLanguage.code==='vi'">
				<b>Không tìm thấy kết quả</b>
			</b-col>
			<b-col class="text-center p-0" v-else>
				<b>Results not found</b>
			</b-col>
		</div>
		<div style="text-align: center; margin-top:165px" v-if="loading === true">
			<Spinner name="three-bounce" v-if="loading" color="#e86e53"/>
		</div>
		<div class="searchHotel">
			<b-row class="mainSearch" style="margin:0; margin:auto">
				<b-col md="3"  @click="collapse1 = false"
           			aria-controls="collapse1"
           			:aria-expanded="collapse1 ? 'false' : 'false'">
					<img class="p-0" src="~icons/Location-gray.png" width="25px" height="25px" style="position: absolute; z-index: 10;  left: 20px;  top: 9px;" />
					 <multiselect class="test" v-model="selected" :show-labels="false" :options="filterLocationsLang" placeholder="City, Destination" label="title" track-by="title"></multiselect>
				</b-col>
				<b-col>
					<b-row>
						<b-col md="6" @click="collapse1 = false"
							aria-controls="collapse1"
							:aria-expanded="collapse1 ? 'false' : 'false'">
							<HotelDatePicker class="test" :startingDateValue="checkin" :endingDateValue="checkOutdate" :singleDateSelection="true" @checkInChanged="checkin=$event" @checkOutChanged="checkOutdate=$event"  format="DD-MM-YYYY"  :maxNights="30" :i18n="datePickerTranslate"></HotelDatePicker>
						</b-col>
						<b-col md="4">
							<b-btn class="test"  v-b-toggle.collapse1 variant="outlined">
								<b-row>
									<b-col md="2" style="padding:0"><img  src="~icons/Room_Type.png" width="27px" style="height:30px" class=""  /></b-col>
									<b-col class="text-left mt-2" style="padding:0">{{unitAdults.quantities}} {{$t('Adults_btn_ResultSearch')}}, {{unit.quantities}} {{$t('Childrens_btn_ResultSearch')}}</b-col>
									<b-col md="2">
										<span v-if="collapse1===true"><icon class="mt-1 mr-2" name="caret-up" scale="1" style="color:#258fe0"></icon></span>
										<span v-if="collapse1===false"><icon class="mt-1 mr-2" name="sort-down" scale="1" style="color:#258fe0"></icon></span>
									</b-col>
								</b-row>
							</b-btn>
							<b-collapse id="collapse1" class="collslap" accordion="my-accordion" v-model="collapse1">
								<b-card  title="" >
									<div class="bodycarddetail">
										<b-row >
												<b-col md="5" class="text-left">
													<p style="margin:0"><b>{{$t('Adults_btn_ResultSearch')}}</b></p>
													<p style="margin:0"> {{$t('Above_12_years')}}</p>
												</b-col>
												<b-col>
													<b-row class="rowAdult">
														<b-col md="3" class="diffAdult" style="padding:0"><b-button class="btndetail" variant="link" @click="diffAdult()" ><icon class="mt-2" name="minus" scale="0.8" style="color:#0687e2"></icon></b-button></b-col>
														<b-col  class="textunitAdultsRoom"><input v-model="unitAdults.quantities"  v-on:keypress="isNumber(event)" class="formselectchild"></b-col>
														<b-col md="3" class="addAdult" style="padding:0"> <b-button class="btndetail" variant="link" @click="addAdult()" ><icon class="mt-2" name="plus" scale="0.8" style="color:#0687e2"></icon></b-button></b-col>
													</b-row>
												</b-col>
										</b-row>
										<br>
										<b-row>
											<b-col  md="5" class="text-left">
												<p style="margin:0"><b>{{$t('Childrens_btn_ResultSearch')}}</b></p>
												<p style="margin:0">{{$t('Bellow_12_years')}}</p>
											</b-col>
											<b-col>
												<b-row class="rowAdult">
													<b-col md="3" class="diffAdult" style="padding:0"><b-button class="btndetail" variant="link" @click="diffUnits()" ><icon class="mt-2" name="minus" scale="0.8" style="color:#0687e2"></icon></b-button></b-col>
													<b-col  class="textunitAdultsRoom"><input v-model="unit.quantities"  v-on:keypress="isNumber(event)" class="formselectchild" ></b-col>
													<b-col md="3" class="addAdult" style="padding:0"><b-button class="btndetail" variant="link" @click="addUnits()" ><icon class="mt-2" name="plus" scale="0.8" style="color:#0687e2"></icon></b-button></b-col>
												</b-row>
											</b-col>
										</b-row>
									<!-- <b-row >
										<b-col  md="5" v-for="(i,index) in (+unit.quantities)" :key="i.quantities"   style="margin:auto;"  >
											<b-row >
												<b-col class="text-center">
													<p class="mt-3">{{$t('Ages_of_Childrens')}}</p>
												</b-col>
											</b-row>
											<b-row class="rowAdult">
												<b-col  class="textunitAdultsRoom text-center"><b-form-select v-model="counterChilds[index]" :options="optionsold" class="formselectchild" /></b-col>
											</b-row>
										</b-col>
									</b-row> -->
									</div>
								</b-card>
							</b-collapse>
						</b-col>
						<b-col md="2">
							<b-button  @click="modifySearch"  variant="warning" style="color:#fff;width:100%;height:100%"><icon class="ml-2 pt-1" name="search" scale="0.9" style="color:#fff"></icon>{{$t('Search_btn_ResultSearch')}}</b-button>
							<md-dialog-confirm :md-active.sync="errordate" :md-content="$t('ERROR_DATE')" md-confirm-text="OK"  @md-confirm="onConfirm" />
							<md-dialog-confirm :md-active.sync="errorlocation" :md-content="$t('ERROR_LOCATION')"  md-confirm-text="OK" @md-confirm="onConfirm" />
						</b-col>
					</b-row>
				</b-col>
			</b-row>
		</div>
		<br>
		<div >
			<b-row class="pt-5 bodyresult" style="margin:0; margin:auto">
				<b-col md="3" style="padding-top:50px"  v-if="items.length > 0">
					<div style="background-color:#fff;border-radius:6px" class="mt-2">
						<div>
							<div class="headerRe text-secondary" >
							<img class="m-0 p-0 " src="~icons/Filter-gray.png" width="30px" height="30px" />	Filter
							</div>
						</div>
						<div id="searchbarRe" v-show="HideDisplay" >
							<div class="headerRe" >
								<b-row>
									<b-col class="mt-1" md="8">
									{{$t('FILTER_BY_HOTEL_NAME')}}
									</b-col>
									<b-col class="mt-1">
										<b-btn variant="link" style="color:#000;" @click="deleteNameHotel"><span class="text-secondary">{{$t('UN_FILTER')}}</span></b-btn>
									</b-col>
								</b-row>
							</div>
							<div id="formSearchRe" v-on:keyup.enter="filterByHotel()">
								<b-input-group>

									<b-form-input v-on:keyup.enter="filterByHotel()" v-model="inputHotel" placeholder="(Eg Pullman Suits)">
									</b-form-input>
								</b-input-group>
							</div>
						</div>

						<div id="searchbarRe" v-show="HideDisplay" >
							<div class="headerRe" >
								<b-row>
									<b-col class="mt-1" md="8">
									{{$t('FILTER_BY_LOCATION')}}
									</b-col>
									<b-col class="mt-1">
										<b-btn variant="link" style="color:#000;" @click="deleteTickHotelLocation"><span class="text-secondary">{{$t('UN_FILTER')}}</span></b-btn>
									</b-col>
								</b-row>
							</div>
							<div id="formSearchRe">
								<b-form-group label="">
									<b-form-checkbox-group v-for="(item,index) in countHotelLocations" v-model="selectedlocation" :key="index" v-if="locationMore || index < 10" @change="$event=>callApiResultSearch(selectedamenitiroom,selectedameniti,selectedtype,selectedStar,$event,currentMoney)">
										<b-form-checkbox stacked text-field="name" :value="item.id" :key="b" v-if="item.langCode === $store.getters.currentLanguage.code">{{item.title}}
											<span>({{item.count}})</span>
										</b-form-checkbox>
									</b-form-checkbox-group>
								</b-form-group>
								<div class="text-left" v-show="countHotelLocations.length > 10">
									<b-btn  variant="link" v-if="locationMore==false"  @click="locationMore = true"><icon  class="mt-1" name="caret-down" scale="1" style="color:blue" ></icon> {{$t('SHOW_MORE')}} ({{countHotelLocations.length - 10>0 ? countHotelLocations.length - 10 :''}}) </b-btn >
									<b-btn  variant="link" v-else  @click="locationMore=false"><icon name="caret-up" scale="1" style="color:blue"  class="mt-1"></icon> {{$t('Hide')}} </b-btn >
								</div>
							</div>
						</div>

						<div id="searchbarRe" v-show="HideDisplay" >
							<div class="headerRe" >
								<b-row>
									<b-col class="mt-1" md="8">
									{{$t('FILTER_BY_BOOKING_RATE')}} ({{$store.getters['user/getCurrentcy']}})
									</b-col>
									<b-col class="mt-1">
										<b-btn variant="link" style="color:#000;" @click="deletePriceHotel"><span class="text-secondary">{{$t('UN_FILTER')}}</span></b-btn>
									</b-col>
								</b-row>
							</div>
							<div id="formSearchRe">

								<!-- <p>{{$t('ROOM_RATE')}} (1 {{$t('NIGHT')}})</p> -->
								<!-- {{formatPrice(currentMoney[0])}} -  {{formatPrice(currentMoney[1])}} -->
								<b-row class="mt-2">
									<!-- <b-col md="2" class="mt-2 text-center">{{$t('FROMTO')}}</b-col> -->
									<b-col style=" padding-right:0"><b-form-input v-model="currentMoney[0]" :placeholder="$t('FromTo_ResultSearch')" @input="checkmoney" type="number" style="width:100%;text-align:right;border-radius:4px;"></b-form-input></b-col>
									<b-col md="1" class="mt-2 text-center"><icon class="mt-1" name="arrow-right" scale="0.9" style="color:#ccc"></icon></b-col>
									<b-col ><b-form-input v-on:change="callApiResultSearch(selectedamenitiroom,selectedameniti,selectedtype,selectedStar,selectedlocation,currentMoney)" v-model="currentMoney[1]" :placeholder="$t('To_ResultSearch')" @input="checkmoney" type="number" style="width:100%;text-align:right;border-radius:4px"></b-form-input></b-col>
								</b-row>
								<br>
								<!-- <b-row>
									<b-col>
										<b-btn style="width:100%;color:#fff" variant="primary" @click="callApiResultSearch(selectedamenitiroom,selectedameniti,selectedtype,selectedStar,selectedlocation,currentMoney)">{{$t('FILTER_BY_BOOKING_RATE')}}</b-btn>
									</b-col>
								</b-row> -->
									<!-- <v-slider v-model="currentMoney" min="0" max="1000000" label="" thumb-label></v-slider>  @drag-end="currMoney($event)" -->
								<!-- <vue-slider @callback="callApiResultSearch(selectedamenitiroom,selectedameniti,selectedtype,selectedStar,selectedlocation,$event)" ref="slider" v-model="currentMoney" :max="maxPrice" class="mt-5" :stop-propagation="true" :real-time="true" :lazy="true" style="z-index:3;"></vue-slider> -->
							</div>
						</div>
						<div id="searchbarRe" v-show="HideDisplay">

							<div class="headerRe" >
								<b-row>
									<b-col class="mt-1" md="8">
									{{$t('FILTER_BY_STAR_RANKING')}}
									</b-col>
									<b-col class="mt-1">
										<b-btn variant="link" style="color:#000;" @click="deleteTickStar"><span class="text-secondary">{{$t('UN_FILTER')}}</span></b-btn>
									</b-col>
								</b-row>
							</div>
							<div id="formSearchRe">
								<b-form-group label="">
									<b-form-checkbox-group stacked name="star" v-model="selectedStar" @change="$event => callApiResultSearch(selectedameniti,selectedamenitiroom,selectedtype,$event)">
										<b-form-checkbox :value="numberStar.star1"  v-if="countStar1.length>0">
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<span>({{countStar1.length}})</span>
										</b-form-checkbox>
										<b-form-checkbox :value="numberStar.star1half" v-if="countStar1half.length>0">
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star half.png" width="30px" height="30px" />
											<span>({{countStar1half.length}})</span>
										</b-form-checkbox>
										<b-form-checkbox :value="numberStar.star2"  v-if="countStar2.length>0">
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<span>({{countStar2.length}})</span>
										</b-form-checkbox>
										<b-form-checkbox :value="numberStar.star2half" v-if="countStar2half.length>0">
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star half.png" width="30px" height="30px" />
											<span>({{countStar2half.length}})</span>
										</b-form-checkbox>
										<b-form-checkbox :value="numberStar.star3"  v-if="countStar3.length>0">
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<span>({{countStar3.length}})</span>
										</b-form-checkbox>
										<b-form-checkbox :value="numberStar.star3half" v-if="countStar3half.length>0">
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star half.png" width="30px" height="30px" />
											<span>({{countStar3half.length}})</span>
										</b-form-checkbox>
										<b-form-checkbox :value="numberStar.star4" v-if="countStar4.length>0">
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<span>({{countStar4.length}})</span>
										</b-form-checkbox>
										<b-form-checkbox :value="numberStar.star4half" v-if="countStar4half.length>0">
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star half.png" width="30px" height="30px" />
											<span>({{countStar4half.length}})</span>
										</b-form-checkbox>
										<b-form-checkbox :value="numberStar.star5"  v-if="countStar5.length>0">
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<img class="p-0" src="~icons/star.png" width="30px" height="30px" />
											<span>({{countStar5.length}})</span>
										</b-form-checkbox>
										<b-form-checkbox :value="numberStar.star0" v-if="countStar0.length>0">
												<p>&nbsp;&nbsp; Không xếp hạng <span>({{countStar0.length}})</span></p>
										</b-form-checkbox>
											<!-- vvvvvv -->
										<b-form-checkbox :value="numberStar.star0half" v-if="countStar0half.length>0">
											<img class="p-0" src="~icons/star half.png" width="30px" height="30px" />
											<span>({{countStar0half.length}})</span>
										</b-form-checkbox>
									</b-form-checkbox-group>
								</b-form-group>
							</div>
						</div>
						<div id="searchbarRe" v-show="HideDisplay">
							<div class="headerRe" >
								<b-row>
									<b-col class="mt-1" md="8">
									 {{$t('HOTEL_AMENITIES')}}
									</b-col>
									<b-col class="mt-1">
										<b-btn variant="link" style="color:#000;" @click="deleteTickHotelAmeniti"><span class="text-secondary">{{$t('UN_FILTER')}}</span></b-btn>
									</b-col>
								</b-row>
							</div>
							<div id="formSearchRe">
								<b-form-group label="">
									<b-form-checkbox-group v-for="(item,index) in countAmenities" v-model="selectedameniti" :key="index" v-if="hotelAmenityMore || index < 5" @change="callApiResultSearch($event,selectedamenitiroom,selectedtype,selectedStar)">
											<b-form-checkbox stacked text-field="name"  :value="item.id"  v-for="(a,b) in item.i18ns" :key="b" v-if="a.langCode === $store.getters.currentLanguage.code">
												{{a.title}}
												<span>({{item.count}})</span>
											</b-form-checkbox>
										</b-form-checkbox-group>
									</b-form-group>
									<div class="text-left" v-show="countAmenities.length > 5">
										<b-btn  variant="link" v-if="hotelAmenityMore==false"  @click="hotelAmenityMore=true"><icon  class="mt-1" name="caret-down" scale="1" style="color:blue" ></icon> {{$t('SHOW_MORE')}} ({{countAmenities.length - 5>0 ? countAmenities.length - 5 :''}}) </b-btn >
										<b-btn  variant="link" v-else  @click="hotelAmenityMore=false"><icon  name="caret-up" scale="1" style="color:blue"  class="mt-1"></icon> {{$t('Hide')}} </b-btn >
									</div>
							</div>
						</div>
						<div id="searchbarRe" v-show="HideDisplay">
							<div class="headerRe" >
								<b-row>
									<b-col class="mt-1" md="8">
									{{$t('ROOM_AMENITIES')}}
									</b-col>
									<b-col class="mt-1">
									<b-btn variant="link" style="color:#000;" @click="deleteTickRoomAmeniti"><span class="text-secondary">{{$t('UN_FILTER')}}</span></b-btn>
									</b-col>
								</b-row>
							</div>
							<div id="formSearchRe">
								<b-form-group label="">
									<b-form-checkbox-group v-for="(item,index) in countRoomAmenities" v-model="selectedamenitiroom" :key="index" v-if="roomAmenityMore || index<5" @change="callApiResultSearch(selectedameniti,$event,selectedtype,selectedStar)">
										<b-form-checkbox stacked text-field="name"  :value="item.id"  v-for="(a,b) in item.i18ns" :key="b" v-if="a.langCode === $store.getters.currentLanguage.code">
											{{a.title}}
											<span>({{item.count}})</span>
										</b-form-checkbox>
									</b-form-checkbox-group>
								</b-form-group>
								<div class="text-left" v-show="countRoomAmenities.length > 5">
									<b-btn  variant="link" v-if="roomAmenityMore==false" @click="roomAmenityMore=true"><icon  class="mt-1" name="caret-down" scale="1" style="color:blue" ></icon> {{$t('SHOW_MORE')}} ({{countRoomAmenities.length - 5 > 0 ? (+countRoomAmenities.length-+5 ):''}})</b-btn>
									<b-btn  variant="link" v-else  @click="roomAmenityMore=false"><icon  name="caret-up" scale="1" style="color:blue"  class="mt-1"></icon> {{$t('Hide')}}</b-btn>
								</div>
							</div>
						</div>
						<div id="searchbarRe" v-show="HideDisplay">
							<div class="headerRe" >
								<b-row>
									<b-col class="mt-1" md="8">
									{{$t('HOTEL_TYPE')}}
									</b-col>
									<b-col class="mt-1">
										<b-btn variant="link"  @click="deleteTickHotelType"><span class="text-secondary">{{$t('UN_FILTER')}}</span></b-btn>
									</b-col>
								</b-row>
							</div>
							<div id="formSearchRe">
								<b-form-group label="">
									<b-form-checkbox-group v-for="(item,index) in countTypeHotel" :key="index" v-model="selectedtype" v-if="typeMore || index<5" @change="callApiResultSearch(selectedamenitiroom,selectedameniti,$event,selectedStar)">
										<b-form-checkbox stacked text-field="name"  :value="item.id"  v-for="(a,b) in item.i18ns" :key="b" v-if="a.langCode === $store.getters.currentLanguage.code">
											{{a.title}}
											<span>({{item.count}})</span>
										</b-form-checkbox>
									</b-form-checkbox-group>
								</b-form-group>
								<div class="text-left" v-show="countTypeHotel.length > 5">
									<a v-if="typeMore==false" @click="typeMore=true">{{$t('SHOW_MORE')}} ({{countTypeHotel.length - 5>0 ? countTypeHotel.length - 5 :''}}) </a>
									<a v-else  @click="typeMore=false">{{$t('Hide')}}</a>
								</div>
							</div>
						</div>
						<br>
					</div>
				</b-col>
				<b-col  class="pt-1" v-if="items.length > 0">
					<b-row v-show="HideDisplay" class="">
						<b-col class="pt-2">
							<b>Found {{this.items.length}} results</b>
						</b-col>
						<b-col class="text-right mr-3">
							<b-form-group horizontal
										:label-cols="4"
										label-size="md"
										:label="$t('SORT_RESULTS_BY')"
										label-for="sort"
										label-text-align="right" >
								<b-form-select style="width:200px;border:none" class="input-radius" v-validate="'required'" id="sort"
												:type="text"
												:options="sortBy"
												name="sort"
												value-field="key"
												text-field="value"
												size="md"
												v-model.trim="sort"  @change="$event => sortedArray($event)">
								</b-form-select>
							</b-form-group>
						</b-col>
						<!-- <b-col class="text-right">
							<b-form-group>
							<b>{{$t('Records_form_ResultSearch')}}:</b> <b-form-select  style="width:50px;border:0px;height:35px;border-radius: 4px;" :options="pageOptions" v-model="perPage" />
							</b-form-group>
						</b-col> -->
						<b-col style="color:black;" md="1">
							<b-nav-item-dropdown  :text="$store.getters['user/getCurrentcy']" class="text-center" right style="list-style-type:none;width:70px;color:black;background-color: #fff;border-radius: 4px;float:right" >
								<b-dropdown-item class="text-dark" v-bind:active="isCurrentMoney(i.code)" v-for="(i,index) in this.$store.getters['user/rateAll']" :key="index"  href="#" @click="changeMoney(i.code)" >{{i.code}}
									<span class="text-danger" v-for="(a,b) in i.currencyI18nModels" :key="b"  v-if="a.langCode===$store.getters.currentLanguage.code">{{a.title}}</span>
									({{i.symbol}})
								</b-dropdown-item>
							</b-nav-item-dropdown>
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-button class="btnFilter mb-1" v-if="clearAllFilter===1" @click="clearAll"><b>Clear All Filter</b> <img class="ml-3 p-0 " src="~icons/Exit-blue.png" width="30px" height="30px" /></b-button>
							<b-button class="btnFilter  mb-1" v-if="clearStarFilter===1" @click="deleteTickStar">Star Ranking <img class="ml-3 p-0 " src="~icons/Exit-blue.png" width="30px" height="30px" /></b-button>
							<b-button class="btnFilter  mb-1" v-if="clearHotelAmenitiFilter===1"  @click="deleteTickHotelAmeniti">Hotel Amenities <img class="ml-3 p-0 " src="~icons/Exit-blue.png" width="30px" height="30px" /></b-button>
							<b-button class="btnFilter  mb-1" v-if="clearRoomAmenitiFilter===1" @click="deleteTickRoomAmeniti">Room Amenities<img class="ml-3 p-0 " src="~icons/Exit-blue.png" width="30px" height="30px" /></b-button>
							<b-button class="btnFilter  mb-1" v-if="clearHotelTypeFilter===1" @click="deleteTickHotelType">Hotel Type <img class="ml-3 p-0 " src="~icons/Exit-blue.png" width="30px" height="30px" /></b-button>
						</b-col>
					</b-row>
					<b-row  v-for="(i,index) in items" :key="index" v-if=" index < perPage*currentPage && index >= perPage*(currentPage-1)" >
						<b-col class="table-hotel">
							<b-row>
								<b-col md="3" style="padding:0px">
									<figure @click="showModalinfo(i)" style="margin:0px;">
										<img :src="i.image === null ?'https://yt3.ggpht.com/a-/ACSszfE1mISNfXbxdyiGTeyrA4CnS2Nsy9gw0KCC1g=s900-mo-c-c0xffffffff-rj-k-no': i.image" alt="img01" style="border-radius:6px 0px 0px 6px;height:130px;width:255px;" />
									</figure>
								</b-col>
								<b-col style="padding-left:0px" md="7">
									<p style="margin:0" class="" v-for="(a,b) in i.names" :key="b" v-if="a.langCode === $store.getters.currentLanguage.code">
										<b-button @click="showModalinfo(i)" taget="blank" variant="link" style="color:black">
											<h4><b>{{a.title}}</b></h4>
										</b-button>
									</p>
									<span class="secondary " v-for="(a,b) in i.typeAmenities.i18ns" :key="b" v-if="a.langCode === $store.getters.currentLanguage.code">{{a.title}}</span>
									<div class="ml-3 mt-2">
										<template v-for="ii in 5">
											<span v-if="(i.rankStar) >= ii"><img class="p-0" src="~icons/star.png" width="30px" height="30px" /></span>

										</template>
											<span v-if="i.rankStar%1!==0"><img class="p-0" src="~icons/star half.png" width="30px" height="30px" /></span>
									</div>
									<div class="ml-3 mt-2">
										<img src="~icons/Map-gray.png" width="20px" height="20px"/>
										<span style="color:black; font-size: 12px;" v-for="(a,b) in i.address" :key="b" v-if="a.langCode === $store.getters.currentLanguage.code">{{a.title}}</span>
									</div>
									<!-- <div class=" ml-4">
										<span style="font-size:12px" v-for="(a,b) in i.descriptions"  :key="b" v-if="a.langCode === $store.getters.currentLanguage.code" >{{strip(a.title).split(" ", 50).join(" ")}}...</span>
									</div> -->
								</b-col>
								<b-col md="2" style="padding-left:0;">
									<div >
										<p class="my-2" >{{$t('A_NIGHT_ONLY_FROM')}}</p>
										<h5 class="my-2" v-for="m in $store.getters['user/rate']" v-if="m.fromCode===i.currency && m.toCode=== $store.getters['user/getCurrentcy']"><b>{{$store.getters['user/getCurrentcy']}} {{formatPrice(i.minPrice*m.rate)}}</b> </h5>

										<b-button @click="select(i)" taget="blank" class=" btn-radius" variant="primary" style="color:#fff;width:100%">
											{{$t('BOOK_NOW')}} <icon class="mt-1" name="arrow-right" scale="0.8" style="color:#ffff"></icon>
										</b-button>
										<p v-if="i.countRoom > 0" style="color:black;font-size:15px" class="mt-2">
											<span style="color:red;"  v-if="i.countRoom === 1"> {{$t('ONLY')}} 1 {{$t('ROOM_LEFT')}}</span>
											<span style="color:green;"  v-if="i.countRoom <= 3 && i.countRoom >1"> {{$t('Hurry')}} {{i.countRoom}} {{$t('ROOM_LEFT')}}</span>
											<span v-if="i.countRoom >3">{{i.countRoom}} {{$t('ROOM_LEFT')}}</span>
										</p>
										<p v-else style="color:red;font-size:18px" class="mt-3">Out of room!</p>
									</div>
								</b-col>
									</b-row>
								</b-col>
					</b-row>
					<b-row v-show="HideDisplay">
						<b-col md="3">
						</b-col>
						<b-col >
							<b-pagination :total-rows="items.length" :per-page="perPage" v-model="currentPage" class="perpage"  />
						</b-col>
					</b-row>
				</b-col>
			</b-row>
		</div>
		<br>
		<b-modal hide-footer size="lg" id="modalMap" @hide="resetModal" v-for="a in modalMap.name" v-if="a.langCode === $store.getters.currentLanguage.code" :title="a.title" >
			<GmapMap
				:center="modalMap.center"
				:zoom="modalMap.zoom"
				map-type-id="terrain"
				style="width: 750px; height: 400px;margin:10px auto">
				<GmapMarker
					:key="index"
					v-for="(m, index) in markers"
					:position="m.position"
					:clickable="false"
					:draggable="false"
					@click="center=m.position"/>
			</GmapMap>
		</b-modal>
		<!-- modal select-->
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
<!-- modal description amenities areainfo policy-->
		<b-modal hide-footer centered hide-header size="lg" id="modalinfo" @hide="resetModal" >
			<b-button  @click="hideModal" size="md" @click.stop="hideModalinfo('modalinfo')" style="position: absolute;right: 0; background-color: white;border:none;color:black;z-index:100">
				<img  src="~icons/Exit.png" width="20px" style="height:20px;" class=""  />
			</b-button>
			<div>
			<md-tabs class="md-transparent">
					<md-tab :md-label="$t('DESCRIPTION')"  >
						<b-row>
							<b-col>
								<b-row >
									<b-col style="height: 250px">
											<b-carousel id="carousel1"
															controls
															indicators
															:interval="4000"
															img-width="1024"
															img-height="480"
															v-model="slide"
															@sliding-start="onSlideStart"
															@sliding-end="onSlideEnd">
												<b-carousel-slide  img-width="1024"
															img-height="480" v-for="i in this.modalinfo.imgs" style="max-height:230px;border-radius:8px;"
																	:img-src="i">
												</b-carousel-slide>
										</b-carousel>
									</b-col>
								</b-row>
							</b-col>
							<b-col  >
								<b-row>
									<b-col><h4 ><b v-for="i in modalinfo.names" v-if="i.langCode === $store.getters.currentLanguage.code">{{i.title}}</b></h4></b-col>
								</b-row>
								<b-row v-for="(a,b) in modalinfo.type" :key="b" v-if="a.langCode === $store.getters.currentLanguage.code">
									<b-col ><h5 >{{a.title}}</h5></b-col>
								</b-row>
								<b-row>
									<b-col class="mt-3">
										<template v-for="ii in 5">
											<span v-if="(modalinfo.rankStar) >= ii"><img class="p-0" src="~icons/star.png" width="30px" height="30px" /></span>
										</template>
											<span v-if="modalinfo.rankStar%1!==0"><img class="p-0" src="~icons/star half.png" width="30px" height="30px" /></span>
									</b-col>
								</b-row>
								<b-row>
									<b-col v-for="item in modalinfo.descriptions" v-if="item.langCode===$store.getters.currentLanguage.code" >
										<read-more more-str="read more" :text="item.title" link="#" less-str="read less" :max-chars="250"></read-more>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
						<b-row>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('YEAR_OF_BUILD')}}</b></b-col>
									<b-col class="text-left desboder">{{modalinfo.build}}</b-col>
								</b-row>
							</b-col>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('DISTANCE_TO_AIRPORT')}}</b></b-col>
									<b-col class="text-left desboder">{{modalinfo.airportDistance}} km</b-col>
								</b-row>
							</b-col>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('ELECTRONIC_VOLTAGE')}}</b></b-col>
									<b-col class="text-left desboder" >{{modalinfo.electric}} vol</b-col>
								</b-row>
							</b-col>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('NUMBER_OF_ROOMS')}}</b></b-col>
									<b-col class="text-left desboder"> {{modalinfo.room}}</b-col>
								</b-row>
							</b-col>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('TIME_TO_AIRPORT')}}</b></b-col>
									<b-col class="text-left desboder">{{modalinfo.airportTime}} {{$t('MINUTES')}}</b-col>
								</b-row>
							</b-col>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('NUMBER_OF_FLOORS')}}</b></b-col>
									<b-col class="text-left desboder" >{{modalinfo.floor}}</b-col>
								</b-row>
							</b-col>
							<b-col md="4">
								<b-row>
									<b-col md="8" class="desboder" style="padding-right:0"><b>{{$t('DISTANCE_TO_CENTER')}}</b></b-col>
									<b-col class="text-left desboder" >{{modalinfo.centerDistance}} km</b-col>
								</b-row>
							</b-col>
						</b-row>
						<br>
					</md-tab>
					<md-tab :md-label="$t('AMENITIES')" >
						<b-row v-for="item in modalinfo.amenities">
							<b-col>
							<br>
							<b-row>
								<b-col v-for="a in item.names" v-if="a.langCode === $store.getters.currentLanguage.code"><b>{{a.title}}</b></b-col>
							</b-row>
							<b-row>
								<b-col md="3" class="pb-2"  v-for="b in item.amenities">
									<b-row v-for="c in b.names" v-if="c.langCode === $store.getters.currentLanguage.code" >
										<b-col md="3"><img class="icon" :src="b.icon"/></b-col>
										<b-col><span class="title">{{c.title}}</span></b-col>
									</b-row>
								</b-col>
							</b-row>
							</b-col>
						</b-row>
						<br>
					</md-tab>
					<md-tab :md-label="$t('POLICY')" style="margin-left: 10px;" >
						<h5><b>{{$t('CHECKIN_POLICY')}}</b></h5>
						<b-row>
							<b-col md="4">
								<img class="m-0 p-0 " src="~icons/Login-gray.png" width="30px" height="30px" /> {{$t('CHECKIN_TIME')}}:  {{modalinfo.inHour}}
							</b-col>
							<b-col>
								<img class="m-0 p-0 " src="~icons/Logout-gray.png" width="30px" height="30px" /> {{$t('CHECKOUT_TIME')}}:  {{modalinfo.outHour}}
							</b-col>

						</b-row>
							<br><h5><b> {{$t('CHILDREN_POLICY')}}</b></h5>
						<p><img class="m-0 p-0 " src="~icons/Children.png" width="30px" height="30px" /> {{$t('CHILDREN_BETWEEN')}} 0 - {{baged}} {{$t('YEARS_OLD_FREE_WITHOUT_EXTRA_BED')}}.</p>
						<p><img class="m-0 p-0 " src="~icons/Children.png" width="30px" height="30px" /> {{$t('CHILDREN_BETWEEN')}} {{baged + 1}} - {{caged}} {{$t('YEARS_OLD_CHARGED_BY_50_EXTRA_BED_OF_ADULT')}}.</p>
						<br>
						<h5 v-if="modalinfo.paymentPolicies!==[]"><b>{{$t('PAYMENT_POLICY')}}</b></h5>
						<div v-for="i in modalinfo.paymentPolicies" >
							<div v-if="i!==null">
								<b-row v-if="i.depositType === 1">
									<b-col>{{$t('PREPAYMENT')}} {{i.amount}}% {{$t('WITHIN')}} {{i.paymentDay}} {{$t('DAYS')}}</b-col>
								</b-row>
								<b-row v-if="i.depositType === 0">
									<b-col v-for="m in $store.getters['user/rate']" v-if="m.fromCode===modalinfo.currency && m.toCode=== $store.getters['user/getCurrentcy']"> {{$t('PREPAYMENT')}} {{formatPrice(i.amount*m.rate)}} {{$store.getters['user/getCurrentcy']}} {{$t('WITHIN')}} {{i.paymentDay}} {{$t('DAYS')}}</b-col>
								</b-row>
							</div>
						</div>
						<br>
						<h5 v-if="modalinfo.cancellationPolicies!==[]"><b>{{$t('CANCELLATION_POLICY')}}</b></h5>
						<div v-for="i in modalinfo.cancellationPolicies" v-if="i!==null">
							<div v-if="i.cancellationType === 1">
								<b-col>{{$t('IF_CANCELED_LATER')}} {{i.cancellationDay}}{{$t('DAY_WILL_BE_PAID')}} {{i.amount}} % </b-col>
							</div>
							<div v-if="i.cancellationType === 0">
								<b-col  v-for="m in $store.getters['user/rate']" v-if="m.fromCode===modalinfo.currency && m.toCode=== $store.getters['user/getCurrentcy']">{{$t('IF_CANCELED_LATER')}} {{i.cancellationDay}} {{$t('DAY_WILL_BE_PAID')}} {{formatPrice(i.amount*m.rate)}} {{$store.getters['user/getCurrentcy']}}</b-col>
							</div>
						</div>
						<p></p>
						<p></p>
					</md-tab>
					<md-tab :md-label="$t('AREA_INFO')" >
						<b-row class="area" style="margin:0">
							<b-col v-for="i in modalinfo.marks" md="6" class="text-center ">
								<b-row>
									<div v-for="a in i.names" v-if="a.langCode === $store.getters.currentLanguage.code"><b >{{a.title}}</b></div>
								</b-row>
								<br>
								<b-row class="maxhight" v-for="b in i.areas">
									<b-col v-for="c in b.names" v-if="c.langCode === $store.getters.currentLanguage.code" class="text-left">
										<span class="title">{{c.title}}</span>
									</b-col>
									<b-col class="text-right">
										<span >{{b.distance/1000}} km</span>
									</b-col>
								</b-row>
								<br>
							</b-col>
						</b-row>
					</md-tab>
					<md-tab md-label="Map" >
						<!-- <b-row class="area">
							<b-col class="text-center "> -->
								<GmapMap
									:center="modalMap.center"
									:zoom="modalMap.zoom"
									map-type-id="terrain"
									style="height: 400px">
									<GmapMarker
										:key="index"
										v-for="(m, index) in markers"
										:position="m.position"
										:clickable="false"
										:draggable="false"
										@click="center=m.position"/>
								</GmapMap>
							<!-- </b-col>
						</b-row> -->
					</md-tab>
				</md-tabs>
					<div style="clear:both"></div>
				</div>
			</b-modal>
			<br>
	<br>
	<br>
	<br>
	</div>





