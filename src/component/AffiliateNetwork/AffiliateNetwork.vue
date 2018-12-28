<style lang="scss">
@import "./AffiliateNetwork.scss";
</style>

<script src="./AffiliateNetwork.js">
</script>

<template>
	<div id="AffiliateNetwork">
		<back-to-top visibleoffset="200">
			<icon class="ml-2 pt-1" name="arrow-alt-circle-up" scale="2" style="color:rgb(111, 126, 150)"></icon>
		</back-to-top>
		<!-- {{filter}} -->
		<br>
		<!-- <div class="paragram">
			<h4><b>B2B {{$t('access')}}</b></h4>
			<hr>
		</div> -->
		<div style="text-align: center;">
			<Spinner name="three-bounce" v-if="loading" color="#e86e53" />
		</div>
		<div class="table-hotels" v-show="loading===false">
			<!-- <b-row v-if="countItem!==0">
				<b-col class="text-right p-0">
					<b-form-group>{{$t('Records_form_ResultSearch')}}:
						<b-form-select style="width:50px" :options="pageOptions" v-model="perPage" />
					</b-form-group>
				</b-col>
			</b-row> -->
			<b-row v-if="countItem===0" class="mt-5">
				<b-col class="text-center p-0" v-if="$store.getters.currentLanguage.code==='vi'">
					<b>Không tìm thấy kết quả tìm kiếm</b>
				</b-col>
				<b-col class="text-center p-0" v-else>
					<b>Results not found</b>
				</b-col>
			</b-row>
			<b-row v-for="(i,index) in items" :key="index" class="pb-1" v-if=" index < perPage*currentPage && index >= perPage*(currentPage-1)" >
				<b-col class="colcontent" style="margin:0">
					<b-row class="rowcontent">
						<b-col md="4" class="mt-2">
							<b-row>
								<!-- <b-button variant="link" @click="browser(i.website)"> -->
									<a class="nameHotel" :href="i.website" v-for="(a,index) in i.affliateI18nModels" :key="index" v-if="a.langCode === $store.getters.currentLanguage.code">
										 {{a.hotelName}}
									</a>
								<!-- </b-button> -->
							</b-row>
							<b-row>
								<p class="ml-3"><img src="~icons/Map-gray.png" width="20px" height="20px" />
									<span v-for="ii in i.affliateI18nModels" v-if="ii.langCode === $store.getters.currentLanguage.code">{{ii.city}},</span>
									<span v-for="ii in i.affliateI18nModels" v-if="ii.langCode === $store.getters.currentLanguage.code">{{ii.country}}</span>
								</p>
							</b-row>
						</b-col>
						<b-col md="2" >
							<p class="mt-3 level" v-if="i.level!==0">Level {{i.level}}</p>
						</b-col>
						<b-col md="3">
							<b-row class="mt-2" v-for="ii in i.typeI18nModels" v-if="ii.langCode === $store.getters.currentLanguage.code">
								{{ii.typeName}}
							</b-row>
							<b-row>
								<template v-for="ii in counter">
									<span v-if="(i.rankStar)>=ii" class="mr-2"><img class="p-0" src="~icons/star.png" width="25px" height="25px" /></span>
								</template>
									<span v-if="i.rankStar%1!==0"><img class="p-0" src="~icons/star half.png" width="25px" height="25px" /></span>
							</b-row>
						</b-col>
						<b-col  class="mt-2 text-right" >
							<b-button :disabled="i.statusTABtn === true ? false:true" id="btnStatus" class="mx-2 text-left" variant="primary" size="sm" @click="Bookonline(i)" v-if="i.statusTravel ==='BOOKONLINE'">
								 <span>{{$t('BookingOnline_col_AffiliateNetwork')}} <img src="~icons/Arrow Right-white.png" width="25px" height="25px"/></span>
							</b-button>
							<b-button id="btnStatus" :disabled="true" v-if="i.statusTravel==='PENDING'" class="mx-2 text-left" variant="outline-primary" size="sm">
								<img src="~icons/Pending-blue.png" width="25px" height="25px" /> <span>{{$t('Pending_col_AffiliateNetwork')}}</span>
							</b-button>
							<b-button id="btnStatus" v-if="i.statusTravel==='CONFIRM'" :disabled="i.statusTABtn===false" class="mx-2 text-left" @click.stop="confirmedModal(i,$event.target)" variant="outline-primary" size="sm">
								<img src="~icons/Check Mark-blue.png" width="25px" /> {{$t('Confirm_col_AffiliateNetwork')}}
							</b-button>
							<span v-if="i.showCollapse===true" @click="tesst(i.hotelid)"    aria-controls="collapse4"
																		:aria-expanded="i.showCollapse ? 'true' : 'false'"><img src="~icons/drop down list expanded-blue.png" width="15px" /></span>
								<span v-if="i.showCollapse===false" @click="tesst(i.hotelid)"    aria-controls="collapse4"
																		:aria-expanded="i.showCollapse ? 'true' : 'false'"><img src="~icons/drop down list-blue.png" width="15px" /></span>
						</b-col>
					</b-row>
					<b-row class="rowHistory">
						<!-- <b-col class="colHistory"> -->
						<b-collapse  :id="i.hotelid" class="mt-2" v-model="i.showCollapse" style="border-top:1px solid #ccc">
							<b-row class="mb-3">
								<b-col  class="text-right p-0 mt-3" style="margin-right:30px">
									<b-button :disabled="i.actionTABtn!==true" id="btnAction" v-if="i.actionTA ==='DEACTIVE'" class="mx-2 " variant="danger" size="sm" @click="deactiveModal(i,$event.target)">
										 {{i.actionTA === 'ACTIVE'? $t('Active_col_AffiliateNetwork'): $t('Deactive_col_AffiliateNetwork')}}
									</b-button>
									<b-button  :disabled="i.actionTABtn!==true" id="btnAction" v-if="i.actionTA ==='ACTIVE'" class="mx-2 " variant="danger" size="sm" @click="deactiveModal(i,$event.target)">
										{{i.actionTA === 'ACTIVE'? $t('Active_col_AffiliateNetwork'): $t('Deactive_col_AffiliateNetwork')}}
									</b-button>
									<b-button  :disabled="i.actionTABtn!==true" id="btnAction" v-if="i.actionTA ==='REJECT'" class="mx-2 " variant="danger" size="sm" @click="rejectModal(i,$event.target)">
										 {{$t('Reject_Affilite_Network')}}
									</b-button>
									<b-button  :disabled="i.actionTABtn!==true" id="btnAction" v-if="i.actionTA ==='CANCEL'" class="mx-2 " variant="danger" size="sm" @click="cancelModal(i,$event.target)">
										{{$t('Cancel_Affilite_Network')}}
									</b-button>
								</b-col>

							</b-row>
							<b-row >
								<b-col><b>{{$t('FULL_NAME_PROFILE')}}</b></b-col>
								<b-col><b>{{$t('Username')}}</b></b-col>
								<b-col><b>{{$t('UPDATED_DATE_PROFILE')}}</b></b-col>
								<b-col md="2"><b>{{$t('ACTION_PROFILE')}}</b></b-col>
								<b-col md="3" style="padding-left:27px"><b>{{$t('Remarks')}}</b></b-col>
							</b-row>
							<br>
							<b-row v-for="ii in i.yourlogResponse" v-if="ii.actionBy==='BY_TRAVEL_AGENT'" class="logResponse" >
								<b-col>{{ii.fullname}}</b-col>
								<b-col>{{ii.username}}</b-col>
								<b-col>{{ii.actionDate}}</b-col>
								<b-col md="2">{{ii.action}}</b-col>
								<b-col md="3" style="padding-left:27px">{{ii.remark}}</b-col>
							</b-row>
							<b-row v-if=" i.yourlogResponse.lenght===0">
								<b-col class="text-center"><i>{{$t('EMPTY_AFFiLATE_NETWORK')}}</i></b-col>
							</b-row>
						</b-collapse>
						<!-- </b-col> -->
					</b-row>
				</b-col>
			</b-row>

			<b-row class="pb-5" v-if="countItem!==0">
				<b-col class="text-right p-0">
					<b-pagination  :total-rows="countItem" :per-page="perPage" v-model="currentPage" class="perpage" />
				</b-col>
			</b-row>
		</div>
    <!-- deactive modal -->
		<b-modal hide-footer hide-header id="deactive" @hide="resetModal" size="md">
		<h4>{{$t('Deactive_col_AffiliateNetwork')}} </h4>
		<br>
		<div class="mx-3">
			<b-form-group :label= "$t('Please_specify_the_reason_you_opt_out')" v-if="$store.getters.currentLanguage.code==='vi'">
				<b-form-checkbox-group plain stacked v-model="selectedDeactive" :options="optionsDeactivevi" />
				</b-form-group>
				<b-form-group :label= "$t('Please_specify_the_reason_you_opt_out')" v-if="$store.getters.currentLanguage.code==='en'">
				<b-form-checkbox-group plain stacked v-model="selectedDeactive" :options="optionsDeactiveen" />
			</b-form-group>
			<b>{{$t('Others_Reason')}} / {{$t('Remarks')}} </b>
			<b-form-textarea id="textarea1"
							v-model="text"
							:placeholder= "$t('placeholder')"
							:rows="3"
							:max-rows="6">
			</b-form-textarea>
		<!-- <b-alert show> -->
		<p> {{$t('balert_p1_AffiliateNetwork')}} {{deactive.name}} {{$t('access')}}?</p>
		<p> {{$t('balert_p2_AffiliateNetwork')}} </p>
		<p> {{$t('balert_p3_AffiliateNetwork')}} </p>
		<!-- </b-alert> -->
		</div>
		<br>
		<div class="text-right">

		<b-button variant="danger"   size="md" @click.stop="deactiveConfirm(deactive.hotelid)" :disabled="text ||selectedDeactive!='' ?false:true" >
		{{$t("Confirm_col_AffiliateNetwork")}} {{$t('Deactive_col_AffiliateNetwork')}}
			</b-button>
			<!-- <b-button variant="outline-secondary" @click="hideModal" size="md" @click.stop="hideModal('deactive')">
			{{$t('Close')}}
			</b-button> -->
		</div>
		</b-modal>
	<!-- active modal -->
		<b-modal hide-footer hide-header id="active" @hide="resetModal" size="lg"  >
		<h4>{{$t('Active_col_AffiliateNetwork')}} {{$t('Solution_li5_FooterLoginRegister')}} </h4>
		<hr>
		<div class="mx-3">
			<b-form-textarea id="textarea1"
							v-model="text1"
							:placeholder= "$t('placeholder')"
							:rows="3"
							:max-rows="6">
			</b-form-textarea>
		</div>
		<br>
		<div class="text-center">
				<b-button class="btn-yellow" size="md" :disabled="text1===''" @click.stop="activeConfirm(lstActive.hotelid, text1, lstActive.status)" variant="primary">
				{{$t("Confirm_col_AffiliateNetwork")}} {{$t('Active_col_AffiliateNetwork')}}
				</b-button>
				<b-button variant="outline-primary" @click="hideModal" size="md" @click.stop="hideModal('active')">
				{{$t('Close')}}
				</b-button>
		</div>
		</b-modal>
     <!-- confirmed modal -->
		<b-modal hide-footer hide-header id="confirmed" @hide="resetModal"   >
			<h4>{{$t('Confirmed_affiliation_with')}} {{confirmed.name}}</h4>
			<br>
			<div class="m-3">
				<p>{{$t('modal_div_p1_AffiliateNetwork')}}</p>
				<p>{{$t('modal_div_p2_AffiliateNetwork')}}</p>
			</div>
			<div class="text-right">
				<b-button variant="primary" class="btnConfirm" size="md" @click.stop="confirm(confirmed)" >
					{{$t('Confirm_col_AffiliateNetwork')}}
				</b-button>
				<b-button variant="outline-primary"  class="btnConfirm" @click="hideModal" size="md" @click.stop="hideModal('confirmed')">
				{{$t('Close')}}
				</b-button>
			</div>
		</b-modal>
	<!-- cancel request -->
		<b-modal hide-footer hide-header id="cancelModal" @hide="resetModal">
			<!-- <h4>{{$t('Cancel_Request_with')}} <b id="nameHotel">{{confirmed.name}}</b></h4> -->
			<!-- <hr> -->
			<div class="m-3">
				<p><b>{{$t('Tittle_cancel_with')}}</b></p>
			</div>
			<b-form-textarea id="textarea1"
						v-model="text"
						placeholder="Enter something"
						:rows="3"
						:max-rows="6">
			</b-form-textarea>
			<br>
			<div class="text-right">
				<b-button class="btn-yellow" size="md" @click.stop="btnCancel(confirmed)" variant="danger" :disabled="text===''">
					{{$t('Confirm_col_AffiliateNetwork')}}
				</b-button>
				<!-- <b-button variant="outline-primary" @click="hideModal" size="md" @click.stop="hideModal('cancelModal')">
					{{$t('Close')}}
				</b-button> -->
			</div>
		</b-modal>
	<!-- reject request -->
	    <b-modal hide-footer hide-header id="rejectModal" @hide="resetModal">
      		<!-- <h4>{{$t('Reject_affiliation_with')}} <b id="nameHotel">{{confirmed.name}}</b></h4> -->
	  		<!-- <hr> -->
	  		<div class="m-3">
    			<p><b>{{$t('Tittle_cancel_with')}}</b></p>
	  		</div>
			<b-form-textarea id="textarea1"
						v-model="text2"
						placeholder="Enter something"
						:rows="3"
						:max-rows="6">
			</b-form-textarea>
			<br>
	   		<div class="text-right">
				<b-button class="btn-yellow" size="md" @click.stop="btnReject(confirmed)" :disabled="text2===''" variant="danger">
					{{$t('Confirm_col_AffiliateNetwork')}}
				</b-button>
				<!-- <b-button variant="outline-primary" @click="hideModal" size="md" @click.stop="hideModal('rejectModal')">
					{{$t('Close')}}
				</b-button> -->
	   		</div>
    	</b-modal>
	</div>
</template>
