<style lang="scss">
@import "./ApplyforAccess.scss";
</style>

<script src="./ApplyforAccess.js">
</script>

<template>
	<div id="applyforaccess">
		<back-to-top visibleoffset="200">
			<icon class="ml-2 pt-1" name="arrow-alt-circle-up" scale="2" style="color:rgb(111, 126, 150)"></icon>
		</back-to-top>
		<br>
		<div style="text-align: center;">
			<Spinner name="three-bounce" v-if="loading" color="#e86e53" />
		</div>
		<div class="table-hotels" v-show="loading===false">
			<!-- <b-row v-if=" items!==[]">
				<b-col  class="text-right p-0" >
					<b-form-group>{{$t('Records_form_ResultSearch')}}:
						<b-form-select style="width:50px" :options="pageOptions" v-model="perPage" />
					</b-form-group>
				</b-col>
			</b-row> -->
			<b-row v-if="countItem === 0" class="mt-5">
				<b-col class="text-center p-0" v-if="$store.getters.currentLanguage.code==='vi'">
					<b>Không tìm thấy kết quả tìm kiếm</b>
				</b-col>
				<b-col class="text-center p-0" v-else>
					<b>Results not found</b>
				</b-col>
			</b-row>
			<b-row v-for="(i,index) in items" :key="index" class="content" v-if=" index < perPage*currentPage && index >= perPage*(currentPage-1)">
				<b-col md="6">
					<b-row class="mt-2" style="margin-left:1px;">
						<a class="nameHotel" :href="i.website" @click="browser(i.website)" v-for="(a,b) in i.affliateI18nModels" :key="b" v-if="a.langCode === $store.getters.currentLanguage.code">
						 {{a.hotelName}}
						</a>
					</b-row>
					<b-row class="mt-1" style="margin-left:1px;">
						<p><img src="~icons/Map-gray.png" width="20px" height="20px" />
							<span v-for="ii in i.affliateI18nModels" v-if="ii.langCode === $store.getters.currentLanguage.code">{{ii.city}},</span>
							<span v-for="ii in i.affliateI18nModels" v-if="ii.langCode === $store.getters.currentLanguage.code">{{ii.country}}</span>
						</p>
					</b-row>
				</b-col>
				<b-col md="3" >
					<b-row class="mt-2" v-for="ii in i.typeI18nModels" v-if="ii.langCode === $store.getters.currentLanguage.code">
						{{ii.typeName}}
					</b-row>
					<b-row>
						<template v-for="ii in 5" >
							<span v-if="i.rankStar>=ii" class="mr-2"><img class="p-0" src="~icons/star.png" width="25px" height="25px" /></span>
						</template>
							<span v-if="i.rankStar%1!==0"><img class="p-0" src="~icons/star half.png" width="25px" height="25px" /></span>
					</b-row>
				</b-col>
				<b-col align="right" class="mt-3 colbtn text-right">
					<b-row v-if="i.statusTA=== ''" align="right" class="rowbtn">
						<b-row>
							<b-col align="right" >
								<b-button id="btnStatuss" class="hover-orange" variant="outline-secondary" size="sm" @click.stop="info(i,index, $event.target)">
									<img src="~icons/Connection-blue.png" width="25px" height="25px" />{{$t('Apply_for_access')}}
								</b-button>
							</b-col>
						</b-row>
					</b-row>
					<b-row v-else align="right" class="rowbtn">
						<b-row v-if="i.statusTA === 'PENDING'">
							<b-col align="right" >
								<b-button id="btnStatuss"  variant="outline-secondary" size="sm" disabled> <img src="~icons/Pending-blue.png" width="25px" height="25px" /> {{$t('Pending_col_AffiliateNetwork')}}</b-button>
							</b-col>
						</b-row>
						<b-row v-if="i.statusTA === 'CONFIRM'">
							<b-col align="right">
									<b-button id="btnStatus" :disabled="i.actionHotelBtn === true?false:true" class=" hover-orange" variant="primary" size="sm">
							<img src="~icons/bookingoline.png" /> <span>{{$t('Confirm_col_AffiliateNetwork')}} </span>
						</b-button>
							</b-col>
						</b-row>
						<b-row  v-if="i.statusTA ==='BOOKONLINE'">
						<b-col align="right">
							<b-button :disabled="i.actionHotelBtn === true?false:true" id="btnStatus" class="" variant="primary" size="sm" @click="bookonline(row.item.hotelId,row.item)">
								 <span>{{$t('BookingOnline_col_AffiliateNetwork')}} <img src="~icons/Arrow Right-white.png" width="25px" height="25px"/></span>
							</b-button>
						</b-col>
						</b-row>
					</b-row>
					<b-row v-else class="rowbtn">
						<b-row>
						<b-col align="right">
							<b-button id="btnStatus" class="hover-orange" variant="outline-secondary" size="sm" @click.stop="info(i, index, $event.target)">
								<img src="~icons/ApplyforAccess.png" />{{$t('Apply_for_access')}}
							</b-button>
						</b-col>
						</b-row>
					</b-row>
					<br>
				</b-col>
			</b-row>
   	<b-row class="pb-5">
		<b-col v-if="countItem > 0" class="text-right p-0">
			<b-pagination  :total-rows="items.length" :per-page="perPage" v-model="currentPage" class="perpage" />
		</b-col>
	</b-row>
</div>
    <!-- Info modal -->
    <b-modal hide-footer hide-header id="modalInfo" @hide="resetModal" :title="modalInfo.title" >
      <p class="applyNameHotel">{{$t('Apply_for_access')}} {{$t('To_ResultSearch')}} <span v-for="i in modalInfo.title" v-if="i.langCode === $store.getters.currentLanguage.code">{{ i.hotelName}}</span></p>
	  <br>
	  <p>{{$t('modal_p1_ApplyForAccess')}}</p>
	  <p>{{$t('modal_p2_ApplyForAccess')}}</p>
	   <div class="text-center">
		 <b-button variant="outline-primary" class="btnApply" @click="hideModal" size="md" @click.stop="info(row.item, row.index, $event.target)">
          	{{$t('Close')}}
        </b-button>
		<b-button variant="primary" class="btnApply" size="md" @click.stop="loadtbl(modalInfo.hotelid)" >
       		{{$t('Apply_now')}}
        </b-button>
	   </div>
    </b-modal>

	</div>
</template>

